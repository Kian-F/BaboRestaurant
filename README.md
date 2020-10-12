# BABBO Restaurant Website

## Table of Contents
- Introduction
- Motivation
- Preview
- Technologies
- Learnings


## Introduction
This website is a version of Menu Log for an individual restaurant. Users can make orders for pick-up or delivery, with the optional choice of creating a user account. Website built using REACT.js and Ruby on Rails. Deployed to Heroku and Github Pages.\
Feel free to test our app at: (https://anapgsilva.github.io/restaurant_client/#/).  
The server repository is located at: (https://github.com/Kian-F/restaurant_server).

## Motivation
The aim of this project was to deliver an app that has the following core requirements:
- Models - have at least 3 models, associated correctly.
- Views - use partials to DRY (Don't Repeat Yourself) up views.
- Handles invalid data - forms should validate data and handle correct inputs.
- Use Gems - use a GEM that talks to an API to add functionality to the app.
- User Login - basic authentication and authorisation.
- Heroku - deploy to Heroku.\
This was our third project at General Assembly's Software Engineering Immersive course at Sydney.

## Preview

### User home page, where a record of past orders is kept.

<img src="https://anapgsilva.github.io/restaurant_client/babbo-home.png" width="500">

### Page for the menu and ordering cart.

<img src="https://anapgsilva.github.io/restaurant_client/babbo.png" width="500">



## Technologies

- The front end of this application was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
- The back end was built on Ruby on Rails
- [Font Awesome](https://fontawesome.com/).
- [STRIPE](https://stripe.com/docs/development) was integrated for the card payment method, using the npm package [react-stripe-checkout](https://www.npmjs.com/package/react-stripe-checkout) and the rails gem stripe.
### Packages (React)
- Axios - used for requests to the Rails back end.
### Gems (Rails)
- [Knock](https://dev.to/amckean12/user-authentication-for-a-rails-api-and-a-react-client-part-1-server-side-3fej) for user authentication (Rails JWT gem version).
- jwt - used for logging in and creating sessions
- [Rack-cors](https://github.com/cyu/rack-cors) was used for communication between front and back end.

## Learnings

- User authentication
- React front-end working with a Rails API
- Online payment


