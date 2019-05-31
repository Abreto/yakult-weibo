
module.exports = ({ model }) => ({
  auth: async (token) => {
    const parsed = Buffer.from(token, 'base64').toString();
    const [user, pass] = parsed.split(':');
    if (user === undefined || pass === undefined) return null;

    return model.user.findOne({
      username: user,
      password: pass,
    });
  },
});
