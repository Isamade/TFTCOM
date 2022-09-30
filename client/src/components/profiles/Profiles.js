import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profile';
import { logout } from '../../actions/auth';

const Profiles = ({ getProfiles, logout, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  const [data, setData] = useState({ search: "" });

  const { search } = data;

  const onChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const onSubmit = e => {
    e.preventDefault();
    getProfiles(search);
  }

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div>
          <button className="sbtn" type="submit" onClick={logout}>LOG OUT</button>
          <form className="floatright" onSubmit={onSubmit}>
            <input 
              type="text" 
              placeholder="Search..." 
              name="search"
              value={search}
              onChange={onChange}
              className="sinput"
            />
            <button className="sbtn-primary" type="submit">
              <i className="fa fa-search"></i>
            </button>
          </form>
          <h1 className='large text-primary clear my-bot'>Profiles</h1> 
            {profiles.length > 0 ? (
              profiles.map(profile => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles, logout }
)(Profiles);