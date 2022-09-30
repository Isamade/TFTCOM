import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/profiles" />;
  }

  return (
<Fragment>
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
      <h2>Sign In</h2>
        <div className="form-control">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-control">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
            className="form-input"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1 floatright">
          <Link to="/">Registration Form</Link>
      </p>
      </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
