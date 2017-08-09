import { Clubs, MemberSchema } from '../../api/clubs'
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import './clubsignup.html';

var club;

Template.clubsignup.onRendered(function () {
  Materialize.updateTextFields();

  $('#club-signup').validate({
    rules: {
      name: {
        required: true,
        minlength: 2,
      },
      email: {
        required: true,
      },
      grade: {
        required: true,
      }
    }, 
    submitHandler: function (form) {
      let member = {};
      member.name = form.name.value;
      member.email = form.email.value;
      member.grade = parseInt(form.grade.value);

      if(MemberSchema.newContext().validate(member)) {
        console.log("valid");
        member.clubname = club.name;

        console.log(member);
        $('#confirmmodal').modal('open');
        Meteor.call("verifyClubSignup", member);
        form.reset();
      } else {
        console.log("already registered");
      }
    }
  })
});

Template.clubsignup.helpers({
  club() {
    club = Clubs.find({
      name: Template.currentData(),
    }).fetch()[0];
    return club;
  }
});
