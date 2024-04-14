import { FC } from 'react'
import styled, { keyframes } from 'styled-components'

interface ITitle {
	dark?: boolean
	primary?: boolean
	bold?: boolean
	color?: string
	// Добавьте любые другие динамические свойства
	// Например: bold?: boolean;
	// Или любые другие свойства, которые вы хотите использовать напрямую в стилях
}

const fadeIn = keyframes`
0: {
	transform: rotate(0)
}
 
100% {
	transform: rotate(360deg)

}
`

// Просто передайте свойства напрямую в стили
const TitleStyled = styled.h1<ITitle>`
	color: ${props => props.theme.colors.primary};
	font-size: ${props => (props.primary ? '32px' : '28px')};
	font-weight: ${props => (props.bold ? 'bold' : 'normal')};
	background-color: ${props => props.color};
	transition: color 0.3s;

	&:hover {
		// animation: ${fadeIn} 1s ease-in-out;
		color: red;
	}

	@media ${props => props.theme.media.tablet} {
		border: 2px solid #fff;
		font-size: 15px !important;
	}

	${props =>
		props.primary &&
		`
		color: green;
		font-weight: 800;
		padding: 10px;
		background-color: blue;
	`}
`

const LargeButton = styled(TitleStyled)`
	font-size: 98px;
`

// Не нужно использовать объект options здесь
const Title: FC<{ children: React.ReactNode } & ITitle> = ({
	children,
	...props
}) => {
	return <LargeButton {...props}>{children}</LargeButton>
}

export default Title
