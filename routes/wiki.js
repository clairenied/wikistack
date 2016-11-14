const express = require('express')
const router = express.Router()

const models = require('../models');
const Page = models.Page; 
const User = models.User;


module.exports = (function(){

	router.get('/', function(req, res, next) {
	  res.redirect('/')
	});

	router.post('/', function(req, res, next) {

		var page = Page.build({
			title: req.body.title,
			content: req.body.content,
			status: req.body.status
	  });

	  var user = User.build({
			name: req.body.name,
			email: req.body.email	
	  })
	  
		user.save()
		.then(function(user){
			page.userId = user.id;
			return Promise.all([page.save(), user]);
		})
		.then(function(frenkinseignArray){
			var user = frenkinseignArray[1];
			var page = frenkinseignArray[0];
		  return res.redirect(page.route)
		    // res.redirect(savedPage.route); // route virtual FTW

		})
	});

	router.get('/add', function(req, res, next) {
	  // res.send('got to GET /wiki/add');
	  res.render('addpage')
	});

	router.get('/:urlTitle', function(req, res, next) {

		Page.findOne({ 
	    where: { 
	      urlTitle: req.params.urlTitle 
	    },
	    include: [{ model: User, as: 'author' }]
	  })
	  .then(function(foundPage){
	    res.render('wikipage', { page: foundPage });
	  })
	  .catch(next);


	  // res.render('wikipage', {page: page})
	});

	return router
})()
