'use strict';

const React = require('react');
const axios = require('axios');
const { Link } = require('react-router');
const BaseForm = require('./baseform');
const Address = require('../components/address.component');
const Autosuggest = require('../components/autosuggest.component');
const Radio = require('../components/radio.component');
const InputText = require('../components/inputtext.component');
const ErrorList = require('../components/errorlist.component');

const LABELS = {
  'company': 'Company',
  'title': 'Title',
  'first_name': 'First name',
  'last_name': 'Last name',
  'role': 'Role',
  'telephone_number': 'Phone',
  'email': 'Email address',
  'address': 'Address',
  'telephone_alternative': 'Alternative phone (optional)',
  'email_alternative': 'Alternative email (optional)',
  'notes': 'Notes (optional)',
  'primary': 'Is this person a primary contact?',
  'teams': 'Which team is this person the primary contact for?'
};

const defaultContact = {
  company: {
    id: '',
    name: ''
  },
  address_same_as_company: true,
  title: {
    id: '',
    name: ''
  },
  first_name: '',
  last_name: '',
  role: {
    id: '',
    name: ''
  },
  telephone_number: '',
  email: '',
  primary: false,
  address_1: '',
  address_2: '',
  address_town: '',
  address_county: '',
  address_postcode: '',
  address_country: {
    id: null,
    name: ''
  },
  telephone_alternative: '',
  email_alternative: '',
  notes: '',
  teams: [{
    id: '',
    name: ''
  }]
};

class ContactForm extends BaseForm {

  constructor(props) {
    super(props);

    let state = {
      saving: false,
      showCompanyField: true
    };

    if (props.company) {
      state.formData = Object.assign({}, props.contact);
      state.showCompanyField = false;
    } else {
      state.formData = {};
    }

    if (props.contact) {
      state.edit = true;
      state.showCompanyField = false;
      state.formData.contact = props.contact;
    } else {
      state.edit = false;
    }

    this.setDefaults(state.formData, defaultContact);

    if (state.formData.primary === true && state.formData.teams.length === 0) {
      state.formData.teams = defaultContact.teams;
    }

    this.state = state;
  }

  save = () => {
    if (this.state.primary === false) {
      this.state.formData.teams = [];
    }

    this.setState({saving: true});

    axios.post('/contact/',
      { contact: this.state.formData },
      { headers: {'x-csrf-token': window.csrfToken }}
      )
      .then((response) => {
        window.location.href = `/contact/${response.data.id}`;
      })
      .catch((error) => {
        window.csrfToken = error.response.headers['x-csrf-token'];
        this.setState({
          errors: error.response.data.errors,
          saving: false
        });
    });
  };

  getBackUrl() {

    // if called with a company id, go back to company
    if (this.props.company) {
      return `/company/company_company/${this.props.company.id}/contacts`;
    } else if (this.props.contact) {
      return `/contact/${this.props.contact.id}`;
    }

    return '/';
  }

  addPrimaryTeam = (event) => {
    event.preventDefault();
    let teams = this.state.formData.teams;
    teams.push({id: null, name: ''});
    this.changeFormData('teams', teams);
  };

  clearPrimaryTeam = () => {
    this.changeFormData('teams', defaultContact.teams);
  };

  clearAddress = () => {
    this.changeFormData('address', defaultContact.address);
  };

  updatePrimaryTeam = (newValue, index) => {
    let teams = this.state.formData.teams;
    teams[index] = newValue.value;
    this.changeFormData('teams', teams);
  };

  getTeams() {

    const teamList = this.state.formData.teams.map((team, index) => {
      const label = index === 0 ? LABELS.teams : null;
      const error = index === 0 ? this.getErrors('teams') : null;

      return (<Autosuggest
        name="teams"
        label={label}
        value={team}
        lookupUrl='/api/teamlookup'
        onChange={(update) => {
          this.updatePrimaryTeam(update, index);
        }}
        errors={error}
      />);
    });

    return (
      <div className={this.getErrors('teams') === null ? 'indented-info' : 'indented-info error'}>
        { teamList }
        <a className="add-another-button" onClick={this.addPrimaryTeam}>
          Add another team
        </a>
      </div>
    );

  }

