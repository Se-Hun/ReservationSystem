const mongoose = require('mongoose');
const {Schema} = mongoose;

const qnaSchema = new Schema(
    {
        title: {type: String, required: true, unique: true},
        content: {type: String, required: true},
    },
    {
        collection: 'QnA',
        versionKey: false
    }
);

// 모두 가져오기
qnaSchema.statics.getQnA = function() {
    return this.find({});
}

// 그냥 다 가져옴
qnaSchema.statics.getTitleList = function() {
    return this.find({},{"content":false});
}

qnaSchema.statics.getContents = function(id) {
    return this.findOne({ _id: id});
}

qnaSchema.statics.newContent = function(data) {
    var newContent = new this(data)
    return newContent.save();
}

module.exports = mongoose.model('QnA', qnaSchema);
