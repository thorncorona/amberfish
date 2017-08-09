import { Template } from 'meteor/templating';
import { Clubs } from '../../api/clubs.js';
import { Meteor } from 'meteor/meteor';

import './manageclub.html';

var club;

Template.manageclub.onRendered(function () {
  Materialize.updateTextFields();
  $('form#edit-club').validate({
    rules: {
      name: {
        required: true,
        minlength: 3,
      },
      desc: {
        required: true,
        minlength: 10,
      },
      website: {
        required: true,
        url: true,
      },
    },
    messages: {
      website: {
        url: "Please enter a valid URL, include the https:// header."
      },
    },
    errorClass: 'invalid',
    errorPlacement: function (error, element) {
      $(element).closest("form")
      .find("label[for='" + element.attr("name") + "']")
      .attr('data-error', error.text());
    },
    submitHandler: function (form) {
      club.name = form.name.value;
      club.desc = form.desc.value;
      club.website = form.website.value;

      Clubs.update(club._id, club);
    },
  });
});

Template.manageclub.helpers({
  club() {
    club = Clubs.find({
      name: Template.currentData(),
    }).fetch()[0];
    return club;
  },
  encodeURI(url) {
    return encodeURI(encodeURIComponent(url));
  },
});
