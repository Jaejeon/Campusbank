
//if there is ajax-post link, that's .js file has 'addPostLink' function
var addPostLink = function(){
    $('.ajax-post').off();

    $('.ajax-post').click(function(e){
        e.preventDefault();

        //TODO
        // ajax-post event in 'joinSubmit' handling here
    });
};

var pageInit = function(){
    addPostLink();
};