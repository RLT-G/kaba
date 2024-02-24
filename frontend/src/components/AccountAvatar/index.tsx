import React from 'react'
import s from './index.module.scss'

interface IAccountAvatar {
	char?: string
	size?: number
	className?: string
	img?: string
	style?: React.CSSProperties
	onClick?: () => void
}

/**
 * Generates the account avatar component.
 *
 * @param {IAccountAvatar} className - The CSS class name for the component.
 * @param {IAccountAvatar} char - The character to display in the avatar when no image is provided.
 * @param {IAccountAvatar} size - The size of the avatar in pixels.
 * @param {IAccountAvatar} img - The URL of the image to display in the avatar.
 * @return {React.FC<IAccountAvatar>} The generated account avatar component.
 */
const AccountAvatar: React.FC<IAccountAvatar> = ({
	className,
	char,
	size,
	img,
	style,
	onClick,
}: IAccountAvatar) => {
	return (
		<div
			onClick={onClick}
			className={`${s.avatar} ${className}`}
			style={Object.assign({}, style, {
				width: size ? `${size}px` : '36px',
				height: size ? `${size}px` : '36px',
				borderRadius: size ? `${size / 2}px` : '18px',
			})}>
			{img ? (
				<img
					style={{
						width: size ? `${size}px` : '36px',
						height: size ? `${size}px` : '36px',
						borderRadius: size ? `${size / 2}px` : '18px',
					}}
					src={img}
					alt="avatar"
				/>
			) : (
				<p>{char?.charAt(0)}</p>
			)}
		</div>
	)
}

export default AccountAvatar
