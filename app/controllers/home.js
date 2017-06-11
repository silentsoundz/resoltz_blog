const express = require('express')
const router = express.Router()
const { blogs } = require('../models/article');

const moment = require( 'moment' )

module.exports = function (app) {
  app.use('/', router);
};

const normalizeDate = ( date ) => {
  return moment( date ).format('MMMM Do YYYY')
}

const normalizeDay = ( date ) => {
  return moment( date ).format('dddd')
}

const normalizeDayNum = ( date ) => {
  return moment( date ).format('do')
}

const normalizeMonth = ( date ) => {
  return moment( date ).format('MMMM')
}

const normalizeYear = ( date ) => {
  return moment( date ).format('YYYY')
}

router.get('/', (request, response, next) => {
  blogs.getAllPosts()
    .then( posts => {
      response.render('index', {
        posts,
        normalizeDate,
        normalizeDay,
        normalizeDayNum,
        normalizeMonth,
        normalizeYear,
        title: 'Resoltz Blog'
      } )
    })
})

router.post( '/create', ( request, response, next ) => {
  const post = request.body
  blogs.createPost( post )
    .then( () => response.redirect( '/' ) )
})

router.delete( '/delete/:id', ( request, response, next ) => {
  const id = request.params.id
  blogs.deletePost( id )
    .then( () => response.redirect( '/' ) )
})

router.put( '/edit/:id', ( request, response, next ) => {
  const id = request.params.id
  const post = request.body
  blogs.editPost( id, post )
    .then( () => {
      response.redirect( '/' )
    })
})
