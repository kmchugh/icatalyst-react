import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {Button} from '@material-ui/core';
import PropTypes from 'prop-types';

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

  return (
    <Button
      color="primary"
      variant="contained"
      onClick={(e)=>{
        e.preventDefault();
        e.stopPropagation();

        history.push({
          pathname: '/admin/users/invites/create',
          state : {
            title : `Invitation for ${definition.label} ${definition.getPrimaryText(entity)}`,
            emails : [],
            starts,
            expires,
            owner,
            member,
            definitionType : definition.name,
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
