import React, {useContext} from 'react';
import {FuseAnimate} from '@icatalyst/components/fuse';
import Icon from '@icatalyst/components/Icon';
import Image from '@icatalyst/components/Image';
import {Typography} from '@mui/material';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import {MasterDetailContext} from './index';
import { createMuiStyles, cxMui } from '../../utilities';

const useStyles = createMuiStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacingNum(2),
    marginBottom: theme.spacingNum(2),
    color : theme.palette.primary.contrastText
  },
  detailWrapper : {
    maxWidth: '100%',
  },
  linkWrapper : {
    marginBottom: theme.spacingNum(1.5),
    '& .material-icons' : {
      fontSize : theme.spacingNum(2.5),
    },
    '& *' : {
      verticalAlign: 'middle'
    }
  },
  details : {
    marginTop: theme.spacingNum(1),
    display: 'flex',
    alignItems: 'center',
    maxWidth: '100%',

    '& .fa-users' : {
      width: theme.spacingNum(6),
      height: theme.spacingNum(6),
    }
  },
  featureImage : {
    maxWidth : theme.spacingNum(6),
    maxHeight: theme.spacingNum(6),
    borderRadius: theme.shape.borderRadius,
  },
  detailText : {
    overflow: 'hidden',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacingNum(2),
    }
  },

}));


const DetailHeader = ({
  icon,
  className,
  backText,
  backUrl,
  featureImage,
  actionComponent,
})=>{
  const masterDetailContext = useContext(MasterDetailContext);

  const {
    entityDefinition : definition,
    entity
  } = masterDetailContext;

  const classes = useStyles();
  const theme = useTheme();
  const textModel = entity || {
    [definition.primaryTextFieldName] : '',
    [definition.secondaryTextFieldName] : ''
  };

  return (
    <div className={cxMui(classes.root, className)}>
      <div className={cxMui(classes.detailWrapper)}>
        <FuseAnimate animation="transition.slideRightIn" delay={300}>
          <Typography
            className={cxMui(classes.linkWrapper)}
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
          <div className={cxMui(classes.details)}>

            {featureImage ? (
              <Image className={cxMui(classes.featureImage)}
                src={featureImage}
                alt={definition.getPrimaryText(textModel)}
                sx={{ display: { xs: 'none', sm: 'block' } }}
              />
            ) : <Icon>{icon}</Icon>}

            <div className={cxMui(classes.detailText)}>
              <Typography noWrap={true} variant="h5">
                {definition.getPrimaryText(textModel)}
              </Typography>

              <Typography className="block" noWrap={true} variant="caption">{definition.getSecondaryText(textModel)}</Typography>
            </div>
          </div>

        </FuseAnimate>

      </div>
      {actionComponent && 
        <FuseAnimate animation="transition.slideRightIn" delay={300} 
          sx={{ display: { xs: 'none', md: 'block' } }}>
          {
            actionComponent
          }
        </FuseAnimate>
      }
    </div>
  );
};

DetailHeader.propTypes = {
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

export default DetailHeader;
