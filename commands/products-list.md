---
description: List saved products of the selected brand, with the selected one marked
---

Use the marketing-os tools.
If the marketing-os tools are not available, the user has not signed in yet: tell them in one line to open /mcp, choose plugin:mos:marketing-os, press Authenticate and enter their access code, then start a new session. Do nothing else.

Call `library` and show the products as a short list: `<name> — <price>`, the selected one marked. If no brand is selected, list all products grouped by brand. Then one line: select one with `/mos:product:select <name>` or add one with `/mos:product:new <product link>`. Do not produce anything else.
