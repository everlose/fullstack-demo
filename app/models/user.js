var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    head_img: String,
	nick_name: String,
	password: String,
	name: String,
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		}
	}
});

// userSchema.pre('save', function(next) {
// 	if (this.isNew) {
// 		this.meta.createAt = this.meta.updateAt = Date.now();
// 	} else {
// 		this.meta.updateAt = Date.now();
// 	}

// 	next();
// })

userSchema.statics = {
	fetch: function (cb) {
		return this
			.find({})
            .exec(cb);
	},
	findById: function(id, cb) {
		return this
			.findOne({_id: id})
			.exec(cb);
	}
}

var user = mongoose.model('users', userSchema)

module.exports = user;
