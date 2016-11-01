'use strict';

const config = require('../../config');
const express = require('express');
const router = express.Router();
const rp = require( 'request-promise' );

function authenticate(username, password) {
  var options = {
    method: 'POST',
    url: ( config.apiRoot + config.api.authUrl ),

    headers:
    {
      'cache-control': 'no-cache',
      authorization: `Basic ${new Buffer(config.api.clientId + ':' + config.api.clientSecret).toString('base64')}`,
      'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
    },
    formData:
    {
      username: username,
      password: password,
      grant_type: 'password'
    },
    json: true
  };

  return rp(options);
}

function login( req, res ){

  res.render( 'login', { action: '/login' } );
}

function loginToApi( req, res ){

  if (!req.body.username || !req.body.password) {
    req.flash('error-message', 'Invalid user id or password');
    res.redirect('/login');
    return;
  }

  authenticate(req.body.username, req.body.password)
    .then((data) => {
      req.session.token = data.access_token;
      res.redirect('/');
    })
    .catch((error) => {

      if (error.response.statusCode === 401) {

        req.flash('error-message', 'Invalid user id or password');
        res.redirect('/login');

      } else {

        req.error = error.error;
        res.redirect('/error');
      }
    });
}

function logout( req, res ){

  req.session.token = null;
  req.flash( 'success-message', 'Signed out' );
  res.redirect( '/login' );
}

router.get('/', login);
router.post( '/', loginToApi);
router.get( '/signout', logout );

module.exports = { router };