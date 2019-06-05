
module.exports = {
  Query: {
    user: async (_, { id }, { logger, model, auth }) => {
      if (id === undefined) return auth;

      try {
        return await model.user.findById(id);
      } catch (e) {
        logger.warn(`Unsuccessful attempt: ${id}`);
        return null;
      }
    },

    userByName: async (_, { username }, { logger, model }) => {
      try {
        return await model.user.findOne({ username });
      } catch (e) {
        logger.warn(e);
        return null;
      }
    },

    allusers: async (_, params, { logger, model }) => {
      try {
        return await model.user.find({});
      } catch (e) {
        logger.warn(e);
        return [];
      }
    },

    whoami: (_, params, { auth }) => auth,

    isStarring: async (_, { id }, { logger, auth, model }) => {
      if (!auth) return false;

      try {
        const res = await model.fav.countDocuments({
          user: auth.id,
          post: id,
        });
        return (res > 0);
      } catch (e) {
        logger.warn(e);
        return false;
      }
    },

    isFollowing: (_, { id }, { auth, checkPermission }) => {
      checkPermission('MEMBER');

      return auth.following.includes(id);
    },
  },

  Mutation: {
    register: async (_, { form }, { logger, model }) => {
      try {
        const me = await model.user.create({
          username: form.username,
          password: form.password,
        });

        // make I follow me for convience
        me.following.push(me.id);
        await me.save();

        return me;
      } catch (e) {
        logger.warn(e);
        return null;
      }
    },

    removeUser: async (_, { id }, { logger, model, checkPermission }) => {
      checkPermission('ADMIN');
      if (id === undefined) return false;
      if (id === null) return false;

      try {
        const res = await model.user.deleteOne({ _id: id });
        return (res.deletedCount > 0);
      } catch (e) {
        logger.warn(e);
        return false;
      }
    },

    follow: async (_, { id }, { logger, auth, checkPermission }) => {
      checkPermission('MEMBER');

      try {
        if (auth.id === id) return false;
        if (auth.following.includes(id)) return true;

        auth.following.push(id);
        await auth.save();

        return true;
      } catch (e) {
        logger.warn(e);
        return false;
      }
    },

    unfollow: async (_, { id }, { logger, auth, checkPermission }) => {
      checkPermission('MEMBER');

      try {
        auth.following = auth.following.filter(fid => String(fid) !== id); // eslint-disable-line
        await auth.save();
        return true;
      } catch (e) {
        logger.warn(e);
        return false;
      }
    },

    star: async (_, { id }, {
      logger, auth, model, checkPermission,
    }) => {
      checkPermission('MEMBER');

      try {
        const res = await model.fav.create({
          user: auth.id,
          post: id,
        });
        return (res !== null);
      } catch (e) {
        logger.warn(e);
        return false;
      }
    },

    unstar: async (_, { id }, {
      logger, auth, model, checkPermission,
    }) => {
      checkPermission('MEMBER');

      try {
        const res = await model.fav.remove({
          user: auth.id,
          post: id,
        });
        return (res.deletedCount > 0);
      } catch (e) {
        logger.warn(e);
        return false;
      }
    },
  },

  User: {
    following: async (parent, _, { logger, model }) => {
      try {
        const { id } = parent;
        const user = await model.user.findById(id);
        if (user === null) return [];

        const followingIds = user.following;
        if (!followingIds) return [];

        const followings = await model.user.find({
          _id: { $in: followingIds },
        });
        return followings;
      } catch (e) {
        logger.warn(e);
        return [];
      }
    },

    favourites: async (parent, _, { logger, model }) => {
      try {
        const pids = (await model.fav.find({
          user: parent.id,
        }, 'post')).map(rel => rel.post);
        return await model.post.find({
          _id: { $in: pids },
        });
      } catch (e) {
        logger.warn(e);
        return [];
      }
    },

    lastPostedAt: async (parent, _, { logger, model }) => {
      try {
        const uid = parent.id;

        const res = await model.post.find({
          poster: uid,
        }).sort('-createdAt').limit(1);

        if (res.length === 0) return null;

        return res[0].createdAt;
      } catch (e) {
        logger.warn(e);
        return null;
      }
    },
  },
};
