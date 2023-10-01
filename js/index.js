function onInit(){
    console.log("ready");
    renderEmployeesTable();
    getDateToday()
    setInterval(getTimeNow, 1000);
}

var employeeList = [
    {
      "_id": "rdnjkghdtftdgy45634853gbfkvbdfhjk",
      "firstName": "ישראל",
      "lastName": "ישראלי",
      "id": "123456789",
      "address": "רחוב ההסתדרות 10, תל אביב",
      "phone": "0501234567",
      "email": "israeli1@email.com",
      "role": "מנהל",
      "hourlyWage": 60
    },
    {
      "_id": "rdnjkghdncfg75634853gbfkvbdfhjk",
      "firstName": "דנה",
      "lastName": "לוי",
      "id": "987654321",
      "address": "רחוב אלנבי 5, תל אביב",
      "phone": "0507654321",
      "email": "dana2@email.com",
      "role": "מזכירה",
      "hourlyWage": 30
    },
    {
      "_id": "rdnjkghdrhxfgj567853gbfkvbdfhjk",
      "firstName": "יעקב",
      "lastName": "כהן",
      "id": "111222333",
      "address": "שדרות רוטשילד 2, תל אביב",
      "phone": "0521234567",
      "email": "yaakov3@email.com",
      "role": "אנליסט",
      "hourlyWage": 50
    },
    {
      "_id": "rdnjkgh6756ryht853gbfkvbdfhjk",
      "firstName": "מרים",
      "lastName": "שמש",
      "id": "444555666",
      "address": "רחוב בן גוריון 20, הרצליה",
      "phone": "0531234567",
      "email": "miriam4@email.com",
      "role": "מזכירה",
      "hourlyWage": 30
    },
    {
      "_id": "rdnjkghd546745htf57y34853gbfkvbdfhjk",
      "firstName": "משה",
      "lastName": "גולדברג",
      "id": "777888999",
      "address": "רחוב המשרד 15, רמת גן",
      "phone": "0541234567",
      "email": "moshe5@email.com",
      "role": "מנהל צוות",
      "hourlyWage": 40
    },
    {
      "_id": "rdnjkgh5645trgh34853gbfkvbdfhjk",
      "firstName": "סרה",
      "lastName": "כץ",
      "id": "000111222",
      "address": "רחוב הנביאים 8, חיפה",
      "phone": "0551234567",
      "email": "sarah6@email.com",
      "role": "מזכירה",
      "hourlyWage": 30
    },
    {
      "_id": "rdnjk6756yjyt34853gbfkvbdfhjk",
      "firstName": "יוסף",
      "lastName": "לוין",
      "id": "333444555",
      "address": "רחוב יפו 9, ירושלים",
      "phone": "0561234567",
      "email": "yosef7@email.com",
      "role": "מנהל פרויקט",
      "hourlyWage": 40
    },
    {
      "_id": "rdnjkghd56eghtdry34853gbfkvbdfhjk",
      "firstName": "רחל",
      "lastName": "מזרחי",
      "id": "666777888",
      "address": "רחוב המלך דוד 11, באר שבע",
      "phone": "0571234567",
      "email": "rachel8@email.com",
      "role": "אנליסטית",
      "hourlyWage": 40
    },
    {
      "_id": "rdnjkgh7867hjfgy34853gbfkvbdfhjk",
      "firstName": "דוד",
      "lastName": "פרץ",
      "id": "999000111",
      "address": "רחוב העצמאות 22, נתניה",
      "phone": "0581234567",
      "email": "david9@email.com",
      "role": "מנהל מכירות",
      "hourlyWage": 50
    },
    {
      "_id": "rdnjkgh3453gdrg7y34853gbfkvbdfhjk",
      "firstName": "אביגיל",
      "lastName": "שרון",
      "id": "222333444",
      "address": "רחוב החשמונאים 33, אשדוד",
      "phone": "0591234567",
      "email": "avigail10@email.com",
      "role": "מזכירה",
      "hourlyWage": 30
    }
  ]
var filteredList = employeeList;
var currentEmployeeId = ''

