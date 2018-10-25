const ajV = require('ajv');
const ajv = new ajV({allErrors: true});
const vsm = require('./data/valschema1.json');
const vsSeats = require('./data/valSeats.json');
const vsSectors = require('./data/valSectors.json');
const vsCategories = require('./data/valCategories.json');
const vsLines = require('./data/valLines.json');

exports.valmain = ajv.compile(vsm);
exports.valSeats = ajv.compile(vsSeats);
exports.valSectors = ajv.compile(vsSectors);
exports.valCategories = ajv.compile(vsCategories);
exports.valLines = ajv.compile(vsLines);