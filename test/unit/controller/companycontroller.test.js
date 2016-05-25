'use strict';

let formData = {
  sectors: [ 'Financial Services', 'Food and Drink', 'Oil and Gas' ],
  website: 'website',
  businessDescription: 'description',
  region: 'region',
  hasOperatingAddress: 'Yes',
  operatingAddress_address1: 'addr1',
  operatingAddress_aaddress2: 'addr2',
  operatingAddress_city: 'city',
  operatingAddress_postcode: 'postcode',
  hasAccountManager: 'Yes',
  accountManager: 'Fred Smith',
  currentlyExporting: 'Yes',
  countryOfInterest: [ 'Argentina', 'Greece', 'France' ],
  connections: 'connection'
};

let existingCompany = {
  company_number: 'FC014916',
  id: 'FC014916',
  accounts: {
    last_accounts: { made_up_to: '2011-12-31', type: 'group' },
    accounting_reference_date: { month: '12', day: '31' }
  },
  date_of_creation: '1980-02-18',
  type: 'oversea-company',
  undeliverable_registered_office_address: false,
  has_been_liquidated: false,
  jurisdiction: 'united-kingdom',
  company_name: 'SAMSUNG HEAVY INDUSTRIES CO., LTD.',
  registered_office_address: {
    country: 'Korea',
    locality: 'Seoul',
    address_line_1: 'Samsung Life Insurance Seocho Tower 1321-15 Seocho-Dong',
    address_line_2: 'Seocho-Gu',
    region: '137-955' },
  etag: '686478c632aebc8ed84339873b0c52cbfdcd8175',
  has_insolvency_history: false,
  company_status: 'active',
  has_charges: true,
  previous_company_names: [
    { name: 'SAMSUNG HEAVY INDUSTRIES CO.,LTD.',
    effective_from: '1993-02-10',
    ceased_on: '2012-06-14' },
    { name: 'SAMSUNG SHIPBUILDING & HEAVY INDUSTRIES CO.,LTD',
      effective_from: '1980-02-18',
      ceased_on: '1993-02-10' }
  ],
  can_file: false,
  containsExpandedData: true,
  contacts: [
      { id: '303',
      title: 'Ms.',
      givenname: 'Mollie',
      surname: 'Stevenson',
      streetaddress: '5 Great Western Road',
      city: 'LONGDON',
      zipcode: 'GL20 5PW',
      emailaddress: 'MollieStevenson@armyspy.com',
      telephonenumber: '079 5654 9346',
      birthday: '4/15/1946',
      age: 70,
      occupation: 'Remote sensing specialist' },
      { id: '331',
        title: 'Mrs.',
        givenname: 'Melissa',
        surname: 'Bradley',
        streetaddress: '57 Old Chapel Road',
        city: 'GASTARD',
        zipcode: 'SN13 8UN',
        emailaddress: 'MelissaBradley@cuvox.de',
        telephonenumber: '078 2074 7869',
        birthday: '5/19/1935',
        age: 80,
        occupation: 'Log marker' },
      { id: '805',
        title: 'Mrs.',
        givenname: 'Lilly',
        surname: 'Nash',
        streetaddress: '86 Preston Rd',
        city: 'MORTIMER WEST END',
        zipcode: 'RG7 6BH',
        emailaddress: 'LillyNash@cuvox.de',
        telephonenumber: '079 1041 9020',
        birthday: '9/14/1972',
        age: 43,
        occupation: 'Train dispatcher' },
      { id: '198',
        title: 'Mr.',
        givenname: 'Billy',
        surname: 'Flynn',
        streetaddress: '94 Jesmond Rd',
        city: 'KILMESTON',
        zipcode: 'SO24 4FW',
        emailaddress: 'BillyFlynn@teleworm.us',
        telephonenumber: '079 0466 9161',
        birthday: '1/26/1943',
        age: 73,
        occupation: 'Vending machine repairer' },
      { id: '984',
        title: 'Mr.',
        givenname: 'Peter',
        surname: 'James',
        streetaddress: '75 Thompsons Lane',
        city: 'MELSETTER',
        zipcode: 'KW16 1JH',
        emailaddress: 'PeterJames@teleworm.us',
        telephonenumber: '070 0344 0164',
        birthday: '6/13/1973',
        age: 42,
        occupation: 'Textile cutting machine operator' }
  ],
  sectors: [ 'Prof. Business Services', 'Automotive' ],
  uktiStatus: 'UKTI Customer',
  website: '',
  businessDescription: '',
  countryOfInterest: [ 'Argentina', 'Greece' ],
  interactions: [
    { type: 'Face to face',
    date: '6 February 2016',
    subject: 'Planning session for company\'s new export goals',
    advisor: 'Peck Copeland',
    contact: 'Medina Colon',
    _id: '573069c830424863b9abddad' },
    { type: 'Email',
      date: '19 September 2015',
      subject: 'Details about UKTI services for new exports',
      advisor: 'Rios Olson',
      contact: 'Aguirre Bryant',
      _id: '573069c8f650e8367a0644f8' },
    { type: 'Email',
      date: '4 October 2014',
      subject: 'Introduction to UKTI and our team',
      advisor: 'Booker Villarreal',
      contact: 'Campbell Myers',
      _id: '573069c8d8641b0e47fdd1b3' },
    { type: 'Face to face',
      date: '30 August 2014',
      subject: 'Introduction to UKTI and our team',
      advisor: 'Larson Bright',
      contact: 'Snyder Cabrera',
      _id: '573069c8643194ef9223c88d' },
    { type: 'Email',
      date: '2 March 2014',
      subject: 'Advise on company stand at Paris Technology Show 2016',
      advisor: 'Lindsay Avery',
      contact: 'Francesca Bernard',
      _id: '573069c8a1dcebc25cdf8e15' }
  ],
  region: '',
  accountManager: '',
  operatingAddress: { address1: '', address2: '', city: '', postcode: '' },
  currentlyExporting: false,
  connections: [],
  uktidata: true
};

