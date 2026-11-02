---
description: Propose three campaign concepts and check whether the set is publishable
argument-hint: [goal of the campaign, offer, available photos]
---

Use the marketing-os tools.
If the marketing-os tools are not available, the user has not signed in yet: tell them in one line to open /mcp, choose plugin:mos:marketing-os, press Authenticate and enter their access code, then start a new session. Do nothing else.

Request: $ARGUMENTS

- The brand: use the one the user names or the selected one; set a brand up only when it is not saved yet. No separate `select` call when a tool takes the brand by name.
- Every question to the user is multiple choice: ask it with the AskUserQuestion tool (2-4 short options, the recommended one first; the options a result gives when it has them), never in plain text. Then carry on with the answer.
- Propose three concepts, each for a different customer motivation and a different kind of idea, with exactly one offer. Show each as its headline and the idea in one line.
- Call `check_concept_set` and tell the user plainly whether the set is publishable and what is missing (usually more photos).
- Produce visuals only for concepts the user picks, and only after the set check.
- Each visual that is ready: `🚀 Ready to publish · [Open visual ↗](<link>)`. Never download or save the files.
