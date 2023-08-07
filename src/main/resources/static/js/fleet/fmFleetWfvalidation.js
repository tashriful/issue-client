$(function(){
    $('#inputfleetMasterReg').on('input',function(){

        if($('#inputfleetMasterReg').val().length>1)
        {
            var lurl= '/AYE/ACRC/getFleetMaster'
            //var l_url = window.location.origin + lurl;
            //alert(lurl);
            var displayfield = '#inputfleetMasterReg';
            var dbfield = '#inputfleetMaster';
            var getvalue = 'regNumber';
            var indc = 'FlWfFleet';
            var opt = "serialNumber";
            AutocomFuncFm(lurl, getvalue, displayfield, dbfield,opt, indc);
            $('#inputfleetMasterReg').focus();
        }else
        {
            $('#inputfleetMaster').val("");
        }
    });

    $('#inputworkforceName').on('input',function(){
        if($('#inputworkforceName').val().length>1)
        {
            var lurl= '/AYE/ACRC/getWorkforce'
            //var l_url = window.location.origin + lurl;
            //alert(l_url);
            var displayfield = '#inputworkforceName';
            var dbfield = '#inputworkforce';
            var getvalue = 'name';
            var indc = 'FlWfWf';
            var opt = "workForceType";
            AutocomFuncFm(lurl, getvalue, displayfield, dbfield,opt, indc);
            $('#inputworkforceName').focus();
        }else
        {
            $('#inputworkforce').val("");
        }
    });

});

function selectedobj(value, ind) {
    if (ind == 'FlWfFleet') {
        $('#inputfleetMaster').val(value.id).trigger('change');

    }else if (ind=='FlWfWf')
    {
        $('#inputworkforce').val(value.id).trigger('change');
    }
}

function AutocomFuncFm(purlval,  pgetvalue,pdisplayfield,pdbField, pgetDesc, pindc) {
    var urlval = purlval;//'/AYE/ACRC/SearchCodeComb/' + bSeg;
    var displayfield = pdisplayfield;//'#toAccountV';
    var getvalue = pgetvalue;//'concatedSegment';
    var getDesc = pgetDesc;//'siteAddress';
    var indc = pindc;//'segment2desc';

    autocomwithobject(urlval, getvalue, displayfield, pdbField, getDesc, indc);

};

