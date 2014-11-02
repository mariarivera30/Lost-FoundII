
var pg = require('pg');
var conString = "pg://postgres:postgres@localhost:5432/lostfoundDB";
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.postFeedback= function(req,res){
  console.log("POST");
  var client = new pg.Client(conString);
     
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                   console.log(req.body);
                   client.query("INSERT INTO feedback (message, email) VALUES ('"+req.body.message+"','"+req.body.email+"')", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                
                                res.status(200);
                                client.end();
                                });
                   });
};


exports.postComment= function(req,res){
  console.log("POST");
  var client = new pg.Client(conString);
     
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                   console.log(req.body);
                   client.query("INSERT INTO comment (itemid, usercomment, email,isblocked) VALUES ('"+req.body.itemid+"','"+req.body.usercomment+"','"+req.body.email+"','"+req.body.isblocked+"')", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                
                                res.status(200);
                                client.end();
                                });
                   });
};

exports.postUser= function(req,res){
  console.log("POST");
  var client = new pg.Client(conString);
     
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                   
                   client.query("INSERT INTO users (firstname, lastname, email, phone, passkey, isblocked, isadmin) VALUES ('"+req.body.firstname+"','"+req.body.lastname+"','"+req.body.email+"','"+req.body.phone+"','"+req.body.passkey+"','"+req.body.isblocked+"','"+req.body.isadmin+"')", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                
                                res.status(200);
                                client.end();
                                });
                   });
};





exports.postCategories= function(req,res){
  console.log("POST");
  var client = new pg.Client(conString);
     
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                   client.query("INSERT INTO category (categoryname) VALUES ('"+req.body.type+"')", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                
                                res.status(200);
                                client.end();
                                });
                   });
};



exports.getUsers = function(req, res) {
    console.log("GET");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
	var client = new pg.Client(conString);
    
	client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                   client.query("SELECT  *  FROM public.users ORDER BY users.firstname ASC", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                var response = {
                                "users" : result.rows
                                };
                                
                                res.json(200,response);
                                console.log(response);
                                //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
                                client.end();
                                });
                   });

};

exports.getItems = function(req, res) {
    console.log("GET");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  var client = new pg.Client(conString);
    
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                   client.query("SELECT * FROM public.item, public.users WHERE item.email = users.email", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                var response = {
                                "items" : result.rows
                                };
                                res.json(200,response);
                                console.log(response);
                                //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
                                client.end();
                                });
                   });

};

exports.getCategories = function(req, res) {
    console.log("GET");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  var client = new pg.Client(conString);
    
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                   client.query("SELECT  *  FROM public.category", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                var response = {
                                "categories" : result.rows
                                };
                                res.json(200,response);
                                console.log(response);
                                //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
                                client.end();
                                });
                   });

};

exports.getLostItems = function(req, res) {
    console.log("GET");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  var client = new pg.Client(conString);
    
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                   client.query("SELECT * FROM public.item WHERE item.itemstatus = 'Lost'", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                var response = {
                                "lostItems" : result.rows
                                };
                    
                                res.json(200,response);
                                console.log(response);
                                //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
                                client.end();
                                });
                   });

};

exports.getFoundItems = function(req, res) {
    console.log("GET");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  var client = new pg.Client(conString);
    
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                   client.query("SELECT * FROM public.item WHERE item.itemstatus = 'Found'", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                var response = {
                                "foundItems" : result.rows
                                };
                                res.status(200);
                                res.json(response);
                                console.log(response);
                                //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
                                client.end();
                                });
                   });

};

exports.getComments = function(req, res) {
    console.log("GET");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  var client = new pg.Client(conString);
    
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                   client.query(" SELECT  public.comment.usercomment , public.comment.email FROM public.comment, public.item WHERE comment.itemid = item.itemid AND comment.itemid = "+req.params.id+" ", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                var response = {
                                "comments" : result.rows
                                };
                                res.status(200);
                                res.json(response);
                                console.log(response);
                                //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
                                client.end();
                                });
                   });

};


exports.getUserAdmin = function(req, res) {
    console.log("GET");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  var client = new pg.Client(conString);
    
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                   client.query("SELECT * FROM public.users WHERE users.email = '"+req.params.id+"' ", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                var response = {
                                "anUser" : result.rows
                                };
                                res.status(200);
                                res.json(response);
                                console.log(response);
                                //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
                                client.end();
                                });
                   });

};