var employeeAttendance = [
  {
    "_id": "rdnjkghdtftdgy45634853gbfkvbdfhjk",
    "employee_Id": "rdnjkgh3453gdrg7y34853gbfkvbdfhjk",
    "date": 1695474829412,
    "startAt": 1695474429412,
    "endAt": 1695474829412,
  },
  {
    "_id": "rdnjkghdtftdgy45634853gbfkvbdfhjk1",
    "employee_Id": "rdnjkgh3453gdrg7y34853gbfkvbdfhjk",
    "date": 1695474829412,  // 2 באוקטובר 2023
    "startAt": 1695471229412,  // 10:00 בבוקר
    "endAt": 1695489229412,  // 15:00 אחה"צ
},
{
    "_id": "rdnjkghdtftdgy45634853gbfkvbdfhjk2",
    "employee_Id": "rdnjk6756yjyt34853gbfkvbdfhjk",
    "date": 1695561229412,  // 3 באוקטובר 2023
    "startAt": 1695564829412,  // 11:00 בבוקר
    "endAt": 1695582829412,  // 16:00 אחה"צ
},
{
    "_id": "rdnjkghdtftdgy45634853gbfkvbdfhjk3",
    "employee_Id": "rdnjk6756yjyt34853gbfkvbdfhjk",
    "date": 1695647629412,  // 4 באוקטובר 2023
    "startAt": 1695644029412,  // 09:00 בבוקר
    "endAt": 1695672029412,  // 17:00 אחה"צ
},
{
    "_id": "rdnjkghdtftdgy45634853gbfkvbdfhjk4",
    "employee_Id": "rdnjkgh3453gdrg7y34853gbfkvbdfhjk",
    "date": 1695734029412,  // 5 באוקטובר 2023
    "startAt": 1695737629412,  // 10:30 בבוקר
    "endAt": 1695762029412,  // 17:30 אחה"צ
},
{
    "_id": "rdnjkghdtftdgy45634853gbfkvbdfhjk5",
    "employee_Id": "rdnjkghdtftdgy45634853gbfkvbdfhjk",
    "date": 1695820429412,  // 6 באוקטובר 2023
    "startAt": 1695824029412,  // 09:30 בבוקר
    "endAt": 1695852029412,  // 17:30 אחה"צ
}

]

var filteredemployeeAttendance=employeeAttendance;
var currentEmployeeIdToAtt = ''

function displayDiv(tab, divId) {
  // הסתר את כל ה-divs
  var divs = ["divEmployees", "divPresence", "divReports"]; // הוסף את ה-ids של ה-divs שלך כאן
  for (var i = 0; i < divs.length; i++) {
    document.getElementById(divs[i]).style.display = "none";
  }

  // הצג את ה-div הרלוונטי
  document.getElementById(divId).style.display = "block";

  // הסר את הכיתוב "active" מכל הכרטיסיות
  var tabs = document.getElementsByClassName("nav-link");
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove("active");
  }

  // הוסף את הכיתוב "active" לכרטיסייה הנוכחית
  tab.classList.add("active");
}

  // use bootstrap table to render this table' you hav the teable, you need to render the tr's in the tbody its have id="myTbody"
function renderEmployeesTable(){
    var tbody = document.getElementById('myTbody');
    var html = '';
    for(var i=0;i<filteredList.length;i++){
      html += '<tr>';
      html += '<td>'+filteredList[i].firstName+'</td>';
      html += '<td>'+filteredList[i].lastName+'</td>';
      html += '<td>'+filteredList[i].id+'</td>';
      html += '<td>'+filteredList[i].address+'</td>';
      html += '<td>'+filteredList[i].phone+'</td>';
      html += '<td>'+filteredList[i].email+'</td>';
      html += '<td>'+filteredList[i].role+'</td>';
      html += '<td>'+filteredList[i].hourlyWage+'</td>';
      html += `<td><button class="btn btn-primary" onclick='toEditEmployee("${filteredList[i]._id}")' data-bs-toggle="modal" data-bs-target="#editModal">עריכה</button> <button class="btn btn-danger" onclick='deleteEmployee("${filteredList[i]._id}")'>מחיקה</button></td>`;
      html += '</tr>';
    }
    tbody.innerHTML = html;
    renderSelectOptions();
    renderPresenceTable();
}



