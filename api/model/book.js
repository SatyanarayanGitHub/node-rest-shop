let mongoose = require('mongoose');

let Schema = mongoose.Schema;

//Book schema definitation
let BookSchema = new Schema(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        year: { type: Number, required: true },
        pages: { type: Number, required: true, min: 1 },        
        updatedAt: { type: Date },
    },
    {
        versionKey: false
    }
);

// Sets the createdAt parameter equal to the current time
BookSchema.pre('save', next => {
    now = new Date();

    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

// Export the BookSchema for use in applicaiton anywhere
module.exports = mongoose.model('Book', BookSchema);