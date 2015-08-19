'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.default = formatCompileError;

var _chalk = require('chalk');

var _masonCompileDistCompileError = require('mason-compile/dist/CompileError');

var _masonCompileDistPrivateUtil = require('mason-compile/dist/private/util');

function formatCompileError(error, modulePath) {
	return format(error.warning, modulePath, 'error');
}

const formatWarning = (warning, modulePath) => {
	(0, _masonCompileDistPrivateUtil.type)(warning, _masonCompileDistCompileError.Warning, modulePath, String);
	// Extra space to match up with 'error'
	return format(warning, modulePath, 'warn ');
};

exports.formatWarning = formatWarning;
const format = (warning, modulePath, kind) => {
	let message = `${ (0, _chalk.blue)(modulePath) }\n${ (0, _chalk.magenta)(kind) } ${ _chalk.bold.red(warning.loc) } `;
	// TODO:ES6 Array.from(formatCode(...)) should work
	for (const _ of (0, _masonCompileDistCompileError.formatCode)(warning.message, _chalk.green)) message = message + _;
	return message;
};
//# sourceMappingURL=format-compile-error.js.map