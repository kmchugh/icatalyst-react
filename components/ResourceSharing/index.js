import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import ResourceSharingButton from '@icatalyst/components/Buttons/ResourceSharingButton';
import { useHistory } from 'react-router-dom';
import {MasterDetailContext} from '@icatalyst/components/MasterDetail';
import { AppContext } from '@icatalyst/contexts/App';

const useStyles = makeStyles((/*theme*/)=>{
  return {
    root : {}
  };
});

const ResourceSharing = ({
  className,
  isOwner,
  variant,
  label,
  open, 
  onClosed,
})=>{
  const styles = useStyles();
  const history = useHistory();
  const {reverse} = useContext(AppContext);

  const masterDetailContext = useContext(MasterDetailContext);
  const {parentContext} = masterDetailContext;

  const {entity, entityDefinition} = parentContext.parentContext;

  return (
    <ResourceSharingButton
      className={clsx(styles.root, className)}
      resource={entity}
      definition={entityDefinition}
      isOwner={isOwner}
      onSaved={(/*res*/)=>{
        // Navigate to the invites page
        history.push(reverse('invites'));
      }}
      variant={'none'}
      label={label}
      open={open}
      onClosed={onClosed}
    />
  );
};

ResourceSharing.propTypes={
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  engagement : PropTypes.object.isRequired,
  isOwner : PropTypes.bool,
  variant : PropTypes.oneOf(['button', 'iconbutton', 'listitem']),
  label : PropTypes.string,
  open: PropTypes.bool, 
  onClosed: PropTypes.bool
};

export default ResourceSharing;
