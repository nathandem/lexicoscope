import Cookies from 'js-cookie';
import React from 'react';
import { Button, H1, FormGroup, InputGroup, Toaster } from '@blueprintjs/core';

import { FRONT_USER_FRONT_LOGGED_IN_COOKIE_NAME } from './constants';
import '../../style/CommonAuth.css';


export default class SignIn extends React.PureComponent {

  refHandlers = {
    toaster: (ref) => this.toaster = ref,
  };

  state = {
    login: '',
    password: '',
  };

  componentDidMount() {
    // check if the user reaches this page from the signup email,
    // if yes show a message
    const urlParams = new URLSearchParams(window.location.search);
    const signUpSuccess = urlParams.get('success');
    if (signUpSuccess) {
      this.addSignUpSuccessToast();
    }
  }

  addCredentialsErrorToast = () => {
    this.toaster.show({
      message: "Credentials error. Please retry or create an account if you don't have one already.",
      intent: 'danger',
      icon: 'warning-sign',
    });
  }

  addSignUpSuccessToast = () => {
    this.toaster.show({
      message: 'You account was successfully created! Please now log-in.',
      intent: 'success',
      icon: 'tick',
    });
  }

  signIn = (e) => {
    e.preventDefault();
    const { login, password } = this.state;

    if (login === '' || password === '') {
      return;
    }

    const endpoint = '/signIn.ajax.php';
    fetch(
      process.env.REACT_APP_API_HOSTNAME + endpoint, {
        credentials: 'include',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password })
    })
    .then((res) => {
      if (res.status === 401) {
        this.addCredentialsErrorToast();
      } else if (res.status !== 200) {
        console.log(`Error when trying to connect with ${endpoint}`);
      } else {
        res.json().then(() => {
          // set front-end specific cookie, expire at the end of session (like the backend session cookie)
          Cookies.set(FRONT_USER_FRONT_LOGGED_IN_COOKIE_NAME, 'true');
          // redirect to corpus type choice when succeed
          this.props.history.push('/analytics');
          // without a proper global state, that's the best way to
          // let the entire app knows the auth state has changed
          window.location.reload();
        })
      }
    })
    .catch(() => {
      console.log(`Network error when trying to fetch ${endpoint}`);
    })
  }

  onTextUpdate = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    this.setState({ [id]: value });
  }

  render() {
    const { login, password } = this.state;

    return (
      <div className="CommonAuth__wrapper SignIn__form">
        <H1>Sign in</H1>

        <form onSubmit={this.signIn}>
          <FormGroup label="Login" labelFor="login">
            <InputGroup id="login" type="text" value={login} onChange={this.onTextUpdate} />
          </FormGroup>

          <FormGroup label="Password" labelFor="password" >
            <InputGroup id="password" type="password" value={password} onChange={this.onTextUpdate} />
          </FormGroup>

          <Button type="submit" intent='primary'>Ok</Button>
        </form>

        {/* Special component, out of the normal flow */}
        <Toaster ref={this.refHandlers.toaster} />
      </div>
    );
  }
}
