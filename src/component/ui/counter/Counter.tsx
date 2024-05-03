import cn from 'clsx'
import { FC, ReactNode } from 'react'
import Skeleton from '../spinner/Spinner'
import styles from './Counter.module.scss' // Подключаем файл со стилями

interface ICounter {
	decrement: () => void
	increment: () => void
	children?: ReactNode
	theme?: string
	isFetching?: boolean
}
const Counter: FC<ICounter> = ({
	decrement,
	increment,
	children,
	theme,
	isFetching
}) => {
	return (
		<div
			className={cn(styles.counter__item, {
				[styles.counter__item_dark]: theme === 'dark'
			})}
		>
			<div className={styles.counter__container}>
				{isFetching ? (
					<Skeleton width='20px' height='30px' />
				) : (
					<button className={styles.counter__button} onClick={decrement}>
						-
					</button>
				)}
				{children}
				{isFetching ? (
					<Skeleton width='20px' height='30px' />
				) : (
					<button className={styles.counter__button} onClick={increment}>
						+
					</button>
				)}
			</div>
		</div>
	)
}

export default Counter
