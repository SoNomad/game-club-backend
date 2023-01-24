require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json("Войдите");
  }
  //Раздление и деструктуризация типа и токена
  const [type, token] = authorization.split(" ");

  //проверка типа токена Bearer
  if (type !== "Bearer") {
    return res.status(401).json("Неверный тип токена");
  }
  //проверка токена
  try {
    req.user = await jwt.verify(token, process.env.SECRET_KEY);
    next();
  } catch (e) {
    return res.json(e.toString());
  }
};
