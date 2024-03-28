import { reducer as toastReducer } from 'react-redux-toastr'
import { api } from '../service/api/api'
import { reducer as boilerManufacturerREducer } from './boilerManufacturer/boilerManufacturer.slice'
import { reducer as cartReducer } from './cart/cart.slice'
// import { reducer as catalogReducer } from './catalog/catalog.slice'
import { reducer as filtersReducer } from './filter/filters.slice'
import { reducer as locationReducer } from './location/location.slice'
import { reducer as ModeReducer } from './mode/mode.slice'
import { reducer as userReducer } from './user/user.slice'

export const rootReducer = {
	[api.reducerPath]: api.reducer,
	user: userReducer,
	mode: ModeReducer,
	filters: filtersReducer,
	cart: cartReducer,
	boilerManufacturer: boilerManufacturerREducer,
	location: locationReducer,
	toastr: toastReducer
}
