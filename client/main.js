import { Meteor } from 'meteor/meteor';
import { Clubs } from '../imports/api/clubs';

import '../imports/startup/accounts-config';
import '../imports/ui/pages/home';
import '../imports/ui/pages/addclub';
import '../imports/ui/pages/manageclubs';
import '../imports/ui/pages/manageclub';
import '../imports/ui/pages/clubsignup';
import '../imports/ui/components/nav';
import '../imports/ui/layouts/layout';
import '../imports/ui/layouts/authenticated';

Router.configure({
  layoutTemplate: 'layout',
});

Router.map(function() {
  this.route('home', {
    path: '/',
    template: 'home',
  });
  this.route('addclub', {
    path: '/addclub',
    layoutTemplate: 'authenticated',
    template: 'addclub',
  });
  this.route('manageclubs', {
    path: '/manageclubs',
    layoutTemplate: 'authenticated',
    template: 'manageclubs',
  });
  this.route('manageclub', {
    path: '/:clubname/manage',
    template: 'manageclub',
    layoutTemplate: 'authenticated',
    data: function() {
      return this.params.clubname;
    },
  });
  this.route('signupclub', {
    path: '/:clubname/signup',
    template: 'clubsignup',
    data: function () {
      return this.params.clubname;
    }
  });
  this.route('viewmembers', {
    path: '/:clubname/manage/members',
    data: function () {
      return this.params.clubname
    }
  });
});
Router.route('test', function() {
  console.log('test');
}, {where: 'server'});