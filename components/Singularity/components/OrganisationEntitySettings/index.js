import React, {useState, useEffect, useContext, useCallback} from 'react';
import PropTypes from 'prop-types';
import {Button} from '@mui/material';
import {useDispatch} from 'react-redux';
import {MasterDetailContext} from '../../../MasterDetail';
import {SingularityContext} from '../..';
import EntityView from '../../../EntityView';
import Icon from '../../../Icon';
import {FuseLoading} from '../../../fuse';
import ErrorWrapper from '../../../Errors/ErrorWrapper';
import {definition as entitySettingsDefinition} from '../../store/reducers/organisationEntitySettings.reducer';
import {useForm} from '../../../../hooks/fuse';
import {createMuiStyles, cxMui} from '../../../../utilities';

const useStyles = createMuiStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 0,
    padding: theme.spacingNum(2),
    maxHeight: '100%',
    overflow: 'auto',
  },
  errorWrapper: {
    padding: 0,
    flexShrink: 1,
    flexGrow: 0,
  },
  errorWrapperComponent: {
    padding: 0,
  },
  entityView: {
    overflow: 'auto',
    marginBottom: theme.spacingNum(1),
  },
  actionWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingTop: theme.spacingNum(2),
  },
  actionButton: {
    marginLeft: theme.spacingNum(2),
  },
  actionButtonIcon: {
    marginRight: theme.spacingNum(1),
  },
}));

const OrganisationEntitySettings = ({
  className,
  style = {},
  definition = null,
  match,
}) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const masterDetailContext = useContext(MasterDetailContext);
  const singularityContext = useContext(SingularityContext);
  const {accessToken} = singularityContext;

  definition = definition || entitySettingsDefinition;
  const {operations} = definition;

  const parentContext = masterDetailContext?.parentContext;
  const parentOrgId = parentContext?.entity?.guid;

  // undefined = not yet fetched, null = fetched but absent, object = loaded
  const [loadedEntity, setLoadedEntity] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [responseErrors, setResponseErrors] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [modified, setModified] = useState(false);

  const {form, handleChange, resetForm, setForm} = useForm(null);

  const loadEntity = useCallback(() => {
    if (!operations['RETRIEVE_ENTITIES'] || !parentOrgId) {
      return;
    }
    const params = definition.getRetrieveAllParams ?
      definition.getRetrieveAllParams(
        parentContext.entityDefinition,
        parentContext.entity
      ) : {};

    setLoading(true);
    dispatch(operations['RETRIEVE_ENTITIES']((err, res) => {
      setLoading(false);
      if (!err && res) {
        const raw = res[0] || null;
        const transform = definition.transformPayload;
        setLoadedEntity(raw && transform ? transform(raw) : raw);
      } else {
        setLoadedEntity(null);
      }
    }, {accessToken, params}));
  }, [parentOrgId, accessToken]);

  useEffect(() => {
    loadEntity();
  }, [loadEntity]);

  useEffect(() => {
    if (loadedEntity !== undefined) {
      setForm(loadedEntity || definition.generateModel());
    }
  }, [loadedEntity]);

  useEffect(() => {
    if (form) {
      setFieldErrors(definition.validate(form));
    }
  }, [form]);

  const hasFieldErrors = Object.keys(fieldErrors).flatMap(k => fieldErrors[k]).length > 0;
  const canBeSubmitted = modified && !hasFieldErrors;

  const handleSave = () => {
    const isAdding = !loadedEntity;
    const operation = isAdding ? operations['ADD_ENTITY'] : operations['UPDATE_ENTITY'];
    if (!operation) {
      setResponseErrors([{message: 'Operation not accessible'}]);
      return;
    }

    setUpdating(true);
    dispatch((dispatch, getState) => {
      const params = isAdding
        ? (definition.getAddParams
          ? definition.getAddParams(getState, form, definition, {...(match?.params || {})}, masterDetailContext)
          : {})
        : (definition.getUpdateParams
          ? definition.getUpdateParams(getState, masterDetailContext, form)
          : {});

      return dispatch(operation(form, (err, res) => {
        setUpdating(false);
        if (err) {
          setResponseErrors(err);
        } else {
          setModified(false);
          setResponseErrors(null);
          if (isAdding) {
            const transform = definition.transformPayload;
            setLoadedEntity(res && transform ? transform(res) : res);
            definition.onAdded && definition.onAdded(res, dispatch, getState);
          } else {
            definition.onUpdated && definition.onUpdated(res, dispatch, getState);
          }
        }
      }, {accessToken, params}));
    });
  };

  const handleReset = () => {
    setModified(false);
    resetForm();
  };

  if (loading || loadedEntity === undefined) {
    return <FuseLoading title={`Loading ${definition.label}...`}/>;
  }

  return (
    <div
      className={cxMui(styles.root, className)}
      style={{...style}}
    >
      <div className={cxMui(styles.errorWrapper)}>
        {responseErrors && (
          <ErrorWrapper
            className={cxMui(styles.errorWrapperComponent)}
            errors={responseErrors}
          />
        )}
      </div>

      {updating && <FuseLoading title="Saving..."/>}
      {!updating && form && (
        <EntityView
          className={cxMui(styles.entityView)}
          definition={definition}
          model={form}
          readonly={false}
          errors={fieldErrors}
          onChange={(e, valueMap) => {
            handleChange(e, valueMap);
            setModified(true);
          }}
        />
      )}

      <div className="flex flex-1"/>
      <div className={cxMui(styles.actionWrapper)}>
        <Button
          className={cxMui(styles.actionButton, 'whitespace-no-wrap normal-case')}
          variant="contained"
          color="primary"
          disabled={updating || !canBeSubmitted}
          onClick={handleSave}
        >
          <Icon className={cxMui(styles.actionButtonIcon)}>save</Icon>
          Save
        </Button>
        <Button
          className={cxMui(styles.actionButton, 'whitespace-no-wrap normal-case')}
          variant="contained"
          color="secondary"
          disabled={updating || !modified}
          onClick={handleReset}
        >
          <Icon className={cxMui(styles.actionButtonIcon)}>cancel</Icon>
          Cancel
        </Button>
      </div>
    </div>
  );
};

OrganisationEntitySettings.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  style: PropTypes.object,
  definition: PropTypes.object,
  match: PropTypes.object,
  contained: PropTypes.bool,
};

export default OrganisationEntitySettings;
