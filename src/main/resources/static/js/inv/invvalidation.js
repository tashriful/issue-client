function checkemptyfield(){
    if($.trim($('#inputtoAccount').val()) == ''){
        alert('Input Account is not valid');
        document.getElementById('toAccountV').style.borderColor = "red";
        return false;
    }
    else{
        document.getElementById('toAccountV').style.borderColor = "#CCC";
    }

}

function checkemptyfieldCat(){
    if($.trim($('#inputinvItemClassifications').val()) == ''){
        alert('Input Category Set is not valid');
        document.getElementById('invItemClassificationsV').style.borderColor = "red";
        return false;
    }
    else{
        document.getElementById('invItemClassificationsV').style.borderColor = "#CCC";
    }

}


function checkrecvitem(viid,  vidd) {
    //alert('viid'+viiid);
    if ($.trim($(viid).val()) == '') {
        alert('Input item is not valid');
        document.getElementById(vidd).style.borderColor = "red";
        return 0;
    }
    else {
        document.getElementById(vidd).style.borderColor = "#CCC";
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