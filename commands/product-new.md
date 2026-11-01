---
description: Add a product from its page link (name, price, photo) and select it
argument-hint: [product page link]
---

Use the marketing-os tools.

Product: $ARGUMENTS

1. Call `read_product` with the link; it becomes the selected product.
2. Show in a few lines: name, price, whether a usable photo was found.
3. Do not produce anything else. End by suggesting `/mos:visual` or `/mos:text`.
