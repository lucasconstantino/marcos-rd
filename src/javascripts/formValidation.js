module.exports = function(){

  var validationRules = {
    username: {
      minLength: 3,
      maxLength: 30
    },
    email: {
      minLength: 5,
      maxLength: 50
    }
  }

  function validateField(field, data) {
    if( data.length > validationRules[field].maxLength ||
        data.lenght < validationRules[field].minLength)
    {
      $("#username").next().trigger('showValidation');

    }
    else {
      $("#username").next().trigger('hideValidation')
    }
  }

  function validate(json) {
    if( json.lead.username.length > validationRules.username.maxLength ||
        json.lead.username.length < validationRules.username.minLength)
    {
      validateField('username', json.lead.username)
    }
    if( json.lead.email.length > validationRules.email.maxLength ||
        json.lead.email.length < validationRules.email.minLength)
    {
      validateField('email', json.lead.email);
    }
    if(json.lead.email.indexOf('@') == -1) {
      $("#email").next().trigger('showValidation')
    }
    else {
      $("#email").next().trigger('hideValidation');
      return true;
    }
  }

  return {
    validate: validate,
    validateField: validateField
  }

};
