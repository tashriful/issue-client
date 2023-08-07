function checkemptyfield(){
    if($.trim($('#inputsupplierLine').val()) == ''){
        alert('Input Supplier is not valid');
        document.getElementById('inputsupplierName').style.borderColor = "red";
        return false;
    }

    if($.trim($('#inputnote').val()) == ''){
        alert('Input Note is not valid');
        document.getElementById('inputnote').style.borderColor = "red";
        return false;
    }
}



function callAutoComLc(purlval,pdisplayfield,pdbfield,pgetvalue,pindc,popt) {



    var urlval = purlval;
    var displayfield = pdisplayfield;
    var dbfield = pdbfield;
    var getvalue = pgetvalue;
    var indc = pindc;
    var opt = popt;
    autocomwithobject(urlval, getvalue, displayfield, dbfield, opt, indc);
}
function selectedobj(value, ind) {
    if (ind == 'lcExpenses') {

        lcExpensesTypeObj(value);
    }else if (ind == 'lcSupBank') {

        lcSupBankObj(value);
    }else if (ind == 'lcRcvNumber') {

        lcRcvNumberObj(value);
    }else if (ind == 'lcNumberSerch') {

        lcNumberScObj(value);
    }else if (ind == 'lcSupSerch') {

        lcScSup(value);
    }
}

function lcSupBankObj(objparm) {
    var objparmV = objparm;
    if (objparmV.recType=='SUPPLIER')
    {
        $('#inputsupplierLine').val(objparmV.id).trigger("change");
        $('#inputbankLine').val('');
    }else if (objparmV.recType=='BANK')
    {
        $('#inputbankLine').val(objparmV.id).trigger("change");
        $('#inputsupplierLine').val('')
    }
    $('#inputsupBnkType').val(objparmV.recType).trigger("change");
};

function lcExpensesTypeObj(objparm) {
    var objparmV = objparm;
    var lIsCom =objparmV.isCommonExpenses;
    var lIsPartOfLndCost =objparmV.partOfLandedCost;
    $('#inputlcExpTypeId').val(objparmV.id).trigger("change");
    $('#inputlcComExp').val(lIsCom).trigger("change");
    $('#inputpartOfLandedCost').val(lIsPartOfLndCost ).trigger("change");
    if (lIsCom==true)
    {
        $('#inputpoRcvHeaderNumber').attr('readonly', true);
        $('#inputpoRcvHeaderNumber').rules('remove',  'required');
    }
};

function lcRcvNumberObj(objparm) {
    var objparmV = objparm;

    $('#inputpoRcvHeader').val(objparmV.id).trigger("change");
};

function lcNumberScObj(objparm) {
    var objparmV = objparm;

    $('#inputid').val(objparmV.id).trigger("change");
};

function lcScSup(objparms) {
//                                            alert('x');
    var objparmV = objparms;
    $('#inputsupplierLine').val(objparmV.id).trigger("change");
    // $('#inputsupplierAddress').val(objparmV.siteAddress).trigger("change");
};


function lcAmtFunc(p)
{
    $('#inputlcUnAmount').val(p);
}
function lcExpAlcAmtFunc(p)
{
    var sum1 =0;

    if (!isNaN(p) && p.length !== 0) {
        sum1+= parseFloat(p);
    }
    var lalcExpAmt = $('#inputExpAlcamount').val();


        sum1+= parseFloat(lalcExpAmt);
        //alert(sum1);
        $('#inputalcAmount').val(sum1);

}
//
function expAllocation(pObj,pMode,pPageId,pTmpId,pLcId,pType)
{

    var expObj = pObj;
    var lmod = pMode;
    var lpId = pPageId;
    var ltId = pTmpId;
    var lcId  = pLcId;
    var ltyp  = pType;

    ///lcExpenses/{mode}/{pageId}/{temltId}/{lcId}"

        var l_urlVal = '/AYE/Lc/lcExpenses/' + lmod + '/' + lpId + '/' + ltId + '/' + lcId+ '/' + ltyp;
        var l_url = window.location.origin + l_urlVal;
        $.post(l_url, $.param({ lcExpenseAllocations: expObj}, true),function (data) {
            return true;
        });

    alert('Successfully Allocated!!');
    location.reload();

}



