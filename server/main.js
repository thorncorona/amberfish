import { Meteor } from 'meteor/meteor';
import '../imports/api/clubs';
import '../imports/startup/server/routes';

function verifyClubSignup(name, grade, email, clubname) {
  var details = {
    name: name,
    grade: grade,
    email: email,
    clubname: clubname
  };
  console.log(details);
  var b64 = encodeURIComponent(new Buffer(JSON.stringify(details) || '').toString("base64"));

  console.log(b64);
  Email.send({
    to: name + " <" + email + ">",
    from: "Amberfish <dev@storied.me>",
    subject: "Please confirm your signup to " + clubname,
    html: `<a href="http://localhost:3000/club/confirm/${b64}">Click on this link to confirm your sign up.</a>\n
            Or open this link in your browser: https://localhost:3000/club/confirm/${b64}`,
  });
}

function clubNameIsAvailable(name) {
  var future = new Future();

  Clubs.find({name: name}, function (err, res) {
    if(res.length > 0) {
      future.ret(false);
    } else {
      future.ret(true);
    }
  })

  return future.wait();
}

Meteor.methods({
  "verifyClubSignup" : function (query) {
    verifyClubSignup(query.name, query.grade, query.email, query.clubname);
  },
  "clubNameIsAvailable" : function (name) {
    return clubNameIsAvailable(name);
  }
});