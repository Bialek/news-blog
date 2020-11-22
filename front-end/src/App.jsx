import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "components/header";
import Home from "view/home";
import Articles from "view/articles";
import SingleArticle from "view/single-article";
import AdminDashboard from "view/admin-dashboard";
import AdminAddArticle from "view/admin-add-article";
import "./styles.scss";
import AdminMenuWrapper from "components/admin-menu-wrapper";

export default function App() {
  return (
    <Router>
      <Header />

      <Switch>
        <Route path="/" exact={true}>
          <Home />
        </Route>
        <Route path="/sign-in">
          <Users />
        </Route>
        <Route path="/log-in">
          <Users />
        </Route>
        <Route path="/articles" exact={true}>
          <Articles />
        </Route>
        <Route path={`/article/:articleId`}>
          <SingleArticle />
        </Route>
        <Route path={"/admin/dashboard"}>
          <AdminMenuWrapper>
            <AdminDashboard />
          </AdminMenuWrapper>
        </Route>
        <Route path={`/admin/add-article`}>
          <AdminMenuWrapper>
            <AdminAddArticle />
          </AdminMenuWrapper>
        </Route>
      </Switch>
    </Router>
  );
}

function Users() {
  return <h2>Users</h2>;
}
