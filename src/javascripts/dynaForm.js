var $ = require('jquery');
var AuthenticationForm = require('./authenticationForm.js');
var formValidation = require('./formValidation.js')();

module.exports = function(options) {

  var settings = $.extend({
    'token':     null,
    'secret':    null,
    'modal'   :  false,
    'fields'  : {
      'estado':[],
      'nível': []
    }
  }, options);

  //check if object is not being sent without secret and token
  if(settings.secret == undefined) {
    throw "You need to pass a secret to the options object";
  }

  if(settings.token == undefined) {
    throw "You need to pass a token to the options object";
  }

  //TODO make it dynamic
  function createFormGroup(labelText) {
    return '<div class="form-group">\
    <label>' + labelText + '</label>\
    <input type="text" name="username" id="username" class="form-control">\
    <p class="error-block js-validate-length">Your name should be between 10 and 15 characters length</p>\
    </div>';
  }

  var $form = $('<form></form>');
  var $button = $('<button id="submit">Submit</button>');

  $form.append($(createFormGroup('username')));
  $form.append($(createFormGroup('email')));

  var authenticationForm = new AuthenticationForm();


  function getJson() {
    var json = {
      token: settings.token,
      secret: settings.secret,
      lead: {
        username:$("#username").val(),
        email: $("#email").val(),
        estado: $("#estado").val(),
        nível: $("#nível").val()
      }
    }
    return json;
  }

  for(let field in settings.fields) {
    if(settings.fields[field].length > 0) {
      var $select = $('<select name="' + field + ' " id ="' + field + '"></select>');
      settings.fields[field].forEach(value => {
        var $option = $('<option value="' + value + ' id="' + value + '"">' + value + '</option>');
        $select.append($option);
      });
    }
    $form.append($select);
  }

  $form.append($button);

  this.each(function(){
    $(this).append($form);
  });

  $("#username").on('focusout', function(){
    formValidation.validateField('username', $(this).val());
  });

  $('.js-validate-length').on('showValidation', function(){
    $(this).show();
  })
  $('.js-validate-length').on('hideValidation', function(){
    $(this).hide();
  })

  $button.on('click', function(e){
    e.preventDefault();
    var json = getJson();

    if(formValidation.validate(json)) {
      authenticationForm.submit(json);
    }
  });
}
