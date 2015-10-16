//if there is ajax-post link, that's .js file has 'addPostLink' function
var addPostLink = function(){
    $('.ajax-post').off();

    $('.ajax-post').click(function(e){
        e.preventDefault();

        var isError;

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

    var find_school = function(){
        newPopup('/search-school');
    };

    $('#credit-school-search').click(function(){
        find_school();
    });

    $('#credit-depart-search').click(function(){
        find_school();
    });

    $('#credit-major-search').click(function(){
        find_school();
    });

    addPostLink();
};