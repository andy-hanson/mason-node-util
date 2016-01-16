declare module 'chalk'  {
	export function blue(_: string): string
	export function bold(_: string): string
	export function green(_: string): string
	export function magenta(_: string): string
	export function red(_: string): string
}

declare module 'console' {
	export function warn(_: string): void
}

declare module 'fs' {
	export function readFileSync(filename: string, encoding: string): string
	export function realpathSync(filename: string): string
}

declare module 'source-map-support' {
	export function install(_: {retrieveSourceMap: (source: string) => {url: string, map: string}}): void
}

declare const require: any
