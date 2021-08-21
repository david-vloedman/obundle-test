export default {
	createCart: (url, cartItems) => {
		return fetch(url, {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(cartItems),
		}).then((response) => response.json())
	},

	addCartItem: (url, cartId, cartItems) => {
		return fetch(url + cartId + '/items/', {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(cartItems),
		}).then((response) => response.json())
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
		}).then((response) => response.json())
	},

	deleteCartItem: (url, cartId, itemId) => {
		return fetch(url + cartId + '/items/' + itemId, {
			method: 'DELETE',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
			},
		}).then((response) => response.json())
	},

	itemCouldNotBeAddedAlert() {},

	itemAddedAlert() {},

	handleItemAddResponse(response) {
		return response.status !== 200
			? this.itemCouldNotBeAddedAlert()
			: this.itemAddedAlert()
	},
}
