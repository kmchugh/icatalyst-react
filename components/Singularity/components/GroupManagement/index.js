import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import DetailContent from '../../../MasterDetail/DetailContent';
import {MasterDetailContext} from '../../../MasterDetail';

const GRAPH_ADMIN_ROLE_CODE = 'SINGULARITY_GRAPH_ADMIN_ROLE';

const GroupManagement = ({readonly, ...props})=>{
  const masterDetailContext = useContext(MasterDetailContext);
  const {entity, entityDefinition} = masterDetailContext;
  const isGraphAdminGroup = entity?.code === GRAPH_ADMIN_ROLE_CODE;
  const detailDefinition = isGraphAdminGroup ? {
    ...entityDefinition,
    children: [],
  } : entityDefinition;

  return (
    <MasterDetailContext.Provider value={{
      ...masterDetailContext,
      entityDefinition: detailDefinition,
    }}>
      <DetailContent
        {...props}
        readonly={readonly || isGraphAdminGroup}
      />
    </MasterDetailContext.Provider>
  );
};

GroupManagement.propTypes = {
  readonly: PropTypes.bool,
};

export default GroupManagement;
