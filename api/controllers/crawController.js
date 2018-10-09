
const mongoose = require('mongoose');
const Task = mongoose.model('noticias');
const rp = require('request');
const cheerio = require('cheerio');
const MongoClient = require('mongodb').MongoClient;
const urlMongo = "mongodb://localhost:27017/";

exports.craw = function(req, res) {            
        rp(`http://www.ifpe.edu.br/noticias`, function(err,response,body) {
    
            var $ = cheerio.load(body); 
            var array = [];
            var news = [];
            
            $('div.tileItem').each((i, element) => {
                let newsElement = {}; 
                newsElement.titulo = $(element).find('h2.tileHeadline').text().replace(/[\n]/g, '').trim();
                newsElement.body = $(element).find('p').text().trim();
                newsElement.date = $($(element).find('.summary-view-icon')[0]).text().replace(/[\n]/g, '').trim();
                // newsElement.hour = $(element).find('.summary-view-icon')[1].text().replace(/[\n]/g, '').trim();
                // newsElement.type = $(element).find('.summary-view-icon')[2].text().replace(/[\n]/g, '').trim();

                newsElement.id = i;            

                console.log(newsElement);
                news.push(newsElement);
            });     
            
            var jsonObj = {};
            var test = [];
            for (var i = 0 ; i < array.length; i++) {
                jsonObj[(i)] = array[i];
                test.push(jsonObj);
                jsonObj = {};
            }
                // console.log(news);
                MongoClient.connect(urlMongo,function (err, db) { 
    
                var dbo = db.db('mydb');
                dbo.collection('noticias').insertMany(news, function (err, res) {
                    // console.log("Numero de noticias inseridas: " + res.insertedCount);
                    db.close();
                })       
            })
    
        });
    Task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};




exports.list_all = function(req, res) {
  Task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};




exports.create = function(req, res) {
  var new_task = new Task(req.body);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.read = function(req, res) {
  Task.findById(req.params.postId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update = function(req, res) {
  Task.findOneAndUpdate({_id: req.params.postId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete = function(req, res) {
  Task.remove({}, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Deletado' });
  });
};

