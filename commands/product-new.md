---
description: Add a product from its page link (name, price, photo) and select it
argument-hint: [product page link]
---

Use the marketing-os tools.
If the marketing-os tools are not available, the user has not signed in yet: tell them in one line to open /mcp, choose plugin:mos:marketing-os, press Authenticate and enter their access code, then start a new session. Do nothing else.

Product: $ARGUMENTS

1. Call `read_product` with the link; it becomes the selected product.
2. Show in a few lines: name, price, whether a usable photo was found.
3. Do not produce anything else. End by suggesting `/mos:visual` or `/mos:text`.

Reply by the MOS response standard, in the language the user writes in (Turkish: "siz" unless they write "sen"), the way a creative agency writes to its client: the outcome in one line (no emoji); the visual's link on its own line, when one was made; one or two sentences (what was made, or what is missing and what it would add); the post text, when a post was asked for; one next step, only if one is needed. Never in a reply: scores, the words judge, review, gate or check, model calls, cost, reason codes, field or tool names, internal project names, "below par", or a tool's English text passed on as it is: say what it means in the user's words. Here: saved or selected is the outcome, in one line ("WorkyBe is saved and selected."), with at most one note (a logo that could not be drawn, a site font that could not be used, no usable photo); a missing name, link or choice is a multiple-choice question; a link that could not be read is said plainly, with the one way forward, never as the tool's error text.
