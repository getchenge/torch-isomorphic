const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = mongoose.createConnection('mongodb://127.0.0.1/torch', { promiseLibrary: Promise });

const fieldSchema = new Schema({ caption: String, name: String, type: String, value: Schema.Types.Mixed });
const sectionSchema = new Schema({
  caption: String,
  name: String,
  location: String,
  fields: [fieldSchema],
  isList: { type: Boolean, default: false },
  value: [Schema.Types.Mixed],
  update: { type: Date, default: Date.now }
});
const Section = db.model('Section', sectionSchema);
module.exports = Section;
