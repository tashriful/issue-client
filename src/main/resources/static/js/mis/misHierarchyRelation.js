$(function () {

    var relationSearchObj;

    onPageLoad();
    onPageLoadSc();
    $('#inputhirearchyRelationType').on('change', function () {

        onPageLoad();
    });

    $('#inputhirearchyRelationTypeS').on('change', function () {

        onPageLoadSc();
    });

    $('#inputcustomerLineName').on('input', function () {
        if ($('#inputcustomerLineName').val().length > 1) {
            var org = $('#inputorgHierarchy').val();
            var urlval = '/AYE/ACRC/getCustomerLine/' + org + '/' + $('#inputcustomerLineName').val();
            var displayfield = '#inputcustomerLineName';
            var dbfield = '#inputcustomerLine';
            var getvalue = 'name';
            var indc = 'misHierarchyRelCus';
            var opt = "siteAddress";
            autoComMis(urlval, displayfield, dbfield, getvalue, indc, opt, '#inputcustomerLineName');


        } else {

            $('#inputcustomerLine').val('');
        }
    });

    $('#inputsupplierLineName').on('input', function () {
        if ($('#inputsupplierLineName').val().length > 1) {
            var org = $('#inputorgHierarchy').val();

            var urlval = '/AYE/ACRC/SearchOrgSupplier/' + org + '/' + $('#inputsupplierLineName').val();
            var displayfield = '#inputsupplierLineName';
            var dbfield = '#inputsupplierLine';
            var getvalue = 'name';
            var indc = 'misHierarchyRelSup';
            var opt = "siteAddress";
            //alert(urlval);
            autoComMis(urlval, displayfield, dbfield, getvalue, indc, opt, '#inputsupplierLineName')


        } else {
            $('#inputsupplierLine').val('');

        }
    });


    $('#inputcustomerLineNameS').on('input', function () {

        if ($('#inputcustomerLineNameS').val().length > 1) {
            //  alert('kkkkkk');
            var org = $('#inputorgHierarchy').val();
            var urlval = '/AYE/ACRC/getCustomerLine/' + org + '/' + $('#inputcustomerLineNameS').val();
            var displayfield = '#inputcustomerLineNameS';
            var dbfield = '#inputcustomerLineS';
            var getvalue = 'name';
            var indc = 'misHierarchyRelCustSc';
            var opt = "siteAddress";
            autoComMis(urlval, displayfield, dbfield, getvalue, indc, opt, '#inputcustomerLineNameS');


        } else {

            $('#inputcustomerLineS').val('');
        }
    });

    $('#inputsupplierLineNameS').on('input', function () {
        if ($('#inputsupplierLineNameS').val().length > 1) {
            //alert('dd');
            var org = $('#inputorgHierarchy').val();

            var urlval = '/AYE/ACRC/SearchOrgSupplier/' + org + '/' + $('#inputsupplierLineNameS').val();
            var displayfield = '#inputsupplierLineNameS';
            var dbfield = '#inputsupplierLineS';
            var getvalue = 'name';
            var indc = 'misHierarchyRelSupSc';
            var opt = "siteAddress";
            autoComMis(urlval, displayfield, dbfield, getvalue, indc, opt, '#inputsupplierLineNameS')


        } else {
            $('#inputsupplierLineS').val('');

        }
    });

    $('#inputhierchyStepS').on('input', function () {
        if ($('#inputhierchyStepS').val().length > 1) {
            var org = $('#inputorgHierarchy').val();
            var stpType = $('#inputhierarchyStpTypeS').val();
            var urlval = '/AYE/ACRC/getorgHierchyStepByStpType/' + org + '/' + stpType;
            var displayfield = '#inputhierchyStepS';
            var dbfield = '#inputhierchyStepIdS';
            var getvalue = 'stepName';
            var indc = 'misHierarchyHierarchyStpS';
            var opt = "stepDetail";
            autoComMis(urlval, displayfield, dbfield, getvalue, indc, opt, '#inputhierchyStepS')

        } else {

            $('#inputhierchyStepIdS').val('');
            //onPageLoad();
        }
    });


    $('#inputhierarchyStepValueS').on('input', function () {
        if ($('#inputhierarchyStepValueS').val().length > 1) {
            var org = $('#inputorgHierarchy').val();
            var stpType = $('#inputhierarchyStpTypeS').val();
            var stpId = $('#inputhierchyStepIdS').val();

            var urlval = '/AYE/ACRC/getorgHierchyStepValuesByStpTypeAndStp/' + org + '/' + stpType + '/' + stpId;
            var displayfield = '#inputhierarchyStepValueS';
            var dbfield = '#inputhierarchyStepValueIdS';
            var getvalue = 'stepValue';
            var indc = 'misHierarchyHierarchyStpValS';
            var opt = null;
            autoComMis(urlval, displayfield, dbfield, getvalue, indc, opt, '#inputhierarchyStepValueS')

        } else {
            $('#inputhierarchyStepValueIdS').val('');

        }
    });

});


