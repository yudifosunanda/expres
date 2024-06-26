const db = require('./../db');


const getUser = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM "user" where "usr_id" = 1');
    res.json(result.rows); // Send the rows as JSON
  } catch (err) {
    res.status(500).send('Error executing query');
  }
};

const addUser = (req, res) => {
  // Logic to add a user
  res.json({ message: "User added" });
};

const updateUser = (req, res) => {
  // Logic to update a user
  res.json({ message: "User updated" });
};

const deleteUser = (req, res) => {
  // Logic to delete a user
  res.json({ message: "User deleted" });
};

module.exports = {
  getUser,
  addUser,
  updateUser,
  deleteUser
};