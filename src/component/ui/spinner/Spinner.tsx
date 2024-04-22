import styles from './Spinner.module.scss'

const Skeleton = ({
	height,
	width,
	style
}: {
	height?: string
	width?: string
	style?: React.CSSProperties
}) => {
	return (
		<div className={styles.skeleton} style={{ height, width, ...style }}>
			<div className={styles.shape}></div>
		</div>
	)
}

export default Skeleton
