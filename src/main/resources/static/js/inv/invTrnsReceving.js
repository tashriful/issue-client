/**
 * Created by DOLPHIN on 11/23/2019.
 */


    $("#inputfromSubinventory").change(function () {
//                                            alert('y');
        var varSubinvLocConfrom = ($(this.options[this.selectedIndex]).attr('data-locConfrom'));

        if (varSubinvLocConfrom== "false") {
//                                                alert(varSubinvLocCon);
            document.getElementById('fromLocator').readOnly = true;
            document.getElementById("fromLocator").value = "";
        } else {
            document.getElementById('fromLocator').readOnly = false;
        }
    })


