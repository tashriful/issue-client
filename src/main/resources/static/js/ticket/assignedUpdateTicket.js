$(document).ready(function () {

  var checkDepartmentId = setInterval(function () {
    var departmentId = $('#departmentId').val();
    console.log(departmentId)

    // Check if departmentId has a value
    if (departmentId) {
      clearInterval(checkDepartmentId); // Stop checking

      var l_url = window.location.origin;
      console.log(l_url);
      $.ajax({
        url: '/AYE/employee/department/' + departmentId,
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
    }
  }, 100);

});