# BABBO Restaurant Website

[Open it here.](https://anapgsilva.github.io/restaurant_client/#/)

Great fun building this group project part of the Software Engineering Immersive course at General Assembly Sydney. Enjoyed the most building both order and check-out components.

This website is a version of Menu Log for an individual restaurant. Users can make orders for pick-up or delivery, with the optional choice of creating a user account. Website built using REACT.js and Ruby on Rails. Deployed to Heroku and Github Pages.


## Preview

### User home page, where a record of past orders is kept.

<img src="https://anapgsilva.github.io/restaurant_client/babbo-home.png" width="500">

### Page for the menu and ordering cart.

<img src="https://anapgsilva.github.io/restaurant_client/babbo.png" width="500">


### Dependencies

The front end of this application was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). [Font Awesome](https://fontawesome.com/) was also used for icons.

[STRIPE](https://stripe.com/docs/development) was integrated for the card payment method, using the npm package [react-stripe-checkout](https://www.npmjs.com/package/react-stripe-checkout) and the rails gem stripe.

The back end was built on Ruby on Rails, using [Knock](https://dev.to/amckean12/user-authentication-for-a-rails-api-and-a-react-client-part-1-server-side-3fej) for user authentication (Rails JWT gem version).

[Rack-cors](https://github.com/cyu/rack-cors) was used for communication between front and back end.


### Available Scripts

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.


#### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!
