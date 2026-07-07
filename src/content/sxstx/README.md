# SXSTX Calculator Content

The SXSTX Calculator portal reads update and FAQ content from this folder. You can edit these files without changing page code.

## Add A New Update

Edit `updates.json` and add a new object to the array:

```json
{
  "date": "2026-07-07",
  "title": "Update title",
  "body": "Short update text.",
  "link": "https://sxstx.feiyastudio.com/"
}
```

Supported fields:

- `date`: Update date in `YYYY-MM-DD` format.
- `title`: Update headline.
- `body`: Update body text.
- `link`: Optional URL for the update.

## Edit FAQ

Edit `faq.json` and add, remove, or reorder FAQ objects:

```json
{
  "question": "Where is the calculator?",
  "answer": "The calculator is available at https://sxstx.feiyastudio.com/"
}
```

Supported fields:

- `question`: The FAQ question.
- `answer`: The FAQ answer.

No code changes are needed when only editing updates or FAQ content.
