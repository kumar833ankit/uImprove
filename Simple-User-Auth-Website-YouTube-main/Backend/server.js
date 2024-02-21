// const express = require('express')
// const mongoose = require('mongoose')
// const cors = require('cors')
// const bodyParser = require('body-parser')
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
// const User = require('./models/userModel')


// const SECRET_KEY = 'super-secret-key'

// // connect to express app
// const app = express()

// // connect to mongoDB
// // const dbURI = 'mongodb+srv://kumar6290ankit1:123456ankit@clusterkanaam.rvoq8sk.mongodb.net/databasekanaam?retryWrites=true&w=majority'
// const dbURI = 'mongodb+srv://kumar6290ankit1:123456ankit@clusterkanaam.rvoq8sk.mongodb.net/databasekanaam?retryWrites=true&w=majority'
// mongoose
// .connect(dbURI, {
//     useNewUrlParser: true, 
//     useUnifiedTopology: true
// })
// .then(() => {
//     app.listen(3001, () => {
//         console.log('Server connected to port 3001 and MongoDb')
//     })
// })
// .catch((error) => {
//     console.log('Unable to connect to Server and/or MongoDB', error)
// })


// // middleware
// app.use(bodyParser.json())
// app.use(cors())




// //Routes

// // REGISTER
// //POST REGISTER
// app.post('/register', async (req, res) => {
//     try {
//         const { email, username, password } = req.body
//         const hashedPassword = await bcrypt.hash(password, 10)
//         const newUser = new User({ email, username, password: hashedPassword })
//         await newUser.save()
//         res.status(201).json({ message: 'User created successfully' })
//     } catch (error) {
//         res.status(500).json({ error: 'Error signing up' })
//     }
// })

// //GET Registered Users
// app.get('/register', async (req, res) => {
//     try {
//         const users = await User.find()
//         res.status(201).json(users)
        
//     } catch (error) {
//         res.status(500).json({ error: 'Unable to get users' })
//     }
// })

// //LOGIN

// app.post('/login', async (req, res) => {
//     try {
//         const { username, password } = req.body
//         const user = await User.findOne({ username })
//         if (!user) {
//             return res.status(401).json({ error: 'Invalid credentials'})
//         }
//         const isPasswordValid = await bcrypt.compare(password, user.password)
//         if(!isPasswordValid) {
//             return res.status(401).json({ error: 'Invalid credentials' })
//         }
//         const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1hr' })
//         res.json({ message: 'Login successful' })
//     } catch (error) {
//         res.status(500).json({ error: 'Error logging in' })
//     }
// })



















const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/userModel');

const SECRET_KEY = 'super-secret-key';

// Create Express app
const app = express();

// Connect to MongoDB
const dbURI = 'mongodb+srv://kumar6290ankit1:123456ankit@clusterkanaam.rvoq8sk.mongodb.net/databasekanaam?retryWrites=true&w=majority'
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
  // Start the server after connecting to MongoDB
  app.listen(3001, () => {
    console.log('Server is running on port 3001');
  });
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes

// Register new user
app.post('/register', async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error signing up' });
  }
});

// Get registered users
app.get('/register', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Unable to get users' });
  }
});

// Login user
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1hr' });
    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

// Route to fetch user details
app.get('/user', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Middleware function to authenticate requests
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  jwt.verify(token, SECRET_KEY, (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.userId = decodedToken.userId;
    next();
  });
}

module.exports = app;

















// const express = require('express')
// const mongoose = require('mongoose')
// const cors = require('cors')
// const bodyParser = require('body-parser')
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
// const User = require('./models/userModel')


// //const SECRET_KEY = 'super-secret-key'

// // connect to express app
// const app = express()

// // connect to mongoDB

// // mongodb+srv://kumar6290ankit:123456ankit@clusterkanaam.rvoq8sk.mongodb.net/databasekanaam?retryWrites=true&w=majority
// const dbURI = 'mongodb+srv://kumar6290ankit1:123456ankit@clusterkanaam.rvoq8sk.mongodb.net/databasekanaam?retryWrites=true&w=majority'
// //const dbURI = 'mongodb+srv://kumar6290ankit:SW3fvOtn176KIe1o@test-pro-db.ugknhmb.mongodb.net/?retryWrites=true&w=majority'
// mongoose
// .connect(dbURI, {
//     useNewUrlParser: true, 
//     useUnifiedTopology: true
// })
// .then(() => {
//     app.listen(3001, () => {
//         console.log('Server connected to port 3001 and MongoDb')
//     })
// })
// .catch((error) => {
//     console.log('Unable to connect to Server and/or MongoDB', error)
// })


// // // middleware
// // app.use(bodyParser.json())
// // app.use(cors())



