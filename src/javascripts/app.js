window.$ = require('jquery');
var mockjax   = require('jquery-mockjax');
var dynaForm = require('./dynaForm.js');
var AuthenticationForm = require('./authenticationForm.js');

(function($){


$.fn.dynaForm = dynaForm;




$(document).ready(function(){
  $('#integration-form').dynaForm({
    token: 'token',
    secret: 'secret',
    fields: {
      estado: ['SC', 'PR', 'RS'],
      nível: [1, 2, 3]
    }
  })
});




})($);
