---
description: List saved brands, with the selected one marked
---

Use the marketing-os tools.
If the marketing-os tools are not available, the user has not signed in yet: tell them in one line to open /mcp, choose plugin:mos:marketing-os, press Authenticate and enter their access code, then start a new session. Do nothing else.

Call `library` and show the brands as a short list: `<name> — <site, if any>`, the selected one marked. Then one line: select one with `/mos:brand:select <name>` or add one with `/mos:brand:new <link or description>`. Do not produce anything else.

Answer in the language the user writes in (Turkish: "siz" unless they write "sen"), in the user's words rather than the tool's English: the answer is the list itself, with no outcome label. If the tool could not answer, say so in one plain line with the one way forward; never pass on its error text.
