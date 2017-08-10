import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

let MemberSchema = new SimpleSchema({
  name: {
    type: String,
    optional: false,
    min: 3,
    max: 256,
  },
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.EmailWithTLD,
    optional: false,
    unique: true,
  },
  grade: {
    type: Number,
    optional: false,
  },
}, {
  clean: {
    filter: true,
    autoConvert: true,
    removeEmptyStrings: true,
    trimStrings: true,
    getAutoValues: true,
    removeNullsFromArrays: true,
  },
});

let ClubSchema = new SimpleSchema({
  name: {
    type: String,
    regEx: /^[a-z0-9A-Z_]/,
    unique: true,
    min: 3,
    max: 256,
    custom() {
      if (Meteor.isClient && this.isSet) {
        Meteor.call("clubNameIsAvailable", this.value, (error, result) => {
          if (!result) {
            this.validationContext.addValidationErrors([{
              name: "name",
              type: "notUnique"
            }]);
          }
        });
      }
    },
  },
  desc: {
    type: String,
    min: 10,
    max: 800,
  },
  website: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
  },
  members: [MemberSchema],
  userId: {
    type: String,
    optional: false,
  }
},{
  clean: {
    filter: true,
    autoConvert: true,
    removeEmptyStrings: true,
    trimStrings: true,
    getAutoValues: true,
    removeNullsFromArrays: true,
  },
});

const Clubs = new Mongo.Collection('clubs', ClubSchema);

export { Clubs, ClubSchema, MemberSchema };