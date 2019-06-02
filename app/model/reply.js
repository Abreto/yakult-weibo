
module.exports = ({ mongoose }) => {
  const { Schema } = mongoose;
  const { ObjectId } = Schema.Types;

  const replySchema = new Schema({
    to: ObjectId,
    poster: ObjectId,
    content: String,
  }, { timestamps: true });

  return mongoose.model('Reply', replySchema);
};
