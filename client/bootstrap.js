Meteor.subscribe('userGroups');
Meteor.subscribe('passwordGroups');
Meteor.subscribe('roles');

Session.set("Mongol", {
    'collections': ['passwords', 'passwordGroups', 'userGroups', 'roles'],
    'display': false,
    'opacity_normal': ".7",
    'opacity_expand': ".9",
});