const parse = require('querystring').parse;
const multiparty = require('multiparty');
const valmain = require('./valid').valmain;



class views {
	constructor() {
		this.req = null;
		this.res = null;
		this.socket = null;
		this.query = null;
    this.sender = null;
	}
}

// Выролнение запроса
const getData = (q, db) => {
	let qn;
	if (typeof(q) === "string") { qn = JSON.parse(q)} 
		else { qn = q};
	// Проверка заголовка запроса
  	let valid = valmain(qn);
  	if (!valid) { return {error: valmain.errors, data: null}; }	
  	const result = db[qn.method](qn);
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
            callback(parse(body).json);
        });
    }
    else {
      let form = new multiparty.Form();
      form.parse(request, function(err, fields, files) {
        callback(fields.json[0]);
      });
        
    }
}


const controller = (views, dbmodal) => {
  //console.log(views.socket);
	if (views.sender === "ws") {
		const result = getData(views.query, dbmodal);
		views.socket.send(JSON.stringify(result));
	} else {
		collectRequestData(views.req, (query) => {
            const result = getData(query, dbmodal);
            views.res.end(JSON.stringify(result));
        });
	}
}

module.exports = {
	views: views,
	controller: controller
}