passwords = new Mongo.Collection('passwords');
passwords.before.insert(function(userId, doc) {
   doc.ownerId = userId;
});

Mongo.Collection.intercept.init(Rooms);