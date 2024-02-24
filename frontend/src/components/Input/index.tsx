import React from 'react'
import s from './index.module.scss'

interface IInput {
	isSecure?: boolean
	id?: string
	placeholder?: string
	width?: string
	minWidth?: string
	errorMsg?: string
	className?: string // Add className property
	maximumLength?: number
	conteinerWidth?: string
	isShowMaxLength?: boolean
	bgColor?: string
	height?: string
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
	value?: string
	isDigits?: boolean
	onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

const Input: React.FC<IInput> = ({
	minWidth,
	conteinerWidth,
	maximumLength,
	onChange,
	isSecure,
	id,
	placeholder,
	width,
	errorMsg,
	className,
	isShowMaxLength = true,
	bgColor,
	height,
	value,
	isDigits,
	onKeyDown,
}: IInput) => {
	const [lengthString, setLengthString] = React.useState<number>(
		maximumLength || 0,
	)
	// const [valueDigit, setValueDigit] = React.useState('')
	return (
		<div
			style={{width: conteinerWidth}}
			className={className + ' ' + s.inputContainer}>
			<div style={{width: width, minWidth: minWidth}} className={s.inputRow}>
				<input
					autoComplete="off"
					maxLength={maximumLength}
					onChange={(event) => {
						onChange(event)
						setLengthString(maximumLength! - event.target.value.length)
						if (isDigits) {
							value = event.target.value.replace(/[^0-9]/g, '')
						}
					}}
					type={isSecure ? 'password' : 'text'}
					style={Object.assign(
						{width: width, minWidth: minWidth},
						bgColor ? {backgroundColor: bgColor} : {},
						height ? {height: height} : {},
					)}
					placeholder={placeholder}
					className={s.inputText + ' ' + (errorMsg ? s.error : '')}
					name={id ? `input-${id}` : 'input'}
					id={id ? `input-${id}` : 'input'}
					value={value}
					onKeyDown={onKeyDown}
				/>
				{(maximumLength ? maximumLength : 0) &&
				(isShowMaxLength ? isShowMaxLength : 0) ? (
					<p className={s.lenght}>{lengthString !== 0 && lengthString}</p>
				) : (
					''
				)}
			</div>
			{errorMsg && <p className={s.errorLabel}>{errorMsg}</p>}
		</div>
	)
}

export default Input
