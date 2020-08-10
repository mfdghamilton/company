
let locations = [];
let departments = [];
let employees = [];

$(document).ready(function () {

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });

    $('#populate').delay(2000).show(0);

    $.ajax({
        type:'GET',
        url:`libs/php/getLocation.php`,
        success: function(response){
            for (i=0; i<response.data.length; i++){
                locations.push(response.data[i]);
            }
        }
    });
    $.ajax({
        type:'GET',
        url:`libs/php/getDepartments.php`,
        success: function(response){
            for (i=0; i<response.data.length; i++){
                departments.push(response.data[i]);

                var newOpt = document.createElement('option');
                newOpt.innerHTML = response.data[i].id + '. ' + response.data[i].name;
                var dropDown = document.getElementById("department");
                dropDown.appendChild(newOpt);
            }
        }
    });
    $.ajax({
        type:'GET',
        url:`libs/php/getPersonnel.php`,
        success: function(response){
            for (i=0; i<response.data.length; i++){
                employees.push(response.data[i]);
            }
        }
    });

    setTimeout(function generateID(){
        var newIdDiv = document.createElement("div");
        newIdDiv.innerHTML = `<input id='id' name='id' value=${employees.length + 1} disabled>`;
        var inputDiv = document.getElementById("inputData"); 
        inputDiv.appendChild(newIdDiv);
    }, 2000);

});

function populateCards(){
    for (i=0; i<employees.length; i++){
        let firstName = employees[i].firstName;
        let id = employees[i].id;
        let lastName = employees[i].lastName;
        let email = employees[i].email;
        
        let departmentID = employees[i].departmentID-1;
        let department = departments[departmentID]

        let locationID = [department.locationID-1]
        let location = locations[locationID]

        var newDiv = document.createElement("div");
        newDiv.id = 'card'
        newDiv.innerHTML = `<form><b>Name:</b> ${firstName} ${lastName} <b>id:</b>${id}<br/> 
        <b>Email:</b>${email} <br/>
        <b>Department:</b> ${department.name} <br/><b>Location:</b> ${location.name} <br/>
        <button class="btn btn-secondary" onclick="editContact(); return false">Edit</button>
        <button type='submit' class="btn btn-secondary" onclick="deleteContact(${id}); return false">Delete</button></form>`;  
        var currentDiv = document.getElementById("list"); 
        currentDiv.appendChild(newDiv);

    }
    $('#populate').hide();
}

function deleteContact(emp_id) {
    $.ajax({
        type:'POST',
        url:'libs/php/deletePersonnel.php',
        data: [emp_id],
        success: function(result){
            console.log(emp_id)
            },
            error: function(jqXHR, textStatus, errorThrown){
                console.log(errorThrown)
            }
    });
}

function addContact() {
    $.ajax({
        type:'POST',
        url:'libs/php/addPersonnel.php',
        data: [firstName, lastName, email, department, id],
        success: function(result){
            console.log(id)
            },
            error: function(jqXHR, textStatus, errorThrown){
                console.log(errorThrown)
            }
    });
}

function editContact(){
    console.log('edit')
}

function updateContact() {
    console.log('update')
}

