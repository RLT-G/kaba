import React, {ReactNode, useEffect} from 'react'
import s from './index.module.scss'
import { rootCertificates } from 'tls'

interface PopUpWrapper {
	children?: ReactNode[] | ReactNode | null | undefined
	onExit?: () => void
}

const PopUpWrapper: React.FC<PopUpWrapper> = ({
	children,
	onExit,
}: PopUpWrapper) => {
	let root = document.getElementsByTagName('body')[0]
	useEffect(() => {
		if (root) {
			console.log('true')
			root.classList.add('stop-scrolling')
		}
	}, [])
	const beforeExit = () => {
		root.classList.remove('stop-scrolling')
		onExit()
	}
	return (
		<>
			<div className={s.wrapper}>
				<div className={s.popUp}>
					{children}
				</div>
				<div onClick={beforeExit} className={s.Background}></div>
			</div>
		</>
	)
}

export default PopUpWrapper
