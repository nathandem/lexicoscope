import React from 'react';
import { withTranslation } from 'react-i18next';
import { Button, Checkbox, H1, FormGroup, InputGroup, Toaster } from '@blueprintjs/core';

import EnhancedSingleSelect from '../common/EnhancedSingleSelect';
import '../../style/CommonAuth.css';


class SignUp extends React.PureComponent {

  refHandlers = {
    toaster: (ref) => this.toaster = ref,
  };

  state = {
    login: '',
    password: '',
    password2: '',
    firstname: '',
    name: '',
    email: '',
    status: '',
    affiliation: '',
    country: '',
    agreedToTerms: false,
  };

  addMissingFieldsToast = () => {
    this.toaster.show({
      message: this.props.t('addMissingFieldsMsg'),
      intent: 'warning',
      icon: 'hand',
    });
  }

  addLoginTakenToast = () => {
    this.toaster.show({
      message: this.props.t('addLoginTakenMsg'),
      intent: 'warning',
      icon: 'warning-sign',
    });
  }

  addErrorToast = () => {
    this.toaster.show({
      message: this.props.t('addErrorMsg'),
      intent: 'danger',
      icon: 'warning-sign',
    });
  }

  addEmailSentToast = () => {
    this.toaster.show({
      message: this.props.t('addEmailSentMsg'),
      intent: 'success',
      icon: 'tick',
    });
  }

  signUp = (e) => {
    e.preventDefault();

    // make sure no empty fields
    const userValues = Object.values(this.state);
    if (userValues.includes('') || this.state.agreedToTerms === false) {
      this.addMissingFieldsToast();
      return;
    }

    const bodyData = { ...this.state };
    delete bodyData.agreedToTerms;

    const endpoint = '/signUp.ajax.php';
    fetch(
      process.env.REACT_APP_API_BASE + endpoint, {
        credentials: 'include',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData)
    })
    .then((res) => {
      if (res.status === 409) {  // if login already taken
        this.addLoginTakenToast();
      } else if (res.status === 400) {  // if unidentified issue
        this.addErrorToast();
      } else {  // if it worked
        this.addEmailSentToast();
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

  onTermsUpdate = () => {
    this.setState(prevState => ({ agreedToTerms: !prevState.agreedToTerms }));
  }

  render() {
    const { affiliation, agreedToTerms, country, email, firstname, login, name, password, password2, status  } = this.state;
    const { t } = this.props;

    const statusOptions = [
      t('scholar'),
      t('teachingScholar'),
      t('FFLTeacher'),
      t('phdStudent'),
      t('student'),
      t('other'),
    ];

    return (
      <div className="CommonAuth__wrapper">
        <H1>{t('signUp')}</H1>

        <form onSubmit={this.signUp} className="margin-top-2-rem">
          <FormGroup label={t('name')} labelFor="name">
            <InputGroup id="name" type="text" value={name} onChange={this.onTextUpdate} />
          </FormGroup>

          <FormGroup label={t('firstName')} labelFor="firstname">
            <InputGroup id="firstname" type="text" value={firstname} onChange={this.onTextUpdate} />
          </FormGroup>

          <FormGroup label={t('affiliation')} labelFor="affiliation">
            <InputGroup id="affiliation" type="text" value={affiliation} onChange={this.onTextUpdate} />
          </FormGroup>

          <FormGroup label={t('country')} labelFor="country">
            <InputGroup id="country" type="text" value={country} onChange={this.onTextUpdate} />
          </FormGroup>

          <EnhancedSingleSelect
            label={t('status')}
            name='status'  // name is also used to make the input's `id`
            hasDefault={true}
            hasSelectableDefault={false}
            options={statusOptions}
            value={status}
            onChange={this.onTextUpdate}
          />

          <FormGroup label={t('email')} labelFor="email">
            <InputGroup id="email" type="email" value={email} onChange={this.onTextUpdate} />
          </FormGroup>

          <FormGroup label={t('logIn')} labelFor="login">
            <InputGroup id="login" type="text" value={login} onChange={this.onTextUpdate} />
          </FormGroup>

          <FormGroup label={t('password')} labelFor="password" >
            <InputGroup id="password" type="password" value={password} onChange={this.onTextUpdate} />
          </FormGroup>

          <FormGroup label={t('passwordConfirmation')} labelFor="password2" >
            <InputGroup id="password2" type="password" value={password2} onChange={this.onTextUpdate} />
          </FormGroup>

          <FormGroup label={t('terms')} labelFor="terms" >
            <embed
              id="terms"
              type="application/pdf"
              src="http://phraseotext.univ-grenoble-alpes.fr/lexicoscope/doc/charte-emobase.pdf"
              title={t('terms')}
              width="500" height="375"
            />
            <Checkbox
              checked={agreedToTerms}
              label={t('IAgreeToTerms')}
              onChange={this.onTermsUpdate}
            />
          </FormGroup>

          <Button type="submit" intent='primary'>Ok</Button>
        </form>

        <p className="margin-top-2-rem">{t('detailedDataPolicy')}</p>

        {/* Special component, out of the normal flow */}
        <Toaster ref={this.refHandlers.toaster} />
      </div>
    );
  }
}

export default withTranslation()(SignUp);
