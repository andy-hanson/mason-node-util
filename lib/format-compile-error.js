(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports);if (v !== undefined) module.exports = v;
    } else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'chalk'], factory);
    }
})(function (require, exports) {
    "use strict";

    var chalk_1 = require('chalk');
    function formatCompileError(error, modulePath) {
        return format(error.errorMessage, modulePath, 'error');
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = formatCompileError;
    function formatWarning(errorMessage, modulePath) {
        return format(errorMessage, modulePath, 'warn ');
    }
    exports.formatWarning = formatWarning;
    function format(errorMessage, modulePath, kind) {
        let message = `${ chalk_1.blue(modulePath) }\n${ chalk_1.magenta(kind) } ${ chalk_1.bold(chalk_1.red(errorMessage.loc)) } `;
        for (const _ of errorMessage.messageParts(chalk_1.green)) message = message + _;
        return message;
    }
});
//# sourceMappingURL=format-compile-error.js.map
