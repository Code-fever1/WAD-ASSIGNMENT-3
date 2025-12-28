const express = require('express');

const app = express();

const mon = require('mongoose');

const db = require('./db');

const Person = require('./person');

const Book = require('./book');

const { ObjectId } = require('mongodb');

const PORT = 3000;

app.use(express.json());

app.post('/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({ 
        error: 'Validation Error',
        message: 'username, password, and email are required' 
      });
    }

    const existingUser = await Person.findOne({ 
      $or: [
        { username: username.toLowerCase() },
        { email: email.toLowerCase() }
      ]
    });

    if (existingUser) {
      return res.status(409).json({ 
        error: 'Conflict',
        message: 'Username or email already exists' 
      });
    }

    const person = new Person({
      username: username.toLowerCase(),
      password,
      email: email.toLowerCase()
    });

    await person.save();

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: person._id,
        username: person.username,
        email: person.email
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    
    if (error.code === 11000) {
      return res.status(409).json({ 
        error: 'Conflict',
        message: 'Username or email already exists' 
      });
    }

    res.status(500).json({ 
      error: 'Server Error',
      message: 'Error during registration' 
    });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ 
        error: 'Validation Error',
        message: 'username and password are required' 
      });
    }

    const user = await Person.findOne({ username: username.toLowerCase() });
    
    if (!user) {
      return res.status(401).json({ 
        error: 'Authentication Failed',
        message: 'Invalid username or password' 
      });
    }

    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      return res.status(401).json({ 
        error: 'Authentication Failed',
        message: 'Invalid username or password' 
      });
    }

    res.json({
      success: true,
      message: 'Login Successful',
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      error: 'Server Error',
      message: 'Error during authentication' 
    });
  }
});

app.get('/books', async (req, res) => {
  try {
    const books = await Book.find().select('title author isbn').sort({ createdAt: -1 });
    
    res.status(200).json(books);
  } catch (error) {
    console.error('Get books error:', error);
    res.status(500).json({ 
      error: 'Server Error',
      message: 'Error fetching books' 
    });
  }
});

// POST /books - Create new book
app.post('/books', async (req, res) => {
  try {
    const { title, author, isbn } = req.body;

    if (!title || !author || !isbn) {
      return res.status(400).json({ 
        error: 'Validation Error',
        message: 'title, author, and isbn are required' 
      });
    }

    const existingBook = await Book.findOne({ isbn });
    
    if (existingBook) {
      return res.status(409).json({ 
        error: 'Conflict',
        message: 'Book with this ISBN already exists' 
      });
    }

    const book = new Book({
      title: title.trim(),
      author: author.trim(),
      isbn: isbn.trim()
    });

    await book.save();

    res.status(201).json({
      success: true,
      message: 'Book added successfully',
      book: {
        title: book.title,
        author: book.author,
        isbn: book.isbn
      }
    });
  } catch (error) {
    console.error('Create book error:', error);
    
    if (error.code === 11000) {
      return res.status(409).json({ 
        error: 'Conflict',
        message: 'Book with this ISBN already exists' 
      });
    }

    res.status(500).json({ 
      error: 'Server Error',
      message: 'Error adding book' 
    });
  }
});

app.get('/', (req, res) => {
  res.json({ 
    message: 'Library Management API is running',
    version: '1.0.0'
  });
});

app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not Found',
    message: 'Route not found' 
  });
});

(async () => {
  await db.connectDB();
  
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})();
