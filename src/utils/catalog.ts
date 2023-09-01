import { idGenerator } from './common'

function checkedPropsFilters(string: string) {
	return {
		title: string,
		checked: false,
		id: idGenerator()
	}
}

export const boilerPartsData = [
	'Ariston',
	'Baxi',
	'Buderus',
	'Henry',
	'Strategies',
	'Saunier Duval',
	'Bongioanni',
	'Chaffoteaux&Maury',
	'Nortwest'
].map(checkedPropsFilters)
export const manufacturersPartsData = [
	'Azure',
	'Gloves',
	'Cambrigdeshire',
	'Salmon',
	'Montana',
	'Sensor',
	'Lesly',
	'Radian',
	'Gasoline',
	'Croatia'
].map(checkedPropsFilters)
