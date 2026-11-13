---
description: Produce a finished ad drawn in one picture (scene and copy together) by the user's own ChatGPT, with the brand's logo set afterwards
argument-hint: [what the ad is for, the message, format]
---

Use the marketing-os tools and the browser tools (Claude in Chrome). Skip the strategist.
If the marketing-os tools are not available, the user has not signed in yet: tell them in one line to open /mcp, choose plugin:mos:marketing-os, press Authenticate and enter their access code, then start a new session. Do nothing else.

Request: $ARGUMENTS

This path makes the whole ad as one picture: the image model draws the scene and the copy together, and the server sets the brand's logo. The picture is made by the user's own signed-in ChatGPT in their Chrome, driven from here. Use it when the user asks for a design or a full ad; `/mos:visual` stays the way to set copy over a photo they already have.

1. **Brand.** Pass its name to the tools (`brand`) when the user names one; with one saved brand nothing is needed. Set a brand up only when it is not saved yet (its logo and colours come from its site).
2. **Copy.** From the user's words only: a headline that carries the idea, with the one phrase that takes the brand's colour marked `[[...]]` (at most three words); a subline; a support line when their text has one. Every number must be one the user stated.
3. **Scene.** Write the scene's content in the house style the `design_prompt` tool describes: the product at work as the hero (a screen with specific, plausible rows), two to five small cards that tell the message's sequence or contrast, the real place where the brand's customer works, one or two props. Never a metaphor, never one object on an empty ground. You give content only; the positions, the colour and the logo's empty corner are compiled by the tool.
4. **Prompt.** Call `design_prompt`. If it answers "Not yet", fix what it names and call it again. Never edit the prompt it returns.
5. **Make the picture.** In a new browser tab open `https://chatgpt.com/`. Clear the message box first (select all, delete): a restored draft mixes into what you type. Send the prompt as ONE message: a line break sends the message, so type it as the single paragraph it is, or save it to a `.txt` file, attach that file and send "Generate the image described in the attached file exactly as written. One image only." Attach the product photo when the result names one. Never attach a picture of someone else's work as a reference. If the browser tools are not available, give the user the prompt to paste into ChatGPT and ask for the picture back.
6. **Download.** Before the first download of the conversation, ask the user (file, source); then save the picture with its share menu's Download.
7. **Read it.** Look at the picture and read every line of the copy against `expect.copy`, word for word, punctuation and special letters included. A wrong or missing word: ask ChatGPT in the same chat for the same picture with that line corrected, at most twice; after that tell the user what is wrong and stop. Never repair a picture by hand.
8. **Finish.** Upload the picture (`photo_upload`) and call `finish_design` with its `photoId` and `textChecked: true`.

Write nothing to the user between tool calls. One short reply at the end: the link, one sentence on what was made, and one line that the values shown on the screens in the scene are illustrative, not the user's data. Every question to the user is multiple choice, asked with the AskUserQuestion tool.

The shape of the call (an example; the user's words and your choices replace every value):

<!-- design_prompt example -->
```json
{
  "brand": "Fieldline",
  "format": "instagram_square",
  "slots": {
    "headline": "Completed is a status. [[Not the proof.]]",
    "subline": "A completed job needs more than a status update.",
    "support": "Photos, timestamps and signatures stay connected to every work order."
  },
  "brief": {
    "request": "A post about work orders: a completed job needs more than a status update. Photos, timestamps and signatures stay connected to every work order.",
    "facts": ["a completed job needs more than a status update", "photos, timestamps and signatures stay connected to every work order"]
  },
  "scene": {
    "hero": { "device": "phone", "rows": ["WO-10482", "Status · Completed", "Photos · 3", "Time · 14:32", "Signature · Signed"] },
    "cards": [
      { "label": "Photo 1 of 3", "shows": "a photo thumbnail of a freshly replaced valve" },
      { "label": "12.05.2026 · 14:32" },
      { "label": "Signature", "shows": "a handwritten ink scribble" }
    ],
    "story": "from the status row to its three proofs",
    "environment": "a mechanical plant room with insulated pipes, valves and a pump set",
    "props": ["an adjustable wrench", "a pair of work gloves"]
  }
}
```
