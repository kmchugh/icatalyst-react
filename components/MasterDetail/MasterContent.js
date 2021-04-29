import React from 'react';
import { withRouter } from 'react-router-dom';
import {DataTable} from '../Tables';
import PropTypes from 'prop-types';
import {ModelPropTypes} from '../../utilities/createModel';

const MasterContent = ({
  definition,
  data,
  match,
  history,
  onRefresh,
  updating,
  className,
  auth
})=>{
  return (
    <DataTable
      className={className}
      definition={definition}
      data={data}
      onRefresh={onRefresh}
      updating={updating}
      canAdd={auth.create}
      onRowClick={(entity)=>{
        auth.retrieve && history.push(`${match.url}/${definition.getIdentity(entity)}`);
      }}
      canDelete={auth.delete}
    />
  );
};

MasterContent.propTypes = {
  definition : ModelPropTypes,
  data : PropTypes.array.isRequired,
  match : PropTypes.object.isRequired,
  history : PropTypes.object.isRequired,
  onRefresh : PropTypes.func,
  updating : PropTypes.bool,
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  auth : PropTypes.shape({
    create : PropTypes.bool,
    retrieve : PropTypes.bool,
    retrieveAll : PropTypes.bool,
    update : PropTypes.bool,
    delete : PropTypes.bool
  })
};

export default React.memo(withRouter(MasterContent));
