import React, { useState } from 'react';
import {Button} from 'reactstrap'
import { Field, reduxForm } from 'redux-form';
import EyeIcon from 'mdi-react/EyeIcon';
import KeyVariantIcon from 'mdi-react/KeyVariantIcon';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import renderCheckBoxField from '../../../../shared/components/form/CheckBox';

import axios from 'axios'

const LogInForm = () =>{
  const [form, setForm] = useState({
    username : "temp",
    password : "pass"
  })
  const [show, setShow] = useState(false)

  const submitForm = () => {
    axios.post('http://127.0.0.1:5000/login', {
      username: form.username,
      password: form.password
    })
    .then(function (response) {
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const showPassword = (e) => {
    e.preventDefault();
    setShow(!show);
  }


  return (
    <form className="form" >
      <div className="form__form-group">
        <span className="form__form-group-label">Username</span>
        <div className="form__form-group-field">
          <div className="form__form-group-icon">
            <AccountOutlineIcon />
          </div>
          <Field
            name="username"
            component="input"
            type="text"
            placeholder="Name"
          />
        </div>
      </div>
      <div className="form__form-group">
        <span className="form__form-group-label">Password</span>
        <div className="form__form-group-field">
          <div className="form__form-group-icon">
            <KeyVariantIcon />
          </div>
          <Field
            name="password"
            component="input"
            type={show ? 'text' : 'password'}
            placeholder="Password"
          />
          <button
            type="button"
            className={`form__form-group-button${show ? ' active' : ''}`}
            onClick={e => showPassword(e)}
          ><EyeIcon />
          </button>
        </div>
        <div className="account__forgot-password">
          <a href="/">Forgot a password?</a>
        </div>
      </div>
      <div className="form__form-group">
        <div className="form__form-group-field">
          <Field
            name="remember_me"
            component={renderCheckBoxField}
            label="Remember me"
          />
        </div>
      </div>
      <div className="account__btns">
        <Button className="btn btn-primary account__btn" onClick={submitForm()}>Sign In</Button>
      </div>
    </form>
  );
}


export default reduxForm({
  form: 'log_in_photo_form', // a unique identifier for this form
})(LogInForm);
