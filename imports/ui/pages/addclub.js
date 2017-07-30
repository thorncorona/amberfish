import { Club, Clubs } from '../../api/clubs.js';
import './addclub.html';

Template.addclub.onRendered(function() {
  Materialize.updateTextFields();
  $('form#new-club').validate({
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
      Clubs.insert(new Club(form.name.value, form.desc.value, form.website.value, Meteor.userId()));
      form.reset();
    },
  });
});