$(document).ready(function () {
    $('#inputImageId').click(function () {
        var id = $('#fileId').text();
        console.log(id);
        var l_url = window.location.origin;
        console.log(l_url);
        $.ajax({
            url: '/AYE/ticket/downloadImage/'+ id,
            type: "GET",
            success : function (data, status, xhr) {
                if(data.length > 0){
                    var contentType = xhr.getResponseHeader("Content-Type");
                    console.log(contentType)
                    var imageUrl = "data:"+contentType+";base64," + data;
                    // $("#imageElement").attr("src", imageUrl);
                    var modalHtml = '<div class="modal fade" tabindex="-1" role="dialog">' +
                        '<div class="modal-dialog" role="document">' +
                        '<div class="modal-content">' +
                        '<div class="modal-header">' +
                        '<span>Ticket Image</span>'+
                        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                        '<span aria-hidden="true">&times;</span>' +
                        '</button>' +
                        '</div>' +
                        '<div class="modal-body">' +
                        '<img class="img-rounded" style="width: 100%" src="' + imageUrl + '" alt="Ticket Image">' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';

                    // Append the modal HTML to the document body
                    $(modalHtml).appendTo("body");

                    // Show the modal
                    $(".modal").modal("show");

                    $(".modal").modal({
                        backdrop: "static",
                        keyboard: false
                    }).on("hidden.bs.modal", function() {
                        $(this).remove(); // Remove the modal from the DOM when it's closed
                    });


                    // Resize the image to match the modal dimensions
                }
                else {
                    console.log("No data")
                }

            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
            }

        })
    })
});