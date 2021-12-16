![](.assets/project_logo.png)

Technical stack based on:
- ReactJS
- Typescript
- GraphQL
- graphql-code-generator
- Docker

## Available Scripts

In the project directory, you can run:

### `serve`
Serve production web app build

### `ts:check`
Check project for typescript errors.

### `check`
Check project for ESLint rules and typescript errors

### `lint`
Check and fix ESLint rules

### `update`
Check and update dependencies in `package.json`

### `gen`
Generate Typescript types and GraphQL client hooks based on GraphQL schema and queries

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

##Get started

- `git clone ...`
- `npm install`
- `cp .env.example .env`
- Edit .env
- `npm run gen`
- `npm run start` (development launch) / `npm run serve` (production launch)