function selectedobj(value, ind) {
    var objparmV = value;
    if (ind == 'misHierarchyRelCus') {
        $('#inputcustomerLine').val(objparmV.id).trigger("change");
        $('#inputcustomerLineName').val(objparmV.name).trigger("change");
        $('#inputcustomerLineAddress').val(objparmV.siteAddress).trigger("change");

    }
    if (ind == 'misHierarchyRelSup') {
        $('#inputsupplierLine').val(objparmV.id).trigger("change");
        $('#inputsupplierLineName').val(objparmV.name).trigger("change");
        $('#inputsupplierLineAddress').val(objparmV.siteAddress).trigger("change");
    }

    if (ind == 'misHierarchyRelCustSc') {
        $('#inputcustomerLineS').val(objparmV.id).trigger("change");
        $('#inputcustomerLineNameS').val(objparmV.name).trigger("change");

    }

    if (ind == 'misHierarchyRelSupSc') {
        $('#inputsupplierLineS').val(objparmV.id).trigger("change");
        $('#inputsupplierLineNameS').val(objparmV.name).trigger("change");
    }
    if (ind == 'misHierarchyHierarchyStpS') {
        $('#inputhierchyStepIdS').val(objparmV.id).trigger("change");

    }
    if (ind == 'misHierarchyHierarchyStpValS') {
        $('#inputhierarchyStepValueIdS').val(objparmV.id).trigger("change");

    }
}
function autoComMis(purlval, pdisplayfield, pdbfield, pgetvalue, pindc, popt, pFocus) {
    var urlval = purlval;
    var displayfield = pdisplayfield;
    var dbfield = pdbfield;
    var getvalue = pgetvalue;
    var indc = pindc;
    var opt = popt;
    autocomwithobject(urlval, getvalue, displayfield, dbfield, opt, indc);
    $(pFocus).focus();
}


function clearData() {
    clearDataStep();
    clearDataStepValue();
}


function clearDataStep() {
    $('#inputhierchyStepId').val('');
    $('#inputhierchyStep').val('');
    $('#inputhierchyStepSl').val('');
    $('#inputhierchyParentStep').val('');
    $('#inputhierchyParentStepId').val('');
    $('#inputhirechyParentStepValueId').val('');
    $('#inputhirechyParentStepValue').val('');

}


function clearDataSup() {
    $('#inputsupplierLineName').val('');
    $('#inputsupplierLine').val('');
    $('#inputsupplierLineAddress').val('');
}

function clearDataCus() {
    $('#inputcustomerLineName').val('');
    $('#inputcustomerLine').val('');
    $('#inputcustomerLineAddress').val('');
}

function clearDataSupSc() {
    $('#inputsupplierLineNameS').val('');
    $('#inputsupplierLineS').val('');

}

function clearDataCusSc() {
    $('#inputcustomerLineNameS').val('');
    $('#inputcustomerLineS').val('');
}


function onPageLoad() {


    if ($('#inputhirearchyRelationType').val() == '' || $('#inputhirearchyRelationType').val() == null) {
        $('#inputcustomerLineName').prop('readonly', true);
        $('#inputsupplierLineName').prop('readonly', true);
    } else if ($('#inputhirearchyRelationType').val() == 'C') {
        clearDataSupSc();
        $('#inputsupplierLineName').prop('readonly', true);
        $('#inputcustomerLineName').prop('readonly', false);
    } else if ($('#inputhirearchyRelationType').val() == 'S') {
        clearDataCusSc();
        $('#inputsupplierLineName').prop('readonly', false);
        $('#inputcustomerLineName').prop('readonly', true);
    }


}


function onPageLoadSc() {


    if ($('#inputhirearchyRelationTypeS').val() == '' || $('#inputhirearchyRelationTypeS').val() == null) {
        $('#inputcustomerLineNameS').prop('readonly', true);
        $('#inputsupplierLineNameS').prop('readonly', true);
    } else if ($('#inputhirearchyRelationTypeS').val() == 'C') {
        clearDataSupSc();
        $('#inputcustomerLineNameS').prop('readonly', false);
        $('#inputsupplierLineNameS').prop('readonly', true);
    } else if ($('#inputhirearchyRelationTypeS').val() == 'S') {
        clearDataCusSc();
        $('#inputcustomerLineNameS').prop('readonly', true);
        $('#inputsupplierLineNameS').prop('readonly', false);
    }


}