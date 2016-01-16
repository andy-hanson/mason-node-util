import {warn} from 'console'
import formatCompileError, {formatWarning} from './format-compile-error'

export default function compileWarnAndThrow(
	compiler: any,
	masonSource: string,
	filename: string)
	: any {
	return handle(compiler.compile(masonSource, filename), compiler, filename)
}

export function parseWarnAndThrow(
	compiler: any,
	masonSource: string,
	filename: string)
	: any {
	return handle(compiler.parse(masonSource, filename), compiler, filename)
}

function handle({warnings, result}: any, compiler: any, filename: string): any {
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
