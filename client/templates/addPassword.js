Template.addPassword.helpers({
    roles : function() {
        if(Roles.userIsInRole(Meteor.userId(), 'admin')) {
            return Roles.getAllRoles();
        } else {
            return GetRolesForUser(Meteor.userId());
        }
    },
    rolesDisabled : function() {
        return Template.instance().rolesDisabled.get() ? 'disabled' : '';
    }
});

Template.addPassword.onCreated(function(){
    this.rolesDisabled = new ReactiveVar;
});

Template.addPassword.events({
    "change [data-action=setPersonal]" : function(event, template) {
        template.rolesDisabled.set(event.target.checked);
    }
})