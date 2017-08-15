import { Clubs, ClubSchema} from '../../api/clubs.js';
import { Meteor } from 'meteor/meteor';
import './addclub.html';
import './addclub.css';

Template.addclub.onCreated(function bodyOnCreated() {
  this.clubValidationCtx = ClubSchema.namedContext("addclubform");
});

Template.addclub.onRendered(function() {
  Materialize.updateTextFields();
  $('form#newclub > button').addClass("disabled");
});

Template.addclub.events({
  'keyup input, change input, keyup textarea, change textarea'(event, instance) {
    checkForm();
  },
  'click .addclub' (event, instance) {
    event.preventDefault();
    if(!$('form#newclub > button').hasClass("disabled")) {
      Meteor.call("clubs.insert", getClubForm());
      $('#confirmmodal').modal("open");
      $('input[name=name]').val("");
      $('textarea[name=desc]').val("");
      $('input[name=website]').val("");
    }
  }
});

function checkForm() {
  function errorWithName(error, name) {
    return error.name === name;
  }

  function setStatus(name, fieldType, error) {
    let $label = $(`form#newclub label[for=${name}`);
    let $field = $(`form#newclub ${fieldType}[name=${name}]`);
    $field.removeClass("valid invalid");

    if(error !== undefined) {
      $field.addClass("invalid");
      $label.attr("data-error", getErrorMessage(error));
    } else {
      $field.addClass("valid");
    }
  }

  let addclubform = getClubForm();

  let ctx = Template.instance().clubValidationCtx;

  ctx.validate(addclubform);

  if(ctx.isValid()) {
    $('form#newclub > button').removeClass("disabled");
    setStatus("name", "input", undefined);
    setStatus("website", "input", undefined);
    setStatus("desc", "textarea", undefined);
  } else {
    $('form#newclub > button').addClass("disabled");
    setTimeout(function() {
      // wait for club name check
      let errors = ctx.validationErrors();
      console.log(errors);
      let nameError = errors.find(((e) => errorWithName(e, "name")));
      setStatus("name", "input", nameError);

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
    members: [],
    userId: Meteor.userId(),
  };
}