Meteor.startup(function(){
   if(Meteor.roles.find().count() === 0) {
       console.log('no roles found');
       Roles.createRole('admin');
       var user = Accounts.createUser({email: 'admin@admin.com', password: 'admin'});
       Roles.addUsersToRoles(user, ['admin']);
   }
    if(passwordGroups.find().count() === 0) {
        console.log('no password groups found');
        var password1 = passwordGroups.insert({name: 'computers'});
        var password2 = passwordGroups.insert({name: 'GoDaddy'});
        var password3 = passwordGroups.insert({name: 'other'});

        passwords.insert({groupId: password1, name: "tech computer", description: "main login for tech computer"});
        passwords.insert({groupId: password1, name: "John's Computer", description: "main login for John's computer"});
        passwords.insert({groupId: password1, name: "Joe's computer", description: "main login for Joe's computer"});
        passwords.insert({groupId: password2, name: "Main Login", description: "main login for Godaddy"});
        passwords.insert({groupId: password3, name: "server computer", description: "admin login for server"});
        passwords.insert({groupId: password3, name: "remote desktop", description: "remote desktop information"});
    }

});