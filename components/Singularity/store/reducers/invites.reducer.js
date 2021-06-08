import React from 'react';
import * as Actions from '../actions/invites.actions';
import { createModel } from '../../../../utilities/createModel';
import { generateReducer } from '../../../../utilities/generateReducer';

import {Chip, Typography} from '@material-ui/core';
import {Icon} from '@icatalyst/components';


const definition = createModel({
  name: 'invite',
  icon: 'contact_mail',
  canAdd : false,
  auth: {
    retrieveAll : 'admin',
    // create : 'admin',
    retrieve : 'admin',
    // update : 'admin',
    // delete : 'admin',
    route : 'admin'
  },
  fields : [
    {
      id: 'name',
      required: true,
      minLength: 4,
      maxLength: 256
    },
    {
      id: 'description',
      maxLength: 2048
    },
    {
      id: 'message',
      maxLength: 65535
    },
    {
      id: 'email',
      minLength: 4,
      maxLength: 256,
    },
    {
      id: 'start',
      type : 'date',
    },
    {
      id: 'expiry',
      type : 'date',
    },
    {
      id: 'sent',
      type : 'date',
    },
    {
      id: 'opened',
      type : 'date',
    },
    {
      id: 'accepted',
      type : 'date',
    },
    {
      id: 'declined',
      type : 'date',
    },
  ],
  layout : [
    'name',
    'description'
  ], listLayout : [
    'name',
    'email',
    {
      id : 'status',
      label : 'Status',
      className: 'hidden sm:table-cell',
      render(column, field, item){
        const time = new Date().getTime();
        const status = time < item.start ? {
          label: 'Inactive',
          color: 'secondary'
        } : (
          time > item.expiry ? {
            label: 'Expired',
            color: 'default'
          } : {
            label: 'Active',
            color: 'primary'
          }
        );

        return (
          <Chip className="min-w-64" color={status.color} label={status.label} size="small"/>
        );
      }
    },{
      id : 'response',
      label : 'Actions',
      className: 'hidden sm:table-cell',
      render(column, field, item){
        const {
          declined,
          opened,
          accepted
        } = item;

        let status = {
          icon : 'email',
          label : 'Sent',
        };
        if (declined) {
          status = {
            icon : 'close',
            label : 'Declined',
          };
        } else if (accepted) {
          status = {
            icon : 'check',
            label : 'Accepted',
          };
        } else if (opened) {
          status = {
            icon : 'drafts',
            label : 'Opened',
          };
        }

        return (
          <div className="flex">
            <Icon
              className="min-w-64 ml-16"
              label={status.label}>
              {status.icon}
            </Icon>
            <Typography>{status.label}</Typography>
          </div>
        );
      }
    },
  ],
  getReducerRoot: ({icatalyst})=>{
    return icatalyst.singularity.invites;
  },
  ...Actions
});

const reducer = generateReducer(definition, Actions/*, initialState, customActions*/);

export {definition};
export default reducer;
