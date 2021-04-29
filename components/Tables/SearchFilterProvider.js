import React, {createContext, useState} from 'react';
import PropTypes from 'prop-types';

export const SearchFilterContext = createContext();

const SearchFilterProvider = (props)=>{

  const [searchFilter, setSearchFilter] = useState(null);

  return (
    <SearchFilterContext.Provider value={{
      searchFilter,
      setSearchFilter
    }}>
      {props.children}
    </SearchFilterContext.Provider>
  );

};

SearchFilterProvider.propTypes={
  children : PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default SearchFilterProvider;
