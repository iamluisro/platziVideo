# platziVideo
This is my repo for my PlatziVideo web app created with JavaScript (React) 

This project was created as part of the "Escuela de JavaScript" by Platzi. 

There were two main goals to this proyect. The first goal was to create the frontend of the PlatziVideo website using React.js. The second goal was to create an API using Node.js, Express.js and Passport.js. 

The two main parts were: 
1. The Frontend (initialized with create-react-app but then modified using Webpack and Babel compiler).
2. The Backend (created with Node.js, Express, MongoDB for the Database and Passport.js for Authentication).
[To view project click here.](https://platzivideobyiamluisro.herokuapp.com/)

For testing:

Admin User
email: root@undefined.sh
password: root 
Non-Admin User
email: maria@undefined.sh
password: secret

1. Frontend
Frontend Struture
.
├── dist                   # Compiled files 
├── src                     # Source files, holding frontend and ssr
| ├── frontend                 # Folder holding assets (imgs and styles)
| ├   |── actions                 # Folder holding redux actions
| ├   |── assets                 # Folder holding assets (imgs and styles)
| ├   |── components                 # Folder holding app components
| ├   |── containers                 # Folder holding app containers
| ├   |── hooks                 # Folder holding an unused hook to getting data
| ├   |── reducers                 # Folder holding redux reducers
| ├   |── routes                 # Folder app routes 
| ├   |── utils                 # Folder holding gravatar function 
| ├   |── index.js                 # Main file
| ├   |── initialState.js          # InitialState file
| ├── server             # Folder for SSR.
| ├   |── config                 # Folder holding config information.
| ├   |── public                 # Folder holding compiled SSR assets. 
| ├   |── utils                 # Folder holding SSR auth strategies
├── .babelrc                 # Babel Configuration
├── .eslintrc                # Used for Cleaning up code.
└── README.md

Frontend
The frontend piece was created using React.js as the framework and redux (including redux thunk for state management). There is one main file, index.js holding the app store and routes. The App routes are redenred using 'react-router-dom. All components are wrapped here using a "Layout" component rendering the header and footer components. 

The main container is the "Home" container, receiving the main props that are the lists of data creating the three main rows of the app, "Mi Lista", "Tendencias" "Originales". 

The 'CarouselItem" component holds the main logic of each video card in the home page, allowing the user to add favorites to his/her list, remove the video from said list and play the video. At the moment, each video card just plays into a sample Platzi video.

SSR / Authentication
This App has a SSR feature, allowing the app to provide a better experience. The Frontend API Calls first make the calls to the SSR, which then communicated with the Backend API. 

An API Key and JWT token are required to be able to access the Home screen. 


Styling
The styling and layout was designed with a "Desktop-first" approach assuming the user is primarily accessing this information from their laptop or desktop and not through a mobile device. Of course, this assumption requires validation.

A Layout component was created holding the app's header and footer content, functionalities and styling.

Each component and container have their own SCSS files and a Variables sheet (vars.scss) was created to re-use common values. 

Deployment
Frontend deployed through Heroku. The main missing piece is a HTTPS connection, since it's a paid feature within Heroku. My plan is to move this hosting to Netlify or Vercel. 

[To view project click here.](https://platzivideobyiamluisro.herokuapp.com/)

2. Backend
Backend Struture
.
├── movies_api               # Root dir
| ├── congif                # Folder with Config file for ENV variables to be used. 
| ├── lib                 # Folderfor the MongoDB setup and calling the DB. 
| |   ├── mongo.js                 # File with MongoDB setup. 
| ├── middleware          # Folder for express middlewares, such as a schema validation middleware.
| ├── routes              # Folder for the routes to be called (auth and users endpoints). 
| ├── schemas             # Folder for our schemas developed for the users data object.
| ├── scripts             # Folder for setup scripts to add data to our DB. 
| ├── services            # Folder where our Database services were created. 
| ├── strategies          # Folder for creating our basic and jwt strategies for access the DB. 
| ├── index.js                 # Main file of the backend service. 

Deployment
API deployed through Heroku.

