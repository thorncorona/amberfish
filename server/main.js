import { Meteor } from 'meteor/meteor';
import { Clubs } from  '../imports/api/clubs';
import '../imports/startup/server/routes';
Future = Npm.require('fibers/future');

function clubNameIsAvailable(name) {
  var future = new Future();

  var club = Clubs.find({name: name}).fetch();
  if(club.length <= 0) {
    future.return(true);
  } else {
    future.return(false);
  }

  return future.wait();
}

Meteor.methods({
  "clubNameIsAvailable" : function (name) {
    return clubNameIsAvailable(name);
  }
});