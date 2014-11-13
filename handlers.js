'use strict';

var ogm = require('opengov-meetings')
  , config = require('./config')
  ;

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
  ogm.getBoards(opts, function callback(err, data){
    if(err){
      reply(err);
    } else {
      reply(data);
    }
  });
}

function meetingsHandler(req, reply){
  var opts = {
      host: config.HOST,
      path: config.PATH,
      boardId: req.params.boardId
    }
    ;
  ogm.getMeetings(opts, function callback(err, data){
    if(err){
      reply(err);
    } else {
      reply(data);
    }
  });
}

function meetingHandler(req, reply){
  var opts = {
      host: config.HOST,
      path: config.PATH,
      meetingId: req.params.meetingId
    }
    ;
  ogm.getAgenda(opts, function callback(err, data){
    if(err){
      reply(err);
    } else {
      reply(data);
    }
  });
}

function detailsHandler(req, reply){
  var opts = {
      host: config.HOST,
      path: config.PATH,
      agendaId: req.params.agendaId
    }
    ;
  ogm.getDetails(opts, function callback(err, data){
    if(err){
      reply(err);
    } else {
      reply(data);
    }
  });
}

module.exports.indexHandler = indexHandler;

module.exports.boardsHandler = boardsHandler;

module.exports.meetingsHandler = meetingsHandler;

module.exports.meetingHandler = meetingHandler;

module.exports.detailsHandler = detailsHandler;