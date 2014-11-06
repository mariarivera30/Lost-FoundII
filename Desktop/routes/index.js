
var pg = require('pg');
var conString = "pg://postgres:postgres@localhost:5432/lostfoundDB";
/*
 * GET home page.
 */
// setup e-mail data with unicode symbols
generateKey = function(){
  return Math.floor((Math.random() * 999) + 1);

};

var nodemailer = require('nodemailer');

sendMail = function(emailto, randomkey){
// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'lostfound.uprm@gmail.com',
        pass: 'DBlostfound04'
    }
});

// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

// setup e-mail data with unicode symbols
var mailOptions = {
    from: 'LostFound <lostfound.uprm@gmail.com>', // sender address
    to: emailto , // list of receivers
    subject: 'Your secret Key', // Subject line
    text: "Hi User, your secret key is "+randomkey+" " // plaintext body
    //html: '<b>Hola tu secret que es ###</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log('Message sent: ' + info.response);
    }
});

};



exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.getItemId = function(req, res) {
    console.log("GET");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  var client = new pg.Client(conString);
    
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                   client.query("SELECT * FROM public.item natural join public.users WHERE item.itemid = '"+req.params.id+"'", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                var response = {
                                "item" : result.rows
                                };
                                res.status(200);
                                res.json(response);
                                console.log(response);
                                //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
                                client.end();
                                });
                   });

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



exports.updateUser= function(req,res){
  console.log("POST");
  var client = new pg.Client(conString);
     
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                   
                   client.query("UPDATE public.users SET firstname = '"+req.body.firstname+"', lastname = '"+req.body.lastname+"', phone = '"+req.body.phone+"' where email = '"+req.body.email+"'", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                
                                res.status(200);
                                client.end();
                                });
                   });
};




// exports.postCategories= function(req,res){
//   console.log("POST");
//   var client = new pg.Client(conString);
     
//   client.connect(function(err) {
//                    if (err) {
//                    return console.error('could not connect to postgres', err);
//                    }
//                    client.query("INSERT INTO category (categoryname) VALUES ('"+req.body.type+"')", function(err, result) {
                               
//                                 if (err) {
//                                 return console.error('error running query', err);
//                                 }
                                
//                                 res.status(200);
//                                 client.end();
//                                 });
//                    });
// };



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


