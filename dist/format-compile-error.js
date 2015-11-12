'use strict';

(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['exports', 'chalk', 'mason-compile/dist/CompileError', 'mason-compile/dist/private/util'], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports, require('chalk'), require('mason-compile/dist/CompileError'), require('mason-compile/dist/private/util'));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, global.chalk, global.CompileError, global.util);
		global.formatCompileError = mod.exports;
	}
})(this, function (exports, _chalk, _CompileError, _util) {
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = formatCompileError;
	exports.formatWarning = formatWarning;

	function formatCompileError(error, modulePath) {
		return format(error.warning, modulePath, 'error');
	}

	function formatWarning(warning, modulePath) {
		(0, _util.type)(warning, _CompileError.Warning, modulePath, String);
		return format(warning, modulePath, 'warn ');
	}

	function format(warning, modulePath, kind) {
		let message = `${ (0, _chalk.blue)(modulePath) }\n${ (0, _chalk.magenta)(kind) } ${ _chalk.bold.red(warning.loc) } `;

		for (const _ of warning.messageParts(_chalk.green)) message = message + _;

		return message;
	}
});
//# sourceMappingURL=format-compile-error.js.map