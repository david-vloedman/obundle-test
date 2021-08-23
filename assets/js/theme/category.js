import { hooks } from '@bigcommerce/stencil-utils'
import CatalogPage from './catalog'
import compareProducts from './global/compare-products'
import FacetedSearch from './common/faceted-search'
import { createTranslationDictionary } from '../theme/common/utils/translations-utils'
import cartUtils from './cart/cart-utils'
import swal from './global/sweet-alert'

export default class Category extends CatalogPage {
	constructor(context) {
		super(context)
		this.validationDictionary = createTranslationDictionary(context)
	}

	setLiveRegionAttributes($element, roleType, ariaLiveStatus) {
		$element.attr({
			role: roleType,
			'aria-live': ariaLiveStatus,
		})
	}

	makeShopByPriceFilterAccessible() {
		if (!$('[data-shop-by-price]').length) return

		if ($('.navList-action').hasClass('is-active')) {
			$('a.navList-action.is-active').focus()
		}

		$('a.navList-action').on('click', () =>
			this.setLiveRegionAttributes(
				$('span.price-filter-message'),
				'status',
				'assertive'
			)
		)
	}

	onReady() {
		this.arrangeFocusOnSortBy()
		this.initAddAllToCartBtn()
		this.initRemoveAllItemsBtn()
		$('[data-button-type="add-cart"]').on('click', (e) =>
			this.setLiveRegionAttributes(
				$(e.currentTarget).next(),
				'status',
				'polite'
			)
		)

		this.makeShopByPriceFilterAccessible()

		compareProducts(this.context)

		if ($('#facetedSearch').length > 0) {
			this.initFacetedSearch()
		} else {
			this.onSortBySubmit = this.onSortBySubmit.bind(this)
			hooks.on('sortBy-submitted', this.onSortBySubmit)
		}
		this.initProductImageHover()

		$('a.reset-btn').on('click', () =>
			this.setLiveRegionsAttributes($('span.reset-message'), 'status', 'polite')
		)
		this.ariaNotifyNoProducts()
	}

	initProductImageHover() {
		$('.card-figure').on('mouseenter', function () {
			const $img = $(this).find('.card-image')
			const src = $img.attr('src')
			const hoverSrc = $img
				.attr('data-hover-src')
				.replace('{:size}', $(this).height() + 'x' + $(this).width())
			$img.attr('srcset', hoverSrc)

			$(this).on('mouseleave', function () {
				$img.attr('srcset', src)
			})
		})
	}

	initRemoveAllItemsBtn() {
		const $button = $('.remove-all-cart-btn')
		cartUtils
			.getCart(
				'/api/storefront/cart/?include=lineItems.digitalItems.options,lineItems.physicalItems.options'
			)
			.then((cart) => {
				// if there is a cart, show remove all button
				if (cart[0]) {
					$button.removeClass('button--hidden')
				}

				$button.on('click', () => {
					// fire confirmation of delete modal
					swal
						.fire({
							title: 'Notice',
							icon: 'warning',
							text: 'Remove all items from cart?',
							showCancelButton: true,
						})
						.then((result) => {
							// if the user confirmed, delete the cart
							if (result.isConfirmed) {
								// change the button label and disabled state while fetching
								$button.val('Removing From Cart...').prop('disabled', true)
								// delete the cart
								if (cart[0].id) {
									cartUtils
										.deleteCart('/api/storefront/carts/', cart[0].id)
										.then((res) => {
											this.handleItemsRemoveResponse(res)
										})
								}
							}
						})
				})
			})
	}

	initAddAllToCartBtn() {
		const data = { lineItems: this.getAllCategoryProductIds() }
		const $button = $('.add-all-to-cart-btn')
		$button.on('click', () => {
			// get the original label in case the HTML is changed
			const originalLabel = $button.val()
			// change the button label and disable button while fetching
			$button.val('Adding To Cart...').prop('disabled', true)
			// try to get the current cart
			cartUtils
				.getCart(
					'/api/storefront/cart/?include=lineItems.digitalItems.options,lineItems.physicalItems.options'
				)
				.then((existingCart) => {
					// if cart exists, add items, if cart does not exist, create and add items
					if (existingCart[0]?.id) {
						cartUtils
							.addCartItem('/api/storefront/carts/', existingCart[0].id, data)
							.then((response) => {
								this.handleItemAddResponse(response)
								$button.prop('disabled', false).val(originalLabel)
							})
							.catch((err) => this.itemCouldNotBeAddedAlert())
					} else {
						cartUtils
							.createCart('/api/storefront/cart', data)
							.then((response) => {
								this.handleItemAddResponse(response)
								$button.prop('disabled', false).val(originalLabel)
							})
							.catch((err) => this.itemCouldNotBeAddedAlert())
					}
				})
		})
	}

	itemCouldNotBeAddedAlert() {
		swal.fire({
			title: 'Error',
			icon: 'error',
			text: 'Failed to add items to cart. Some items may require additional options to be selected. ',
		})
	}

	itemAddedAlert() {
		swal
			.fire({
				title: 'Success',
				icon: 'success',
				text: 'All items added to cart.',
			})
			.then((result) => location.reload())
	}

	handleItemAddResponse(response) {
		return response.status === 404 || response.status === 422
			? this.itemCouldNotBeAddedAlert()
			: this.itemAddedAlert()
	}

	itemsCouldNotBeRemovedAlert() {
		swal.fire({
			title: 'Error',
			icon: 'error',
			text: 'Failed to remove items from cart, please try again.',
		})
	}

	itemsRemovedAlert() {
		swal
			.fire({
				title: 'Success',
				icon: 'success',
				text: 'All items removed from cart.',
			})
			.then((result) => location.reload())
	}

	handleItemsRemoveResponse(response) {
		return response.status !== 204
			? this.itemsCouldNotBeRemovedAlert()
			: this.itemsRemovedAlert()
	}

	getAllCategoryProductIds() {
		const ids = []
		// pull id's for each item on the page
		$('[data-product-id]').each((index, ele) => {
			ids.push($(ele).attr('data-product-id'))
		})

		return ids.map((id) => ({
			quantity: 1,
			productId: id,
		}))
	}

	ariaNotifyNoProducts() {
		const $noProductsMessage = $('[data-no-products-notification]')
		if ($noProductsMessage.length) {
			$noProductsMessage.focus()
		}
	}

	initFacetedSearch() {
		const {
			price_min_evaluation: onMinPriceError,
			price_max_evaluation: onMaxPriceError,
			price_min_not_entered: minPriceNotEntered,
			price_max_not_entered: maxPriceNotEntered,
			price_invalid_value: onInvalidPrice,
		} = this.validationDictionary
		const $productListingContainer = $('#product-listing-container')
		const $facetedSearchContainer = $('#faceted-search-container')
		const productsPerPage = this.context.categoryProductsPerPage
		const requestOptions = {
			config: {
				category: {
					shop_by_price: true,
					products: {
						limit: productsPerPage,
					},
				},
			},
			template: {
				productListing: 'category/product-listing',
				sidebar: 'category/sidebar',
			},
			showMore: 'category/show-more',
		}

		this.facetedSearch = new FacetedSearch(
			requestOptions,
			(content) => {
				$productListingContainer.html(content.productListing)
				$facetedSearchContainer.html(content.sidebar)

				$('body').triggerHandler('compareReset')

				$('html, body').animate(
					{
						scrollTop: 0,
					},
					100
				)
			},
			{
				validationErrorMessages: {
					onMinPriceError,
					onMaxPriceError,
					minPriceNotEntered,
					maxPriceNotEntered,
					onInvalidPrice,
				},
			}
		)
	}
}
