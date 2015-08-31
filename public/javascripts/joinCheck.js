
function readText(text_id, filepath){
//text read from filepath
//and input text.value <- read text
    $.ajax({
        url:filepath
    }).done(function(data){
        document.getElementById(text_id).value = data;
    });
}

function usertypeCheck(usertype){
    if(document.getElementById(usertype).value === "") return false;

    return true;
}

function nameCheck(username){
    if(document.getElementById(username).value === "") return false;

    return true;
}

function emailCheck(email1, email2){
    if(document.getElementById(email1).value === "") return false;
    if(document.getElementById(email2).value === "") return false;

    if(document.getElementById(email1).value !== document.getElementById(email2).value){
        return false;
    }
    else{
        return true;
    }
}

function passwordCheck(pwd1, pwd2){

    if(document.getElementById(pwd1).value === "") return false;
    if(document.getElementById(pwd2).value === "") return false;

    if(document.getElementById(pwd1).value === document.getElementById(pwd2).value){
        return true;
    }
    else{
        return false;
    }
}

function birthCheck(birthYear, birthMonth, birthDay){
    if(birthYear === "") return false;
    if(birthMonth === "") return false;
    if(birthDay === "") return false;

    return true;
}

function agreeCheck(agr1, agr2){
    if(document.getElementById(agr1).checked && document.getElementById(agr2).checked){
        return true;
    }
    return false;
}

function infoCheck(usertype, username, email1, email2, pwd1, pwd2, birthYear, birthMonth, birthDay, agr1, agr2){
    if(agreeCheck(agr1, agr2) && usertypeCheck(usertype) && nameCheck(username) && emailCheck(email1, email2) && passwordCheck(pwd1, pwd2)
        && birthCheck(birthYear, birthMonth, birthDay)){
        return true;
    }

    else{
        return false;
    }
}

$(function(){
    $('#email1').keyup(function(){
        var parameters = {emailWillUse: $(this).val()};
        $.get('/emailUsedCheck', parameters, function(data){
            if(data){
               $('#emailUsedCheck').removeClass('displayNone').addClass('displayElement');
           }

           else{
               $('#emailUsedCheck').removeClass('displayElement').addClass('displayNone');
           }
        });

        if($('#email2').val() !== '' && $(this).val() !== $('#email2').val()){
            $('#emailDupCheck').removeClass('displayNone').addClass('displayElement');
        }
        else if($('#email2').val() !== '' && $(this).val() === $('#email2').val()){
            $('#emailDupCheck').removeClass('displayElement').addClass('displayNone');
        }
    });

    $('#email2').keyup(function(){
        if($(this).val() !== $('#email1').val()){
            $('#emailDupCheck').removeClass('displayNone').addClass('displayElement');
        }
        else{
            $('#emailDupCheck').removeClass('displayElement').addClass('displayNone');
        }
    });

    $('#password1').keyup(function(){
        if($('#password2').val() !== '' && $(this).val() !== $('#password2').val()){
            $('#pwdCheck').removeClass('displayNone').addClass('displayElement');
        }
        else if($('#password2').val() !== '' && $(this).val() === $('#password2').val()){
            $('#pwdCheck').removeClass('displayElement').addClass('displayNone');
        }
    });

    $('#password2').keyup(function(){
        if($(this).val() !== $('#password1').val()){
            $('#pwdCheck').removeClass('displayNone').addClass('displayElement');
        }
        else{
            $('#pwdCheck').removeClass('displayElement').addClass('displayNone');
        }
    });
});
