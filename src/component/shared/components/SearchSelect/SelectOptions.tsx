import { IOptionProps } from '@/shared/type/common'

import { components, GroupBase, NoticeProps } from 'react-select'
import Skeleton from '../../../ui/spinner/Spinner'

export const NoOptionsMessage = (
	props: NoticeProps<IOptionProps, boolean, GroupBase<IOptionProps>>
) => {
	return (
		<components.NoOptionsMessage {...props}>
			<span>Ничего не найдено</span>
		</components.NoOptionsMessage>
	)
}
export const NoOptionsSpinner = (
	props: NoticeProps<IOptionProps, boolean, GroupBase<IOptionProps>>
) => {
	return (
		<components.NoOptionsMessage {...props}>
			<Skeleton />
		</components.NoOptionsMessage>
	)
}
