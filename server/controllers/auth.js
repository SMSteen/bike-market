const User = require('mongoose').model('User');

module.exports = {
  login(request, response) {
    console.log('auth-controllers - validating user login info');

    const { email, password } = request.body;

    User.findOne({ email })
      .then(user => {
        if (!user) {
          //no user found
          throw Error();
        }
        //validate the password
        return User.validatePassword(password, user.password).then(result => {
          if (result) {
            //passwords matched, proceed with login
            handleLogin(request, response, user);
          } else {
            //passwords do not match, throw error
            throw Error();
          }
        });
      })
      .catch(error => {
        response
          .status(404)
          .json('You have entered an invalid email address or password.');
      });
  },

  register(request, response) {
    console.log('auth-controllers - registering new user');

    User.create(request.body)
      .then(user => {
        //handle the login
        handleLogin(request, response, user);
      })
      .catch(error => {
        //capture and save errors
        const errors = Object.keys(error.errors).map(key => {
          return error.errors[key].message;
        });
        //respond with errors
        response.status(403).json(errors);
      });
  },

  logout(request, response) {
    console.log('auth-controllers - logging user out');

    request.session.destroy();

    response.json(true);
  },

  show(request, response) {
    User.findById(request.params.id)
      .then(user => {
        response.json(user);
      })
      .catch(error => {
        console.log(error);
      });
  }
};

function handleLogin(request, response, user) {
  console.log('auth-controller - logging user in', user);

  request.session.first_name = user.first_name;
  request.session.userID = user._id;

  response.json(user);
}
