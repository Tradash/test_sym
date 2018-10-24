const data = require('./data/bd_s.json');
const valmain = require('./model').valmain;
const valSeats = require('./model').valSeats;
const valSector = require('./model').valSector;
const vsCategores = require('./model').vsCategores;
const vsLines = require('./model').vsLines;

class dbModel {
  constructor() {
    this.getSeats = getSeats;
    this.getCategories = getCategories;
    this.getSectors = getSectors;
    this.getLines = getLines;
  };
}

function getSeats(q) {
  this.func = getData;
  this.val = valSeats;
  return this.func(data.response.seats, q, this.val);
};

function getCategories(q) {
  this.func = getData;
  this.val = vsCategores;
  return this.func(data.response.categories, q), this.val;
};

function getSectors(q) {
  this.func = getData;
  this.val = valSector;
  return this.func(data.response.sectors, q, this.val);
};

function getLines(q) {
  this.func = getData;
  this.val = getLines;
  return this.func(data.response.lines, q, this.val);
};

const getData = (dbColl, q, val) => {
  let count; let record;
  let result = [];
  let valid = valmain(qs);
  if (!valid) {
    return {error: val.errors, data: null}
  }
  if (!q) return;
  const d = dbColl;
  for (id in d) {
    count = q.filter.filter((x) => d[id][x.field] == x.value ).length;
    if (count !== 0) {
      if (count === q.filter.length) {
        record = {};
        if (q.fields.length === 0) {
          record = d[id];
        } else {
          for (let i = 0; i < q.fields.length; i++) {
            record[q.fields[i]] = d[id][q.fields[i]];
          }
        }
        result = [...result, record];
      }
    }
  }
  return result;
};


module.exports = dbModel;
