---
description: Read the brand's competitors, propose four posts they are not making, let the user pick one from a list, and make it whole (picture, text, tags)
argument-hint: [nothing | competitor names or links | what the posts should be about]
---

Use the marketing-os tools and your own web tools (web search and page fetch). Skip the strategist.
If the marketing-os tools are not available, the user has not signed in yet: tell them in one line to open /mcp, choose plugin:mos:marketing-os, press Authenticate and enter their access code, then start a new session. Do nothing else.

Request: $ARGUMENTS

You read the competitors yourself; the server reads nothing and chooses nothing. It keeps your notes with the brand and checks the posts you propose. The user makes one choice, from a list, and gets a post ready to publish: its picture, its text, its tags and a line describing the picture. Every post has a picture; none is text only.

1. **Brand.** Pass its name (`brand`) when the user names one; with one saved brand nothing is needed. Set a brand up only when it is not saved yet.
2. **The notes.** Call `competitor_notes` with no competitors. Notes that are saved and not marked old: go to step 5, unless the request names other competitors.
3. **Who the competitors are.** The request names them (names or links): use those. Otherwise search the web for businesses that sell the same thing to the same customers in the same place as the brand, and ask the user once, with AskUserQuestion and `multiSelect: true`, which of them are their competitors: up to four options, each a name with its site and one line on what it sells. Use the ones they pick. Never ask this again once notes are saved.
4. **Read them.** For each competitor (at most five), read at least three pages of its own site (home, a product or service page, its blog or news) and its own public posts where your tools can open them. Note two to five observations each: the subjects it keeps returning to, the offer it leads with, its tone. Every observation has the page it was read on and a few of their own words (at most fifteen), copied exactly. Note only what they say themselves, never what others say about them. A competitor whose pages you could not open is left out and named in the final reply. Save with `competitor_notes`; if it answers "Not yet", fix what it names and call it again.
5. **Four posts.** From the notes and the brand's own facts (its saved facts and description, and what the user wrote in the request), find what none of the competitors says and the brand can. Think of four posts that are four different posts, each from another angle (`angle`: `announcement` news of the brand, `proof` a fact or figure it stated, `opinion` a view it holds on its trade, `invitation` to meet, try or reply, `explainer` how something works, `scene` a moment from the customer's work) and each answering a different gap where there are that many. Each has a headline as it would read on its picture, the platform, the gap, the brand's own words it stands on (copied exactly), and one short line for the user on why this post. When the request is about an event or a date, each of the four says something different about it, never the same announcement four times. A post never names a competitor, never speaks about one, never borrows a competitor's wording and never ranks the brand ("the best", "the only") unless the brand said so itself. Headlines follow the plain-writing rule: no "X. Not Y." contrast, no colon reveal, no question answered by itself, no stacked fragments, no stock AI wording.
6. **Check.** Call `post_ideas` with the four (and `brief` with the user's words when they wrote something). "Not yet": fix what it names and call it again.
7. **The list.** Ask the user which post to make: one AskUserQuestion, single choice, with exactly the four options `post_ideas` returned, in its order (each option's label is the headline, its description the platform and the reason). Ask nothing else.
8. **Make it whole.** The post they pick, or the idea they typed instead, is made as one package:
   - **The picture.** Follow `/mos:image` from its step 2, with the picked headline's message as the request and its basis among `brief.facts`. The format follows the platform: LinkedIn `linkedin_post_square`; Instagram `instagram_square`; X `instagram_square` with `platform: "x"`; YouTube `youtube_thumbnail`; TikTok `story` with `platform: "tiktok"`. Send the request, then write the text below while the studio works, then wait for the design.
   - **The text.** Written for the platform from the brand's facts and the user's words, never repeating the picture's headline word for word: a first line that makes the reader stop and ends before the fold, what the brand does or brings in two to four plain sentences (X: one or two), and one thing the reader can do. No tag inside the text.
   - **The tags.** X two; LinkedIn and Instagram three to five. A mixed set, each with its kind: `topic` (the post's subject; for an event the tag that event itself uses, looked up with a web search, never guessed), `sector` (the trade the reader follows), `place` (when the post has one), `brand` (at most one). Never a competitor's name, never a tag made up from the headline.
   - **Check.** Call `check_text` with the text, `tags`, `brand` and the brief. If it fails, rewrite by its reason (at most twice). Its `post` is the text with the tags set under it: give that, as it is.
   - **The picture in words.** One sentence describing the finished design for readers who cannot see it (what is in the scene and the headline on it), for the platform's alt text field.
9. **Reply once**, in the user's language, in this order: one line that the post is ready and for which platform; the design's link on its own line; the post text with its tags, as a quote; the alt text, on its own line with its label; one sentence on which gap it answers (without a claim about any one competitor: "none of the competitors you named shows this"); any competitor that could not be read. When the design is not finished after the wait, give the text and tags as ready and say that `/mos:image <job id>` fetches the picture. Ask for nothing at the end unless a fact is missing that the post needs (a date, a stand number).

Write nothing to the user between tool calls except the questions above. Never show the notes unless the user asks for them; when they do, list each competitor with what it says and the page it was read on.

The shape of the calls (an example; what you read and the brand's own words replace every value):

<!-- competitor_notes example -->
```json
{
  "brand": "Fieldline",
  "competitors": [
    {
      "name": "Jobhaus",
      "url": "https://jobhaus.example",
      "observations": [
        { "theme": "Leads with faster invoicing", "quote": "Get paid faster with online invoices", "source": "https://jobhaus.example/features" },
        { "theme": "Customer stories about saved hours", "quote": "Crews save ten hours a week", "source": "https://jobhaus.example/customers" }
      ]
    }
  ]
}
```

<!-- post_ideas example -->
```json
{
  "brand": "Fieldline",
  "ideas": [
    { "title": "Every finished job keeps its photos.", "platform": "linkedin", "angle": "proof", "gap": "None of them shows proof of the finished work", "basis": "photos, timestamps and signatures stay connected to every work order", "why": "They all talk about invoices and nobody shows the proof." },
    { "title": "The signature stays with the work order.", "platform": "instagram", "angle": "scene", "gap": "None of them mentions the customer's signature", "basis": "signatures stay connected to every work order", "why": "A moment every crew recognises." },
    { "title": "What a work order holds after the job.", "platform": "x", "angle": "explainer", "gap": "None of them explains what stays on record", "basis": "photos, timestamps and signatures stay connected to every work order", "why": "A short explainer nobody else has written." },
    { "title": "A work order with its photos, in one minute.", "platform": "youtube", "angle": "announcement", "gap": "None of them shows the record on screen", "basis": "photos, timestamps and signatures stay connected to every work order", "why": "A thumbnail for a one-minute walkthrough." }
  ],
  "brief": {
    "request": "Photos, timestamps and signatures stay connected to every work order.",
    "facts": ["photos, timestamps and signatures stay connected to every work order"]
  }
}
```

<!-- check_text example -->
```json
{
  "channel": "x_post",
  "brand": "Fieldline",
  "text": "A work order is not finished when the job is. Its photos, timestamps and signatures stay connected to it, so the record answers the question a customer asks six months later.",
  "tags": [
    { "tag": "#FieldService", "kind": "sector" },
    { "tag": "#WorkOrders", "kind": "topic" }
  ],
  "brief": {
    "request": "Photos, timestamps and signatures stay connected to every work order.",
    "facts": ["photos, timestamps and signatures stay connected to every work order"]
  }
}
```
