import React from 'react';
import { Link } from 'react-router-dom';
// Higher order component that gives us access to redux-reducers (?)
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

// ReactCompnent packt svg automatisch in Component
import { ReactComponent as Logo } from '../../assets/crown.svg';
import './header.styles.scss';

const Header = ({ currentUser, hidden }) => (
  <div className="header">
    <div className="logo-container">
      <Link to="/">
        <Logo className="logo" />
      </Link>
    </div>

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
      <CartIcon />
    </div>
    {hidden ? null : <CartDropdown />}
  </div>
);

// parameter state ist root reducer, wird hier in zwei leveln destructured
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

// Gibt Header Komponente Zugriff zu Funktion die Zugriff zu einem Reducer hat.
// currentUser ist jetzt unter props.currentUser zu finden
export default connect(mapStateToProps)(Header);
