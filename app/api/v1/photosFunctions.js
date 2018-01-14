var config = require('config');
var jwt = require('jwt-simple');
var mongoose = require('mongoose');
var Photos = mongoose.model('photos');
// TODO combine these two functions by giving in a JSON with either mail or ID

function savePhoto(photo) {

    var photoDoc = new Photos({
        cloudId: photo.cloudId,
        owner: photo.owner,
        secret: photo.secret,
        server: photo.server,
        farm: photo.farm,
        location: photo.location,
        people: photo.people,
        date: photo.date,
        tags: photo.tags
    });

    photoDoc.save( function (err){
        if (err) {
            console.log(photo.cloudId + ": could not be saved. [Reason]: \n" + err);
        } else {
            console.log(photo.cloudId + ": was saved successfully.");
        }
    });
}

async function readAllPhotos(input) {
    var resOutput = input || {statusCode: 0, reasonPhrase: ''};
    return new Promise(resolve => {
        Photos.find({}, function(err, photos) {
            if (err) {
                resOutput.statusCode = 500;
                resOutput.reasonPhrase = "DOCUMENT_READ_ERROR";
            }

            // object of all the users
            if (photos.length > 0){
                resOutput.statusCode = 200;
                resOutput.reasonPhrase = "OK";
                resOutput.photos = photos;
            } else {
                resOutput.statusCode = 404;
                resOutput.reasonPhrase = "NO_PHOTOS_FOUND";
            }

            resolve(resOutput);
        });
    });
}


async function searchTags(tag, input) {
    var resOutput = input || {statusCode: 0, reasonPhrase: ''};
    return new Promise(resolve => {
        Photos.find({ tags: tag }, function(err, photos) {
            if (err) {
                resOutput.statusCode = 500;
                resOutput.reasonPhrase = "DOCUMENT_READ_ERROR";
            }

            // object of all the users
            if (photos.length > 0){
                resOutput.statusCode = 200;
                resOutput.reasonPhrase = "OK";
                resOutput.photos = photos;
            } else {
                resOutput.statusCode = 404;
                resOutput.reasonPhrase = "NO_PHOTOS_FOUND";
            }

            resolve(resOutput);
        });
    });
}

async function updateTags(req, input) {
    var resOutput = input || {statusCode: 0, reasonPhrase: ''};
    return new Promise(resolve => {
        Photos.findOne({ cloudId: req.body.cloudId }, function(err, photo) {
            if (err) {
                resOutput.statusCode = 500;
                resOutput.reasonPhrase = "DOCUMENT_READ_ERROR";
            }
            console.log(photo);
            if (!photo){
                resOutput.statusCode = 404;
                resOutput.reasonPhrase = "NO_PHOTOS_FOUND";
            } else {
                resOutput.statusCode = 200;
                resOutput.reasonPhrase = "OK";
                try{
                    photo.tags = req.body.tags;
                    photo.save(function (err){
                        if (err) {
                            console.log(photo.cloudId + ": could not be saved. [Reason]: \n" + err);
                        } else {
                            console.log(photo.cloudId + ": was saved successfully.");
                        }
                    });
                } catch(err){
                    resOutput.statusCode = 500;
                    resOutput.reasonPhrase = "UPDATE_FAILED";
                }
            }

            resolve(resOutput);
        });
    });
}

async function addTags(req, input) {
    var resOutput = input || {statusCode: 0, reasonPhrase: ''};
    return new Promise(resolve => {
        Photos.findOne({ cloudId: req.body.cloudId }, function(err, photo) {
            if (err) {
                resOutput.statusCode = 500;
                resOutput.reasonPhrase = "DOCUMENT_READ_ERROR";
            }
            console.log(photo);
            if (!photo){
                resOutput.statusCode = 404;
                resOutput.reasonPhrase = "NO_PHOTOS_FOUND";
            } else {
                resOutput.statusCode = 200;
                resOutput.reasonPhrase = "OK";
                try{
                    photo.tags = photo.tags.concat(req.body.tags);
                    photo.save(function (err){
                        if (err) {
                            console.log(photo.cloudId + ": could not be saved. [Reason]: \n" + err);
                        } else {
                            console.log(photo.cloudId + ": was saved successfully.");
                        }
                    });
                } catch(err){
                    resOutput.statusCode = 500;
                    resOutput.reasonPhrase = "UPDATE_FAILED";
                }
            }

            resolve(resOutput);
        });
    });
}

