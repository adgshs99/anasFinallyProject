function onInit(){
    console.log("ready");
    getEmployees()
    getDateToday()
    setInterval(() => {
        getHourNow()
    }, 1000);
    
    
}

document.addEventListener("DOMContentLoaded", function() {
    let tabs = document.querySelectorAll('.nav-link');
    
    tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            // הסר את ה-active מכל הטאבים
            tabs.forEach(t => t.classList.remove('active'));
            
            // הוסף את ה-active לטאב שנלחץ
            this.classList.add('active');
            
            // הסתר את כל התוכן של הטאבים
            document.querySelector('.tab01').style.display = 'none';
            document.querySelector('.tab02').style.display = 'none';
            document.querySelector('.tab03').style.display = 'none';
            
            // הצג את התוכן המתאים לטאב שנלחץ
            let contentId = this.getAttribute('data-tab');
            document.querySelector('.' + contentId).style.display = 'block';
        });
    });
});

// employees

var employees = [];
var employeesToShow = employees;

function getEmployees(){
    fetch('http://localhost:3000/employees')
     .then(response => response.json())
     .then(data => {
         employees = data.data;
         console.log(employees); // כאן תוכל לראות את הנתונים שהוחזרו
         employeesToShow = employees;
         renderEmployees()
         renderEmployeesSelect()
         getAttendances()
     
     })
     .catch(error => {
         console.error('There was an error fetching the data', error);
     });
 }

var currEmployee = {}

function renderEmployees(){
    employeesToShow = employees;
    const eEmployeesRows = document.getElementById("employeesRows");
    let html = "";
    employeesToShow.forEach(function(employee, index){
        html += `<tr>
                    <td>${index+1}</td>                    
                    <td>${employee.firstName}</td>
                    <td>${employee.lastName}</td>
                    <td>${employee.identityNum}</td>
                    <td>
                        <button class="btn btn-success" onclick="toEditEmployee(${employee.id})" data-bs-toggle="modal"
                        data-bs-target="#modalEdit">ערוך</button>
                        <button class="btn btn-danger" onclick="toDeleteEmployee(${employee.id})" data-bs-toggle="modal"
                        data-bs-target="#modalDelete">מחק</button>
                    </td>
                </tr>`;
    });
    eEmployeesRows.innerHTML = html;
}

function addEmployee(){    
    let newEmployee = {
        id: makeRandomId(9),
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        identityNum: document.getElementById("identityNum").value
    };
    // console.log('newEmployee', newEmployee);
    // employees.unshift(newEmployee);
    addEmployeeToServer(newEmployee).then(() => {
        // המקום שבו תרצה להוסיף קוד משלך:
        // TODO: הוסף כאן את הקוד שלך...
  
        getEmployees(); // לאחר ההוספה, קריאה שוב לרשימת העובדים מהשרת
        renderEmployees()
    });
}

function addEmployeeToServer(employee) {
    return fetch('http://localhost:3000/add-employee', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Failed to add the employee.");
        }
    })
    .then(data => {
        console.log(data);
        getEmployees()
    })
    .catch(error => {
        console.error('There was an error adding the employee:', error);
    });
  }



