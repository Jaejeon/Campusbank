
//if there is ajax-post link, should be there .js file having 'addPostLink' function
var addPostLink = function(){
    //TODO
    //post link handler append
};

var pageInit = function(){

    //TODO
    //page init function
    addPostLink();
    $('#regist-form').validator();
    readText('agree-text', '/texts/Survey.txt');

    //question mark popup event handler
    $('.question-button').click(function(e){
        e.stopPropagation();
        e.preventDefault();
        $(this).parent().find('.modal').modal();
    });
};