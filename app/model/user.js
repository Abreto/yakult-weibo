
module.exports = ({ mongoose }) => {
  const { Schema } = mongoose;
  const { ObjectId } = Schema.Types;

  const userSchema = new Schema({
    username: {
      type: String,
      index: true,
      unique: true,
    },
    password: String,
    usertype: {
      type: String,
      enum: [
        'ADMIN',
        'MEMBER',
        'GUEST',
      ],
      default: 'MEMBER',
    },
    following: {
      type: [ObjectId],
      default: [],
    },
  });

  return mongoose.model('User', userSchema);
};
