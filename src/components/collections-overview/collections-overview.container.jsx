import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';

import WithSpinner from '../../components/with-spinner/with-spinner.component';
import CollectionsOverview from './collections-overview.component';

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching,
});

// Ohne compose:
// const CollectionsOverviewContainer = connect(mapStateToProps)(WithSpinner(CollectionsOverview));

// Mit compose (macht eine Kette aus gecurryten Funktionen, evaluiert
// parameter von rechts nach links, dh zuerst wird CollectionsOverview in
// WithSpinner gewrappt und das Ergebnis dann in connect)
const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;
