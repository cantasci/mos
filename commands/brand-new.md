---
description: Set up a brand card from a link or a short description (name, what it does, colors, tone)
argument-hint: [link to the business, or name and a short description]
---

Use the marketing-os tools.
If the marketing-os tools are not among your tools, do not conclude that the user is signed out yet:
1. When your tools are loaded on demand, search for them first (a tool search for "marketing-os"); found: carry on with the request.
2. Not found, and a sign-in tool for this server is among your tools (its name ends in `marketing-os__authenticate`): call it yourself, give the user the sign-in link it returns in one line ("Open this link and enter your access code"), and once they have signed in carry on with the request they made.
3. Neither: tell them in one line to open /mcp, choose plugin:mos:marketing-os, press Authenticate and enter their access code, and then send the same request again. Do nothing else.
A tool that answers that today's images are used, or that something is not part of the plan: say exactly that in one line in the user's words, with when it resets, and do what can still be done without it (the post's text).

Business: $ARGUMENTS

**Called with nothing (the request above is empty):** call no tool. Answer in one line, in the user's language, with what the command needs and one example (`/mos:brand:new https://yourshop.com`), and stop.

1. If `<a link to the business>` is given, call `derive_brand_card` with `url` and any values the user stated; the server reads the rest.
2. Otherwise: if the name or what the business does is missing, ask for it in one question; call `list_catalog`, pick the tone that fits, and call `derive_brand_card`.
3. Show the result in a few lines: name, colors, tone, and what was found on the link (facts, products). The new brand is now selected.
4. Fonts from the site: when the result says the brand now uses fonts found on the site, ask one question with AskUserQuestion: "Your site's fonts are <heading font> / <body font>. Keep them as a brand rule, so a layout never swaps them for its own?", options "Yes, always use my fonts" (recommended, first) and "No, let each layout choose". On yes, call `derive_brand_card` again with the same `url` and `fonts: { "mandatory": true }`; on no, nothing more. When the result names a site font it could not use (the site serves it itself or from another service, so it may be a paid font), give its line from the result as it is: the user can add the font file if they hold a licence; until then the closest open font is used. Never ask when no site font is in use.
5. Do not produce any visuals or copy yet. End by suggesting `/mos:ideas`, `/mos:image` or `/mos:text`.

Reply by the MOS response standard, in the language the user writes in (Turkish: "siz" unless they write "sen"), the way a creative agency writes to its client: the outcome in one line (no emoji); the visual's link on its own line, when one was made; one or two sentences (what was made, or what is missing and what it would add); the post text, when a post was asked for; one next step, only if one is needed. Never in a reply: scores, the words judge, review, gate or check, model calls, cost, reason codes, field or tool names, internal project names, "below par", or a tool's English text passed on as it is: say what it means in the user's words. Here: saved or selected is the outcome, in one line ("WorkyBe is saved and selected."), with at most one note (a logo that could not be drawn, a site font that could not be used, no usable photo); a missing name, link or choice is a multiple-choice question; a link that could not be read is said plainly, with the one way forward, never as the tool's error text.
