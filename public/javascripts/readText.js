
function readText(text_id, filepath){
//text read from filepath
//and input text.value <- read text
    $.ajax({
        url:filepath
    }).done(function(data){
        document.getElementById(text_id).value = data;
    });
}