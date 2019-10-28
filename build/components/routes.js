import * as React from "react";
import { Route, Switch } from "react-router-dom";
import PageLayout from "./layouts/PageLayout";
import FillLayoutPage from "./pages/FillLayoutPage";
import RowLayoutPage from "./pages/RowLayoutPage";
import FormLayoutPage from "./pages/FormLayoutPage";
import GridLayoutPage from "./pages/GridLayoutPage";
export var routes = [
    {
        path: "/fillLayout",
        exact: true,
        component: function () { return (React.createElement(FillLayoutPage, null)); },
    },
    {
        path: "/rowLayout",
        exact: true,
        component: function () { return (React.createElement(RowLayoutPage, null)); },
    },
    {
        path: "/formLayout",
        exact: true,
        component: function () { return (React.createElement(FormLayoutPage, null)); },
    },
    {
        path: "/gridLayout",
        exact: true,
        component: function () { return (React.createElement(GridLayoutPage, null)); },
    },
];
export var route = (React.createElement(Switch, null,
    React.createElement(Route, { path: "/", component: PageLayout })));
//# sourceMappingURL=routes.js.map