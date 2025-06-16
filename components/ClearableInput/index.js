import React from 'react';
import Icon from '@icatalyst/components/Icon';
import {Paper, Input, InputAdornment} from '@mui/material';
import PropTypes from 'prop-types';
import IconButton from '../IconButton';
import clsx from 'clsx';
import { styled } from '@mui/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  paddingLeft: theme.spacingNum(1),
  paddingRight: theme.spacingNum(1),
  paddingTop: theme.spacingNum(.5),
  paddingBottom: theme.spacingNum(.5),
  display: 'flex',
  flexGrow: 1,
  flexShrink: 1,
}));


const ClearableInput = ({
  icon = 'create',
  onChange = ()=>{},
  label = 'input',
  value,
  className
})=>{

  return (
    <StyledPaper className={clsx(className)} elevation={1}>
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
    </StyledPaper>
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
