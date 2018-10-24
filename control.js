const parse = require('querystring').parse;
const multiparty = require('multiparty');


class views {
	constructor() {
		this.req = null;
		this.res = null;
		this.socket = null;
		this.query = null;
	}
}

// Проверка запроса
const valData = (data) => {
  const valid = validate(JSON.parse(data));
  const result = {validate: valid, error: validate.errors};
  return result;
};
// Выролнение запроса
const getData = (q) => {
	let qn;
	if (typeof(q) === "string") { qn = JSON.parse(q)} 
		else { qn = q};
	
  //console.log("=====", q.method, db)
  const result = db[qn.method](qn.settings);
  return result;
}

function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    if(request.headers['content-type'] === FORM_URLENCODED) {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body).json, "x-www-form-urlencoded");
        });
    }
    else {
      let form = new multiparty.Form();
      form.parse(request, function(err, fields, files) {
        callback(fields.json[0], "data");
      });
        
    }
}


const controller = (views, modal) = {
	if (views.socket) {
		const result = getData(views.query);
	} else {
		collectRequestData(req, (quer, result) => {
            
            const v = valData(quer);
            openWS.send(JSON.stringify({n:1, d:quer}))
            openWS.send(JSON.stringify({n:2, d:v}))
            //res.end(`Parsed data belonging to ${info} ${JSON.stringify(result)}`);
            //req.abort();
        });
	}
}

module.exports = {
	views: views,
	controller: controller;
}