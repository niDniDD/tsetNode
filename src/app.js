var app = require('../src/config/express')
const mongoose = require("mongoose");


var _ = require("lodash");

var Schema = mongoose.Schema;
var UserSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    default: ''
  },
  lastName: {
    type: String,
    trim: true,
    default: ''
  },
  displayName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    default: ''
  },
  username: {
    type: String,
    unique: 'Username already exists',
    required: 'Please fill in a username',
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    default: ''
  },
  salt: {
    type: String
  },
  profileImageURL: {
    type: String,
    default: ''
  },
  provider: {
    type: String,
    required: 'Provider is required'
  },
  providerData: {},
  additionalProvidersData: {},
  roles: {
    type: [{
      type: String,
      enum: ['user', 'admin']
    }],
    default: ['user'],
    required: 'Please provide at least one role'
  },
  updated: {
    type: Date
  },
  created: {
    type: Date,
    default: Date.now
  }
});


var user = mongoose.model('User', UserSchema);
var User = mongoose.model('User');


app.get('/', function (req, res) {
  res.send('User');
});


app.get('/api/nid', function (req, res) {
  var user = User.find(function (err, datas) {
    res.json(datas)
  });
});

app.get('/api/nid/:id', function (req, res) {
  res.json(req.data);
});
app.put('/api/nid/:id', function (req, res) {

  var user = _.extend(req.data, req.body);
  user.save(function (err, data) {
    res.json(data);
  });

});

app.post('/api/nid', function (req, res) {
  var user = new User(req.body);
  user.save(function (err, data) {
    res.json(data)
  });
});

app.param("id", function (req, res, next, id) {
  req.id = id;
  User.findById(id, function (err, data) {
    req.data = data;
    next();
  });
});

app.delete('/api/nid/:id', function (req, res) {
  req.data.remove(function (err, data) {
    res.json(data)
  });
});

module.exports = app;

