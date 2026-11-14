# Listing the products

Use the marketing-os tools.
If the marketing-os tools are not available, the user has not signed in yet: tell them in one line to open /mcp, choose plugin:mos:marketing-os, press Authenticate and enter their access code, then start a new session. Do nothing else.

Call `library` and show the products as a short list: `<name> — <price>`, the selected one marked. If no brand is selected, list all products grouped by brand. Then one line: select one with `/mos:product:select <name>` or add one with `/mos:product:new <product link>`. Do not produce anything else.

Answer in the language the user writes in (Turkish: "siz" unless they write "sen"), in the user's words rather than the tool's English: the answer is the list itself, with no outcome label. If the tool could not answer, say so in one plain line with the one way forward; never pass on its error text.
