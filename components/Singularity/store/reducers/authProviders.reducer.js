import React from 'react';
import * as Actions from '../actions/authProviders.actions';
import { createModel, generateReducer } from '../../../../utilities';
import Typography from '@material-ui/core/Typography';
import { createURLConstraint } from '../../../EntityView/validations/createURLConstraint';
import AuthProviderURL from '../../components/AuthProviderURL';
import OIDCDiscoveryInput from '../../components/OIDCDiscoveryInput';

const definition = createModel({
  name: 'identityProvider',
  icon: 'lock_person',
  primaryTextField: 'name',
  addInline: true,
  auth: 'alpha',
  fields: [
    {
      id: 'guid',
      label: 'Key',
      readonly: true,
    },
    {
      id: 'name',
      type: 'string',
      required: true,
      minLength: 4,
      maxLength: 256,
    },{
      id: 'description',
      type: 'string',
      required: false,
      minLength: 1,
      maxLength: 2048,
    },
    {
      id: 'providerType',
      type: 'string',
      required: false,
      minLength: 1,
      maxLength: 256,
      readonly: true,
      default: 'OIDCConnector'
    },
    {
      id: 'clientID',
      readonly: true,
      type: 'string'
    },
    {
      id: 'organisationID',
      readonly: true,
      type: 'string'
    },
    {
      id: 'providerClientID',
      required: true,
      type: 'string',
      description: 'The client id created on the provider.'
    },
    {
      id: 'providerClientSecret',
      required: true,
      type: 'string',
      description: 'The client secret generated on the provider.  This is required to exchange tokens'
    },
    {
      id: 'providerRolesAttribute',
      required: false,
      type: 'string',
      description: 'If specifying roles from the SSO, this is the attribute to read roles from'
    },
    {
      id: 'providerScope',
      required: false,
      type: 'string',
      description: 'The scope to request when retrieving a token from the SSO provider'
    },
    {
      id: 'auth',
      required : true,
      type: 'uri',
      description: 'URL used to initialise the authentication flows',
      validations: [
        createURLConstraint({
          requireHTTPS: true,
        }),
      ],
    },
    {
      id: 'token',
      required : true,
      type: 'url',
      description: 'URL used to exchange an authorisation code for an access token',
      validations: [
        createURLConstraint({
          requireHTTPS: true,
        }),
      ],
    },
    {
      id: 'jwks',
      required : true,
      type: 'url',
      description: 'URL used to validate the signature of tokens',
      validations: [
        createURLConstraint({
          requireHTTPS: true,
        }),
      ],
    },
    {
      id: 'userInfo',
      required : true,
      type: 'url',
      description: 'URL used to retrieve information about the user',
      validations: [
        createURLConstraint({
          requireHTTPS: true,
        }),
      ],
    },
    {
      id: 'signOff',
      required : true,
      type: 'url',
      description: 'URL used to close a user session',
      validations: [
        createURLConstraint({
          requireHTTPS: true,
        }),
      ],
    },
    {
      id: 'oidcDiscovery',
      required : true,
      type: 'custom',
      description: 'URL used to introspect the identity provider',
      validations: [
        createURLConstraint({
          requireHTTPS: true,
        }),
      ],
      Component: OIDCDiscoveryInput
    },
    {
      id: 'introspect',
      required : true,
      type: 'url',
      description: 'URL used to get additional information about the user access token',
      validations: [
        createURLConstraint({
          requireHTTPS: true,
        }),
      ],
    },
    {
      id: 'revokeToken',
      required : true,
      type: 'url',
      description: 'URL used to revoke a user access token',
      validations: [
        createURLConstraint({
          requireHTTPS: true,
        }),
      ],
    },
    {
      id: 'issuer',
      required : true,
      type: 'url',
      description: 'URL used to validate the token was issued by the provider',
      validations: [
        createURLConstraint({
          requireHTTPS: true,
        }),
      ],
    },
    {
      id : 'getAuthProviderURL',
      label : 'Login URL',
      render(column, field, item){
        const url = `${window.location.origin}/access/${item.guid}`;
        return (
          <AuthProviderURL url={url}/>
        );
      }
    },
  ],
  layout: [
    'name',
    'description',
    'providerType',
    ()=>{
      return (
        <Typography key="description" style={{
          fontWeight: 'bold'
        }}>
          The following information should be carefully copy-pasted from your provider.
        </Typography>
      );
    },
    'providerClientID',
    'providerClientSecret',
    'providerRolesAttribute',
    'providerScope',
    ()=>{
      return (
        <Typography key="url description" style={{
          fontWeight: 'bold'
        }}>
          The following URLS should be copied from the OIDC provider
          and are used by the platform to query the provider.
        </Typography>
      );
    },
    'oidcDiscovery',
    'auth',
    'token',
    'jwks',
    'userInfo',
    'signOff',
    'introspect',
    'revokeToken',
    'issuer',
  ],

  listLayout: [
    'name',
    'description',
    'getAuthProviderURL'
  ],
  getReducerRoot: ({ icatalyst }) => {
    return icatalyst.singularity.authProviders;
  },
  transformPayload : (data)=>{
    const {provider, urls, ...rest} = data;
    return {
      ...rest,
      description: rest.description || null,
      providerClientID: provider.clientID,
      providerClientSecret: provider.clientSecret,
      providerRolesAttribute: provider.rolesAttribute,
      providerScope: provider.scope,

      auth: urls.auth,
      token: urls.token,
      jwks: urls.jwks,
      userInfo: urls.userInfo,
      signOff: urls.signOff,
      oidcDiscovery: urls.oidcDiscovery,
      introspect: urls.introspect,
      revokeToken: urls.revokeToken,
      issuer: urls.issuer
    };
  },



  getUpdateParams : (getState, masterDetailContext, entity)=>{
    entity.provider = {
      clientID: entity.providerClientID,
      clientSecret: entity.providerClientSecret,
      rolesAttribute: entity.providerRolesAttribute,
      scope: entity.providerScope
    };

    entity.urls = {
      auth: entity.auth,
      token: entity.token,
      jwks: entity.jwks,
      userInfo: entity.userInfo,
      signOff: entity.signOff,
      oidcDiscovery: entity.oidcDiscovery,
      introspect: entity.introspect,
      revokeToken: entity.revokeToken,
      issuer: entity.issuer,
    };

    // This is picked up from the token
    delete entity.clientID;
  },
  getAddParams : (getState, entity, parentDefinition, parent)=>{
    entity.provider = {
      clientID: entity.providerClientID,
      clientSecret: entity.providerClientSecret,
      rolesAttribute: entity.providerRolesAttribute,
      scope: entity.providerScope
    };

    entity.urls = {
      auth: entity.auth,
      token: entity.token,
      jwks: entity.jwks,
      userInfo: entity.userInfo,
      signOff: entity.signOff,
      oidcDiscovery: entity.oidcDiscovery,
      introspect: entity.introspect,
      revokeToken: entity.revokeToken,
      issuer: entity.issuer,
    };

    entity.organisationID = parent.guid;

    // This is picked up from the token
    delete entity.clientID;

    // We are returning no parameters here as the updates are in the entity
    return {

    };
  },
  getRetrieveAllParams : (parentDefinition, parent)=>{
    return {
      organisationID : parentDefinition.getIdentity(parent),
    };
  },
  ...Actions,
});

const reducer = generateReducer(
  definition,
  Actions /*, initialState, customActions*/
);

export { definition };
export default reducer;
