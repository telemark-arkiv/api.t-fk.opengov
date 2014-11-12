'use strict';

var handlers = require('./handlers')
  , routes = [
    {
      method: 'GET',
      path: '/',
      handler: handlers.getBase
    },
    {
      method: 'GET',
      path: '/boards',
      handler: handlers.getBoards
    },
    {
      method: 'GET',
      path: '/board/{boardId}',
      handler: handlers.getMeetings
    },
    {
      method: 'GET',
      path: '/agenda/{agendaId}',
      handler: handlers.getAgenda
    },
    {
      method: 'GET',
      path: '/details/{caseId}',
      handler: handlers.getDetails
    }
  ]
  ;

module.exports = routes;