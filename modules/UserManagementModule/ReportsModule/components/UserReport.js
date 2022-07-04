import React, {useEffect, useState, useContext} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import {definition as reportDefinition} from '../../../../components/Singularity/store/reducers/userReports.reducer';
import FuseLoading from '../../../../components/fuse/FuseLoading';
import {SingularityContext} from '@icatalyst/components/Singularity';
import ErrorWrapper from '../../../../components/Errors/ErrorWrapper';
import {DataTable} from '@icatalyst/components';
import SearchFilterProvider from '../../../../components/Tables/SearchFilterProvider';
import * as DialogActions from '../../../../store/actions/dialog.actions';
import UserReportDetails from './UserReportDetails';

const useStyles = makeStyles((/*theme*/)=>{
  return {
    root : {}
  };
});

const UserReport = ({
  className,
  style = {}
})=>{
  const styles = useStyles();
  const dispatch = useDispatch();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const {accessToken} = useContext(SingularityContext);

  const operations = reportDefinition.operations;

  useEffect(()=>{
    setLoading(true);
    const result = dispatch(operations['RETRIEVE_ENTITIES']((err, res)=>{
      setLoading(false);
      if (err) {
        setErrors(err);
      } else {
        setData(res.map(reportDefinition.transformPayload));
      }
    }, {
      accessToken : accessToken
    }));

    return (()=>{
      if (result && result.cancelToken) {
        result.cancelToken.cancel('Unloading');
      }
    });
  }, []);

  return (
    <SearchFilterProvider>
      <div
        className={clsx(styles.root, className)}
        style={{...style}}
      >
        {(loading && !data) && (
          <FuseLoading title={`Loading ${reportDefinition.label}...`}/>
        )}
        {(!loading && data) && (
          <DataTable
            definition={reportDefinition}
            data={data}
            updating={false}
            canAdd={false}
            canDelete={false}
            onRowClicked={(row)=>{
              dispatch(DialogActions.openDialog({
                title : 'User Details',
                children : <UserReportDetails user={row}/>
              }));
            }}
          />
        )}
        {errors && (
          <ErrorWrapper className={clsx(styles.errorWrapper)} errors={errors}/>
        )}
      </div>
    </SearchFilterProvider>
  );
};

UserReport.propTypes={
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  style: PropTypes.object
};

export default UserReport;
