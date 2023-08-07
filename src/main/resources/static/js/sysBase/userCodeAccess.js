$(function () {
    $('#inputaccessCodeType').on('change', function () {

        clearData();
        CodeTypeChangeEvent();

    })

    $('#inputaccessCodeLevel').on('change', function () {
        cleanLevelData();
        clearData();
        CodeLevelChangeEvent();
    });
    $('#inputorgHierarchyName').on('input', function () {
        if ($('#inputorgHierarchyName').val().length > 1) {
            var urlvals = '/AYE/ACRC/getOrgHierarchy/OU';
//                                        alert(urlvals);
            var displayfields = '#inputorgHierarchyName';
            var dbfields = '#inputorgHierarchy';
            var getvalues = 'code';
            var templates = 'name';
            var indc = 'uCodeAccOrg';

            autocomwithobject(urlvals, getvalues, displayfields, dbfields, templates, indc);
            $('#inputorgHierarchyName').focus();
        } else {
            $('#inputorgHierarchy').val('');
            $("#inputinventoryInformationsName").prop("disabled", true);
        }
    });

    $('#inputinventoryInformationsName').on('input', function () {
        if ($('#inputinventoryInformationsName').val().length > 1) {
            chkVal('inputorgHierarchy');
            var lOrgId = $('#inputorgHierarchy').val();
            var urlvals = '/AYE/ACRC/GetOrgInventory/' + lOrgId;
//                                        alert(urlvals);
            var displayfields = '#inputinventoryInformationsName';
            var dbfields = '#inputinventoryInformations';
            var getvalues = 'code';
            var templates = 'name';
            var indc = 'uCodeAccInvOrg';

            autocomwithobject(urlvals, getvalues, displayfields, dbfields, templates, indc);
            $('#inputinventoryInformationsName').focus();
        } else {
            $('#inputinventoryInformations').val('');
        }
    });

    $('#inputaccCodeCombinitions').on('input', function () {
        if ($('#inputaccCodeCombinitions').val().length > 1) {
            chkVal('inputorgHierarchy');
            var bSeg = $('#inputorgBalancingSegment').val();
            var kSeg = $('#inputkeySegmentHeader').val();

            var urlval = '/AYE/ACRC/SearchCodeCombNew/' + bSeg + '/' + $('#inputaccCodeCombinitions').val() + '/' + kSeg;
            //alert(urlval);
            var displayfield = '#inputaccCodeCombinitions';
            var dbfield = '#inputaccCodeCombId';
            var getvalue = 'concatedSegment';
            var templt = 'ccDesc';
            var indc = 'uCodeAccAccId';
            autocomwithobject(urlval, getvalue, displayfield, dbfield, templt, indc);
            $('#inputaccCodeCombinitions').focus();
        } else {
            $('#inputaccCodeCombId').val('');
        }

    });


    $('#inputbankLineName').on('input', function () {
        if ($('#inputbankLineName').val().length > 1) {
            chkVal('inputorgHierarchy');
            var org = $('#inputorgHierarchy').val();

            var urlval = '/AYE/ACRC/SearchSource/CM/' + org + '/' + $('#inputbankLineName').val();
            //alert(urlval);
            var displayfield = '#inputbankLineName';
            var dbfield = '#inputbankLineId';
            var getvalue = 'name';
            var indc = 'uCodeAccBankId';
            var opt = "accountNumber";
            autocomwithobject(urlval, getvalue, displayfield, dbfield, opt, indc);
            $('#inputbankLineName').focus();

        } else {

        }
    });

    $('#inputsupplierName').on('input', function () {
        if ($('#inputsupplierName').val().length > 1) {
            chkVal('inputorgHierarchy');
            var org = $('#inputorgHierarchy').val();
            var urlval = '/AYE/ACRC/SearchOrgSupplier/' + org + '/' + $('#inputsupplierName').val();
            //alert(urlval);
            var displayfield = '#inputsupplierName';
            var dbfield = '#inputsupplierLine';
            var getvalue = 'name';
            var indc = 'uCodeAccSup';
            var opt = "siteAddress";
            autocomwithobject(urlval, getvalue, displayfield, dbfield, opt, indc);
            $('#inputsupplierName').focus();

        } else {

        }
    });

    $('#inputcustomerName').on('input', function () {
        if ($('#inputcustomerName').val().length > 1) {
            chkVal('inputorgHierarchy');
            var org = $('#inputorgHierarchy').val();
            var urlval = '/AYE/ACRC/getCustomerLine/' + org + '/' + $('#inputcustomerName').val();
            //alert(urlval);
            var displayfield = '#inputcustomerName';
            var dbfield = '#inputcustomerLine';
            var getvalue = 'name';
            var indc = 'uCodeAccCust';
            var opt = "siteAddress";
            autocomwithobject(urlval, getvalue, displayfield, dbfield, opt, indc);
            $('#inputcustomerName').focus();

        } else {
            $('#inputcustomerLine').val('');
            $('#inputcustomerSiteAddress').val('');
        }
    });

    $('#inputsubinventoryCode').on('input', function () {
        if ($('#inputsubinventoryCode').val().length > 1) {
            chkVal('inputorgHierarchy');
            chkVal('inputinventoryInformations');
            var invOrg = $('#inputinventoryInformations').val();
            var urlval = '/AYE/ACRC/SearchSubInvByInvOrg/' + invOrg;
            //alert(urlval);
            var displayfield = '#inputsubinventoryCode';
            var dbfield = '#inputsubinventory';
            var getvalue = 'code';
            var indc = 'uCodeAccSubInv';
            var opt = "name";
            autocomwithobject(urlval, getvalue, displayfield, dbfield, opt, indc);
            $('#inputsubinventoryCode').focus();

        } else {
            $('#inputsubinventory').val('');
            //$('#inputsubinventoryCode').val('');
        }
    });


});

