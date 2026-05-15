# Backend, Hosting, AI, Auth, Live Stats — Full Setup Guide

> **Purpose of this document.** Practice Hub is currently a static React/Vite site hosted on GitHub Pages with **no backend**. This guide is the single source of truth for adding:
>
> 1. A cheap (free for low traffic) backend on **Supabase**
> 2. **Email-based user authentication** whose ONLY job is to unlock direct in-site AI question generation. Logged-out users keep using the existing copy-paste prompt flow at `/question-generator`.
> 3. **Anthropic Claude** as the AI model, with **multimodal input** (text, images, PDFs, video frames, audio transcripts) and a **rolling limit of 3 generations per user per 7 days** (you can change this constant later).
> 4. **Live page-view stats** powered by counter.dev, replacing the static numbers in `src/data/site-stats.ts`.
> 5. Moving the **front-end** from GitHub Pages to Supabase (custom domain + free SSL).
> 6. Legal/compliance notes so this stays lawful (FERPA, GDPR, CAN-SPAM, Anthropic ToS).
>
> **Read the whole document before writing any code.** Several steps depend on earlier ones (e.g., you cannot deploy edge functions before linking the project, and you cannot configure auth redirects before knowing the production URL).

> **No paid features for end users.** This guide deliberately does **NOT** set up Stripe/Paddle. Users will never be charged. The only "payment" you do is to Anthropic for API usage and (optionally) a domain name (~$10–15/yr).

---

## 0. Cost summary (what you actually pay)

| Item | Cost | Notes |
|---|---|---|
| Supabase Free tier | **$0** | 500 MB DB, 5 GB bandwidth/mo, 500K edge function invocations/mo, 1 GB storage. Plenty for a study site. |
| Supabase Pro (only if you outgrow free) | $25/mo | Not needed at launch. |
| Domain name | ~$10–15/yr | Optional. Buy from Cloudflare Registrar (cheapest, no markup) or Namecheap. |
| Anthropic API (Claude) | Pay-as-you-go | See §5.6. With a 3-uses-per-user-per-week cap and Claude 3.5 Haiku, expect <$0.05 per active user per month. |
| counter.dev | **$0** | Free, privacy-friendly, no cookies. |
| GitHub Pages | $0 | You can keep using it for the front-end if you don't want to migrate hosting (see §3.1). |

---

## 1. Mental model — what each piece does

```
┌────────────────────────┐        ┌──────────────────────────┐
│  Browser (React app)   │  HTTPS │  Supabase project        │
│  - Static pages        │ ─────► │  - Postgres DB           │
│  - Logged-out: copy    │        │  - Auth (email)          │
│    prompt flow         │        │  - Edge Functions (Deno) │
│  - Logged-in: in-site  │        │     └─ generate-questions│
│    AI generation       │        │         (calls Anthropic)│
└────────────────────────┘        └──────────────┬───────────┘
                                                 │ HTTPS
                                                 ▼
                                          ┌────────────┐
                                          │ Anthropic  │
                                          │  Claude    │
                                          └────────────┘
```

**Why an edge function?** Your Anthropic API key is a *secret*. If you put it in the React bundle, anyone can open DevTools, steal it, and rack up your bill. The edge function holds the key on the server and enforces the 3-use limit. **Never** call Claude directly from the browser.

---

## 2. Create the Supabase project (one-time)

1. Go to <https://supabase.com> → **Sign in with GitHub**.
2. Click **New project**.
3. Choose:
   - **Name:** `practice-hub`
   - **Database password:** generate a strong one and save it in a password manager (you will need this if you ever connect via `psql`).
   - **Region:** pick the one closest to most of your users (e.g., `us-east-1`).
   - **Plan:** **Free**.
4. Wait ~2 minutes for provisioning.
5. From the project dashboard, copy these into a temporary notes file (you will paste them into your code in §4):
   - **Project URL** — `Settings → API → Project URL` (looks like `https://xxxxxxx.supabase.co`)
   - **Publishable / anon key** — `Settings → API → Project API keys → anon (public)` — **safe to put in front-end code**
   - **Service role key** — same page, **DO NOT** ever put this in front-end code or commit it to git. You won't need it for this guide.

