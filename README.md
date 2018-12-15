# REXIN: A template for React/Express project

[![author](https://img.shields.io/badge/author-@Ramon%20Cardena-blue.svg)](https://twitter.com/ramon_cardena)
![releaste](https://img.shields.io/badge/release-v.1.0.0-green.svg)

## Getting started

This is a base template written on JavaScript with React.

## Features

-   Based on [React](https://github.com/facebook/react/) with [Create React App](https://github.com/facebook/create-react-app).
-   Global state management with [Redux](https://redux.js.org/)
-   Internationalization with [i18next](https://github.com/i18next/react-i18next).
-   Webfonts with [Webfontloader](https://github.com/typekit/webfontloader).
-   Styling with [Styled-Components](https://www.styled-components.com/).
-   Icons with [React Icon Kit](https://github.com/wmira/react-icons-kit).
-   Connected to **Rexin Backend**.
-   Authentication based on JWT.
-   Role based authorization.
-   User registration workflow (Sign-up and Verification by email).
-   User management workflow (Sign-in, Edit Profile, Password Forgot and Password Reset).
-   Admin page for users with Admin role.
-   Contact form through Rexin Backend and [Mailgun](https://www.mailgun.com/).
-   Root url for default language and folders for aditional ones.
-   Google crawler friendly.
-   SEO ready.
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

├── build
├── public
│   └── locales
│       ├── en
│       └── es
├── server
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

## React
The app is based on [Create React App](https://github.com/facebook/create-react-app) without ejecting, so all the Server Side Rendering in mounted over CRA in a separate folder and you can develop your React app as usual.


## Server Side Render (Isomorphic App)
The SSR part of the application is based on Patick Carlson's project [CRA-SSR](https://github.com/cereallarceny/cra-ssr). Running in SSR mode we have:

- React Router v4 with Thunk.
- Full SEO support with React Helmet.
- Preloaded page data via async/await and React Frontload.
- Code splitting via React Loadable.
- Server-side cookie support
- Full internationalization support with [i18next](https://github.com/i18next/react-i18next).

If you want to learn more about SSR I hightly recommend you to read Patick's tutorial [Server-side rendering with create-react-app, code-splitting, preloaded data, React Router, Helmet, Redux, and Thunk](https://medium.com/@cereallarceny/server-side-rendering-in-create-react-app-with-all-the-goodies-without-ejecting-4c889d7db25e).


## Backend
Rexin Frontend connects to Rexin Backend for user registration, authentication and mailing. Rexin Backend is based on Daniel Avellaneda's repository [Node.js express.js MongoDB JWT REST API - Basic Project Skeleton](https://github.com/davellanedam/node-express-mongodb-jwt-rest-api-skeleton).The main features of the backend are:

- Multiple environment ready (development, production)
- Custom email/password user system with basic security and blocking for preventing brute force attacks.
- Compressed responses.
- Secured HTTP headers.
- CORS ready.
- Cache ready (Redis)
- HTTP request logger in development mode.
- User roles.
- Pagination ready.
- User profile.
- Users list for admin area.
- Login access log with IP, browser and country location (for country it looks for the header cf-ipcountry that CloudFlare creates when protecting your website).
- API autogenerated documentation by Postman.
- API collection example for Postman.
- Testing with mocha/chai for API endpoints.
- NPM scripts for cleaning and seeding the MongoDB database.
- NPM script for keeping good source code formatting using prettier and ESLint.
- Use of ESLint for good coding practices.
- Mailer example with Nodemailer and Mailgun.
- Contact form endpoint for sending the form with Mailgun.
- JWT Tokens, provide login with Authorization header with value Basic username:password where username:password MUST BE ENCODED with Base64.
- Make requests with a token after login with Authorization header with value Bearer yourToken where yourToken is the signed and encrypted token given in the response from the login process.



## Configuration
Main features can be configured through the config.js file in the root folder.

**General**

version [string]

**i18n**

DEFAULT_LANGUAGE [sring]

ALL_LANGUAGES [array]

**Colors**

PRIMARY_COLOR [string]

SECONDARY_COLOR [string]

HOVER_COLOR [string]

TEXT_COLOR [string]

TEXT_LIGHT_COLOR [string]

TEXT_STRONG_COLOR [string]

BACKGROUND_COLOR [string]

MODAL_BACKGROUND [string]

**SEO**

DEV_SITE_URL [string]

PROD_SITE_URL [string]

DEFAULT_TITLE [string]

DEFAULT_DESCRIPTION [string]

DEFAULT_SEP [string]

FACEBOOK_APP_ID [string]

DEFAULT_TWITTER [string]

**Backend API**

BASE_URL [string]

**Social Networks Menu**

facebook [
{
    active: boolean,
    link: string
} ]

twitter [
{
    active: boolean,
    link: string
} ]

linkedin [
{
    active: boolean,
    link: string
}]

instagram [
{
    active: boolean,
    link: string
} ]

github [
{
    active: boolean,
    link: string
} ]

## Authentication and authorization



## Internationalization



## Components
### NavBar
The Navbar component is a modular navbar with the following components:

- Logo and Title on the left.
- Navigation menu, account menu, admin menu, icon menu, sign-in/sign-out button and mobile buton on the right.

### FooterBar
The FooterBar compontent is a navbar with the following components:

- Copyright notice on the left.
- Navigation menu and social icons menu on the right.



## Pages

## Bugs or improvements

Feel free to report any bugs or improvements. Pull requests are always welcome.

## I love this! How can I help?

It´s amazing you feel like that! Send me a tweet [Ramon Cardena](https://twitter.com/ramon_cardena), share this with others, make a pull request or if you feel really thankful you can always buy me a beer! Enjoy!

## Acknowledgements

Grateful to the authors of existing related projects for their ideas and/or collaboration:

- Daniel Avellaneda [@davellanedam](https://github.com/davellanedam)
- Patrick Cason[@cereallarceny](https://github.com/cereallarceny)

## License

This project is open-sourced software licensed under the MIT License. See the LICENSE file for more information.
