const mongoose = require('mongoose');
const Scheman = mongoose.Schema;
const { DateTime } = require('luxon');

const AuthorSchema = new Scheman({
  first_name: { type: String, required: true, maxLength: 1000 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

AuthorSchema.virtual('name').get(function () {
  let fullname = '';
  if (this.first_name && this.family_name) {
    fullname = `${this.family_name}, ${this.first_name}`;
  }

  if (!this.first_name || !this.family_name) {
    fullname = '';
  }

  return fullname;
});

AuthorSchema.virtual('url').get(function () {
  return `/catalog/author/${this._id}`;
});

AuthorSchema.virtual('date_of_birth_fomatted').get(function () {
  if (this.date_of_birth)
    return DateTime.fromJSDate(this.date_of_birth).toLocaleString(
      DateTime.DATE_MED
    );
  return 'unknown';
});

AuthorSchema.virtual('date_of_death_fomatted').get(function () {
  if (this.date_of_death)
    return DateTime.fromJSDate(this.date_of_death).toLocaleString(
      DateTime.DATE_MED
    );
  return 'unknown';
});

module.exports = mongoose.model('Author', AuthorSchema);