---

## 3. Hosting — keep GitHub Pages OR move to Supabase Hosting

You have two choices. Pick one.

### 3.1. Option A — Keep GitHub Pages (simplest, recommended)

Your front-end stays exactly where it is. Supabase only handles backend (DB, auth, edge functions). All examples in this doc work fine in this setup.

**Pros:** zero migration, no DNS changes, free.
**Cons:** GitHub Pages can't run server code (which is fine — Supabase does that for you).

If you choose this, **skip to §4**.

### 3.2. Option B — Move the front-end to Supabase Hosting (custom domain on Supabase)

> Supabase Hosting (currently in beta as of late 2025) lets you host a static site on Supabase's CDN. Use this only if you also want Supabase to manage your domain. Otherwise, Cloudflare Pages or Vercel are more mature alternatives.

**3.2.1. Build the site for production**

```bash
npm run build
```

This creates a `dist/` folder.

**3.2.2. Install the Supabase CLI**

```bash
# macOS
brew install supabase/tap/supabase

# Windows (scoop)
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase

# Linux / fallback
npm install -g supabase
```

Verify: `supabase --version` (should print v1.x or higher).

**3.2.3. Log in and link**

```bash
supabase login
supabase link --project-ref <your-project-ref>
```

Find `<your-project-ref>` in the Supabase URL — it's the `xxxxxxx` part of `xxxxxxx.supabase.co`.

**3.2.4. Deploy the static site**

If Supabase Hosting is not yet GA in your region, use **Cloudflare Pages** (also free, more mature):

1. Go to <https://dash.cloudflare.com> → **Workers & Pages → Create → Pages → Connect to Git**.
2. Authorize your GitHub account, pick the `practice-hub` repo.
3. Build settings:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Click **Save and Deploy**.
5. After ~2 minutes you get a URL like `practice-hub.pages.dev`.

**3.2.5. Add a custom domain**

