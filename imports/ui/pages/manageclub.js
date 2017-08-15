import { Template } from 'meteor/templating';
import { Clubs, ClubSchema } from '../../api/clubs.js';
import { Meteor } from 'meteor/meteor';

import './manageclub.html';

var club;

Template.manageclub.onCreated(function () {
  Meteor.subscribe('clubs.private.all', 'clubs.public.all');

  this.clubValidationCtx = ClubSchema.namedContext("editclubform");
});

Template.manageclub.onRendered(function () {
  setTimeout(function () {
    Materialize.updateTextFields();
  }, 100);
  $('form#editclub > button').addClass("disabled");
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
  mailLink() {
    //TODO: make reactive
    let link = "mailto:";

    if(club !== undefined) {
      for(let i = 0; i < club.members.length; i++) {
        link += club.members[i].email + ";";
      }
    }
    return link;
  }
});


Template.manageclub.events({
  'keyup input, change input, keyup textarea, change textarea': function (event, instance) {
    checkForm();
  },
  'click .editclub' (event, instance) {
    event.preventDefault();
    Clubs.update(club._id, getClubForm());
    $('#confirmmodal').modal("open");
  },
  'click #deleteclub' (event, instance) {
    $("#confirmdeletemodal").modal("open");
  },
  'click a#confirmdeleteclubyes' (event, instance) {
    Meteor.call("clubs.delete", club);
    window.location.replace("/manageclubs");
    console.log(club);
  }
});

function checkForm() {
  function errorWithName(error, name) {
    return error.name === name;
  }

  function setStatus(name, fieldType, error) {
    let $label = $(`form#editclub label[for=${name}`);
    let $field = $(`form#editclub ${fieldType}[name=${name}]`);
    $field.removeClass("valid invalid");

    if(error !== undefined) {
      $field.addClass("invalid");
      $label.attr("data-error", getErrorMessage(error));
    } else {
      $field.addClass("valid");
    }
  }

  let editclubform = getClubForm();

  let ctx = instance.clubValidationCtx;

  ctx.validate(editclubform);
  let errors = ctx.validationErrors();

  if(ctx.isValid() || editclubform.name === club.name && errors.length === 1 && errors[0].name === "name") {
    $('form#editclub > button').removeClass("disabled");
  } else {
    $('form#editclub > button').addClass("disabled");
    setTimeout(function() {
      // wait for club name check
      console.log(errors);

      let nameError = errors.find(((e) => errorWithName(e, "name")));
      if(editclubform.name === club.name && ctx.validationErrors().length === 1) {
        setStatus("name", "input", undefined);
      } else {
        setStatus("name", "input", nameError);
      }

      let websiteError = errors.find(((e) => errorWithName(e, "website")));
      setStatus("website", "input", websiteError);

      let descError = errors.find(((e) => errorWithName(e, "desc")));
      setStatus("desc", "textarea", descError);
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
      if(error.name === "website") {
        return `Not a valid website. Please include the http or https header.`;
      } else {
        return "Regex";
      }
    case "notUnique":
      return "Name already taken";
    default:
      return "Error: " + error.type;
  }
}

function getClubForm() {
  return {
    name: $('input[name=name]').val(),
    desc: $('textarea[name=desc]').val(),
    website: $('input[name=website]').val(),
    members: club.members,
    userId: club.userId,
  };
}