
module.exports = ({ mongoose }) => {
  const { Schema } = mongoose;

  const userSchema = new Schema({
    username: {
      type: String,
      index: true,
      unique: true,
    },
    password: String,
  });

  return mongoose.model('User', userSchema);
};
