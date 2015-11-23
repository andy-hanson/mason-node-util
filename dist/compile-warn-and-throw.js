'use strict';

(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['exports', 'console', './format-compile-error'], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports, require('console'), require('./format-compile-error'));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, global.console, global.formatCompileError);
		global.compileWarnAndThrow = mod.exports;
	}
})(this, function (exports, _console, _formatCompileError) {
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = compileWarnAndThrow;
	exports.parseWarnAndThrow = parseWarnAndThrow;

	var _formatCompileError2 = _interopRequireDefault(_formatCompileError);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function compileWarnAndThrow(compiler, code, filename) {
		return handle('compile', compiler, code, filename);
	}

	function parseWarnAndThrow(compiler, code, filename) {
		return handle('parse', compiler, code, filename);
	}

	function handle(method, compiler, code, filename) {
		var _compiler$method = compiler[method](code, filename);

		const warnings = _compiler$method.warnings;
		const result = _compiler$method.result;

		for (const _ of warnings) (0, _console.warn)((0, _formatCompileError.formatWarning)(_, filename));

		if (result instanceof compiler.CompileError) {
			const formatted = (0, _formatCompileError2.default)(result, filename);
			result.stack = result.stack.replace(result.message, formatted);
			result.message = formatted;
			throw result;
		} else return result;
	}
});
//# sourceMappingURL=compile-warn-and-throw.js.map