# Formats, channels, tones and copy limits

If the marketing-os tools are not among your tools, do not conclude that the user is signed out yet:
1. When your tools are loaded on demand, search for them first (a tool search for "marketing-os"); found: carry on with the request.
2. Not found, and a sign-in tool for this server is among your tools (its name ends in `marketing-os__authenticate`): call it yourself, give the user the sign-in link it returns in one line ("Open this link and enter your access code"), and once they have signed in carry on with the request they made.
3. Neither: tell them in one line to open /mcp, choose plugin:mos:marketing-os, press Authenticate and enter their access code, and then send the same request again. Do nothing else.
A tool that answers that today's images are used, or that something is not part of the plan: say exactly that in one line in the user's words, with when it resets, and do what can still be done without it (the post's text).

Call `list_catalog` and present it as three short tables:

1. Visual formats: name, size, what it is for, headline and CTA limits.
2. Text channels: name, max characters, characters visible before "more", max hashtags.
3. Tones.

Then list the copy rules in one line each. Do not produce anything else.

Answer in the language the user writes in (Turkish: "siz" unless they write "sen"), in the user's words rather than the tool's English: the answer is the list itself, with no outcome label. If the tool could not answer, say so in one plain line with the one way forward; never pass on its error text.
