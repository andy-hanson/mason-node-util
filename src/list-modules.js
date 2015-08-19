import {singleCharLoc, StartPos} from 'esast/dist/Loc'
import render from 'esast/dist/render'
import fs from 'q-io/fs'
import {relative} from 'path'
import {AssignSingle, BagSimple, LocalDeclare, Module, ModuleExportDefault, Quote
	} from 'mason-compile/dist/private/MsAst'
import CompileContext from 'mason-compile/dist/private/CompileContext'
import CompileOptions from 'mason-compile/dist/private/CompileOptions'
import transpile from 'mason-compile/dist/private/transpile/transpile'
import {flatOpMap, opIf} from 'mason-compile/dist/private/util'
import VerifyResults from 'mason-compile/dist/private/VerifyResults'

// Searches a directory and creates a module whose default export is
// a list of the paths of every module in that directory, relative to it.
export default (dirPath, opts) =>
	fs.listTree(dirPath).then(files => {
		const moduleFiles = flatOpMap(files, _ =>
			opIf(acceptModule(opts, _), () =>
				`./${relative(dirPath, _.slice(0, _.length - ext.length))}`))
		// Sort to keep it deterministic.
		moduleFiles.sort()
		// Dummy Loc. We will not use source maps.
		const loc = singleCharLoc(StartPos)
		// Sort to keep it deterministic.
		const modulesBag = new BagSimple(loc, moduleFiles.map(_ => Quote.forString(loc, _)))
		const exportBag = new ModuleExportDefault(loc,
			new AssignSingle(loc, LocalDeclare.plain(loc, 'modules-list'), modulesBag),
			null)
		const module = new Module(loc, null, [], [], null, [], [exportBag])
		return render(transpile(new CompileContext(options), module, new VerifyResults()))
	})

const ext = '.js'
const acceptModule = (opts, path) =>
	path.endsWith(ext) && !(opts.exclude && opts.exclude.test(path))
const options = new CompileOptions({
	includeAmdefine: true,
	inFile: 'modules-list.ms',
	includeSourceMap: false,
	includeModuleName: false,
	importBoot: false
})
