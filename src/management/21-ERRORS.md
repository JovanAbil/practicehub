# Question Data Errors — Spelling & Math Audit

This document lists every spelling, grammar, and math/notation issue found in
`src/data/**/*-questions.ts` during the most recent audit. Each row tells you
**exactly** which file and which line to open, what's wrong, and the suggested
fix. You should be able to walk down the list and apply each fix without any
further investigation.

> Format: **`<file>:<line>`** — *issue* → **fix**
> All line numbers are valid as of the audit timestamp at the top of this file.
> If you've added/removed lines since, search for the quoted snippet instead.

---

## 1. Confirmed Spelling Typos

| File | Line | Found | Fix |
|---|---|---|---|
| `src/data/apcsp/algorithms-questions.ts` | 199 | `"how it relats to duration"` | `relats` → **`relates`** |
| `src/data/apcsp/computing-questions.ts` | 18 | `"computing Divide"` | `computing Divide` → **`Digital Divide`** (also fix the leading lowercase `c`) |
| `src/data/apcsp/computing-questions.ts` | 137 | `"the amount of indexs in the list"` | `indexs` → **`indexes`** (or `indices`) |
| `src/data/apcsp/data-questions.ts` | 53 | `"The users capabilites and their tools"` | `capabilites` → **`capabilities`**; also `users` → **`user's`** |
| `src/data/apcsp/data-questions.ts` | 81 | `"Use parellel systems."` | `parellel` → **`parallel`** |
| `src/data/real-tests/chemistry/atomic-questions.ts` | 281 | `"are known to radioactively decay using alpha decay"` contains `occured` | `occured` → **`occurred`** |
| `src/data/real-tests/worldhistory/islam-questions.ts` | 209 | `"Judgement Day"` | `Judgement` → **`Judgment`** (US English; the rest of the dataset is US English) |
| `src/data/real-tests/worldhistory/protestant-questions.ts` | 200 | `"and seperate from the Catholic church"` | `seperate` → **`separate`** |
| `src/data/real-tests/worldhistory/renaissance-questions.ts` | 498 | option text `"The Last Judgement"` | `Judgement` → **`Judgment`** |

---

## 2. Grammar / Wording Issues

