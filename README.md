This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Initial Setup

For initial setup you need to have installed:
* [nodejs](https://nodejs.org/en/download/)
* [yarn](https://classic.yarnpkg.com/en/docs/install/)
* Whatever IDE you like to code in (eg. [vscode](https://code.visualstudio.com/Download))

Once these are installed:
* Clone the git repository
* Install dependencies by running `yarn` from the project directory.
* You may now start the project by running `yarn start`.

## Folder Structure
- React and client-side code in `src/`
- Server code in `server/`
- Non-React static files and entry html file in `public/`

This project is written using typescript for both the client and server logic.

The server code runs on port 8888 and is accessed using the [proxy feature of create-react-app](https://create-react-app.dev/docs/proxying-api-requests-in-development/).

This project uses [socket.io](https://socket.io/) and all client-server communications are implemented using 
_real-time, bidirectional and event-based communication._

## Available Scripts

In the project directory, you can run:

### `yarn`

Equivalent to: `npm install`.

This will install all project dependencies. <br />
Run this command after cloning the repository and each time you pull new changes from github.

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint and compilation errors in the console.

### `yarn add <package> [...<package>]`

Equivalent to: `npm install <package> [...<package>]`

Adds new packages to the project's dependencies.<br />
Be sure to install its type definitions using `yarn add @types/<package>`

## Learn More

This project was created using [Create React App](https://facebook.github.io/create-react-app).

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).