'use strict';

(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['exports', 'chalk'], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports, require('chalk'));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, global.chalk);
		global.formatCompileError = mod.exports;
	}
})(this, function (exports, _chalk) {
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = formatCompileError;
	exports.formatWarning = formatWarning;

	function formatCompileError(error, modulePath) {
		return format(error.errorMessage, modulePath, 'error');
	}

	function formatWarning(errorMessage, modulePath) {
		return format(errorMessage, modulePath, 'warn ');
	}

	function format(errorMessage, modulePath, kind) {
		let message = `${ (0, _chalk.blue)(modulePath) }\n${ (0, _chalk.magenta)(kind) } ${ _chalk.bold.red(errorMessage.loc) } `;

		for (const _ of errorMessage.messageParts(_chalk.green)) message = message + _;

		return message;
	}
});
//# sourceMappingURL=format-compile-error.js.map