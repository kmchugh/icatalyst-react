import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import moment from '../../../../@moment';
import _ from '../../../../@lodash';
import pluralize from 'pluralize';
import ListItemText from '@material-ui/core/ListItemText';
import {DialogContent} from '../../../../components/Dialogs';

const useStyles = makeStyles((theme)=>{
  return {
    root : {
    },
    resourceContent : {
      marginTop : theme.spacing(1),
      overflow : 'auto'
    },
    resourceSection : {
      marginTop : theme.spacing(1),
      marginBottom : theme.spacing(1),
    },
    resourceWrapper : {
      marginTop: theme.spacing(1),
      display : 'grid',
      gridTemplateColumns: 'auto auto',
      columnGap : theme.spacing(2),
      rowGap : theme.spacing(1),
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
      marginTop : theme.spacing(2),
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
      className={clsx(styles.resourceSection, className)}
      style={{...style}}
    >

      <Typography
        variant="h5"
        color="primary"
        className={clsx(styles.sectionTitle)}
      >
        {_.startCase(pluralize(title))} ({data.length})
      </Typography>

      <div className={clsx(styles.resourceWrapper)}>

        <div className={clsx(styles.ownerSection)}>
          <Typography
            variant="h6"
          >
            Owns ({ownerData.length})
          </Typography>

          <div className={clsx(styles.resourceList)}>
            {
              ownerData.length > 0 ? ownerData.map((item)=>(
                <ListItemText
                  className={clsx(styles.listItem)}
                  key={item.resourceID}
                  primary={item.name}
                  secondary={item.resourceID}
                />
              )) : (<Typography>NONE</Typography>)
            }
          </div>
        </div>

        <div className={clsx(styles.memberSection)}>
          <Typography
            variant="h6"
            color="primary"
          >
            Member Of ({memberData.length})
          </Typography>
          <div className={clsx(styles.resourceList, className)}>
            {
              memberData.map((item)=>(
                <ListItemText
                  className={clsx(styles.listItem)}
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
      className={clsx(styles.root, className)}
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

      <div className={clsx(styles.resourceContent)}>
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
