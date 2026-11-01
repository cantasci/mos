---
description: Write a text post or caption (LinkedIn, X, Instagram caption, YouTube title)
argument-hint: [channel and what the post is about]
---

Use the marketing-os tools.

Request: $ARGUMENTS

- If no brand is selected, set one up first.
- If the channel is not given, call `list_catalog` and ask which text channel to write for.
- Run `check_text` on every draft. If it fails, rewrite using its reason (at most twice), then tell the user what blocked it.
- Write in English unless the user explicitly asks for another language.
