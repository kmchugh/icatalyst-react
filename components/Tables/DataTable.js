import React, {useCallback} from 'react';
import Table from './Table';
import {ModelPropTypes} from '../../utilities/createModel';
import EmptyTable from './EmptyTable';
import _ from 'lodash';
import PropTypes from 'prop-types';

const DataTable = ({
  definition,
  data,
  updating=false,
  onRefresh,
  onRowClick,
  canAdd,
  canDelete,
  className
})=>{

  const columns = useCallback(()=>{
    const order = (definition.listLayout || definition.fieldOrder).map((id)=>{
      const field = typeof id === 'string' ? definition.fields[id] : id;
      if (!field) {
        console.warn(`${id} not properly configured on ${definition.name}`);
      }

      return {
        ...field,
        label : field.label || _.startCase(field.id),
        align: field.type === 'string' ? 'left' : 'right',
      };
    });
    return order;
  }, [definition]);

  return (
    <Table
      className={className}
      title={definition.labelPlural}
      icon={definition.icon}
      columns={columns()}
      onRefresh={onRefresh}
      getRowID={definition.getIdentity}
      onRowClick={onRowClick}
      data={data}
      canAdd={canAdd}
      canDelete={canDelete}
      updating={updating}
      isSelectable={definition.isSelectable}
      EmptyListComponent={<EmptyTable
        icon={definition.icon || 'fa search'}
        title={`No ${definition.labelPlural} found`}
        action="Try doing something else"
        help="Or click somewhere for some help"
      />}
    />
  );
};

DataTable.propTypes = {
  definition : ModelPropTypes,
  data : PropTypes.array.isRequired,
  loading: PropTypes.bool,
  onRowClick : PropTypes.func,
  onRefresh : PropTypes.func,
  updating : PropTypes.bool,
  canAdd : PropTypes.bool,
  canDelete : PropTypes.bool,
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ])
};

export default React.memo(DataTable);
