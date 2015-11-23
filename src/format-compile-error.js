import {blue, bold, green, magenta} from 'chalk'

export default function formatCompileError(error, modulePath) {
	return format(error.errorMessage, modulePath, 'error')
}

export function formatWarning(errorMessage, modulePath) {
	// Extra space to match up with 'error'
	return format(errorMessage, modulePath, 'warn ')
}

function format(errorMessage, modulePath, kind) {
	let message = `${blue(modulePath)}\n${magenta(kind)} ${bold.red(errorMessage.loc)} `
	// TODO:ES6 Array.from(formatCode(...)) should work
	for (const _ of errorMessage.messageParts(green))
		message = message + _
	return message
}
