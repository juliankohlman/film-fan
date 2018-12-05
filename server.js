const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

// DB
const db = require('./Config/keys').mongoURI;

// Passport config access (strategies)
require('./config/passport')(passport);

// DB connection
mongoose
	.connect(db)
	.then(() => console.log('Now Connected'))
	.catch(err => console.log(err));

// Use Routes
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/profile', profile);

// Serve static assets in prod env
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const port = process.env.PORT || 5000;
// Test route
// app.get('/', (req, res) => {
// 	res.send('Hello from Test route');
// });

app.listen(port, () => console.log(`Server listening on port ${port}`));