function makeRandomId(length){
    let text = "";
    let possible = "1234567890";
    for(let i=0; i<length; i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function toDeleteEmployee(id){
    for(let i=0; i<employeesToShow.length; i++){
        if(employeesToShow[i].id == id){
            currEmployee = employeesToShow[i];
            break;
        }
    }
    console.log('currEmployee', currEmployee);
    let eFullNameEmployee = document.getElementById("fullNameEmployee");
    eFullNameEmployee.innerHTML = currEmployee.firstName + " " + currEmployee.lastName;
}

function toEditEmployee(id){
    for(let i=0; i<employeesToShow.length; i++){
        if(employeesToShow[i].id == id){
            currEmployee = employeesToShow[i];
            break;
        }
    }
    console.log('currEmployee', currEmployee);
    let eFirstName = document.getElementById("firstNameE");
    eFirstName.value = currEmployee.firstName;
    let eLastName = document.getElementById("lastNameE");
    eLastName.value = currEmployee.lastName;
    let eIdentityNum = document.getElementById("identityNumE");
    eIdentityNum.value = currEmployee.identityNum;
}

function deleteEmployee(){    
    fetch(`http://localhost:3000/employee/${currEmployee.id}`, {
        method: 'DELETE',
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          getEmployees();
          renderEmployees();
          renderEmployeesSelect();          
        } else {
          console.error("Error deleting employee:", data.message);
        }
      });
    
}

function editEmployee(){  
    let employeeToUpdate = {
        id: currEmployee.id,
        firstName: document.getElementById("firstNameE").value,
        lastName: document.getElementById("lastNameE").value,
        identityNum: document.getElementById("identityNumE").value
    };
    updateEmployeeByServer(employeeToUpdate)
        
    
}

function updateEmployeeByServer(employeeUpdated) {
    fetch(`http://localhost:3000/employee/${employeeUpdated.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(employeeUpdated)
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          getEmployees();          
          renderEmployees();
          renderEmployeesSelect();
        } else {
          console.error('Failed to update employee:', data.message);
        }
      })
      .catch(error => {
        console.error('Error updating employee:', error);
      });      
    }


// attendance
var attendances = []
var attendanceToShow = attendances
function getAttendances(){
    fetch('http://localhost:3000/attendance')
     .then(response => response.json())
     .then(data => {
        attendances = data.data;         
         attendanceToShow = attendances;
         renderAttendances()
     
     })
     .catch(error => {
         console.error('There was an error fetching the data', error);
     });
 }

var employeeSelected = {}
function renderEmployeesSelect(){    
    employeesToShow = employees;
    const eFloatingSelect = document.getElementById("floatingSelect");
    const eEmployeesToSelect = document.getElementById("employeesToSelect");
    let html = "<option value='בחר עובד' selected>בחר עובד</option>";
    employeesToShow.forEach(function(employee, index){
        html += `<option value="${employee.id}">${employee.firstName} ${employee.lastName}</option>`;
    });
    eFloatingSelect.innerHTML = html;
    eEmployeesToSelect.innerHTML = html;
}

function onSelectEmployee(){
    let eFloatingSelect = document.getElementById("floatingSelect");
    let id = eFloatingSelect.value;
    for(let i=0; i<employeesToShow.length; i++){
        if(employeesToShow[i].id == id){
            employeeSelected = employeesToShow[i];
            break;
        }
    }
    console.log('employeeSelected', employeeSelected);    
}

function padNumber(number) {
    return number < 10 ? '0' + number : number;
}

function getDateToday(){
    let eDateToday = document.getElementById("dateToday");
    let date = new Date();
    let day = padNumber(date.getDate());
    let month = padNumber(date.getMonth() + 1);
    let year = date.getFullYear();
    eDateToday.innerHTML = day + "/" + month + "/" + year;
}

function getHourNow(){
    let eTimeNow = document.getElementById("timeNow");
    let date = new Date();
    let hour = padNumber(date.getHours());
    let minutes = padNumber(date.getMinutes());
    let seconds = padNumber(date.getSeconds());
    eTimeNow.innerHTML = hour + ":" + minutes + ":" + seconds;
}

function onStart() {
    let newAttendance = {
        id: makeRandomId(8),
        employeeId: employeeSelected.id,
        myDdate: new Date().getTime(),
        startAt: new Date().getTime(),
        endAt: 0
    };

    for (let i = 0; i < attendances.length; i++) {
        if (attendances[i].employeeId == employeeSelected.id && attendances[i].endAt == 0) {
            alert("העובד כבר נמצא במערכת");
            return;
        }
    }

    // אם הגענו לכאן, זה אומר שאין לנו רשומה עם שעת סיום שווה ל-0, אז נוסיף את האובייקט החדש    
    addAttendanceToServer(newAttendance).then(() => {  
    alert("העובד נכנס למשמרת בהצלחה");
    console.log('attendance', attendances);
    renderAttendances()
    });
    
}

function addAttendanceToServer(attendance) {
    return fetch('http://localhost:3000/add-attendance', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(attendance),
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Failed to add the attendance.");
        }
    })
    .then(data => {
        console.log(data);
        getAttendances()
    })
    .catch(error => {
        console.error('There was an error adding the attendance:', error);
    });
  }


function onEnd() {
    let found = false; // משתנה שמתוך לבדוק האם מצאנו אובייקט עבור העובד שכרגע במקום העבודה ולא רשם יציאה

    for (let i = 0; i < attendances.length; i++) {
        if (attendances[i].employeeId == employeeSelected.id && attendances[i].endAt == 0) {
            let prepareToUpdate =  attendances[i];
            prepareToUpdate.endAt = new Date().getTime(); // מעדכן את שעת הסיום לזמן הנוכחי
            found = true;
            if(found){
            updateAttendanceByServer(prepareToUpdate)
            console.log('Updated attendance for employee exit:', prepareToUpdate);
            alert("העובד יצא מהמשמרת בהצלחה");
            renderAttendances()
            }
            break; // יוצא מהלולאה לאחר שמצאנו ועדכנו את הרשומה המתאימה
            
        }
    }

    if (!found) {
        alert("לא ניתן לרשום יציאה עבור העובד מכיוון שלא נרשמה הכנסה עבורו היום");
    }
}

function updateAttendanceByServer(attendanceUpdated) {
    fetch(`http://localhost:3000/attendance/${attendanceUpdated.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(attendanceUpdated)
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          getAttendances();          
          renderAttendances();
        } else {
          console.error('Failed to update attendance:', data.message);
        }
      })
      .catch(error => {
        console.error('Error updating attendance:', error);
      });      
    }


