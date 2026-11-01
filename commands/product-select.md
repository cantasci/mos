---
description: Select which saved product to work on (or none)
argument-hint: [product name, or "none"]
---

Use the marketing-os tools.

Product: $ARGUMENTS

1. A name or "none" is given: call `select` with `product` set to it, nothing else. Only if it reports no match or several, call `library` and ask which one.
2. No name: call `library` and ask which one.
3. Confirm the selection in one line.
