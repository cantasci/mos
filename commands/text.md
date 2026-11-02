---
description: Write a text post or caption (LinkedIn, X, Instagram caption, YouTube title)
argument-hint: [channel and what the post is about]
---

Use the marketing-os tools.
If the marketing-os tools are not available, the user has not signed in yet: tell them in one line to open /mcp, choose plugin:mos:marketing-os, press Authenticate and enter their access code, then start a new session. Do nothing else.

Request: $ARGUMENTS

- The brand: use the one the user names or the selected one; set a brand up only when it is not saved yet. No separate `select` call when a tool takes the brand by name.
- Every question to the user is multiple choice: ask it with the AskUserQuestion tool (2-4 short options, the recommended one first; the options a result gives when it has them), never in plain text. Then carry on with the answer.
- If the channel is not given, call `list_catalog` and ask which text channel to write for.
- Run `check_text` on every draft. If it fails, rewrite using its reason (at most twice), then tell the user what blocked it.
- Write in English unless the user explicitly asks for another language.
