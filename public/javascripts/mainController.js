
var addGetLink = function(){
    $('.ajax-link').off();

    $('.ajax-link').click(function(e){
        e.stopPropagation();
        e.preventDefault(); // cancel navigation
        $('#content-container').html("<div style='position:absolute; top:40%; left:45%'>" +
            "<i class='fa fa-spinner fa-pulse fa-5x'></i><p style='font-size:16px;'> Page Loading... </p></div>");
        location.hash = this.id;
        if($(this).hasClass('loan-link')) location.hash += '#loan';
        else if($(this).hasClass('lend-link')) location.hash += '#lend';
        var splitResult = location.hash.split('#');
        if(splitResult[2]){
            $.get(location.origin + '/' + splitResult[2] + '/' + splitResult[1], function(data){
                $('#content-container').empty();
                $('#content-container').append(data);

                //add link to appended contents
                addGetLink();
                pageInit();
            });
        }
        else{
            $.get(location.origin + '/' + splitResult[1], function(data){
                $('#content-container').empty();
                $('#content-container').append(data);

                //add link to appended contents
                addGetLink();
                pageInit();
            });
        }

    });

    //list open&close event
    // re-register
    $('li.nav-list a:not(.sub-li a)').click(function(e){
        e.stopPropagation();
        if($(this).parent().hasClass('open-list')){
            $(this).parent().children("ul").stop().animate({
                height:'0px'
            }, function(){
                $(this).parent().removeClass('open-list');
            });
        }
        else{
            var element = document.getElementsByClassName('open-list');
            for(i = 0; i < element.length; i++) $(element[i]).removeClass('open-list');
            $(this).parent().addClass('open-list');
            $(this).parent().children("ul").stop().animate({
                height: $(this).parent().children("ul").children().length * 40
            },300);
        }

        $(this).parent().children("ul").children("li").height(0);
        $(this).parent().children("ul").children("li").animate({
            height:'40px'
        }, 300, function(){
            //Animation complete.
        });
    });

};

var newPopup = function(url){
  popupWindow = window.open(url, 'popUpWindow', 'height=400, width=600, resizable=yes,' +
      ' menubar=no, location=no, directories=no, status=yes');
};

var closeModal = function(){
  $("#modal-login").modal("hide");
};

$(function(){
    //sidebar custom scroll
    $('#sidebar-wrapper').mCustomScrollbar({
        theme:"minimal-dark"
    });

    //sub list select event handler
    $('li.sub-li').click(function(e){
        e.stopPropagation();
        if($(this).hasClass('selected-sub-list')) ;
        else{
            var element = document.getElementsByClassName('selected-sub-list');
            for(i = 0; i < element.length; i++) $(element[0]).removeClass('selected-sub-list');
            $(this).addClass('selected-sub-list');
        }
    });

    //icon-list show & hide handler
    $('.icon-list').children('li').hover(function(e){
        e.stopPropagation();
        $(this).stop().animate({
            width:'150px'
        }); },

        function(e){
            e.stopPropagation();
            $(this).stop().animate({
                width:'40px'
            });
        });


    //ajax call
    // append html content
    addGetLink();

    //modal login handler
    $('#login').click(function(){
        $('#modal-login').modal();
    });

});

