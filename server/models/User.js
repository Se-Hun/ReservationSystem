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
        collection: 'User',
        versionKey: false
    }
);

// To login
UserSchema.statics.login = function(account) {
    return this.findOne({account});
    // Return값 바꿀것 : login_result -> User Object랑 success여부를 dictionary에 넣어서 반환하도록 할것
}

// To register User Information
UserSchema.statics.register = function(account, accountname, phonenum, password, cardcompany, cardnum) {
    var NewUser = new this(account, accountname, phonenum, password, cardcompany, cardnum)

    return NewUser.save(); // DAO 클래스의 요구사항을 맞추기 위해 이 부분에 if문 걸어서 register_result를 반환해주면 될듯!!
    // Return값 바꿀것 : register_result
}

// To modify User Information
UserSchema.statics.modify = function(account, accountname, phonenum, password, cardcompany, cardnum) {
    // 꼭 매개변수에 위의 모든 파라미터들이 다 들어가야할까....?
    // 사실 필요는 없지만 설계를 그렇게 해서...

    // { new: true } : return the modified document rather than the original. Default is false.
    return this.findOneAndUpdate({account}, accountname, phonenum, password, cardcompany, cardnum, {new: true});
    // Return값 바꿀것 : modify_result
}

// To return User's bookmarks
UserSchema.statics.returnBookmarks = function(account) {
    // Find User by ID
    // Return Account's Bookmarks

    var User = new mongoose.model('User', UserSchema);
    var findedUser = User.login(account);
    // 이걸로 bookmark만 뽑아오자.
    // Return값 바꿀것 : bookmarks
}

module.exports = mongoose.model('User', UserSchema);