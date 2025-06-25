import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import moment from '../../../../@moment';
import _ from '../../../../@lodash';
import pluralize from 'pluralize';
import ListItemText from '@mui/material/ListItemText';
import {DialogContent} from '../../../../components/Dialogs';
import { createMuiStyles, cxMui } from '../../../../utilities';

const useStyles = createMuiStyles((theme)=>{
  return {
    root : {
    },
    resourceContent : {
      marginTop : theme.spacingNum(1),
      overflow : 'auto'
    },
    resourceSection : {
      marginTop : theme.spacingNum(1),
      marginBottom : theme.spacingNum(1),
    },
    resourceWrapper : {
      marginTop: theme.spacingNum(1),
      display : 'grid',
      gridTemplateColumns: 'auto auto',
      columnGap : theme.spacingNum(2),
      rowGap : theme.spacingNum(1),
    },
    ownerSection : {
    },
    memberSection : {
    },
    resourceList : {
    },
    listItem : {
      borderBottomWidth : 'thin',
      borderBottomStyle : 'solid',
      borderBottomColor : theme.palette.divider,
    },
    sectionTitle : {
      marginTop : theme.spacingNum(2),
      background : theme.palette.divider,
      width: '100%',
      borderBottomWidth : 'thin',
      borderBottomStyle : 'solid',
      borderBottomColor : theme.palette.secondary.main,
    }
  };
});

const UserResourceSection = ({
  className,
  style = {},
  title,
  data
})=>{
  const styles = useStyles();

  const ownerData = data.filter(item=>item.edges.includes('Owner'));
  const memberData = data.filter(item=>item.edges.includes('Member'));

  return (
    <div
      className={cxMui(styles.resourceSection, className)}
      style={{...style}}
    >

      <Typography
        variant="h5"
        color="primary"
        className={cxMui(styles.sectionTitle)}
      >
        {_.startCase(pluralize(title))} ({data.length})
      </Typography>

      <div className={cxMui(styles.resourceWrapper)}>

        <div className={cxMui(styles.ownerSection)}>
          <Typography
            variant="h6"
          >
            Owns ({ownerData.length})
          </Typography>

          <div className={cxMui(styles.resourceList)}>
            {
              ownerData.length > 0 ? ownerData.map((item)=>(
                <ListItemText
                  className={cxMui(styles.listItem)}
                  key={item.resourceID}
                  primary={item.name}
                  secondary={item.resourceID}
                />
              )) : (<Typography>NONE</Typography>)
            }
          </div>
        </div>

        <div className={cxMui(styles.memberSection)}>
          <Typography
            variant="h6"
            color="primary"
          >
            Member Of ({memberData.length})
          </Typography>
          <div className={cxMui(styles.resourceList, className)}>
            {
              memberData.map((item)=>(
                <ListItemText
                  className={cxMui(styles.listItem)}
                  key={item.resourceID}
                  primary={item.name}
                  secondary={item.resourceID}
                />
              ))
            }
          </div>
        </div>

      </div>
    </div>
  );
};

UserResourceSection.propTypes={
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  style: PropTypes.object,
  title : PropTypes.string,
  data : PropTypes.array.isRequired,
};

const UserReportDetails = ({
  className,
  style = {},
  user,
})=>{
  const styles = useStyles();
  const sectionKeys = [
    'role',
    'dashboard',
    'framework',
    'space',
    'embedded'
  ];

  return (
    <DialogContent
      className={cxMui(styles.root, className)}
      style={{...style}}
    >
      <Typography
        variant="h4"
      >
        {user.displayName}
      </Typography>


      <Typography
        variant="h5"
      >
        {user.email}
      </Typography>

      <Typography
        variant="caption"
      >
        User Since: {moment(user.created).format('LL')}
      </Typography>

      <div className={cxMui(styles.resourceContent)}>
        {
          sectionKeys.map((key)=>{
            if (!user[key]) {
              return null;
            } else {
              return (
                <UserResourceSection
                  title={key}
                  key={key}
                  data={user[key]}
                />
              );
            }
          }).filter(i=>i)
        }
      </div>
    </DialogContent>
  );
};

UserReportDetails.propTypes={
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  style: PropTypes.object,
  user : PropTypes.object.isRequired,
};

export default UserReportDetails;