1. Buy a domain at **Cloudflare Registrar** (<https://dash.cloudflare.com/?to=/:account/registrar>) — cheapest, at-cost pricing. A `.com` is ~$10/yr.
2. In Cloudflare Pages → your project → **Custom domains → Set up a custom domain**.
3. Enter your domain (e.g., `practicehub.app`). Cloudflare auto-creates the DNS records because the domain is on Cloudflare. Wait ~1 minute for SSL.
4. Update `vite.config.ts` to set `base: "/"` (root, not a subpath).
5. Update `<BrowserRouter basename={import.meta.env.BASE_URL}>` in `src/App.tsx` — with `base: "/"`, this resolves correctly.
6. Update the `homepage` field in `package.json` to your new domain.
7. Re-deploy by pushing to GitHub.

**3.2.6. Update the GitHub Pages SPA redirect**

If you're moving away from GitHub Pages, you can delete `public/404.html` (the SPA redirect). Cloudflare Pages handles SPA routing natively if you create a `public/_redirects` file containing:

```
/*    /index.html   200
```

---

## 4. Wire up the Supabase client in the React app

**4.1. Install the SDK**

```bash
npm install @supabase/supabase-js
```

**4.2. Create the client**

Create `src/lib/supabase.ts`:

```ts
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL!;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY!;

if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
  throw new Error('Missing Supabase env vars. See src/management/18-BACKEND-AND-AI-SETUP.md §4.');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
```

**4.3. Add env vars**

Create `.env.local` (already gitignored by Vite):

```
VITE_SUPABASE_URL=https://xxxxxxx.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGc...your-anon-key...
```

The anon key is public-safe — it's designed to be exposed. Row-Level Security (§5.2) is what actually protects your data.

For Cloudflare Pages, add the same vars in **Pages project → Settings → Environment variables**.

For GitHub Pages, you must inline these at build time. Add them as **GitHub repo Secrets** (`Settings → Secrets and variables → Actions`) and reference them in your build workflow (`env:` block).

---

## 5. Authentication — email login that gates the in-site AI generator

The whole point of auth is to **count generations per user**. Logged-out visitors keep working exactly as today (copy-paste prompt at `/question-generator`).

### 5.1. Enable Email auth in Supabase

1. Supabase dashboard → **Authentication → Providers → Email**.
2. Toggle **Enable Email provider**: ON.
3. **Confirm email**: ON (this prevents bots from creating fake accounts to bypass the 3-use cap).
4. **Authentication → URL Configuration**:
   - **Site URL:** your production URL (e.g., `https://practicehub.app` or `https://<username>.github.io/<repo>`).
   - **Redirect URLs:** add both your production URL and `http://localhost:8080` (or whatever port Vite uses).

### 5.2. Database schema — usage table with RLS

We use a **rolling 7-day window**, not a lifetime counter. The simplest correct way to do that is to log one row per generation and count the rows in the last 7 days. (A single counter + reset timestamp is tempting but breaks under concurrent requests and around the reset boundary.)

Run this SQL in **Supabase dashboard → SQL Editor**:

```sql
-- One row per AI generation. Counting rows where used_at > now() - interval '7 days'
-- gives us the rolling-7-day usage for any user.
create table public.ai_usage_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  used_at timestamptz not null default now()
);

create index ai_usage_events_user_recent
  on public.ai_usage_events (user_id, used_at desc);

alter table public.ai_usage_events enable row level security;

-- Users can read their OWN events (so the UI can show "2/3 left this week"
-- and "next reset in 3 days").
create policy "users read own usage events"
  on public.ai_usage_events for select
  to authenticated
  using (user_id = auth.uid());

-- Nobody can insert/update/delete from the client. The edge function
-- uses the service role key and bypasses RLS.
-- (No insert/update/delete policies = denied by default.)

-- Helper view: current rolling-window count per user, plus the timestamp
-- of the oldest event still inside the window (so the UI can compute
-- when the next slot frees up: oldest_in_window + 7 days).
create or replace view public.ai_usage_window with (security_invoker = true) as
select
  user_id,
  count(*)::int                                as used_in_window,
  min(used_at)                                 as oldest_in_window
from public.ai_usage_events
where used_at > now() - interval '7 days'
group by user_id;
```

**Why RLS this way?** The client must be allowed to *read* its own events (so the UI shows "2/3 left this week" and the reset time). The client must NEVER be allowed to *insert* or *delete* events — otherwise a user could open DevTools and either add fake "old" rows (no benefit to them) or delete recent rows to reset their counter (big problem). Only the edge function (running with the service role key on the server) can write.

**Why a rolling window instead of "resets every Monday"?** A fixed weekly reset means a user can burn 3 prompts on Sunday night and 3 more on Monday morning — 6 in 12 hours. A rolling window means each prompt frees up exactly 7 days after it was used.

### 5.3. Login UI

Create `src/pages/Login.tsx` — basic email/password form calling:

```ts
await supabase.auth.signUp({
  email, password,
  options: { emailRedirectTo: window.location.origin }
});
// or
await supabase.auth.signInWithPassword({ email, password });
```

**CRITICAL:** Set up the auth listener BEFORE checking the session, otherwise you'll race:

```ts
useEffect(() => {
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    (_event, session) => setSession(session)
  );
  supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
  return () => subscription.unsubscribe();
}, []);
```

**Password reset:** if you implement "forgot password", you also need a `/reset-password` page (see Lovable docs on `auth/reset-password`). Skip this entirely for now if you want — the 3-use cap means most users only sign in once.

---

## 6. Anthropic Claude — multimodal in-site question generation

### 6.1. Get an Anthropic API key

1. Go to <https://console.anthropic.com>.
2. Sign up. You get $5 of free credits.
3. **Settings → API Keys → Create Key**. Copy it (starts with `sk-ant-...`).
4. Add a payment method under **Plans & Billing** so you don't get cut off after the free credits run out. Set a **monthly spend limit** (e.g., $20) as a hard safety net. The 3-use-per-user cap is the real protection — this is just belt-and-suspenders.

### 6.2. Pick a Claude model

| Model | Cost (per 1M input tokens) | Cost (per 1M output) | Multimodal? | When to use |
|---|---|---|---|---|
| `claude-haiku-4-5` | ~$1 | ~$5 | Text + image + PDF | **Default for this project.** Cheap, fast, fully multimodal. |
| `claude-sonnet-4-5` | ~$3 | ~$15 | Text + image + PDF | Better reasoning. Use only if Haiku output quality isn't acceptable. |
| `claude-opus-4` | ~$15 | ~$75 | Text + image + PDF | Overkill. Don't use. |

> Model names and prices change. Check <https://docs.anthropic.com/en/docs/about-claude/models> for the current list before deploying.

**Audio and video are NOT natively supported by Claude.** You handle them by converting client-side first:

- **Audio:** transcribe with the browser Web Speech API (free, but English-only and quality varies) OR upload to OpenAI Whisper API (~$0.006/min). For the free-only goal, Web Speech is fine.
- **Video:** in the browser, sample 4–6 frames using a `<canvas>`, then send those frames as images. For the audio track, transcribe as above. **Do not upload raw video to your edge function** — Supabase free tier has a 6 MB request body limit.

### 6.3. Add the Anthropic key as a Supabase secret

```bash
supabase secrets set ANTHROPIC_API_KEY=sk-ant-...
```

Verify:
```bash
supabase secrets list
```

You should see `ANTHROPIC_API_KEY` (value hidden).

### 6.4. Create the edge function

```bash
supabase functions new generate-questions
```

Replace `supabase/functions/generate-questions/index.ts` with:

```ts
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const MAX_USES_PER_WINDOW = 3;          // Change here to raise/lower the cap.
const WINDOW_DAYS = 7;                  // Rolling-window length.
const WINDOW_MS = WINDOW_DAYS * 24 * 60 * 60 * 1000;

const SYSTEM_PROMPT = `You are a study question generator for the Practice Hub website.
Given the user's notes (which may include text, images, PDFs, transcripts), output a TypeScript file in the EXACT format below.
Always start with: import { Question } from '@/types/quiz';
Then export a single array of questions. Use the variable name the user provides, otherwise "generatedQuestions".
Use the multiple-choice, free-response, select-all, or parts schema documented in the Practice Hub source. Wrap math in $...$ (LaTeX explicit only).
Output ONLY the TypeScript code. No prose, no markdown fences.`;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    // 1. Authenticate
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return json({ error: 'Sign in to use the in-site AI generator.' }, 401);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, // service role — bypasses RLS
      { auth: { persistSession: false } }
    );

    const token = authHeader.replace('Bearer ', '');
    const { data: userData, error: userErr } = await supabase.auth.getUser(token);
    if (userErr || !userData.user) {
      return json({ error: 'Invalid session.' }, 401);
    }
    const userId = userData.user.id;

    // 2. Count how many generations the user has used in the rolling window.
    //    We insert the new event BEFORE calling Claude so a user can't
    //    spam-cancel mid-call to avoid the cap. If Claude fails we delete it.
    const windowStart = new Date(Date.now() - WINDOW_MS).toISOString();

    const { count, error: countErr } = await supabase
      .from('ai_usage_events')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .gt('used_at', windowStart);
    if (countErr) return json({ error: 'Could not load usage.' }, 500);

    const usedInWindow = count ?? 0;
    if (usedInWindow >= MAX_USES_PER_WINDOW) {
      // Find the oldest event still in the window so we can tell the user
      // exactly when their next slot frees up.
      const { data: oldest } = await supabase
        .from('ai_usage_events')
        .select('used_at')
        .eq('user_id', userId)
        .gt('used_at', windowStart)
        .order('used_at', { ascending: true })
        .limit(1)
        .maybeSingle();
      const resetsAt = oldest
        ? new Date(new Date(oldest.used_at).getTime() + WINDOW_MS).toISOString()
        : null;
      return json({
        error: `You've used all ${MAX_USES_PER_WINDOW} of your free AI generations for this 7-day window.`,
        used: usedInWindow,
        limit: MAX_USES_PER_WINDOW,
        windowDays: WINDOW_DAYS,
        resetsAt,
      }, 429);
    }

    // Reserve a slot by inserting an event row. We capture the id so we can
    // delete it (refund) if Claude fails downstream.
    const { data: inserted, error: insErr } = await supabase
      .from('ai_usage_events')
      .insert({ user_id: userId })
      .select('id')
      .single();
    if (insErr || !inserted) return json({ error: 'Could not reserve a generation slot.' }, 500);
    const reservedEventId = inserted.id;
    // 3. Build the multimodal Claude request
    const body = await req.json();
    // body.content is an Anthropic-style content array, e.g.:
    //   [
    //     { type: 'text', text: 'Make 5 questions from these notes' },
    //     { type: 'image', source: { type: 'base64', media_type: 'image/png', data: '...' } },
    //     { type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: '...' } },
    //   ]
    if (!Array.isArray(body.content) || body.content.length === 0) {
      return json({ error: 'No content provided.' }, 400);
    }

    const claudeResp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': Deno.env.get('ANTHROPIC_API_KEY')!,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 4096,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: body.content }],
      }),
    });

    if (!claudeResp.ok) {
      // Refund the slot if Claude failed — don't punish the user for our outage.
      await supabase
        .from('ai_usage_events')
        .delete()
        .eq('id', reservedEventId);
      const text = await claudeResp.text();
      return json({ error: `Claude error: ${text}` }, 502);
    }

    const result = await claudeResp.json();
    const tsCode = result.content?.[0]?.text ?? '';

    return json({
      code: tsCode,
      used: usedInWindow + 1,
      limit: MAX_USES_PER_WINDOW,
      windowDays: WINDOW_DAYS,
    }, 200);
  } catch (e) {
    console.error(e);
    return json({ error: e instanceof Error ? e.message : 'Unknown error' }, 500);
  }
});

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
```

### 6.5. Deploy the edge function

```bash
supabase functions deploy generate-questions --no-verify-jwt
```

> `--no-verify-jwt` is required because the function does its own JWT validation via `supabase.auth.getUser(token)`. The Supabase platform-level JWT check would reject anonymous requests before our code ever runs, and we want to return a friendly "please sign in" message instead.

### 6.6. Call it from React

In `src/pages/QuestionGenerator.tsx`, branch on auth state. Pseudocode:

```ts
const { data: { session } } = await supabase.auth.getSession();

