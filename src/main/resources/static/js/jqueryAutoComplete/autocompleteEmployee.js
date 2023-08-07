$(function () {

    $('#department').on('input',function (){
        // console.log($('#department').val());
        autocomDepartmentName();
        $('#department').focus();
    })

    $('#team').on('input', function () {
        autocomTeamData()
        $('#team').focus();
    })

    $('#user').on('input', function () {
        autocomUserData()
        $('#user').focus();
    })


    // $(document).ready(function (){
    //     console.log("Load");
    //     $('#department').on('input',function (){
    //         // console.log($('#department').val());
    //         autocom();
    //         $('#department').focus();
    // })

});



function autocomDepartmentName() {
    var options = {
        url: 'http://localhost:9090/AYE/departmentData',

        getValue: 'name',
        minCharNumber: 2,

        requestDelay: 100,


        list: {


            onSelectItemEvent: function () {
                var value = $("#department").getSelectedItemData().id;
                $("#departmentId").val(value).trigger("change");
            },
            match: {
                enabled: true
            }
        }
    };
    console.log("running")

    $('#department').easyAutocomplete(options);
}

function autocomTeamData(){
    var optionsTeam = {
        url: '/AYE/teamData',

        getValue: 'name',
        minCharNumber: 2,

        requestDelay: 100,

        list: {


            onSelectItemEvent: function () {
                var value = $("#team").getSelectedItemData().id;
                console.log(value);
                $("#teamId").val(value).trigger("change");
            },
            match: {
                enabled: true
            }
        }
    };

    $('#team').easyAutocomplete(optionsTeam);
}

function autocomUserData(){
    console.log("running");
    var optionsUser = {
        url: '/AYE/userData',

        getValue: 'name',
        minCharNumber: 2,

        requestDelay: 100,

        list: {


            onSelectItemEvent: function () {
                var value = $("#user").getSelectedItemData().id;
                console.log(value);
                $("#userId").val(value).trigger("change");
            },
            match: {
                enabled: true
            }
        }
    };

    $('#user').easyAutocomplete(optionsUser);
}



















//
//
// // Define the function to handle the autocompletion
// function autocom() {
//     // Get the input value
//     var inputValue = $('#department').val();
//
//     // Options for EasyAutocomplete
//     var options = {
//         // Add your desired options here
//         // For example:
//         data: ['Department 1', 'Department 2', 'Department 3'], // Replace with your own department data source
//         placeholder: 'Enter Department Name...',
//         getValue: 'text',
//         list: {
//             match: {
//                 enabled: true
//             }
//         }
//     };
//
//     // Apply EasyAutocomplete to the "department" input field
//     $('#department').easyAutocomplete(options);
// }
//
// // Initialize EasyAutocomplete when the document is ready
// $(document).ready(function() {
//     autocom(); // Call the autocom function to set up the initial autocompletion
// });
//
//
// // function autocom() {
// //         var options = {
// //         url: 'http://localhost:9090/departmentData',
// //
// //         getValue: 'name',
// //         minCharNumber: 2,
// //
// //         requestDelay: 100,
// //
// //
// //         list: {
// //
// //
// //             onSelectItemEvent: function () {
// //                 var value = $("#department").getSelectedItemData().id;
// //                 console.log(value);
// //                 $("#departmentId").val(value).trigger("change");
// //             },
// //             match: {
// //                 enabled: true
// //             }
// //         }
// //     };
// //     console.log("running")
// //
// //     $('#departmentId').easyAutocomplete(options);
// // }
//
//
//
// // $(document).ready(function() {
// //     var options = {
// //         url: 'http://localhost:9090/departmentData',
// //
// //         getValue: 'name',
// //         minCharNumber: 2,
// //
// //         requestDelay: 100,
// //
// //         list: {
// //
// //
// //             onSelectItemEvent: function () {
// //                 var value = $("#department").getSelectedItemData().id;
// //                 console.log(value);
// //                 $("#departmentId").val(value).trigger("change");
// //             },
// //             match: {
// //                 enabled: true
// //             }
// //         }
// //     };
// //
// //     $('#departmentId').easyAutocomplete(options);
// //
// //

// //
// //
// //
// // });