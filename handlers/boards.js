'use strict';

var request = require('request')
  , cheerio = require('cheerio')
  , config = require('../config')
  , BASE_URL = config.BASE + config.PATH
  ;

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
        , data = {}
        , list = []
        , board = $('h1')[0].children[0].data.trim()
        , headers = $('table.calendar>thead>tr>th')
        , dates = $('.calendar td')
        , cell
        , item
        ;

      data.board = board;

      Object.keys(dates).forEach(function(elem){
        if(typeof parseInt(elem, 10) === 'number'){
          cell = dates[elem];
          if(cell.hasOwnProperty('type') && cell.children.length > 0){
            item = {};
            item.board = board;
            if(cell.attribs.title){
              item.date = cell.children[0].data + '. ' + headers[elem].attribs.title;
              item.status = cell.attribs.title;
              item.id = '';
            } else {
              item.date = cell.children[0].children[0].data + '. ' + headers[elem].attribs.title;
              item.status = cell.children[0].attribs.title;
              item.id = cell.children[0].attribs.href.split('/').pop();
            }
            list.push(item);
          }
        }
      });

      data.meetings = list;

      reply(data);

    }
  });
}

module.exports.getBoards = getBoards;

module.exports.getMeetings = getMeetings;