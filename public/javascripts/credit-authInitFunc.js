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
            var transData = new FormData();
            transData.append('file1', $('input[name=file1]')[0].files[0]);

            $.ajax({
                url:location.origin + '/' + splitResult[2] + '/' + splitResult[1],
                data:transData,
                processData:false,
                contentType:false,
                type:'POST',
                success:function(data){
                    $('#content-container').empty();
                    $('#content-container').append(data);

                    //add link to appended contents
                    addGetLink();
                    pageInit();
                }
            });
        }
    });
};

var pageInit = function(){
    addPostLink();
};