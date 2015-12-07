import {readFileSync, realpathSync} from 'fs'
import {install} from 'source-map-support'
import compileWarnAndThrow from './compile-warn-and-throw'

export default function register(compiler) {
	const sourceMaps = new Map()

	install({
		retrieveSourceMap(source) {
			const _ = sourceMaps.get(source)
			return _ === undefined ? null : {url: null, map: _}
		}
	})

	function compileAndRegisterSourceMap(msCode, filename) {
		const {code, sourceMap} = compileWarnAndThrow(compiler, msCode, filename)
		sourceMaps.set(realpathSync(filename), sourceMap)
		return code
	}

	require.extensions['.ms'] = (newModule, filename) => {
		const ms = readFileSync(filename, 'utf-8')
		const js = compileAndRegisterSourceMap(ms, filename)
		newModule._compile(js, filename)
	}
}
