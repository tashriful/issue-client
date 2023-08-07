$(function () {

    var relationSearchObj;

    //onPageLoad();
    //$('#inputhirearchyRelationType').on('change', function () {
    //
    //    onPageLoad();
    //});

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
            var indc = 'misHierarchyRelSupS';
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
    if (ind == 'misHierarchyRelCustSc') {
        $('#inputcustomerLineS').val(objparmV.id).trigger("change");
        $('#inputcustomerLineNameS').val(objparmV.name).trigger("change");

    }
    if (ind == 'misHierarchyRelSupS') {
        $('#inputsupplierLineS').val(objparmV.id).trigger("change");
        $('#inputsupplierLineNameS').val(objparmV.name).trigger("change");
    }
   if (ind == 'misHierarchyHierarchyStpS') {
        $('#inputhierchyStepIdS').val(objparmV.id).trigger("change");

    }

    if (ind == 'misHierarchyHierarchyStpValS') {
        $('#inputhierarchyStepValueIdS').val(objparmV.id).trigger("change");

    }

};
function autoComMis(purlval, pdisplayfield, pdbfield, pgetvalue, pindc, popt, pFocus) {
    var urlval = purlval;
    var displayfield = pdisplayfield;
    var dbfield = pdbfield;
    var getvalue = pgetvalue;
    var indc = pindc;
    var opt = popt;
    autocomwithobject(urlval, getvalue, displayfield, dbfield, opt, indc);
    $(pFocus).focus();
};


//function clearData() {
//    clearDataStep();
//    clearDataStepValue();
//}

