
const typeMap = {
  ADMIN: 0,
  MEMBER: 1,
};

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

  check: (auth, role) => {
    if (!auth) return false;

    if (!(['ADMIN', 'MEMBER'].includes(auth.usertype))) return false;

    return typeMap[auth.usertype] <= typeMap[role];
  },
});
