
var addGetLink = function(){
    $('.ajax-link').off();

    $('.ajax-link').click(function(e){
        e.stopPropagation();
        e.preventDefault(); // cancel navigation
        $('#content-container').html("<i class='fa fa-spinner fa-pulse fa-5x'></i><p> Loading </p>");
        location.hash = this.id;
        var splitResult = location.hash.split('#');
        $.get(location.origin + location.pathname + '/' + splitResult[1], function(data){
            $('#content-container').empty();
            $('#content-container').append(data);

            //add link to appended contents
            addGetLink();
            pageInit();
        });
    });

    //list open&close event
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
};

$(function(){
    //$('input[type="checkbox"]').adaptiveSwitch();

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

});

