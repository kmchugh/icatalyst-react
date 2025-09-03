import React from 'react';
import PropTypes from 'prop-types';
import ReportItem from './ReportItem';
import { createMuiStyles, cxMui } from '../../../../utilities';

const useStyles = createMuiStyles((theme)=>{
  return {
    root : {
      display : 'grid',
      columnGap : theme.spacingNum(1),
      rowGap : theme.spacingNum(1),
      gridTemplateColumns: 'auto auto auto auto',

      padding : theme.spacingNum(2),
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
      className={cxMui(styles.root, className)}
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
