import './viewmembers.html';
import { Template } from 'meteor/templating';
import { Clubs } from '../../api/clubs.js';

var club;

Template.viewmembers.onRendered(function () {

});

Template.viewmembers.onCreated(function () {
  Meteor.subscribe('clubs.private.all', 'clubs.public.all');
});

Template.viewmembers.helpers({
  club() {
    club = Clubs.find({
      name: Template.currentData(),
    }).fetch()[0];
    return club;
  },
  members() {
    return club.members;
  }
});