function addEmployee(){
  var _id = makeRendomId(25)
  var id = document.getElementById('id').value;
  var firstName = document.getElementById('firstName').value;
  var lastName = document.getElementById('lastName').value;
  var address = document.getElementById('address').value;
  var phone = document.getElementById('phone').value;
  var email = document.getElementById('email').value;
  var role = document.getElementById('role').value;
  var hourlyWage = document.getElementById('hourlyWage').value;

  employeeList.unshift({
    _id: id,
    id: id,
    firstName: firstName,
    lastName: lastName,
    address: address,
    phone: phone,
    email: email,
    role: role,
    hourlyWage: hourlyWage
  });

  renderEmployeesTable();
  console.log(employeeList);
}

function makeRendomId(length){
  var text = "";
  var possible = "0123456789";
  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;  
}

function deleteEmployee(id){
  console.log(id);
  for(var i=0; i<employeeList.length; i++){
    if(employeeList[i]._id === id){
      employeeList.splice(i,1);
      break;
    }
  }
  renderEmployeesTable();
}

function toEditEmployee(id){
  currentEmployeeId = id;
  
  for(var i=0; i<employeeList.length; i++){
    if(employeeList[i]._id === id){
      // עדכון שדות הטופס עם הנתונים של העובד
      document.getElementById('firstNameE').value = employeeList[i].firstName;
      document.getElementById('lastNameE').value = employeeList[i].lastName;
      document.getElementById('idE').value = employeeList[i].id;
      document.getElementById('addressE').value = employeeList[i].address;
      document.getElementById('phoneE').value = employeeList[i].phone;
      document.getElementById('emailE').value = employeeList[i].email;
      document.getElementById('roleE').value = employeeList[i].role;
      document.getElementById('hourlyWageE').value = employeeList[i].hourlyWage;
      break;
    }    
  }  
}


function editEmployee(){ 
  for(var i=0; i<employeeList.length; i++){
    if(employeeList[i]._id === currentEmployeeId){
      employeeList[i]._id = currentEmployeeId; // אם ה- ID לא משתנה, אז אפשר להוריד את השורה הזו
      employeeList[i].id = document.getElementById('idE').value;
      employeeList[i].firstName = document.getElementById('firstNameE').value;
      employeeList[i].lastName = document.getElementById('lastNameE').value;
      employeeList[i].address = document.getElementById('addressE').value;
      employeeList[i].phone = document.getElementById('phoneE').value;
      employeeList[i].email = document.getElementById('emailE').value;
      employeeList[i].role = document.getElementById('roleE').value;
      employeeList[i].hourlyWage = document.getElementById('hourlyWageE').value;
      break;
    }
  }
  renderEmployeesTable();
}

// presence

function getDateToday(){
  var eltodayDate = document.getElementById('todayDate');
  var todayDate = new Date();
  var dd = todayDate.getDate();
  var mm = todayDate.getMonth()+1; //January is 0!
  var yyyy = todayDate.getFullYear();
  eltodayDate.innerHTML = dd + '/' + mm + '/' + yyyy;
}

function getTimeNow(){
  var elTimeNow = document.getElementById('timeNow');
  var todayDate = new Date();
  var hh = todayDate.getHours();
  var mm = todayDate.getMinutes();
  var ss = todayDate.getSeconds();
  elTimeNow.innerHTML = hh + ':' + mm + ':' + ss;
}

function renderSelectOptions(){
  var elSelect = document.getElementById('selectEmployee');
  var elSelectReport = document.getElementById('selectEmployeeReport');
  var html = '<option selected>בחר עובד</option>';
  for(var i=0; i<employeeList.length; i++){
    html += `<option value="${employeeList[i]._id}">${employeeList[i].firstName} ${employeeList[i].lastName}</option>`;
  }
  elSelect.innerHTML = html;
  elSelectReport.innerHTML = html;
}

