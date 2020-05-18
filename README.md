This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Initial Setup
For initial setup you need to have installed:
- [nodejs](https://nodejs.org/en/download/)
- [yarn](https://classic.yarnpkg.com/en/docs/install/)
- [vscode](https://code.visualstudio.com/Download) (optional) 
- [vscode-styled-components](https://marketplace.visualstudio.com/items?itemName=jpoissonnier.vscode-styled-components) (optional)

Once these are installed:
- Clone the git repository
- Install dependencies by running `yarn` from the project directory.
- You may now start the project by running `yarn start`.

## This Project
### Typescript
This project is written using typescript for both the client and server logic.

### Server and Socket<!-- autolink prevention -->.io
The server code listens on port 8888, but is typically reached via the proxy provided by the [proxy feature of create-react-app](https://create-react-app.dev/docs/proxying-api-requests-in-development/).

This project uses [socket.io](https://socket.io/) and all client-server communications are implemented using sockets to achieve _real-time, bidirectional and event-based communication._

### styled components
Most css is implemented using [styled components](styled-components.com/). If you use vscode, the [vscode-styled-components](https://marketplace.visualstudio.com/items?itemName=jpoissonnier.vscode-styled-components) extension is recommended to help with syntax highlighting and autocomplete.

### Folder Structure
- `src/` 
  - Contains bootstrap files mostly.
- `src/components/`
  - Contains React components and the pages that compose them.
- `src/constants/`
  - Contains commonly used values such as color values.
- `src/lib/`
  - Contains React agnostic functionality.
- `src/observables/`
  - Application persisted and global state, and server communication are implemented using observables here. 
- `server/`
  - Contains the server-side code.
- `public/`
  - Contains non React static files and the entry html file

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