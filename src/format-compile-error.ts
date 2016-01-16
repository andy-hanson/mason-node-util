import {blue, bold, green, magenta, red} from 'chalk'

export default function formatCompileError(error: any, modulePath: string): string {
	return format(error.errorMessage, modulePath, 'error')
}

export function formatWarning(errorMessage: any, modulePath: string): string {
	// Extra space to match up with 'error'
	return format(errorMessage, modulePath, 'warn ')
}

function format(errorMessage: any, modulePath: string, kind: string): string {
	let message = `${blue(modulePath)}\n${magenta(kind)} ${bold(red(errorMessage.loc))} `
	// TODO:ES6 Array.from(formatCode(...)) should work
	for (const _ of errorMessage.messageParts(green))
		message = message + _
	return message
}
