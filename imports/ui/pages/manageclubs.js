import { Template } from 'meteor/templating';
import { Clubs } from '../../api/clubs.js';
import { Meteor } from 'meteor/meteor';

import './manageclubs.html';

Template.manageclubs.onCreated(function () {
  Meteor.subscribe('clubs.private.all');
});

Template.manageclubs.helpers({
  clubs() {
    return Clubs.find({
      userId: Meteor.userId(),
    });
  }
});

Template.editclub.helpers({
  encodeURI(url) {
    return encodeURI(encodeURIComponent(url));
  },
});