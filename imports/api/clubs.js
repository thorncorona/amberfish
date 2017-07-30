import { Mongo } from 'meteor/mongo';

class Club {
  constructor(name, desc, website, userId) {
    this.name = name;
    this.desc = desc;
    this.website = website;
    this.userId = userId;
  }
}

const Clubs = new Mongo.Collection('clubs', {
  transform: doc => new Club(doc.name, doc.desc, doc.website, doc.userId),
});

export { Club, Clubs };
