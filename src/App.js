import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { auth } from './firebase/firebase.utils';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    };
  }

  unsuscribeFromAuth = null;

  componentDidMount() {
    // Setzt Listener und returned Funktion die man braucht um den Listener wieder
    // zu entfernen
    this.unsuscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user });
    });
  }

  // Entfernt den Observer (Denn sonst sammelt der Garbage-Collector die unmountete
  // Komponente nicht ein?). Hier nicht zwingend nötig, weil wir App Komponente
  // wahrscheinlich nur ein mal verwenden und unmount bedeutet dass die Seite verlassen
  // wird, aber generell schon wichtig.
  componentWillUnmount() {
    this.unsuscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
