declare namespace classNames {
	type Value = string | number | boolean | undefined | null
	type Mapping = Record<string, unknown>
	interface ArgumentArray extends Array<Argument> {}
	type Argument = Value | Mapping | ArgumentArray
}

/**
 * A simple JavaScript utility for conditionally joining classNames together.
 */
declare function classNames(...args: classNames.ArgumentArray): string

export = classNames
