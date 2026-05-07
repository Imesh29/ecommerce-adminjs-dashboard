import { sign } from "jsonwebtoken";

const generateToken = (user) => {
  return sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );
};

export default generateToken;
