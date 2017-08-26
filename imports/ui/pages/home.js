import { Template } from 'meteor/templating';
import { Clubs } from '../../api/clubs.js';

import './home.html';

Template.home.onCreated(function () {
  Meteor.subscribe('clubs.public.all');
});

Template.home.helpers({
  clubs() {
    return Clubs.find({});
  },

});

Template.club_card.helpers({
  encodeURI(url) {
    return encodeURI(encodeURIComponent(url));
  },
});