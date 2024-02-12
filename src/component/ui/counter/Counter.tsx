import { FC, ReactNode } from 'react'
import styles from './Counter.module.scss' // Подключаем файл со стилями

interface ICounter {
	decrement: () => void
	increment: () => void
	children?: ReactNode
}
const Counter: FC<ICounter> = ({ decrement, increment, children }) => {
	return (
		<div className={styles.counter}>
			<div className={styles.counter__container}>
				<button className={styles.counter__button} onClick={decrement}>
					-
				</button>
				{children}
				<button className={styles.counter__button} onClick={increment}>
					+
				</button>
			</div>
		</div>
	)
}

export default Counter
