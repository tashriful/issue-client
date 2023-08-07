function checkemptyfield(){
    if($.trim($('#inputmasterItemId').val()) == ''){
        alert('Input Item is not valid');
        document.getElementById('inputitemCode').style.borderColor = "red";
        return false;
    }

    if($.trim($('#inputunitofMeasureid').val()) == ''){
        alert('Input Uom is not valid');
        document.getElementById('inputuomCode').style.borderColor = "red";
        return false;
    }

    var isNumber = document.getElementById('inputactualQty').value;
    if((isNumber.match(/^-{0,1}\d+$/)) || (isNumber.match(/^\d+\.\d+$/))){
        //valid integer (positive or negative)
    }else{
        alert('Invalid Quantity');
        document.getElementById('inputactualQty').style.borderColor = "red";
        return false;
    }
}

function checkDate()
{
    var fDate =  document.getElementById('inputstartDate').value;
    var tDate =  document.getElementById('inputendDate').value;

    var fday = new Date(fDate);
    var tday = new Date(tDate);
    //var DifferenceTime = tday.getTime() - fday.getTime();
    if (tday.getTime()< fday.getTime() )
    {
        alert('End Date is Earliar then Start Date')
        document.getElementById('inputendDate').style.borderColor="red";
        return false;
    }
}