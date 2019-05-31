
module.exports = ({ model }) => ({
  auth: async (token) => {
    if (token === undefined) return null;

    const [type, credentials] = token.split(' ');

    if (type !== 'Basic') return null;

    try {
      const parsed = Buffer.from(credentials, 'base64').toString();
      const [user, pass] = parsed.split(':');
      if (user === undefined || pass === undefined) return null;

      return model.user.findOne({
        username: user,
        password: pass,
      });
    } catch (e) {
      return null;
    }
  },
});
