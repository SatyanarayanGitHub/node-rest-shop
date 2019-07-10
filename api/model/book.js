let mongoose = require('mongoose');

let Schema = mongoose.Schema;

//Book schema definitation
let BookSchema = new Schema(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        year: { type: Number, required: true },
        pages: { type: Number, required: true, min: 1 },
        bookImagePath: { type: String },
        bookImageName: { type: String },
        createdAt: { type: Date, default: Date.now }        
    },
    {
        versionKey: false
    }
);

// Sets the createdAt parameter equal to the current time
/*
BookSchema.pre('save', next => {
    now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});
*/

BookSchema.pre('update', next => {
    //now = new Date();
    console.log('==>> Pre Update Book :: ' + now);

    if (!this.updatedAt) {
        this.updatedAt = Date.now;
    }
    next();
});


// Export the BookSchema for use in applicaiton anywhere
module.exports = mongoose.model('Book', BookSchema);