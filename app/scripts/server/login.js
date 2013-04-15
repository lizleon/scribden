'use strict';

/* Services */
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('./user.js');

passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log('init password strategy for ' + username + '...');
        var userPromise = User.getScribdenUserByUsername(username);
        userPromise.then(function(value) {
            console.log('authenticating...');
            console.log(value);
            try {
                if(!value || (value && value.length == 0)) {
                    console.log('err username');
                    return done(null, false, { message: 'Incorrect username.' });
                }
                else if(value[0][2] != password) {
                    console.log('err password');
                    return done(null, false, { message: 'Incorrect password.' });
                }
                else {
                    console.log('authenticating...');
                    console.log(value[0][1]);
                    var user = { id: value[0][0], username: value[0][1], password: value[0][2] };
                    return done(null, user);
                }
            } catch(e) {
                // error handling here
                console.log(e);
            }
        }, function(reason) {
            // error handling here
            console.log(reason);
            return done(null, false, { message: reason });
        });
    }
));

exports.passport = passport;
exports.authenticate = function(req, res, next) {
    var Q = require('q');
    var util = require('./util.js');
    var deferred = Q.defer();
    var fnAuthenticate = passport.authenticate('local', { failureRedirect: '/' }, function(req, res, err) {
        if(res) {
            console.log(res);
            deferred.resolve(true);
        }
        else {
            console.log(err);
            deferred.reject(new Error(err));
        }
    });
    fnAuthenticate(req, res, next);
    util.initPromiseCallback(deferred.promise, res);
};

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    var deferred = User.getScribdenUserById(id)
    deferred.then(function (value) {
        done(null, value);
    }, function(reason) {
        done(reason, null);
    });
});

/*
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});
*/

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/')
}
