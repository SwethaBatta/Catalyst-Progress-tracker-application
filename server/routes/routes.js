//server/routes/routes.js
var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest : 'public/uploads/'})
var bodyParser = require('body-parser');
var Expense = require('../../models/Expense');
var MilestonesModel = require('../../models/MilestonesModel');
var Image = require('../../models/Image');

router.get('/', function(req, res){
  res.render('index')
});

router.route('/insert')
.post(function(req,res) {
 var expense = new Expense();
  expense.description = req.body.desc;
  expense.amount = req.body.amount;
  expense.month = req.body.month;
  expense.year = req.body.year;
  expense.milestones = req.body.milestones;
expense.checked = req.body.checked;
 expense.activities = req.body.activities;
    expense.filename = req.body.filename;
    expense.fileUrl = req.body.fileUrl;
  expense.save(function(err) {
      if (err)
        res.send(err);
      res.send('Activity successfully added!');
  });
})

router.route('/update')
.post(function(req, res) {
 const doc = {
     description: req.body.description,
     amount: req.body.amount,
     month: req.body.month,
     year: req.body.year
 };
 console.log(doc);
  Expense.update({_id: req.body._id}, doc, function(err, result) {
      if (err)
        res.send(err);
      res.send('Activity successfully updated!');
  });

});

router.route('/milestones')
.post(function(req, res) {
 const doc = {
     activities: req.body.activities,
     milestones : req.body.milestones,
     checked : req.body.checked
 };
 console.log(doc);
  Expense.update({_id: req.body._id}, doc, function(err, result) {
      if (err)
        res.send(err);
      res.send('Milestones successfully updated!');
  });
});

//router.route('/milestones')
//.post(function(req,res) {
// var milestones = new MilestonesModel();
//  //milestones.milestones = req.body.milestones;
//  milestones.progress = req.body.progress;
//  milestones.save(function(err) {
//      if (err)
//        res.send(err);
//      res.send('Milestones successfully added!');
//  });
//})

router.route('/uploads')
.post(function(req,res) {
 const doc = {
     filename: req.body.filename,
     fileUrl : req.body.fileUrl
 };
 console.log(doc);
  Expense.update({_id: req.body._id}, doc, function(err, result) {
      if (err)
        res.send(err);
      res.send('Image successfully updated!');
  });
})

//Manage the get requests
//router.route('/uploads')
//.get(function(req,res) {
//    //find the images inside mongodb
//    Image.find({}, (err,images)=>{
//        if(err){
//            console.log(err);
//        }else{
//            //return the array of images found
//            res.render("uploads", {
//                images : images
//            })
//        }
//    })
//    res.send(req.files);
//})

//Manage the post requests
router.route('/upload')
.post(function(req,res) {
    //need to check if the req.file is set
//    if(req.file == null || req.file == undefined || req.file == ""){
//        //redirect to the same url
//        res.redirect("/")
//    }
//    else{
        //An error occured while uploading
        if(err) {
            console.log(err);
        }
        else{
            //Everything went fine
            //Define what to do with the params
            //both the req.body and req.file are accessible here
            console.log(req.file);
            console.log(req.body);
            
            //store the file name to mongodb
            //we use the model to store the file
            var image = new Image();
            image.filename = req.file.filename;
            image.fileUrl = req.file.fileUrl;
            
            //save the image
            image.save(()=>{
               if(err)
                    res.send(err);
                //render the view again
                res.send("Image upload success")
                //res.redirect("/uploads");                  
            });
        }
//    }
    //res.send(req.files);
})

router.post('/', upload.any(), function(req,res) {
 //var expense = new Expense();
 //expense.fileName = req.body.file;

//expense.save(function(err) {
//      if (err)
//        res.send(err);
//      res.send('Expense successfully uploaded!');
//  });
    res.send(req.files);
})

router.get('/delete', function(req, res){
 var id = req.query.id;
 Expense.find({_id: id}).remove().exec(function(err, expense) {
  if(err)
   res.send(err)
  res.send('Activity successfully deleted!');
 })
});

router.get('/getAll',function(req, res) {
 var monthRec = req.query.month;
 var yearRec = req.query.year;
 if(monthRec && monthRec != 'All'){
  Expense.find({$and: [ {month: monthRec}, {year: yearRec}]}, function(err, expenses) {
   if (err)
    res.send(err);
   res.json(expenses);
  });
 } else {
  Expense.find({year: yearRec}, function(err, expenses) {
   if (err)
    res.send(err);
   res.json(expenses);
  });
 }

});

module.exports = router;