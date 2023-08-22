const bcrypt = require('bcrypt');
const User = require('../models/UserModel');

exports.storePassword = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    password: hashedPassword,
  });

  await user.save();

  res.status(201).json({ message: 'Password stored successfully' });
};

exports.verifyPassword = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && bcrypt.compareSync(password, user.password)) {
    res.json({ message: 'Access granted' });
  } else {
    res.status(401).json({ message: 'Access denied' });
  }
};
