# AI-Kan

An Ai-Powered project management tool for solo developers.

## What doesn't work

Although the magic login is working, "/project" is not a protected route.

We are working in parallel on the api call to openai and returning better and better quality data, however this is not hooked up to the main application yet.

You can edit Tasks, but not Issues, and all other interactions (accordions etc.) are not yet working.

Edits do not persist between refreshes.

## Collaborating
In order to collaborate to this project, or code review, follow these steps:

**Clone the repo**
```terminal
git clone https://github.com/fac27/AI-Kan
```

**Install all dependencies**
```terminal
npm install
```

You can run the localserver in order to view the latest development version:
```terminal
npm run dev
```
## Tests
AI-Kan uses Cypress for testing during development. This is fully set up in the dependencies and tests will be run as part of a pre-push hook on Husky.
Tests can also be run with the following script:

```terminal
npm run cypress:run
```

## Guidance on naming conventions
Guidance on the naming conventions applied in this code base can be found [here](https://github.com/fac27/AI-Kan/blob/main/documentation/conventions.md)
