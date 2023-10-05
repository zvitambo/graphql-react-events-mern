const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");

module.exports = {
  createUser: async (args) => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser) {
        throw new Error("User exists already.");
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        email: args.userInput.email,
        password: hashedPassword,
      });

      const result = await user.save();

      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  },
  login: async ({email, password}) => {
    try {
      const existingUser = await User.findOne({ email: email });
      if (!existingUser) {
        throw new Error("User not found.");
      }
      const isVerified = await bcrypt.compare(password, existingUser.password);

       if (isVerified) {
         throw new Error("email or password is incorrect.");
       }

       const token = jwt.sign(
         { userId: existingUser.id, email: existingUser.email },
         process.env.JWT_SECRET,
         {
           expiresIn: process.env.JWT_EXPIRY,
         }
       );


      return {
        userId: existingUser.id,
        token: token,
        tokenExpiration: process.env.JWT_EXPIRY,
      }; 
    } catch (err) {
      throw err;
    }
  },
};
