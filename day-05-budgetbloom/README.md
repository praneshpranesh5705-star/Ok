# Day 5 — BudgetBloom

BudgetBloom is a polished personal finance dashboard for monitoring balance, income, spending, category mix, transactions, and savings goals.

## Features

- Responsive dashboard for desktop and mobile
- Total balance, income, and spending cards
- Income vs spending chart
- Spending category donut chart
- Recent transaction list
- Add-expense modal with live balance updates
- Savings goal progress cards
- Light/dark mode
- Browser local storage for theme preference
- No build step or backend required

## How to run

### Option 1: Open directly
Open `index.html` in any modern browser.

### Option 2: Run a local server
From this folder, run:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Files

- `index.html` — dashboard structure and content
- `styles.css` — responsive styling and theme system
- `script.js` — theme toggle, modal form, live balance update, and chart range interaction

## Notes

This is a front-end demo using sample data. It does not connect to a bank account or financial API.
