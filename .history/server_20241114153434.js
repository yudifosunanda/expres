// Import dependencies
const express = require('express');
const db = require('./db');
const bodyParser = require('body-parser');
const cors = require('cors');
const csrf = require('csurf');
// user model
const { getUser, addUser, updateUser, deleteUser } = require('./rest/user');
//validator
const { addUserValidationRules, updateUserValidationRules } = require('./rest/userValidator');
const { validationResult } = require('express-validator');
//file inputs
const multer = require('multer');
const path = require('path');

// Initialize Express app
const app = express();

// Initialize the CSRF middleware
const csrfProtection = csrf({ cookie: true });

// Configure middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png/; // Allowed file types
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    return cb(null, true);
   
  }
});

// Middleware to handle validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = errors.array().map(err => ({ [err.path]: err.msg }));
  return res.status(422).json({
    errors: extractedErrors,
  });
};

// Define a route to fetch data from the user table
// Route to provide CSRF token to the client
app.get('/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

app.get('/home', (req, res)=>{
  let datas = [
    {
      "name":"difo",
      "gender":"male"
    }
    ,{
      "name":"difo",
      "gender":"male"
    }
  ];
  res.json(datas);
});

app.get('/', (req, res)=>{
  let datas = [
    {
      "name":"difo",
      "gender":"male"
    }
    ,{
      "name":"difo",
      "gender":"male"
    }
  ];
  res.json(datas);
});

  app.get('/users', getUser);
  app.post('/user/add',csrfProtection,  upload.single('profilePic'), addUserValidationRules(), validate, addUser);
  app.put('/user/update/:id', updateUser);
  app.delete('/user/delete/:id', deleteUser);


// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});