function selectedobj(value, ind) {
    if (ind == 'uCodeAccOrg') {
        $('#inputorgHierarchy').val(value.id).trigger('change');
        $('#inputorgBalancingSegment').val(value.segmentLine.code).trigger('change');
        $('#inputkeySegmentHeader').val(value.keySegmentHeader.id).trigger('change');
        $("#inputinventoryInformationsName").prop("disabled", false);
    }
    if (ind == 'uCodeAccInvOrg') {
        $('#inputinventoryInformations').val(value.id).trigger('change');
        $("#inputsubinventoryCode").prop("disabled", false);
    }
    if (ind == 'uCodeAccAccId') {
        $('#inputaccCodeCombId').val(value.id).trigger('change');
    }
    if (ind == 'uCodeAccBankId') {
        $('#inputbankLineId').val(value.id).trigger('change');
    }
    if (ind == 'uCodeAccSup') {
        $('#inputsupplierLine').val(value.id).trigger('change');
    }
    if (ind == 'uCodeAccCust') {
        $('#inputcustomerLine').val(value.id).trigger('change');
        $('#inputcustomerSiteAddress').val(value.siteAddress).trigger('change');
    }
  if (ind == 'uCodeAccSubInv') {
        $('#inputsubinventory').val(value.id).trigger('change');
        $('#inputsubinventoryName').val(value.name).trigger('change');
    }
};
$(document).ready(function () {
    CodeTypeChangeEvent();
    CodeLevelChangeEvent();

});





function chkVal(pElementId) {
    var pElementval = $('#' + pElementId).val();
    if (pElementval.length == 0) {
        alert('Invalid Information ')
        document.getElementById(pElementId + 'Name').style.borderColor = "red";
    }
}

function clearData() {
    $('#inputaccCodeCombinitions').val('');
    $('#inputaccCodeCombId').val('');
    $('#inputbankLineName').val('');
    $('#inputbankLineId').val('');
    $('#inputsupplierName').val('');
    $('#inputsupplierLine').val('');
    $('#inputcustomerLine').val('');
    $('#inputcustomerName').val('');
    $('#inputcustomerSiteAddress').val('');
    $('#inputsubinventory').val('');
    $('#inputsubinventoryCode').val('');

}

