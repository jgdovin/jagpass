passwords = new Mongo.Collection('passwords');
passwords.helpers({
  decrypted: function() {
    return Meteor.call('decryptPassword', this.password);
  }
})



