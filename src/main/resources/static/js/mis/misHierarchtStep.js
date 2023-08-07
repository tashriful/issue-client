$(function(){

    onPageLoad();
    $('#inputorgHierarchy').on('change',function(){
        $('#inputparentStepName').prop('readonly',false);
    });
    $('#inputparentStepName').on('input',function(){
        if($('#inputparentStepName').val().length>1)
        {
            var org = $('#inputorgHierarchy').val();
            var urlval = '/AYE/ACRC/getorgParentStep/' + org ;
            var displayfield = '#inputparentStepName';
            var dbfield = '#inputparentStep';
            var getvalue = 'stepName';
            var indc = 'misParentStepNamehierarchyStp';
            var opt = "hierarchyStpType";
            autoComMis(urlval,displayfield,dbfield,getvalue,indc,opt,'#inputparentStepName')

        }else
        {
            $('#inputparentStep').val('');
        }
    });
});


function selectedobj(value, ind) {
    var objparmV = value;
    if(ind=='misParentStepNamehierarchyStp')
    {
        $('#inputparentStep').val(objparmV.id).trigger("change");
        $('#inputparentStepSl').val(objparmV.stepSl).trigger("change");
    }
}
function autoComMis(purlval,pdisplayfield,pdbfield,pgetvalue,pindc,popt,pFocus)
{


    var urlval = purlval;
    var displayfield = pdisplayfield;
    var dbfield = pdbfield;
    var getvalue = pgetvalue;
    var indc = pindc;
    var opt = popt;
    autocomwithobject(urlval, getvalue, displayfield, dbfield, opt, indc);
    $(pFocus).focus();
}

function onPageLoad()
{
    if($('#inputorgHierarchy').val()==''||$('#inputorgHierarchy').val()==null)
    {
        $('#inputparentStepName').prop('readonly',true);
    }
}