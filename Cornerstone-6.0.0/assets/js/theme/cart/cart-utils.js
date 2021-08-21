export default {
	createCart: (url, cartItems) => {
		return fetch(url, {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(cartItems),
		}).then(response => response.json())
	},

	addCartItem: (url, cartId, cartItems) => {
		return  fetch(url + cartId + '/items/', {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(cartItems),
		}).then(response => response.json())
	},

	getCart: (url) => {
		return fetch(url, {
			method: 'GET',
			credentials: 'same-origin',
		}).then(response => response.json())
	},
}
