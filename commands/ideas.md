---
description: Read the brand's competitors, propose four posts they are not making, let the user pick one from a list, and make it
argument-hint: [nothing | competitor names or links | what the posts should be about]
---

Use the marketing-os tools and your own web tools (web search and page fetch). Skip the strategist.
If the marketing-os tools are not available, the user has not signed in yet: tell them in one line to open /mcp, choose plugin:mos:marketing-os, press Authenticate and enter their access code, then start a new session. Do nothing else.

Request: $ARGUMENTS

You read the competitors yourself; the server reads nothing and chooses nothing. It keeps your notes with the brand and checks the posts you propose. The user makes one choice, from a list, and gets the finished post.

1. **Brand.** Pass its name (`brand`) when the user names one; with one saved brand nothing is needed. Set a brand up only when it is not saved yet.
2. **The notes.** Call `competitor_notes` with no competitors. Notes that are saved and not marked old: go to step 5, unless the request names other competitors.
3. **Who the competitors are.** The request names them (names or links): use those. Otherwise search the web for businesses that sell the same thing to the same customers in the same place as the brand, and ask the user once, with AskUserQuestion and `multiSelect: true`, which of them are their competitors: up to four options, each a name with its site and one line on what it sells. Use the ones they pick. Never ask this again once notes are saved.
4. **Read them.** For each competitor (at most five), read its own site (home, product or service pages, blog) and whatever of its own public posts your tools can open. Note two to five observations each: the subjects it keeps returning to, the offer it leads with, its tone. Every observation has the page it was read on and a few of their own words (at most fifteen), copied exactly. Note only what they say themselves, never what others say about them. A competitor whose pages you could not open is left out and named in the final reply. Save with `competitor_notes`; if it answers "Not yet", fix what it names and call it again.
5. **Four posts.** From the notes and the brand's own facts (its saved facts and description, and what the user wrote in the request), find what none of the competitors says and the brand can. Think of four posts, each answering a different gap where there are that many: a headline as it would read, the platform, whether it is a design or a text post (YouTube and TikTok: a design; X: a text post), the gap, the brand's own words it stands on (copied exactly), and one short line for the user on why this post. A post never names a competitor, never speaks about one, never borrows a competitor's wording and never ranks the brand ("the best", "the only") unless the brand said so itself. Headlines follow the plain-writing rule: no "X. Not Y." contrast, no colon reveal, no question answered by itself, no stacked fragments, no stock AI wording.
6. **Check.** Call `post_ideas` with the four (and `brief` with the user's words when they wrote something). "Not yet": fix what it names and call it again.
7. **The list.** Ask the user which post to make: one AskUserQuestion, single choice, with exactly the four options `post_ideas` returned, in its order (each option's label is the headline, its description the platform, the form and the reason). Ask nothing else.
8. **Make it.** The post they pick, or the idea they typed instead:
   - A design: follow `/mos:design` from its step 2, with the picked headline's message as the request and its basis among `brief.facts`; wait for the studio and give the finished design.
   - A text post: write it for the picked platform from the brand's facts, run `check_text`, and give it as `/mos:text` does.
9. **Reply once**, in the user's language: the finished post (the design's link, or the text as a quote), one sentence on which gap it answers (without a claim about any one competitor: "none of the competitors you named shows this"), and any competitor that could not be read.

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
    { "title": "Every finished job keeps its photos.", "platform": "linkedin", "form": "design", "gap": "None of them shows proof of the finished work", "basis": "photos, timestamps and signatures stay connected to every work order", "why": "They all talk about invoices and nobody shows the proof." },
    { "title": "The signature stays with the work order.", "platform": "instagram", "form": "design", "gap": "None of them mentions the customer's signature", "basis": "signatures stay connected to every work order", "why": "A moment every crew recognises." },
    { "title": "What a work order holds after the job.", "platform": "x", "form": "text", "gap": "None of them explains what stays on record", "basis": "photos, timestamps and signatures stay connected to every work order", "why": "A short explainer nobody else has written." },
    { "title": "A work order with its photos, in one minute.", "platform": "youtube", "form": "design", "gap": "None of them shows the record on screen", "basis": "photos, timestamps and signatures stay connected to every work order", "why": "A thumbnail for a one-minute walkthrough." }
  ],
  "brief": {
    "request": "Photos, timestamps and signatures stay connected to every work order.",
    "facts": ["photos, timestamps and signatures stay connected to every work order"]
  }
}
```
