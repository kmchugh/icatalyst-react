import React, {useMemo, useContext} from 'react';
import Table from './Table';
import {ModelPropTypes} from '../../utilities/createModel';
import EmptyTable from './EmptyTable';
import {Button} from '@material-ui/core';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {LocalizationContext} from '@icatalyst/localization/LocalizationProvider';

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
  onDeleteClicked,
  PrependHeaderComponent
})=>{

  const {t} = useContext(LocalizationContext);

  const columns = useMemo(()=>{
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
      columns={columns}
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
      PrependHeaderComponent={PrependHeaderComponent}
      EmptyListComponent={
        <EmptyTable
          NavigationComponent={PrependHeaderComponent}
          icon={definition.icon || 'fa search'}
          title={t('No {0} found', t(definition.labelPlural))}
          action={
            onAddClicked && canAdd ? '' : t('You may not have access or may not have created any yet')
          }
          help={
            onAddClicked && canAdd ? (<Button
              color="primary"
              variant="contained"
              onClick={onAddClicked}
            >
              {t('Create {0}', t(definition.label))}
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
  ]),
  PrependHeaderComponent : PropTypes.node
};

export default React.memo(DataTable);
