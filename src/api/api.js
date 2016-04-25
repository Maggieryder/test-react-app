var Fetch = require('whatwg-fetch');
var baseURL = 'http://localhost:6069';

module.exports = {
  get: function(url){
    return fetch(baseURL + url)
    .then(function(response){
      return response.json();
    });
  },
  post: function(url, body){
    return fetch(baseURL + url, {
      headers: {
        'Accept': 'text/plain',
        'Content-type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify(body)
    }).then(function(response){
      return response;
    });
  },
  delete: function(url){
    console.log('Deleting user from JSON with url', url);
    return fetch(baseURL + url, {
      headers: {
        'Accept': 'text/plain',
        'Content-type': 'application/json'
      },
      method: 'delete',
    }).then(function(response){
      return response;
    });
  }
};
