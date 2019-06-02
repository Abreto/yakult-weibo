
module.exports = ({ mongoose }) => {
  const { Schema } = mongoose;

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
  });

  return mongoose.model('User', userSchema);
};
