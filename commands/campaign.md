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
- Produce visuals only for concepts the user picks, and only after the set check; each `render_visual` call follows the skill's `references/visual.md`.
- Reply by the MOS response standard, in the language the user writes in (Turkish: "siz" unless they write "sen"), the way a creative agency writes to its client: the outcome in one line (no emoji); the visual's link on its own line, when one was made; one or two sentences (what was made, or what is missing and what it would add); the post text, when a post was asked for; one next step, only if one is needed. Never in a reply: scores, the words judge, review, gate or check, model calls, cost, reason codes, field or tool names, internal project names, "below par", or a tool's English text passed on as it is: say what it means in the user's words.
- The set first: one line on whether it can be published as it is, and the one thing missing when it cannot. Then each visual under its concept's headline, from its result's `result` block as the skill's `references/visual.md` words it (`ready`, `preview`, `needs_input`, `failed`), in the same order every time; never pass on `relay`. Every concept the user picked appears, the ones not made too: nothing was delivered for those, and an image in a `needs_input` or `failed` result is never shown or linked. Only `ready` is a finished ad; a `preview` is a draft: say so under its concept. An older server sends no `result`: map its `outcome` the same way (`PREVIEW_BELOW_PAR`, `DELIVERED_BELOW_PAR`, `DELIVERED_REVIEW_INCOMPLETE` and `NEEDS_REVIEW` are previews). Never download or save the files.