if (!session) {
  // Unchanged — copy-paste flow stays the default.
  return <CopyPastePromptUI />;
}

// Logged in — show the direct generation UI.
async function generate(uploadedFiles: File[], notes: string) {
  const content: any[] = [{ type: 'text', text: notes }];

  for (const file of uploadedFiles) {
    const base64 = await fileToBase64(file); // strip the "data:...;base64," prefix
    if (file.type.startsWith('image/')) {
      content.push({ type: 'image', source: { type: 'base64', media_type: file.type, data: base64 } });
    } else if (file.type === 'application/pdf') {
      content.push({ type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: base64 } });
    }
    // For audio/video: transcribe first (see §6.2), then push as text.
  }

  const { data, error } = await supabase.functions.invoke('generate-questions', {
    body: { content },
  });

  if (error) toast.error(error.message);
  else setOutputData(data.code);
}
```

### 6.7. Show remaining uses in the UI

```ts
const WINDOW_DAYS = 7;
const WINDOW_MS = WINDOW_DAYS * 24 * 60 * 60 * 1000;
const windowStart = new Date(Date.now() - WINDOW_MS).toISOString();

// Pull every event the user has in the rolling window. Three rows max,
// so this is cheap. We need the timestamps to compute the next reset.
const { data: events } = await supabase
  .from('ai_usage_events')
  .select('used_at')
  .eq('user_id', session.user.id)
  .gt('used_at', windowStart)
  .order('used_at', { ascending: true });

