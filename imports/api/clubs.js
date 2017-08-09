import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

let MemberSchema = new SimpleSchema({
  name: {
    type: String,
    optional: false,
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
  },
  website: {
    type: String,
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