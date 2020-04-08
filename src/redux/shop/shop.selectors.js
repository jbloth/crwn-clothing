import { createSelector } from 'reselect';

const selectShop = (state) => state.shop;

export const selectCollections = createSelector([selectShop], (shop) => shop.collections);

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  // Object.keys erstellt ein array aus allen keys in dem Objekt, wir benutzen dann map um
  // den key mit dem value (hier ein collection-object) zu ersetzen
  // Wenn wir keine collections haben (initial state ist null) -> leeres array
  (collections) => (collections ? Object.keys(collections).map((key) => collections[key]) : [])
);

export const selectCollection = (collectionUrlParam) =>
  createSelector([selectCollections], (collections) =>
    collections ? collections[collectionUrlParam] : null
  );
