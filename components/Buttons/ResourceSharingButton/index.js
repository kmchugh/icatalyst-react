import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import {IconButton} from '@icatalyst/components';
import _ from '../../../@lodash';
import { Wizard } from '../../Wizard';

const useStyles = makeStyles((/*theme*/)=>{
  return {
    root : {}
  };
});

const ResourceSharingButton = ({
  className,
  definition,
  resource,
  iconButtonProps = {},
})=>{
  const styles = useStyles();
  const iconButtonDefaults = {
    size : 'small',
    title : `Share ${definition.name.replace(/\b\w/g, c => c.toUpperCase())}`,
    icon : 'ios_share',
    color : 'primary'
  };
  const iconProps = _.merge({}, iconButtonDefaults, iconButtonProps);
  const [showWizard, setShowWizard] = useState(false);

  const handleClick = (e)=>{

    if (iconProps.onClick) {
      iconProps.onClick(e);
    } else {
      // Show the dialog
      setShowWizard(true);
    }
  };

  console.log(iconProps, Wizard);
  console.log(resource, showWizard);

  return (
    <IconButton
      className={clsx(styles.root, className)}
      size={iconProps.size}
      onClick={handleClick}
      title={iconProps.title}
      icon={iconProps.icon}
      color={iconProps.color}/>
  );
};

ResourceSharingButton.propTypes={
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  definition : PropTypes.object.isRequired,
  resource : PropTypes.object.isRequired,
  iconButtonProps : PropTypes.shape(IconButton.propTypes)
};

export default ResourceSharingButton;
