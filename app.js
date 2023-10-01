const express = require('express');
const sql = require('mssql');

const app = express();

// הגדרות החיבור
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./attendance.db');


app.use(express.static('public'));
app.use(express.json());




app.get('/', (req, res) => {
    let output = '';
    db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        output += row.id + ": " + row.info + '<br>';
    }, () => {
        res.send(output); // כאן נשלח התוצאה לגולש
    });
});


// employees CRUD

// get all employees
app.get('/employees', (req, res) => {
    db.all("SELECT * FROM employees", (err, rows) => {
        if (err) {
            res.status(500).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

// add employee 
app.post('/add-employee', (req, res) => {
    const newEmployee = req.body;
    // פה אנו צריכים להוסיף את הלוגיקה להוספת העובד למסד הנתונים
    // לדוגמה (בהנחה שאנו משתמשים בsqlite):
    db.run("INSERT INTO employees (id, firstName, lastName, identityNum) VALUES (?, ?, ?, ?)", 
           [newEmployee.id, newEmployee.firstName, newEmployee.lastName, newEmployee.identityNum], 
           function(err) {
               if (err) {
                   return res.status(500).json({error: err.message});
               }
               res.json({message: "Employee added successfully!", id: this.lastID}); // הוספנו בהצלחה
           });
});

// update employee
app.put('/employee/:id', (req, res) => {
  const employeeId = req.params.id;
  const updatedEmployee = req.body;

  const sql = `
    UPDATE employees  
    SET 
    firstName = ?, 
    lastName = ?, 
    identityNum = ?     
    WHERE id = ?
  `;

  db.run(sql, [updatedEmployee.firstName, updatedEmployee.lastName, updatedEmployee.identityNum, employeeId], (error) => {
    if (error) {
      res.json({ success: false, message: 'Failed to update employee.', error: error.message });
    } else {
      res.json({ success: true, message: 'Employee updated successfully.' });
    }
  });
});

// delete employee
  app.delete('/employee/:id', (req, res) => {
    const employeeId = req.params.id;

    const query = `DELETE FROM employees WHERE id = ?`;

    db.run(query, [employeeId], function (error) {
        if (error) {
            console.error(error);
            res.json({ success: false, message: 'Failed to delete employee.' });
        } else {
            if (this.changes > 0) {
                res.json({ success: true, message: 'Employee deleted successfully.' });
            } else {
                res.json({ success: false, message: 'Employee not found.' });
            }
        }
    });
});




// get all attendances
app.get('/attendance', (req, res) => {
  db.all("SELECT * FROM attendance", (err, rows) => {
      if (err) {
          res.status(500).json({ "error": err.message });
          return;
      }
      res.json({
          "message": "success",
          "data": rows
      });
  });
});

// add attendance 
app.post('/add-attendance', (req, res) => {
    const newAttendance = req.body;
    
    db.run("INSERT INTO attendance (id, employeeId, myDdate, startAt, endAt) VALUES (?, ?, ?, ?,?)", 
           [newAttendance.id, newAttendance.employeeId, newAttendance.myDdate, newAttendance.startAt, newAttendance.endAt], 
           function(err) {
               if (err) {
                   return res.status(500).json({error: err.message});
               }
               res.json({message: "Attendance added successfully!", id: this.lastID}); // הוספנו בהצלחה
           });
});

// update attendance
app.put('/attendance/:id', (req, res) => {
    const attendanceId = req.params.id;
    const updatedAttendance = req.body;
    
    console.log('updatedAttendance', updatedAttendance);
    console.log('attendanceId', attendanceId);
    const sql = `
    UPDATE attendance 
    SET
    employeeId = ?, 
    myDdate = ?,
    startAt = ?,
    endAt = ?      
    WHERE id = ?
`;
  
    db.run(sql, [updatedAttendance.employeeId, updatedAttendance.myDdate, updatedAttendance.startAt, updatedAttendance.endAt, attendanceId], (error) => {
      if (error) {
        res.json({ success: false, message: 'Failed to update attendance.', error: error.message });
        
      } else {
        res.json({ success: true, message: 'Attendance updated successfully.' });
      }
    });
  });



  



app.listen(3000, () => {
    console.log('Server started on port 3000');
});




