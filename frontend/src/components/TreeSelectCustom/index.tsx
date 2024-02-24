import React, {useState} from 'react'
import s from './index.module.scss'
import * as mui from '@mui/base'
import ChipsX from '../../assets/xChips.svg'
import Line from '../Line'
import CheckBox from '../CheckBox/index'
export type Option = {
	value: string
	label: string
	subOptions?: Option[]
	expand?: boolean // Optional, if you want to control the initial expand state from the options data
	isChecked?: boolean
	background?: boolean
	className?: string
}

export type TreeSelectCustomProps = {
	options: Option[]
	onChange?: (selectedValues: string[]) => void
	setValueFunction?: (value: string[]) => void
}

export const TreeSelectCustom: React.FC<TreeSelectCustomProps> = ({
	options,
	onChange,
	background262626,
	className,
	setValueFunction,
}) => {
	const [selectedValues, setSelectedValues] = useState<string[]>(['', '', ''])
	const [checkedValues, setCheckedValues] = useState<{[key: string]: boolean}>(
		{},
	)
	const [expandedValues, setExpandedValues] = useState<{
		[key: string]: boolean
	}>({})

	const handleSelectChange = (value: string, index: number) => {
		const updatedValues = [...selectedValues]
		updatedValues[index] = value
		setSelectedValues(updatedValues)
		onChange(updatedValues)
	}

	const handleCheckboxChange = (option: Option, isChecked: boolean) => {
		const newCheckedValues = {...checkedValues}
		options.isChecked = !isChecked
		const setCheckedRecursively = (opt: Option, checked: boolean) => {
			newCheckedValues[opt.value] = checked

			if (opt.subOptions) {
				opt.subOptions.forEach((subOption) => {
					setCheckedRecursively(subOption, checked)
				})
			}
		}

		setCheckedRecursively(option, isChecked)

		setCheckedValues(newCheckedValues)
		setValueFunction(newCheckedValues)
		console.log(newCheckedValues)
	}

	const toggleExpand = (option: Option) => {
		setExpandedValues({
			...expandedValues,
			[option.value]: !expandedValues[option.value],
		})
	}

	const handleRemoveChip = (value: string) => {
		handleCheckboxChange({value, label: '', subOptions: []}, false)
	}

	const renderOptions = (options: Option[], depth: number = 0) => (
		<>
			<ul
				className={s.ul}
				style={{paddingLeft: depth > 0 ? depth * 20 : '16px'}}>
				{options.map((option) => (
					<li className={s.li} key={option.value}>
						<div
							style={{
								color: checkedValues[option.value] ? '#f2f2f2' : '#808080',
							}}
							className={s.optionWrapper}>
							<label className={s.optionLabel}>
								<input
									className={background262626 ? s.optionInput26 : s.optionInput}
									type="checkbox"
									checked={checkedValues[option.value] || false}
									onChange={(e) =>
										handleCheckboxChange(option, e.target.checked)
									}
									ref={(el) => {
										if (el)
											el.indeterminate =
												checkedValues[option.value] === undefined
									}}
								/>
								<div className="ml-8">{option.label}</div>
							</label>
							{option.subOptions && (
								<button onClick={() => toggleExpand(option)}>
									{expandedValues[option.value] ? (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											viewBox="0 0 16 16"
											fill="none">
											<path
												d="M3 10L8 5L13 10"
												stroke="CurrentColor"
												stroke-width="1.4"
												stroke-linecap="round"
												stroke-linejoin="round"
											/>
										</svg>
									) : (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											viewBox="0 0 16 16"
											fill="none">
											<path
												d="M3 6L8 11L13 6"
												stroke="CurrentColor"
												stroke-width="1.4"
												stroke-linecap="round"
												stroke-linejoin="round"
											/>
										</svg>
									)}
								</button>
							)}
						</div>
						<Line
							width={'527px'}
							className={background262626 ? s.OptionsLine26 : s.OptionsLine}
						/>
						{option.subOptions &&
							expandedValues[option.value] &&
							renderOptions(option.subOptions, depth + 1)}
					</li>
				))}
			</ul>
		</>
	)

	return (
		<div className={`${className}`}>
			<mui.Select
				style={{backgroundColor: background262626 && '#333'}}
				className={`${s.muiSelect}`}
				multiple={true}
				renderValue={(option: mui.SelectOption<number> | null) => {
					if (option == null || option.value === null) {
						return (
							<>
								<div className={s.chipContainer}>
									{Object.entries(checkedValues)
										.filter(([_, checked]) => checked)
										.map(([value, _]) => (
											<div
												key={value}
												className={background262626 ? s.chip26 : s.chip}>
												<span>{value}</span>
												<button onClick={() => handleRemoveChip(value)}>
													<img src={ChipsX} alt="ChipsX" />
												</button>
											</div>
										))}
								</div>
							</>
						)
					}
					return (
						<>
							<div className={s.chipContainer}>
								{Object.entries(checkedValues)
									.filter(([_, checked]) => checked)
									.map(([value, _]) => (
										<div
											key={value}
											className={background262626 ? s.chip26 : s.chip}>
											<span>{value}</span>
											<button onClick={() => handleRemoveChip(value)}>
												<img src={ChipsX} alt="ChipsX" />
											</button>
										</div>
									))}
							</div>
						</>
					)
				}}>
				<mui.Option
					value={1}
					style={{backgroundColor: background262626 && '#333'}}
					className={`${s.muiOption} cursor-pointer mt-1`}>
					{renderOptions(options)}
				</mui.Option>
			</mui.Select>
		</div>
	)
}
