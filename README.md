# REXIN: A template for React with Server Side Rendering and Create-React-App

[![author](https://img.shields.io/badge/author-@Ramon%20Cardena-blue.svg)](https://twitter.com/ramon_cardena)
![releaste](https://img.shields.io/badge/release-v.1.0.0-green.svg)

## Introduction

This is a base template/skeleton to be used as a starter for a **React project**. It comes with many features to start a project from a website to a full web app. It works together with **Rexin Backend** to manage authentication, users and collections.<br>
If do feel yo can imporve this project, collaborations are more than welcome!

## Features

-   Based on [React](https://github.com/facebook/react/) with [Create React App](https://github.com/facebook/create-react-app).
-   **Global state** management with [React Redux](https://react-redux.js.org/)
-   **Internationalization** with [i18next](https://github.com/i18next/react-i18next).
-   **Webfonts** with [Webfontloader](https://github.com/typekit/webfontloader).
-   **Styling** with [Styled-Components](https://www.styled-components.com/).
-   **Icons** with [React Icon Kit](https://github.com/wmira/react-icons-kit).
-   Connected to **[Rexin Backend](https://github.com/ramoncardena/rexin-backend)**.
-   **Authentication** based on JWT.
-   **Role based** authorization.
-   **User registration** workflow (Sign-up and Verification by email).
-   **User management** workflow (Sign-in, Edit Profile, Password Forgot and Password Reset).
-   Admin page for users with **Admin role**.
-   **Contact Form** through Rexin Backend and [Mailgun](https://www.mailgun.com/).
-   Root url for default language and folders for aditional ones.
-   **Google crawler** friendly.
-   **SEO** optimized and ready.
-   ESLint for good coding practices.
-   Code formatting using Prettier and ESLint.

## Requirements

-   Node.js **8+**

## How to install

### Using Git (recommended)

1. Clone the project from github. Change "myproject" to you project name.

```bash
git clone https://github.com/ramoncardena/rexin-frontend ./myproject
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

Runs the app in Server Side Rendering mode. Express starts in port 3000 managed by [PM2](https://pm2.io/runtime/).<br>
Remember to execute `npm run build` before runining the server localy.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run cra`

Runs the app in the development mode as originaly in Create React App without Server Side Rendering.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run serve`

Runs de app in Server Side Rendering mode in development. Express starts in port 3000 managed by [Nodemon](https://nodemon.io/). The server will watch for changes and live reload.<br>
Remember to execute `npm run build` if you make changes inside the client application in `/src`.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


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
    └── index.js
```

## React
The app is based on [Create React App](https://github.com/facebook/create-react-app) without ejecting, so all the Server Side Rendering in mounted over CRA in a separate folder and you can develop your React app as usual.


## Server Side Render (Isomorphic App)
The SSR part of the application is based on [Patick Carlson](https://github.com/cereallarceny)'s project [CRA-SSR](https://github.com/cereallarceny/cra-ssr). Running in SSR mode we have:

- [React Router v4](https://github.com/ReactTraining/react-router) with [Thunk](https://github.com/reduxjs/redux-thunk).
- **Full SEO support** with [React Helmet](https://github.com/nfl/react-helmet).
- **Preloaded page data** via async/await and [React Frontload](https://github.com/davnicwil/react-frontload).
- **Code splitting** via [React Loadable](https://github.com/jamiebuilds/react-loadable).
- Server-side **cookie support**
- **Full internationalization** support with [i18next](https://github.com/i18next/react-i18next).

`/server` folder contains the files for running the server and processing the files server side. There are also some changes to the original CRA in `index.js` `App.js` and `routes.js` to make all SSR work.

If you want to learn more about SSR I hightly recommend you to read Patick's tutorial [Server-side rendering with create-react-app, code-splitting, preloaded data, React Router, Helmet, Redux, and Thunk](https://medium.com/@cereallarceny/server-side-rendering-in-create-react-app-with-all-the-goodies-without-ejecting-4c889d7db25e).


## Backend
**Rexin Frontend** connects to **[Rexin Backend](https://github.com/ramoncardena/rexin-backend)** for user registration, authentication and mailing. **Rexin Backend** is based on [Daniel Avellaneda](https://github.com/davellanedam/)'s repository [Node.js express.js MongoDB JWT REST API - Basic Project Skeleton](https://github.com/davellanedam/node-express-mongodb-jwt-rest-api-skeleton).The main features of the backend are:

- **Multiple environment** ready (development, production)
- Custom **email/password user system** with **basic security** and **blocking** for preventing brute force attacks.
- **Compressed** responses.
- **Secured** HTTP headers.
- **CORS** ready.
- **Cache** ready (Redis)
- HTTP request **logger** in development mode.
- User **roles**.
- **Pagination** ready.
- User **profile**.
- Users list for **admin area**.
- **Login access log** with IP, browser and country location (for country it looks for the header cf-ipcountry that CloudFlare creates when protecting your website).
- API **autogenerated documentation** by Postman.
- API **collection example ** for Postman.
- Testing with **mocha/chai** for API endpoints.
- NPM scripts for **cleaning and seeding** the MongoDB database.
- NPM script for keeping **good source code formatting** using prettier and ESLint.
- Use of ESLint for **good coding practices**.
- **Mailer example** with Nodemailer and Mailgun.
- **Contact form endpoint** for sending the form with Mailgun.
- **JWT Tokens**, provide login with Authorization header with value Basic username:password where username:password MUST BE ENCODED with Base64.
- **Make requests with a token** after login with Authorization header with value Bearer *yourToken* where *yourToken* is the signed and encrypted token given in the response from the login process.

Check the [repository page](https://github.com/ramoncardena/rexin-backend) to clone the backend and read the documentation.

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

DEV\_SITE_URL [string]

PROD\_SITE_URL [string]

DEFAULT_TITLE [string]

DEFAULT_DESCRIPTION [string]

DEFAULT_SEP [string]

FACEBOOK_APP\_ID [string]

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

## Pages

Rexin Frontend comes with some default pages that you can found at:<br>

```
pages
   ├── account
   └── admin
```


There are 3 types of pages:

- Public Pages
- Private Pages
- Role Based Page

You can create and modify pages as you wish. You can use `OnePage.js` as a reference for public pages, `AccountPage.js` for private pages and `AdminPage.js` for role based private pages.


### Page Component (for SEO)
All the pages in Rexin Frontend contain a **Page Component** wraping around the content to render SEO meta and title.<br>


### Public Pages
Home Page `/src/pages/HomePage`<br>
Page One `/src/pages/OnePage`<br>
Page Two `/src/pages/TwoPage`<br>
Page Three `/src/pages/ThreePage`<br>
Page Four `/src/pages/FourPage`<br>
Contact Page `/src/pages/ContactPage`<br>
Not Found Page `/src/pages/NotFoundPage`<br>


### Account Pages (Private)
Profile/Account Page `/src/pages/account/AccountPage`<br>
Sign In Page `/src/pages/account/SignInPage`<br>
Sign Up Page `/src/pages/account/SignUpPage`<br>
Password Forgot Page `/src/pages/account/PasswordForgetPage`<br>
Password Reset Page `/src/pages/account/PasswordResetPage `<br>
Account Verify Page `/src/pages/account/VerifyPage `<br>
Edit Profile Page `/src/pages/account/EditProfilePage`<br>

### Admin Pages (Private & Role)
Admin Page `/src/pages/admin/AdminPage`<br>



## Authentication and authorization

Authentication is done with JWT (JSON Web Token) against the Rexin Backend.



## User Registration Workflow
User registration and authentication is provided by Rexin Backend. The pages included in the project allows you to handle user workflow:

- User sign up providing full name, email and password.
- User account verification providing verification code.
- User sign in providing email and password.
- Password forgot providing email 


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
 