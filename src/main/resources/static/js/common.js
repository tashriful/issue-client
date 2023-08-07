/**
 * Created by Administrator on 3/4/2019.
 */
function afterSubmitBtn___()
{
    alert('xx');
    $('#'+btId).on('click', function(){
        $('#'+btId).hide();
    });
}
function prevDbClick(bI){
    var bid='#'+bI;
    //alert(bid);
    $(bid).hide();
    $(".submit-progress").removeClass("hidden");
}

function autocomForCommon(purlval,pdisplayfield,pdbfield,pgetvalue,ptemplt)
{
    var displayfield=pdisplayfield;
    var dbfield =pdbfield;
    var getvalue=pgetvalue;
    var templt = ptemplt;
    //                                    alert(urlval);
    autocomwithtemplate(purlval, getvalue, displayfield, dbfield, templt);

}

var clUrl = 'http://localhost:6214/AYEClient';
var ltmpId;
var lParam;

function getPrinterList() {
    $('#inputPrinter').empty().append('<option selected="selected" value="">Select One</option>');
    var lUrl = clUrl + '/getPrinters';
    //alert('x');
        $.ajax({
        url: lUrl,
    }).then(function (data) {
        $.each(data, function (index, value) {
            //$('#inputPrinter').append('<option value="">' + value.printerName + '</option>');
            $('#inputPrinter').append('<option value="">' + value.printerName + '</option>');
//                                            alert( index + ": " + value.printerName );
        });
    });

};

function printCmd(pName) {
    //var prParam =['printerName':pName];
    var x =[];
    var lUrl = clUrl + '/reqToServer';
    var lItmpId = ltmpId;
    var lIaurg = lParam;
    var lprintr ={printerName:pName};
    x.push(lprintr);
    var model = {"type":"REPORT",
        "tempId":ltmpId,
        "params":lParam,
        "printers":{
            printerName: pName
        },
        "printersName":pName,
        "printerList" : x
    };
        console.log(JSON.stringify(model));
    //model['printerList[0].printerName'] = lprintr;
    var pData = {
        'type': 'REPORT',
        'tempId': ltmpId,
        'params': lParam,
        'printersName': pName
    };
    var data = model;
    //$.post(lUrl, data);
    console.log(JSON.stringify(data));
    $.ajax({
        type : "POST",
        url: lUrl,
        contentType : "application/json",
        data : JSON.stringify(data),
        dataType : 'json'
    })
    $('#modal-printer').modal('hide');


}


function fieldvisivlityModal(pfieldindex)
{
    var vSource = document.getElementById('idl' +pfieldindex).value;
    var sourceDiv = pfieldindex + 'div2';
    var subAccDiv = pfieldindex + 'div3';
    if (vSource == 'NONE') {
        document.getElementById(sourceDiv).style.display = 'none';
        document.getElementById(subAccDiv).style.display = 'none';
    }else if (vSource == 'SUBACC') {
        document.getElementById(sourceDiv).style.display = 'none';
        document.getElementById(subAccDiv).style.display = 'block';
    }

    else if (vSource == '') {
        document.getElementById(sourceDiv).style.display = 'none';
        document.getElementById(subAccDiv).style.display = 'none';
    }
    else {
        document.getElementById(sourceDiv).style.display = 'block';
        document.getElementById(subAccDiv).style.display = 'none';
    }
};


function searchOnTable(p) {
//            alert('x');
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput"+p);
    filter = input.value.toUpperCase();
    table = document.getElementById("resultTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[p];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
};


function getOrgDefaultPayterms(pUrl,pIdFld,pValFld)
{
    var l_urls=window.location.origin+pUrl;
    //alert(l_urls);
    $.get(l_urls,  // url
    function (data, textStatus, jqXHR) {  // success callback
        //alert('status: ' + textStatus + ', data:' + data.termsName+' '+data.id);
        $(pIdFld).val(data.id);
        $(pValFld).val(data.termsName);
    }).fail(function(e){
        //alert("fail"+e);
    });

};


