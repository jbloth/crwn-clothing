import React from 'react';
import './menu-items.styles.scss';
import { withRouter } from 'react-router-dom'; // "Higher Order Component"

// History ist verfügbar dank withRouter
const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => (
  <div className={`${size} menu-item`} onClick={() => history.push(`${match.url}${linkUrl}`)}>
    <div
      className="background-image"
      style={{
        backgroundImage: `url(${imageUrl})`
      }}
    />
    <div className="content">
      <h1 className="title">{title.toUpperCase()}</h1>
      <span className="subtitle">SHOP NOW</span>
    </div>
  </div>
);

// withRouter versorgt unsere Komponente mit props die sonst nur
// die Komponente bekommt die in Route explizit genannt wird (hier homepage).
export default withRouter(MenuItem);
