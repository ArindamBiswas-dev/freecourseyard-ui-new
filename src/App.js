import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import AllCoursesPage from './pages/AllCoursesPage';
import Error404Page from './pages/Error404Page';
import FavouriteCoursesPage from './pages/FavouriteCoursesPage';
import HomePage from './pages/HomePage';
import LogInSignUpPage from './pages/LogInSignUpPage';
import { ReactQueryDevtools } from 'react-query/devtools';
import AddCoursesPage from './pages/AddCoursesPage';
import SuggestCoursePage from './pages/SuggestCoursePage';
import React, { useEffect, useState } from 'react';
import ProtectedRoute from './components/ProtectedRoute';
import LogOut from './components/LogOut';
import SingleSearchCoursePage from './pages/SingleSearchCoursePage';
import MultipleSearchPage from './pages/MultipleSearchPage';
import CatagoriePage from './pages/CatagoriePage';

export const userContext = React.createContext();
export const setUserContext = React.createContext();

function App() {
  // create a react-quary client
  const queryClient = new QueryClient();
  const [user, setUser] = useState({});

  useEffect(() => {
    if (localStorage.getItem('token'))
      setUser({ token: localStorage.getItem('token') });
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <userContext.Provider value={user}>
          <setUserContext.Provider value={setUser}>
            <div>
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route
                  exact
                  path="/signup"
                  render={() => <LogInSignUpPage defaultIndex={0} />}
                />
                <Route
                  exact
                  path="/login"
                  render={() => <LogInSignUpPage defaultIndex={1} />}
                />
                <Route exact path="/logout" component={LogOut} />
                <Route exact path="/allcourses" component={AllCoursesPage} />
                <Route
                  exact
                  path="/favorites"
                  render={() => (
                    <ProtectedRoute component={<FavouriteCoursesPage />} />
                  )}
                />
                <Route exact path="/addcourse" component={AddCoursesPage} />
                <Route
                  exact
                  path="/suggestcourse"
                  render={() => (
                    <ProtectedRoute component={<SuggestCoursePage />} />
                  )}
                />
                <Route
                  exact
                  path="/course/:id"
                  render={() => <SingleSearchCoursePage />}
                />
                <Route
                  exact
                  path="/search/:id"
                  render={() => <MultipleSearchPage />}
                />
                <Route
                  exact
                  path="/catagories/:catagoriName"
                  render={() => <CatagoriePage />}
                />
                <Route path="/" component={Error404Page} />
              </Switch>
            </div>
            <ReactQueryDevtools initialIsOpen={false} />
          </setUserContext.Provider>
        </userContext.Provider>
      </QueryClientProvider>
    </>
  );
}

export default App;
