
//if there is ajax-post link, should be there .js file having 'addPostLink' function
var addPostLink = function(){
    $('#login-submit').click(function(e){
        e.preventDefault();
        var transData = $('#login-form').serializeArray();
        $.post(location.origin + location.pathname + 'users/login', {
            formData: transData
        }, function(data){
            $('#content-container').empty();
            $('#content-container').append(data);

            addGetLink();
            pageInit();
        });
    });
};

var pageInit = function(){
    addPostLink();
    $('.open-list').removeClass('open-list');
    $('.selected-sub-list').removeClass('selected-sub-list');
};

