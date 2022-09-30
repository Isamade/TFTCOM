import React from 'react';
import PropTypes from 'prop-types';

const ProfileItem = ({
  profile: {
    name,
    boardName,
    phone,
    email,
    invitedBy
  }
}) => {

  return (
    <div className='profile bg-light my-bot'>
      <div>
        <h3>Name: {name} </h3>
        <p className='my-1'><b>Board Name:</b> {boardName && <span> {boardName} </span>} </p>
        <p className='my-1'><b>Email:</b> {email && <span>{email}</span>} </p>
        <p className='my-1'><b>Phone:</b> {phone && <span>{phone}</span>} </p>
        <p className='my-1'><b>Invited By:</b> {invitedBy && <span> {invitedBy} </span>} </p>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