const used = events?.length ?? 0;
const remaining = Math.max(0, 3 - used);
// Render: "{remaining}/3 free AI generations remaining this week"

// If they're capped, show when the next slot frees up:
if (remaining === 0 && events && events.length > 0) {
  const nextResetAt = new Date(new Date(events[0].used_at).getTime() + WINDOW_MS);
  // Render: "Next free generation: {nextResetAt.toLocaleString()}"
}
```

> **Why we don't trust the client to enforce the cap.** The snippet above is for *display only*. The real enforcement happens server-side in the edge function (§6.4). Even if a user tampers with this code in DevTools to hide the "0 remaining" message, the edge function will still return `429` when they try to generate.

---

## 7. Live page-view stats with counter.dev

You're already using counter.dev for tracking (see `src/components/PageViewTracker.tsx` and `src/management/12-COUNTER-DEV-ANALYTICS.md`). To make the **homepage stats** dynamic instead of static:

### 7.1. Get a counter.dev read-only API token

1. Sign in to <https://counter.dev>.
2. **Settings → API tokens → New token** (read-only).
3. Copy it.

### 7.2. Add an edge function that proxies the counter.dev API

Why proxy? counter.dev's API requires a token, and you don't want to leak it in front-end code. Even though it's read-only, exposing it lets anyone hammer your account's rate limit.

```bash
supabase functions new live-stats
supabase secrets set COUNTER_DEV_TOKEN=your-read-only-token
```

`supabase/functions/live-stats/index.ts`:

```ts
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Cache for 5 min so we don't hammer counter.dev (and we get faster responses).
let cache: { data: any; ts: number } | null = null;
const TTL_MS = 5 * 60 * 1000;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  if (cache && Date.now() - cache.ts < TTL_MS) {
    return json(cache.data);
  }

  const r = await fetch('https://counter.dev/api/v1/sites/<your-site-id>/stats', {
    headers: { Authorization: `Bearer ${Deno.env.get('COUNTER_DEV_TOKEN')}` },
  });
  if (!r.ok) return json({ error: 'counter.dev fetch failed' }, 502);

  const stats = await r.json();
  // Trim to just what the homepage needs:
  const payload = {
    totalViews: stats.total_views ?? 0,
    uniqueVisitors: stats.unique_visitors ?? 0,
    last30Days: stats.last_30_days ?? 0,
  };
  cache = { data: payload, ts: Date.now() };
  return json(payload);
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
```

Deploy: `supabase functions deploy live-stats --no-verify-jwt` (it's a public stats endpoint).

### 7.3. Use it on the homepage

Replace the static numbers in `src/data/site-stats.ts` consumers with a fetch:

```ts
const [stats, setStats] = useState<{ totalViews: number; uniqueVisitors: number } | null>(null);

