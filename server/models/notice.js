const mongoose = require('mongoose');
const {Schema} = mongoose;

const noticeSchema = new Schema(
    {
        title: {type: String, required: true, unique: true},
        content: {type: String, required: true},
    },
    {
        collection: 'notice',
        versionKey: false
    }
);

noticeSchema.statics.getQnAAll = function() {
    return this.find({});
}

noticeSchema.statics.getContents = function(t) {
    return this.findOne({ title: t});
}

noticeSchema.statics.newContent = function(data) {
    var newContent = new this(data)
    return newContent.save();
}

module.exports = mongoose.model('notice', noticeSchema);
