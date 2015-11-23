import {readFileSync, realpathSync} from 'fs'
import {install, retrieveSourceMap as oldRetrieveSourceMap} from 'source-map-support'
import compileWarnAndThrow from './compile-warn-and-throw'

const sourceMaps = new Map()

export default function register(compiler) {
	registeredCompiler = compiler
	require.extensions['.ms'] = (newModule, filename) => {
		const ms = readFileSync(filename, 'utf-8')
		const js = compileAndRegisterSourceMap(ms, filename)
		newModule._compile(js, filename)
	}
}

install({
	retrieveSourceMap(source) {
		const _ = sourceMaps.get(source)
		return _ === undefined ? oldRetrieveSourceMap(source) : {url: null, map: _}
	}
})

let registeredCompiler = null

function compileAndRegisterSourceMap(msCode, filename) {
	const {code, sourceMap} = compileWarnAndThrow(registeredCompiler, msCode, filename)
	sourceMaps.set(realpathSync(filename), sourceMap)
	return code
}
