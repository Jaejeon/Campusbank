
//if there is ajax-post link, that's .js file has 'addPostLink' function
var addPostLink = function(){
    $('.ajax-post').off();

  $('.ajax-post').click(function(e){
      e.preventDefault();
      $('#join-form').validator('validate');

      var isError;
      if($('#join-form').children('.has-error').length !== 0 || $('#join-form').children('.agree-box').children('.has-error').length !== 0
      || $('.birthYear').val() === '0' || $('.birthMonth').val() === '0' || $('.birthDate').val() === '0') isError = true;
      else isError = false;

      if(!isError){
          location.hash = this.id;
          var splitResult = location.hash.split('#');
          var transData = $('#join-form').serializeArray(); // .serializeArray -> form data to json
          $.post(location.origin + location.pathname + '/' + splitResult[1],{
              formData : transData
          } ,function(data){
              $('#content-container').empty();
              $('#content-container').append(data);

              //add link to appended contents
              addGetLink();
              pageInit();
          });
      }
  });
};

var pageInit = function(){
    $('#join-form').validator();
    addPostLink();
};

