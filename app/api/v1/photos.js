/*[
		{
			"flickrId": "423532523",
			"location": "test",
			"people": ["one", "two"],
			"date": "12-10-2018",
			"tags": ["one", "two"]
		},
		{
			"flickrId": "423532523",
			"location": "test",
			"people": ["one", "two"],
			"date": "12-10-2018",
			"tags": ["one", "two"]
		},
		{
			"flickrId": "423532523",
			"location": "test",
			"people": ["one", "two"],
			"date": "12-10-2018",
			"tags": ["one", "two"]
		}
]*/

/*
* For photo management
*/


var config = require('config');
var mongoose = require('mongoose');
var inputValidation = require('./helpers/validationHelper')
var photoFunctions = require('./photosFunctions');


module.exports = {

    register: async (req, res) => {
        var failedList = [];
        try {
        	var photosArray = req.body;
        	for(var i = 0; i < photosArray.length; i++){
        		if (photosArray[i].farm && photosArray[i].server && photosArray[i].cloudId && photosArray[i].secret && photosArray[i].tags.length > 0){
        			console.log('processing: '+ photosArray[i].cloudId);
        			photoFunctions.savePhoto(photosArray[i]);
        		} else {
        			failedList.push(photosArray[i].cloudId);
        		}
	        }
	        res.status(201).send({failed: failedList});

        } catch(err){
        	return res.end(res.writeHead(400, 'DATA_PROCESSING_ERROR'));
        };
    },

    retrieveAll: async (req, res) => {
        var photoList = [];
        try {
        	var results = await photoFunctions.readAllPhotos();
        	if (results.statusCode >= 300) {
	            return res.end(res.writeHead(results.statusCode, results.reasonPhrase));
	        }

        	var photosArray = results.photos;
        	for(var i = 0; i < photosArray.length; i++){
        		var url = {};
				url.small = "https://farm"+photosArray[i].farm+".staticflickr.com/"+photosArray[i].server+"/"+photosArray[i].cloudId+"_"+photosArray[i].secret+"_n.jpg";
				url.medium = "https://farm"+photosArray[i].farm+".staticflickr.com/"+photosArray[i].server+"/"+photosArray[i].cloudId+"_"+photosArray[i].secret+"_c.jpg";
				url.large = "https://farm"+photosArray[i].farm+".staticflickr.com/"+photosArray[i].server+"/"+photosArray[i].cloudId+"_"+photosArray[i].secret+"_b.jpg";
				url.xlarge = "https://farm"+photosArray[i].farm+".staticflickr.com/"+photosArray[i].server+"/"+photosArray[i].cloudId+"_"+photosArray[i].secret+"_h.jpg";
        		var tempPhoto = {};
        		tempPhoto.url = url;
        		tempPhoto.tags = photosArray[i].tags;
        		tempPhoto.people = photosArray[i].people;
        		tempPhoto.location = photosArray[i].location;

        		
        		photoList.push(tempPhoto);
	        }
	        return res.status(results.statusCode).send({photos: photoList});

        } catch(err){
        	console.log(err);
        	return res.end(res.writeHead(500, 'SERVER_ERROR'));
        };
    },

    tagSearch: async (req, res) => {
		var photoList = [];
        try {
        	var results = await photoFunctions.searchTags(req.params.tag);
        	if (results.statusCode >= 300) {
	            return res.end(res.writeHead(results.statusCode, results.reasonPhrase));
	        }

        	var photosArray = results.photos;
        	for(var i = 0; i < photosArray.length; i++){
        		var url = {};
				url.small = "https://farm"+photosArray[i].farm+".staticflickr.com/"+photosArray[i].server+"/"+photosArray[i].cloudId+"_"+photosArray[i].secret+"_n.jpg";
				url.medium = "https://farm"+photosArray[i].farm+".staticflickr.com/"+photosArray[i].server+"/"+photosArray[i].cloudId+"_"+photosArray[i].secret+"_c.jpg";
				url.large = "https://farm"+photosArray[i].farm+".staticflickr.com/"+photosArray[i].server+"/"+photosArray[i].cloudId+"_"+photosArray[i].secret+"_b.jpg";
				url.xlarge = "https://farm"+photosArray[i].farm+".staticflickr.com/"+photosArray[i].server+"/"+photosArray[i].cloudId+"_"+photosArray[i].secret+"_h.jpg";
        		var tempPhoto = {};
        		tempPhoto.url = url;
        		tempPhoto.tags = photosArray[i].tags;
        		tempPhoto.people = photosArray[i].people;
        		tempPhoto.location = photosArray[i].location;

        		
        		photoList.push(tempPhoto);
	        }
	        return res.status(results.statusCode).send({photos: photoList});

        } catch(err){
        	console.log(err);
        	return res.end(res.writeHead(500, 'SERVER_ERROR'));
        };
    },

    tagUpdate: async (req, res) => {
    	if (req.body.method && req.body.method === 'add'){
    		try {
	        	var results = await photoFunctions.addTags(req);
	        	if (results.statusCode >= 300) {
		            return res.end(res.writeHead(results.statusCode, results.reasonPhrase));
		        }
		        return res.status(results.statusCode).send({});

	        } catch(err){
	        	console.log(err);
	        	return res.end(res.writeHead(500, 'SERVER_ERROR'));
	        };
    	} else {
    		try {
	        	var results = await photoFunctions.updateTags(req);
	        	if (results.statusCode >= 300) {
		            return res.end(res.writeHead(results.statusCode, results.reasonPhrase));
		        }
		        return res.status(results.statusCode).send({});

	        } catch(err){
	        	console.log(err);
	        	return res.end(res.writeHead(500, 'SERVER_ERROR'));
	        };
    	}
    },

    peopleUpdate: async (req, res) => {
        if (req.body.method && req.body.method === 'add'){
    		try {
	        	var results = await photoFunctions.addPeople(req);
	        	if (results.statusCode >= 300) {
		            return res.end(res.writeHead(results.statusCode, results.reasonPhrase));
		        }
		        return res.status(results.statusCode).send({});

	        } catch(err){
	        	console.log(err);
	        	return res.end(res.writeHead(500, 'SERVER_ERROR'));
	        };
    	} else {
    		try {
	        	var results = await photoFunctions.updatePeople(req);
	        	if (results.statusCode >= 300) {
		            return res.end(res.writeHead(results.statusCode, results.reasonPhrase));
		        }
		        return res.status(results.statusCode).send({});

	        } catch(err){
	        	console.log(err);
	        	return res.end(res.writeHead(500, 'SERVER_ERROR'));
	        };
    	}
    },

    peopleSearch: async (req, res) => {
		var photoList = [];
        try {
        	var results = await photoFunctions.searchPeople(req.params.people);
        	if (results.statusCode >= 300) {
	            return res.end(res.writeHead(results.statusCode, results.reasonPhrase));
	        }

        	var photosArray = results.photos;
        	for(var i = 0; i < photosArray.length; i++){
        		var url = {};
				url.small = "https://farm"+photosArray[i].farm+".staticflickr.com/"+photosArray[i].server+"/"+photosArray[i].cloudId+"_"+photosArray[i].secret+"_n.jpg";
				url.medium = "https://farm"+photosArray[i].farm+".staticflickr.com/"+photosArray[i].server+"/"+photosArray[i].cloudId+"_"+photosArray[i].secret+"_c.jpg";
				url.large = "https://farm"+photosArray[i].farm+".staticflickr.com/"+photosArray[i].server+"/"+photosArray[i].cloudId+"_"+photosArray[i].secret+"_b.jpg";
				url.xlarge = "https://farm"+photosArray[i].farm+".staticflickr.com/"+photosArray[i].server+"/"+photosArray[i].cloudId+"_"+photosArray[i].secret+"_h.jpg";
        		var tempPhoto = {};
        		tempPhoto.url = url;
        		tempPhoto.tags = photosArray[i].tags;
        		tempPhoto.people = photosArray[i].people;
        		tempPhoto.location = photosArray[i].location;

        		
        		photoList.push(tempPhoto);
	        }
	        return res.status(results.statusCode).send({photos: photoList});

        } catch(err){
        	console.log(err);
        	return res.end(res.writeHead(500, 'SERVER_ERROR'));
        };
    },

    locationSearch: async (req, res) => {
		var photoList = [];
        try {
        	var results = await photoFunctions.searchLocation(req.params.location);
        	if (results.statusCode >= 300) {
	            return res.end(res.writeHead(results.statusCode, results.reasonPhrase));
	        }

        	var photosArray = results.photos;
        	for(var i = 0; i < photosArray.length; i++){
        		var url = {};
				url.small = "https://farm"+photosArray[i].farm+".staticflickr.com/"+photosArray[i].server+"/"+photosArray[i].cloudId+"_"+photosArray[i].secret+"_n.jpg";
				url.medium = "https://farm"+photosArray[i].farm+".staticflickr.com/"+photosArray[i].server+"/"+photosArray[i].cloudId+"_"+photosArray[i].secret+"_c.jpg";
				url.large = "https://farm"+photosArray[i].farm+".staticflickr.com/"+photosArray[i].server+"/"+photosArray[i].cloudId+"_"+photosArray[i].secret+"_b.jpg";
				url.xlarge = "https://farm"+photosArray[i].farm+".staticflickr.com/"+photosArray[i].server+"/"+photosArray[i].cloudId+"_"+photosArray[i].secret+"_h.jpg";
        		var tempPhoto = {};
        		tempPhoto.url = url;
        		tempPhoto.tags = photosArray[i].tags;
        		tempPhoto.people = photosArray[i].people;
        		tempPhoto.location = photosArray[i].location;

        		
        		photoList.push(tempPhoto);
	        }
	        return res.status(results.statusCode).send({photos: photoList});

        } catch(err){
        	console.log(err);
        	return res.end(res.writeHead(500, 'SERVER_ERROR'));
        };
    },
};