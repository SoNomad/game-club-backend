const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.usersController = {
  registerUser: async (req, res) => {
    const { login, password } = req.body;

    const userExist = await User.findOne({ login });
    if (userExist) {
      return res.status(406).json("Такое имя уже занято");
    }

    //хэшировать принятый пароль
    const hash = await bcrypt.hash(password, 7);

    try {
      const user = await User.create({
        login,
        password: hash,
      });

      return res.status(201).json(user);
    } catch (error) {
      return res.status(401).json(error.message);
    }
  },

  getUsers: async (req, res) => {
    try {
      const users = await User.find({}, "login");
      return res.json(users);
    } catch (error) {
      return res.status(401).json(error.toString());
    }
  },

  login: async (req, res) => {
    try {
      const { login, password } = req.body;

      const candidate = await User.findOne({ login });
      if (!candidate) {
        return res.status(401).json("Пользователь не найден");
      }

      const valid = await bcrypt.compare(password, candidate.password);
      if (!valid) {
        res.status(401).json("Неверный пароль");
      }

      const jwtPayload = {
        id: candidate._id,
        log: candidate.login,
      };

      const token = await jwt.sign(jwtPayload, "secret123", { expiresIn: "24h" });
      res.status(201).json({ ...candidate._doc, token });
    } catch (error) {
      return res.status(401).json(error.toString());
    }
  },

  getMe: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);

      return res.json(user);
    } catch (error) {
      res.status(403).json(error.toString());
    }
  },
};
