import { hooks } from '@bigcommerce/stencil-utils'
import CatalogPage from './catalog'
import compareProducts from './global/compare-products'
import FacetedSearch from './common/faceted-search'
import { createTranslationDictionary } from '../theme/common/utils/translations-utils'
import CartUtils from './cart/cart-utils'

export default class Category extends CatalogPage {
	constructor(context) {
		super(context)
		this.validationDictionary = createTranslationDictionary(context)
		this.initRemoveAllItemsBtn()
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

	initRemoveAllItemsBtn(){

	}

	initAddAllToCartBtn() {
		$('.add-all-to-cart-btn').on('click', () => {
			const data = { lineItems: this.getAllCategoryProductIds() }

			CartUtils.getCart(
				'/api/storefront/cart/?include=lineItems.digitalItems.options,lineItems.physicalItems.options'
			).then((existingCart) => {
				if (existingCart[0]?.id) {
					CartUtils.addCartItem(
						'/api/storefront/carts/',
						existingCart[0].id,
						data
					).then((response) => {
						console.log(response)
						CartUtils.handleItemAddResponse(response)
					})
				} else {
					CartUtils.createCart('/api/storefront/cart', data).then(
						(response) => {
							console.log(response)
							CartUtils.handleItemAddResponse(response)
						}
					)
				}
			})
		})
	}

	getAllCategoryProductIds() {
		const ids = []

		$('[data-product-id]').each((index, ele) => {
			ids.push($(ele).attr('data-product-id'))
		})

		return ids.map((id) => ({
			quantity: 1,
			productId: id,
		}))

		return uniqueIds
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
