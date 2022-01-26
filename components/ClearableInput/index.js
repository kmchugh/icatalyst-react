import React from 'react';
import Icon from '@icatalyst/components/Icon';
import {Paper, Input, InputAdornment} from '@material-ui/core';
import PropTypes from 'prop-types';
import IconButton from '../IconButton';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';


const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(.5),
    paddingBottom: theme.spacing(.5),
    display: 'flex',
    flexGrow: 1,
    flexShrink: 1,
  }
}));


const ClearableInput = ({
  icon = 'create',
  onChange = ()=>{},
  label = 'input',
  value,
  className
})=>{
  const classes = useStyles();

  return (
    <Paper className={clsx(classes.root, className)} elevation={1}>
      {
        <Input
          placeholder={label}
          className="flex flex-1"
          disableUnderline
          fullWidth
          value={value || ''}
          inputProps={{
            'aria-label': label
          }}
          onChange={(e)=>{
            onChange && onChange(e.target.value);
          }}
          startAdornment={
            <InputAdornment position="start">
              <Icon color="action">{icon}</Icon>
            </InputAdornment>
          }
          endAdornment={
            value && <InputAdornment position="end">
              <IconButton
                size="small"
                icon="cancel"
                title="clear"
                disabled={!value || value === ''}
                onClick={()=>{
                  onChange && onChange('');
                }}
              />
            </InputAdornment>
          }
        />
      }
    </Paper>
  );
};

ClearableInput.propTypes = {
  icon : PropTypes.string,
  onChange : PropTypes.func,
  label : PropTypes.string,
  value : PropTypes.string,
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
};

export default React.memo(ClearableInput);
