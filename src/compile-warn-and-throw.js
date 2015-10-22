import {warn} from 'console'
import compile, {parseAst} from 'mason-compile/dist/compile'
import CompileError from 'mason-compile/dist/CompileError'
import formatCompileError, {formatWarning} from './format-compile-error'

export default function compileWarnAndThrow(string, inFile, opts) {
	return handle(compile, string, inFile, opts)
}

export function parseWarnAndThrow(string, inFile, opts) {
	return handle(parseAst, string, inFile, opts)
}

function handle(func, string, inFile, opts) {
	const {warnings, result} = func(string, Object.assign({inFile}, opts))

	for (let warning of warnings)
		warn(formatWarning(warning, inFile))

	if (result instanceof CompileError) {
		setErrorMessage(result, inFile)
		throw result
	}
	return result
}

function setErrorMessage(error, modulePath) {
	const formatted = formatCompileError(error, modulePath)
	error.stack = error.stack.replace(error.message, formatted)
	error.message = formatted
}
