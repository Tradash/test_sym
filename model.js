const ajV = require('ajv');
const ajv = new ajV({allErrors: true});
const vsm = require('./data/valschema1.json');
const vsSeats = require('./data/valSeats.json');
const vsSector = require('./data/valSector.json');
const vsCategores = require('./data/valCategores.json');
const vsLines = require('./data/valLines.json');

exports.valmain = ajv.compile(vsm);
exports.valSeats = ajv.compile(vsSeats);
exports.valSector = ajv.compile(vsSector);
exports.valCategores = ajv.compile(vsCategores);
exports.valLines = ajv.compile(vsLines);