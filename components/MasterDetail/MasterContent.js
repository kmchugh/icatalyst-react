import React from 'react';
import { withRouter } from 'react-router-dom';
import {DataTable} from '../Tables';
import PropTypes from 'prop-types';
import {ModelPropTypes} from '../../utilities/createModel';
import PageBase from '../../pages/PageBase';
import NavbarMobileToggleButton from '../../layouts/components/NavbarLayouts/NavbarMobileToggleButton';
// import Hidden from '@mui/material/Hidden';
import {useMediaQuery, useTheme} from '@mui/material';
import { createMuiStyles, cxMui } from '../../utilities';

const useStyles = createMuiStyles((theme) => ({
  root: {
  },
  separator: {
    width          : 1,
    height: theme.spacingNum(6),
    backgroundColor: theme.palette.divider,
    marginLeft : theme.spacingNum(1),
    marginRight : theme.spacingNum(2),
  },
  mobileNavButton : {
    width: theme.spacingNum(6),
    height: theme.spacingNum(6)
  }
}));

const MasterContent = (props)=>{
  const {
    definition,
    data,
    match,
    history,
    onRefresh,
    updating,
    className,
    auth,
    onAdd,
    onDelete,
    config,
    rightHeaderComponent,
    actions = [],
    showDensityToggle = true,
    initialSelectedRowIds,
  } = props;

  const classes = useStyles();
  const theme = useTheme();
  const isLgDown = useMediaQuery(theme.breakpoints.down('lg'));
  return (
    <DataTable
      className={className}
      definition={definition}
      data={data}
      onRefresh={onRefresh}
      updating={updating}
      PrependHeaderComponent={
        config.mode === 'chromeless' && isLgDown ? (
          <>
            <NavbarMobileToggleButton className={cxMui(classes.mobileNavButton)}/>
            <div className={classes.separator}/>
          </>
        ) : null}
      canAdd={onAdd && auth.create}
      onAddClicked={onAdd ? onAdd : null}
      onDeleteClicked={onDelete}
      onRowClicked={(entity)=>{
        if (definition.onEntityClicked) {
          auth.retrieve && definition.onEntityClicked(entity, props);
        } else {
          auth.retrieve && history.push(`${match.url}/${definition.getIdentity(entity)}`);
        }
      }}
      canDelete={onDelete && auth.delete}
      actions={actions}
      showDensityToggle={showDensityToggle}
      rightHeaderComponent={rightHeaderComponent}
      initialSelectedRowIds={initialSelectedRowIds}
    />
  );
};

MasterContent.propTypes = {
  definition : ModelPropTypes,
  data : PropTypes.array.isRequired,
  match : PropTypes.object.isRequired,
  history : PropTypes.object.isRequired,
  onRefresh : PropTypes.func,
  onAdd : PropTypes.func,
  onDelete : PropTypes.func,
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
  }),
  config : PageBase.propTypes.config,
  rightHeaderComponent: PropTypes.node,
  actions: PropTypes.arrayOf(PropTypes.shape({
    title:   PropTypes.string,
    icon:    PropTypes.string,
    onClick: PropTypes.func,
    show:    PropTypes.bool,
  })),
  showDensityToggle: PropTypes.bool,
  initialSelectedRowIds: PropTypes.object,
};

export default withRouter(MasterContent);
