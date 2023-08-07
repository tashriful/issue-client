/**
 * Created by Toufiq on 1/2/2021.
 */

$(function () {
    var varstpName = '';
    var varCstComponent = '';
    var lAccCodeCombinitions = "";
    var refUrl = '';
    var vardisType='';


    $("#inputstapeName").change(function () {
        varstpName = this.value;
        //alert(varstpName);

        if (varstpName == 'RECEIVING') {
            $('#inputpoRcvHeaderDiv').show();


        } else {
            $('#inputpoRcvHeaderDiv').hide();

        }

    })

    $("#inputinvCstComponent").change(function () {
        varCstComponent = ($(this.options[this.selectedIndex]).attr('data-Code'));
        lAccCodeCombinitions = ($(this.options[this.selectedIndex]).attr('data-accCodeCombinitions'));
        if ((lAccCodeCombinitions != null || lAccCodeCombinitions != '') && (varCstComponent == 'OVH')) {
            $('#inputsubAccSourceNameDiv').show();
            refUrl = '/AYE/ACRC/SearchGlSubAccSource/' + lAccCodeCombinitions + '/' + lOrgId + '/' + 'NONE';
            //alert(urlval);
        } else {
            $('#inputsubAccSourceNameDiv').hide();
        }

    })

    $("#inputcostAdjReasonCode").change(function () {
        vardisType = ($(this.options[this.selectedIndex]).attr('data-dispType'));

        if (vardisType == 1) {
            $('#inputAmount').attr('readonly', false);
            $('#inputcost').attr('readonly', true);

        } else if (vardisType == 2) {
            $('#inputAmount').attr('readonly', true);
            $('#inputcost').attr('readonly', false);

        } else {
            $('#inputcost').attr('readonly', false);
            $('#inputAmount').attr('readonly', true);
            $('#inputpoRcvHeaderDiv').hide();
        }
    })

    $(document).ready(function () {
        var varstpName = $('#inputstapeName').val();
        varCstComponent = $("#inputinvCstComponent option:selected").attr('data-Code');
        lAccCodeCombinitions = $("#inputinvCstComponent option:selected").attr('data-accCodeCombinitions');
        vardisType  = $("#inputcostAdjReasonCode option:selected").attr('data-dispType');

        if (varstpName == 'RECEIVING') {
            $('#inputpoRcvHeaderDiv').show();
            $('#inputcost').value=$('#inputAmount').value;


        } else {
            $('#inputpoRcvHeaderDiv').hide();
        }

        if ((lAccCodeCombinitions != null || lAccCodeCombinitions != '') && (varCstComponent == 'OVH')) {
            $('#inputsubAccSourceNameDiv').show();
            refUrl = '/AYE/ACRC/SearchGlSubAccSource/' + lAccCodeCombinitions + '/' + lOrgId + '/' + 'NONE';
            //alert(urlval);
        } else {
            $('#inputsubAccSourceNameDiv').hide();
        }

        if (vardisType == 1) {
            $('#inputAmount').attr('readonly', false);
            $('#inputcost').attr('readonly', true);

        } else   if (vardisType == 2) {
            $('#inputAmount').attr('readonly', true);
            $('#inputcost').attr('readonly', false);

        } else {
            $('#inputAmount').attr('readonly', true);
            $('#inputcost').attr('readonly', false);
            $('#inputpoRcvHeaderDiv').hide();
        }
    })


    document.getElementById('inputrcvNumber').oninput = function () {
        var innerVar = document.getElementById('inputrcvNumber').value;

        if (innerVar.length > 2) {
            document.getElementById('inputpoRcvHeader').value = '';


            var displayfieldfrom = [['#inputrcvNumber']];

            var locInvOrg = document.getElementById('inputinvOrg').value;
            var indcRcv = 'ItmStpCstRcv';
            var rcvNumUrl = "/AYE/ACRC/SearchRcvNumberByInvOrg/" + locInvOrg;
            autocomwithobject(rcvNumUrl, 'rcvNumber', '#inputrcvNumber', null, 'rcvDate', 'ItmStpCstRcv');
            document.getElementById('inputrcvNumber').focus();
        }
    };

    document.getElementById('inputItemCode').oninput = function () {

        var itmCode = document.getElementById('inputItemCode').value;
        if (itmCode.length > 1) {

            var lInvOrg = document.getElementById('inputinvOrg').value;

            var itemUrl;
            if (varstpName == 'RECEIVING') {
                var lPoRcvId = document.getElementById('inputpoRcvHeader').value;
                itemUrl = '/AYE/ACRC/SearchRcvLineByHeader/' + lPoRcvId;

            } else {
                itemUrl = '/AYE/ACRC/SearchOrgItemCode/' + lInvOrg + '/' + itmCode;
            }


//                                            alert(itemUrl);
            autocomwithobject(itemUrl, 'itemCode', '#inputItemCode', null, 'description', 'CstAdjItem');
            document.getElementById('inputItemCode').focus();
        }
    }

    document.getElementById('inputsubAccSourceName').oninput = function () {

        var itmCode = document.getElementById('inputsubAccSourceName').value;
        if (itmCode.length > 1) {
            autocomwithobject(refUrl, 'subAccSourceName', '#inputsubAccSourceName', null, 'subAccSource', 'CstAdjRefName');
            document.getElementById('inputsubAccSourceName').focus();
        }
    }


    document.getElementById('inputAmount').oninput=function(){
        $('#inputcost').val(document.getElementById('inputAmount').value);
    };


});

