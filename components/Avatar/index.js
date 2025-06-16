import React from 'react';
import PropTypes from 'prop-types';
import { styled, useTheme } from '@mui/material/styles';
import clsx from 'clsx';
import Image from '../Image';

const Root = styled('div', {
  shouldForwardProp: (prop) =>
    !['backgroundColor', 'border', 'color', 'variant'].includes(prop),
})(({ theme, backgroundColor, color, border, variant }) => ({
  display: 'flex',
  backgroundColor,
  borderColor: color,
  boxSizing: 'content-box',
  borderWidth: border ? theme.spacing(1) : 0,
  overflow: 'hidden',
  borderRadius: variant === 'circular' ? '50%' : undefined,
  '& img': variant === 'circular' ? { borderRadius: '50%', width: '100%' } : {},
}));

const StyledImage = styled(Image)({
  objectFit: 'cover',
  backgroundSize: 'cover',
});

const Avatar = ({
  backgroundColor,
  imgProps,
  className,
  alt,
  src,
  reverse,
  color,
  variant = 'circular',
  border = true,
}) => {
  const theme = useTheme();
  const bg = backgroundColor || theme.palette.background.default;
  const fg = color || theme.palette.secondary.light;

  return (
    <Root
      backgroundColor={reverse ? fg : bg}
      color={reverse ? bg : fg}
      border={border}
      variant={variant}
      className={clsx(className)}
    >
      <StyledImage
        src={src}
        alt={alt}
        backgroundColor={reverse ? fg : bg}
        defaultSrc={'assets/images/placeholders/blank-profile.svg'}
        {...imgProps}
      />
    </Root>
  );
};

Avatar.propTypes = {
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  src : PropTypes.string,
  variant : PropTypes.oneOf(['circular', 'square']),
  backgroundColor : PropTypes.string,
  color : PropTypes.string,
  imgProps : PropTypes.object,
  reverse : PropTypes.bool,
  alt : PropTypes.string,
  border : PropTypes.bool
};

export default Avatar;
