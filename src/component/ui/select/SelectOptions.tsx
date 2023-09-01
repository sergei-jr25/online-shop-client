import { IOptionProps } from '@/shared/type/common'
import { components, GroupBase, NoticeProps } from 'react-select'

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
			<span>Спинер</span>
		</components.NoOptionsMessage>
	)
}
