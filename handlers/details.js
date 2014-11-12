'use strict';

var request = require('request')
  , cheerio = require('cheerio')
  , config = require('../config')
  , BASE_URL = config.BASE + config.PATH
  ;

function getDetails(req, reply){
  request(BASE_URL + '/AgendaItems/Details/' + req.params.caseId, function (err, response, body) {
    if(err){
      reply(err);
    } else {
      var $ = cheerio.load(body.toString())
        , list = []
        , files = $('table.agendaDetails>tbody>tr')
        , item
        ;

      files.each(function (i, elem) {
        if(i > 0) {
          item = {};
          item.title = elem.children[3].children[0].children[0].data;
          item.documentUrl = config.BASE + elem.children[3].children[0].attribs.href;
          item.documentSize = elem.children[5].children[0].data;
          item.documentCategory = elem.children[7].children[0].data;
          list.push(item);
        }
      });

      reply(list);
    }
  });
}

module.exports.getDetails = getDetails;