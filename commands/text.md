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
- Write the post in the language of the request, unless the user asks for another.
- Reply by the MOS response standard, in the language the user writes in (Turkish: "siz" unless they write "sen"), the way a creative agency writes to its client: the outcome in one line (no emoji); the visual's link on its own line, when one was made; one or two sentences (what was made, or what is missing and what it would add); the post text, when a post was asked for; one next step, only if one is needed. Never in a reply: scores, the words judge, review, gate or check, model calls, cost, reason codes, field or tool names, internal project names, "below par", or a tool's English text passed on as it is: say what it means in the user's words.
- A draft that passes the check is ready: "Your LinkedIn post is ready." and the text as a quote. One that still fails after two rewrites is a draft, not a finished post: give it under "Draft", say in one sentence what blocks it in the user's words (a figure with no source: "I could not find a source for the 40% you mention"), and ask for the one thing that would settle it. A missing channel or fact is a question, never a guess.
