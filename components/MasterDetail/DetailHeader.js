import React from 'react';
import {FuseAnimate} from '@icatalyst/components/fuse';
import Icon from '@icatalyst/components/Icon';
import Image from '@icatalyst/components/Image';
import {Typography, Hidden} from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { withRouter, Link } from 'react-router-dom';
import {ModelPropTypes} from '../../utilities/createModel';
import {useSharedDetail} from './useSharedDetail';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  detailWrapper : {
    maxWidth: '100%',
  },
  linkWrapper : {
    marginBottom: theme.spacing(1.5),
    '& .material-icons' : {
      fontSize : theme.spacing(2.5),
    },
    '& *' : {
      verticalAlign: 'middle'
    }
  },
  details : {
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    maxWidth: '100%',

    '& .fa-users' : {
      width: theme.spacing(6),
      height: theme.spacing(6),
    }
  },
  featureImage : {
    maxWidth : theme.spacing(6),
    maxHeight: theme.spacing(6),
    borderRadius: theme.shape.borderRadius,
  },
  detailText : {
    overflow: 'hidden',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(2),
    }
  },

}));


const DetailHeader = ({
  definition,
  icon,
  className,
  backText,
  backUrl,
  featureImage,
  actionComponent
})=>{
  const classes = useStyles();
  const theme = useTheme();
  const {entity} = useSharedDetail();
  const textModel = entity || {
    [definition.primaryTextFieldName] : '',
    [definition.secondaryTextFieldName] : ''
  };

  return (
    <div className={clsx(classes.root, className)}>

      <div className={clsx(classes.detailWrapper)}>
        <FuseAnimate animation="transition.slideRightIn" delay={300}>
          <Typography
            className={clsx(classes.linkWrapper)}
            component={Link}
            role="button"
            to={backUrl}
            color="inherit"
          >
            <Icon>
              {theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
            </Icon>
            <span className="mx-4">{backText}</span>
          </Typography>
        </FuseAnimate>

        <FuseAnimate animation="transition.slideRightIn" delay={300}>
          <div className={clsx(classes.details)}>

            <Hidden xsDown>
              {featureImage ? (
                <Image className={clsx(classes.featureImage)}
                  src={featureImage}
                  alt={definition.getPrimaryText(textModel)}
                />
              ) : <Icon>{icon}</Icon>}
            </Hidden>

            <div className={clsx(classes.detailText)}>
              <Typography noWrap={true} variant="h5">
                {definition.getPrimaryText(textModel)}
              </Typography>

              <Typography className="block" noWrap={true} variant="caption">{definition.getSecondaryText(textModel)}</Typography>
            </div>
          </div>

        </FuseAnimate>

      </div>

      {actionComponent && <Hidden smDown>
        <FuseAnimate animation="transition.slideRightIn" delay={300}>
          {
            actionComponent
          }
        </FuseAnimate>
      </Hidden>
      }
    </div>
  );
};

DetailHeader.propTypes = {
  definition : ModelPropTypes.isRequired,
  backText : PropTypes.string,
  backUrl :PropTypes.string,
  featureImage : PropTypes.string,
  icon :PropTypes.string,
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  actionComponent : PropTypes.node
};

export default React.memo(withRouter(DetailHeader));
