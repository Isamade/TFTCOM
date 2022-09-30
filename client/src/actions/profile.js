import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  SET_ALERT
} from './types';

// Get current users profile
export const getProfile = (id) => async dispatch => {
  try {
    const res = await axios.get(`/api/user/${id}/profile`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get all profiles
export const getProfiles = (searchString) => async dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    console.log('mictest');
    let res;
    if(searchString){
      res = await axios.get(`/api/user/profiles?search=${searchString}`);
    } else {
      res = await axios.get('/api/user/profiles');
    }

    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Create or update profile
export const createProfile = (
  name, boardName, email, phone, invitedBy
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    //const formData = new FormData();
    console.log('mictest2');
    const body = JSON.stringify({ name, boardName, email, phone, invitedBy });
    //formData.append('body', body);

    const res = await axios.post('/api/user/createProfile', body, config);

    /*dispatch({
      type: SET_ALERT,
      payload: res.data
    });*/

    dispatch(setAlert(res.data.msg, 'success', 10000));

  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};