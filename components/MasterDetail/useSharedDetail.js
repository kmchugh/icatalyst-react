import {useState, useCallback} from 'react';
import { useBetween } from 'use-between';

const useEntityDetail = ()=>{
  const [entity, setEntity] = useState(null);
  const update = useCallback((e)=>{setEntity(e);}, []);
  return {
    update,
    entity
  };
};

export const useSharedDetail = () => useBetween(useEntityDetail);
