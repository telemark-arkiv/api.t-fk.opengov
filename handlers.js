'use strict';

var ogm = require('opengov-meetings')
  , config = require('./config')
  , opts = {
      host: config.HOST,
      path: config.PATH
    }
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
  getData(ogm.getBoards, opts, reply);
}

function meetingsHandler(req, reply){
  opts.boardId = req.params.boardId;
  getData(ogm.getMeetings, opts, reply);
}

function meetingHandler(req, reply){
  opts.meetingId = req.params.meetingId;
  getData(ogm.getAgenda, opts, reply);
}

function detailsHandler(req, reply){
  opts.agendaId = req.params.agendaId;
  getData(ogm.getDetails, opts, reply);
}


module.exports = {
  indexHandler: indexHandler,
  boardsHandler: boardsHandler,
  meetingsHandler: meetingsHandler,
  meetingHandler: meetingHandler,
  detailsHandler: detailsHandler
}