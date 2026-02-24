# Code Formatting

Consistent formatting improves readability and reduces friction in code
reviews. This folder describes the formatting tools used in the ESN
repository.

## Python

We recommend [Black](https://black.readthedocs.io/) for Python code
formatting. Install it with `pip install black` and run:

```bash
black .
```

Black is opinionated and has minimal configuration. Apply it across
services and packages to ensure uniform style.

## JavaScript/TypeScript

Use [Prettier](https://prettier.io/) for formatting JavaScript and
TypeScript files. Prettier can be installed via npm:

```bash
npm install --save-dev prettier
```

Then add a script in your `package.json`:

```json
"scripts": {
  "format": "prettier --write ."
}
```

Run `npm run format` to format client code.

## Editor Integration

Both Black and Prettier have integrations with popular editors such as VS
Code. Enable format‑on‑save to automatically apply formatting changes
whenever you save a file.