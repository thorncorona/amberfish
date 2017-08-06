import { Template } from 'meteor/templating';
import { Clubs } from '../../api/clubs.js';

import './home.html';

Template.home.helpers({
  clubs() {
    return Clubs.find({});
  },
});
