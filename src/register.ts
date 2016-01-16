import {readFileSync, realpathSync} from 'fs'
import {install} from 'source-map-support'
import compileWarnAndThrow from './compile-warn-and-throw'

export default function register(compiler: any): void {
	const sourceMaps = new Map<string, string>()

	install({
		retrieveSourceMap(source: string): {url: string, map: string} {
			const _ = sourceMaps.get(source)
			return _ === undefined ? null : {url: null, map: _}
		}
	})

	function compileAndRegisterSourceMap(masonSource: string, filename: string): string {
		const {code, sourceMap} = compileWarnAndThrow(compiler, masonSource, filename)
		sourceMaps.set(realpathSync(filename), sourceMap)
		return code
	}

	require.extensions['.ms'] = (newModule: any, filename: string): any => {
		const ms = readFileSync(filename, 'utf-8')
		const js = compileAndRegisterSourceMap(ms, filename)
		newModule._compile(js, filename)
	}
}
