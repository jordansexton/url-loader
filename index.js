/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var loaderUtils = require("loader-utils");
var mime = require("mime");
module.exports = function(content) {
	this.cacheable && this.cacheable();
	var query = loaderUtils.parseQuery(this.query);
	var limit = (this.options && this.options.url && this.options.url.dataUrlLimit) || 0;
	if(query.limit) {
		limit = parseInt(query.limit, 10);
	}
	var mimetype = query.mimetype || query.minetype || mime.lookup(this.resourcePath);
	var encoding = query.encoding || 'base64';
	if(limit <= 0 || content.length < limit) {
		var data = encoding + "," + content.toString(encoding);
		return "module.exports = " + JSON.stringify("data:" + (mimetype ? mimetype + ";" : "") + data);
	} else {
		var fileLoader = require("file-loader");
		return fileLoader.call(this, content);
	}
}
module.exports.raw = true;
