import { IconButtonProps as NativeProps, Input, InputAdornment, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import IconButton from 'buttons/IconButton';
import Icon from 'icons/Icon';
import React from 'react';
import { ComponentColor, ComponentSize } from '../../types';

import clsx from 'clsx';
import { FunctionComponent } from 'react';


const useStyles = makeStyles((theme: any) => {
  return {
    root: {
      flexGrow: 1,
      flexShrink: 1,
      display: 'flex'
    },
  }
})

export type ClearableInputprops = {
  icon?: string,
  label?: string,
  value?: string,
  disply?: string,
  color?: ComponentColor,
  size?: ComponentSize
} & NativeProps


export const Clearableinput: FunctionComponent<ClearableInputprops> = ({
  icon = 'create',
  label = 'input',
  value,
  color,
  style,
  disply = 'flex',
  size = 'medium',
  className
}) => {
  const styles = useStyles();
  return (
    <Paper className={clsx(styles.root, className)} style={style} elevation={1}>
      {
        <Input
          placeholder={label}
          className={clsx(styles.root, className)}
          disableUnderline
          fullWidth
          value={value || ''}
          inputProps={{
            'aria-label': label
          }}
          //   onChange={(e)=>{
          //     onChange && onChange(e.target.value);
          //   }}
          startAdornment={
            <InputAdornment position="start">
              <Icon color={color}>{icon}</Icon>
            </InputAdornment>
          }
          endAdornment={
            value && <InputAdornment position="end">
              <IconButton
                size={size}
                icon="cancel"
                title="clear"
                disabled={!value || value === ''}
              // onClick={()=>{
              //   onChange && onChange('');
              // }}
              />
            </InputAdornment>
          }
        />
      }

    </Paper>


  )
}


