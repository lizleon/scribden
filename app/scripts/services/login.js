'use strict';

/* Services */
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    express = require('express');
    //app = express();

passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log('getting user info...');
        var result = User.getUserByUsername(username, function(err, result) {
            if(err)
            {
                return done(null, false, { message: err });
            }
            else if(!result)
            {
                return done(null, false, { message: 'Incorrect username.' });
            }
            else if(result.getValue('Password') != password)
            {
                return done(null, false, { message: 'Incorrect password.' });
            }
            else
            {
                return done(null, result);
            }
        });
    }
));

// var app = express();
//app.post('/authenticate',
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

exports.passport = passport;
