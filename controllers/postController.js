const Post = require('./../models/post');

const savePost = async (req, res) => {

    try {
        const { title, body,latitude, longitude } = req.body;

        if (!title.trim() || title.trim().length < 3 || !body.trim() || body.trim().length < 3) {
            return res.status(400).json({ success: false, error: 'Title and body must be at least 3 characters long and cannot consist only of spaces' });
        }

        const newPost = new Post({
            title,
            body,
            createdBy: req.user.userName,
            active: true,
            latitude,
            longitude,
        });

        await newPost.save();

        res.status(201).json({ success: true, message: 'Post saved successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

const editPost = async (req, res, next) => {
    try {
        const postID = req.params._id;
        const { title, body } = req.body;

        if (!title.trim() || title.trim().length < 3 || !body.trim() || body.trim().length < 3) {
            return res.status(400).json({ success: false, error: 'Title and body must be at least 3 characters long and cannot consist only of spaces' });
        }

        const updatedPost = await Post.findByIdAndUpdate(postID, {
            title,
            body
        }, { new: true });

        if (!updatedPost) {
            return res.status(404).json({ success: false, error: 'Post not found' });
        }

        res.status(200).json({ success: true, message: 'Post updated successfully', post: updatedPost });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

module.exports = {
    savePost,
    editPost,
};
