import { Clubs } from '../../api/clubs';

Router.map(function () {
  this.route("/club/confirm/:confirmationRequest", function () {

    var details = JSON.parse(new Buffer(decodeURIComponent(this.params.confirmationRequest), "base64"));

    Clubs.update({name: details.clubname}, {
      $push : {
        members: {
          name: details.name,
          grade: details.grade,
          email: details.email,
        }
      }
    });
    this.response.end(`Confirmed signup to ${details.clubname}`)
  }, {where: "server"});
});