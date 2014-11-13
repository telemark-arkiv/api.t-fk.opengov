'use strict';

var ogm = require('opengov-meetings')
  , config = require('./config')
  ;

function getData(func, opts, reply){
  func(opts, function callback(err, data){
    if(err){
      reply(err);
    } else {
      reply(data);
    }
  })
}

function indexHandler(req, reply){
  var msg = {
        "Boards" : "/boards",
        "Meetings": "/meetings/{boardId}",
        "Meeting" :"/meeting/{meetingId}",
        "Details": "/details/{agendaId}"
      }
    ;

  reply(msg);
}

function boardsHandler(req, reply){
  var opts = {
      host: config.HOST,
      path: config.PATH
    }
    ;
  getData(ogm.getBoards, opts, reply);
}

function meetingsHandler(req, reply){
  var opts = {
        host: config.HOST,
        path: config.PATH,
        boardId: req.params.boardId
      }
    ;

  getData(ogm.getMeetings, opts, reply);

}

function meetingHandler(req, reply){
  var opts = {
        host: config.HOST,
        path: config.PATH,
        meetingId: req.params.meetingId
      }
    ;

  getData(ogm.getAgenda, opts, reply);

}

function detailsHandler(req, reply){
  var opts = {
        host: config.HOST,
        path: config.PATH,
        agendaId: req.params.agendaId
      }
    ;

  getData(ogm.getDetails, opts, reply);

}

module.exports.indexHandler = indexHandler;

module.exports.boardsHandler = boardsHandler;

module.exports.meetingsHandler = meetingsHandler;

module.exports.meetingHandler = meetingHandler;

module.exports.detailsHandler = detailsHandler;