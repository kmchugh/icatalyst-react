import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';

const useStyles = makeStyles((/*theme*/)=>{
  return {
    root : {}
  };
});

const BoilerplateComponent = ({
  className,
  style = {}
})=>{
  const styles = useStyles();

  return (
    <div
      className={clsx(styles.root, className)}
      style={{...style}}
    >
      USER REPORT
    </div>
  );
};

BoilerplateComponent.propTypes={
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  style: PropTypes.object
};

export default BoilerplateComponent;