function setCurrentEmployeeIdToAtt(){
  currentEmployeeIdToAtt = document.getElementById('selectEmployee').value;
  console.log(currentEmployeeIdToAtt);
}

function addPresence(){
  var _id = makeRendomId(25)
  var date = new Date()
  var startAt = date.getTime();
  var endAt = 0;

  if(currentEmployeeIdToAtt === ''){
    alert('בחר עובד');
    return;
  }

  for(var i=0; i<employeeAttendance.length; i++){
    if(employeeAttendance[i].employee_Id === currentEmployeeIdToAtt && employeeAttendance[i].endAt === 0){
      alert('העובד כבר נמצא במשרה');
      return;
    }
  }

  employeeAttendance.unshift({
    _id: _id,
    employee_Id: currentEmployeeIdToAtt,
    date: date,
    startAt: startAt,
    endAt: endAt
  });

  renderPresenceTable();
  console.log(employeeAttendance);
}

function endPresence(){
  var date = new Date()
  var endAt = date.getTime();

  for(var i=0; i<employeeAttendance.length; i++){
    if(employeeAttendance[i].employee_Id === currentEmployeeIdToAtt && employeeAttendance[i].endAt === 0){
      employeeAttendance[i].endAt = endAt;
      break;
    } else if(employeeAttendance[i].employee_Id === currentEmployeeIdToAtt && employeeAttendance[i].endAt !== 0){
      alert('העובד כבר סיים את המשמרת');
      return;
    }
  }
  renderPresenceTable();
}




// reports
function renderPresenceTable(){
  var tbody = document.getElementById('myPresenceTbody');
  var html = '';
  for(var i=0;i<filteredemployeeAttendance.length;i++){
    html += '<tr>';
    html += '<td>'+getEmployeeFullNameById(filteredemployeeAttendance[i].employee_Id)+'</td>';
    html += '<td>'+getDateByTimestamp(filteredemployeeAttendance[i].date)+'</td>';
    html += '<td>'+getTimeByTimestamp(filteredemployeeAttendance[i].startAt)+'</td>';
    html += '<td>'+getTimeByTimestamp(filteredemployeeAttendance[i].endAt)+'</td>';
    html += '<td>'+getTotalHours(filteredemployeeAttendance[i].startAt,filteredemployeeAttendance[i].endAt)+'</td>';
    html += '</tr>';
  }
  tbody.innerHTML = html;
}

function getEmployeeFullNameById(id){
  for(var i=0; i<employeeList.length; i++){
    if(employeeList[i]._id === id){
      return employeeList[i].firstName + ' ' + employeeList[i].lastName;
    }
  }
}

function getDateByTimestamp(timestamp){
  const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');  // הוספת אפס במידה והיום הוא ספרה אחת
    const month = String(date.getMonth() + 1).padStart(2, '0');  // הוספת אפס במידה והחודש הוא ספרה אחת. נוסיף 1 כיוון שהחודשים ב-Date הם 0-11
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function getTimeByTimestamp(timestamp){
  var date = new Date(timestamp);
  var hh = String(date.getHours()).padStart(2, '0');
  var mm = String(date.getMinutes()).padStart(2, '0');
  var ss = String(date.getSeconds()).padStart(2, '0');
  return hh + ':' + mm + ':' + ss;
}

// startAt && endAt is timestamp
function getTotalHours(startAt, endAt){
  var totalHours = endAt - startAt;
  totalHours = totalHours / 1000 / 60 / 60;  // חישוב הזמן בשעות
  return totalHours.toFixed(2);  // חיתוך לשתי ספרות אחרי הנקודה 
}

function setFilterToReport(){
  var filter = document.getElementById('selectEmployeeReport').value;
  console.log(filter);
  filteredemployeeAttendance = []; // אתחול רשימה ריקה לפני הסינון

  for(var i=0; i<employeeAttendance.length; i++){
    if(employeeAttendance[i].employee_Id === filter){
      filteredemployeeAttendance.push(employeeAttendance[i]);
    } 
  }

  renderPresenceTable()
}