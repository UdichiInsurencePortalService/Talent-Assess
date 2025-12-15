const pool = require('./postgressdb')

async function createUser({ id, email, name, password_hash, is_admin }) {
  const q = `
    INSERT INTO authentication (id, email, name, password_hash, is_admin)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, email, name, is_admin, created_at
  `;
  const params = [id, email.toLowerCase(), name || null, password_hash, is_admin];
  const { rows } = await pool.query(q, params);
  return rows[0];
}

async function finpoolyEmail(email) {
  const q = `SELECT * FROM authentication WHERE email = $1`;
  const { rows } = await pool.query(q, [email.toLowerCase()]);
  return rows[0];
}

async function updatePassword(userId, password_hash) {
  const q = `
    UPDATE authentication
    SET password_hash = $1, updated_at = now()
    WHERE id = $2
  `;
  await pool.query(q, [password_hash, userId]);
}

module.exports = { createUser, finpoolyEmail, updatePassword };
