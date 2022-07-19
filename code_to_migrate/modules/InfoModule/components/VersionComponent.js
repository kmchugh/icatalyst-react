import React from 'react';
import PropTypes from 'prop-types';
import {Typography, Card, CardContent,
  CardHeader, ListItem, ListItemText
} from '@material-ui/core';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';
import FuseLoading from '../../../components/fuse/FuseLoading';
import ErrorWrapper from '../../../components/Errors/ErrorWrapper';

const useStyles = makeStyles((theme)=>{
  return {
    root : {
      overflow: 'visible',
      margin: theme.spacing(1)
    },
    listItem : {
      paddingTop: 0,
      paddingBottom: 0,
    }
  };
});

const VersionComponent = ({
  versions = [],
  title,
  logo,
  errors
})=>{
  const classes = useStyles();
  const hasErrors = errors && errors.length > 0;
  const hasVersions = versions && versions.length > 0;
  // If there are no errors and no version, then assume loading
  const isLoading = !hasErrors && !hasVersions;

  return (
    <Card className={clsx(classes.root)}>
      <CardHeader
        title={<Typography variant="h5">{title}</Typography>}
        avatar={logo}
      />
      <CardContent>
        {(!isLoading && !hasErrors) && (
          <ul>
            {
              versions.map((v)=>{
                const version = v.value.split(', ');
                return (
                  <ListItem key={v.value} className={clsx(classes.listItem)}>
                    <ListItemText primary={version[0]} secondary={version[1]} />
                  </ListItem>
                );
              })
            }
          </ul>
        )}

        {(!isLoading && hasErrors) && (
          <ErrorWrapper errors={errors}/>
        )}

        {
          isLoading && (
            <FuseLoading/>
          )
        }

      </CardContent>
    </Card>
  );
};

VersionComponent.propTypes = {
  versions : PropTypes.arrayOf(PropTypes.shape({
    value : PropTypes.string
  })),
  title : PropTypes.string.isRequired,
  logo : PropTypes.node,
  errors : PropTypes.arrayOf(PropTypes.shape({
    message : PropTypes.string
  }))
};



export default VersionComponent;
