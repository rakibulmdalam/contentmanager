var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PhotoSchema = new Schema({
    cloudId: {
        type: String,
        required: true,
        unique: true
    },
    owner: {
    	type: String,
    	required: true,
    },
    secret: {
    	type: String,
    	required: true,
    },
    server: {
    	type: String,
    	required: true,
    },
    farm: {
    	type: String,
    	required: true,
    },
    location: {
        type: String,
        required: false
    },
    people: {
        type: Array,
        required: false
    },
    date: {
        type: Date,
        require: false
    },
    tags: {
        type: Array,
        required: true
    },
    created_at: {
        type: Date,
        required: false
    },
    updated_at: {
        type: Date,
        required: false
    },
    privacy: {
    	type: String,
    	required: false,
    	default: 'public'
    },
    views: {
    	type: Number,
    	required: false,
    	default: 0
    },
    password: {
    	type: String,
    	required: false
    }
});

// on every save, add the date
PhotoSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();

    // change the updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at) {
        this.created_at = currentDate;
    }

    next();
});

mongoose.model('photos', PhotoSchema);