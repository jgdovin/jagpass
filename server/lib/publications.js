Meteor.publish('passwords', function(limiter) {
    if(Roles.userIsInRole(limiter, 'admin')) {
        return passwords.find();
    }
    currentUser = Meteor.users.findOne({_id : limiter});
    return passwords.find({group : { $in : currentUser.roles}});
});

Meteor.publish('passwordGroups', function() {
    return passwordGroups.find();
});
//publish all user roles to Meteor.roles
Meteor.publish('roles', function (){
    return Meteor.roles.find()
});
