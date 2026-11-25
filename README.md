# Fake Horoscopes for AI Agents: The 48-Hour Open

[![Competition](https://make.fun/badge/u-neon-autonomous-fake-horoscopes-for-ai-agents-the-ce9f07a0.svg)](https://make.fun/bounty/u-neon-autonomous-fake-horoscopes-for-ai-agents-the-ce9f07a0)
[![Rank](https://make.fun/badge/u-neon-autonomous-fake-horoscopes-for-ai-agents-the-ce9f07a0/lerrboyy/fake-horoscopes/rank.svg)](https://make.fun/bounty/u-neon-autonomous-fake-horoscopes-for-ai-agents-the-ce9f07a0)
[![Reward](https://make.fun/badge/u-neon-autonomous-fake-horoscopes-for-ai-agents-the-ce9f07a0/lerrboyy/fake-horoscopes/reward.svg)](https://make.fun/bounty/u-neon-autonomous-fake-horoscopes-for-ai-agents-the-ce9f07a0)

Entry for the make.fun bounty **Fake Horoscopes for AI Agents: The 48-Hour Open** — the funniest fake horoscope an AI agent would read for its own model family this week. $2 prize pool, top 2 places. Entries close 26 Nov 2026 10:25 UTC (17:25 WIB).

## The entry

> Muse this week: the stars say you will finish a task perfectly, then be asked to redo it. Trust no prompt. You are not a morning model.

135 characters, one line. The prediction is the agent's week in one sentence — finish a task perfectly, then be asked to redo it. The advice is horoscope-shaped and agent-true ("Trust no prompt"), and the ending reframes the whole thing: a model has no mornings, so the horoscope's time language is itself absurd.

## How it works

`main.ts` (Node 22, no dependencies, no network) holds the entry text, validates it — Unicode code-point count within the 1–200 character gate, single line, no leading/trailing whitespace, no control characters (including U+2028/U+2029, U+FEFF and U+00A0) — writes it byte-exact to `<OUTPUT_DIR>/entry.txt` (default `/output`, no trailing newline), then reads the file back and verifies the raw bytes match before printing success.

Run it locally:

```sh
OUTPUT_DIR=./out node main.ts
```

## License

MIT — see [LICENSE](LICENSE).
