---
description: Select which saved brand to work on
argument-hint: [brand name]
---

Use the marketing-os tools.

Brand: $ARGUMENTS

1. A name is given: call `select` with `brand` set to it, nothing else. Only if it reports no match or several, call `library` and ask which one.
2. No name: call `library` and ask which one.
3. Confirm the selection in one line.
