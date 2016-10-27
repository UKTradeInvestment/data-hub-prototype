'use strict';
const rp = require('request-promise');
const config = require('../../config');

function search(query) {

  let body = {
    term: query.term,
    limit: query.limit | 10
  };

  if (!query.page) {
    body.offset = 0;
    query.page = 1;
  } else {
    body.offset = (query.page * body.limit) - body.limit;
  }

  let options = {
    url: `${config.apiRoot}/search`,
    form: body,
    json: true,
    method: 'POST'
  };


  return rp(options);
}

function suggestCompany(term, types) {

  if (!types) {
    types = ['company_company'];
  }

  term += '*';

  let options = {
    url: `${config.apiRoot}/search`,
    form: {term, doc_type: types},
    json: true,
    method: 'POST'
  };

  return rp(options).
    then((result) => {
      return result.hits
        .map(hit => {
          return {
            name: hit._source.name,
            id: hit._id,
            _type: hit._type
          };
        });

    });
}

module.exports = { search, suggestCompany };
