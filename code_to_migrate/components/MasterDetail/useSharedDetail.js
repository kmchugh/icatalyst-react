import {useState, useCallback} from 'react';
import { useBetween } from 'use-between';

const useEntityDetail = ()=>{
  const [entity, setEntity] = useState();
  const updateEntity = useCallback((e)=>{
    setEntity(e);
  }, []);
  return {
    updateEntity,
    entity
  };
};

export const useSharedDetail = () => useBetween(useEntityDetail);
