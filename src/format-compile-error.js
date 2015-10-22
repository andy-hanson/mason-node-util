import {blue, bold, green, magenta} from 'chalk'
import {Warning} from 'mason-compile/dist/CompileError'
import {type} from 'mason-compile/dist/private/util'

export default function formatCompileError(error, modulePath) {
	return format(error.warning, modulePath, 'error')
}

export function formatWarning(warning, modulePath) {
	type(warning, Warning, modulePath, String)
	// Extra space to match up with 'error'
	return format(warning, modulePath, 'warn ')
}

function format(warning, modulePath, kind) {
	let message = `${blue(modulePath)}\n${magenta(kind)} ${bold.red(warning.loc)} `
	// TODO:ES6 Array.from(formatCode(...)) should work
	for (const _ of warning.messageParts(green))
		message = message + _
	return message
}
