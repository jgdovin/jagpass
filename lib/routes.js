Router.configure({
    layoutTemplate: 'default'
});
Router.onBeforeAction(function () {
    // all properties available in the route function
    // are also available here such as this.params

    if (!Meteor.userId()) {
        // if the user is not logged in, render the Login template
        this.render('login');
    } else {
        // otherwise don't hold up the rest of hooks or our route/action function
        // from running
        this.next();
    }
});

Router.map(function() {
   this.route('home', {
       path: '/',
       waitOn: function() {
           return Meteor.subscribe('passwords', Meteor.userId());
       }
   });

    this.route('addPassword', {
        path: '/password/add'
    });

    this.route('allPasswords', {
        path: '/passwords',
        waitOn: function() {
            return Meteor.subscribe('passwords', Meteor.userId());
        }
    })
});