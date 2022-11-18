import { useMemo } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import QRgen from "./pages/QRgenerator";
import QRscan from "./pages/QRscanner";
import Accueil from "./pages/Accueil";
import Presence from "./pages/Presence";
import { Context } from "./services/redux";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import "./styles/App.css";
import { useRecoilState } from "recoil";
import { PopupState, UserState } from "./atoms/Users";
import { useEffect } from "react";
import PageNotFound from "./pages/PageNotFound";
import RouteGuard from "./components/RouteGuard";
import Popup from "./components/Popup";
import Navigation from "./components/Navigation";
import Form from "./components/Form";

function App() {
  const [User, setUser] = useRecoilState(UserState);
  const [Pop, setPop] = useRecoilState(PopupState);
  const providerUser = useMemo(() => ({ User, setUser }), [User, setUser]);
  const dataUser = JSON.parse(localStorage.getItem("UserStored"));

  useEffect(() => {
    console.log("Contributor: 'Josia YVAN ♥☻♥'");
    if (!User && dataUser) {
      setUser(dataUser);
    }
  });

  return (
    <Context.Provider value={providerUser}>
      {Pop && <Popup text={Pop.text} show={Pop.show} />}
      <div className="App-header">
        <Router>
          {User && <Navigation />}
          <Switch>
            <Route exact path="/" component={Home} />
            <RouteGuard path="/form" component={Form} />
            {!User && <Route path="/qr_scanner" component={QRscan} />}

            <AuthenticatedRoute path="/accueil" component={Accueil} />
            <AuthenticatedRoute path="/présence" component={Presence} />
            <Route path="**" component={PageNotFound} />
          </Switch>
        </Router>
      </div>
    </Context.Provider>
  );
}

export default App;
