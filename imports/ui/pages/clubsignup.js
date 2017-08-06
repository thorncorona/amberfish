import './clubsignup.html';

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
      console.log(form);
    }
  })
});