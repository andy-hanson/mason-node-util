'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _esastDistLoc = require('esast/dist/Loc');

var _esastDistRender = require('esast/dist/render');

var _esastDistRender2 = _interopRequireDefault(_esastDistRender);

var _qIoFs = require('q-io/fs');

var _qIoFs2 = _interopRequireDefault(_qIoFs);

var _path = require('path');

var _masonCompileDistPrivateMsAst = require('mason-compile/dist/private/MsAst');

var _masonCompileDistPrivateCompileContext = require('mason-compile/dist/private/CompileContext');

var _masonCompileDistPrivateCompileContext2 = _interopRequireDefault(_masonCompileDistPrivateCompileContext);

var _masonCompileDistPrivateCompileOptions = require('mason-compile/dist/private/CompileOptions');

var _masonCompileDistPrivateCompileOptions2 = _interopRequireDefault(_masonCompileDistPrivateCompileOptions);

var _masonCompileDistPrivateTranspileTranspile = require('mason-compile/dist/private/transpile/transpile');

var _masonCompileDistPrivateTranspileTranspile2 = _interopRequireDefault(_masonCompileDistPrivateTranspileTranspile);

var _masonCompileDistPrivateUtil = require('mason-compile/dist/private/util');

var _masonCompileDistPrivateVerifyResults = require('mason-compile/dist/private/VerifyResults');

var _masonCompileDistPrivateVerifyResults2 = _interopRequireDefault(_masonCompileDistPrivateVerifyResults);

// Searches a directory and creates a module whose default export is
// a list of the paths of every module in that directory, relative to it.

exports.default = (dirPath, opts) => _qIoFs2.default.listTree(dirPath).then(files => {
	const moduleFiles = (0, _masonCompileDistPrivateUtil.flatOpMap)(files, _ => (0, _masonCompileDistPrivateUtil.opIf)(acceptModule(opts, _), () => `./${ (0, _path.relative)(dirPath, _.slice(0, _.length - ext.length)) }`));
	// Sort to keep it deterministic.
	moduleFiles.sort();
	// Dummy Loc. We will not use source maps.
	const loc = (0, _esastDistLoc.singleCharLoc)(_esastDistLoc.StartPos);
	// Sort to keep it deterministic.
	const modulesBag = new _masonCompileDistPrivateMsAst.BagSimple(loc, moduleFiles.map(_ => _masonCompileDistPrivateMsAst.Quote.forString(loc, _)));
	const exportBag = new _masonCompileDistPrivateMsAst.ModuleExportDefault(loc, new _masonCompileDistPrivateMsAst.AssignSingle(loc, _masonCompileDistPrivateMsAst.LocalDeclare.plain(loc, 'modules-list'), modulesBag), null);
	const module = new _masonCompileDistPrivateMsAst.Module(loc, null, [], [], null, [], [exportBag]);
	return (0, _esastDistRender2.default)((0, _masonCompileDistPrivateTranspileTranspile2.default)(new _masonCompileDistPrivateCompileContext2.default(options), module, new _masonCompileDistPrivateVerifyResults2.default()));
});

const ext = '.js';
const acceptModule = (opts, path) => path.endsWith(ext) && !(opts.exclude && opts.exclude.test(path));
const options = new _masonCompileDistPrivateCompileOptions2.default({
	includeAmdefine: true,
	inFile: 'modules-list.ms',
	includeSourceMap: false,
	includeModuleName: false,
	importBoot: false
});
module.exports = exports.default;
//# sourceMappingURL=list-modules.js.map