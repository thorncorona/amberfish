import { Template } from 'meteor/templating';
import { Club, Clubs } from '../../api/clubs.js';
import { Meteor } from 'meteor/meteor';

import './manageclub.html';

Template.manageclub.onRendered(function () {
  Materialize.updateTextFields();
});

Template.manageclub.helpers({
  club() {
    return Clubs.findOne({
      _id: Template.currentData(),
    });
  },
});
