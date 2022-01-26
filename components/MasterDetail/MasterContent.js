import React from 'react';
import { withRouter } from 'react-router-dom';
import {DataTable} from '../Tables';
import PropTypes from 'prop-types';
import {ModelPropTypes} from '../../utilities/createModel';
import PageBase from '../../pages/PageBase';
import NavbarMobileToggleButton from '../../layouts/components/NavbarLayouts/NavbarMobileToggleButton';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
  },
  separator: {
    width          : 1,
    height: theme.spacing(6),
    backgroundColor: theme.palette.divider,
    marginLeft : theme.spacing(1),
    marginRight : theme.spacing(2),
  },
  mobileNavButton : {
    width: theme.spacing(6),
    height: theme.spacing(6)
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
    config
  } = props;

  const classes = useStyles();

  return (
    <DataTable
      className={className}
      definition={definition}
      data={data}
      onRefresh={onRefresh}
      updating={updating}
      PrependHeaderComponent={
        config.mode === 'chromeless' ? (
          <Hidden lgUp>
            <NavbarMobileToggleButton className={clsx(classes.mobileNavButton)}/>
            <div className={classes.separator}/>
          </Hidden>
        ) : null
      }
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
  config : PageBase.propTypes.config
};

export default withRouter(MasterContent);
