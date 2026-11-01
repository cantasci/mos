---
description: Select which saved brand to work on
argument-hint: [brand name]
---

Use the marketing-os tools.
If the marketing-os tools are not available, the user has not signed in yet: tell them in one line to open /mcp, choose plugin:mos:marketing-os, press Authenticate and enter their access code, then start a new session. Do nothing else.

Brand: $ARGUMENTS

1. A name is given: call `select` with `brand` set to it, nothing else. Only if it reports no match or several, call `library` and ask which one.
2. No name: call `library` and ask which one.
3. Confirm the selection in one line.
