$(function(){
    $('#inputoutTime').on('input',function(){
        var valuestart = $('#inputintime').val();
        var valuestop = $('#inputoutTime').val();

        var timeStart = moment("01/01/2022 " + valuestart);
        var timeEnd = moment("01/01/2022 " + valuestop);
        //alert(timeEnd +" "+ timeStart);
        var hourDiff = timeEnd.diff(timeStart,"hours");
        //alert(hourDiff);
        $('#inputworkHour').val(hourDiff);
    });
});



//function shiftTimeCalculate()
//{
//    document.getElementById('inputoutTime').oninput= function() {
//        var valuestart = document.getElementById('inputintime').value;
//        var valuestop = document.getElementById('inputoutTime').value;
////                                    alert(valuestart+' in '+valuestop);
//        //create date format
//        var timeStart = new Date("01/01/2007 " + valuestart).getHours();
//        var timeEnd = new Date("01/01/2007 " + valuestop).getHours();
////                                    alert(timeStart+' in '+timeEnd);
//
//        var hourDiff = timeEnd - timeStart;
//        var difference = timeEnd - timeStart;
//
////                                    difference = difference / 60 / 60 / 1000;
////                                    alert(difference);
//        document.getElementById('inputworkHour').value=difference;
//
////                                    $("p").html("<b>Total Hours:</b> " + hourDiff )
//    }
//}