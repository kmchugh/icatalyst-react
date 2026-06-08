import React from 'react';
import {Typography, Divider, Box} from '@mui/material';
import * as Actions from '../actions/organisationEntitySettings.actions';
import {createModel, generateReducer} from '../../../../utilities';
import {createURLConstraint} from '../../../EntityView/validations/createURLConstraint';

// Renders a visually distinct section heading inside an EntityView layout.
const sectionHeader = (title) => {
  const SectionHeader = () => (
    <Box key={`section-${title}`} sx={{mt: 2, mb: 0.5}}>
      <Typography variant="subtitle2" color="text.secondary" sx={{fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', mb: 0.5}}>
        {title}
      </Typography>
      <Divider/>
    </Box>
  );
  SectionHeader.displayName = `SectionHeader(${title})`;
  return SectionHeader;
};

// Flatten the nested themes palette into top-level fields so EntityView
// colour pickers can bind to them directly.
function flattenEntitySettings(entity) {
  const lp = entity.themes?.light?.palette || {};
  const dp = entity.themes?.dark?.palette || {};
  return {
    ...entity,
    lightPrimary   : lp.primary               || '',
    lightSecondary : lp.secondary             || '',
    lightError     : lp.error                 || '',
    lightWarning   : lp.warning               || '',
    lightInfo      : lp.info                  || '',
    lightSuccess   : lp.success               || '',
    lightBgPaper   : lp.background?.paper     || '',
    lightBgDefault : lp.background?.default   || '',
    darkPrimary    : dp.primary               || '',
    darkSecondary  : dp.secondary             || '',
    darkError      : dp.error                 || '',
    darkWarning    : dp.warning               || '',
    darkInfo       : dp.info                  || '',
    darkSuccess    : dp.success               || '',
    darkBgPaper    : dp.background?.paper     || '',
    darkBgDefault  : dp.background?.default   || '',
  };
}

const urlRule = createURLConstraint({requireHTTPS: true});

/** Tab and CRUD: partner-license managers or platform developers. */
export const entitySettingsAuth = {
  retrieveAll: ['partnerLicense', 'developers'],
  retrieve: ['partnerLicense', 'developers'],
  create: ['partnerLicense', 'developers'],
  update: ['partnerLicense', 'developers'],
  delete: false,
  route: ['partnerLicense', 'developers'],
};

const definition = createModel({
  name: 'organisationEntitySetting',
  icon: 'tune',
  primaryTextField: 'authorName',
  auth: entitySettingsAuth,
  transformPayload: flattenEntitySettings,
  fields: [
    {id: 'guid', readonly: true},

    // ── Branding ─────────────────────────────────────────────────────────────
    {
      id          : 'logoURI',
      type        : 'imageuri',
      label       : 'App Logo',
      description : 'Logo shown in the navigation header',
      required    : false,
      maxLength   : 1024,
      validations : [urlRule],
    },
    {
      id          : 'authorName',
      type        : 'string',
      label       : 'Display Name',
      description : 'Organisation name shown in the nav bar',
      required    : false,
      maxLength   : 256,
    },
    {
      id          : 'authorLogo',
      type        : 'imageuri',
      label       : 'Footer Logo',
      description : 'Logo shown in the nav bar footer',
      required    : false,
      maxLength   : 1024,
      validations : [urlRule],
    },
    {
      id          : 'websiteURI',
      type        : 'string',
      label       : 'Website URL',
      description : 'Organisation website — used as the footer link',
      required    : false,
      maxLength   : 256,
      validations : [urlRule],
    },
    {
      id          : 'authorURL',
      type        : 'string',
      label       : 'Author URL',
      description : 'Platform author / vendor website link',
      required    : false,
      maxLength   : 256,
      validations : [urlRule],
    },

    // ── Light theme palette ───────────────────────────────────────────────────
    {id: 'lightPrimary',   type: 'colorselect', label: 'Light: Primary', indent: 1},
    {id: 'lightSecondary', type: 'colorselect', label: 'Light: Secondary'},
    {id: 'lightError',     type: 'colorselect', label: 'Light: Error'},
    {id: 'lightWarning',   type: 'colorselect', label: 'Light: Warning'},
    {id: 'lightInfo',      type: 'colorselect', label: 'Light: Info', indent: 1},
    {id: 'lightSuccess',   type: 'colorselect', label: 'Light: Success'},
    {id: 'lightBgPaper',   type: 'colorselect', label: 'Light: Surface'},
    {id: 'lightBgDefault', type: 'colorselect', label: 'Light: Background'},

    // ── Dark theme palette ────────────────────────────────────────────────────
    {id: 'darkPrimary',    type: 'colorselect', label: 'Dark: Primary',  indent: 1},
    {id: 'darkSecondary',  type: 'colorselect', label: 'Dark: Secondary'},
    {id: 'darkError',      type: 'colorselect', label: 'Dark: Error'},
    {id: 'darkWarning',    type: 'colorselect', label: 'Dark: Warning'},
    {id: 'darkInfo',       type: 'colorselect', label: 'Dark: Info', indent: 1},
    {id: 'darkSuccess',    type: 'colorselect', label: 'Dark: Success'},
    {id: 'darkBgPaper',    type: 'colorselect', label: 'Dark: Surface'},
    {id: 'darkBgDefault',  type: 'colorselect', label: 'Dark: Background'},
  ],

  layout: [
    sectionHeader('Branding'),
    ['logoURI', 'authorLogo'],
    ['authorName', 'websiteURI', 'authorURL'],

    sectionHeader('Light Theme'),
    ['lightPrimary', 'lightSecondary', 'lightError', 'lightWarning'],
    ['lightInfo', 'lightSuccess', 'lightBgPaper', 'lightBgDefault'],

    sectionHeader('Dark Theme'),
    ['darkPrimary', 'darkSecondary', 'darkError', 'darkWarning'],
    ['darkInfo', 'darkSuccess', 'darkBgPaper', 'darkBgDefault'],
  ],

  listLayout: ['authorName'],

  getReducerRoot: ({icatalyst}) => icatalyst.singularity.organisationEntitySettings,

  // Called when loading the entity-settings list for a specific org child view.
  getRetrieveAllParams: (parentDef, parent) => ({
    organisationID: parentDef.getIdentity(parent),
  }),

  // Returns params for the ADD operation.
  // ctx is parentMasterDetailContext (org context) from MasterDetail, or
  // masterDetailContext (entity-settings context whose parentContext is org)
  // from DetailContent — handle both.
  getAddParams: (getState, entity, def, matchParams, ctx) => {
    const orgId = ctx?.entity?.guid || ctx?.parentContext?.entity?.guid;
    return {organisationID: orgId};
  },

  // Returns params for the UPDATE (PATCH) operation.
  // masterDetailCtx is the entity-settings-level context; its parentContext
  // holds the parent organisation entity.
  getUpdateParams: (getState, masterDetailCtx, form) => {
    const orgId =
      masterDetailCtx?.parentContext?.entity?.guid ||
      form?._orgId;
    return {organisationID: orgId};
  },

  ...Actions,
});

const reducer = generateReducer(definition, Actions);

export {definition};
export default reducer;
