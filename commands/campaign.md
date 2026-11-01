---
description: Propose three campaign concepts and check whether the set is publishable
argument-hint: [goal of the campaign, offer, available photos]
---

Use the marketing-os tools.
If the marketing-os tools are not available, the user has not signed in yet: tell them in one line to open /mcp, choose plugin:mos:marketing-os, press Authenticate and enter their access code, then start a new session. Do nothing else.

Request: $ARGUMENTS

- If no brand is selected, set one up first.
- Propose three concepts, each for a different customer motivation and with exactly one offer.
- Call `check_concept_set` and tell the user plainly whether the set is publishable and what is missing (usually more photos).
- Produce visuals only for concepts the user picks, and only after the set check.
