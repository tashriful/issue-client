var linvOrgId;
var lDistId;
var litemCstId;
var lBomLineSubType;
$(function () {


    $('#modal-invItemCogsPercentDetailModal').on('hidden.bs.modal', function () {

        $('.invCogsPercentDetailTab').DataTable({
            stateSave: true,
            "bDestroy": true,
            paging: false,
            searching: false,
            bInfo: false
        });

    })


    $(window).on('show.bs.modal', function (e) {
        if ($.fn.DataTable.isDataTable('.invCogsPercentDetailTab')) {
            $('.invCogsPercentDetailTab').DataTable().destroy();
        }

        $('.invCogsPercentDetailTab tbody').empty();
        if (lBomLineSubType != null && linvOrgId != null) {
            var l_urlVal = '/AYE/InvFin/ItemCogsDistDtlModal/' + linvOrgId + '/' + litemCstId+ '/' + lDistId+ '/' + lBomLineSubType;

            getDTCogsPercent(l_urlVal);
        }
    });


    $('#tblDataLineInvCogsPercentDtl').on('click', '.detailC', function () {

        var row = $(this).closest('tr');
        lBomLineSubType = $(row).find('td').eq(0).html();
        linvOrgId = $('#inputInvOrgId').val();
        litemCstId = $('#inputInvItemCstId').val();
        lDistId = $('#inputId').val();
        $('#modal-invItemCogsPercentDetailModal').modal('show');


    });
});


function getDTCogsPercent(pUrl) {
    var l_url = window.location.origin + pUrl;
    var table = $('.invCogsPercentDetailTab').DataTable({
        "sAjaxSource": l_url,
        "sAjaxDataProp": "",
        "order": [[0, "asc"]],
        "aoColumns": [
            {"mData": "bomLineSubType"},
            {"mData": "masterItem.itemCode"},
            {"mData": "primaryQty"},
            {"mData": "uomCode"},
            {"mData": "amount"}
        ],
        paging: false,
        searching: false,
        bInfo: false
    });

};