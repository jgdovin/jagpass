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

Template.allPasswords.onCreated(function() {
    this.currentGroup = new ReactiveVar;
    this.currentPassword = new ReactiveVar;
});
var timing = {duration: 500, queue: false};
Template.allPasswords.events({
    "click [data-action=getGroup]" : function(e, t) {
        e.preventDefault();
        t.$('[data-target=allGroups]').animate({
            opacity: 0.25,
            left: "-350px",
        }, timing);

        t.$('[data-target=groupPasswords]').animate({
            opacity: 1,
            left: "-350px",
        }, timing);
        t.currentGroup.set($(e.target).data('id'));
    },
    "click [data-action=backToMain]" : function(e, t) {
        e.preventDefault();
        t.$('[data-target=allGroups]').animate({
            opacity: 1,
            left: "0px",
        }, timing);

        t.$('[data-target=groupPasswords]').animate({
            opacity: 0,
            left: "0",
        }, timing);
        t.currentGroup.set('');
    },
    "click [data-action=getPassword]" : function(e, t) {
        e.preventDefault();
        t.$('[data-target=groupPasswords]').animate({
            opacity: 0.25,
        }, timing);

        t.$('[data-target=passwordDetails]').animate({
            opacity: 1,
            left: "-350px",
        }, timing);
        t.currentPassword.set($(e.target).data('id'));
    },
    "click [data-action=backToGroup]" : function(e, t) {
        e.preventDefault();
        t.$('[data-target=passwordDetails]').animate({
            opacity: 0,
            left: 0
        }, timing);
        t.$('[data-target=groupPasswords]').animate({
            opacity: 1
        }, timing);
        t.currentPassword.set('');

    }
});