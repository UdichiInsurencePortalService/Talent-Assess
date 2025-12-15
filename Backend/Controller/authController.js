const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const usersModel = require('../Model/usersModel');
const { createJWT } = require('../Token/tokens');

const COOKIE_NAME = process.env.COOKIE_NAME || 'ta_token';

// SIGNUP (only admin creation)
async function signup(req, res) {
  try {
    const { email, password, name } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: "Email and password required" });

    const exists = await usersModel.findByEmail(email);
    if (exists) return res.status(409).json({ error: "Email already exists" });

    const password_hash = await bcrypt.hash(password, 12);
    const id = uuidv4();

    const user = await usersModel.createUser({
      id,
      email,
      name,
      password_hash,
      is_admin: true   // Only admin allowed
    });

    res.status(201).json({ message: "Admin account created", user });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

// LOGIN
async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await usersModel.findByEmail(email);
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    const token = createJWT({ sub: user.id, is_admin: user.is_admin });

    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 86400000 // 1 day
    });

    res.json({ message: "Logged in successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

// RESET PASSWORD (ADMIN ONLY, no email needed)
async function resetPassword(req, res) {
  try {
    const { newPassword } = req.body;

    if (!newPassword)
      return res.status(400).json({ error: "New password required" });

    const userId = req.user.id; // from JWT middleware

    const password_hash = await bcrypt.hash(newPassword, 12);
    await usersModel.updatePassword(userId, password_hash);

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = { signup, login, resetPassword };
