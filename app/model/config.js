
module.exports = ({ mongoose }) => {
  const { Schema } = mongoose;

  const configSchema = new Schema({
    key: String,
    value: String,
  });

  return mongoose.model('Config', configSchema);
};
