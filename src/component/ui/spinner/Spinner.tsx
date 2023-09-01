import styles from './Spinner.module.scss'

const Skeleton = ({ height, width }: { height?: string; width?: string }) => {
	return (
		<div className={styles.skeleton} style={{ height: height, width: width }}>
			<div className={styles.shape}></div>
		</div>
	)
}

export default Skeleton
