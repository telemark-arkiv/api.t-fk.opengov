'use strict';

var details = require('./details')
  , agenda = require('./agenda')
  , boards = require('./boards')
  ;

function getBase(req, reply){
  var msg = {
      "Boards" : "/boards",
      "Meetings": "/board/{boardId}",
      "Agenda" :"/agenda/{agendaId}",
      "Details": "/details/{caseId}"
    }
    ;

  reply(msg);
}

module.exports.getBase = getBase;

module.exports.getBoards = boards.getBoards;

module.exports.getMeetings = boards.getMeetings;

module.exports.getAgenda = agenda.getAgenda;

module.exports.getDetails = details.getDetails;