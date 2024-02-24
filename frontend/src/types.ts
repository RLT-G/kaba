//interfaces

export interface IPermission {
	id: number
	name: string
}

export interface TGenderNAge {
	Gender: string
	AgeFrom: number
	AgeTo: number
}

export interface Response {
	data: {
		[name: string | number | symbol]: any
	}
	status: string
}

export interface IUser {
	user_id: number
	name: string
	avatar: string
	token: string
	permission?: IPermission
	isBlogger: boolean
}

//enums

export enum FileType {
	image,
	video,
	audio,
}

// types
