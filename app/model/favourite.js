
module.exports = ({ mongoose }) => {
  const { Schema } = mongoose;
  const { ObjectId } = Schema.Types;

  const favSchema = new Schema({
    user: ObjectId,
    post: ObjectId,
  });

  return mongoose.model('Favourite', favSchema);
};
