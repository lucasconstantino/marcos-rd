var $         = require('jquery');
var matchers  = require('jasmine-jquery');
// var mockjax   = require('jquery-mockjax')($, window);
var dynaForm  = require('../src/javascripts/dynaForm.js');
var AuthenticationForm = require('../src/javascripts/authenticationForm.js');
var FormValidation = require('../src/javascripts/formValidation.js');

describe('User creation', function(){

  beforeEach(function(){

     $.fn.dynaForm = dynaForm;
     $('body').append('<div id="integration-form"></div>');


    $("#integration-form").dynaForm({
      token: 'token',
      secret: 'secret',
    })
  });

  function getJson() {
    return {
      lead: {
        username: $("#username").val(),
        email: $("#email").val()
      }
    };
  }

  describe('sucessful submit', function(){

    it('Should have valid username and email', function(){
      var d = $.Deferred();

      $("#username").val('Front end Ninja');
      $("#email").val('frontend.ninja@resultadosdigitais.com.br');

      var json = getJson();

      d.resolve(json);
      spyOn($, 'ajax').and.returnValue(d.promise());

      var authenticationForm = new AuthenticationForm();
      var formValidation = FormValidation();

      authenticationForm.submit();
      formValidation.validate(json);
      expect(formValidation.validate(json)).toBe(true);
    });

  });

  describe('submit with wrong information', function(){
    it("should show error message for email without '@'", function(){
      var d = $.Deferred();

      $("#username").val('Front end Ninja');
      $("#email").val('frontend.ninjaresultadosdigitais.com.br');

      var json = getJson();

      d.resolve(json);
      spyOn($, 'ajax').and.returnValue(d.promise());
      var authenticationForm = new AuthenticationForm();
      var formValidation = FormValidation();

      authenticationForm.submit();
      formValidation.validate(json);
      expect(formValidation.validate(json)).toBe(false);

    });

    it("should show error if json has no token or secret", function(){
      var d = $.Deferred();
      var json = getJson();

      d.resolve(json);
      spyOn($, 'ajax').and.returnValue(d.promise());
      var authenticationForm = new AuthenticationForm();
      var formValidation = FormValidation();

      authenticationForm.submit();
      formValidation.validate(json);
      expect(json.token).toBe(false);
    });
  });

});
