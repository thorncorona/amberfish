import { Clubs } from '../../api/clubs';

Router.map(function () {
  this.route("/club/confirm/:confirmationRequest", function () {

    var details = JSON.parse(new Buffer(decodeURIComponent(this.params.confirmationRequest), "base64"));

    Meteor.call("clubs.addmember", details);

    this.response.end(`Confirmed signup to ${details.clubname}`)
  }, {where: "server"});
});