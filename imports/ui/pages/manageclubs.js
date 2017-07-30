import { Template } from 'meteor/templating';
import { Club, Clubs } from '../../api/clubs.js';
import { Meteor } from 'meteor/meteor';

import './manageclubs.html';

Template.manageclubs.helpers({
  clubs() {
    return Clubs.find({
      userId: Meteor.userId(),
    });
  },
});

Template.manageclubs.onRendered(function () {

});