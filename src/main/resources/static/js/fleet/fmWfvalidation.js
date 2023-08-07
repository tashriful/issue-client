$(function(){
    $('#inputworkForceType').on('change',function(){
        dataResetFMw();
        workForceTypeChangeEvent();

    });
    $('#inputemployeeInfoNo').on('input',function(){
        if($('#inputemployeeInfoNo').val().length>1)
        {
            var lurl= '/AYE/ACRC/SearchEmployee'
            //var l_url = window.location.origin + lurl;
            //alert(l_url);
            var displayfield = '#inputemployeeInfoNo';
            var dbfield = '#inputemployeeInfo';
            var getvalue = 'empNo';
            var indc = 'FwfEmp';
            var opt = "empName";
            AutocomFuncFm(lurl, getvalue, displayfield, dbfield,opt, indc);
            $('#inputemployeeInfoNo').focus();
        }else
        {
            $('#inputemployeeInfoName').val("");
            $('#inputemployeeInfo').val("");
        }
        ///AYE/ACRC/SearchEmployee
    });

});

$(document).ready(function(){
    workForceTypeChangeEvent();
})
function selectedobj(value, ind) {
    if (ind == 'FwfEmp') {
        $('#inputemployeeInfo').val(value.empId).trigger('change');
        $('p#inputemployeeInfoName').text(value.empName).trigger('change');
        $('inputName').text(value.empName).trigger('change');
        $('#inputfathersName').val(value.fatherName).trigger('change');
        $('#inputmothersName').val(value.motherName).trigger('change');
        $('#inputpresntAddress').val(value.presentAddress).trigger('change');
        $('#inputpermanentAddress').val(value.permanentAddress).trigger('change');
        $('#inputphoneNumber').val(value.phonePersonal).trigger('change');
        $('#inputalternatephoneNumber').val(value.phoneHome).trigger('change');
        $('#inputdrivingLicense').val(value.drivingLicence).trigger('change');

    }
}
function workForceTypeChangeEvent()
{
    if($('#inputworkForceType').val()=='EMPLOYEE')
    {
        $('#inputemployeeInfoNo').prop('readonly',false);
        $('#inputName').prop('readonly',true);
        $('#inputlastName').prop('readonly',true);
        $('#inputfathersName').prop('readonly',true);
        $('#inputmothersName').prop('readonly',true);
        $('#inputpresntAddress').prop('readonly',true);
        $('#inputpermanentAddress').prop('readonly',true);
    }else if($('#inputworkForceType').val()=='CONTRACTUAL')
    {
        $('#inputemployeeInfoNo').prop('readonly',true);
        $('#inputName').prop('readonly',false);
        $('#inputlastName').prop('readonly',false);
        $('#inputfathersName').prop('readonly',false);
        $('#inputmothersName').prop('readonly',false);
        $('#inputpresntAddress').prop('readonly',false);
        $('#inputpermanentAddress').prop('readonly',false);
    }
    else if($('#inputworkForceType').val()=='')
    {
        $('#inputemployeeInfoNo').prop('readonly',true);
        $('#inputName').prop('readonly',true);
        //$('#inputlastName').prop('readonly',true);
        $('#inputfathersName').prop('readonly',true);
        $('#inputmothersName').prop('readonly',true);
        $('#inputpresntAddress').prop('readonly',true);
        $('#inputpermanentAddress').prop('readonly',true);
    }
}
function dataResetFMw()
{
    $('#inputemployeeInfo').val('');
    $('#inputemployeeInfoNo').val('');
    $('#inputemployeeInfoName').val('');
    $('#inputfirstName').val('');
    $('#inputlastName').val('');
    $('#inputfathersName').val('');
    $('#inputmothersName').val('');
    $('#inputpresntAddress').val('');
    $('#inputpermanentAddress').val('');
}
//function checkemptyfieldPoHeader() {
//    //alert('x');
//    if ($.trim($('#inputsupplierLine').val()) == '') {
//        alert('Input Supplier is not valid');
//        document.getElementById('inputsupplierName').style.borderColor = "red";
//        return false;
//    } else {
//        document.getElementById('inputsupplierName').style.borderColor = "#CCC";
//    }
//    ;
//
//
//};
//
//function checkemptyfieldBIll() {
//    if ($.trim($('#bankLineId').val()) == '') {
//        alert('Input Bank is not valid');
//        document.getElementById('inputbankLine').style.borderColor = "red";
//        return false;
//    } else {
//        document.getElementById('inputbankLine').style.borderColor = "#CCC";
//    }
//
//};
//
//function checkemptyfieldBIll(pId) {
//    prevDbClick(pId);
//    if ($.trim($('#bankLineId').val()) == '') {
//        alert('Input Bank is not valid');
//        document.getElementById('inputbankLine').style.borderColor = "red";
//        return false;
//    } else {
//        document.getElementById('inputbankLine').style.borderColor = "#CCC";
//    }
//
//};
//
//
//function setRfqCreateBtn() {
//
//    var pLidC = 0;
//    var cLineId;
//    $('.rfqFlag').each(function () {
//        if ($(this).is(':checked')) {
//            pLidC = pLidC + 1;
//        }
//    });
//
//    if (pLidC == 0) {
//        $('#createRfqId').prop('disabled', true);
//    } else {
//        $('#createRfqId').prop('disabled', false);
//    }
//
//};
//
//
//function frmSub() {
//    window.onbeforeunload = null;
//    location.reload();
//}
//function chkAddReqRfqLineEmpty(p) {
//
//    var c = 0;
//    if ($.trim($('#inputpoReqHeaderId').val()) == '') {
//        c++;
//    }
//    if ($.trim($('#inputMasterItemidId').val()) == '') {
//        c++;
//    }
//    if ($.trim($('#inputdepartment').val()) == '') {
//        c++;
//    }
//
//    if ($.trim($('#inputcreatedBy').val()) == '') {
//        c++;
//    }
//
//    if (c == 4) {
//        alert('Atleast select One Parameter befor submit');
//        document.getElementById('inputreqNumber').style.borderColor = "red";
//        document.getElementById('inputMasterItem').style.borderColor = "red";
//        document.getElementById('inputdepartment').style.borderColor = "red";
//        document.getElementById('inputcreatedByUser').style.borderColor = "red";
//        return false;
//    }
//};
//
//
//function chkRfqSearchqEmpty() {
//    var c = 0;
//    if ($.trim($('#inputpoRfqHeaderId').val()) == '') {
//        c++;
//    }
//    if ($.trim($('#inputMasterItemidId').val()) == '') {
//        c++;
//    }
//    if ($.trim($('#inputsupplierLineName').val()) == '') {
//        c++;
//    }
//
//    if ($.trim($('#inputRfqStatus').val()) == '') {
//        c++;
//    }
//
//    if (c == 4) {
//        alert('Atleast select One Parameter befor submit');
//        document.getElementById('inputrfqNumber').style.borderColor = "red";
//        document.getElementById('inputitemCode').style.borderColor = "red";
//        document.getElementById('inputsupplierLineName').style.borderColor = "red";
//        document.getElementById('inputRfqStatus').style.borderColor = "red";
//        return false;
//    }
//};
//
//
//function chkQuotSearchqEmpty() {
//    var c = 0;
//    if ($.trim($('#inputId').val()) == '') {
//        c++;
//    }
//    if ($.trim($('#inputMasterItemidId').val()) == '') {
//        c++;
//    }
//    if ($.trim($('#inputsupplierLineName').val()) == '') {
//        c++;
//    }
//
//    if ($.trim($('#inputQuotStatus').val()) == '') {
//        c++;
//    }
//
//    if ($.trim($('#inputpoRfqHeader').val()) == '') {
//        c++;
//    }
//
//    if (c == 5) {
//        alert('Atleast select One Parameter befor submit');
//        document.getElementById('inputqtaNumber').style.borderColor = "red";
//        document.getElementById('inputitemCode').style.borderColor = "red";
//        document.getElementById('inputsupplierLineName').style.borderColor = "red";
//        document.getElementById('inputpoRfqHeaderNumber').style.borderColor = "red";
//        document.getElementById('inputQuotStatus').style.borderColor = "red";
//        return false;
//    }
//};
//
//function chkQuotAppSearchqEmpty() {
//    var c = 0;
//    if ($.trim($('#inputqtaId').val()) == '') {
//        c++;
//    }
//    if ($.trim($('#inputMasterItemidId').val()) == '') {
//        c++;
//    }
//    if ($.trim($('#inputsupplierLineName').val()) == '') {
//        c++;
//    }
//
//    if ($.trim($('#inputpoRfqHeader').val()) == '') {
//        c++;
//    }
//
//    if ($.trim($('#inputpoReqHeaderId').val()) == '') {
//        c++;
//    }
//
//    if (c == 5) {
//        alert('Atleast select One Parameter befor submit');
//        document.getElementById('inputqtaNumber').style.borderColor = "red";
//        document.getElementById('inputitemCode').style.borderColor = "red";
//        document.getElementById('inputsupplierLineName').style.borderColor = "red";
//        document.getElementById('inputpoRfqHeaderNumber').style.borderColor = "red";
//        document.getElementById('inputreqNumber').style.borderColor = "red";
//        return false;
//    }
//};
//
//
//function chkPoReqQtaSearchqEmpty() {
//    var c = 0;
//    if ($.trim($('#poReqHeader').val()) == '') {
//        c++;
//    }
//    if ($.trim($('#inputMasterItemidId').val()) == '') {
//        c++;
//    }
//    if ($.trim($('#inputdepartment').val()) == '') {
//        c++;
//    }
//
//    if ($.trim($('#inputsupplierLine').val()) == '') {
//        c++;
//    }
//
//    if ($.trim($('#inputpoQuotationHeader').val()) == '') {
//        c++;
//    }
//
//    if ($.trim($('#inputcreatedBy').val()) == '') {
//        c++;
//    }
//
//    if (c == 6) {
//        alert('Atleast select One Parameter befor submit');
//        document.getElementById('inputreqNumber').style.borderColor = "red";
//        document.getElementById('inputMasterItem').style.borderColor = "red";
//        document.getElementById('inputdepartment').style.borderColor = "red";
//        document.getElementById('inputsupplierLineName').style.borderColor = "red";
//        document.getElementById('inputqtaNumber').style.borderColor = "red";
//        document.getElementById('inputcreatedByUser').style.borderColor = "red";
//        return false;
//    }
//};

