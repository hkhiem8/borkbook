const isSignedIn = (req, res, next) => {
  if (req.session && req.session.user) 
      return next();
    res.redirect('/user/sign-in');
  };
  
  module.exports = isSignedIn;