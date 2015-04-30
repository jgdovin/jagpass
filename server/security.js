passwords.allow({
    insert: function() {
        return true;
    },
    update: function(userId, password) {
        if(Roles.userIsInRole(userId, 'admin')) {
            return true;
        }

        return userId === password.ownerId;
    },
    remove: function(userId, password) {
        if(Roles.userIsInRole(userId, 'admin')) {
            return true;
        }

        return userId === password.ownerId;
    }
});

passwordGroups.allow({
    insert: function() {
        return true;
    },
    update: function(userId, password) {
        if(Roles.userIsInRole(userId, 'admin')) {
            return true;
        }
        return false;
    },
    remove: function(userId, password) {
        if(Roles.userIsInRole(userId, 'admin')) {
            return true;
        }
        return false;
    }
});