#!/usr/bin/env node

var path = require('path');
var fs = require('fs');
var handlebars = require('handlebars');
var Promise = require('bluebird');
var argv = require('minimist')(process.argv.slice(2), {
  string: [ 'template', 'json', 'helpers' ]
});

function readFile (filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(path.resolve(filePath), { encoding: 'utf8' }, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
}

function loadHelpers (helpersPath) {
  if (!helpersPath) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    fs.readdir(helpersPath, (err, files) => {
      if (err) {
        return reject(err);
      }

      var helpers = files.reduce((acc, file) => {
        return Object.assign(acc, require(path.resolve(helpersPath, file)));
      }, {});

      handlebars.registerHelper(helpers);

      return resolve();
    });
  });
}

if (!argv.template || !argv.json) {
  throw new Error('wrong number of arguments');
}

var templatePath = argv.template;
var jsonPath = argv.json;
var helpersPath = argv.helpers;

Promise.all([
  readFile(templatePath),
  readFile(jsonPath),
  loadHelpers(helpersPath)
])
.spread((template, json) => {
  var render = handlebars.compile(template);
  var data = JSON.parse(json);

  return render(data);
})
.then((result) => {
  console.log(result);
})
.catch((error) => {
  console.error(error);
});
