import { Router } from "express";
import { compare } from "bcryptjs";

import { findOne } from "../models/User";
import generateToken from "../utils/generateToken";

const router = Router();

/*
LOGIN ROUTE
*/

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findOne({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email",
      });
    }

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    const token = generateToken(user);

    res.json({
      token,
      role: user.role,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