let expectedUpdatedCompany = {
  company_number: 'FC014916',
  id: 'FC014916',
  accounts: {
    last_accounts: { made_up_to: '2011-12-31', type: 'group' },
    accounting_reference_date: { month: '12', day: '31' }
  },
  date_of_creation: '1980-02-18',
  type: 'oversea-company',
  undeliverable_registered_office_address: false,
  has_been_liquidated: false,
  jurisdiction: 'united-kingdom',
  company_name: 'SAMSUNG HEAVY INDUSTRIES CO., LTD.',
  registered_office_address: {
    country: 'Korea',
    locality: 'Seoul',
    address_line_1: 'Samsung Life Insurance Seocho Tower 1321-15 Seocho-Dong',
    address_line_2: 'Seocho-Gu',
    region: '137-955' },
  etag: '686478c632aebc8ed84339873b0c52cbfdcd8175',
  has_insolvency_history: false,
  company_status: 'active',
  has_charges: true,
  previous_company_names: [
    { name: 'SAMSUNG HEAVY INDUSTRIES CO.,LTD.',
      effective_from: '1993-02-10',
      ceased_on: '2012-06-14' },
    { name: 'SAMSUNG SHIPBUILDING & HEAVY INDUSTRIES CO.,LTD',
      effective_from: '1980-02-18',
      ceased_on: '1993-02-10' }
  ],
  can_file: false,
  containsExpandedData: true,
  contacts: [
    { id: '303',
      title: 'Ms.',
      givenname: 'Mollie',
      surname: 'Stevenson',
      streetaddress: '5 Great Western Road',
      city: 'LONGDON',
      zipcode: 'GL20 5PW',
      emailaddress: 'MollieStevenson@armyspy.com',
      telephonenumber: '079 5654 9346',
      birthday: '4/15/1946',
      age: 70,
      occupation: 'Remote sensing specialist' },
    { id: '331',
      title: 'Mrs.',
      givenname: 'Melissa',
      surname: 'Bradley',
      streetaddress: '57 Old Chapel Road',
      city: 'GASTARD',
      zipcode: 'SN13 8UN',
      emailaddress: 'MelissaBradley@cuvox.de',
      telephonenumber: '078 2074 7869',
      birthday: '5/19/1935',
      age: 80,
      occupation: 'Log marker' },
    { id: '805',
      title: 'Mrs.',
      givenname: 'Lilly',
      surname: 'Nash',
      streetaddress: '86 Preston Rd',
      city: 'MORTIMER WEST END',
      zipcode: 'RG7 6BH',
      emailaddress: 'LillyNash@cuvox.de',
      telephonenumber: '079 1041 9020',
      birthday: '9/14/1972',
      age: 43,
      occupation: 'Train dispatcher' },
    { id: '198',
      title: 'Mr.',
      givenname: 'Billy',
      surname: 'Flynn',
      streetaddress: '94 Jesmond Rd',
      city: 'KILMESTON',
      zipcode: 'SO24 4FW',
      emailaddress: 'BillyFlynn@teleworm.us',
      telephonenumber: '079 0466 9161',
      birthday: '1/26/1943',
      age: 73,
      occupation: 'Vending machine repairer' },
    { id: '984',
      title: 'Mr.',
      givenname: 'Peter',
      surname: 'James',
      streetaddress: '75 Thompsons Lane',
      city: 'MELSETTER',
      zipcode: 'KW16 1JH',
      emailaddress: 'PeterJames@teleworm.us',
      telephonenumber: '070 0344 0164',
      birthday: '6/13/1973',
      age: 42,
      occupation: 'Textile cutting machine operator' }
  ],
  sectors: [ 'Financial Services', 'Food and Drink', 'Oil and Gas' ],
  uktiStatus: 'UKTI Customer',
  website: 'website',
  businessDescription: 'description',
  countryOfInterest: [ 'Argentina', 'Greece', 'France' ],
  interactions: [
    { type: 'Face to face',
      date: '6 February 2016',
      subject: 'Planning session for company\'s new export goals',
      advisor: 'Peck Copeland',
      contact: 'Medina Colon',
      _id: '573069c830424863b9abddad' },
    { type: 'Email',
      date: '19 September 2015',
      subject: 'Details about UKTI services for new exports',
      advisor: 'Rios Olson',
      contact: 'Aguirre Bryant',
      _id: '573069c8f650e8367a0644f8' },
    { type: 'Email',
      date: '4 October 2014',
      subject: 'Introduction to UKTI and our team',
      advisor: 'Booker Villarreal',
      contact: 'Campbell Myers',
      _id: '573069c8d8641b0e47fdd1b3' },
    { type: 'Face to face',
      date: '30 August 2014',
      subject: 'Introduction to UKTI and our team',
      advisor: 'Larson Bright',
      contact: 'Snyder Cabrera',
      _id: '573069c8643194ef9223c88d' },
    { type: 'Email',
      date: '2 March 2014',
      subject: 'Advise on company stand at Paris Technology Show 2016',
      advisor: 'Lindsay Avery',
      contact: 'Francesca Bernard',
      _id: '573069c8a1dcebc25cdf8e15' }
  ],
  region: 'region',
  accountManager: 'Fred Smith',
  operatingAddress: { address1: 'addr1', address2: 'addr2', city: 'city', postcode: 'postcode' },
  currentlyExporting: true,
  connections: ['connection'],
  uktidata: true
};

describe('save company update', () => {

  let companyController = require(`../../../app/controller/companyController`);
  const companyRepository = require('../../../app/lib/companyrepository');
  let getCompanySpy;


  beforeEach(() => {
    getCompanySpy = sinon.stub(companyRepository, 'getCompany', function() {
      return new Promise((fulfill) => {
        fulfill(Object.assign({}, existingCompany));
      });
    });
  });

  afterEach(() => {
    getCompanySpy.restore();
  });


  it('should parse a form and update a company', () => {

    return companyController.applyFormFieldsToCompany(existingCompany, formData)
      .then((newCompany) => {
        newCompany.should.deep.equal(expectedUpdatedCompany);
      });
  });


});

// save all

// remove account manager

// remove operating address


