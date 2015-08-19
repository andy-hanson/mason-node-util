'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _sourceMapSupport = require('source-map-support');

var _compileWarnAndThrow2 = require('./compile-warn-and-throw');

var _compileWarnAndThrow3 = _interopRequireDefault(_compileWarnAndThrow2);

const sourceMaps = new Map();

exports.default = options => {
	compileOptions = options;
	require.extensions['.ms'] = (newModule, filename) => {
		const ms = (0, _fs.readFileSync)(filename, 'utf-8');
		const js = compileAndRegisterSourceMap(ms, filename);
		newModule._compile(js, filename);
	};
};

(0, _sourceMapSupport.install)({
	retrieveSourceMap(source) {
		const _ = sourceMaps.get(source);
		return _ === undefined ? (0, _sourceMapSupport.retrieveSourceMap)(source) : { url: null, map: _ };
	}
});

let compileOptions = null;

const compileAndRegisterSourceMap = (msSrc, inFilePath) => {
	var _compileWarnAndThrow = (0, _compileWarnAndThrow3.default)(msSrc, inFilePath, compileOptions);

	const code = _compileWarnAndThrow.code;
	const sourceMap = _compileWarnAndThrow.sourceMap;

	const fullInPath = (0, _fs.realpathSync)(inFilePath);
	sourceMaps.set(fullInPath, sourceMap);
	return code;
};
module.exports = exports.default;
//# sourceMappingURL=register.js.map