function cleanLevelData() {
    $('#inputorgHierarchy').val('');
    $('#inputorgHierarchyName').val('');
    $('#inputorgBalancingSegment').val('');
    $('#inputkeySegmentHeader').val('');
    $("#inputinventoryInformationsName").val('');
    $("#inputinventoryInformations").val('');

    //$( "#inputaccessCodeType" ).val(1);
    $('#inputaccessCodeType option:eq(0)').prop('selected', true);
    CodeTypeChangeEvent();
}

function CodeLevelChangeEvent()
{
    if ($('#inputaccessCodeLevel').val() == 'GLOBAL') {
        $('#inputorgHierarchyDiv').hide();
        $('#inputinventoryInformationsDiv').hide();
    } else if ($('#inputaccessCodeLevel').val() == 'ORG') {
        $('#inputorgHierarchyDiv').show();
        $('#inputinventoryInformationsDiv').hide();
    } else if ($('#inputaccessCodeLevel').val() == 'INV_ORG') {
        $('#inputorgHierarchyDiv').show();
        $('#inputinventoryInformationsDiv').show();
        if ($('#inputorgHierarchy').val().length > 0) {
            $("#inputinventoryInformationsName").prop("disabled", false);
        } else {
            $("#inputinventoryInformationsName").prop("disabled", true);
        }
    } else if ($('#inputaccessCodeLevel').val() == '') {
        $('#inputorgHierarchyDiv').hide();
        $('#inputinventoryInformationsDiv').hide();
    }
}
function CodeTypeChangeEvent() {
    if ($('#inputaccessCodeType').val() == 'ACCOUNT') {

        $('#inputaccCodeCombinitionsDiv').show();
        $('#inputbankLineDiv').hide();
        $('#inputsupplierLineDiv').hide();
        $('#inputcustomerLineDiv').hide();
        $('#inputsubinventoryDiv').hide();
    } else if ($('#inputaccessCodeType').val() == 'BANK') {
        $('#inputaccCodeCombinitionsDiv').hide();
        $('#inputbankLineDiv').show();
        $('#inputsupplierLineDiv').hide();
        $('#inputcustomerLineDiv').hide();
        $('#inputsubinventoryDiv').hide();

    } else if ($('#inputaccessCodeType').val() == 'SUPPLIER') {
        $('#inputaccCodeCombinitionsDiv').hide();
        $('#inputbankLineDiv').hide()
        $('#inputsupplierLineDiv').show();
        $('#inputcustomerLineDiv').hide();
        $('#inputsubinventoryDiv').hide();

    } else if ($('#inputaccessCodeType').val() == 'CUSTOMER') {
        $('#inputaccCodeCombinitionsDiv').hide();
        $('#inputbankLineDiv').hide()
        $('#inputsupplierLineDiv').hide();
        $('#inputcustomerLineDiv').show();
        $('#inputsubinventoryDiv').hide();

    } else if ($('#inputaccessCodeType').val() == 'SUBINVENTORY') {
        $('#inputaccCodeCombinitionsDiv').hide();
        $('#inputbankLineDiv').hide()
        $('#inputsupplierLineDiv').hide();
        $('#inputcustomerLineDiv').hide();
        $('#inputsubinventoryDiv').show();
        if ($('#inputinventoryInformations').val().length > 0) {
            $("#inputsubinventoryCode").prop("disabled", false);
        } else {
            $("#inputsubinventoryCode").prop("disabled", true);
        }


    } else if ($('#inputaccessCodeType').val() == '') {
        $('#inputaccCodeCombinitionsDiv').hide();
        $('#inputbankLineDiv').hide()
        $('#inputsupplierLineDiv').hide();
        $('#inputcustomerLineDiv').hide();
        $('#inputsubinventoryDiv').hide();
    }
}
