import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "components/header";
import Home from "view/home";
import AdminDashboard from "view/admin-dashboard";
import "./styles.scss";
import AdminMenuWrapper from "components/admin-menu-wrapper";
import LogIn from "view/log-in";
import { UserContext } from "context";
import { ROLE_ADMIN } from "utils/constants";
import AdminNewsList from "view/admin-news-list";
import AdminEditNews from "view/admin-edit-news";
import AdminAddNews from "view/admin-add-news";
import NewsList from "view/news-list";
import SingleNews from "view/single-news";

export default function App() {
  const [userData, setUserData] = useState(undefined);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <BrowserRouter>
        <Header />

        <Switch>
          <Route path="/" exact={true}>
            <Home />
          </Route>
          <Route path="/news" exact={true}>
            <NewsList />
          </Route>
          <Route path={`/news/:id`}>
            <SingleNews />
          </Route>

          {userData && userData.roles.includes(ROLE_ADMIN) ? (
            <>
              <Route path={"/admin/dashboard"}>
                <AdminMenuWrapper>
                  <AdminDashboard />
                </AdminMenuWrapper>
              </Route>
              <Route path={"/admin/news-list"}>
                <AdminMenuWrapper>
                  <AdminNewsList />
                </AdminMenuWrapper>
              </Route>
              <Route path={"/admin/add-news"}>
                <AdminMenuWrapper>
                  <AdminAddNews />
                </AdminMenuWrapper>
              </Route>
              <Route path={"/admin/edit-news/:id"}>
                <AdminMenuWrapper>
                  <AdminEditNews />
                </AdminMenuWrapper>
              </Route>
            </>
          ) : (
            <>
              <Route path="/sign-in">
                <SignIn />
              </Route>
              <Route path="/log-in">
                <LogIn />
              </Route>
            </>
          )}
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

function SignIn() {
  return <h2>Sign in page, building in progress</h2>;
}
