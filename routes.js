'use strict';

var handlers = require('./handlers')
  , routes = [
    {
      method: 'GET',
      path: '/',
      handler: handlers.indexHandler
    },
    {
      method: 'GET',
      path: '/boards',
      handler: handlers.boardsHandler
    },
    {
      method: 'GET',
      path: '/meetings/{boardId}',
      handler: handlers.meetingsHandler
    },
    {
      method: 'GET',
      path: '/meeting/{meetingId}',
      handler: handlers.meetingHandler
    },
    {
      method: 'GET',
      path: '/details/{agendaId}',
      handler: handlers.detailsHandler
    }
  ]
  ;

module.exports = routes;