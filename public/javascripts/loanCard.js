
var loanCard_inter = function(appendWhere,docsArr){

    for(var i in docsArr){
        var loanCardHtml =  '<div class="loan-card">' +
                                '<img src="../images/'+ docsArr[i].loan.eduInfo.school + '.png" class="loan-card-img">' +
                                '<div class="loan-card-content">' +
                                    '<div class="loan-card-div1">' +
                                        '<div class="loan-card-div1-1 col-xs-5">' +
                                            '<span class="loan-card-money">' + $("#step3-1").val() + '</span> 만원' +
                                        '</div>' +
                                        '<div class="loan-card-div1-2 col-xs-5 col-xs-offset-2">' +
                                            '<span class="loan-card-period">' + $("#step4-3").val() + '</span> 개월' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="loan-card-div2">' +
                                        '<span class="loan-card-interest">' + '</span> %' +
                                    '</div>' +
                                    '<div class="loan-card-div3"> 남은시간 : <span class="loan-card-timelimit"> </span>' +
                                        '</div>' +
                                    '<div class="loan-card-div4">' +
                                        '<span class="loan-card-purpose">' + $('#step1-1').val() + '</span>' +
                                    '</div>' +
                                    '<div class="loan-card-div5">' +
                                        '<div class="loan-card-div5-1 col-xs-4">' +
                                            '<p class="loan-card-credit">' +
                                                docsArr[i].loan.credit +
                                            '</p>' +
                                        '</div>' +
                                        '<div class="loan-card-div5-2 col-xs-8">' +
                                            '<p class="loan-card-schoolinfo">' + docsArr[i].loan.eduInfo.school + '</p>' +
                                            '<p class="loan-card-schoolinfo major">' + docsArr[i].loan.eduInfo.major + '</p>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="loan-card-div6">' +
                                        '<p class="loan-card-div6-1">' + '%' +
                                        '</p>' +
                                    '</div>' +
                                '</div>' +
                            '</div>';
        $(appendWhere).append(loanCardHtml);
    }

    $('.loan-card .loan-card-credit').each(function(index){
        if($(this).text() == 'A+') $(this).css('color', '#c00000');
        else if($(this).text() == 'A0') $(this).css('color', '#eb6000');
        else if($(this).text() == 'A-') $(this).css('color', '#ffc000');
        else if($(this).text() == 'B+') $(this).css('color', '#92d050');
        else if($(this).text() == 'B0') $(this).css('color', '#53d052');
        else if($(this).text() == 'B-') $(this).css('color', '#03ac59');
        else if($(this).text() == 'C+') $(this).css('color', '#00b0f0');
        else if($(this).text() == 'C0') $(this).css('color', '#0070c0');
        else if($(this).text() == 'C-') $(this).css('color', '00007d');
        else if($(this).text() == 'F') $(this).css('color', '#404040');

    });

    $('.loan-card-schoolinfo').each(function(index){
       if($(this).text() == '고려대학교') $(this).parent().parent().parent().find('.loan-card-div6').css('background', '#dbc4c7').find('.loan-card-div6-1').css('background', '#721823');
       else if($(this).text() == '연세대학교') $(this).parent().parent().parent().find('.loan-card-div6').css('background', '#cccccc').find('.loan-card-div6-1').css('background', '#000000');
       else if($(this).text() == '성균관대학교') $(this).parent().parent().parent().find('.loan-card-div6').css('background', '#dbc4c7').find('.loan-card-div6-1').css('background', '#721823');
    });

    $('#step1-1').change(function(){
       $('.loan-card-purpose').text($(this).val());
    });

    $('#step3-1').change(function(){
        $('.loan-card-money').text($(this).val());
    });

    $('#step4-1').change(function(){
        $('.loan-card-period').text(parseInt($('#step4-1').val()) + parseInt($('#step4-2').val()));
    });

    $('#step4-2').change(function(){
        $('.loan-card-period').text(parseInt($('#step4-1').val()) + parseInt($('#step4-2').val()));
    });
};

var loanCard = function(){

};