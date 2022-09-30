const ProfileModel = require('../models/ProfileModel');

exports.getProfile = async (req, res) => {
    try {
        const profile = await ProfileModel.find({_id: req.params.id});
        res.json(profile);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getProfiles = async (req, res) => {
    console.log("miccheck");
    try {
      let profiles;
      if(req.query["search"]){
        profiles = await ProfileModel.find({
            name: {
              $regex: new RegExp(req.query["search"]),
              $options: 'i'
            }
        });
        return res.json(profiles);
      }
      profiles = await ProfileModel.find();
      res.json(profiles);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
};


exports.deleteProfile = async (req, res) => {
    try {
        if(req.user.role === 3){
            await UserModel.findByIdAndDelete(req.body.id);            
            return res.json({msg: 'User deleted'});
        }
        await UserModel.findByIdAndDelete(req.user._id);
        //const user = await user.findOne({ id }).select('-password');
        return res.json({ msg: 'User deleted' });
    } catch {
        res.status(500).send('Server error');
    }
}

exports.updateProfile = async (req, res) => {
    const { name, email, password, bio } = req.body;
    try {
        if(password){
            req.user.name = name;
            req.user.email = email;
            req.user.password = password;
            req.user.bio = bio;
        } else {
            req.user.name = name;
            req.user.email = email;
            req.user.bio = bio;
        }
        await req.user.save();
        return res.json({ msg: 'User updated' });
    } catch {
        res.status(500).send('Server error');
    }
}

exports.createProfile = async (req, res) => {
    const { name, boardName, email, phone, invitedBy } = req.body;
    try {
        let profile = await ProfileModel.findOne({ email });
        if (profile) {
            return res
            .status(400)
            .json({ errors: [{ msg: 'Email already exists' }] });
        }
        profile = new ProfileModel({name,boardName,email,phone,invitedBy});
        await profile.save();
        return res.json({msg: "Registration successful"});
    } catch {
        res.status(500).send('Server error');
    }
}