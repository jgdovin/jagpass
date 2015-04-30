Template.allPasswords.helpers({
    passwords : function() {
        return passwords.find();
    },
    groups : function() {
        var passes = passwords.find({}, {fields: {groupId: 1}}).fetch();
        var limit = _.chain(passes).pluck('groupId').flatten().uniq().value();
        return passwordGroups.find({_id: {$in : limit}});
    },
    groupPasswords : function() {
        return passwords.find({groupId : Template.instance().currentGroup.get()});
    },
    passwordDetail : function() {
        return passwords.findOne({_id : Template.instance().currentPassword.get()});
    }
});

Template.allPasswords.created = function() {
    this.currentGroup = new ReactiveVar;
    this.currentPassword = new ReactiveVar;
}

Template.allPasswords.events({
    "click [data-action=getGroup]" : function(e, t) {
        e.preventDefault();
        t.$('[data-target=allGroups]').animate({
            opacity: 0.25,
            left: "-350px",
        }, {duration: 1000, queue: false});

        t.$('[data-target=groupPasswords]').animate({
            opacity: 1,
            left: "-350px",
        }, {duration: 1000, queue: false});
        t.currentGroup.set($(e.target).data('id'));
    },
    "click [data-action=backToMain]" : function(e, t) {
        e.preventDefault();
        t.$('[data-target=allGroups]').animate({
            opacity: 1,
            left: "0px",
        }, {duration: 1000, queue: false});

        t.$('[data-target=groupPasswords]').animate({
            opacity: 0,
            left: "0",
        }, {duration: 1000, queue: false});
        t.currentGroup.set('');
    },
    "click [data-action=getPassword]" : function(e, t) {
        e.preventDefault();
        t.$('[data-target=groupPasswords]').animate({
            opacity: 0.25,
        }, {duration: 1000, queue: false});

        t.$('[data-target=passwordDetails]').animate({
            opacity: 1,
            left: "-350px",
        }, {duration: 1000, queue: false});
        t.currentPassword.set($(e.target).data('id'));
    },
    "click [data-action=backToGroup]" : function(e, t) {
        e.preventDefault();
        t.$('[data-target=passwordDetails]').animate({
            opacity: 0,
            left: 0
        }, {duration: 1000, queue: false});
        t.$('[data-target=groupPasswords]').animate({
            opacity: 1
        }, {duration: 1000, queue: false});
        t.currentPassword.set('');

    }
});