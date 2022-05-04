export type DeepPartial<T> = {
	[P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export const DeepCopy = (object: any): any => {
	const obj: any = Array.isArray(object) ? [] : {};

	let value;
	for (const key in object) {
		value = object[key];

		obj[key] = typeof value === "object" ? DeepCopy(value) : value;
	}

	return obj;
};

type AllTypes =
	| "string"
	| "object"
	| "function"
	| "number"
	| "bigint"
	| "boolean"
	| "symbol"
	| "undefined"
	| { [key: string]: AllTypes };

export class Checker {
	constructor(protected config: { [key: string]: AllTypes }) {}

	public check(obj: any, subConf: AllTypes = this.config): { ok: boolean; errors: string[] } {
		if (typeof subConf === "object") {
			const errors: string[] = [];
			let ok = true;

			for (const conf in subConf) {
				const result = this.check(obj[conf], subConf[conf]);

				if (!result.ok) {
					errors.push(
						`Key "${conf}" should be typeof "${subConf[conf]}" but is typeof "${typeof obj[conf]}"`
					);
					errors.concat(result.errors);
					ok = false;
				}
			}

			return { ok, errors };
		}

		const type = typeof obj;

		if (type === "undefined" && subConf === "boolean") {
			return { ok: true, errors: [] };
		}

		return { ok: type === subConf, errors: [] };
	}
}

export const deepCopy = (obj: any): any => {
	if (!obj || typeof obj !== "object") return obj;

	const copy: any = {};

	for (const attr in obj) {
		const type = obj[attr];

		switch (true) {
			case type instanceof Date: {
				const date: Date = new Date();
				date.setDate(type.getDate());
				copy[attr] = date;
				break;
			}

			case type instanceof Function:
				copy[attr] = obj[attr];
				break;

			case type instanceof Array: {
				const arr: any = [];
				for (const e of type) {
					arr.push(deepCopy(e));
				}
				copy[attr] = arr;
				break;
			}

			case type instanceof Object: {
				const object: any = {};
				for (const e in type) {
					object[e] = deepCopy(type[e]);
				}
				copy[attr] = object;
				break;
			}

			default:
				copy[attr] = obj[attr];
		}
	}

	return copy;
};
