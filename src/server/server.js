/* eslint-disable global-require */
import express from 'express';
import webpack from 'webpack';
import helmet from 'helmet';
import axios from 'axios';
import cors from 'cors';
import passport from 'passport';
import boom from '@hapi/boom';
import cookieParser from 'cookie-parser';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { renderRoutes } from 'react-router-config';
//import initialState from '../frontend/initialState';
import Layout from '../frontend/components/Layout';
import reducer from '../frontend/reducers';
import serverRoutes from '../frontend/routes/serverRoutes';
import config from './config/index';
import getManifest from './getManifest';

const { env, port, apiUrl } = config;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
//app.use(session({ secret: sessionSecret }));
app.use(passport.initialize());
app.use(passport.session());

// Basic Strategy
require('./utils/auth/strategies/basic');

if (env === 'development') {
  console.log('Development config');
  const webpackConfig = require('../../webpack.config');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);
  const serverConfig = { port, hot: true };

  app.use(webpackDevMiddleware(compiler, serverConfig));
  app.use(webpackHotMiddleware(compiler));
} else {
  app.use((req, res, next) => {
    if (!req.hashManifest) req.hashManifest = getManifest();
    next();
  });
  app.use(express.static(`${__dirname}/public`));
  app.use(helmet());
  app.use(helmet.permittedCrossDomainPolicies());
  app.disable('x-powered-by');
}

app.post('/auth/sign-in', async (req, res, next) => {
  passport.authenticate('basic', (error, data) => {
    try {
      if (error || !data) {
        next(boom.unauthorized());
      }

      req.login(data, { session: false }, async (error) => {
        if (error) {
          next(error);
        }

        const { token, ...user } = data;
        res.cookie('token', token, {
          httpOnly: !(env === 'development'),
          secure: !(env === 'development'),
          domain: 'https://platzivideoapptest.herokuapp.com/',
        });

        res.status(200).json(user.user);
      });
    } catch (error) {
      next(error);
    }
  })(req, res, next);
});

app.post('/auth/sign-up', async (req, res, next) => {
  const { body: user } = req;
  try {
    const userData = await axios({
      url: `${apiUrl}/api/auth/sign-up`,
      method: 'post',
      data: user,
    });

    res.status(201).json({
      name: req.body.name,
      email: req.body.email,
      id: userData.data.data,
      message: 'user created' });
  } catch (error) {
    next(error);
  }
});

app.post('/user-movies', async (req, res, next) => {
  try {
    const { body } = req;
    const { token, id } = req.cookies;

    const userMovie = {
      userId: id,
      movieId: body._id,
    };

    const { data, status } = await axios({
      url: `${apiUrl}/api/user-movies`,
      headers: { Authorization: `Bearer ${token}` },
      method: 'post',
      data: userMovie,
    });

    if (status === 200 && data.exist === true) {
      res.status(200).json({ data });
      console.log(`200status and data: ${data.message}`);
    } else {

      if (status !== 201) {
        return next(boom.badImplementation());
      }

      res.status(201).json({ data });
      console.log(`201 status and data: ${data.message}`);
    }

  } catch (error) {
    next(error);
  }
});

app.delete('/user-movies/:movieId', async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const { token, id } = req.cookies;

    const { data, status } = await axios({
      url: `${apiUrl}/api/user-movies/${movieId}?userId=${id}`,
      headers: { Authorization: `Bearer ${token}` },
      method: 'delete',
    });

    if (status !== 200) {
      return next(boom.badImplementation());
    }

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

const setResponse = (html, preloadedState, manifest) => {
  const mainStyles = manifest ? manifest['main.css'] : 'assets/app.css';
  const mainBuild = manifest ? manifest['main.js'] : 'assets/app.js';
  const vendorBuild = manifest ? manifest['vendors.js'] : 'assets/vendor.js';

  return (`
    <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                <link rel="stylesheet" href="${mainStyles}" type="text/css">
                <title>Platzi Video</title>
            </head>
            <body>
                <div id="app">${html}</div>
                <script>
                    window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
                </script>
                <script src="${mainBuild}" type="text/javascript"></script>
                <script src="${vendorBuild}" type="text/javascript"></script>
            </body>
        </html>
        `);
};

const renderApp = async (req, res, next) => {
  try {
    let initialState;
    try {
      const { token, email, name, id } = req.cookies;
      let user = {};
      if (email || name || id) {
        user = {
          id,
          email,
          name,
        };
      }

      let movieList = await axios({
        url: `${apiUrl}/api/movies`,
        headers: { Authorization: `Bearer ${token}` },
        method: 'get',
      });

      movieList = movieList.data.data;

      let userMovies = await axios({
        url: `${apiUrl}/api/user-movies?userId=${id}`,
        headers: { Authorization: `Bearer ${token}` },
        method: 'get',
      });

      userMovies = userMovies.data.data;

      const mylist = [];
      movieList.filter((movie) => {
        userMovies.filter((userMovie) => {
          if (userMovie.movieId === movie._id) {
            mylist.push(movie);
          }
          return mylist;
        });
        return mylist;
      });

      initialState = {
        user,
        playing: {},
        mylist,
        trends: movieList.filter((movie) => movie.contentRating === 'PG' && movie.id),
        originals: movieList.filter((movie) => movie.contentRating === 'G' && movie.id),
      };

    } catch (err) {
      initialState = {
        user: {},
        playing: {},
        mylist: [],
        trends: {},
        originals: {},
      };

      console.log(err);
    }

    const isLogged = (initialState.user.id);
    const store = createStore(reducer, initialState);
    const preloadedState = store.getState();
    const html = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={{}}>
          <Layout>
            {renderRoutes(serverRoutes(isLogged))}
          </Layout>
        </StaticRouter>
      </Provider>,
    );

    res.send(setResponse(html, preloadedState, req.hashManifest));
  } catch (err) {
    next(err);
  }
};
app.get('*', renderApp);

app.listen(port, (err) => {
  if (err) console.log(err);
  else console.log(`Server running on  port:${port}`);
});

