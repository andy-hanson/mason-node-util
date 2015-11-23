import {warn} from 'console'
import formatCompileError, {formatWarning} from './format-compile-error'

export default function compileWarnAndThrow(compiler, code, filename) {
	return handle('compile', compiler, code, filename)
}

export function parseWarnAndThrow(compiler, code, filename) {
	return handle('parse', compiler, code, filename)
}

function handle(method, compiler, code, filename) {
	const {warnings, result} = compiler[method](code, filename)

	for (const _ of warnings)
		warn(formatWarning(_, filename))

	if (result instanceof compiler.CompileError) {
		const formatted = formatCompileError(result, filename)
		result.stack = result.stack.replace(result.message, formatted)
		result.message = formatted
		throw result
	} else
		return result
}
