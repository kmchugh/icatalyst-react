import React from 'react';
import PropTypes from 'prop-types';
import Image from '../Image';
import { createMuiStyles, cxMui, useMuiTheme } from '../../utilities';

const useStyles = createMuiStyles((theme, {
  backgroundColor,
  color,
  border
}) => ({
  root  : {
    display : 'flex',
    backgroundColor : backgroundColor,
    borderColor: color,
    boxSizing : 'content-box',
    borderWidth: !border ? 0 : theme.spacingNum(1),
    overflow: 'hidden'
  },
  circular : {
    borderRadius :'50%',

    ['& img'] : {
      borderRadius : '50%',
      width: '100%'
    }
  },
  image : {
    objectFit : 'cover',
    backgroundSize : 'cover'
  }
}));

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
})=>{
  const theme = useMuiTheme();
  const bg = backgroundColor || theme.palette.background.default;
  const fg = color || theme.palette.secondary.light;

  const classes = useStyles({
    backgroundColor : reverse ? fg : bg,
    color : reverse ? bg : fg,
    border
  });

  return (
    <div className={cxMui(classes.root, classes[variant], className)}>
      <Image
        className={cxMui(classes.image)}
        backgroundColor={reverse ? fg : bg}
        src={src}
        alt={alt}
        defaultSrc={'assets/images/placeholders/blank-profile.svg'}
        {...imgProps}
      />
    </div>
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
