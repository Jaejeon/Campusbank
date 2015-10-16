/**
 * Created by Leessang on 15. 9. 11..
 */
function find_address(){
    var addressPopup = new daum.Postcode({
        oncomplete: function(data) {
            var fullRoadAddr = data.roadAddress;
            var extraRoadAddr = '';

            if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                extraRoadAddr += data.bname;
            }

            if(data.buildingName !== '' && data.apartment === 'Y'){
                extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }

            if(extraRoadAddr !== ''){
                extraRoadAddr = ' (' + extraRoadAddr + ')';
            }

            if(fullRoadAddr !== ''){
                fullRoadAddr += extraRoadAddr;
            }


            document.getElementById('sample4_postcode').value = data.zonecode;
            document.getElementById('sample4_roadAddress').value = fullRoadAddr;
            document.getElementById('sample4_jibunAddress').value = data.jibunAddress;

        }
    }).open();
}
