import React, {useContext} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {Button} from '@material-ui/core';
import PropTypes from 'prop-types';
import { AppContext } from '../../../contexts';

const InviteButton = ({
  entity,
  definition,
  starts,
  expires,
  owner,
  member
})=>{
  const history = useHistory();
  const location = useLocation();

  // TODO: This should be using a reverse lookup rather than this way.
  const {routes} = useContext(AppContext);
  const inviteRoute = routes.find((r)=>r.path.endsWith('/invites/create'));

  return (
    <Button
      color="primary"
      variant="contained"
      onClick={(e)=>{
        e.preventDefault();
        e.stopPropagation();

        history.push({
          pathname: inviteRoute.path,
          state : {
            title : `Invitation for ${definition.label} - ${definition.getPrimaryText(entity)}`,
            emails : [],
            starts,
            expires,
            owner,
            member,
            resourceType : definition.resourceName || definition.name,
            entityID: definition.getIdentity(entity),
            entityName: definition.getPrimaryText(entity),
            entityDescription: definition.getSecondaryText(entity),
            entity : entity,
            backUrl : location.pathname
          }
        });
      }}
    >
      Invite
    </Button>
  );
};

InviteButton.propTypes = {
  definition : PropTypes.object.isRequired,
  entity : PropTypes.object.isRequired,
  starts : PropTypes.number,
  expires : PropTypes.number,
  owner : PropTypes.bool,
  member : PropTypes.bool
};

export default InviteButton;
