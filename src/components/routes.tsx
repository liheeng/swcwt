import * as React from "react";
import { RouteConfig } from "react-router-config";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { TodoPage } from "./pages/TodoPage";
import AboutPage from "./pages/AboutPage";
import PageLayout from "./layouts/PageLayout";
import ExprEditor from "./pages/ExprEditor";
import FillLayoutPage from "./pages/FillLayoutPage";
import RowLayoutPage from "./pages/RowLayoutPage";
import FormLayoutPage from "./pages/FormLayoutPage";
import GridLayoutPage from "./pages/GridLayoutPage";

export const routes: RouteConfig[] = [
    {
        path: "/home",
        exact: true,
        component: () => (<HomePage />),
    },
    {
        path: "/expr",
        exact: true,
        component: () => (<ExprEditor />),
    },
    {
        path: "/fillLayout",
        exact: true,
        component: () => (<FillLayoutPage />),
    },
    {
        path: "/rowLayout",
        exact: true,
        component: () => (<RowLayoutPage />),
    },
    {
        path: "/formLayout",
        exact: true,
        component: () => (<FormLayoutPage />),
    },
    {
        path: "/gridLayout",
        exact: true,
        component: () => (<GridLayoutPage />),
    },
    {
        path: "/todo",
        component: () => (<TodoPage />),
    },
    {
        path: "/about",
        component: () => (<AboutPage />),
    },
];

export const route = (
    <Switch>
        <Route path="/" component={PageLayout} />
    </Switch>
);
