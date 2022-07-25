import React, { useReducer, createContext } from 'react';
import PropTypes from 'prop-types';

const initialState = {
  galleryOpen: false,
  spadeFound: false,
  keyFound: false,
  images: [],
  focusedImage: null,
  dispatch: () => {},
};

const DataContext = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case 'foundKey':
      return {
        ...state,
        keyFound: true,
      };
    case 'setGalleryOpen':
      return {
        ...state,
        galleryOpen: action.value,
      };
    case 'addImage':
      return {
        ...state,
        images: [
          ...state.images,
          action.value,
        ],
      };
    case 'reset':
      return {
        ...state,
        images: [],
        focusedImage: null,
        galleryOpen: false,
      };
    case 'setFocusedImage':
      return {
        ...state,
        focusedImage: action.value,
      };
    default:
      throw new Error();
  }
};

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const passedState = { state, dispatch };

  return (
    <DataContext.Provider value={passedState}>
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default DataContext;