function AutocomFuncFm(purlval,  pgetvalue,pdisplayfield,pdbField, pgetDesc, pindc) {
    var urlval = purlval;//'/AYE/ACRC/SearchCodeComb/' + bSeg;
    var displayfield = pdisplayfield;//'#toAccountV';
    var getvalue = pgetvalue;//'concatedSegment';
    var getDesc = pgetDesc;//'siteAddress';
    var indc = pindc;//'segment2desc';

    autocomwithobject(urlval, getvalue, displayfield, pdbField, getDesc, indc);

};

//function quationLineApp(ele, lMode, lPageId, lTemltId, linvOrgId) {
//
//    var lineId1 = ele;
//
//    var lmod = lMode;
//    var lpId = lPageId;
//    var ltId = lTemltId;
//
//    var invOrgId = linvOrgId;
//    //alert('x');
//
//    var l_urlVal = '/AYE/quot/quotLineApprove/' + lmod + '/' + lpId + '/' + ltId + '/' + invOrgId;
//    var l_url = window.location.origin + l_urlVal;
//    $.post(l_url, $.param({lines: lineId1}, true), function (data) {
//        return true;
//    }).done(function () {
//        alert('Success!');
//        frmSub();
//    }).fail(function () {
//        alert('Error ')
//    });
//}
//
//function createPoFromReqQt(ele, lMode, lPageId, lTemltId, linvOrgId) {
//
//    var lineId1 = ele;
//
//    var lmod = lMode;
//    var lpId = lPageId;
//    var ltId = lTemltId;
//
//    var invOrgId = linvOrgId;
//    //alert('x');
//
//    var l_urlVal = '/AYE/procurment/createFromReqQuot/' + lmod + '/' + lpId + '/' + ltId + '/' + invOrgId;
//    var l_url = window.location.origin + l_urlVal;
//    $.post(l_url, $.param({lines: lineId1}, true), function (data) {
//        return true;
//    }).done(function () {
//        l_urlVal = '/AYE/procurment/poHeaderFromReq/' + lmod + '/' + lpId + '/' + ltId + '/' + invOrgId;
//        window.location.replace(window.location.origin + l_urlVal)
//        alert('Success!');
//        //frmSub();
//    }).fail(function (data) {
//        alert('Error ' + data.responseJSON.msg)
//    });
//
//}
//
//
//var lIndQt;
//var arr = [];
//function setCreateBtn(ele) {
//    var currentRow = $(ele).closest("tr");
//    var pLidC = 0;
//    var indBtn = 0;
//    var cLineId;
//    $('.selectFlg').each(function () {
//        if ($(this).is(':checked')) {
//            var curlIndQt;
//            var currentRow = $(this).closest("tr");
//            var lHdrId = currentRow.find(".c_headerId").html();
//
//            if (lHdrId != '') {
//                curlIndQt = true;
//            } else {
//                curlIndQt = false;
//            }
//
//            if (lIndQt == null || lIndQt == '') {
//                lIndQt = curlIndQt;
//            } else {
//                if (lIndQt != curlIndQt) {
//                    indBtn++;
//                    alert('Cannot Select Multiple Type.');
//                }
//                lIndQt = curlIndQt;
//            }
//            pLidC = pLidC + 1;
//        }
//    });
//    var n = arr.length;
//    var cVals = ele.value;
//    var dVal = 0;
//    var cVal = 0;
//
//    if (n != 0 && n > 0) {
//        $.each(arr, function (key, value) {
//            if (cVals == value) {
//                spl(key, arr);
//                dVal = 2;
//            } else {
//                cVal = 2
//            }
//        });
//
//    } else {
//        arr.push(ele.value);
//    }
//
//    if (dVal == 0 && cVal == 2) {
//        arr.push(ele.value);
//    }
//
//
//    if ((arr.length == 0) || (indBtn > 0)) {
//        $('#createPoId').attr("disabled", true);
//    } else {
//        $('#createPoId').removeAttr('disabled');
//    }
//
//}
//
//function spl(i, a) {
//    a.splice(i, 1);
//}