exports.getAdmins = function(req, res) {
    console.log("GET");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  var client = new pg.Client(conString);
    
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                   client.query("SELECT  *  FROM public.users WHERE users.isadmin = 'true' ORDER BY users.firstname ASC", function(err, result) {
                               
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
                   client.query("SELECT * FROM public.item, public.users WHERE item.email = users.email and item.isblocked = 'false' ORDER BY item.itemid DESC", function(err, result) {
                               
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

// exports.getCategories = function(req, res) {
//     console.log("GET");
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   var client = new pg.Client(conString);
    
//   client.connect(function(err) {
//                    if (err) {
//                    return console.error('could not connect to postgres', err);
//                    }
//                    client.query("SELECT  *  FROM public.category", function(err, result) {
                               
//                                 if (err) {
//                                 return console.error('error running query', err);
//                                 }
//                                 var response = {
//                                 "categories" : result.rows
//                                 };
//                                 res.json(200,response);
//                                 console.log(response);
//                                 //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
//                                 client.end();
//                                 });
//                    });

// };

exports.getLostItems = function(req, res) {
    console.log("GET");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  var client = new pg.Client(conString);
    
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                   client.query("SELECT * FROM public.item WHERE item.itemstatus = 'Lost' and item.isblocked = 'false' ORDER BY item.itemid DESC", function(err, result) {
                               
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
                   client.query("SELECT * FROM public.item WHERE item.itemstatus = 'Found' and item.isblocked = 'false' ORDER BY item.itemid DESC", function(err, result) {
                               
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
                   client.query("SELECT * FROM public.users WHERE users.email LIKE '%"+req.params.id+"%' OR users.firstname LIKE '%"+req.params.id+"%' OR users.lastname LIKE '%"+req.params.id+"%' ", function(err, result) {
                               
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



exports.getItemsAdmin = function(req, res) {
    console.log("GET");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  var client = new pg.Client(conString);
    
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                   client.query("SELECT * FROM public.item ORDER BY item.itemid DESC", function(err, result) {
                               
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

exports.getItemsAdminSearchBar = function(req, res) {
    console.log("GET");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  var client = new pg.Client(conString);
    
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                   client.query("SELECT * FROM public.item WHERE item.email LIKE '%"+req.params.id+"%' OR item.itemname LIKE '%"+req.params.id+"%' ", function(err, result) {
                               
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

// exports.deleteCategory = function(req, res) {
//   console.log("DELETE");
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   var client = new pg.Client(conString);
    
//   client.connect(function(err) {
//                    if (err) {
//                    return console.error('could not connect to postgres', err);
//                    }
//                    client.query("DELETE FROM public.category WHERE category.categoryname = '"+req.params.id+"' ", function(err, result) {
                               
//                                 if (err) {
//                                 return console.error('error running query', err);
//                                 }
//                                 var response = {
//                                 "categories" : result.rows
//                                 };
//                                 res.status(200);
//                                 res.json(response);
//                                 console.log(response);
//                                 //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
//                                 client.end();
//                                 });
//                    });

// };

exports.postItem= function(req,res){
  var randkey = generateKey();
  console.log("POST");
  var client = new pg.Client(conString);
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                   console.log(req.body);
                   client.query("INSERT INTO item (itemname,description,locationitem,city,itemstatus,email,category,itempicture) VALUES ('"+req.body.itemname+"','"+req.body.description+"','"+req.body.location+"','"+req.body.city+"','"+req.body.itemStatus+"','"+req.body.email+"','"+req.body.category+"','"+req.body.itempicture+"')", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                
                                res.status(200);
                                client.end();
                                });

                   client.query("UPDATE public.users SET firstname = '"+req.body.firstname+"', lastname = '"+req.body.lastname+"', phone = '"+req.body.phone+"', passkey = '"+randkey+"' where email = '"+req.body.email+"'", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                
                                client.end();
                                });
                 
sendMail(req.body.email, randkey)
                   });
};

exports.updateItem= function(req,res){
  console.log("POST");
  var client = new pg.Client(conString);

  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                   client.query("UPDATE item SET itemname = '"+req.body.itemname+"', description = '"+req.body.description+"',locationitem = '"+req.body.locationitem+"',city = '"+req.body.city+"',category = '"+req.body.category+"' ,itempicture = '"+req.body.itempicture+"' WHERE itemid = '"+req.body.itemid+"'", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                
                                res.status(200);
                                client.end();
                                });
                   });
};


exports.putThumbsdown= function(req,res){
  console.log("POST");
  var client = new pg.Client(conString);
     
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
            
                   client.query("Update public.item Set thumbsdown = (thumbsdown + 1) Where itemid = '"+req.body.id+"'", function(err, result) {
                               
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
   console.log(req.params);
    
  var client = new pg.Client(conString);
     
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                   client.query("Select * from public.item, public.users where item.email = users.email and item.email = '"+req.params.email +"' and users.passkey = '"+ req.params.key+"'  ", function(err, result) {
                               
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

exports.getAuth= function(req,res){
  console.log("GET");
   console.log(req.body);
    
  var client = new pg.Client(conString);
     
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
                   client.query("Select * from public.users where users.email = '"+req.body.email+"' and users.passkey = '"+ req.body.key+"'  ", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                var response = {
                                "user" : result.rows
                                };
                                res.status(200);
                                res.json(response);
                                console.log(response);
                               
                                client.end();
                                });
                   });


};


exports.blockAdminUser= function(req,res){
  console.log("POST");
  var client = new pg.Client(conString);
     
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
            
                   client.query("Update public.users Set isblocked = 'true' Where email = '"+req.body.id+"'", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                
                                res.status(200);
                                client.end();
                                });
                   });
};

exports.unblockAdminUser= function(req,res){
  console.log("POST");
  var client = new pg.Client(conString);
     
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
            
                   client.query("Update public.users Set isblocked = 'false' Where email = '"+req.body.id+"'", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                
                                res.status(200);
                                client.end();
                                });
                   });
};


exports.blockAdminItem= function(req,res){
  console.log("POST");
  var client = new pg.Client(conString);
     
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
            
                   client.query("Update public.item Set isblocked = 'true' Where itemid = '"+req.body.id+"'", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                
                                res.status(200);
                                client.end();
                                });
                   });
};

exports.unblockAdminItem= function(req,res){
  console.log("POST");
  var client = new pg.Client(conString);
     
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
            
                   client.query("Update public.item Set isblocked = 'false' Where itemid = '"+req.body.id+"'", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                
                                res.status(200);
                                client.end();
                                });
                   });
};


exports.removeAdmin= function(req,res){
  console.log("POST");
  var client = new pg.Client(conString);
     
  client.connect(function(err) {
                   if (err) {
                   return console.error('could not connect to postgres', err);
                   }
            
                   client.query("Update public.users Set isadmin = 'false' Where email = '"+req.body.id+"'", function(err, result) {
                               
                                if (err) {
                                return console.error('error running query', err);
                                }
                                
                                res.status(200);
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

