import {readFileSync, realpathSync} from 'fs'
import {install, retrieveSourceMap as oldRetrieveSourceMap} from 'source-map-support'
import compileWarnAndThrow from './compile-warn-and-throw'

const sourceMaps = new Map()

export default function register(options) {
	compileOptions = options
	require.extensions['.ms'] = (newModule, filename) => {
		const ms = readFileSync(filename, 'utf-8')
		const js = compileAndRegisterSourceMap(ms, filename)
		newModule._compile(js, filename)
	}
}

install({
	retrieveSourceMap(source) {
		const _ = sourceMaps.get(source)
		return _ === undefined ?
			oldRetrieveSourceMap(source):
			{url: null, map: _}
	}
})

let compileOptions = null

function compileAndRegisterSourceMap(msSrc, inFilePath) {
	const {code, sourceMap} = compileWarnAndThrow(msSrc, inFilePath, compileOptions)
	const fullInPath = realpathSync(inFilePath)
	sourceMaps.set(fullInPath, sourceMap)
	return code
}
