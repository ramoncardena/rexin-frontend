# REXIN: A template for React/Express project

[![author](https://img.shields.io/badge/author-@Ramon%20Cardena-blue.svg)](https://twitter.com/ramon_cardena)
![releaste](https://img.shields.io/badge/release-v.1.0.0-green.svg)

## Getting started

This is a base template written on JavaScript with React.

## Features

-   Based on [React](https://github.com/facebook/react/).
-   Global state management with [Redux](https://redux.js.org/)
-   Connected to REXIN Backend.
-   Authentication based on JWT.
-   Role based authorization.
-   Internationalization with [i18next](https://github.com/i18next/react-i18next).
-   Webfonts with [Webfontloader](https://github.com/typekit/webfontloader).
-   Styling with [Styled-Components](https://www.styled-components.com/).
-   User registration workflow (Sign-up and Verification).
-   User management workflow (Sign-in, Edit Profile, Password Forgot and Password Reset).
-   Admin page for users with Admin role.
-   Icons with [React Icon Kit](https://github.com/wmira/react-icons-kit).
-   ESLint for good coding practices.
-   Code formatting using Prettier and ESLint.

## Requirements

-   Node.js **8+**

## How to install

### Using Git (recommended)

1. Clone the project from github. Change "myproject" to you project name.

```bash
git clone https://github.com/davellanedam/node-express-mongodb-jwt-rest-api-skeleton.git ./myproject
```

### Using manual download ZIP

1. Download repository
2. Uncompress to your desired directory

### Install npm dependencies after installing (Git or manual download)

```bash
cd myproject
npm install
npm update
```

## Available Scripts

The project was initialized with [create-react-app](https://github.com/facebook/create-react-app). In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Folder Structure

```my-app

├── public
│   ├── locales
│   │   ├── en
│   │   └──es
└── src
    ├── api
    ├── components
    ├── constants
    ├── images
    ├── pages
    │   ├── account
    │   └── admin
    ├── reducers
    ├── utils
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    └── serviceWorker.js
```

### Important folders

#### /pages

#### /pages/account

#### /pages/admin

#### /components

#### /api

#### /images

#### /public/locales

#### /utils

#### /reducers

#### /constants

## Configuration

## Internationalization

## Components

## Pages

## Bugs or improvements

Feel free to report any bugs or improvements. Pull requests are always welcome.

## I love this! How can I help?

It´s amazing you feel like that! Send me a tweet [Ramon Cardena](https://twitter.com/ramon_cardena), share this with others, make a pull request or if you feel really thankful you can always buy me a beer! Enjoy!

## Acknowledgements

Grateful to the authors of existing related projects for their ideas and collaboration:

[@davellanedam](https://github.com/davellanedam)

## License

This project is open-sourced software licensed under the MIT License. See the LICENSE file for more information.
