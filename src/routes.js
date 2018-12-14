import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

import * as routes from './constants/routes';

// Languages allowed in the URL, all but the default, use (lng1 | lng2 | lng3)
const allowedLanguages = '(es)';

const HomePage = Loadable({
    loader: () => import(/* webpackChunkName: "homepage" */ './pages/HomePage'),
    loading: () => null,
    modules: ['homepage']
});

const OnePage = Loadable({
    loader: () => import(/* webpackChunkName: "onepage" */ './pages/OnePage'),
    loading: () => null,
    modules: ['onepage']
});

const TwoPage = Loadable({
    loader: () => import(/* webpackChunkName: "twopage" */ './pages/TwoPage'),
    loading: () => null,
    modules: ['twopage']
});

const ThreePage = Loadable({
    loader: () =>
        import(/* webpackChunkName: "threepage" */ './pages/ThreePage'),
    loading: () => null,
    modules: ['threepage']
});

const FourPage = Loadable({
    loader: () => import(/* webpackChunkName: "fourpage" */ './pages/FourPage'),
    loading: () => null,
    modules: ['fourpage']
});

const ContactPage = Loadable({
    loader: () =>
        import(/* webpackChunkName: "contactpage" */ './pages/ContactPage'),
    loading: () => null,
    modules: ['contactpage']
});

const SignInPage = Loadable({
    loader: () =>
        import(/* webpackChunkName: "signinpage" */ './pages/account/SignInPage'),
    loading: () => null,
    modules: ['signinpage']
});

const SignUpPage = Loadable({
    loader: () =>
        import(/* webpackChunkName: "signuppage" */ './pages/account/SignUpPage'),
    loading: () => null,
    modules: ['signuppage']
});

const PasswordForgetPage = Loadable({
    loader: () =>
        import(/* webpackChunkName: "passwordforgetpage" */ './pages/account/PasswordForgetPage'),
    loading: () => null,
    modules: ['passwordforgetpage']
});

const PasswordResetPage = Loadable({
    loader: () =>
        import(/* webpackChunkName: "passwordresetpage" */ './pages/account/PasswordResetPage'),
    loading: () => null,
    modules: ['passwordresetpage']
});

const VerifyPage = Loadable({
    loader: () =>
        import(/* webpackChunkName: "verifypage" */ './pages/account/VerifyPage'),
    loading: () => null,
    modules: ['verifypage']
});
const AccountPage = Loadable({
    loader: () =>
        import(/* webpackChunkName: "accountpage" */ './pages/account/AccountPage'),
    loading: () => null,
    modules: ['accountpage']
});
const EditProfilePage = Loadable({
    loader: () =>
        import(/* webpackChunkName: "editprofilepage" */ './pages/account/EditProfilePage'),
    loading: () => null,
    modules: ['editprofilepage']
});
const AdminPage = Loadable({
    loader: () =>
        import(/* webpackChunkName: "adminpage" */ './pages/admin/AdminPage'),
    loading: () => null,
    modules: ['adminpage']
});
export default () => (
    <Switch>
        <Route
            exact
            path={'/:lng' + allowedLanguages + '?' + routes.HOME}
            component={HomePage}
        />
        <Route exact path={routes.HOME} component={HomePage} />

        {/* Page One */}
        <Route
            exact
            path={'/:lng' + allowedLanguages + '?' + routes.PAGE_ONE}
            component={OnePage}
        />
        <Route exact path={routes.PAGE_ONE} component={OnePage} />

        <Route
            exact
            path={'/:lng' + allowedLanguages + '?' + routes.PAGE_TWO}
            component={TwoPage}
        />
        <Route exact path={routes.PAGE_TWO} component={TwoPage} />
        <Route
            exact
            path={'/:lng' + allowedLanguages + '?' + routes.PAGE_THREE}
            component={ThreePage}
        />
        <Route exact path={routes.PAGE_THREE} component={ThreePage} />
        <Route
            exact
            path={'/:lng' + allowedLanguages + '?' + routes.PAGE_FOUR}
            component={FourPage}
        />
        <Route exact path={routes.PAGE_FOUR} component={FourPage} />
        <Route
            exact
            path={'/:lng' + allowedLanguages + '?' + routes.CONTACT}
            component={ContactPage}
        />
        <Route exact path={routes.CONTACT} component={ContactPage} />
        <Route
            exact
            path={'/:lng' + allowedLanguages + '?' + routes.SIGN_IN}
            component={SignInPage}
        />
        <Route exact path={routes.SIGN_IN} component={SignInPage} />
        <Route
            exact
            path={'/:lng' + allowedLanguages + '?' + routes.SIGN_UP}
            component={SignUpPage}
        />
        <Route exact path={routes.SIGN_UP} component={SignUpPage} />
        <Route
            exact
            path={'/:lng' + allowedLanguages + '?' + routes.PASSWORD_FORGET}
            component={PasswordForgetPage}
        />
        <Route
            exact
            path={routes.PASSWORD_FORGET}
            component={PasswordForgetPage}
        />
        <Route
            exact
            path={
                '/:lng' +
                allowedLanguages +
                '?' +
                routes.PASSWORD_RESET +
                '/:id'
            }
            component={PasswordResetPage}
        />
        <Route
            exact
            path={routes.PASSWORD_RESET + '/:id'}
            component={PasswordResetPage}
        />
        <Route
            exact
            path={'/:lng' + allowedLanguages + '?' + routes.VERIFY + '/:id'}
            component={VerifyPage}
        />
        <Route exact path={routes.VERIFY + '/:id'} component={VerifyPage} />
        <Route
            exact
            path={'/:lng' + allowedLanguages + '?' + routes.ACCOUNT}
            component={AccountPage}
        />
        <Route exact path={routes.ACCOUNT} component={AccountPage} />
        <Route
            exact
            path={'/:lng' + allowedLanguages + '?' + routes.ADMIN}
            component={AdminPage}
        />
        <Route exact path={routes.ADMIN} component={AdminPage} />
        <Route
            exact
            path={'/:lng' + allowedLanguages + '?' + routes.EDIT_PROFILE}
            component={EditProfilePage}
        />
        <Route exact path={routes.EDIT_PROFILE} component={EditProfilePage} />
        <Route component={() => <div>Not found!</div>} />
    </Switch>
);
