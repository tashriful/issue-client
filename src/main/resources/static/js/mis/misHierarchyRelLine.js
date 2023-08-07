$(function () {




    //$('#inputhierarchyStpTypeMain').on('change', function () {
    //
    //    clearData();
    //    onPageLoad();
    //});
    //alert('load')



    $('#inputhierarchyvalue').on('input', function () {
        if ($('#inputhierarchyvalue').val().length > 0) {
            var org = $('#inputorgHierarchy').val();
            var stpType = $('#inputhierarchyStpType').val();
            var urlval = '/AYE/ACRC/getOrgLowestHierarchy/' + org + '/' + stpType;


            //alert('urlval-' +urlval);

            var displayfield = '#inputhierarchyvalue';
            var dbfield = '#inputhierarchyid';
            //var getvalue = 'stepValue';
            var indc = 'lowestHierarchyVal';
            var opt = 'hierarchyStpType';
            autoComMis(urlval, displayfield, dbfield, indc, opt, '#inputhierarchyvalue')

        } else {
            $('#inputhierarchyid').val('');

        }
    });
});


function getvalfieldfn(gtvalobj){
    return gtvalobj.hierarchyStepValue.stepValue;
};


function selectedobj(value, ind) {
    var objparmV = value;
    if (ind == 'lowestHierarchyVal') {
        $('#inputhierarchyid').val(objparmV.id).trigger("change");
    }
}

function autoComMis(purlval, pdisplayfield, pdbfield, pindc, popt, pFocus) {
    var urlval = purlval;
    var displayfield = pdisplayfield;
    var dbfield = pdbfield;
       //alert(getvalue);
    var indc = pindc;
    var opt = popt;
    autoComWithObjectGtval(urlval, displayfield, dbfield, opt, indc);
    $(pFocus).focus();
}









