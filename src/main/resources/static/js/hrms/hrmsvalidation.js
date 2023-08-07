

function checkemptyfield(){
    if($.trim($('#inputcustomerLine').val()) == ''){
        alert('Input Customer is not valid');
        document.getElementById('inputcustomerName').style.borderColor = "red";
        return false;
    }
    else{
        document.getElementById('inputcustomerName').style.borderColor = "#CCC";
    }




}


function checkemptybankLine(){
        if($.trim($('#bankLineId').val()) == ''){
        alert('Input Bank is not valid');
        document.getElementById('inputbankLine').style.borderColor = "red";
        return false;
    }
    else{
        document.getElementById('inputbankLine').style.borderColor = "#CCC";
    }

}



function checkorditem() {
    //alert('viid'+viiid);
    if ($.trim($('#inputmasterItemId').val()) == ''){
        alert('Input item is not valid');
        document.getElementById('inputitemCode').style.borderColor = "red";
        return 0;
    }
    else {
        document.getElementById('inputitemCode').style.borderColor = "#CCC";
        return 1;
    }


}

function checkinvInfoAccValid(){
    if($.trim($('#inputinventoryApAcc').val()) == ''){
        alert('Input Ap Account is not valid');
        document.getElementById('inventoryApAccV').style.borderColor = "red";
        return false;
    }
    else{
        document.getElementById('inventoryApAccV').style.borderColor = "#CCC";
    }

    if($.trim($('#inputsalesAcc').val()) == ''){
        alert('Input Sales Account is not valid');
        document.getElementById('salesAccV').style.borderColor = "red";
        return false;
    }
    else{
        document.getElementById('salesAccV').style.borderColor = "#CCC";
    }

    if($.trim($('#inputcogsAcc').val()) == ''){
        alert('Input COGS Account is not valid');
        document.getElementById('cogsAccV').style.borderColor = "red";
        return false;
    }
    else{
        document.getElementById('cogsAccV').style.borderColor = "#CCC";
    }

    if($.trim($('#inputmaterialAcc').val()) == ''){
        alert('Input Material Account is not valid');
        document.getElementById('materialAccV').style.borderColor = "red";
        return false;
    }
    else{
        document.getElementById('materialAccV').style.borderColor = "#CCC";
    }

    if($.trim($('#inputwipAcc').val()) == ''){
        alert('Input WIP Account is not valid');
        document.getElementById('inputwipAccV').style.borderColor = "red";
        return false;
    }
    else{
        document.getElementById('inputwipAccV').style.borderColor = "#CCC";
    }

}