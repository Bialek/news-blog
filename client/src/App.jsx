import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "components/header";
import Home from "view/home";
import AdminDashboard from "view/admin-dashboard";
import "./styles.scss";
import AdminMenuWrapper from "components/admin-menu-wrapper";
import LogIn from "view/log-in";
import { StoreContext } from "context";
import { ROLE_ADMIN } from "utils/constants";
import AdminNewsList from "view/admin-news-list";
import AdminEditNews from "view/admin-edit-news";
import AdminAddNews from "view/admin-add-news";
import NewsList from "view/news-list";
import SingleNews from "view/single-news";
import DictionaryService from "services/dictionary/index";
import AdminDictionariesList from "view/admin-dictionary-list";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [storeData, setStoreData] = useState({
    userData: null,
    dictionaryData: null,
  });

  useEffect(() => {
    if (isLoading === true) {
      DictionaryService.getAll()
        .then((response) => {
          setStoreData((prevData) => ({
            ...prevData,
            dictionaryData: response.reduce((dictObject, dictionary) => {
              if (dictObject[dictionary.type]) {
                dictObject[dictionary.type].push(dictionary);
              } else {
                dictObject[dictionary.type] = [dictionary];
              }
              return dictObject;
            }, {}),
          }));
        })
        .finally(() => setIsLoading(false));
    }
  }, [isLoading]);

  return (
    <StoreContext.Provider value={{ storeData, setStoreData }}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact={true}>
            <Home />
          </Route>
          <Route path="/news-list/:categoryId?">
            <NewsList />
          </Route>
          <Route path={`/news/:id`}>
            <SingleNews />
          </Route>

          {storeData.userData &&
          storeData.userData.roles.includes(ROLE_ADMIN) ? (
            <>
              <Route path={"/admin/dashboard"}>
                <AdminMenuWrapper>
                  <AdminDashboard />
                </AdminMenuWrapper>
              </Route>
              <Route path={"/admin/news-list/:categoryId?"}>
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
              <Route path={"/admin/dictionary-list"}>
                <AdminMenuWrapper>
                  <AdminDictionariesList />
                </AdminMenuWrapper>
              </Route>
            </>
          ) : (
            <>
              <Route path="/log-in">
                <LogIn />
              </Route>
            </>
          )}
        </Switch>
      </BrowserRouter>
    </StoreContext.Provider>
  );
}
