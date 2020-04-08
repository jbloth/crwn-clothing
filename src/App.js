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
import {
  auth,
  createUserProfileDocument,
  // addCollectionAndDocuments,
} from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
// import { selectCollectionsForPreview } from './redux/shop/shop.selectors';

class App extends React.Component {
  unsuscribeFromAuth = null;

  componentDidMount() {
    // const { setCurrentUser, collectionsArray } = this.props; // nur zum einmaligen speichern von shop data in db
    const { setCurrentUser } = this.props;

    // Setzt Listener und returned Funktion die man braucht um den Listener wieder
    // zu entfernen
    this.unsuscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        // wenn sich jemand eingeloggt hat:
        // Speichere user in DB, wenn es ihn noch nicht gibt
        const userRef = await createUserProfileDocument(userAuth);

        // Speichere user im state
        // Eine Art Listener der bei Änderung am Document feuert. Gibt Snapshot des Documents
        // zurück. Ersteres brauchen wir in diesem Fall nicht, aber letzteres.
        // Das Snapshot event wird auch beim setzten des listeners gefeuert und ab dann bei
        // Änderungen
        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      }
      // Speichere user im state auch wenn er nicht eingeloggt ist
      setCurrentUser(userAuth);
      // addCollectionAndDocuments(
      //   'collections',
      //   collectionsArray.map(({ title, items }) => ({ title, items }))
      // );
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
  // collectionsArray: selectCollectionsForPreview,
});

// Wird gebraucht, damit Komponent actions dispatchen kann?
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

// Der erste Parameter ist mapStateToProps, aber das brauchen wir hier nicht, also null.
// Der zweite Parameter ist optional und auch eine Funktion. Sie ermöglicht Komponentet
// bestimmte Actions zu dispatchen und zwar über function creators die dann in den props
// zu finden sind.
export default connect(mapStateToProps, mapDispatchToProps)(App);
