import {warn} from 'console'
import compile from 'mason-compile/dist/compile'
import CompileError from 'mason-compile/dist/CompileError'
import formatCompileError, {formatWarning} from './format-compile-error'

export default (string, inFile, opts) => {
	const {warnings, result} = compile(string, Object.assign({inFile}, opts))

	for (let warning of warnings)
		warn(formatWarning(warning, inFile))

	if (result instanceof CompileError) {
		setErrorMessage(result, inFile)
		throw result
	}

	return result
}

const setErrorMessage = (error, modulePath) => {
	const formatted = formatCompileError(error, modulePath)
	error.stack = error.stack.replace(error.message, formatted)
	error.message = formatted
}
