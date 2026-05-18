import React, {useState, useEffect, useContext, useCallback} from 'react';
import PropTypes from 'prop-types';
import {Button} from '@mui/material';
import {useDispatch} from 'react-redux';
import {MasterDetailContext} from '../../../MasterDetail';
import {SingularityContext} from '../..';
import {useOrganisation} from '../../../../contexts/Organisation/OrganisationContext';
import EntityView from '../../../EntityView';
import Icon from '../../../Icon';
import {FuseLoading} from '../../../fuse';
import ErrorWrapper from '../../../Errors/ErrorWrapper';
import {definition as entitySettingsDefinition} from '../../store/reducers/organisationEntitySettings.reducer';
import {useForm} from '../../../../hooks/fuse';
import _ from '@icatalyst/@lodash';
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
    marginBottom: theme.spacingNum(1),
    minWidth: 0,
    // EntityView rows use literal "row" / "col" class names — scope layout fixes here only.
    '& .row > .col': {
      minWidth: 0,
      overflow: 'visible',
    },
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

/** Flat comparable map of EntityView fields (avoids nested API keys / `_orgId`). */
function formSnapshot(def, data) {
  if (!data) {
    return null;
  }
  return Object.values(def.fields).reduce((acc, field) => {
    const {id, type} = field;
    let v = data[id];
    if (type === 'colorselect') {
      acc[id] = v == null || v === '' ? '' : String(v).toLowerCase();
    } else {
      acc[id] = v ?? '';
    }
    return acc;
  }, {});
}

function flattenApiRow(raw, def) {
  if (!raw) {
    return null;
  }
  const t = def.transformPayload;
  return t ? t(raw) : raw;
}

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
  const {selectedOrganisationId, updateEntitySettings} = useOrganisation();

  definition = definition || entitySettingsDefinition;
  const {operations} = definition;

  const parentContext = masterDetailContext?.parentContext;
  const parentOrgId = parentContext?.entity?.guid;

  // undefined = not yet fetched, null = fetched but absent, object = loaded (flat UI model)
  const [loadedEntity, setLoadedEntity] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [responseErrors, setResponseErrors] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [baseline, setBaseline] = useState(null);

  const {form, handleChange, setForm} = useForm(null);

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
        setLoadedEntity(flattenApiRow(raw, definition));
      } else {
        setLoadedEntity(null);
      }
    }, {accessToken, params}));
    // Intentionally omit parentContext / definition identity: avoids refetch loops when parent rerenders.
  }, [accessToken, dispatch, parentOrgId, operations]);

  useEffect(() => {
    loadEntity();
  }, [loadEntity]);

  useEffect(() => {
    if (loadedEntity === undefined) {
      return;
    }
    const nextForm = loadedEntity ?
      {...loadedEntity} :
      {...definition.generateModel()};
    setBaseline(formSnapshot(definition, nextForm));
    setForm(nextForm);
  }, [loadedEntity, definition, setForm]);

  useEffect(() => {
    if (form) {
      setFieldErrors(definition.validate(form));
    }
  }, [form, definition]);

  const hasFieldErrors = Object.keys(fieldErrors).flatMap(k => fieldErrors[k]).length > 0;
  const isModified = Boolean(
    baseline &&
    form &&
    !_.isEqual(baseline, formSnapshot(definition, form))
  );
  const canBeSubmitted = isModified && !hasFieldErrors;

  /**
   * Colour pickers may call onChange(null) during prop sync (ColorPicker useEffect).
   * Ignore null clears for colorselect when we already have a hex — only this screen.
   */
  const handleEntityChange = useCallback((e, valueMap) => {
    if (e) {
      handleChange(e, valueMap);
      return;
    }
    if (!valueMap || !Object.keys(valueMap).length) {
      return;
    }
    setForm((prev) => {
      if (!prev) {
        return prev;
      }
      let next = {...prev};
      let didApply = false;
      for (const key of Object.keys(valueMap)) {
        let val = valueMap[key];
        const field = definition.fields[key];
        if (
          field?.type === 'colorselect' &&
          (val === null || val === undefined)
        ) {
          const cur = prev[key];
          if (typeof cur === 'string' && cur.length > 0) {
            continue;
          }
          val = '';
        }
        next = _.setIn(next, key, val);
        didApply = true;
      }
      return didApply ? next : prev;
    });
  }, [definition.fields, handleChange, setForm]);

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
          setResponseErrors(null);
          const flatSaved = flattenApiRow(res, definition) || {...form};
          setBaseline(formSnapshot(definition, flatSaved));
          setForm({...flatSaved});
          setLoadedEntity(flatSaved);

          if (parentOrgId === selectedOrganisationId) {
            updateEntitySettings(res);
          }
          if (isAdding) {
            definition.onAdded && definition.onAdded(res, dispatch, getState);
          } else {
            definition.onUpdated && definition.onUpdated(res, dispatch, getState);
          }
        }
      }, {accessToken, params}));
    });
  };

  const handleReset = () => {
    if (loadedEntity === undefined) {
      return;
    }
    const nextForm = loadedEntity ?
      {...loadedEntity} :
      {...definition.generateModel()};
    setForm(nextForm);
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
          onChange={handleEntityChange}
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
          disabled={updating || !isModified}
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
