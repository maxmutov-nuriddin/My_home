/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

export const SearchContexts = createContext();

export const SearchContext = ({ children }) => {
  const [searchContext, setSearchContext] = useState(true);

  const state = { searchContext, setSearchContext };


  return (
    <SearchContexts.Provider value={state}>
      {children}
    </SearchContexts.Provider>
  );
};