  render() {
    if (this.state.saving) {
      return this.getSaving();
    }

    const formData = this.state.formData;
    const backUrl = this.getBackUrl();

    return (
      <div>
        { this.state.errors &&
        <ErrorList labels={LABELS} errors={this.state.errors}/>
        }

        { this.state.showCompanyField ?
          <Autosuggest
            name="company"
            label={LABELS.company}
            value={formData.company}
            lookupUrl='/api/suggest'
            onChange={this.updateField}
            errors={this.getErrors('title')}
          />
          :
          <div className="form-group">
            <div className="form-label">Company</div>
            <strong>{ formData.company.name }</strong>
          </div>
        }
        <Autosuggest
          name="title"
          label={LABELS.title}
          value={formData.title}
          optionsUrl='/api/meta/title'
          onChange={this.updateField}
          errors={this.getErrors('title')}
        />
        <InputText
          label={LABELS.first_name}
          name="first_name"
          value={formData.first_name}
          onChange={this.updateField}
          errors={this.getErrors('firstName')}
        />
        <InputText
          label={LABELS.last_name}
          name="last_name"
          value={formData.last_name}
          onChange={this.updateField}
          errors={this.getErrors('last_name')}
        />
        <Autosuggest
          name="role"
          label={LABELS.role}
          value={formData.role}
          optionsUrl='/api/meta/role'
          onChange={this.updateField}
          errors={this.getErrors('role')}
        />
        <fieldset className="inline form-group form-group__checkbox-group form-group__radiohide">
          <legend className="form-label">{LABELS.primary}</legend>
          <Radio
            name="primary"
            label="Yes"
            value="Yes"
            checked={formData.primary}
            onChange={this.updateField}
          />
          <Radio
            name="primary"
            label="No"
            value="No"
            checked={!formData.primary}
            onChange={this.updateField}
          />
        </fieldset>
        { formData.primary && this.getTeams() }
        <InputText
          label={LABELS.telephone_number}
          name="telephone_number"
          value={formData.telephone_number}
          onChange={this.updateField}
          errors={this.getErrors('telephone_number')}
        />
        <InputText
          label={LABELS.email}
          name="email"
          value={formData.email}
          onChange={this.updateField}
          errors={this.getErrors('email')}
        />
        <fieldset className="inline form-group form-group__checkbox-group form-group__radiohide">
          <legend className="form-label">Is the contact's address the same as the company address?</legend>
          <Radio
            name="address_same_as_company"
            label="Yes"
            value="Yes"
            checked={formData.address_same_as_company}
            onChange={(update) => {
              this.updateField(update);
              this.clearAddress();
            }}
          />
          <Radio
            name="address_same_as_company"
            label="No"
            value="No"
            checked={!formData.address_same_as_company}
            onChange={this.updateField}
          />
        </fieldset>
        { !this.state.formData.address_same_as_company &&
          <div className="indented-info">
            <Address
              name='address'
              label={LABELS.address}
              onChange={this.updateField}
              errors={this.getErrors('address')}
              value={formData}
            />
          </div>
        }
        <InputText
          label={LABELS.telephone_alternative}
          name="telephone_alternative"
          value={formData.telephone_alternative}
          onChange={this.updateField}
          errors={this.getErrors('telephone_alternative')}
        />
        <InputText
          label={LABELS.email_alternative}
          name="email_alternative"
          value={formData.email_alternative}
          onChange={this.updateField}
          errors={this.getErrors('email_alternative')}
        />
        <div className="form-group ">
          <label className="form-label" htmlFor="description">Notes (optional)</label>
          <textarea
            id="notes"
            className="form-control"
            name="notes"
            rows="5"
            onChange={this.updateField}
            value={formData.notes}/>
        </div>
        <div className="button-bar">
          <button className="button button--save" type="button" onClick={this.save}>Save</button>
          { this.state.edit ?
            <Link to={`/contact/${this.props.contactId}`} className="button-link button--cancel js-button-cancel" >Cancel</Link>
            :
            <a className="button-link button--cancel js-button-cancel" href="/">Cancel</a>
          }
        </div>
      </div>

    );
  }

}

module.exports = ContactForm;
