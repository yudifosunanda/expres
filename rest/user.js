const db = require('./../db');
const { query } = require('express-validator');

const getUser = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM "user"');
    res.json(result.rows); // Send the rows as JSON
  } catch (err) {
    res.status(500).send('Error executing query');
  }
};

const addUser = async(req, res) => {
  let {name, email, gender, picture} = req.body;
  const profilePic = req.file ? req.file.filename : null;

  try {
    const result = await db.query(
      'INSERT INTO "user" (name, email, gender, picture) VALUES ($1, $2, $3 ,$4) RETURNING *',
      [name, email, gender, profilePic]
    );
    res.json(result.rows); // Send the rows as JSON
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Error executing query');
  }
};

const updateUser = async(req, res) => {
  const { id } = req.params; // Extract id from URL parameters
  let {name, email, gender} = req.body;

  try {
    const result = await db.query(
      `UPDATE "user" set name = $1 , email  = $2 , gender = $3 where usr_id = $4 RETURNING *`,
      [name, email, gender, id]
    );
    res.json(result.rows); // Send the rows as JSON
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Error executing query');
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params; // Extract id from URL parameters

  try {
    const result = await db.query(
      `DELETE from "user" where usr_id = $1`,
      [id]
    );
    res.json("success deleted user"); // Send the rows as JSON
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Error executing query');
  }
};

module.exports = {
  getUser,
  addUser,
  updateUser,
  deleteUser
};