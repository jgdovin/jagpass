Template.addPassword.helpers({
    roles : function() {
        if(Roles.userIsInRole(Meteor.userId(), 'admin')) {
            return Roles.getAllRoles();
        } else {
            return Roles.getRolesForUser(Meteor.userId());
        }
    },
    rolesDisabled : function() {
        return Template.instance().rolesDisabled.get() ? 'disabled' : '';
    },
    groups: function() {
        return passwordGroups.find();
    },
    newGroup: function() {
        return Template.instance().newGroupShow.get();
    }
});

Template.addPassword.onCreated(function(){
    this.rolesDisabled = new ReactiveVar;
    this.newGroupShow = new ReactiveVar;
});

Template.addPassword.events({
    "change [data-action=setPersonal]" : function(event, template) {
        template.rolesDisabled.set(event.target.checked);
        if(event.target.checked) {
            template.$('[name=roles]').attr('checked', false);
        }
    },
    "change [data-action=groupSet]" : function(event, template) {
        if($(event.target).val() == 'addNew') {
            template.newGroupShow.set(true);
        } else {
            template.newGroupShow.set(false);
        }
    },
    "submit [data-name=newPassword]" : function(event, template) {
        event.preventDefault();

        var form = {};
        $.each($(event.target).serializeArray(), function() {
            form[this.name] = this.value;
        });
        if(form.name === '') {
            $.bootstrapGrowl("Display Name is required", {
                type: 'danger' // (null, 'info', 'danger', 'success')
            });
            return false;
        }
        if(form.group === 'addNew' && form.newGroup ==='' || form.group === '') {
            $.bootstrapGrowl("Group is required", {
                type: 'danger' // (null, 'info', 'danger', 'success')
            });
            return false;
        }

        var selected = template.findAll( "[name=roles]:checked");
        var roles = _.map(selected, function(item) {
            return item.defaultValue;
        });
        form['roles'] = roles;

        if(form.group === 'addNew') {
            var groupCheck = passwordGroups.findOne({name: form.newGroup});
            if(!groupCheck) {
                form['groupId'] = passwordGroups.insert({name: form.newGroup});
            } else {
                form['groupId'] = groupCheck._id;
            }
        } else {
            var group = passwordGroups.findOne({name: form.group});
            form['groupId'] = group._id;
        }
        delete form.newGroup;
        passwords.insert(form);
        $.bootstrapGrowl("Password " + form.name + " successfully created", {
            type: 'success'
        });
        //$(event.target).trigger('reset');
    }
});