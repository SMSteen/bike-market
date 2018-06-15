const Bike = require('mongoose').model('Bike');
const User = require('mongoose').model('User');

module.exports = {
  index(request, response) {
    if (Object.keys(request.query).length > 0) {
      //passing query paramters, get some bikes
      console.log(
        'bike-controller --> get bikes where owner is',
        request.query
      );
      Bike.find({ owner: request.session.userID })
        .then(bikes => response.json(bikes))
        .catch(console.log);
    } else {
      //no query paramters, get all bikes
      console.log('bike-controller --> getting all bikes from database');
      Bike.find({})
        .then(bikes => response.json(bikes))
        .catch(console.log);
    }
  },

  create(request, response) {
    const bike = { ...request.body, owner: request.session.userID };
    console.log('bike-controller --> adding bike to database', bike);
    Bike.create(bike)
      .then(bike => {
        console.log(
          'bike-controller --> bike created, finding user record to update'
        );
        User.findByIdAndUpdate(request.session.userID, {
          $push: { bikes: bike }
        }).then(() => {
          response.json(bike);
        });
      })
      .catch(error => {
        console.log(error);
        response
          .status(502)
          .json(
            Object.keys(error.errors).map(key => error.errors[key].message)
          );
      });
  },

  show(request, response) {
    console.log('bike-controller --> getting one bike from database');
    Bike.findById(request.params.bikeID)
      .populate('owner')
      .then(bike => response.json(bike))
      .catch(console.log);
  },

  update(request, response) {
    console.log('bike-controller --> updating bike in database');
    Bike.findByIdAndUpdate(request.params.bikeID, request.body, { new: true })
      .then(bike => response.json(bike))
      .catch(console.log);
  },

  destroy(request, response) {
    console.log('bike-controller --> deleting bike from database');
    Bike.findByIdAndRemove(request.params.bikeID)
      .then(bike => response.json(bike))
      .catch(console.log);
  }
};
