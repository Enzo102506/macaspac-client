require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const emails = [
      'enzomacaspac1025@gmail.com',
      'benmacaspac233@gmail.com',
      'jennalina@gmail.com',
      'enzomacaspac693@gmail.com',
      'enzomacaspac239@gmail.com',
      'enzomacaspac230@gmail.com',
      'nzolast693@gmail.com',
      'nzolastly@gmail.com'
    ];
    const users = await User.find({ email: { $in: emails } }, 'email type role isActive').lean();
    console.log(JSON.stringify(users, null, 2));
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
