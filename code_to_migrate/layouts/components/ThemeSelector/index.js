import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import {useSelector} from 'react-redux';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import _ from '../../../@lodash';

const useStyles = makeStyles((/*theme*/)=>{
  return {
    root : {
      paddingTop: 0,
      paddingBottom: 0,
    }
  };
});

const ThemeSelector = ({
  className,
  onChange,
  value,
  field,
  readonly
})=>{
  const styles = useStyles();

  const {
    id,
    required
  } = field;

  const {current, themes : availableThemes} = useSelector((state)=>state.icatalyst.settings);
  const {theme : currentThemes} = current.layout;

  const options = useMemo(()=>{
    return Object.keys(availableThemes)
      .filter(key=>key!=='defaultTheme')
      .map((key)=>({
        id : key
      }));
  }, [availableThemes]);

  return (
    <Select
      className={clsx(styles.root, className)}
      labelId={`${id}-label`}
      id={id}
      name={id}
      value={value || currentThemes[id] || ''}
      onChange={(e)=>{
        if (e.target.value !== value) {
          onChange && onChange(e, value);
        }
      }}
      required={required}
      inputProps={{
        readOnly: readonly
      }}
    >
      {
        options.map((item) => {
          const {id, value = id, label = _.startCase(id)} = item;
          return (
            <MenuItem key={id} value={value}>
              {label}
            </MenuItem>
          );
        })
      }
    </Select>
  );
};

ThemeSelector.propTypes={
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  readonly : PropTypes.bool,
  onChange : PropTypes.func,
  value : PropTypes.any,
  errors: PropTypes.array,
  field : PropTypes.object.isRequired,
  fullWidth : PropTypes.bool,
  accessTypeProps : PropTypes.object
};

export default ThemeSelector;
