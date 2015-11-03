
//if there is ajax-post link, should be there .js file having 'addPostLink' function
var addPostLink = function(){
    //TODO
    //post link handler append
};

var pageInit = function(){

    //TODO
    //page init function
    addPostLink();
    readText('agree-text', '/texts/Survey.txt');

    //question mark popup event handler
    $('.question-button').click(function(e){
        e.stopPropagation();
        e.preventDefault();
        $(this).parent().find('.modal').modal();
    });

    $('#step4-1').change(function(){
       $('#step4-3').val(parseInt($('#step4-1').val()) + parseInt($('#step4-2').val()));
    });

    $('#step4-2').change(function(){
        $('#step4-3').attr('value', parseInt($('#step4-1').val()) + parseInt($('#step4-2').val()));
    });

};