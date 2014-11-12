'use strict';

var request = require('request')
  , cheerio = require('cheerio')
  , config = require('../config')
  , BASE_URL = config.BASE + config.PATH
  ;

function getAgenda(req, reply){
  request(BASE_URL + '/Meetings/Details/' + req.params.agendaId, function (err, response, body) {
    if(err){
      reply(err);
    } else {
      var $ = cheerio.load(body.toString())
        , data = {}
        , details = {}
        , agendaList = []
        , documentList = []
        , agenda = $('tr.on')
        , about = $('#about>div')
        , documents = $('#documents>ul>li>a')
        , item
        , doc
        ;

      details.board = about[1].attribs.title;
      details.place = about[3].children[0] ? about[3].children[0].data.trim() : '';
      details.date = about[5].children[0] ? about[5].children[0].data.trim() : '';
      details.status = about[7].children[0] ? about[7].children[0].data.trim() : '';

      data.details = details;

      Object.keys(documents).forEach(function(elem){
        if(typeof parseInt(elem, 10) === 'number'){
          doc = documents[elem];
          if(doc.hasOwnProperty('type')){
            item = {};
            item.fileUrl = config.BASE + doc.attribs.href;
            item.title = doc.children[0].data;
            documentList.push(item);
          }
        }
      });

      data.documents = documentList;

      agenda.each(function (i, elem) {
        item = {};
        item.casenumber = elem.children[1].children[0].data.trim();
        item.title = elem.children[3].children[1].children[0].data;
        item.id = elem.children[3].children[1].attribs.href.split('/').pop();
        agendaList.push(item);
      });

      data.agenda = agendaList;

      reply(data);
    }
  });
}

module.exports.getAgenda = getAgenda;