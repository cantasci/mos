---
description: Set up a brand card from a link or a short description (name, what it does, colors, tone)
argument-hint: [link to the business, or name and a short description]
---

Use the marketing-os tools.
If the marketing-os tools are not available, the user has not signed in yet: tell them in one line to open /mcp, choose plugin:mos:marketing-os, press Authenticate and enter their access code, then start a new session. Do nothing else.

Business: $ARGUMENTS

1. If `<a link to the business>` is given, call `derive_brand_card` with `url` and any values the user stated; the server reads the rest.
2. Otherwise: if the name or what the business does is missing, ask for it in one question; call `list_catalog`, pick the tone that fits, and call `derive_brand_card`.
3. Show the result in a few lines: name, colors, tone, and what was found on the link (facts, products). The new brand is now selected.
4. Do not produce any visuals or copy yet. End by suggesting `/mos:visual`, `/mos:text` or `/mos:campaign`.
