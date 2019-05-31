
module.exports = ({ model }) => ({
  auth: async (token) => {
    const parsed = Buffer.from(token, 'base64').toString();
    const [user, pass] = parsed.split(':');
    if (user === undefined || pass === undefined) return false;

    return ((await model.user.where({
      username: user,
      password: pass,
    }).countDocuments()) > 0);
  },
});
