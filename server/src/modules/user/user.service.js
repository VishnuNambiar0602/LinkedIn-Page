import User from "./user.model.js";

const userLogin = async (userData) => {
  const { email, phoneNumber, password } = userData;

  const user = new User({
    email,
    phoneNumber,
    password,
  });

  await user.save();
};

export const userService = {
  userLogin,
};
