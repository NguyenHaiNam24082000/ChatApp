const httpStatus = require("http-status");
const ShortUniqueId = require("short-unique-id");
const { User, Friend, Channel, Workspace } = require("../models");
const ApiError = require("../utils/ApiError");
const { removeAccents } = require("../commons/removeAccents");
// const {COLORS}=
const uid = new ShortUniqueId({
  length: 5,
  dictionary: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
});

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  let error = {};
  (await User.isEmailTaken(userBody.email)) &&
    (error.email = "Email already taken");
  (await User.isUsernameTaken(userBody.username)) &&
    (error.username = "Username already taken");
  if (Object.keys(error).length > 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, JSON.stringify(error));
  }

  userBody.discriminator = uid();
  // userBody.color = COLORS[Math.floor(Math.random() * COLORS.length)];
  const user = await User.create(userBody);
  return user;
};
/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
//TODO: xxx
const queryUsers = async (user, filter) => {
  const { username, discriminator } = filter;
  const users = await User.find({
    _id: {
      $ne: user._id,
    },
    username: { $regex: `.*${removeAccents(username)}.*`, $options: "i" },
    ...(discriminator && { discriminator }),
  });
  const mutualUsersFriends = await Promise.all(
    users.map(async (u) => {
      return {
        id: u.id,
        name: u.name,
        username: u.username,
        avatar_url: u.avatar_url,
        discriminator: u.discriminator,
        accent_color: u.accent_color,
        mutualFriends: await getMutualUserIds(user._id, u._id),
      };
    })
  );
  return mutualUsersFriends;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  await user.remove();
  return user;
};

const getAllUsers = async () => {
  return User.find();
};

const getMutualUserIds = async (userAId, userBId) => {
  const userA = await Friend.find({
    $or: [
      {
        sender: userAId,
      },
      {
        receiver: userAId,
      },
    ],
    status: "FRIEND",
  })
    .populate({
      path: "sender",
      select: [
        "id",
        "name",
        "username",
        "avatar_url",
        "accent_color",
        "discriminator",
      ],
    })
    .populate({
      path: "receiver",
      select: [
        "id",
        "name",
        "username",
        "avatar_url",
        "accent_color",
        "discriminator",
      ],
    });
  const userB = await Friend.find({
    $or: [
      {
        sender: userBId,
      },
      {
        receiver: userBId,
      },
    ],
    status: "FRIEND",
  })
    .populate({
      path: "sender",
      select: [
        "id",
        "name",
        "username",
        "avatar_url",
        "accent_color",
        "discriminator",
      ],
    })
    .populate({
      path: "receiver",
      select: [
        "id",
        "name",
        "username",
        "avatar_url",
        "accent_color",
        "discriminator",
      ],
    });
  const mutualFriends = userA.filter((friend) => {
    return userB.some((friend2) => {
      return (
        friend.sender._id.equals(friend2.sender._id) ||
        friend.receiver._id.equals(friend2.receiver._id)
      );
    });
  });
  const mutualFriendIds = mutualFriends.map((friend) => {
    if (friend.sender._id.equals(userAId)) {
      return friend.receiver;
    }
    return friend.sender;
  });
  return mutualFriendIds;
};

const getMutualChannelIds = async (userAId, userBId) => {
  const channels = await Channel.find({
    type: {
      $in: ["DM", "GROUP"],
    },
    $or: [
      {
        members: userAId,
        owner: userBId,
      },
      {
        members: userBId,
        owner: userAId,
      },
      {
        members: [userAId, userBId],
      },
    ],
  }).populate("members");
  return channels;
};

const getMutualServerIds = async (userAId, userBId) => {
  const servers = await Workspace.find({
    $or: [
      {
        members: userAId,
        owner: userBId,
      },
      {
        members: userBId,
        owner: userAId,
      },
      {
        members: [userAId, userBId],
      },
    ],
  });
  return servers;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  getAllUsers,
  getMutualUserIds,
  getMutualChannelIds,
  getMutualServerIds,
};
