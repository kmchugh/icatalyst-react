import React from 'react';
import {styled} from '@mui/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import { Typography } from '@mui/material';
import Error from './Error';
import {tinycolor, mostReadable} from '@ctrl/tinycolor';

const getErrorColors = (theme) => {
  const background = mostReadable(tinycolor(theme.palette.background.default), [
    theme.palette.error.dark,
    theme.palette.error.main,
    theme.palette.error.light,
  ]).toHex8String();

  const border = mostReadable(tinycolor(background), [
    theme.palette.error.dark,
    theme.palette.error.main,
    theme.palette.error.light,
  ]).toHex8String();

  const text = mostReadable(tinycolor(background), [
    theme.palette.error.contrastText,
    theme.palette.error.dark,
    theme.palette.error.main,
    theme.palette.error.light,
  ]).toHex8String();

  return { background, border, text };
};
const Root = styled('div')(({ theme }) => {
  const { background, border, text } = getErrorColors(theme);
  return {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacingNum(2),
    borderRadius: theme.shape.borderRadius,
    border: `thin solid ${border}`,
    backgroundColor: background,
    color: text,
    width: '100%',
    position: 'relative!important',
    minHeight: '100%'
  };
});

const ErrorList = styled('ul')(({ theme }) => ({
  margin: theme.spacingNum(2),
}));

const ErrorIcon = styled(Icon)(({ theme }) => {
  const { text } = getErrorColors(theme);
  return {
    marginRight: theme.spacingNum(2),
    color: text
  };
});

const ErrorTitle = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center'
}));

const ErrorStyle = styled('li')(({ theme }) => ({
  listStyle: 'circle',
  marginLeft: theme.spacingNum(3)
}));

const ErrorActionWrapper = styled('div')(({ theme }) => ({
  textAlign: 'center',
  margin: theme.spacingNum(2)
}));


const ErrorComponent = ({errors,
  title,
  actionComponent,
  className,
  role = 'alert'
})=>{
  if (!errors || errors.length === 0) {
    return null;
  }
  return (
    <Root role={role} aria-atomic={true} className={clsx(className)}>
      {title &&
        (
          <ErrorTitle>
            <ErrorIcon>error</ErrorIcon>
            <Typography className="flex-shrink" variant="h5" component="h1">
              {title}
            </Typography>
          </ErrorTitle>
        )
      }
      {
        process.env.NODE_ENV !== 'production' && <ErrorList>
          {
            errors.filter((e, index, self)=>{
              return self.findIndex((error)=>error.message === e.message) === index;
            }).map(e=>{
              const message = e.message || e.toString();
              return (
                <ErrorStyle key={message}>
                  <Error>{message || 'Unknown Error'}</Error>
                </ErrorStyle>
              );
            })
          }
        </ErrorList>
      }
      {
        actionComponent && <ErrorActionWrapper>
          {actionComponent}
        </ErrorActionWrapper>
      }
    </Root>
  );
};

ErrorComponent.propTypes = {
  errors: PropTypes.arrayOf(
    PropTypes.shape({
      message : PropTypes.string.isRequired
    })
  ),
  title : PropTypes.string,
  actionComponent : PropTypes.node,
  role : PropTypes.string,
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
};

export default React.memo(ErrorComponent);
