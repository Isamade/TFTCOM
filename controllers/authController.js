const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const config = require('config');

exports.authUser = async (req, res) => {
  try {
    const {name, email, bio} = req.user;
    res.json({name, email, bio});
  } catch {
    res.status(500).send('Server Error');
  }
}

exports.signup = async (req, res) => {
    const { name, email, password, etihw } = req.body;
    try {
        let user = await UserModel.findOne({ email });

        if (user) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'User already exists' }] });
        }

        if(etihw==="ftc"){
            user = new UserModel({ name, email, password });
            user.save((err, user) => {
                if (err) {
                    return res.status(401).json({
                        error: errorHandler(err)
                    });
                }
                const token = jwt.sign({ _id: user._id }, config.get('jwtSecret'), { expiresIn: 360000 });
                return res.json({
                    token
                });
            });
        }
    } catch (err) {
        console.error(err.message);
        return res
            .status(500)
            .json({message: 'Something went wrong. Try again'});
    }
};

exports.signin = async (req, res) => {
    const { email, password } = req.body;
    // check if user exist
    UserModel.findOne({ email }).exec((err, user) => {
        if(err) {
          res.status(500).send('Server error');
        }
        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
        }
        // authenticate
        if (!user.authenticate(password)) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
        }
        // generate a token and send to client
        const token = jwt.sign({ _id: user._id }, config.get('jwtSecret'), { expiresIn: 360000 });

        return res.json({
            token
        });
    });
};