$(document).ready(function () {
    $('#departmentId').on('change', function () {
        var departmentId = $(this).val();


        // console.log(departmentId);

        var l_url = window.location.origin;
        $.ajax({
            url: '/ISSUE-TRACKER/employee/department/' + departmentId,
            type: "GET",
            success: function (data) {
                $('#employeeList').empty();
                $('#employeeList').append('<div class="radio">');
                $('#employeeList').append('<label for="assignedToUser">Assigned To :</label>');

                if (data.length > 0) {
                    $.each(data, function (index, employee) {
                        //     var listItem = $('<li>').text(employee.name);
                        //     $('#employeeList').append(listItem);
                        var radioBtn = $('<input>')
                            .attr('type', 'radio')
                            .attr('name', 'assignedToUser')
                            .attr('id', 'assignedToUser')
                            .attr('value', employee.id);
                        var label = $('<label style="margin-left: 2%">').text(employee.name);
                        var radioDiv = $('<div style="margin-left : 2%">').append(radioBtn, label);
                        $('#employeeList').append(radioDiv);
                    });


                } else {
                    var listItem = $('<li style="margin-left : 2%; color: red">').text('No employees found');
                    $('#employeeList').append(listItem);
                }
                $('#employeeList').append('</div>');
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
            }
        });
    });

    function validateForm() {
        // Get references to the input fields
        var summary = document.getElementById('summary');
        var description = document.getElementById('description');
        var departmentId = document.getElementById('departmentId');
        var assignedToUser = document.getElementById('assignedToUser');
        var ticketType = document.getElementById('ticketType');
        var priority = document.getElementById('priority');
        var status = document.getElementById('status');
        var targetResolutionDate = document.getElementById('targetResolutionDate');
        var errorMessage = document.getElementById('errorMessage');

        // Define error messages for each input field
        var errorMessages = {
            summary: 'Please enter a summary.',
            description: 'Please enter a description.',
            department: 'Please enter a department.',
            assignedTo: 'Please enter Assigned Employee.',
            ticketType: 'Please select a ticket type.',
            priority: 'Please select a priority.',
            status: 'Please select a status.',
            targetResolutionDate: 'Please enter a target resolution date.'
        };

        // Check if any of the required fields are empty or null
        if (summary.value.trim() === '') {
            showErrorMessage(errorMessages.summary);
            return false; // Prevent form submission
        }
        if (description.value.trim() === '') {
            showErrorMessage(errorMessages.description);
            return false;
        }
        if (departmentId.value.trim() === '') {
            showErrorMessage(errorMessages.department);
            return false;
        }
        if (assignedToUser.value.trim() === '') {
            showErrorMessage(errorMessages.assignedTo);
            return false;
        }
        if (ticketType.value.trim() === '') {
            showErrorMessage(errorMessages.ticketType);
            return false;
        }
        if (priority.value.trim() === '') {
            showErrorMessage(errorMessages.priority);
            return false;
        }
        if (status.value.trim() === '') {
            showErrorMessage(errorMessages.status);
            return false;
        }
        if (targetResolutionDate.value.trim() === '') {
            showErrorMessage(errorMessages.targetResolutionDate);
            return false;
        }

        // All fields are valid, hide the error message and allow form submission
        hideErrorMessage();
        return true;
    }

    function showErrorMessage(message) {
        var errorMessage = document.getElementById('errorMessage');
        errorMessage.innerText = message;
        errorMessage.style.display = 'block';
    }

    function hideErrorMessage() {
        var errorMessage = document.getElementById('errorMessage');
        errorMessage.style.display = 'none';
    }

});