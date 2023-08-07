$(function(){


    onPageLoad();
    $('#inputorgHierarchy').on('change',function(){
        onPageLoad();
    });
    $('#inputhierarchyStpType').on('change',function(){
        onPageLoad();
    });
    $('#inputhierchyStep').on('input',function(){
        if($('#inputhierchyStep').val().length>1)
        {
            var org = $('#inputorgHierarchy').val();
            var stpType = $('#inputhierarchyStpType').val();
            var urlval = '/AYE/ACRC/getorgHierchyStepByStpType/' + org +'/'+stpType;
            var displayfield = '#inputhierchyStep';
            var dbfield = '#inputhierchyStepId';
            var getvalue = 'stepName';
            var indc = 'misParentStepNamehierarchyStpVal';
            var opt = "stepDetail";
            autoComMis(urlval,displayfield,dbfield,getvalue,indc,opt,'#inputhierchyStep')

        }else
        {
            $('#inputhierchyStepId').val('');
        }
    });
});


function selectedobj(value, ind) {
    var objparmV = value;
    if(ind=='misParentStepNamehierarchyStpVal')
    {
        $('#inputhierchyStepId').val(objparmV.id).trigger("change");
        $('#inputhierchyStep').val(objparmV.stepName).trigger("change");
        $('#inputhierchyStepSl').val(objparmV.stepSl).trigger("change");
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
        $('#inputhierchyStep').prop('readonly',true);
    }else
    {
        $('#inputhierchyStep').prop('readonly',false);
    }
    if($('#inputhierarchyStpType').val()==''||$('#inputhierarchyStpType').val()==null)
    {
        $('#inputhierchyStep').prop('readonly',true);
    }else
    {
        $('#inputhierchyStep').prop('readonly',false);
    }


}