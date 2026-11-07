---
description: Show the review a visual got (the last one, or one you name)
---

Use the marketing-os tools.
If the marketing-os tools are not available, the user has not signed in yet: tell them in one line to open /mcp, choose plugin:mos:marketing-os, press Authenticate and enter their access code, then start a new session. Do nothing else.

Call `review_visual` (with `visual_id` only if the user gave one) and show what it returns, as it is. It reads the review recorded when the visual was made and never reviews again: to have a visual reviewed anew, make it again with `/mos:visual`. Do nothing else.
