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


});



function autocomDepartmentName() {
    var options = {
        url: '/ISSUE-TRACKER/departmentData',

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
        url: '/ISSUE-TRACKER/teamData',

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
        url: '/ISSUE-TRACKER/userData',

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
