import React from 'react';

import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles';

// selbstgemachte HOC, erhält als input eine andere Komponente
const WithSpinner = (WrappedComponent) => ({ isLoading, ...otherProps }) => {
  return isLoading ? (
    <SpinnerOverlay>
      <SpinnerContainer />
    </SpinnerOverlay>
  ) : (
    <WrappedComponent {...otherProps} />
  );
};

export default WithSpinner;
