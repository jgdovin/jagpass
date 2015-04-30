passwords = new Mongo.Collection('passwords');
passwords.before.insert(function(userId, doc) {
   doc.ownerId = userId;
});