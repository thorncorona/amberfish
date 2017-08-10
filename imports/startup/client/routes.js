import './accounts-config';
import '../../ui/pages/home';
import '../../ui/pages/addclub';
import '../../ui/pages/manageclubs';
import '../../ui/pages/manageclub';
import '../../ui/pages/clubsignup';
import '../../ui/pages/viewmembers';
import '../../ui/components/nav';
import '../../ui/layouts/layout';
import '../../ui/layouts/authenticated';

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
      return decodeURIComponent(this.params.clubname);
    },
  });
  this.route('signupclub', {
    path: '/:clubname/signup',
    template: 'clubsignup',
    data: function () {
      return decodeURIComponent(this.params.clubname);
    }
  });
  this.route('viewmembers', {
    path: '/:clubname/manage/members',
    layoutTemplate: 'authenticated',
    data: function () {
      return decodeURIComponent(this.params.clubname);
    }
  });
});