import React from 'react';
import * as Actions from '../actions/authProviders.actions';
import { createModel, generateReducer } from '../../../../utilities';
import Typography from '@material-ui/core/Typography';
import { createURLConstraint } from '../../../EntityView/validations/createURLConstraint';
import AuthProviderURL from '../../components/AuthProviderURL';
const definition = createModel({
  name: 'identityProvider',
  icon: 'lock_person',
  primaryTextField: 'name',
  onEntityClicked: ()=>{},
  addInline: true,
  auth: {
    retrieveAll: 'admin',
    create: 'admin',
    retrieve: 'admin',
    update: 'admin',
    delete: 'admin',
    route: 'admin',
  },
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
      default: 'OCIDConnector'
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
      id: 'ocidDiscovery',
      required : true,
      type: 'url',
      description: 'URL used to introspect the identity provider',
      validations: [
        createURLConstraint({
          requireHTTPS: true,
        }),
      ],
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
        const url = `https://platform.sensemaker-suite.com/p/${item.guid}`;
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
    ()=>{
      return (
        <Typography key="url description" style={{
          fontWeight: 'bold'
        }}>
          The following URLS should be copied from the OCID provider
          and are used by the platform to query the provider.
        </Typography>
      );
    },
    'auth',
    'token',
    'jwks',
    'userInfo',
    'signOff',
    'ocidDiscovery',
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
  // getUpdateParams : ()=>{
  // // probably null secret}
  getAddParams : (getState, entity, parentDefinition, parent)=>{
    entity.provider = {
      clientID: entity.providerClientID,
      clientSecret: entity.providerClientSecret
    };

    entity.urls = {
      auth: entity.auth,
      token: entity.token,
      jwks: entity.jwks,
      userInfo: entity.userInfo,
      signOff: entity.signOff,
      ocidDiscovery: entity.ocidDiscovery,
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
  // getRetrieveAllParams : (parentDefinition, parent)=>{
  //   return {
  //     licenceID : parentDefinition.getIdentity(parent),
  //   };
  // },
  // getDeleteParams : (getState, parentMasterDetailContext)=>{
  //   return {
  //     licenceID : parentMasterDetailContext.parentContext.entityID
  //   };
  // },
  ...Actions,
});

const reducer = generateReducer(
  definition,
  Actions /*, initialState, customActions*/
);

export { definition };
export default reducer;
