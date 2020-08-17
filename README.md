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
This project is written using [Typescript](https://www.typescriptlang.org/docs/home) for both the client and server logic.

### Server and Socket<!-- autolink prevention -->.io
The server code listens on port 8888, but is typically reached via the proxy provided by the [proxy feature of create-react-app](https://create-react-app.dev/docs/proxying-api-requests-in-development/).

This project uses [socket.io](https://socket.io/) and all client-server communications are implemented using sockets to achieve _real-time, bidirectional and event-based communication._

### Css and Styled Components
Most css is implemented using [styled components](styled-components.com/). If you use vscode, the [vscode-styled-components](https://marketplace.visualstudio.com/items?itemName=jpoissonnier.vscode-styled-components) extension is recommended to help with syntax highlighting and autocomplete.

Base colours have been defined in `src/constants` and are used as necessary. Transparency and other sass-like colour adjustments may be made using the included [Color](https://www.npmjs.com/package/color) library.

[WIP] Base colors and other common values should be defined in the constants file, but colour adjustments made for the sake of unique visual effects can be made in the main source code but should be written so that changing the base color scheme will not easily break the effect.

### Folder Structure
- `global.d.ts`
  - A type definition file used to declare shared types between client and server code.
- `src/` 
  - Contains client side application code. The entry file is `index.tsx`.
  - `src/components`
    - Components of the application are bundles of related React components, functions, and helpers grouped by application features.
  - `src/constants`
    - Constant values used across the application.
  - `src/controls`
    - React components that are related to UI or UX and not the applications main logic.
  - `src/layouts`
    - React components that control the layout and responsiveness of the webpages.
  - `src/libraries`
    - Common shared classes, helper functions, and infrastructure code.
- `server/`
  - Contains the server-side application code. The entry file is `index.ts`.
- `public/`
  - Contains static files and the entry html file


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