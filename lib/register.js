(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports);if (v !== undefined) module.exports = v;
    } else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'fs', 'source-map-support', './compile-warn-and-throw'], factory);
    }
})(function (require, exports) {
    "use strict";

    var fs_1 = require('fs');
    var source_map_support_1 = require('source-map-support');
    var compile_warn_and_throw_1 = require('./compile-warn-and-throw');
    function register(compiler) {
        const sourceMaps = new Map();
        source_map_support_1.install({
            retrieveSourceMap(source) {
                const _ = sourceMaps.get(source);
                return _ === undefined ? null : { url: null, map: _ };
            }
        });
        function compileAndRegisterSourceMap(masonSource, filename) {
            var _compile_warn_and_thr = compile_warn_and_throw_1.default(compiler, masonSource, filename);

            const code = _compile_warn_and_thr.code;
            const sourceMap = _compile_warn_and_thr.sourceMap;

            sourceMaps.set(fs_1.realpathSync(filename), sourceMap);
            return code;
        }
        require.extensions['.ms'] = (newModule, filename) => {
            const ms = fs_1.readFileSync(filename, 'utf-8');
            const js = compileAndRegisterSourceMap(ms, filename);
            newModule._compile(js, filename);
        };
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = register;
});
//# sourceMappingURL=register.js.map
