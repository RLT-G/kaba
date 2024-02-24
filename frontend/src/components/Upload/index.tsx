import React, {useRef, useState} from 'react'
import s from './index.module.scss'
import WhiteLabel from '../WhiteLabel/index'
import Label from '../Label'
import Col from '../Col'
import {FileType} from '../../types'

interface IUpload {
	propFunction: (file: File) => void
	isMini?: boolean
	width?: string
	fileType?: FileType
	height?: string
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Upload: React.FC<IUpload> = ({
	propFunction,
	isMini = false,
	width,
	fileType = FileType.image,
	height,
	onChange,
}: IUpload) => {
	const component = useRef<HTMLDivElement>(null)
	const [isDragging, setIsDragging] = useState(false)

	const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
		setIsDragging(true)
		e.dataTransfer?.setData('text/plain', '')
	}

	const handleDragEnd = () => {
		setIsDragging(false)
	}

	const handleImageBlockClick = () => {
		const fileInput: HTMLInputElement = component.current?.querySelector(
			"input[type='file']",
		) as HTMLInputElement
		fileInput?.click()

		fileInput?.addEventListener('change', (e) => {
			const droppedFile = (e.target as HTMLInputElement).files
			if (droppedFile) {
				// Call the prop function with the dropped file
				// Replace `propFunction` with the actual name of the prop function
				propFunction(droppedFile[0])
			}
		})
	}

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
	}

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		setIsDragging(false)

		const droppedFile = e.dataTransfer?.files[0]
		if (droppedFile) {
			// Call the prop function with the dropped file
			// Replace `propFunction` with the actual name of the prop function
			propFunction(droppedFile)
		}
	}

	const getFileTypeName = () => {
		switch (fileType) {
			case FileType.image:
				return 'изображение'
			case FileType.video:
				return 'видео'
			case FileType.audio:
				return 'аудио'
			default:
				return 'файл'
		}
	}

	return (
		<div
			style={{
				width: width ? width : '166px',
				height: height ? height : '166px',
				minHeight: height ? height : '166px',
				minWidth: width ? width : '166px',
				cursor: 'pointer',
			}}
			onChange={onChange}
			ref={component}
			className={`${s.imageBlock} ${isDragging ? s.dragging : ''}`}
			onClick={handleImageBlockClick}
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
			onDragOver={handleDragOver}
			onDrop={handleDrop}
			draggable>
			<input type="file" name="" id="" accept="image/*" multiple hidden />
			<Col width="auto" className={s.overlay}>
				<WhiteLabel
					className="w-full cursor-pointer"
					text={`Загрузить ${getFileTypeName()}`}
				/>
				{!isMini && (
					<Label
						className="cursor-pointer"
						text="Выберите файл на компьютере или перетащите его"
						isMini={true}
					/>
				)}
			</Col>
		</div>
	)
}

export default Upload
