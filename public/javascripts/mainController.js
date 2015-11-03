
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

var addLoginPost = function(){
    $('#login-post').click(function(e){
        e.preventDefault();

        var transData = $('#modal-login-form').serializeArray();
        $.post(location.origin + '/users/login',{
                formData : transData
            }, function(data, status, jqXHR){
                $('#content-container').empty();
                $('#content-container').append(data);
                if(jqXHR.getResponseHeader('isLoggedIn')){
                    $('#join').css('display', 'none');
                    $('#login').css('display','none');
                    var loginAppendHtml = "<p class='rightAssign col-xs-4'><u id='mypage' class='ajax-link'>"+
                        jqXHR.getResponseHeader('username') +"</u>님 안녕하세요.</p>";
                    $('#header-bar').append(loginAppendHtml);
                    addGetLink();
                }
            }
        );

        $('#modal-login').modal('hide');
    });
};

var newPopup = function(url){
  popupWindow = window.open(url, 'popUpWindow', 'height=400, width=600, resizable=yes,' +
      ' menubar=no, location=no, directories=no, status=yes');
};

$(function(){
    //sidebar custom scroll
    $('#sidebar-wrapper').mCustomScrollbar({
        theme:"minimal-dark"
    });

    /*
    //header-company show & hide handler
    $(window).scroll(function(){
        if($(window).scrollTop() >= 90){
            $('.header-company').stop().animate({
                height:'0px'
            });
        }
        else {
            $('.header-company').stop().animate({
                height: '40px'
            });
        }

        if($(window).scrollTop() >= 40){
            $('#sidebar-wrapper').css('position', 'fixed');
            $('#sidebar-wrapper').css('top', '0');
        }
        else{
            $('#sidebar-wrapper').css('position', 'absolute');
            $('#sidebar-wrapper').css('top', 'auto');
        }

    });
    */

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
    addLoginPost();
    addGetLink();

    //modal login handler
    $('#login').click(function(){
        $('#modal-login').modal();
    });

});

