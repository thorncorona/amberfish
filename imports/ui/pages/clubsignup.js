import { Clubs, MemberSchema } from '../../api/clubs'
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import './clubsignup.html';
import './clubsignup.css';

var club;
Template.clubsignup.helpers({
  club() {
    club = Clubs.findOne({
      name: Template.currentData(),
    });
    return club;
  }
});

Template.clubsignup.onCreated(function() {
  this.memberValidationCtx = MemberSchema.namedContext("clubsignup");
  Meteor.subscribe('clubs.public.all');
});

Template.clubsignup.onRendered(function() {
  Materialize.updateTextFields();
  $('form#edit-club > button').addClass("disabled");
});

Template.clubsignup.events({
  'keyup input, change input'(event, instance) {
    checkForm();
  },
  'click .clubsignup' (event, instance) {
    event.preventDefault();
    if(!$('form#clubsignup > button').hasClass("disabled")) {
      Meteor.call("clubs.verifyclubsignup", {
        _id: club._id,
        clubname: club.name,
        member: getClubForm()
      });
      $('#confirmmodal').modal("open");
      $('input[name=name]').val("");
      $('input[name=email]').val("");
      //TODO: get this working
      $('input[name=grade]:checked').attr("checked", false);
    }
  }
});

function checkForm() {
  function errorWithName(error, name) {
    return error.name === name;
  }

  function setStatus(name, fieldType, error) {
    let $label = $(`form#clubsignup label[for=${name}`);
    let $field = $(`form#clubsignup ${fieldType}[name=${name}]`);
    $field.removeClass("valid invalid");

    if(error !== undefined) {
      $field.addClass("invalid");
      $label.attr("data-error", getErrorMessage(error));
    } else {
      $field.addClass("valid");
    }
  }

  let clubsignupform = getClubForm();
  let ctx = Template.instance().memberValidationCtx;

  ctx.validate(clubsignupform);

  if(ctx.isValid()) {
    $('form#clubsignup > button').removeClass("disabled");
  } else {
    $('form#clubsignup > button').addClass("disabled");
    setTimeout(function() {
      // wait for club name check
      let errors = ctx.validationErrors();
      console.log(errors);

      let nameError = errors.find(((e) => errorWithName(e, "name")));
      setStatus("name", "input", nameError);

      let emailError = errors.find(((e) => errorWithName(e, "email")));
      setStatus("email", "input", emailError);

      let gradeError = errors.find(((e) => errorWithName(e, "grade")));
      if(gradeError !== undefined) {
        $(".required").removeClass("hiddendiv");
      } else {
        $(".required").addClass("hiddendiv");
      }
    }, 250);
  }
}

function getErrorMessage(error) {
  switch(error.type) {
    case "minString":
      return `Minimum of ${error.min} characters.`;
    case "maxString":
      return `Maximum of ${error.max} characters.`;
    case "required":
      return `Field required.`;
    case "regEx" :
      if(error.name === "email") {
        return `Not a valid email.`;
      } else {
        return "Regex";
      }
    case "notUnique":
      return "Email already signed up.";
    default:
      return "Error: " + error.type;
  }
}

function getClubForm() {
  let grade = $('input[name=grade]:checked').val();
  return {
    name: $('input[name=name]').val(),
    email: $('input[name=email]').val(),
    grade: (grade !== undefined) ? parseInt(grade) : grade,
  };
}
