
module.exports = ({ mongoose }) => {
  const { Schema } = mongoose;
  const { ObjectId } = Schema.Types;

  const postSchema = new Schema({
    poster: ObjectId,
    content: String,
    originator: {
      type: ObjectId,
      default: null,
    },
  });

  return mongoose.model('Post', postSchema);
};
