$(function () {
    var hierchyParamObj;
    if ($('#inputhierarchyStpTypeMain').val() == '' || $('#inputhierarchyStpTypeMain').val() == null) {

        clearData();

    }

    onPageLoad();
    $('#inputhierarchyStpTypeMain').on('change', function () {

        clearData();
        onPageLoad();
    });

    $('#inputhierchyStep').on('input', function () {
        if ($('#inputhierchyStep').val().length > 1) {
            var org = $('#inputorgHierarchy').val();
            var stpType = $('#inputhierarchyStpTypeMain').val();
            var urlval = '/AYE/ACRC/getorgHierchyStepByStpType/' + org + '/' + stpType;
            var displayfield = '#inputhierchyStep';
            var dbfield = '#inputhierchyStepId';
            var getvalue = 'stepName';
            var indc = 'misHierarchyHierarchyStp';
            var opt = "stepDetail";
            autoComMis(urlval, displayfield, dbfield, getvalue, indc, opt, '#inputhierchyStep')

        } else {

            $('#inputhierchyStepId').val('');
            $('#inputhierchyStepSl').val('');
            $('#inputhierchyParentStep').val('');
            $('#inputhierchyParentStepId').val('');
            onPageLoad();
        }
    });

    $('#inputhierarchyStepValue').on('input', function () {
        if ($('#inputhierarchyStepValue').val().length > 1) {
            var org = $('#inputorgHierarchy').val();
            var stpType = $('#inputhierarchyStpTypeMain').val();
            var stpId = $('#inputhierchyStepId').val();

            var urlval = '/AYE/ACRC/getorgHierchyStepValuesByStpTypeAndStp/' + org + '/' + stpType + '/' + stpId;
            var displayfield = '#inputhierarchyStepValue';
            var dbfield = '#inputhierarchyStepValueId';
            var getvalue = 'stepValue';
            var indc = 'misHierarchyHierarchyStpVal';
            var opt = null;
            autoComMis(urlval, displayfield, dbfield, getvalue, indc, opt, '#inputhierarchyStepValue')

        } else {
            $('#inputhierarchyStepValueId').val('');

        }
    });

    $('#inputhirechyParentStepValue').on('input', function () {
        if ($('#inputhirechyParentStepValue').val().length > 1) {
            var org = $('#inputorgHierarchy').val();
            var stpType = $('#inputhierarchyStpTypeMain').val();
            var stpId = $('#inputhierchyParentStepId').val();
            //var stpParentId = $('#inputhierchyParentStepId').val();

            var urlval = '/AYE/ACRC/getorgHierchyStepValuesByStpTypeAndStp/' + org + '/' + stpType + '/' + stpId;
            var displayfield = '#inputhirechyParentStepValue';
            var dbfield = '#inputhirechyParentStepValueId';
            var getvalue = 'stepValue';
            var indc = 'misHierarchyHierarchyParentStpVal';
            var opt = null;
            autoComMis(urlval, displayfield, dbfield, getvalue, indc, opt, '#inputhirechyParentStepValue')

        } else {
            $('#inputhirechyParentStepValueId').val('');

        }
    });
});


function selectedobj(value, ind) {
    var objparmV = value;
    if (ind == 'misHierarchyHierarchyStp') {
        $('#inputhierchyStepId').val(objparmV.id).trigger("change");
        $('#inputhierchyStep').val(objparmV.stepName).trigger("change");
        $('#inputhierchyStepSl').val(objparmV.stepSl).trigger("change");
        onPageLoad();
        clearDataStepValue();
        $('#inputhierchyParentStep').val(objparmV.parentStep.stepName).trigger("change");
        $('#inputhierchyParentStepId').val(objparmV.parentStep.id).trigger("change");
        if((objparmV.parentStep.id==null)||(objparmV.parentStep.id==''))
        {
            $('#inputhierchyParentStep').prop('readonly', true);
        }
    }
    if (ind == 'misHierarchyHierarchyStpVal') {
        $('#inputhierarchyStepValueId').val(objparmV.id).trigger("change");
        $('#inputhierarchyStepValue').val(objparmV.stepValue).trigger("change");
        //$('#inputhierchyStepSl').val(objparmV.stepSl).trigger("change");
        //$('#inputhierchyParentStep').val(objparmV.parentStep.stepName).trigger("change");
        if(($('#inputhierchyParentStepId').val()==null)||($('#inputhierchyParentStepId').val()==''))
        {
            $('#inputhirechyParent').prop('readonly', true);
            $('#inputhirechyParentStepValue').prop('readonly', true);

            //$('#inputhierchyParentStep').prop('readonly', true);
        }else
        {
            $('#inputhirechyParent').prop('readonly', false);
            $('#inputhirechyParentStepValue').prop('readonly', false);

        }

    }

    if (ind == 'misHierarchyHierarchyParentStpVal') {
        $('#inputhirechyParentStepValueId').val(objparmV.id).trigger("change");
        $('#inputhirechyParentStepValue').val(objparmV.stepValue).trigger("change");

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


function clearDataStepValue() {
    $('#inputhierarchyStepValueId').val('');
    $('#inputhierarchyStepValue').val('');
}


function onPageLoad() {


    if ($('#inputhierarchyStpTypeMain').val() == '' || $('#inputhierarchyStpTypeMain').val() == null) {
        $('#inputhierchyStep').prop('readonly', true);
        $('#inputhierarchyStepValue').prop('readonly', true);



    } else {
        $('#inputhierchyStep').prop('readonly', false);
        $('#inputhierarchyStepValue').prop('readonly', false);

    }

    if ($('#inputhierchyStepId').val() == '' || $('#inputhierchyStepId').val() == null) {
        $('#inputhierarchyStepValue').prop('readonly', true);
    } else {
        $('#inputhierarchyStepValue').prop('readonly', false);
    }


    if ($('#inputhierarchyStepValueId').val() == '' || $('#inputhierarchyStepValueId').val() == null) {
        $('#inputhirechyParent').prop('readonly', true);
        $('#inputhirechyParentStepValue').prop('readonly', true);
    } else {
        $('#inputhirechyParent').prop('readonly', false);
        $('#inputhirechyParentStepValue').prop('readonly', false);
    }
}