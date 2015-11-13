//if there is ajax-post link, that's .js file has 'addPostLink' function
var addPostLink = function(){
    $('.ajax-post').off();

    $('.ajax-post').click(function(e){
        e.preventDefault();

        var isError;

        if(!isError){
            location.hash = this.id;
            if($(this).hasClass('loan-link')) location.hash += '#loan';
            else if($(this).hasClass('lend-link')) location.hash += '#lend';

            var splitResult = location.hash.split('#');
            var transData = $('#credit-form').serializeArray(); // .serializeArray -> form data to json
            console.log(transData);
            $.post(location.origin + '/form/' + splitResult[2] + '/' + splitResult[1],{
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
        newPopup('/search/search-school');
    };

    $('#credit-school-search').click(function(){ find_school(); });
    $('#credit-depart-search').click(function(){ find_school(); });
    $('#credit-major-search').click(function(){ find_school(); });
    $('#button_schoolSearch').click(function(){ find_school(); });

    $('#intern-radio-true').click(function(){ $('input[name="intern1"], input[name="intern2"], input[name="intern3"]').prop('disabled', false)});
    $('#intern-radio-false').click(function(){ $('input[name="intern1"], input[name="intern2"], input[name="intern3"]').prop('disabled', true)});
    $('label[for="intern-radio-true"]').click(function(){ $('input[name="intern1"], input[name="intern2"], input[name="intern3"]').prop('disabled', false)});
    $('label[for="intern-radio-false"]').click(function(){ $('input[name="intern1"], input[name="intern2"], input[name="intern3"]').prop('disabled', true)});

    $('.foreignLang-form-row:first').removeClass('display-none foreignLang-form-row');
    $('.plus-button-foreignLang').click(function(){
       $('.foreignLang-form-row:first').removeClass('display-none foreignLang-form-row');
    });

    $('.license-form-row:first').removeClass('display-none license-form-row');
    $('.plus-button-license').click(function(){
        $('.license-form-row:first').removeClass('display-none license-form-row');
    });

    $('.loan-form-row:first').removeClass('display-none loan-form-row');
    $('.plus-button-loan').click(function(){
        $('.loan-form-row:first').removeClass('display-none loan-form-row');
    });

    $('')
    addPostLink();
};