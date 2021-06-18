import React, {useCallback} from 'react';
import Table from './Table';
import {ModelPropTypes} from '../../utilities/createModel';
import EmptyTable from './EmptyTable';
import {Button} from '@material-ui/core';
import _ from 'lodash';
import PropTypes from 'prop-types';

const DataTable = ({
  definition,
  data,
  updating=false,
  onRefresh,
  onRowClicked,
  canAdd,
  canDelete,
  className,
  onAddClicked,
  onDeleteClicked
})=>{

  const columns = useCallback(()=>{
    const order = (definition.listLayout || definition.fieldOrder).map((fieldID)=>{
      let field = null;
      if (fieldID && typeof fieldID === 'string') {
        field = definition.fields[fieldID];
      } else if (fieldID) {
        field = {
          ...definition.fields[fieldID.id],
          ...fieldID,
        };
      }

      if (!field) {
        console.warn(`${fieldID} not properly configured on ${definition.name}`);
      }

      return {
        ...field,
        label : (field.label === undefined ? _.startCase(field.id) : field.label),
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
      onRowClicked={onRowClicked}
      data={data}
      canAdd={onAddClicked && canAdd}
      canDelete={onDeleteClicked && canDelete}
      onAddClicked={onAddClicked}
      onDeleteClicked={onDeleteClicked}
      updating={updating}
      isSelectable={definition.isSelectable}
      EmptyListComponent={
        <EmptyTable
          icon={definition.icon || 'fa search'}
          title={`No ${definition.labelPlural} found`}
          action={
            onAddClicked && canAdd ? '' : 'You may not have access or may not have created any yet'
          }
          help={
            onAddClicked && canAdd ? (<Button
              color="primary"
              variant="contained"
              onClick={onAddClicked}
            >
              {`Add a ${definition.label}`}
            </Button>) : ''
          }
          onRefresh={onRefresh}
        />
      }
    />
  );
};

DataTable.propTypes = {
  definition : ModelPropTypes,
  data : PropTypes.array.isRequired,
  loading: PropTypes.bool,
  onRowClicked : PropTypes.func,
  onAddClicked : PropTypes.func,
  onDeleteClicked : PropTypes.func,
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
