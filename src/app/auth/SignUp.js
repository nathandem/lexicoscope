import React from 'react';
import { Button, Checkbox, H1, FormGroup, InputGroup, Toaster } from '@blueprintjs/core';

import EnhancedSingleSelect from '../common/EnhancedSingleSelect';
import '../../style/CommonAuth.css';


const statusOptions = ['chercheur', 'Enseignant-chercheur', 'Enseignant FLE', 'Doctorant ou post-doctorant', 'Etudiant', 'Autre'];
export default class SignUp extends React.PureComponent {

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
      message: "Please fill the missing fields and submit again.",
      intent: 'warning',
      icon: 'hand',
    });
  }

  addLoginTakenToast = () => {
    this.toaster.show({
      message: "This login is already taken, please take another one and submit again.",
      intent: 'warning',
      icon: 'warning-sign',
    });
  }

  addErrorToast = () => {
    this.toaster.show({
      message: "An error occured, please try again later.",
      intent: 'danger',
      icon: 'warning-sign',
    });
  }

  addEmailSentToast = () => {
    this.toaster.show({
      message: "Success! Please check your email to validate your account.",
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
      process.env.REACT_APP_API_HOSTNAME + endpoint, {
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

    return (
      <div className="CommonAuth__wrapper">
        <H1>Sign up</H1>

        <form onSubmit={this.signUp} className="margin-top-2-rem">
          <FormGroup label="Name" labelFor="name">
            <InputGroup id="name" type="text" value={name} onChange={this.onTextUpdate} />
          </FormGroup>

          <FormGroup label="First name" labelFor="firstname">
            <InputGroup id="firstname" type="text" value={firstname} onChange={this.onTextUpdate} />
          </FormGroup>

          <FormGroup label="Affiliation" labelFor="affiliation">
            <InputGroup id="affiliation" type="text" value={affiliation} onChange={this.onTextUpdate} />
          </FormGroup>

          <FormGroup label="Country" labelFor="country">
            <InputGroup id="country" type="text" value={country} onChange={this.onTextUpdate} />
          </FormGroup>

          <EnhancedSingleSelect
            label="Status"
            name='status'  // name is also used to make the input's `id`
            hasDefault={true}
            hasSelectableDefault={false}
            options={statusOptions}
            value={status}
            onChange={this.onTextUpdate}
          />

          <FormGroup label="Email" labelFor="email">
            <InputGroup id="email" type="email" value={email} onChange={this.onTextUpdate} />
          </FormGroup>

          <FormGroup label="login" labelFor="login">
            <InputGroup id="login" type="text" value={login} onChange={this.onTextUpdate} />
          </FormGroup>

          <FormGroup label="Password" labelFor="password" >
            <InputGroup id="password" type="password" value={password} onChange={this.onTextUpdate} />
          </FormGroup>

          <FormGroup label="Password confirmation" labelFor="password2" >
            <InputGroup id="password2" type="password" value={password2} onChange={this.onTextUpdate} />
          </FormGroup>

          <FormGroup label="Terms of use" labelFor="terms" >
            <embed
              id="terms"
              type="application/pdf"
              src="http://phraseotext.univ-grenoble-alpes.fr/lexicoscope/doc/charte-emobase.pdf"
              title="Terms of use"
              width="500" height="375"
            />
            <Checkbox
              checked={agreedToTerms}
              label="Je certifie avoir pris connaissance des modalités d'accès à l'application EmoBase. Je m'engage à les respecter strictement et certifie l'exactitude des renseignements portés dans le présent formulaire."
              onChange={this.onTermsUpdate}
            />
          </FormGroup>

          <Button type="submit" intent='primary'>Ok</Button>
        </form>

        <p className="margin-top-2-rem">Les informations recueillies font l’objet d’un traitement informatique destiné à l'équipe de chercheurs du Projet Emolex. Ces informations n'ont pas d'autres objet que de mieux connaître les utilisateurs d'EmoBase. Les destinataires des données sont des membres du Laboratoire Lidilem, Université Stendhal Grenoble 3. Conformément à la loi « informatique et libertés » du 6 janvier 1978 modifiée en 2004, vous bénéficiez d’un droit d’accès et de rectification aux informations qui vous concernent, que vous pouvez exercer en vous adressant à olivier.kraif@u-grenoble3.fr, Lidilem (ou en modifiant ces informations directement via l'interface du site). Vous pouvez également, pour des motifs légitimes, vous opposer au traitement des données vous concernant.</p>

        {/* Special component, out of the normal flow */}
        <Toaster ref={this.refHandlers.toaster} />
      </div>
    );
  }
}
