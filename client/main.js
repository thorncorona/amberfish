import { Meteor } from 'meteor/meteor';

import '../imports/startup/accounts-config';
import '../imports/ui/pages/home';
import '../imports/ui/pages/addclub';
import '../imports/ui/pages/manageclubs';
import '../imports/ui/components/nav';
import '../imports/ui/layouts/layout';

Router.configure({
  layoutTemplate: 'layout',
});

Router.onBeforeAction(function() {
  if (!Meteor.userId() && this.ready()) {
    console.log("no user");
    return this.redirect('/login');

  }
}, {except: ['login']});

Router.map(function() {
  this.route('home', {
    path: '/',
    template: 'home',
  });
  this.route('addclub', {
    path: '/addclub',
    template: 'addclub',
  });
  this.route('manageclubs', {
    path: '/manageclubs',
    template: 'manageclubs',
  });
  this.route('manageclub', {

  })
});
