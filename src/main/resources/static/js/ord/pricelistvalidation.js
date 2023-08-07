var priceListSearchObj = null;
function callAutoComplite(url,getVal,display,description,indicator)
{
    autocomwithobject(url,getVal,display,null,description,indicator);
}
function selectedobj(value, ind) {
    if (ind == 'itemList') {
        itemObj(value);
    }
    else if (ind == 'Modal') {
        SearchObj(value);
    }
    else if (ind == 'priceUomConvList') {
        var puomValue=value;
        priceUomConvList(puomValue);

    }
};


function isglobalchange () {
    var x = document.getElementById('inputisGlobal').value;
    if (x == 1) {
        document.getElementById('inputorgHierarchyname').disabled = true;
        document.getElementById('inputorgHierarchyname').setAttribute("required", "");

    } else {
        document.getElementById('inputorgHierarchyname').disabled = false;
    }
};


function isglobalvalsetnfield()
{
   // alert('mmmmm');
    var nondb_globla = document.getElementById("inputisGlobal").value;
    //alert(nondb_globla);

    if (nondb_globla==0)
    {

        $("#inputisGlobalnondb").val("No");
    }
    else
    {$("#inputisGlobalnondb").val("Yes");}
};

function isglobalcontolorg()
{
    $("#inputisGlobal").ready(function () {
        var x = document.getElementById('inputisGlobal').value;
        if (x == 1) {
            document.getElementById('inputorgHierarchyname').disabled = true;
//                                            document.getElementById('inputorgHierarchyname').required  = true;
            document.getElementById('inputorgHierarchyname').setAttribute("required", "");
        } else {
            document.getElementById('inputorgHierarchyname').disabled = false;
//                                            document.getElementById('inputorgHierarchyname').required  = required;
        }
        });
};

function managefieldaftersavehdr(  pline) {
    if (pline > 0) {
        $('#inputisGlobalnondb').show();
        $('#inputisGlobal').hide();

        $('#inputorgHierarchynondb').show();
        $('#inputorgHierarchyname').hide();
    } else {
        $('#inputisGlobalnondb').hide();
        $('#inputisGlobal').show();

        $('#inputorgHierarchynondb').hide();
        $('#inputorgHierarchyname').show();
    }


};

function pricelistlinesearc() {
    input = document.getElementById("Searchdivn");
    filter = input.value.toUpperCase();
    //  alert(filter);
    var length = document.getElementsByClassName('sclass').length;

    for (i=0; i<length; i++){
        if(document.getElementsByClassName('sclass')[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
            document.getElementsByClassName("sclass")[i].style.display = "block";
        }
        else{
            document.getElementsByClassName("sclass")[i].style.display = "none";
        }
    }
}
