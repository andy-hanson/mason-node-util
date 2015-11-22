'use strict';

(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['exports', 'console', 'mason-compile/dist/compile', 'mason-compile/dist/CompileError', './format-compile-error'], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports, require('console'), require('mason-compile/dist/compile'), require('mason-compile/dist/CompileError'), require('./format-compile-error'));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, global.console, global.compile, global.CompileError, global.formatCompileError);
		global.compileWarnAndThrow = mod.exports;
	}
})(this, function (exports, _console, _compile, _CompileError, _formatCompileError) {
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = compileWarnAndThrow;
	exports.parseWarnAndThrow = parseWarnAndThrow;

	var _compile2 = _interopRequireDefault(_compile);

	var _CompileError2 = _interopRequireDefault(_CompileError);

	var _formatCompileError2 = _interopRequireDefault(_formatCompileError);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function compileWarnAndThrow(string, inFile, opts) {
		return handle(_compile2.default, string, inFile, opts);
	}

	function parseWarnAndThrow(string, inFile, opts) {
		return handle(_compile.parseAst, string, inFile, opts);
	}

	function handle(func, string, inFile, opts) {
		var _func = func(string, Object.assign({
			inFile
		}, opts));

		const warnings = _func.warnings;
		const result = _func.result;

		for (const _ of warnings) (0, _console.warn)((0, _formatCompileError.formatWarning)(_, inFile));

		if (result instanceof _CompileError2.default) {
			setErrorMessage(result, inFile);
			throw result;
		}

		return result;
	}

	function setErrorMessage(error, modulePath) {
		const formatted = (0, _formatCompileError2.default)(error, modulePath);
		error.stack = error.stack.replace(error.message, formatted);
		error.message = formatted;
	}
});
//# sourceMappingURL=compile-warn-and-throw.js.map