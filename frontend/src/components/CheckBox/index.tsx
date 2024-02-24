import React, {ReactNode, useEffect, useRef} from 'react'
import s from './index.module.scss'

interface ICheckBox {
	children?: ReactNode[]
	labelText?: string | ReactNode
	className?: string // Added className prop
	id?: string
	onChange?: (checked: boolean) => void
	isChangeOnActive?: boolean
	isOnChecked?: boolean
}

const CheckBox: React.FC<ICheckBox> = ({
	labelText,
	className,
	id,
	onChange,
	isChangeOnActive,
	isOnChecked,
}: ICheckBox) => {
	const handleRef = useRef()
	let [isChecked, setIsChecked] = React.useState<boolean>(false)

	useEffect(() => {
		handleRef.current.checked = isOnChecked
	}, [])

	return (
		<div
			className={`${s.CheckBox} ${className}`}
			onClick={() => {
				let check = handleRef.current.checked
				console.log('check', check, 'isChecked', isOnChecked)

				setIsChecked(check)
				if (onChange) onChange(!isChecked && !isOnChecked)
				// console.log(check, 'check');
			}}>
			<input
				type={'checkbox'}
				id={id}
				className={`${s.checkbox} ${className}`}
				ref={handleRef}
			/>
			<label
				className={`${className} ${
					isChangeOnActive && isChecked ? s.activeLabel : ''
				}`}
				htmlFor={id}>
				{labelText}
			</label>
		</div>
	)
}

export default CheckBox
