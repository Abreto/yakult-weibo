
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
  }, { timestamps: true });

  return mongoose.model('Post', postSchema);
};
