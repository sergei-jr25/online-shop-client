import { actions as boilerManufacturerActions } from './boilerManufacturer/boilerManufacturer.slice'
import { actions as cartActions } from './cart/cart.slice'
// import { actions as catalogAction } from './catalog/catalog.slice'
import { actions as filterActions } from './filter/filters.slice'
import * as locationActions from './location/location.actions'
import { actions as modeActions } from './mode/mode.slice'
import * as userActions from './user/userActions'
export const allActions = {
	...userActions,
	...modeActions,
	...filterActions,
	...cartActions,
	...boilerManufacturerActions,
	...locationActions
}
