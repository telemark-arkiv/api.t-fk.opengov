'use strict';

var details = require('./details')
  , agenda = require('./agenda')
  , request = require('request')
  , cheerio = require('cheerio')
  , config = require('../config')
  , BASE_URL = config.BASE + config.PATH
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

function getBoards(req, reply){
  request(BASE_URL + '/Boards', function(err, response, body){
    if(err){
      reply(err);
    } else {
      var $ = cheerio.load(body.toString())
        , list = []
        , boards = $('h2>a')
        , item
        ;
      boards.each(function(i, elem){
        item = {};
        item.href = elem.attribs.href;
        item.name = elem.children[0].data;
        item.id = elem.attribs.href.split('/').pop();
        list.push(item);
      });

      reply(list);
    }
  });
}

function getMeetings(req, reply){
  request(BASE_URL + '/Boards/Details/' + req.params.boardId, function(err, response, body){
    if(err){
      reply(err)
    } else {
      var $ = cheerio.load(body.toString())
        , list = []
        , meetings = $('td>a')
        , item
        ;
      meetings.each(function(i, elem){
        item = {};
        item.href = elem.attribs.href;
        item.name = elem.attribs.title;
        item.id = elem.attribs.href.split('/').pop();
        list.push(item);
      });
      reply(list);
    }
  });
}

module.exports.getBoards = getBoards;

module.exports.getBase = getBase;

module.exports.getMeetings = getMeetings;

module.exports.getAgenda = agenda.getAgenda;

module.exports.getDetails = details.getDetails;