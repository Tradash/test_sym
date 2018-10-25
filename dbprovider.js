const data = require('./data/bd_s.json');

const valSeats = require('./model').valSeats;
const valSectors = require('./model').valSectors;
const valCategories = require('./model').valCategories;
const valLines = require('./model').valLines;

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
  this.val = valCategories;
  return this.func(data.response.categories, q, this.val);
};

function getSectors(q) {
  this.func = getData;
  this.val = valSectors;
  return this.func(data.response.sectors, q, this.val);
};

function getLines(q) {
  this.func = getData;
  this.val = valLines;
  return this.func(data.response.lines, q, this.val);
};



const getData = (d, qn, val) => {
  let count; let record;
  let result = [];
  
  // Проверка тела запроса
  const valid = val(qn);
  if (!valid) { return {error: val.errors, data: null}; }
  // Выделяем данные запроса
  const q = qn.settings;
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
  return {error: null, data: result};
};


module.exports = dbModel;
