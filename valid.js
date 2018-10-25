const ajV = require('ajv');
const ajv = new ajV({allErrors: true});
const vsm = require('./validate/valmain.json');
const vsSeats = require('./validate/valSeats.json');
const vsSectors = require('./validate/valSectors.json');
const vsCategories = require('./validate/valCategories.json');
const vsLines = require('./validate/valLines.json');

exports.valmain = ajv.compile(vsm);
exports.valSeats = ajv.compile(vsSeats);
exports.valSectors = ajv.compile(vsSectors);
exports.valCategories = ajv.compile(vsCategories);
exports.valLines = ajv.compile(vsLines);