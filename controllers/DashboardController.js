const Post = require('./../models/post');

const getPosts = async (req, res) => {
    try {
        const userName = req.user.userName; 
        

 
        const activePosts = await Post.find({ createdBy: userName, status: 'active' });

        const inactivePosts = await Post.find({ createdBy: userName, status: 'inactive' });

        res.status(200).json({ success: true, activePosts, inactivePosts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

module.exports = {
    getPosts
};