// reports

function renderAttendances(){    
    const eAttendances = document.getElementById("attendances");
    let html = "";
    console.log('attendanceToShow', attendanceToShow);
    attendanceToShow.forEach(function(attendance, index){
        html += `<tr>
                    <td>${index+1}</td>                    
                    <td>${getFullName(attendance.employeeId)}</td>
                    <td>${getDate(attendance.myDdate)}</td>
                    <td>${getHour(attendance.startAt)}</td>
                    <td>${getHour(attendance.endAt)}</td>
                    <td>${getTotalHours(attendance.startAt,attendance.endAt)}</td>
                    
                </tr>`;
    });
    eAttendances.innerHTML = html;
}

function getFullName(employeeId){
    
    for(let i=0; i<employees.length; i++){
        if(employees[i].id == employeeId){
            
            return employees[i].firstName + " " + employees[i].lastName;
        }
    }
}

function getDate(timeStamp){
    let date = new Date(timeStamp);
    let day = padNumber(date.getDate());
    let month = padNumber(date.getMonth() + 1);
    let year = date.getFullYear();
    return day + "/" + month + "/" + year;
}

function getHour(timeStamp){
    let date = new Date(timeStamp);
    let hour = padNumber(date.getHours());
    let minutes = padNumber(date.getMinutes());
    let seconds = padNumber(date.getSeconds());
    return hour + ":" + minutes + ":" + seconds;
}

function getTotalHours(start, end){
    let totalHours = 0;
    totalHours = (end - start) / 1000 / 60 / 60;
    return totalHours.toFixed(2);    
}

function filterEmployees(){
    let eEmployeesToSelect = document.getElementById("employeesToSelect");    
    let id = eEmployeesToSelect.value;
    if(id == "בחר עובד"){
        attendanceToShow = attendances;
    } else {
        attendanceToShow = attendances.filter(a => a.employeeId == id);
    }
    renderAttendances()
}