# My Daily Meals

## What it is:
 
A web service that allows the user to build his own typical food day by combining the various types of food. Its purpose is to show how it is possible to take data from an external API, manipulate it to your liking and save it in localstorage.


## Usage:

When one of the "+" buttons is pressed, a modal window opens from which it will be possible to search for the desired food and, once selected, set the relative quantity in grams: the application will, in fact, carry out all the calculations automatically. 
In particular, we find the automatic calculations relating to the total macronutrients divided by meal and the global ones for the whole day.
It is also possible to delete the foods inserted by clicking on the inserted food.
Whenever the user presses the "Submit Data" button, the data is saved in the localstorage and shown in the "history" table, also indicating the meals from which the foods entered come. Furthermore, if new foods are added, it is possible to add them to the pre-existing ones in the same table: these data will be added to follow.



## How the project is structured:
The data store of the project is created using react "context api", making it unnecessary to use an additional Javascript library for simplified state management such as Redux. As for the build and deployment part, the webserver is managed by netlify.
 
For the realization, an external API was used granted by the site: https://api.edamam.com , through which it is possible to search for foods in their database.

 

## How to use it offline:

For offline use we recommend the following steps:

* Go to the edamam.com website and register to get your personal credentials.

* Create the .env file with the keys "REACT_APP_APP_ID" and "REACT_APP_APP_KEY" in the root of the project relating to the data obtained by registering on edamam.

* Download the project and open it in your favorite editor


* install dependencies: 
  ```
  npm install
  ```
* start the build: 
  ```
  npm run build
  ```
* start the webserver locally:
  ```
  npm start
  ```

The project will be visible at the address:
http://localhost:3000

To follow, the link where you can try the application.

Happy Coding!

## Live Demo:

https://mydailymeals.netlify.app/
