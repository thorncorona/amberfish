import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

let MemberSchema = new SimpleSchema({
  name: {
    type: String,
    optional: false,
    min: 3,
    max: 256,
  },
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.EmailWithTLD,
    optional: false,
    unique: true,
  },
  grade: {
    type: Number,
    optional: false,
  },
}, {
  clean: {
    filter: true,
    autoConvert: true,
    removeEmptyStrings: true,
    trimStrings: true,
    getAutoValues: true,
    removeNullsFromArrays: true,
  },
});

let ClubSchema = new SimpleSchema({
  name: {
    type: String,
    regEx: /^[a-z0-9A-Z_]/,
    unique: true,
    min: 3,
    max: 256,
    custom() {
      if (Meteor.isClient && this.isSet) {
        Meteor.call("clubNameIsAvailable", this.value, (error, result) => {
          if (!result) {
            this.validationContext.addValidationErrors([{
              name: "name",
              type: "notUnique"
            }]);
          }
        });
      }
    },
  },
  desc: {
    type: String,
    min: 10,
    max: 800,
  },
  website: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
  },
  members: [MemberSchema],
  userId: {
    type: String,
    optional: false,
  }
},{
  clean: {
    filter: true,
    autoConvert: true,
    removeEmptyStrings: true,
    trimStrings: true,
    getAutoValues: true,
    removeNullsFromArrays: true,
  },
});

const Clubs = new Mongo.Collection('clubs', ClubSchema);

export { Clubs, ClubSchema, MemberSchema };

if(Meteor.isServer) {
  Meteor.publish('clubs.public.all', function clubsPublication() {
    return Clubs.find({}, {
      fields: {
        "members": 0,
        "userId" : 0,
      }
    });
  });

  Meteor.publish('clubs.private.all', function clubsMembersPublication() {
    return Clubs.find({
      userId: Meteor.userId()
    });
  });


  Meteor.methods({
    'clubs.insert' (club) {
      if(!Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }

      //make sure they match up
      club.userId = Meteor.userId();
      club.members = [];

      Clubs.insert(club);
    },
    'clubs.update' (club) {
      if(!Meteor.userId() && Meteor.findOne({_id: club._id}).userId !== Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }

      Clubs.update({_id: club._id}, club);
    },
    'clubs.delete' (club) {
      if (!Meteor.userId() && Meteor.findOne({_id: club._id}).userId !== Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }

      Clubs.remove({_id: club._id});
    },
    'clubs.addmember' (clubwmember) {
      Clubs.update({_id: clubwmember._id}, {
        $push: {
          members: clubwmember.member,
        },
      });
    },
    'clubs.removemember' (clubwmember) {
      Clubs.update({_id: clubwmember._id}, {
        $pull: {
          members: clubwmember.member
        }
      });
    },
    'clubs.verifyclubsignup' (clubsignup) {
      var details = {
        _id: clubsignup._id,
        clubname: clubsignup.clubname,
        member : {
          name: clubsignup.member.name,
          grade: clubsignup.member.grade,
          email: clubsignup.member.email,
        },
      };
      console.log(details);
      var b64 = encodeURIComponent(new Buffer(JSON.stringify(details) || '').toString("base64"));

      console.log(b64);
      Email.send({
        to: details.member.name + " <" + details.member.email + ">",
        from: "Amberfish <dev@amberfishmail.storied.me>",
        subject: "Please confirm your signup to " + details.clubname,
        html: `<a href="https://amberfish.storied.me/club/confirm/${b64}">Click on this link to confirm your sign up to ${details.clubname}.</a>\n
            Or open this link in your browser: https://amberfish.storied.me/club/confirm/${b64}`,
      });
    }
  });
}
