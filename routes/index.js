const express = require('express')
const router = express.Router()

const models = require('../models');
const Page = models.Page; 
const User = models.User;

const wikiRouter = require('./wiki.js')

router.use('/wiki', wikiRouter);
router.use(express.static('public'))

module.exports = (function(){

	router.get('/', function(req,res,next){
		Page.findAll()
		.then(function(foundPages){
			console.log(foundPages)
			res.render('index', { pages: foundPages })		
		})
	})

	return router
})()