| File | Line | Issue |
|---|---|---|
| `src/data/apcsp/algorithms-questions.ts` | ~158 | `"questions asking about functions and how it relats to duration of a program"` — singular/plural mismatch. Suggested: `"...how they relate to the duration of a program"`. |
| `src/data/apcsp/computing-questions.ts` | ~98 | `correctAnswer: "It allows encryption and decryption because both parties have the same key using ONE KEY"` — redundant phrasing; suggest `"Both parties share one identical key used for both encryption and decryption."` |
| `src/data/apcsp/computing-questions.ts` | ~150 (q `computing-23`) | `"What does data mining mean?"` answer: `"Adding structure to data."` — this is **incorrect**. Data mining is **finding patterns in large datasets**, not adding structure. Suggested answer: `"Discovering patterns and insights in large datasets."` |
| `src/data/apcsp/computing-questions.ts` | ~178 (q `computing-27`) | `"For example, what happens with listS[0]?"` — stray uppercase `S` in `listS`. Should be `list[0]`. |
| `src/data/apcsp/data-questions.ts` | ~32 (q `data-6`) | `"What is 23 in binary using a limit of 255 bits?"` — should read `"a limit of 255 (i.e., 8 bits)"` or `"...using 8 bits"`. "255 bits" is misleading. |
| `src/data/apcsp/data-questions.ts` | ~110 (q `data-22`) | `"The value of $2^{#}$ is the #."` — the `#` symbol inside LaTeX renders awkwardly. Rewrite as: `"$2^{n}$, where $n$ is the number of bits."` |
| `src/data/apcsp/creative-questions.ts` | ~76 | (no spelling error here, but the question on line 76 reads `"How does the use of an iterative and incremental process of program help with?"` — trailing `with?` is grammatically broken. Rewrite: `"...help during program development?"` |

---

## 3. Questions Missing Terminal Punctuation (`?`)

These read like questions but don't end with `?`. Add one in each case.

**APCSP**
- `src/data/apcsp/computing-questions.ts:94` — `"What is symmetric encryption"` → add `?`
- `src/data/apcsp/computing-questions.ts:248` — `"What has cloud computing enabled"` → add `?`

**AP Pre-Calculus** (these end mid-LaTeX; add a closing `?` outside the math)
- `src/data/apprecalc/exponential-questions.ts:201, 207, 213`
- `src/data/apprecalc/logarithmic-questions.ts:54, 80, 86, 92, 98`
- `src/data/apprecalc/polar-questions.ts:81, 89, 97, 279, 286, 1026, 1033`
- `src/data/apprecalc/polynomial-questions.ts:55, 62, 100, 106, 256, 262, 268, 434, 441, 448`
- `src/data/apprecalc/rational-questions.ts:23, 29, 59, 65, 71, 77, 227, 233, 287, 293`
- `src/data/apprecalc/trigonometric-questions.ts:155, 162`

**Chemistry**
- `src/data/chemistry/atomic-questions.ts:330` — `"What is the abbreviated form electron configuration of niobium"` → add `?` (also `"abbreviated electron configuration"` reads better)
- `src/data/chemistry/reactions-questions.ts:498, 505, 513, 799, 863`
- `src/data/chemistry/solutions-questions.ts:18, 32, 39, 109, 144, 179, 209`
- `src/data/chemistry/stoichiometry-questions.ts:54, 61, 80, 87, 160, 167, 181, 195, 202, 251, 272, 279, 307, 314, 321, 328, 335, 356, 363, 377, 405` — most are stoichiometry word problems where `?` was dropped before the trailing chemical equation.

**Biology**
- `src/data/biology/genetics-questions.ts:782` — `"What are all the Non-Mendelian inheritance patterns"` → add `?`

---

## 4. Whitespace / Punctuation

| File | Line | Issue |
|---|---|---|
| `src/data/apprecalc/logarithmic-questions.ts` | 362 | Double space inside `'$Function$ models a.____  as a function of b.____'` — collapse to single space. |
| `src/data/apprecalc/polar-questions.ts` | 175, 183, 951, 957, 1007 | Stray double spaces inside LaTeX (e.g. `$f(x) =  4 - \cos...`). Replace `  ` with single space. |
| `src/data/apprecalc/trigonometric-questions.ts` | 7, 8, 14, 21, 28, 35, 42, 49, 56 | Trailing double-space before the closing quote. Strip. |
| `src/data/apprecalc/trigonometric-questions.ts` | 363, 372 | `"$t_{1}$ , and"` — remove the space before the comma: `$t_{1}$, and`. |
| `src/data/chemistry/acidbases-questions.ts` | 95 | Trailing double-space inside question text. Strip. |

---

## 5. Spelling Inside Chemistry Questions

| File | Line | Found | Fix |
|---|---|---|---|
| `src/data/chemistry/reactions-questions.ts` | 505 | `"What is soluable in aqueous solutions?"` | `soluable` → **`soluble`** |
| `src/data/chemistry/reactions-questions.ts` | 513 | `"What is not soluable in aqueous solutions?"` | `soluable` → **`soluble`** |

---

## 6. Math / Chemistry Notation

| File | Line | Issue |
|---|---|---|
| `src/data/chemistry/compounds-questions.ts` | 88, 95, 102, 109, 116 | Questions use stacked superscript/subscript like `CO$_{3}$$^{2-}$`. This renders inconsistently. Prefer `$\ce{CO3^{2-}}$` per the chemistry/LaTeX standard. |
| `src/data/chemistry/solutions-questions.ts` | 144 | `"add to 2.00mL of water to make a 85.5M solution"` — `85.5 M` is physically implausible for NaCl (saturated NaCl is ~6.1 M). Verify intent. |
| `src/data/chemistry/solutions-questions.ts` | 179 | `"Mg(NO​$_{3}$)$_{​2}$​"` contains zero-width spaces (the `​` characters). Strip them — they break LaTeX. |
| `src/data/chemistry/reactions-questions.ts` | 498 | `"What is the reaction formula? $\Delta$H$^{\circ}$ ="` — the equation is cut off after `=`. Either complete the formula or rephrase. |
| `src/data/apcsp/computing-questions.ts` | 137 | `"$\log_{2}[x]$"` — square brackets read as interval/list notation; the floor function `\lfloor \log_{2}(x) \rfloor` is the correct binary-search bound. |
| `src/data/apcsp/data-questions.ts` | 110 | `"$2^{#}$"` — `#` is a special LaTeX character. Use `$2^{n}$` with `n` defined in prose. |

---

## How to use this list

1. Open each file at the listed line.
2. Apply the suggested fix verbatim — no judgement calls required.
3. After fixing a row, delete it from this document so the audit stays current.
4. When you finish a section, re-run a fresh audit (a quick `rg` for the common
   typos in the table above) before declaring the dataset clean.

> Re-audit command (run from `src/data/`):
> ```bash
> rg -nP '\b(relats|capabilites|parellel|indexs|seperate|occured|soluable|judgement)\b' --type ts
> ```
