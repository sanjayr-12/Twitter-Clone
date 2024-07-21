import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";

export const getUserProfile = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const followUnfollowUs = async (req, res) => {
  try {
    const { id } = req.params;
    const userToModify = await User.findById(id);
    const currectUser = await User.findById(req.user._id);
    if (id === req.user._id.toString()) {
      return res.status(400).json({ error: "You can't follow yourself" });
    }
    if (!userToModify || !currectUser) {
      return res.status(400).status(400).json({ error: "User not found" });
    }
    const isFollowing = currectUser.following.includes(id);

    if (isFollowing) {
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $pull: { followers: id } });
      res.status(200).json({ message: "User unfollowed successfully" });
    } else {
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $push: { followers: id } });

      const newNotification = new Notification({
        type: "follow",
        from: req.user._id,
        to: userToModify._id,
      });
      await newNotification.save();
      res.status(200).json({ message: "User followed Successfully" });
    }
  } catch (error) {
    console.log("hello");
    res.status(500).json({ error: error.message });
  }
};


export const getSuggestedUser = async (req, res) => {
    try {
        const userId = req.user._id
        const userFollowedByMe = await User.findById(userId).select("following")
        const users = await User.aggregate([
            {
                $match: {
                    _id:{$ne:userId}
                }
            },
            {$sample:{size:10}}
        ])

        const filteredUsers = users.filter(user => !userFollowedByMe.following.includes(user._id))
        const suggestedUsers = filteredUsers.slice(0, 4)
        suggestedUsers.forEach(user => user.password = null)
        res.status(200).json(suggestedUsers)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