exports.deleteCategory = function(req, res) {
  console.log("DELETE");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  var client = new pg.Client(conString);
    
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                   client.query("DELETE FROM public.category WHERE category.categoryname = '"+req.params.id+"' ", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                var response = {
                                "categories" : result.rows
                                };
                                res.status(200);
                                res.json(response);
                                console.log(response);
                                //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
                                client.end();
                                });
                   });

};

exports.postItem= function(req,res){
  console.log("POST");
  var client = new pg.Client(conString);
     console.log(req.body.type.itemStatus);
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                   client.query("INSERT INTO item (itemname,description,locationitem,city, itemstatus,email,category) VALUES ('"+req.body.type.itemname+"','"+req.body.type.description+"','"+req.body.type.location+"','"+req.body.type.city+"','"+req.body.type.itemStatus+"','"+req.body.type.email+"','"+req.body.type.category+"')", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                
                                res.status(200);
                                client.end();
                                });
                   });
};


exports.putThumbsdown= function(req,res){
  console.log("PUT");
  var client = new pg.Client(conString);
     
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                   client.query(" Update public.item Set thumbsdown = (thumbsdown + 1) Where itemid = "+req.params.id+"", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                
                                res.status(200);
                                client.end();
                                });
                   });
};



exports.getMyPosts= function(req,res){
  console.log("GET");
  var client = new pg.Client(conString);
     
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                   client.query("Select * from public.item, public.users where item.email = users.email and item.email = 'angel.delatorre@upr.edu' and users.passkey = '858'  ", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                var response = {
                                "myPosts" : result.rows
                                };
                                res.status(200);
                                res.json(response);
                                console.log(response);
                               
                                client.end();
                                });
                   });
};
/*exports.getDoctorById = function(req, res){
    console.log("GET");
    res.setHeader("Content-Type", "application/json");
    
    var id =req.params.id;
    console.log(id);
    
    var client = new pg.Client(conString);
	client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                   client.query('SELECT  * FROM public.doctors WHERE doctors.doctor_id  =$1',[id], function(err, result) {
                                if (err) {
                                return console.error('error running query', err);
                                }
                               
                                var response = {
                                "doctors" : result.rows
                                };
                              
                                //res.write('hiola');
                                res.status('200');
                                res.json(response);
                                console.log(id);
                                console.log(response);
                                //res.end();
                                //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
                                client.end();
                                });
                   });

};
exports.getDoctorsFromPatient = function(req,res){
    console.log("GET");
    var id=req.params.idP;
	var client = new pg.Client(conString);
	client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                   client.query('SELECT  doctors.doctor_id,                                doctor_name, doctor_last ,                                doctor_phone ,                                 doctor_direction ,                                doctor_link , doctor_email ,                                doctor_type , doctor_especialidad ,doctor_pueblo ,                               doctor_zipcode FROM public.doctors,public.patients JOIN public.appointments on  appointments.patient_id = patients.patient_id WHERE appointments.doctor_id  =$1 Group BY doctors.doctor_id;',[id], function(err, result) {
                                if (err) {
                                return console.error('error running query', err);
                                }
                                var response = {
                                "doctors" : result.rows
                                };
                                res.json(response);
                                //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
                                client.end();
                                });
                   });

};
////Patients
exports.getPatient = function(req, res) {
    console.log("GET");
    var id=req.params.idP;
	var client = new pg.Client(conString);
	client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                   client.query('SELECT  *  FROM public.patients where patients.patient_id  =$1',[id], function(err, result) {
                                if (err) {
                                return console.error('error running query', err);
                                }
                                var response = {
                                "patient" : result.rows
                                };
                                res.json(response);
                                //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
                                client.end();
                                });
                   });

};


exports.getPatientById = function(req, res){
    console.log("GET");
    var id=req.params.idP;
	var client = new pg.Client(conString);
	client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                   client.query('SELECT  *  FROM public.patients where patients.patient_id =$1; ',[id], function(err, result) {
                                if (err) {
                                return console.error('error running query', err);
                                }
                                var response = {
                                "patient" : result.rows
                                };
                                res.json(response);
                                //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
                                client.end();
                                });
                   });
};

exports.getPatientFromDoctor = function(req, res){
    console.log("GET");
    var id=req.params.idP;
	var client = new pg.Client(conString);
	client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                   client.query('SELECT  *  FROM public.doctors,public.patients,public.appointments WHERE appointments.doctor_id= doctors.doctor_id and doctors.doctor_id =$1 GROUP BY patients.patient_id; ',[id], function(err, result) {
                                if (err) {
                                return console.error('error running query', err);
                                }
                                var response = {
                                "patient" : result.rows
                                };
                                res.json(response);
                                //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
                                client.end();
                                });
                   });
};




exports.getAppointmentsFromDoc = function(req, res) {
    console.log("GET");
    var id=req.params.idD;
	var client = new pg.Client(conString);
	client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                   client.query('SELECT  *  FROM public.appointments JOIN public.patients on  appointments.patient_id = patients.patient_id WHERE appointments.doctor_id  =$1; ',[id], function(err, result) {
                                if (err) {
                                return console.error('error running query', err);
                                }
                                var response = {
                                "appointment" : result.rows
                                };
                                res.json(response);
                                //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
                                client.end();
                                });
                   });
};

exports.getAppointmentsFromPatient = function(req, res) {
    console.log("GET");
    var id=req.params.idP;
	var client = new pg.Client(conString);
	client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                   client.query('SELECT  *  FROM public.appointments JOIN public.doctors on  appointments.doctor_id =doctors.doctor_id  WHERE appointments.patient_id  =$1; ',[id], function(err, result) {
                                if (err) {
                                return console.error('error running query', err);
                                }
                                var response = {
                                "appointment" : result.rows
                                };
                                res.json(response);
                                //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
                                client.end();
                                });
                   });};

exports.getAppointmentById = function(req, res){
    console.log("GET");
    var id=req.params.idA;
	var client = new pg.Client(conString);
	client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                   client.query('SELECT * FROM public.appointments WHERE appointments.app_id = $1',[id], function(err, result) {
                                if (err) {
                                return console.error('error running query', err);
                                }
                                var response = {
                                "appointment" : result.rows
                                };
                                res.json(response);
                                //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
                                client.end();
                                });
                   });
};

exports.getAppointmentsByIdAndDate = function(req, res){
   /* console.log("GET");
    var id=req.params.idD;
	var client = new pg.Client(conString);
	client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                  client.query('SELECT * FROM  public.appointments  JOIN public.patients on  appointments.patient_id = patients.patient_id   WHERE  appointments.app_fecha >= '2014-03-03 00:00:00' AND  appointments.app_fecha < '2014-03-04 00:00:00' AND appointments.doctor_id=1 ;    ',[id], function(err, result)* {
                                if (err) {
                                return console.error('error running query', err);
                                }
                                var response = {
                                "appointment" : result.rows
                                };
                                res.json(response);
                                //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
                                client.end();
                                });
                   });
};

exports.getAppointmentsPendingFromDoctor = function(req, res){
    console.log("GET");
    var id=req.params.idD;
	var client = new pg.Client(conString);
	client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                   client.query('SELECT  * FROM   public.appointments   JOIN public.patients on  appointments.patient_id = patients.patient_id     WHERE  appointments.app_statusdoc = 0 AND appointments.doctor_id=$1  ;',[id], function(err, result) {
                                if (err) {
                                return console.error('error running query', err);
                                }
                                var response = {
                                "appointment" : result.rows
                                };
                                res.json(response);
                                //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
                                client.end();
                                });
                   });
};

exports.getAppointmentsCanceledFromDoctor = function(req, res){
  /*  console.log("GET");
    var id=req.params.idD;
	var client = new pg.Client(conString);
	client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                   client.query('SELECT  * FROM   public.appointments   JOIN public.patients on  appointments.patient_id = patients.patient_id     WHERE  appointments.app_cancel = 1 AND appointments.doctor_id=1  ;',[id], function(err, result) {
                                if (err) {
                                return console.error('error running query', err);
                                }
                                var response = {
                                "appointment" : result.rows
                                };
                                res.json(response);
                                //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
                                client.end();
                                });
                   });
};*/

