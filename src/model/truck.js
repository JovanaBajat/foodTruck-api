import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const newTruck = new Schema({
    name: {
        type: String,
        required: true
    },
    foodType: {
        type: String,
        required: true
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, {
  versionKey : false
});

module.exports = mongoose.model('Truck', newTruck, 'trucks');
