import React from 'react'
import s from './index.module.scss'
import Col from '../Col'

import Button from '../Button'
import BlueButton from '../BlueButton/index'
import Row from '../Row'

interface IDeleteCompany {
	// className?: string // Added className prop
	// text_id_table?: string
	// text_course_table?: string
	onExit?: () => void
	CreateCompany?: boolean
	saveFunc?: () => void
	resetFunc?: () => void
	tableDelete?: boolean
}

const DeleteCompany: React.FC<IDeleteCompany> = ({
	onExit,
	CreateCompany, // className,
	saveFunc, // text_course_table,
	resetFunc, // text_id_table,
	tableDelete = true, // text_id_table,
}: IDeleteCompany) => {
	// const DeleteCompanyClassName = `DeleteCompany ${className}`; // Combine className with "DeleteCompany" class using s[className]

	let root = document.getElementsByTagName('body')[0]
	return (
		<div
			style={{height: CreateCompany ? '140px' : '	218px'}}
			className={s.wrapper_position}>
			<Col width="248px" className={s.container}>
				<Row width="248px">
					<p className={s.deleteText}>
						Вы действительно хотите удалить выбранную компанию?
					</p>
					<div
						onClick={() => {
							root.classList.remove('stop-scrolling')
							onExit()
						}}
						className={s.exitButton}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none">
							<path
								d="M7.16474 16.8352C7.2404 16.9067 7.32656 16.955 7.42323 16.9803C7.51991 17.0055 7.61658 17.0055 7.71325 16.9803C7.80992 16.955 7.89398 16.9067 7.96543 16.8352L12.0004 12.7983L16.0354 16.8352C16.1068 16.9067 16.1909 16.955 16.2876 16.9803C16.3842 17.0055 16.482 17.0065 16.5807 16.9834C16.6795 16.9603 16.7646 16.9109 16.8361 16.8352C16.9075 16.7637 16.9548 16.6796 16.9779 16.5829C17.0011 16.4862 17.0011 16.3894 16.9779 16.2927C16.9548 16.196 16.9075 16.1119 16.8361 16.0404L12.8011 11.9972L16.8361 7.96034C16.9075 7.88885 16.9559 7.80475 16.9811 7.70803C17.0063 7.61131 17.0063 7.5146 16.9811 7.41788C16.9559 7.32116 16.9075 7.23706 16.8361 7.16558C16.7604 7.08988 16.6743 7.04047 16.5776 7.01735C16.4809 6.99422 16.3842 6.99422 16.2876 7.01735C16.1909 7.04047 16.1068 7.08988 16.0354 7.16558L12.0004 11.2025L7.96543 7.16558C7.89398 7.08988 7.80887 7.04047 7.7101 7.01735C7.61132 6.99422 7.5136 6.99422 7.41693 7.01735C7.32026 7.04047 7.2362 7.08988 7.16474 7.16558C7.09329 7.23706 7.04601 7.32116 7.02289 7.41788C6.99977 7.5146 6.99977 7.61131 7.02289 7.70803C7.04601 7.80475 7.09329 7.88885 7.16474 7.96034L11.1997 11.9972L7.16474 16.0404C7.09329 16.1119 7.04495 16.196 7.01974 16.2927C6.99452 16.3894 6.99347 16.4862 7.01658 16.5829C7.0397 16.6796 7.08909 16.7637 7.16474 16.8352Z"
								fill="CurrentColor"
							/>
						</svg>
					</div>
				</Row>

				<div className={s.TableButtons}>
					{tableDelete ? (
						<>
							<Button
								width="150px"
								text="Удалить и выйти"
								className={s.ButtonEmptyDelete}
								onClick={resetFunc}
							/>
							<BlueButton width="120px" text="Остаться" onClick={saveFunc} />
						</>
					) : (
						<>
							<Button
								width="120px"
								text="Сбросить"
								className={s.ButtonEmpty}
								onClick={resetFunc}
							/>
							<BlueButton width="120px" text="Сохранить" onClick={saveFunc} />
						</>
					)}
				</div>
			</Col>
		</div>
	)
}

export default DeleteCompany
