'use strict';

const express = require('express')
let router = express.Router();
const request = require("request")
const cheerio = require("cheerio")


let url = 'https://en.wikipedia.org/wiki/'

router.get('/:id', (req,res) => {
var coordinates;
var encodedUrl = url + encodeURIComponent(req.params.id);
  request((url + req.params.id), (err,response,body) => {
    let $ = cheerio.load(body);
    var latitude = [];
    var longitude = [];

    $('span.latitude').map((i, element) => {
      latitude.push($(element).text());
    })

    $('span.longitude').map((i, element) => {
      longitude.push($(element).text());
    })

    coordinates = {
      latitude: latitude[0],
      longitude: longitude[0]
    }

    if(!latitude[0]) {
      res.status(400).send(err)
    }
    else {
      res.send(coordinates)
    }

  })

})

module.exports = router;
