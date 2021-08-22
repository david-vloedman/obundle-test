export default {
	createCart: (url, cartItems) => {
		return fetch(url, {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(cartItems),
		})
			.then((response) => response.json())
			.catch((err) => console.error(err))
	},

	addCartItem: (url, cartId, cartItems) => {
		return fetch(url + cartId + '/items/', {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(cartItems),
		})
			.then((response) => response.json())
			.catch((err) => console.error(error))
	},

	getCart: (url) => {
		return fetch(url, {
			method: 'GET',
			credentials: 'same-origin',
		}).then((response) => response.json())
	},

	deleteCart: (url, cartId) => {
		return fetch(url + cartId, {
			method: 'DELETE',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
			},
		}).catch((err) => console.error(err))
	},

	deleteCartItem: (url, cartId, itemId) => {
		return fetch(url + cartId + '/items/' + itemId, {
			method: 'DELETE',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.catch((err) => console.error(err))
	},

	itemCouldNotBeAddedAlert: () => {},

	itemAddedAlert: () => {},

	handleItemAddResponse(response) {
		return response.status !== 200
			? this.itemCouldNotBeAddedAlert()
			: this.itemAddedAlert()
	},

	itemsCouldNotBeRemovedAlert() {},

	itemsRemovedAlert() {},

	handleItemsRemoveResponse(response) {
		return response.status !== 204
			? this.itemsCouldNotBeRemovedAlert()
			: this.itemsRemovedAlert()
	},
}
