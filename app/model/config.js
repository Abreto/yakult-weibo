
module.exports = ({ mongoose }) => {
  const { Schema } = mongoose;

  const configSchema = new Schema({
    key: {
      type: String,
      index: true,
      unique: true,
    },
    value: String,
  });

  return mongoose.model('Config', configSchema);
};
