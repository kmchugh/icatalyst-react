import React, {createContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';

export const SearchFilterContext = createContext();

const SearchFilterProvider = (props)=>{

  const [searchFilter, setSearchFilter] = useState(props.initialSearchFilter || null);

  useEffect(()=>{    
    setSearchFilter(props.initialSearchFilter || null);
  }, [props.initialSearchFilter]);

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
  initialSearchFilter : PropTypes.string,
  children : PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default SearchFilterProvider;
