function exportTableToExcel(tableID, filename ){
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tableID);
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

    // Specify file name
    filename = filename?filename+'.xls':'excel_data.xls';

    // Create download link element
    downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if(navigator.msSaveOrOpenBlob){
        var blob = new Blob(['\ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob( blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

        // Setting the file name
        downloadLink.download = filename;

        //triggering the function
        downloadLink.click();
    }
}

function ExportFile() {
    var fileName = $("#exportFileName").val();
    if (fileName.substr(-5, 5) !== '.xlsx') {
        fileName += '.xlsx';
    }
    var json = JSON.stringify(workbook.toJSON());

    excelIO.save(json, function (blob) {
        saveAs(blob, fileName);
    }, function (e) {
        if (e.errorCode === 1) {
            alert(e.errorMessage);
        }
    });
}