const winston = require('winston');
const pjson = require('../../package.json');

const startTime = new Date().getTime();

module.exports = function locals(req, res, next) {
  winston.debug('locals:start');
  res.locals.baseUrl = req.baseUrl;
  res.locals.releaseVersion = pjson.version;
  res.locals.startTime = startTime;
  res.locals.asset_path = '/';
  res.locals.referer = req.headers.referer;
  winston.debug('locals:end');
  next();
};
