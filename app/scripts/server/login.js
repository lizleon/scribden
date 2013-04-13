'use strict';

/* Services */
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('./user.js');

passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log('getting user info...');
        var user;
        var userPromise = User.getScribdenUserByUsername(username);
        userPromise.then(function(response) {
            user = response;
            
            if(!response) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            else if(response.password != password) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            else {
                return done(null, response);
            }
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
