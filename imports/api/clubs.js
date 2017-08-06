import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

let MemberSchema = new SimpleSchema({
  name: {
    type: String,
    optional: false,
  },
  email: {
    type: String,
    optional: false,
    unique: true,
  },
  grade: {
    type: Number,
    optional: false,
  },
});

let ClubSchema = new SimpleSchema({
  name: {
    type: String,
    regEx: /^[a-z0-9A-Z_]/,
    unique: true,
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
});

const Clubs = new Mongo.Collection('clubs', ClubSchema);

export { Clubs, ClubSchema, MemberSchema };
