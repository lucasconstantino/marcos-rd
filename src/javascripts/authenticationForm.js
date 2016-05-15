var $ = require('jquery');

module.exports =  function() {

  var self = this;

  self.json = {};

  self.submit = function(data) {
    $.ajax({
      type: 'POST',
      method: 'POST',
      url: '/signup',
      data: data,
      contentType: 'json',
      dataType: 'json'
    }).done(function(data){
      self.json = data;
      debugger;
    });
  };


};
