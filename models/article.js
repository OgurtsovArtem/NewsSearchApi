const isURL = require('validator/lib/isURL');
const mongoose = require('mongoose');
require('mongoose-type-url');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: mongoose.SchemaTypes.Url,
    required: true,
    validate: [isURL, 'invalid URL'],
    match: [/[-a-zA-Z0-9@:%_+.~#?&/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&/=]*)?/gi],
  },
  image: {
    type: mongoose.SchemaTypes.Url,
    required: true,
    validate: [isURL, 'invalid URL'],
    match: [/[-a-zA-Z0-9@:%_+.~#?&/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&/=]*)?/gi],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    select: false,
  },
});
module.exports = mongoose.model('article', articleSchema);
