import React, {useEffect, useState, useContext} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import {SingularityContext} from '@icatalyst/components/Singularity';
import {definition as edgeDefinition} from '../../store/reducers/edgeType.reducer';
import FuseLoading from '../../../fuse/FuseLoading';
import {ButtonBase, Tooltip} from '@material-ui/core';
import Icon from '../../../Icon';
import _ from '../../../../@lodash';

const useStyles = makeStyles((theme)=>{
  return {
    root : {
      display: 'flex',
      flexDirection : 'column',

      [theme.breakpoints.up('md')] : {
        flexDirection : 'row',

        ['& > *'] : {
          width : theme.spacing(24),
          height : theme.spacing(24)
        }
      }
    },
    itemRoot : {
      width: '100%',
      height: '100%',
      paddingRight : theme.spacing(1),
      ['&:last-child']:{
        paddingRight : 0,
        paddingLeft : theme.spacing(1),
      }
    },
    buttonBase  : {
      borderWidth: 'thin',
      borderColor : theme.palette.primary.main,
      borderStyle : 'solid',
      borderRadius : theme.shape.borderRadius,
      paddingTop : theme.spacing(1),
      paddingBottom : theme.spacing(1),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      backgroundColor: theme.palette.secondary.contrastText,
      color: theme.palette.secondary.main,
      display: 'flex',
      flexDirection: 'column',
      whiteSpace: 'normal',

      width: '100%',
      height: '100%'
    },
    selected : {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText
    },
    disabled : {
      backgroundColor: theme.palette.action.disabledBackground,
      color: theme.palette.action.disabled
    },
    icon : {
      marginBottom : theme.spacing(2),
      fontSize : `${theme.spacing(4)}px!important`
    }
  };
});

const EdgeTypeSelection = ({
  className,
  onChange,
  value,
  field,
  readonly,
  accessTypeProps = {}
})=>{
  const styles = useStyles();
  const dispatch = useDispatch();
  const [updating, setUpdating] = useState(false);
  const [errors, setErrors] = useState();
  const [data, setData] = useState(null);

  const singularityContext = useContext(SingularityContext);
  const {accessToken} = singularityContext;

  const accessTypes = _.merge({}, {
    'SINGULARITY_MEMBER_EDGE' : {
      title : 'View',
      description : 'Can only view',
      icon : 'visibility'
    },
    'SINGULARITY_OWNER_EDGE' : {
      title : 'Edit',
      description : 'Can modify',
      icon : 'edit'
    }
  }, accessTypeProps);

  const { title, operations, getReducerRoot = ()=>{
    console.warn(`You have not set a selector root for definition ${title}`);
  } } = edgeDefinition;

  const reducer = useSelector(getReducerRoot);

  const loadEntities = ()=>{
    if (reducer && edgeDefinition && operations && operations['RETRIEVE_ENTITIES']) {
      setUpdating(true);
      const result = dispatch(operations['RETRIEVE_ENTITIES']((err)=>{
        // Success will be picked up by the reducer change
        if (err) {
          setErrors(err.errors || err);
          console.error(errors);
        }
        setUpdating(false);
      }, {
        accessToken : accessToken,
        params : {
          // Implement params if required
        }
      }));

      return (()=>{
        result.cancelToken.cancel('Unloading');
      });
    }
  };

  useEffect(()=>{
    if (reducer && !reducer.loaded) {
      loadEntities();
      setData(null);
    } else if (reducer && reducer.loaded) {
      setData(reducer.entities.map((edgeType)=>{
        return {
          ...edgeType,
          ...accessTypes[edgeType.code],
          value : edgeType.code === 'SINGULARITY_MEMBER_EDGE' ?
            [edgeType.guid] :
            reducer.entities.sort().map(e=>e.guid)
          ,
        };
      }));
      setUpdating(false);
    }
  }, [reducer]);

  return (
    <div className={clsx(styles.root, className)}>
      {updating && <FuseLoading/>}
      {(!updating && data) ? data.map((edgeType)=>{
        const isSelected = _.isEqual(value, edgeType.value);
        const isDisabled = readonly;
        return (
          <Tooltip key={edgeType.guid} title={isDisabled ? '' : edgeType.title}>
            <div className={clsx(styles.itemRoot)}>
              <ButtonBase
                disabled={isDisabled}
                value={edgeType.value}
                onClick={()=>{
                  if (isDisabled) {
                    return;
                  }
                  onChange && onChange({
                    target : {
                      name : field.id,
                      value : edgeType.value
                    }
                  });
                }}
                variant="outlined"
                className={clsx(styles.buttonBase,
                  (isDisabled && !isSelected) ? styles.disabled : null,
                  isSelected ? styles.selected : null,
                  className)
                }
              >
                <Icon fontSize="large" className={clsx(styles.icon)}>{edgeType.icon}</Icon>
                {edgeType.description}
              </ButtonBase>
            </div>
          </Tooltip>
        );
      }): null}

    </div>
  );
};

EdgeTypeSelection.propTypes={
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  readonly : PropTypes.bool,
  onChange : PropTypes.func,
  value : PropTypes.any,
  errors: PropTypes.array,
  field : PropTypes.object.isRequired,
  fullWidth : PropTypes.bool,
  accessTypeProps : PropTypes.object
};

export default EdgeTypeSelection;
