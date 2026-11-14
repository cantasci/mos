---
description: Select which saved brand to work on
argument-hint: [brand name]
---

Use the marketing-os tools.
If the marketing-os tools are not among your tools, do not conclude that the user is signed out yet:
1. When your tools are loaded on demand, search for them first (a tool search for "marketing-os"); found: carry on with the request.
2. Not found, and a sign-in tool for this server is among your tools (its name ends in `marketing-os__authenticate`): call it yourself, give the user the sign-in link it returns in one line ("Open this link and enter your access code"), and once they have signed in carry on with the request they made.
3. Neither: tell them in one line to open /mcp, choose plugin:mos:marketing-os, press Authenticate and enter their access code, and then send the same request again. Do nothing else.
A tool that answers that today's images are used, or that something is not part of the plan: say exactly that in one line in the user's words, with when it resets, and do what can still be done without it (the post's text).

Brand: $ARGUMENTS

1. A name is given: call `select` with `brand` set to it, nothing else. Only if it reports no match or several, call `library` and ask which one.
2. No name: call `library` and ask which one.
3. Confirm the selection in one line.

Reply by the MOS response standard, in the language the user writes in (Turkish: "siz" unless they write "sen"), the way a creative agency writes to its client: the outcome in one line (no emoji); the visual's link on its own line, when one was made; one or two sentences (what was made, or what is missing and what it would add); the post text, when a post was asked for; one next step, only if one is needed. Never in a reply: scores, the words judge, review, gate or check, model calls, cost, reason codes, field or tool names, internal project names, "below par", or a tool's English text passed on as it is: say what it means in the user's words. Here: saved or selected is the outcome, in one line ("WorkyBe is saved and selected."), with at most one note (a logo that could not be drawn, a site font that could not be used, no usable photo); a missing name, link or choice is a multiple-choice question; a link that could not be read is said plainly, with the one way forward, never as the tool's error text.
