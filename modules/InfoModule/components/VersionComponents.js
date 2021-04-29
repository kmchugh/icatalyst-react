import React from 'react';
import PropTypes from 'prop-types';
import {Typography, Card, CardContent,
  CardHeader, ListItem, ListItemText
} from '@material-ui/core';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';

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

const VersionComponents = ({
  versions = [],
  title,
  logo
})=>{

  const classes = useStyles();

  return (
    <Card className={clsx(classes.root)}>
      <CardHeader
        title={<Typography variant="h5">{title}</Typography>}
        avatar={logo}
      />
      <CardContent>
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
      </CardContent>
    </Card>
  );
};

VersionComponents.propTypes = {
  versions : PropTypes.arrayOf(PropTypes.shape({
    value : PropTypes.string
  })),
  title : PropTypes.string.isRequired,
  logo : PropTypes.node
};



export default VersionComponents;
