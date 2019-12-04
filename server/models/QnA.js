const mongoose = require('mongoose');
const {Schema} = mongoose;

const QnASchema = new Schema(
    {
        id : {type: Number, required: true, unique: true},
        title : {type: String, required: true},
        content: {type: String, required: true}
    },
    {
        collection: 'QnA',
        versionKey: false
    }
);

// To get QnA Board List
QnASchema.statics.get_title_list = function() {
    // const searched_list = this.find({})

    // console.log(searched_list)

    // let title_list = []
    // for(var i = 0; i < searched_list.length; i++) {
        // console.log(title_list)
        // console.log(searched_list[i])
        // title_list = title_list.push({
        //     id : searched_list[i].id,
        //     title : searched_list[i].title
        // })
    // }
    // console.log(title_list)
    // return title_list
    // return searched_list
}

module.exports = mongoose.model('QnA', QnASchema);