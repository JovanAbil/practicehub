# Advertisements Guide

How to set up ads, earn revenue, and plug real ads into the existing placeholder infrastructure.

---

## Current Infrastructure

The app has a fully built ad system with placeholders ready for real ad code. Currently, placeholders only render in **debug mode** (invisible to users).

### Files Involved

| File | Role |
|------|------|
| `src/components/AdPlaceholder.tsx` | Renders ad slots (or placeholders in debug mode) |
| `src/components/AdBlockDetector.tsx` | Detects adblockers and redirects to `/blocked` |
| `src/pages/AdblockBlocked.tsx` | Blocks access if adblocker is active |
| `src/App.tsx` | Mounts sidebar-left and sidebar-right ad slots globally |

### Ad Positions

| Position | Size | Location | Mobile |
|----------|------|----------|--------|
| `sidebar-left` | 120×600 (skyscraper) | Fixed, left side | Hidden |
| `sidebar-right` | 120×600 (skyscraper) | Fixed, right side | Hidden |
| `bottom` | 100%×90 (leaderboard) | Bottom of content | Shown |
| `inline` | 100%×250 (medium rectangle) | Within content | Shown |

---

## Step 1: Choose an Ad Network

### Recommended: Google AdSense (easiest for beginners)

1. Go to [https://www.google.com/adsense/](https://www.google.com/adsense/)
2. Sign up with your Google account
3. Add your site URL (your published domain, e.g., `cswstudying.lovable.app` or custom domain)
4. Google will review your site (takes 1–14 days)
5. Once approved, you get a **Publisher ID** (ca-pub-XXXXXXXXXXXXXXXX)

### Alternatives

| Network | Best For | Min Traffic |
|---------|----------|-------------|
| **Google AdSense** | Beginners, any traffic level | None |
| **Ezoic** | Optimization + higher RPM | ~10k monthly visits |
| **Mediavine** | Premium rates | 50k+ sessions/month |
| **Carbon Ads** | Developer/tech audience | Apply-based |

---

## Step 2: Add the Ad Script to index.html

Once approved, add the network's script tag to `index.html` in the `<head>`:

```html
<!-- Google AdSense -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
     crossorigin="anonymous"></script>
```

Replace `ca-pub-XXXXXXXXXXXXXXXX` with your actual publisher ID.

---

## Step 3: Activate Real Ads in AdPlaceholder.tsx

Open `src/components/AdPlaceholder.tsx` and replace it with this pattern:

```tsx
import { useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useDebugMode } from '@/hooks/useDebugMode';

interface AdPlaceholderProps {
  position: 'sidebar-left' | 'sidebar-right' | 'bottom' | 'inline';
  className?: string;
}

// Map positions to AdSense ad slot IDs (from your AdSense dashboard)
const AD_SLOTS: Record<string, string> = {
  'sidebar-left': 'XXXXXXXXXX',   // Replace with real slot IDs
  'sidebar-right': 'XXXXXXXXXX',
  'bottom': 'XXXXXXXXXX',
  'inline': 'XXXXXXXXXX',
};

// Set to true when you have real ads configured
const ADS_ENABLED = false;

export const AdPlaceholder = ({ position, className = '' }: AdPlaceholderProps) => {
  const { isDebugMode } = useDebugMode();
  const isMobile = useIsMobile();
  const adRef = useRef<HTMLDivElement>(null);

  // Hide sidebar ads on mobile
  if (isMobile && (position === 'sidebar-left' || position === 'sidebar-right')) {
    return null;
  }

  const positionStyles = {
    'sidebar-left': 'fixed left-2 top-1/2 -translate-y-1/2 w-[120px] h-[600px] max-h-[calc(100vh-160px)]',
    'sidebar-right': 'fixed right-2 top-1/2 -translate-y-1/2 w-[120px] h-[600px] max-h-[calc(100vh-160px)]',
    'bottom': 'w-full h-[90px]',
    'inline': 'w-full h-[250px]',
  };

  useEffect(() => {
    if (ADS_ENABLED && adRef.current) {
      try {
        // Push the ad unit to render
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (e) {
        console.error('Ad failed to load:', e);
      }
    }
  }, []);

  // Real ads mode
  if (ADS_ENABLED) {
    return (
      <div ref={adRef} className={`${positionStyles[position]} ${className}`}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"  // Your publisher ID
          data-ad-slot={AD_SLOTS[position]}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  // Debug placeholder mode (current behavior)
  if (!isDebugMode) return null;

  return (
    <div
      className={`bg-muted/50 border-2 border-dashed border-primary/50 rounded-lg flex items-center justify-center pointer-events-none ${positionStyles[position]} ${className}`}
    >
      <div className="text-center p-4">
        <p className="text-sm font-medium text-primary">Ad Placeholder</p>
        <p className="text-xs text-muted-foreground">{position}</p>
      </div>
    </div>
  );
};
```

### Activation Checklist

1. Add AdSense script to `index.html` `<head>`
2. Replace `ca-pub-XXXXXXXXXXXXXXXX` with your publisher ID (2 places)
3. Create ad units in AdSense dashboard and copy slot IDs into `AD_SLOTS`
4. Set `ADS_ENABLED = true`
5. Deploy and verify ads appear

---

## Step 4: Add Inline Ads to Specific Pages (Optional)

To add ads within page content (e.g., between sections):

```tsx
import { AdPlaceholder } from '@/components/AdPlaceholder';

// In your JSX:
<div className="my-content">
  <h2>Section 1</h2>
  <p>Content here...</p>
  
  <AdPlaceholder position="inline" className="my-6" />
  
  <h2>Section 2</h2>
  <p>More content...</p>
</div>
```

Bottom ads can be added above the Footer:

```tsx
<AdPlaceholder position="bottom" className="mt-8" />
<Footer />
```

---

## Step 5: Getting Paid

### Google AdSense Payment Setup

1. In AdSense dashboard → **Payments** → **Payment info**
2. Add your address (Google mails a PIN for verification)
3. Add payment method (bank transfer or check)
4. **Minimum payout**: $100 USD
5. Payments are issued monthly (around the 21st)

### Revenue Expectations

| Monthly Pageviews | Estimated Monthly Revenue (AdSense) |
|-------------------|--------------------------------------|
| 1,000 | $0.50 – $3 |
| 5,000 | $2.50 – $15 |
| 10,000 | $5 – $30 |
| 50,000 | $25 – $150 |
| 100,000+ | $50 – $500+ |

RPM (revenue per 1,000 impressions) varies by niche. Education sites typically earn $2–$8 RPM.

---

## Adblock Detection

The app already has adblock detection built in:

- `AdBlockDetector.tsx` checks if Counter.dev analytics can load
- If blocked → redirects to `/blocked` (AdblockBlocked.tsx)
- Users must whitelist the site to access content
- Periodically re-checks every 3 seconds

This ensures ad revenue isn't lost to adblockers.

---

## Adding More Ad Positions

1. Add the new position to the type in `AdPlaceholder.tsx`:
   ```ts
   position: 'sidebar-left' | 'sidebar-right' | 'bottom' | 'inline' | 'your-new-position';
   ```

2. Add styles for the position in `positionStyles`

3. Add the slot ID in `AD_SLOTS`

4. Place `<AdPlaceholder position="your-new-position" />` where needed

---

## Privacy & Compliance

- The app already has a **Cookie Consent Banner** (`CookieConsentBanner.tsx`)
- The app already has a **Privacy Policy** page (`/privacy`)
- AdSense requires cookie consent for EU users (GDPR) — already handled
- Update the Privacy Policy to mention ad personalization if using targeted ads

---

## Quick Reference

| Action | Where |
|--------|-------|
| Enable real ads | `AdPlaceholder.tsx` → `ADS_ENABLED = true` |
| Add publisher ID | `index.html` + `AdPlaceholder.tsx` |
| Add slot IDs | `AdPlaceholder.tsx` → `AD_SLOTS` object |
| Add inline ad | Any page JSX → `<AdPlaceholder position="inline" />` |
| Preview placeholders | Enable debug mode (click version text 5 times) |
| Adblock enforcement | `AdBlockDetector.tsx` (already active) |
| **Hide debug toggle** | `src/components/DebugToggleConfig.ts` → `SHOW_DEBUG_TOGGLE = false` |

---

## Hiding the Debug Toggle When Ads Are Live

When you activate real ads, you should hide the debug toggle button from the website so users can't see ad placeholder outlines.

**File:** `src/components/DebugToggleConfig.ts`

```ts
// Set to false to hide the debug toggle button
export const SHOW_DEBUG_TOGGLE = false;
```

When set to `false`:
- The debug mode toggle button (🐛 icon) will not render on the site
- Debug mode itself still works via localStorage if manually enabled
- Ad placeholders will only show real ads (never debug outlines)

When set to `true` (default):
- The debug toggle is visible in the top-right corner
- Useful during development to preview ad placement

---

## Last Updated

April 2026
