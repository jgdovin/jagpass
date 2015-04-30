Meteor.methods({
    createRole: function (name) {
        var loggedInUser = Meteor.user();

        if (!loggedInUser ||
            !Roles.userIsInRole(loggedInUser,
                ['admin'])) {
            throw new Meteor.Error(403, "Access denied")
        }

        Roles.createRole(name);
        console.log('created roll ' + name);
    }
});