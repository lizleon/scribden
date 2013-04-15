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
            console.log(value);
            if(!value) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            else if(response.password != password) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            else {
                return done(null, value);
            }
        }, function(reason) {
            // error handling here
            console.log(reason);
            return done(null, false, { message: reason });
        });
    }
));

exports.passport = passport;
exports.authenticate = passport.authenticate('local', { successRedirect: '/dashboard',
                                    failureRedirect: '/login' },
                                    function(req, res) {
                                        res.redirect('/');
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
  res.redirect('/login')
}
