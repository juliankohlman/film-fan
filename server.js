const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');

const app = express();
const port = process.env.PORT || 5000;

// DB
const db = require('./config/keys').mongoURI;

// DB connection
mongoose
	.connect(db)
	.then(() => console.log('Now Connected'))
	.catch(err => console.log(err));

// Test route
app.get('/', (req, res) => {
	res.send('Hello from Test route');
});

// Use Routes
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/profile', profile);

app.listen(port, () => console.log(`Server listening on port ${port}`));
