# Frontend Application

This frontend application contains the Community Information Tool.

## Community Information Tool

This is an embedded PowerBI report in addition to a home page and web interface. The home page allows a user to choose to view the public report or to use their IDIR to log in to view the internal report. A logged in user has the option to view either the internal report or the public report. The data viewing functionality is implemented in the PowerBI environment. The web interface allows a user to Save to PDF (or print) the currently selected report page as well as to create and copy to clipboard a link to the Tool for a specific community or regional district.

## Prerequisites

#### Copy environment variables

    ```
    cp .env.template .env
    ```

#### Ensure the file public/static/env.js exists.

    This file contains hardcoded environment values

#### Start all CIT docker containers, most importantly `cit-api` and `cit-db`.

    ```
    docker-compose up -d cit-api db
    ```

## Start up the frontend

There are two ways to start the frontend application depending on development purposes.

- ✅ Recommended: Hot-reload Development Server

  ```
  yarn start
  ```

- 🐳 Alternative: Docker-based Static Container
  ```
  docker-compose up -d cit-web
  ```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\ Open <http://localhost:3000> to view it in the browser.

The page will reload if you make edits.\ You will also see any lint errors and warnings in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\ See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\ It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\ Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

### `yarn lint`

Runs ESLint on all files and outputs any warnings and errors to the console.

### `yarn lint:fix`

Runs ESLint on all files and automatically fixes any errors found.

## Source Folder structure

`mocks` - scripts to mock objects in unit tests.

`components` - visual components and pages in the application.

`constants` - constants strings and numbers shared across application components.

`contexts` - context like authorization, shared across application components.

`hooks` - component-specific code chunks, intended to match react life cycles.

`layouts` - User authentication layout, for reuse in the page design.

`store` - React redux store files.

`stories` - storybook assets.

`utils` - User authentication page wrappers, for reuse in the router.

## Developer notes

- Hot module reloading with `yarn start` doesn't always bust the build files in the browser. Known areas to refresh the page on an edit is the redux store files in `src/store/`.
- Environment variables must both be entered in .env and src/public/static/env.js for the application to run
