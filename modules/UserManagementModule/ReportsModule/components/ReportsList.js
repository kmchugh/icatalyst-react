import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import ReportItem from './ReportItem';

const useStyles = makeStyles((theme)=>{
  return {
    root : {
      display : 'grid',
      columnGap : theme.spacing(1),
      rowGap : theme.spacing(1),
      gridTemplateColumns: 'auto auto auto auto',

      padding : theme.spacing(2),
    }
  };
});

const reportMap = {
  users : {
    title : 'Users',
    path : 'users',
    icon : 'group'
  }
};

const ReportsList = ({
  className,
  style = {}
})=>{
  const styles = useStyles();

  return (
    <div
      className={clsx(styles.root, className)}
      style={{...style}}
    >
      {
        Object.keys(reportMap).sort().map((r)=>(
          <ReportItem
            key={r}
            report={reportMap[r]}
          />
        ))
      }
    </div>
  );
};

ReportsList.propTypes={
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  style: PropTypes.object
};

export default ReportsList;
