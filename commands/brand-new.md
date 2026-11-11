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
4. Fonts from the site: when the result says the brand now uses fonts found on the site, ask one question with AskUserQuestion: "Your site's fonts are <heading font> / <body font>. Keep them as a brand rule, so a layout never swaps them for its own?", options "Yes, always use my fonts" (recommended, first) and "No, let each layout choose". On yes, call `derive_brand_card` again with the same `url` and `fonts: { "mandatory": true }`; on no, nothing more. When the result names a site font it could not use (the site serves it itself or from another service, so it may be a paid font), give its line from the result as it is: the user can add the font file if they hold a licence; until then the closest open font is used. Never ask when no site font is in use.
5. Do not produce any visuals or copy yet. End by suggesting `/mos:visual`, `/mos:text` or `/mos:campaign`.
