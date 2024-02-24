import React, {ReactNode, useEffect, useRef, useState} from 'react'
import s from './index.module.scss'

interface IVerticalScroll {
	children: ReactNode
}

const VerticalScroll: React.FC<IVerticalScroll> = ({
	children,
}: IVerticalScroll) => {
	const [height, setHeight] = useState<number>(0)
	const [thumbHeight, setThumbHeight] = useState<number>(0)
	const [childrenLoaded, setChildrenLoaded] = useState<boolean>(false)
	const containerRef = useRef<HTMLDivElement>(null)
	const [isMouseDown, setIsMouseDown] = useState<boolean>(false)
	const [initialMouseY, setInitialMouseY] = useState<number>(0)
	const [ThumbPosition, setThumbPosition] = useState<number>(0)
	const [initialContainerScrollTop, setInitialContainerScrollTop] =
		useState<number>(0)

	useEffect(() => {
		if (containerRef.current && childrenLoaded) {
			const containerElement = containerRef.current
				.children[0] as HTMLDivElement
			setHeight(containerElement.clientHeight)
			setThumbHeight(
				Math.max(
					(containerElement.clientHeight / containerElement.scrollHeight) *
						containerElement.clientHeight,
					20,
				),
			)
		}
	}, [childrenLoaded])

	useEffect(() => {
		if (children) {
			setChildrenLoaded(true)
		}
	}, [children])

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault()
		setIsMouseDown(true)
		setInitialMouseY(e.clientY)
		setInitialContainerScrollTop(containerRef.current?.scrollTop || 0)
	}

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!isMouseDown) return
		e.preventDefault()
		const deltaY = e.clientY - initialMouseY
		const newThumbPosition = Math.min(
			Math.max(thumbHeight + deltaY, 20),
			height,
		)
		const percentage = newThumbPosition / height
		containerRef.current.scrollTop =
			percentage * containerRef.current.scrollHeight
		setThumbPosition(newThumbPosition)
		console.log(ThumbPosition)
	}

	const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
		setIsMouseDown(false)
	}

	return (
		<div className="flex flex-row justify-between">
			<div
				className="w-full"
				ref={containerRef}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}>
				{children}
			</div>
			{/* <div
				className="w-[6px] ml-4"
				style={{height: `${height}px`}}
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}>
				<div
					className="w-[6px] rounded-[10px] bg-[#333333] hover:bg-[#474747] transition-all"
					style={{
						height: `${thumbHeight}px`,
						transform: `translateY(${ThumbPosition}px)`,
					}}></div>
			</div> */}
		</div>
	)
}

export default VerticalScroll
