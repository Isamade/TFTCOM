import React, {useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createProfile } from '../../actions/profile';

const Landing = ({ createProfile, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        profileName: '',
        boardName: '',
        email: '',
        phone: '',
        invitedBy: ''
    });
    
    const { profileName, boardName, email, phone, invitedBy } = formData;
    
    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    
    const onSubmit = async (e) => {
        e.preventDefault();
        createProfile(profileName, boardName, email, phone, invitedBy);
        setFormData({ ...formData, profileName: '', phone: '', boardName: '', email: '', invitedBy: ''})
    };

  if (isAuthenticated) {
    return <Redirect to='/profiles' />;
  }

  return (
      <main className='landing'>
        <div className='container'>
        <section className="services">
          <article className="service">
            <span className="icon">
              <i className="fas fa-check"></i>
            </span>
            <h4>Quick and easy</h4>
            <p>Enter your email address to register.</p>
          </article>
          <article className="service">
            <span className="icon">
              <i className="fas fa-check"></i>
            </span>
            <h4>Open and accessible</h4>
            <p>
              Anyone can become a member
            </p>
          </article>
          <article className="service">
            <span className="icon">
              <i className="fas fa-check"></i>
            </span>
            <h4>Dedication</h4>
            <p>We are dedicated to helping people achieve their dreams.</p>
          </article>
        </section>
          <form className="form" onSubmit={onSubmit}>
          <h2>Registration Form</h2> 
              <div className="form-control">
                  <label htmlFor="profileName">Name</label>
                  <input
                      type="text"
                      placeholder="Enter Your Full Name"
                      id="profileName"
                      name="profileName"
                      value={profileName}
                      onChange={onChange}
                      className="form-input"
                      required
                  />
              </div>
              <div className="form-control">
                  <label htmlFor="boardName">Board Name</label>
                  <input
                      type="text"
                      placeholder="Enter Preferred Board Name"
                      id="boardName"
                      name="boardName"
                      value={boardName}
                      onChange={onChange}
                      className="form-input"
                      required
                  />
              </div>
              <div className="form-control">
                  <label htmlFor="email">Email</label>
                  <input
                      type="email"
                      placeholder="Enter Email Address"
                      id="email"
                      name="email"
                      value={email}
                      onChange={onChange}
                      className="form-input"
                      required
                  />
              </div>
              <div className="form-control">
                  <label htmlFor="phone">Telephone Number</label>
                  <input
                      type="text"
                      placeholder="Enter Your Phone Number"
                      id="phone"
                      name="phone"
                      value={phone}
                      onChange={onChange}
                      minLength="6"
                      className="form-input"
                      required
                  />
              </div>
              <div className="form-control">
                  <label htmlFor="invitedBy">Invited By</label>
                  <input
                      type="text"
                      placeholder="Invited By"
                      id="invitedBy"
                      name="invitedBy"
                      value={invitedBy}
                      onChange={onChange}
                      className="form-input"
                      required
                  />
              </div>
              <input type="submit" className="btn btn-primary" value="Submit" />
          </form>
          <p className="my-1 floatright">
                Admin Use Only  <Link to="/login">Sign In</Link>
          </p>
        </div>
      </main>
  );
};

Landing.propTypes = {
  createProfile: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {createProfile})(Landing);