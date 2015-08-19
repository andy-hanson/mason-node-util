'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _console = require('console');

var _masonCompileDistCompile = require('mason-compile/dist/compile');

var _masonCompileDistCompile2 = _interopRequireDefault(_masonCompileDistCompile);

var _masonCompileDistCompileError = require('mason-compile/dist/CompileError');

var _masonCompileDistCompileError2 = _interopRequireDefault(_masonCompileDistCompileError);

var _formatCompileError = require('./format-compile-error');

var _formatCompileError2 = _interopRequireDefault(_formatCompileError);

exports.default = (string, inFile, opts) => {
	var _compile = (0, _masonCompileDistCompile2.default)(string, Object.assign({ inFile }, opts));

	const warnings = _compile.warnings;
	const result = _compile.result;

	for (let warning of warnings) (0, _console.warn)((0, _formatCompileError.formatWarning)(warning, inFile));

	if (result instanceof _masonCompileDistCompileError2.default) {
		setErrorMessage(result, inFile);
		throw result;
	}

	return result;
};

const setErrorMessage = (error, modulePath) => {
	const formatted = (0, _formatCompileError2.default)(error, modulePath);
	error.stack = error.stack.replace(error.message, formatted);
	error.message = formatted;
};
module.exports = exports.default;
//# sourceMappingURL=compile-warn-and-throw.js.map