const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema(
    {
        account: {type: String, required: true, unique: true},
        accountname: {type: String, required: true},
        phonenum: {type: String, required: true},
        password: {type: String, required: true},
        cardcompany: {type: String, required: true},
        cardnum: {type: String, required: true},
        reservation: {type: Array}, // 예약 목록이 없을 수도 있음.
        bookmarks: {type: Array} // 즐겨찾기 목록이 없을 수도 있음.
    },
    {
        collection: 'User'
    }
);

// To login
UserSchema.statics.login = function(account) {
    return this.findOne({account});
}

// To register User Information
UserSchema.statics.register = function(account, accountname, phonenum, password, cardcompany, cardnum) {
    // Please Edit DB save Code
}

// To modify User Information
UserSchema.statics.modify = function(account, accountname, phonenum, password, cardcompany, cardnum) {
    // 꼭 매개변수에 위의 모든 파라미터들이 다 들어가야할까....?
    // 사실 필요는 없지만 설계를 그렇게 해서...

}

//
UserSchema.statics.returnBookmarks = function(account) {
    // Find User by ID
    // Return Account's Bookmarks
}

module.exports = mongoose.model('User', UserSchema);
