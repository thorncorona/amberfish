import { Clubs, ClubSchema} from '../../api/clubs.js';
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
      var newClub = {
        name: form.name.value,
        desc: form.desc.value,
        website: form.website.value,
        userId: Meteor.userId()
      };
      if(ClubSchema.newContext().validate(newClub)) {
        console.log('added');
        Clubs.insert(newClub);
        form.reset();
      } else {
        console.log('rejected');

        $('label[for=name]').attr('data-error', 'Club name is already taken');
        $('input[name=name]').addClass('invalid').removeClass('valid');

      }
    },
  });
});