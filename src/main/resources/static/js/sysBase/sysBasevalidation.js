function checkemptyfield() {

    var lparamData = document.getElementById('execParams').children;
    for (var i = 0; i < lparamData.length; i++) {
        var id = i + 1;
        var x = document.getElementById('id' + id).value;
        var y = document.getElementById('dataType' + id).value;
        var d = document.getElementById('value' + id).value;
        var r=document.getElementById('req' + id).value;
        //alert(id);
       // alert("X"+x + " Y" + y + " D" + d+" R"+r);
        if (y == "Date") {
            if(r=='true') {

                if (d == "" || d == null)

                  {
                    //document.getElementById('id'+id).style.borderColor = "red";
                    document.getElementById('value' + id).style.borderColor = "red";
                  //  alert('Y');
                    return false;
                }
            }
        } else {

            if(r=='true') {
                if (x == "" || x == null) {
                    //document.getElementById("execParams").children[i].style.backgroundColor = "gray";
                    document.getElementById('value' + id).style.borderColor = "red";
                    //document.getElementById("execParams").children[i].style.backgroundColor = "yellow";
                    return false;
                }
            }

        }

    }
}

