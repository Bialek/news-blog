import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "components/header";
import Home from "view/home";
import Articles from "view/articles";
import SingleArticle from "view/single-article";
import AdminDashboard from "view/admin-dashboard";
import AdminAddArticle from "view/admin-add-article";
import "./styles.scss";
import AdminMenuWrapper from "components/admin-menu-wrapper";
import LogIn from "view/log-in";
import { UserContext } from "context";
import AdminArticlesList from "view/admin-articles-list";
import { ROLE_ADMIN } from "utils/constants";

export default function App() {
  const [userData, setUserData] = useState(undefined);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {console.log(process.env)}
      <Router>
        <Header />

        <Switch>
          <Route path="/" exact={true}>
            <Home />
          </Route>
          {!userData && (
            <>
              <Route path="/sign-in">
                <SignIn />
              </Route>
              <Route path="/log-in">
                <LogIn />
              </Route>
            </>
          )}
          <Route path="/articles" exact={true}>
            <Articles />
          </Route>
          <Route path={`/article/:articleId`}>
            <SingleArticle />
          </Route>
          {userData && userData.roles.includes(ROLE_ADMIN) && (
            <>
              <Route path={"/admin/dashboard"}>
                <AdminMenuWrapper>
                  <AdminDashboard />
                </AdminMenuWrapper>
              </Route>
              <Route path={"/admin/add-article"}>
                <AdminMenuWrapper>
                  <AdminAddArticle />
                </AdminMenuWrapper>
              </Route>
              <Route path={"/admin/articles-list"}>
                <AdminMenuWrapper>
                  <AdminArticlesList />
                </AdminMenuWrapper>
              </Route>
            </>
          )}
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

function SignIn() {
  return <h2>Sign in page, building in progress</h2>;
}
