(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports);if (v !== undefined) module.exports = v;
    } else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'console', './format-compile-error'], factory);
    }
})(function (require, exports) {
    "use strict";

    var console_1 = require('console');
    var format_compile_error_1 = require('./format-compile-error');
    function compileWarnAndThrow(compiler, masonSource, filename) {
        return handle(compiler.compile(masonSource, filename), compiler, filename);
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = compileWarnAndThrow;
    function parseWarnAndThrow(compiler, masonSource, filename) {
        return handle(compiler.parse(masonSource, filename), compiler, filename);
    }
    exports.parseWarnAndThrow = parseWarnAndThrow;
    function handle(_ref, compiler, filename) {
        let warnings = _ref.warnings;
        let result = _ref.result;

        for (const _ of warnings) console_1.warn(format_compile_error_1.formatWarning(_, filename));
        if (result instanceof compiler.CompileError) {
            const formatted = format_compile_error_1.default(result, filename);
            result.stack = result.stack.replace(result.message, formatted);
            result.message = formatted;
            throw result;
        } else return result;
    }
});
//# sourceMappingURL=compile-warn-and-throw.js.map
