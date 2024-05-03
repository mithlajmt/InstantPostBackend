const passport = require('passport');
const jwt = require('jsonwebtoken');

const checkToken = async (req, res,next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      console.log(user);
      console.log(err);
        if (err || !user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            // const token = jwt.sign({ userId: user._id }, process.env.SECRETKEY, { expiresIn: '1h' });
            console.log(user);
            req.user = user
            next()
        });
    })(req, res);
};

module.exports = checkToken