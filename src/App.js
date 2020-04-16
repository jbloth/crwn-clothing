import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';
import // auth,
// createUserProfileDocument,
// addCollectionAndDocuments,
'./firebase/firebase.utils';
import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';

class App extends React.Component {
  unsuscribeFromAuth = null;

  componentDidMount() {
    const { checkUserSession } = this.props;
    checkUserSession();
  }

  // Entfernt den Observer (Denn sonst sammelt der Garbage-Collector die unmountete
  // Komponente nicht ein?). Hier nicht zwingend nötig, weil wir App Komponente
  // wahrscheinlich nur ein mal verwenden und unmount bedeutet dass die Seite verlassen
  // wird, aber generell schon wichtig.
  // componentWillUnmount() {
  //   this.unsuscribeFromAuth();
  // }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route
            exact
            path="/signin"
            render={() => (this.props.currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />)}
          />
          <Route exact path="/checkout" component={CheckoutPage} />
        </Switch>
      </div>
    );
  }
}

// Brauchen wir um im router einen redirect einzurichten falls eingeloggter user ist
// die signin-route aufrufen will
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
