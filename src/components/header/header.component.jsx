import React from 'react';
import { Link } from 'react-router-dom';
// Higher order component that gives us access to redux-reducers (?)
import { connect } from 'react-redux';
import { auth } from '../../firebase/firebase.utils';

// ReactCompnent packt svg automatisch in Component
import { ReactComponent as Logo } from '../../assets/crown.svg';
import './header.styles.scss';

const Header = ({ currentUser }) => (
  <div className="header">
    <Link to="logo-container">
      <Logo className="logo" />
    </Link>
    <div className="options">
      <Link className="option" to="/shop">
        SHOP
      </Link>
      <Link className="option" to="/shop">
        CONTACT
      </Link>
      {currentUser ? (
        <div className="option" onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
      ) : (
        <Link className="option" to="/signin">
          SIGN IN
        </Link>
      )}
    </div>
  </div>
);

// state ist root reducer
const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

// Gibt Header Komponente Zugriff zu Funktion die Zugriff zu einem Reducer hat.
// currentUser ist jetzt unter props.currentUser zu finden
export default connect(mapStateToProps)(Header);