async function searchPeople(people, input) {
    var resOutput = input || {statusCode: 0, reasonPhrase: ''};
    return new Promise(resolve => {
        Photos.find({ people: people }, function(err, photos) {
            if (err) {
                resOutput.statusCode = 500;
                resOutput.reasonPhrase = "DOCUMENT_READ_ERROR";
            }

            // object of all the users
            if (photos.length > 0){
                resOutput.statusCode = 200;
                resOutput.reasonPhrase = "OK";
                resOutput.photos = photos;
            } else {
                resOutput.statusCode = 404;
                resOutput.reasonPhrase = "NO_PHOTOS_FOUND";
            }

            resolve(resOutput);
        });
    });
}


async function updatePeople(req, input) {
    var resOutput = input || {statusCode: 0, reasonPhrase: ''};
    return new Promise(resolve => {
        Photos.findOne({ cloudId: req.body.cloudId }, function(err, photo) {
            if (err) {
                resOutput.statusCode = 500;
                resOutput.reasonPhrase = "DOCUMENT_READ_ERROR";
            }
            console.log(photo);
            if (!photo){
                resOutput.statusCode = 404;
                resOutput.reasonPhrase = "NO_PHOTOS_FOUND";
            } else {
                resOutput.statusCode = 200;
                resOutput.reasonPhrase = "OK";
                try{
                    photo.people = req.body.people;
                    photo.save(function (err){
                        if (err) {
                            console.log(photo.cloudId + ": could not be saved. [Reason]: \n" + err);
                        } else {
                            console.log(photo.cloudId + ": was saved successfully.");
                        }
                    });
                } catch(err){
                    resOutput.statusCode = 500;
                    resOutput.reasonPhrase = "UPDATE_FAILED";
                }
            }

            resolve(resOutput);
        });
    });
}

async function addPeople(req, input) {
    var resOutput = input || {statusCode: 0, reasonPhrase: ''};
    return new Promise(resolve => {
        Photos.findOne({ cloudId: req.body.cloudId }, function(err, photo) {
            if (err) {
                resOutput.statusCode = 500;
                resOutput.reasonPhrase = "DOCUMENT_READ_ERROR";
            }
            console.log(photo);
            if (!photo){
                resOutput.statusCode = 404;
                resOutput.reasonPhrase = "NO_PHOTOS_FOUND";
            } else {
                resOutput.statusCode = 200;
                resOutput.reasonPhrase = "OK";
                try{
                    photo.people = photo.people.concat(req.body.people);
                    photo.save(function (err){
                        if (err) {
                            console.log(photo.cloudId + ": could not be saved. [Reason]: \n" + err);
                        } else {
                            console.log(photo.cloudId + ": was saved successfully.");
                        }
                    });
                } catch(err){
                    resOutput.statusCode = 500;
                    resOutput.reasonPhrase = "UPDATE_FAILED";
                }
            }

            resolve(resOutput);
        });
    });
}

async function searchLocation(location, input) {
    var resOutput = input || {statusCode: 0, reasonPhrase: ''};
    return new Promise(resolve => {
        Photos.find({ location: location }, function(err, photos) {
            if (err) {
                resOutput.statusCode = 500;
                resOutput.reasonPhrase = "DOCUMENT_READ_ERROR";
            }

            // object of all the users
            if (photos.length > 0){
                resOutput.statusCode = 200;
                resOutput.reasonPhrase = "OK";
                resOutput.photos = photos;
            } else {
                resOutput.statusCode = 404;
                resOutput.reasonPhrase = "NO_PHOTOS_FOUND";
            }

            resolve(resOutput);
        });
    });
}

module.exports = { savePhoto, readAllPhotos, searchTags, searchPeople, searchLocation, updateTags, updatePeople, addPeople, addTags };