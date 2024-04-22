import { actions, reducer } from './cart.slice'

describe('cart', () => {
	it('add to cart product', () => {
		const state = {
			items: []
		}

		const item = {
			id: '1',
			name: 'product',
			count: 1,
			price: 1000,
			image: 'img/product',
			totalPrice: 1000
		}

		const expectCart = {
			items: [
				{
					id: '1',
					name: 'product',
					count: 1,
					price: 1000,
					image: 'img/product',
					totalPrice: 1000
				}
			]
		}

		expect(reducer(state, actions.addToCart(item))).toEqual(expectCart)
	})
})
