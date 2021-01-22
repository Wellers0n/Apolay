import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Router, Switch } from 'react-router-dom'
import history from 'helpers/history';
import GlobalStyle from 'styles/global';
import { SnackbarProvider } from 'notistack';
// Pages
const Home = lazy(() => import('pages/Home' /* webpackChunkName: "Home" */))

const router = () => {

    return (
        <SnackbarProvider
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            maxSnack={3}
        >
            <BrowserRouter>
                <div>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Router history={history}>
                            <Switch>
                                <Route exact path="/" component={Home} />
                                {/* <Route path="/login" component={Login} />
                                        <Route path="/register" component={Register} />
                                        <Route path="/forgot" component={Forgot} />
                                        <PrivateRouter path="/profile" component={Profile} />
                                        <PrivateRouter path="/companies" component={Companies} />
                                        <PrivateRouter path="/modules/:id" component={Modules} />
                                        <PrivateRouter path="/partners" exact component={Partners} />
                                        <PrivateRouter path="/partners/:id" component={PartnersDetail} /> */}
                                {/* <PrivateRouter path="/home" component={Home} /> */}
                                <Route component={notFound} />
                                <GlobalStyle />
                            </Switch>
                        </Router>
                    </Suspense>
                </div>
            </BrowserRouter>
        </SnackbarProvider>
    )
}

const notFound = () => {
    return (
        <div>pag not found</div>
    )
}

export default router