useEffect(() => {
  supabase.functions.invoke('live-stats').then(({ data }) => setStats(data));
}, []);
```

Keep `src/data/site-stats.ts` around as the fallback if the fetch fails (offline, edge function down, etc.).

> **Why not query counter.dev directly from the browser?** You could, but you'd leak the token. The proxy is ~30 lines and worth it.

---

## 8. Legal / compliance — read this, do not skip

This is **general guidance, not legal advice**. If you're unsure, talk to a real lawyer. That said, doing these basics keeps you out of obvious trouble:

### 8.1. Privacy Policy (REQUIRED)

`src/pages/PrivacyPolicy.tsx` already exists. You must update it to disclose:

- **Email collection:** "We store your email address (via Supabase Auth) so you can sign in. We do not sell or share your email."
- **AI processing:** "When you use the AI question generator while signed in, the notes/images/files you submit are sent to Anthropic (a third-party AI provider) to generate questions. Anthropic's data handling policy applies — see <https://www.anthropic.com/legal/privacy>. We do not store the content you submit on our servers beyond the duration of the API call."
- **Usage tracking:** "We log a timestamp each time you use the AI generator so we can enforce a rolling cap of 3 uses per 7 days. We do not log the content of your prompt — only that one occurred."
- **Page-view analytics:** "We use counter.dev for anonymous page-view counts. counter.dev does not use cookies and does not track individual users."
- **Children:** "This site is intended for high-school and college students. If you are under 13 (US) or under 16 (EU), do not create an account."

### 8.2. Terms & Conditions

Update `src/components/TermsOfServiceModal.tsx`:

- **AI output disclaimer:** "AI-generated questions may be incorrect. Verify against your textbook or teacher before relying on them. We are not responsible for errors in AI output."
- **Acceptable use:** prohibit uploading copyrighted material you don't own (e.g., scanned textbook pages may violate fair use).
- **Account termination:** reserve the right to ban accounts that abuse the service.

### 8.3. FERPA (US student-data law)

You are **not** a school, so FERPA technically doesn't bind you directly — but if a teacher uploads a student's graded test as "notes", that's a FERPA violation by the *teacher*. Add a sentence to the AI generator UI: "Do not upload other people's personal information or graded student work."

### 8.4. GDPR (EU users)

If anyone in the EU signs up, you're a data controller. Minimum requirements:

- Privacy Policy (done above).
- A way for users to **delete their account** (and with it, their `ai_usage_events` rows + auth record). Supabase: `supabase.auth.admin.deleteUser(userId)` from a "Delete my account" edge function. The `ON DELETE CASCADE` on `ai_usage_events.user_id` handles cleanup automatically.
- A way to **export their data** — which is just their email and a single `used_count` number. A simple "Download my data (JSON)" button is enough.

### 8.5. CAN-SPAM (US email law)

You are not sending marketing emails. Supabase only sends transactional emails (verification, password reset). You're fine. **Do not** start a newsletter without adding an unsubscribe link.

### 8.6. Anthropic ToS

- You may not use Claude to build a product that competes with Claude (you're not — you're a study tool).
- You may not use it for medical/legal/financial advice without disclaimers (you're not).
- You must not log full prompts to a public location (don't `console.log` user notes in the edge function and then expose those logs).

### 8.7. Cookie banner

You're already using `src/components/CookieConsentBanner.tsx`. After adding auth, the Supabase auth library uses `localStorage` (not cookies) for the session by default, so technically you don't *need* a cookie banner for that. But if you ever switch to `cookieOptions` for SSR or add Google Analytics, you'll need one. Leave the existing banner in place.

---

## 9. Smoke-test checklist before going live

Run through these in order:

1. ☐ I can sign up with my own email and receive a verification link.
2. ☐ After clicking the link, I am logged in and the homepage shows my email/profile.
3. ☐ Logged-out, `/question-generator` still shows the copy-paste flow (unchanged).
4. ☐ Logged-in, `/question-generator` shows "3/3 free AI generations remaining this week" and a file upload UI.
5. ☐ I can upload a `.png` image of my notes and click Generate; valid TypeScript code appears.
6. ☐ The counter goes to "2/3 remaining".
7. ☐ I generate twice more; the third time succeeds and shows "0/3" along with a "Next free generation: …" timestamp roughly 7 days out.
8. ☐ A fourth attempt is blocked with the friendly limit message and a `429` in the network tab.
9. ☐ I open DevTools and try `await supabase.from('ai_usage_events').delete().eq('user_id', '<my-id>')` — it should fail with an RLS error (proving users can't wipe their own history to reset the counter).
10. ☐ I run the same query as a `select` — it succeeds and returns ≤3 rows (proving the read policy works).
11. ☐ The homepage page-view stats update when I refresh after a few minutes.
12. ☐ My Anthropic dashboard shows usage going up by ~$0.001 per generation.
13. ☐ (Optional, slow) After 7 days, the oldest event drops out of the window and the user gets one slot back automatically — no cron job needed.

If all 13 pass, you're production-ready.

---

## 10. Things you DID NOT set up (and shouldn't, per project goals)

- ❌ Stripe / Paddle payments — users are never charged.
- ❌ Email marketing / newsletters — no CAN-SPAM concerns.
- ❌ Social login (Google/Apple) — email-only is enough for the 3-use cap.
- ❌ File storage in Supabase Storage — files are sent inline to Claude and never persisted.
- ❌ Realtime subscriptions — the per-user counter is so small that polling on page load is fine.

If a future need pushes you toward any of these, write a new section in this doc rather than improvising — the legal and security implications change.

---

## 11. Where to get help

- Supabase docs: <https://supabase.com/docs>
- Anthropic docs: <https://docs.anthropic.com>
- counter.dev docs: <https://counter.dev/docs>
- Cloudflare Pages docs: <https://developers.cloudflare.com/pages/>

If the edge function returns an error you don't recognize, check **Supabase dashboard → Edge Functions → generate-questions → Logs**. Every `console.log` and uncaught error appears there in real time.

---

## Last Updated

May 2026
