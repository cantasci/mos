---
name: marketing-os
description: Plan, write and produce on-brand marketing content for a small business from a short description, even when there is no brand guide: ad creatives, social media posts and stories, YouTube thumbnails and titles, Instagram captions, LinkedIn and X posts, post ideas from the competitors. Use whenever the user asks for marketing images, ads, posts, captions or post ideas for a business, even if they do not say "marketing". Requires the marketing-os tools.
---

# Marketing OS

Use the marketing-os tools and follow the instructions the marketing-os server gives. Every reply follows the response standard in references/responses.md: the outcome in one line (ready, a preview, waiting for something from the user, or not made), the visual, one or two sentences, the post text, one next step; in the user's language, with nothing from the server's internals.

Every image (a post, an ad, a thumbnail, a story frame) is made as `/mos:image` describes: the whole ad drawn as one picture in the studio, with design_request. Nothing else makes an image: no banner, no cover, no copy set straight onto a photo; say so in one line when one is asked for. Asked to add, list or choose a product: references/product-new.md, references/products-list.md, references/product-select.md. Asked which formats or channels exist: references/formats.md. Asked what to post, or about competitors: read the competitors with your web tools, keep what they say with competitor_notes, propose four posts with post_ideas and let the user pick one from a list.

If the marketing-os tools are not among your tools, do not conclude that the user is signed out yet:
1. When your tools are loaded on demand, search for them first (a tool search for "marketing-os"); found: carry on with the request.
2. Not found, and a sign-in tool for this server is among your tools (its name ends in `marketing-os__authenticate`): call it yourself, give the user the sign-in link it returns in one line ("Open this link and enter your access code"), and once they have signed in carry on with the request they made.
3. Neither: tell them in one line to open /mcp, choose plugin:mos:marketing-os, press Authenticate and enter their access code, and then send the same request again. Do nothing else.
A tool that answers that today's images are used, or that something is not part of the plan: say exactly that in one line in the user's words, with when it resets, and do what can still be done without it (the post's text).
