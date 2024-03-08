import { FC } from 'react'
import styles from './TextInfo.module.scss'

const TextInfo: FC = () => {
	return (
		<div className={styles.textInfo}>
			<p>
				Условия оптовых заказов решаются индивидуально по телефону:{' '}
				<a href='tel:+75555555555'>+7 (555) 55-55-555 </a>{' '}
			</p>
			<p>
				Либо опишите суть заказа в форме обратной связи и мы с вами свяжемся.
			</p>
		</div>
	)
}
export default TextInfo
