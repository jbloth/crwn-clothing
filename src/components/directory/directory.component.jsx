import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectDirectorySections } from '../../redux/directory/directory.selectors';
import MenuItem from './../menu-item/menu-item.component';
import './directory.styles.scss';

const Directory = ({ sections }) => (
  <div className="directory-menu">
    {// Destructure all properties except id
    sections.map(({ id, ...otherSectionProps }) => (
      // spread all properties except id (weil die Attribute der Komponente die
      // gleichen Namen haben).
      <MenuItem key={id} {...otherSectionProps} />
    ))}
  </div>
);

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections,
});

export default connect(mapStateToProps)(Directory);
