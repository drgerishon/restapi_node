const router = require('express').Router();

const User = require('../models/users');

const bcrypt = require('bcrypt');
//register

router.post('/register', async (req, res) => {
  try {
    //generate hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
});

//login

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json('user no found');
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      res.status(400).json('wrong password');
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
