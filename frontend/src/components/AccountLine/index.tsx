import React from 'react'
import s from './index.module.scss'
import Row from '../Row/index'
import Col from '../Col/index'
import AccountAvatar from '../AccountAvatar/index'

//svg
import arrowRight from '../../assets/arrow-right.svg'
import WhiteLabel from '../WhiteLabel/index'
import Label from '../Label/index'

interface IAccountLine {
	name?: string
	nick?: string
	className?: string
}

/**
 * Renders an account line component.
 *
 * @param {IAccountLine} props - The properties for the component.
 * @param {string} props.name - The name of the account.
 * @param {string} props.nick - The nickname of the account.
 * @param {string} props.className - The CSS class name for the component.
 * @return {ReactElement} The rendered account line component.
 */
const AccountLine: React.FC<IAccountLine> = ({
	name,
	nick,
	className,
}: IAccountLine) => {
	return (
		<div className={s.accountLine + ' ' + className}>
			<Row>
				<div className={s.leftSide}>
					<AccountAvatar char={name?.charAt(0)} />
					<Col className={s.accountInfo}>
						<WhiteLabel text={name} />
						<Label className={s.accountNick} isMini={true} text={nick} />
					</Col>
				</div>
				<img className={s['arrow-right']} src={arrowRight} alt="arrowRight" />
			</Row>
			{/* <Line/> */}
		</div>
	)
}

export default AccountLine
