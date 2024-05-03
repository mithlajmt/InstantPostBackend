const Post = require('./../models/post');

const getPosts = async (req, res) => {
    try {
        const userId = req.user.userId; 

 
        const activePosts = await Post.find({ createdBy: userId, status: 'active' });

        const inactivePosts = await Post.find({ createdBy: userId, status: 'inactive' });

        res.status(200).json({ success: true, activePosts, inactivePosts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

module.exports = {
    getPosts
};
