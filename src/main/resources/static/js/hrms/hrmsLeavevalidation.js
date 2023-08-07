$(function () {

    $('#inputempname').on('input', function () {
        if ($('#inputempname').val().length > 1) {
            empInfoAutoComFunc('#inputempname','empName','designation','empInfoleave','/AYE/ACRC/SearchEmployee');
            $('#inputempname').focus();
        }
    })

    $('#inputsendToEmpName').on('input', function () {
        if ($('#inputsendToEmpName').val().length > 1) {
            empInfoAutoComFunc('#inputsendToEmpName','empName','designation','sendToEmp','/AYE/ACRC/SearchEmployee');
            $('#inputsendToEmpName').focus();
        }
    })



    $('#inputleaveFromDate').on('change',function()
    {
        var input1 = document.getElementById('inputleaveFromDate').value;
        var input2 = document.getElementById('inputleaveToDate').value;

        if (input2.length>0)
        {
            var fday = new Date(input1);
            var tday = new Date(input2);
            var DifferenceTime = tday.getTime() - fday.getTime();
            var DifferenceDays = DifferenceTime / (1000 * 3600 * 24)+1;
            document.getElementById('inputleaveDays').value=DifferenceDays;
        }
    });


    $('#inputleaveToDate').on('change' ,function()
    {
        var input1 = document.getElementById('inputleaveFromDate').value;
        var input2 = document.getElementById('inputleaveToDate').value;

        if (input1.length>0)
        {
            var fday = new Date(input1);
            var tday = new Date(input2);
            var DifferenceTime = tday.getTime() - fday.getTime();
            var DifferenceDays = DifferenceTime / (1000 * 3600 * 24) + 1;
            document.getElementById('inputleaveDays').value=DifferenceDays;
        }
    });


});


function empInfoAutoComFunc(pdisplayfieldEmp,pgetvalue,pgetDesc,pindc,urlvalEmp) {
    var displayfieldEmp = pdisplayfieldEmp;
    var getvalue = pgetvalue;
    var getDesc = pgetDesc;
    var indc = pindc;
    var urlvalEmp = urlvalEmp;
    //alert(urlvalEmp );
    autocomwithobject(urlvalEmp, getvalue, displayfieldEmp, null, getDesc, indc);
}

function selectedobj(value, ind) {
    var objparmV = value;
    if (ind == 'sendToEmp') {
        $('#inputsendToEmpId').val(objparmV.empId).trigger("change");
    }


    if (ind == 'empInfoleave') {
        $('#inputempId').val(objparmV.empId).trigger("change");
    }
};



function checkemptyfield() {
    if ($.trim($('#inputcustomerLine').val()) == '') {
        alert('Input Customer is not valid');
        document.getElementById('inputcustomerName').style.borderColor = "red";
        return false;
    }
    else {
        document.getElementById('inputcustomerName').style.borderColor = "#CCC";
    }


}


function checkemptybankLine() {
    if ($.trim($('#bankLineId').val()) == '') {
        alert('Input Bank is not valid');
        document.getElementById('inputbankLine').style.borderColor = "red";
        return false;
    }
    else {
        document.getElementById('inputbankLine').style.borderColor = "#CCC";
    }

}


function checkorditem() {
    //alert('viid'+viiid);
    if ($.trim($('#inputmasterItemId').val()) == '') {
        alert('Input item is not valid');
        document.getElementById('inputitemCode').style.borderColor = "red";
        return 0;
    }
    else {
        document.getElementById('inputitemCode').style.borderColor = "#CCC";
        return 1;
    }


}

function checkinvInfoAccValid() {
    if ($.trim($('#inputinventoryApAcc').val()) == '') {
        alert('Input Ap Account is not valid');
        document.getElementById('inventoryApAccV').style.borderColor = "red";
        return false;
    }
    else {
        document.getElementById('inventoryApAccV').style.borderColor = "#CCC";
    }

    if ($.trim($('#inputsalesAcc').val()) == '') {
        alert('Input Sales Account is not valid');
        document.getElementById('salesAccV').style.borderColor = "red";
        return false;
    }
    else {
        document.getElementById('salesAccV').style.borderColor = "#CCC";
    }

    if ($.trim($('#inputcogsAcc').val()) == '') {
        alert('Input COGS Account is not valid');
        document.getElementById('cogsAccV').style.borderColor = "red";
        return false;
    }
    else {
        document.getElementById('cogsAccV').style.borderColor = "#CCC";
    }

    if ($.trim($('#inputmaterialAcc').val()) == '') {
        alert('Input Material Account is not valid');
        document.getElementById('materialAccV').style.borderColor = "red";
        return false;
    }
    else {
        document.getElementById('materialAccV').style.borderColor = "#CCC";
    }

    if ($.trim($('#inputwipAcc').val()) == '') {
        alert('Input WIP Account is not valid');
        document.getElementById('inputwipAccV').style.borderColor = "red";
        return false;
    }
    else {
        document.getElementById('inputwipAccV').style.borderColor = "#CCC";
    }

}