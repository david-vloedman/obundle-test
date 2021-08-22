(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

/***/ "./assets/js/theme/cart/cart-utils.js":
/*!********************************************!*\
  !*** ./assets/js/theme/cart/cart-utils.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  createCart: function createCart(url, cartItems) {
    return fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cartItems)
    }).then(function (response) {
      return response.json();
    })["catch"](function (err) {
      return console.error(err);
    });
  },
  addCartItem: function addCartItem(url, cartId, cartItems) {
    return fetch(url + cartId + '/items/', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cartItems)
    }).then(function (response) {
      return response.json();
    })["catch"](function (err) {
      return console.error(error);
    });
  },
  getCart: function getCart(url) {
    return fetch(url, {
      method: 'GET',
      credentials: 'same-origin'
    }).then(function (response) {
      return response.json();
    });
  },
  deleteCart: function deleteCart(url, cartId) {
    return fetch(url + cartId, {
      method: 'DELETE',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }
    })["catch"](function (err) {
      return console.error(err);
    });
  },
  deleteCartItem: function deleteCartItem(url, cartId, itemId) {
    return fetch(url + cartId + '/items/' + itemId, {
      method: 'DELETE',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }
    })["catch"](function (err) {
      return console.error(err);
    });
  },
  itemCouldNotBeAddedAlert: function itemCouldNotBeAddedAlert() {},
  itemAddedAlert: function itemAddedAlert() {},
  handleItemAddResponse: function handleItemAddResponse(response) {
    return response.status !== 200 ? this.itemCouldNotBeAddedAlert() : this.itemAddedAlert();
  },
  itemsCouldNotBeRemovedAlert: function itemsCouldNotBeRemovedAlert() {},
  itemsRemovedAlert: function itemsRemovedAlert() {},
  handleItemsRemoveResponse: function handleItemsRemoveResponse(response) {
    return response.status !== 204 ? this.itemsCouldNotBeRemovedAlert() : this.itemsRemovedAlert();
  }
});

/***/ }),

/***/ "./assets/js/theme/category.js":
/*!*************************************!*\
  !*** ./assets/js/theme/category.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Category; });
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _catalog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./catalog */ "./assets/js/theme/catalog.js");
/* harmony import */ var _global_compare_products__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./global/compare-products */ "./assets/js/theme/global/compare-products.js");
/* harmony import */ var _common_faceted_search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/faceted-search */ "./assets/js/theme/common/faceted-search.js");
/* harmony import */ var _theme_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../theme/common/utils/translations-utils */ "./assets/js/theme/common/utils/translations-utils.js");
/* harmony import */ var _cart_cart_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./cart/cart-utils */ "./assets/js/theme/cart/cart-utils.js");
/* harmony import */ var _global_sweet_alert__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./global/sweet-alert */ "./assets/js/theme/global/sweet-alert.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }









var Category = /*#__PURE__*/function (_CatalogPage) {
  _inheritsLoose(Category, _CatalogPage);

  function Category(context) {
    var _this;

    _this = _CatalogPage.call(this, context) || this;
    _this.validationDictionary = Object(_theme_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__["createTranslationDictionary"])(context);
    return _this;
  }

  var _proto = Category.prototype;

  _proto.setLiveRegionAttributes = function setLiveRegionAttributes($element, roleType, ariaLiveStatus) {
    $element.attr({
      role: roleType,
      'aria-live': ariaLiveStatus
    });
  };

  _proto.makeShopByPriceFilterAccessible = function makeShopByPriceFilterAccessible() {
    var _this2 = this;

    if (!$('[data-shop-by-price]').length) return;

    if ($('.navList-action').hasClass('is-active')) {
      $('a.navList-action.is-active').focus();
    }

    $('a.navList-action').on('click', function () {
      return _this2.setLiveRegionAttributes($('span.price-filter-message'), 'status', 'assertive');
    });
  };

  _proto.onReady = function onReady() {
    var _this3 = this;

    this.arrangeFocusOnSortBy();
    this.initAddAllToCartBtn();
    this.initRemoveAllItemsBtn();
    $('[data-button-type="add-cart"]').on('click', function (e) {
      return _this3.setLiveRegionAttributes($(e.currentTarget).next(), 'status', 'polite');
    });
    this.makeShopByPriceFilterAccessible();
    Object(_global_compare_products__WEBPACK_IMPORTED_MODULE_2__["default"])(this.context);

    if ($('#facetedSearch').length > 0) {
      this.initFacetedSearch();
    } else {
      this.onSortBySubmit = this.onSortBySubmit.bind(this);
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["hooks"].on('sortBy-submitted', this.onSortBySubmit);
    }

    this.initProductImageHover();
    $('a.reset-btn').on('click', function () {
      return _this3.setLiveRegionsAttributes($('span.reset-message'), 'status', 'polite');
    });
    this.ariaNotifyNoProducts();
  };

  _proto.initProductImageHover = function initProductImageHover() {
    $('.card-figure').on('mouseenter', function () {
      var $img = $(this).find('.card-image');
      var src = $img.attr('src');
      var hoverSrc = $img.attr('data-hover-src').replace('{:size}', $(this).height() + 'x' + $(this).width());
      $img.attr('srcset', hoverSrc);
      $(this).on('mouseleave', function () {
        $img.attr('srcset', src);
      });
    });
  };

  _proto.initRemoveAllItemsBtn = function initRemoveAllItemsBtn() {
    var _this4 = this;

    _cart_cart_utils__WEBPACK_IMPORTED_MODULE_5__["default"].getCart('/api/storefront/cart/?include=lineItems.digitalItems.options,lineItems.physicalItems.options').then(function (cart) {
      // if there is a cart, show remove all button
      if (cart[0]) {
        $('.remove-all-cart-btn').removeClass('button--hidden');
      }

      $('.remove-all-cart-btn').on('click', function () {
        // fire confirmation of delete modal
        _global_sweet_alert__WEBPACK_IMPORTED_MODULE_6__["default"].fire({
          title: 'Notice',
          icon: 'warning',
          text: 'Remove all items from cart?',
          showCancelButton: true
        }).then(function (result) {
          // if the user confirmed, delete the cart
          if (result.isConfirmed) {
            // get original button label
            var originalLabel = $('.remove-all-cart-btn').val(); // change the button label and disabled state while fetching

            $('.remove-all-cart-btn').val('Removing From Cart...').prop('disabled', true); // delete the cart

            if (cart[0].id) {
              _cart_cart_utils__WEBPACK_IMPORTED_MODULE_5__["default"].deleteCart('/api/storefront/carts/', cart[0].id).then(function (res) {
                $('.remove-all-cart-btn').val(originalLabel).prop('disabled', false);

                _this4.handleItemsRemoveResponse(res);
              });
            }
          }
        });
      });
    });
  };

  _proto.initAddAllToCartBtn = function initAddAllToCartBtn() {
    var _this5 = this;

    var data = {
      lineItems: this.getAllCategoryProductIds()
    };
    var $button = $('.add-all-to-cart-btn');
    $button.on('click', function () {
      // get the original label in case the HTML is changed
      var originalLabel = $button.val(); // change the button label and disable button while fetching

      $button.val('Adding To Cart...').prop('disabled', true); // try to get the current cart

      _cart_cart_utils__WEBPACK_IMPORTED_MODULE_5__["default"].getCart('/api/storefront/cart/?include=lineItems.digitalItems.options,lineItems.physicalItems.options').then(function (existingCart) {
        var _existingCart$;

        // if cart exists, add items, if cart does not exist, create and add items
        if ((_existingCart$ = existingCart[0]) != null && _existingCart$.id) {
          _cart_cart_utils__WEBPACK_IMPORTED_MODULE_5__["default"].addCartItem('/api/storefront/carts/', existingCart[0].id, data).then(function (response) {
            console.log(response, 'existing cart');

            _this5.handleItemAddResponse(response);
          });
        } else {
          _cart_cart_utils__WEBPACK_IMPORTED_MODULE_5__["default"].createCart('/api/storefront/cart', data).then(function (response) {
            console.log(response, 'new cart');

            _this5.handleItemAddResponse(response);
          });
        } // reset the button to original state


        $(_this5).prop('disabled', false).val(originalLabel);
      });
    });
  };

  _proto.itemCouldNotBeAddedAlert = function itemCouldNotBeAddedAlert() {
    _global_sweet_alert__WEBPACK_IMPORTED_MODULE_6__["default"].fire({
      title: 'Error',
      icon: 'error',
      text: 'Failed to remove items from cart, please try again.'
    });
  };

  _proto.itemAddedAlert = function itemAddedAlert() {
    console.log('test');
    _global_sweet_alert__WEBPACK_IMPORTED_MODULE_6__["default"].fire({
      title: 'Notice',
      icon: 'success',
      text: 'All items added to cart'
    }).then(function (result) {
      return location.reload();
    });
  };

  _proto.handleItemAddResponse = function handleItemAddResponse(response) {
    console.log(response);
    return response ? this.itemAddedAlert() : this.itemCouldNotBeAddedAlert();
  };

  _proto.itemsCouldNotBeRemovedAlert = function itemsCouldNotBeRemovedAlert() {
    _global_sweet_alert__WEBPACK_IMPORTED_MODULE_6__["default"].fire({
      title: 'Error',
      icon: 'error',
      text: 'Failed to remove items from cart, please try again.'
    });
  };

  _proto.itemsRemovedAlert = function itemsRemovedAlert() {
    _global_sweet_alert__WEBPACK_IMPORTED_MODULE_6__["default"].fire({
      title: 'Notice',
      icon: 'success',
      text: 'All items removed from cart'
    }).then(function (result) {
      return location.reload();
    });
  };

  _proto.handleItemsRemoveResponse = function handleItemsRemoveResponse(response) {
    return response.status !== 204 ? this.itemsCouldNotBeRemovedAlert() : this.itemsRemovedAlert();
  };

  _proto.getAllCategoryProductIds = function getAllCategoryProductIds() {
    var ids = []; // pull id's for each item on the page

    $('[data-product-id]').each(function (index, ele) {
      ids.push($(ele).attr('data-product-id'));
    });
    return ids.map(function (id) {
      return {
        quantity: 1,
        productId: id
      };
    });
  };

  _proto.ariaNotifyNoProducts = function ariaNotifyNoProducts() {
    var $noProductsMessage = $('[data-no-products-notification]');

    if ($noProductsMessage.length) {
      $noProductsMessage.focus();
    }
  };

  _proto.initFacetedSearch = function initFacetedSearch() {
    var _this$validationDicti = this.validationDictionary,
        onMinPriceError = _this$validationDicti.price_min_evaluation,
        onMaxPriceError = _this$validationDicti.price_max_evaluation,
        minPriceNotEntered = _this$validationDicti.price_min_not_entered,
        maxPriceNotEntered = _this$validationDicti.price_max_not_entered,
        onInvalidPrice = _this$validationDicti.price_invalid_value;
    var $productListingContainer = $('#product-listing-container');
    var $facetedSearchContainer = $('#faceted-search-container');
    var productsPerPage = this.context.categoryProductsPerPage;
    var requestOptions = {
      config: {
        category: {
          shop_by_price: true,
          products: {
            limit: productsPerPage
          }
        }
      },
      template: {
        productListing: 'category/product-listing',
        sidebar: 'category/sidebar'
      },
      showMore: 'category/show-more'
    };
    this.facetedSearch = new _common_faceted_search__WEBPACK_IMPORTED_MODULE_3__["default"](requestOptions, function (content) {
      $productListingContainer.html(content.productListing);
      $facetedSearchContainer.html(content.sidebar);
      $('body').triggerHandler('compareReset');
      $('html, body').animate({
        scrollTop: 0
      }, 100);
    }, {
      validationErrorMessages: {
        onMinPriceError: onMinPriceError,
        onMaxPriceError: onMaxPriceError,
        minPriceNotEntered: minPriceNotEntered,
        maxPriceNotEntered: maxPriceNotEntered,
        onInvalidPrice: onInvalidPrice
      }
    });
  };

  return Category;
}(_catalog__WEBPACK_IMPORTED_MODULE_1__["default"]);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/utils/translations-utils.js":
/*!************************************************************!*\
  !*** ./assets/js/theme/common/utils/translations-utils.js ***!
  \************************************************************/
/*! exports provided: createTranslationDictionary */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTranslationDictionary", function() { return createTranslationDictionary; });
var TRANSLATIONS = 'translations';

var isTranslationDictionaryNotEmpty = function isTranslationDictionaryNotEmpty(dictionary) {
  return !!Object.keys(dictionary[TRANSLATIONS]).length;
};

var chooseActiveDictionary = function chooseActiveDictionary() {
  for (var i = 0; i < arguments.length; i++) {
    var dictionary = JSON.parse(i < 0 || arguments.length <= i ? undefined : arguments[i]);

    if (isTranslationDictionaryNotEmpty(dictionary)) {
      return dictionary;
    }
  }
};
/**
 * defines Translation Dictionary to use
 * @param context provides access to 3 validation JSONs from en.json:
 * validation_messages, validation_fallback_messages and default_messages
 * @returns {Object}
 */


var createTranslationDictionary = function createTranslationDictionary(context) {
  var validationDictionaryJSON = context.validationDictionaryJSON,
      validationFallbackDictionaryJSON = context.validationFallbackDictionaryJSON,
      validationDefaultDictionaryJSON = context.validationDefaultDictionaryJSON;
  var activeDictionary = chooseActiveDictionary(validationDictionaryJSON, validationFallbackDictionaryJSON, validationDefaultDictionaryJSON);
  var localizations = Object.values(activeDictionary[TRANSLATIONS]);
  var translationKeys = Object.keys(activeDictionary[TRANSLATIONS]).map(function (key) {
    return key.split('.').pop();
  });
  return translationKeys.reduce(function (acc, key, i) {
    acc[key] = localizations[i];
    return acc;
  }, {});
};

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2FydC9jYXJ0LXV0aWxzLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9jYXRlZ29yeS5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL3V0aWxzL3RyYW5zbGF0aW9ucy11dGlscy5qcyJdLCJuYW1lcyI6WyJjcmVhdGVDYXJ0IiwidXJsIiwiY2FydEl0ZW1zIiwiZmV0Y2giLCJtZXRob2QiLCJjcmVkZW50aWFscyIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJhZGRDYXJ0SXRlbSIsImNhcnRJZCIsImdldENhcnQiLCJkZWxldGVDYXJ0IiwiZGVsZXRlQ2FydEl0ZW0iLCJpdGVtSWQiLCJpdGVtQ291bGROb3RCZUFkZGVkQWxlcnQiLCJpdGVtQWRkZWRBbGVydCIsImhhbmRsZUl0ZW1BZGRSZXNwb25zZSIsInN0YXR1cyIsIml0ZW1zQ291bGROb3RCZVJlbW92ZWRBbGVydCIsIml0ZW1zUmVtb3ZlZEFsZXJ0IiwiaGFuZGxlSXRlbXNSZW1vdmVSZXNwb25zZSIsIkNhdGVnb3J5IiwiY29udGV4dCIsInZhbGlkYXRpb25EaWN0aW9uYXJ5IiwiY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5Iiwic2V0TGl2ZVJlZ2lvbkF0dHJpYnV0ZXMiLCIkZWxlbWVudCIsInJvbGVUeXBlIiwiYXJpYUxpdmVTdGF0dXMiLCJhdHRyIiwicm9sZSIsIm1ha2VTaG9wQnlQcmljZUZpbHRlckFjY2Vzc2libGUiLCIkIiwibGVuZ3RoIiwiaGFzQ2xhc3MiLCJmb2N1cyIsIm9uIiwib25SZWFkeSIsImFycmFuZ2VGb2N1c09uU29ydEJ5IiwiaW5pdEFkZEFsbFRvQ2FydEJ0biIsImluaXRSZW1vdmVBbGxJdGVtc0J0biIsImUiLCJjdXJyZW50VGFyZ2V0IiwibmV4dCIsImNvbXBhcmVQcm9kdWN0cyIsImluaXRGYWNldGVkU2VhcmNoIiwib25Tb3J0QnlTdWJtaXQiLCJiaW5kIiwiaG9va3MiLCJpbml0UHJvZHVjdEltYWdlSG92ZXIiLCJzZXRMaXZlUmVnaW9uc0F0dHJpYnV0ZXMiLCJhcmlhTm90aWZ5Tm9Qcm9kdWN0cyIsIiRpbWciLCJmaW5kIiwic3JjIiwiaG92ZXJTcmMiLCJyZXBsYWNlIiwiaGVpZ2h0Iiwid2lkdGgiLCJjYXJ0VXRpbHMiLCJjYXJ0IiwicmVtb3ZlQ2xhc3MiLCJzd2FsIiwiZmlyZSIsInRpdGxlIiwiaWNvbiIsInRleHQiLCJzaG93Q2FuY2VsQnV0dG9uIiwicmVzdWx0IiwiaXNDb25maXJtZWQiLCJvcmlnaW5hbExhYmVsIiwidmFsIiwicHJvcCIsImlkIiwicmVzIiwiZGF0YSIsImxpbmVJdGVtcyIsImdldEFsbENhdGVnb3J5UHJvZHVjdElkcyIsIiRidXR0b24iLCJleGlzdGluZ0NhcnQiLCJsb2ciLCJsb2NhdGlvbiIsInJlbG9hZCIsImlkcyIsImVhY2giLCJpbmRleCIsImVsZSIsInB1c2giLCJtYXAiLCJxdWFudGl0eSIsInByb2R1Y3RJZCIsIiRub1Byb2R1Y3RzTWVzc2FnZSIsIm9uTWluUHJpY2VFcnJvciIsInByaWNlX21pbl9ldmFsdWF0aW9uIiwib25NYXhQcmljZUVycm9yIiwicHJpY2VfbWF4X2V2YWx1YXRpb24iLCJtaW5QcmljZU5vdEVudGVyZWQiLCJwcmljZV9taW5fbm90X2VudGVyZWQiLCJtYXhQcmljZU5vdEVudGVyZWQiLCJwcmljZV9tYXhfbm90X2VudGVyZWQiLCJvbkludmFsaWRQcmljZSIsInByaWNlX2ludmFsaWRfdmFsdWUiLCIkcHJvZHVjdExpc3RpbmdDb250YWluZXIiLCIkZmFjZXRlZFNlYXJjaENvbnRhaW5lciIsInByb2R1Y3RzUGVyUGFnZSIsImNhdGVnb3J5UHJvZHVjdHNQZXJQYWdlIiwicmVxdWVzdE9wdGlvbnMiLCJjb25maWciLCJjYXRlZ29yeSIsInNob3BfYnlfcHJpY2UiLCJwcm9kdWN0cyIsImxpbWl0IiwidGVtcGxhdGUiLCJwcm9kdWN0TGlzdGluZyIsInNpZGViYXIiLCJzaG93TW9yZSIsImZhY2V0ZWRTZWFyY2giLCJGYWNldGVkU2VhcmNoIiwiY29udGVudCIsImh0bWwiLCJ0cmlnZ2VySGFuZGxlciIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJ2YWxpZGF0aW9uRXJyb3JNZXNzYWdlcyIsIkNhdGFsb2dQYWdlIiwiVFJBTlNMQVRJT05TIiwiaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eSIsImRpY3Rpb25hcnkiLCJPYmplY3QiLCJrZXlzIiwiY2hvb3NlQWN0aXZlRGljdGlvbmFyeSIsImkiLCJwYXJzZSIsInZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiIsInZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OIiwidmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTiIsImFjdGl2ZURpY3Rpb25hcnkiLCJsb2NhbGl6YXRpb25zIiwidmFsdWVzIiwidHJhbnNsYXRpb25LZXlzIiwia2V5Iiwic3BsaXQiLCJwb3AiLCJyZWR1Y2UiLCJhY2MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFlO0FBQ2RBLFlBQVUsRUFBRSxvQkFBQ0MsR0FBRCxFQUFNQyxTQUFOLEVBQW9CO0FBQy9CLFdBQU9DLEtBQUssQ0FBQ0YsR0FBRCxFQUFNO0FBQ2pCRyxZQUFNLEVBQUUsTUFEUztBQUVqQkMsaUJBQVcsRUFBRSxhQUZJO0FBR2pCQyxhQUFPLEVBQUU7QUFDUix3QkFBZ0I7QUFEUixPQUhRO0FBTWpCQyxVQUFJLEVBQUVDLElBQUksQ0FBQ0MsU0FBTCxDQUFlUCxTQUFmO0FBTlcsS0FBTixDQUFMLENBUUxRLElBUkssQ0FRQSxVQUFDQyxRQUFEO0FBQUEsYUFBY0EsUUFBUSxDQUFDQyxJQUFULEVBQWQ7QUFBQSxLQVJBLFdBU0MsVUFBQ0MsR0FBRDtBQUFBLGFBQVNDLE9BQU8sQ0FBQ0MsS0FBUixDQUFjRixHQUFkLENBQVQ7QUFBQSxLQVRELENBQVA7QUFVQSxH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VSxNQUFQLENBQWNGLGdCQUFnQixDQUFDWCxZQUFELENBQTlCLENBQXRCO0FBQ0EsTUFBTWMsZUFBZSxHQUFHWCxNQUFNLENBQUNDLElBQVAsQ0FBWU8sZ0JBQWdCLENBQUNYLFlBQUQsQ0FBNUIsRUFBNENyQyxHQUE1QyxDQUFnRCxVQUFBb0QsR0FBRztBQUFBLFdBQUlBLEdBQUcsQ0FBQ0MsS0FBSixDQUFVLEdBQVYsRUFBZUMsR0FBZixFQUFKO0FBQUEsR0FBbkQsQ0FBeEI7QUFFQSxTQUFPSCxlQUFlLENBQUNJLE1BQWhCLENBQXVCLFVBQUNDLEdBQUQsRUFBTUosR0FBTixFQUFXVCxDQUFYLEVBQWlCO0FBQzNDYSxPQUFHLENBQUNKLEdBQUQsQ0FBSCxHQUFXSCxhQUFhLENBQUNOLENBQUQsQ0FBeEI7QUFDQSxXQUFPYSxHQUFQO0FBQ0gsR0FITSxFQUdKLEVBSEksQ0FBUDtBQUlILENBVk0sQyIsImZpbGUiOiJ0aGVtZS1idW5kbGUuY2h1bmsuMTAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XG5cdGNyZWF0ZUNhcnQ6ICh1cmwsIGNhcnRJdGVtcykgPT4ge1xuXHRcdHJldHVybiBmZXRjaCh1cmwsIHtcblx0XHRcdG1ldGhvZDogJ1BPU1QnLFxuXHRcdFx0Y3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicsXG5cdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdCdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG5cdFx0XHR9LFxuXHRcdFx0Ym9keTogSlNPTi5zdHJpbmdpZnkoY2FydEl0ZW1zKSxcblx0XHR9KVxuXHRcdFx0LnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG5cdFx0XHQuY2F0Y2goKGVycikgPT4gY29uc29sZS5lcnJvcihlcnIpKVxuXHR9LFxuXG5cdGFkZENhcnRJdGVtOiAodXJsLCBjYXJ0SWQsIGNhcnRJdGVtcykgPT4ge1xuXHRcdHJldHVybiBmZXRjaCh1cmwgKyBjYXJ0SWQgKyAnL2l0ZW1zLycsIHtcblx0XHRcdG1ldGhvZDogJ1BPU1QnLFxuXHRcdFx0Y3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicsXG5cdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdCdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG5cdFx0XHR9LFxuXHRcdFx0Ym9keTogSlNPTi5zdHJpbmdpZnkoY2FydEl0ZW1zKSxcblx0XHR9KVxuXHRcdFx0LnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG5cdFx0XHQuY2F0Y2goKGVycikgPT4gY29uc29sZS5lcnJvcihlcnJvcikpXG5cdH0sXG5cblx0Z2V0Q2FydDogKHVybCkgPT4ge1xuXHRcdHJldHVybiBmZXRjaCh1cmwsIHtcblx0XHRcdG1ldGhvZDogJ0dFVCcsXG5cdFx0XHRjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcblx0XHR9KS50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuXHR9LFxuXG5cdGRlbGV0ZUNhcnQ6ICh1cmwsIGNhcnRJZCkgPT4ge1xuXHRcdHJldHVybiBmZXRjaCh1cmwgKyBjYXJ0SWQsIHtcblx0XHRcdG1ldGhvZDogJ0RFTEVURScsXG5cdFx0XHRjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcblx0XHRcdGhlYWRlcnM6IHtcblx0XHRcdFx0J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcblx0XHRcdH0sXG5cdFx0fSkuY2F0Y2goKGVycikgPT4gY29uc29sZS5lcnJvcihlcnIpKVxuXHR9LFxuXG5cdGRlbGV0ZUNhcnRJdGVtOiAodXJsLCBjYXJ0SWQsIGl0ZW1JZCkgPT4ge1xuXHRcdHJldHVybiBmZXRjaCh1cmwgKyBjYXJ0SWQgKyAnL2l0ZW1zLycgKyBpdGVtSWQsIHtcblx0XHRcdG1ldGhvZDogJ0RFTEVURScsXG5cdFx0XHRjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcblx0XHRcdGhlYWRlcnM6IHtcblx0XHRcdFx0J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcblx0XHRcdH0sXG5cdFx0fSlcblx0XHRcdC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmVycm9yKGVycikpXG5cdH0sXG5cblx0aXRlbUNvdWxkTm90QmVBZGRlZEFsZXJ0OiAoKSA9PiB7fSxcblxuXHRpdGVtQWRkZWRBbGVydDogKCkgPT4ge30sXG5cblx0aGFuZGxlSXRlbUFkZFJlc3BvbnNlKHJlc3BvbnNlKSB7XG5cdFx0cmV0dXJuIHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwXG5cdFx0XHQ/IHRoaXMuaXRlbUNvdWxkTm90QmVBZGRlZEFsZXJ0KClcblx0XHRcdDogdGhpcy5pdGVtQWRkZWRBbGVydCgpXG5cdH0sXG5cblx0aXRlbXNDb3VsZE5vdEJlUmVtb3ZlZEFsZXJ0KCkge30sXG5cblx0aXRlbXNSZW1vdmVkQWxlcnQoKSB7fSxcblxuXHRoYW5kbGVJdGVtc1JlbW92ZVJlc3BvbnNlKHJlc3BvbnNlKSB7XG5cdFx0cmV0dXJuIHJlc3BvbnNlLnN0YXR1cyAhPT0gMjA0XG5cdFx0XHQ/IHRoaXMuaXRlbXNDb3VsZE5vdEJlUmVtb3ZlZEFsZXJ0KClcblx0XHRcdDogdGhpcy5pdGVtc1JlbW92ZWRBbGVydCgpXG5cdH0sXG59XG4iLCJpbXBvcnQgeyBob29rcyB9IGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJ1xuaW1wb3J0IENhdGFsb2dQYWdlIGZyb20gJy4vY2F0YWxvZydcbmltcG9ydCBjb21wYXJlUHJvZHVjdHMgZnJvbSAnLi9nbG9iYWwvY29tcGFyZS1wcm9kdWN0cydcbmltcG9ydCBGYWNldGVkU2VhcmNoIGZyb20gJy4vY29tbW9uL2ZhY2V0ZWQtc2VhcmNoJ1xuaW1wb3J0IHsgY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5IH0gZnJvbSAnLi4vdGhlbWUvY29tbW9uL3V0aWxzL3RyYW5zbGF0aW9ucy11dGlscydcbmltcG9ydCBjYXJ0VXRpbHMgZnJvbSAnLi9jYXJ0L2NhcnQtdXRpbHMnXG5pbXBvcnQgc3dhbCBmcm9tICcuL2dsb2JhbC9zd2VldC1hbGVydCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2F0ZWdvcnkgZXh0ZW5kcyBDYXRhbG9nUGFnZSB7XG5cdGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcblx0XHRzdXBlcihjb250ZXh0KVxuXHRcdHRoaXMudmFsaWRhdGlvbkRpY3Rpb25hcnkgPSBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkoY29udGV4dClcblx0fVxuXG5cdHNldExpdmVSZWdpb25BdHRyaWJ1dGVzKCRlbGVtZW50LCByb2xlVHlwZSwgYXJpYUxpdmVTdGF0dXMpIHtcblx0XHQkZWxlbWVudC5hdHRyKHtcblx0XHRcdHJvbGU6IHJvbGVUeXBlLFxuXHRcdFx0J2FyaWEtbGl2ZSc6IGFyaWFMaXZlU3RhdHVzLFxuXHRcdH0pXG5cdH1cblxuXHRtYWtlU2hvcEJ5UHJpY2VGaWx0ZXJBY2Nlc3NpYmxlKCkge1xuXHRcdGlmICghJCgnW2RhdGEtc2hvcC1ieS1wcmljZV0nKS5sZW5ndGgpIHJldHVyblxuXG5cdFx0aWYgKCQoJy5uYXZMaXN0LWFjdGlvbicpLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSkge1xuXHRcdFx0JCgnYS5uYXZMaXN0LWFjdGlvbi5pcy1hY3RpdmUnKS5mb2N1cygpXG5cdFx0fVxuXG5cdFx0JCgnYS5uYXZMaXN0LWFjdGlvbicpLm9uKCdjbGljaycsICgpID0+XG5cdFx0XHR0aGlzLnNldExpdmVSZWdpb25BdHRyaWJ1dGVzKFxuXHRcdFx0XHQkKCdzcGFuLnByaWNlLWZpbHRlci1tZXNzYWdlJyksXG5cdFx0XHRcdCdzdGF0dXMnLFxuXHRcdFx0XHQnYXNzZXJ0aXZlJ1xuXHRcdFx0KVxuXHRcdClcblx0fVxuXG5cdG9uUmVhZHkoKSB7XG5cdFx0dGhpcy5hcnJhbmdlRm9jdXNPblNvcnRCeSgpXG5cdFx0dGhpcy5pbml0QWRkQWxsVG9DYXJ0QnRuKClcblx0XHR0aGlzLmluaXRSZW1vdmVBbGxJdGVtc0J0bigpXG5cdFx0JCgnW2RhdGEtYnV0dG9uLXR5cGU9XCJhZGQtY2FydFwiXScpLm9uKCdjbGljaycsIChlKSA9PlxuXHRcdFx0dGhpcy5zZXRMaXZlUmVnaW9uQXR0cmlidXRlcyhcblx0XHRcdFx0JChlLmN1cnJlbnRUYXJnZXQpLm5leHQoKSxcblx0XHRcdFx0J3N0YXR1cycsXG5cdFx0XHRcdCdwb2xpdGUnXG5cdFx0XHQpXG5cdFx0KVxuXG5cdFx0dGhpcy5tYWtlU2hvcEJ5UHJpY2VGaWx0ZXJBY2Nlc3NpYmxlKClcblxuXHRcdGNvbXBhcmVQcm9kdWN0cyh0aGlzLmNvbnRleHQpXG5cblx0XHRpZiAoJCgnI2ZhY2V0ZWRTZWFyY2gnKS5sZW5ndGggPiAwKSB7XG5cdFx0XHR0aGlzLmluaXRGYWNldGVkU2VhcmNoKClcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5vblNvcnRCeVN1Ym1pdCA9IHRoaXMub25Tb3J0QnlTdWJtaXQuYmluZCh0aGlzKVxuXHRcdFx0aG9va3Mub24oJ3NvcnRCeS1zdWJtaXR0ZWQnLCB0aGlzLm9uU29ydEJ5U3VibWl0KVxuXHRcdH1cblx0XHR0aGlzLmluaXRQcm9kdWN0SW1hZ2VIb3ZlcigpXG5cblx0XHQkKCdhLnJlc2V0LWJ0bicpLm9uKCdjbGljaycsICgpID0+XG5cdFx0XHR0aGlzLnNldExpdmVSZWdpb25zQXR0cmlidXRlcygkKCdzcGFuLnJlc2V0LW1lc3NhZ2UnKSwgJ3N0YXR1cycsICdwb2xpdGUnKVxuXHRcdClcblx0XHR0aGlzLmFyaWFOb3RpZnlOb1Byb2R1Y3RzKClcblx0fVxuXG5cdGluaXRQcm9kdWN0SW1hZ2VIb3ZlcigpIHtcblx0XHQkKCcuY2FyZC1maWd1cmUnKS5vbignbW91c2VlbnRlcicsIGZ1bmN0aW9uICgpIHtcblx0XHRcdGNvbnN0ICRpbWcgPSAkKHRoaXMpLmZpbmQoJy5jYXJkLWltYWdlJylcblx0XHRcdGNvbnN0IHNyYyA9ICRpbWcuYXR0cignc3JjJylcblx0XHRcdGNvbnN0IGhvdmVyU3JjID0gJGltZ1xuXHRcdFx0XHQuYXR0cignZGF0YS1ob3Zlci1zcmMnKVxuXHRcdFx0XHQucmVwbGFjZSgnezpzaXplfScsICQodGhpcykuaGVpZ2h0KCkgKyAneCcgKyAkKHRoaXMpLndpZHRoKCkpXG5cdFx0XHQkaW1nLmF0dHIoJ3NyY3NldCcsIGhvdmVyU3JjKVxuXG5cdFx0XHQkKHRoaXMpLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHQkaW1nLmF0dHIoJ3NyY3NldCcsIHNyYylcblx0XHRcdH0pXG5cdFx0fSlcblx0fVxuXG5cdGluaXRSZW1vdmVBbGxJdGVtc0J0bigpIHtcblx0XHRjYXJ0VXRpbHNcblx0XHRcdC5nZXRDYXJ0KFxuXHRcdFx0XHQnL2FwaS9zdG9yZWZyb250L2NhcnQvP2luY2x1ZGU9bGluZUl0ZW1zLmRpZ2l0YWxJdGVtcy5vcHRpb25zLGxpbmVJdGVtcy5waHlzaWNhbEl0ZW1zLm9wdGlvbnMnXG5cdFx0XHQpXG5cdFx0XHQudGhlbigoY2FydCkgPT4ge1xuXHRcdFx0XHQvLyBpZiB0aGVyZSBpcyBhIGNhcnQsIHNob3cgcmVtb3ZlIGFsbCBidXR0b25cblx0XHRcdFx0aWYgKGNhcnRbMF0pIHtcblx0XHRcdFx0XHQkKCcucmVtb3ZlLWFsbC1jYXJ0LWJ0bicpLnJlbW92ZUNsYXNzKCdidXR0b24tLWhpZGRlbicpXG5cdFx0XHRcdH1cblxuXHRcdFx0XHQkKCcucmVtb3ZlLWFsbC1jYXJ0LWJ0bicpLm9uKCdjbGljaycsICgpID0+IHtcblx0XHRcdFx0XHQvLyBmaXJlIGNvbmZpcm1hdGlvbiBvZiBkZWxldGUgbW9kYWxcblx0XHRcdFx0XHRzd2FsXG5cdFx0XHRcdFx0XHQuZmlyZSh7XG5cdFx0XHRcdFx0XHRcdHRpdGxlOiAnTm90aWNlJyxcblx0XHRcdFx0XHRcdFx0aWNvbjogJ3dhcm5pbmcnLFxuXHRcdFx0XHRcdFx0XHR0ZXh0OiAnUmVtb3ZlIGFsbCBpdGVtcyBmcm9tIGNhcnQ/Jyxcblx0XHRcdFx0XHRcdFx0c2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHQudGhlbigocmVzdWx0KSA9PiB7XG5cdFx0XHRcdFx0XHRcdC8vIGlmIHRoZSB1c2VyIGNvbmZpcm1lZCwgZGVsZXRlIHRoZSBjYXJ0XG5cdFx0XHRcdFx0XHRcdGlmIChyZXN1bHQuaXNDb25maXJtZWQpIHtcblx0XHRcdFx0XHRcdFx0XHQvLyBnZXQgb3JpZ2luYWwgYnV0dG9uIGxhYmVsXG5cdFx0XHRcdFx0XHRcdFx0Y29uc3Qgb3JpZ2luYWxMYWJlbCA9ICQoJy5yZW1vdmUtYWxsLWNhcnQtYnRuJykudmFsKClcblx0XHRcdFx0XHRcdFx0XHQvLyBjaGFuZ2UgdGhlIGJ1dHRvbiBsYWJlbCBhbmQgZGlzYWJsZWQgc3RhdGUgd2hpbGUgZmV0Y2hpbmdcblx0XHRcdFx0XHRcdFx0XHQkKCcucmVtb3ZlLWFsbC1jYXJ0LWJ0bicpXG5cdFx0XHRcdFx0XHRcdFx0XHQudmFsKCdSZW1vdmluZyBGcm9tIENhcnQuLi4nKVxuXHRcdFx0XHRcdFx0XHRcdFx0LnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSlcblx0XHRcdFx0XHRcdFx0XHQvLyBkZWxldGUgdGhlIGNhcnRcblx0XHRcdFx0XHRcdFx0XHRpZiAoY2FydFswXS5pZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0Y2FydFV0aWxzXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC5kZWxldGVDYXJ0KCcvYXBpL3N0b3JlZnJvbnQvY2FydHMvJywgY2FydFswXS5pZClcblx0XHRcdFx0XHRcdFx0XHRcdFx0LnRoZW4oKHJlcykgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCQoJy5yZW1vdmUtYWxsLWNhcnQtYnRuJykudmFsKG9yaWdpbmFsTGFiZWwpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5oYW5kbGVJdGVtc1JlbW92ZVJlc3BvbnNlKHJlcylcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdH0pXG5cdFx0XHR9KVxuXHR9XG5cblxuXHRpbml0QWRkQWxsVG9DYXJ0QnRuKCkge1xuXHRcdGNvbnN0IGRhdGEgPSB7IGxpbmVJdGVtczogdGhpcy5nZXRBbGxDYXRlZ29yeVByb2R1Y3RJZHMoKSB9XG5cdFx0Y29uc3QgJGJ1dHRvbiA9ICQoJy5hZGQtYWxsLXRvLWNhcnQtYnRuJylcblx0XHQkYnV0dG9uLm9uKCdjbGljaycsICgpID0+IHtcblx0XHRcdC8vIGdldCB0aGUgb3JpZ2luYWwgbGFiZWwgaW4gY2FzZSB0aGUgSFRNTCBpcyBjaGFuZ2VkXG5cdFx0XHRjb25zdCBvcmlnaW5hbExhYmVsID0gJGJ1dHRvbi52YWwoKVxuXHRcdFx0Ly8gY2hhbmdlIHRoZSBidXR0b24gbGFiZWwgYW5kIGRpc2FibGUgYnV0dG9uIHdoaWxlIGZldGNoaW5nXG5cdFx0XHQkYnV0dG9uLnZhbCgnQWRkaW5nIFRvIENhcnQuLi4nKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpXG5cdFx0XHQvLyB0cnkgdG8gZ2V0IHRoZSBjdXJyZW50IGNhcnRcblx0XHRcdGNhcnRVdGlsc1xuXHRcdFx0XHQuZ2V0Q2FydChcblx0XHRcdFx0XHQnL2FwaS9zdG9yZWZyb250L2NhcnQvP2luY2x1ZGU9bGluZUl0ZW1zLmRpZ2l0YWxJdGVtcy5vcHRpb25zLGxpbmVJdGVtcy5waHlzaWNhbEl0ZW1zLm9wdGlvbnMnXG5cdFx0XHRcdClcblx0XHRcdFx0LnRoZW4oKGV4aXN0aW5nQ2FydCkgPT4ge1xuXHRcdFx0XHRcdC8vIGlmIGNhcnQgZXhpc3RzLCBhZGQgaXRlbXMsIGlmIGNhcnQgZG9lcyBub3QgZXhpc3QsIGNyZWF0ZSBhbmQgYWRkIGl0ZW1zXG5cdFx0XHRcdFx0aWYgKGV4aXN0aW5nQ2FydFswXT8uaWQpIHtcblx0XHRcdFx0XHRcdGNhcnRVdGlsc1xuXHRcdFx0XHRcdFx0XHQuYWRkQ2FydEl0ZW0oJy9hcGkvc3RvcmVmcm9udC9jYXJ0cy8nLCBleGlzdGluZ0NhcnRbMF0uaWQsIGRhdGEpXG5cdFx0XHRcdFx0XHRcdC50aGVuKChyZXNwb25zZSkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKHJlc3BvbnNlLCAnZXhpc3RpbmcgY2FydCcpXG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5oYW5kbGVJdGVtQWRkUmVzcG9uc2UocmVzcG9uc2UpXG5cdFx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGNhcnRVdGlsc1xuXHRcdFx0XHRcdFx0XHQuY3JlYXRlQ2FydCgnL2FwaS9zdG9yZWZyb250L2NhcnQnLCBkYXRhKVxuXHRcdFx0XHRcdFx0XHQudGhlbigocmVzcG9uc2UpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhyZXNwb25zZSwgJ25ldyBjYXJ0Jylcblx0XHRcdFx0XHRcdFx0XHR0aGlzLmhhbmRsZUl0ZW1BZGRSZXNwb25zZShyZXNwb25zZSlcblx0XHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Ly8gcmVzZXQgdGhlIGJ1dHRvbiB0byBvcmlnaW5hbCBzdGF0ZVxuXHRcdFx0XHRcdCQodGhpcykucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSkudmFsKG9yaWdpbmFsTGFiZWwpXG5cdFx0XHRcdH0pXG5cdFx0fSlcblx0fVxuXG5cdGl0ZW1Db3VsZE5vdEJlQWRkZWRBbGVydCgpIHtcblx0XHRzd2FsLmZpcmUoe1xuXHRcdFx0dGl0bGU6ICdFcnJvcicsXG5cdFx0XHRpY29uOiAnZXJyb3InLFxuXHRcdFx0dGV4dDogJ0ZhaWxlZCB0byByZW1vdmUgaXRlbXMgZnJvbSBjYXJ0LCBwbGVhc2UgdHJ5IGFnYWluLidcblx0XHR9KVxuXHR9XG5cblx0aXRlbUFkZGVkQWxlcnQoKSB7XG5cdFx0Y29uc29sZS5sb2coJ3Rlc3QnKVxuXHRcdHN3YWxcblx0XHQuZmlyZSh7XG5cdFx0XHR0aXRsZTogJ05vdGljZScsXG5cdFx0XHRpY29uOiAnc3VjY2VzcycsXG5cdFx0XHR0ZXh0OiAnQWxsIGl0ZW1zIGFkZGVkIHRvIGNhcnQnLFxuXHRcdH0pXG5cdFx0LnRoZW4oKHJlc3VsdCkgPT4gbG9jYXRpb24ucmVsb2FkKCkpXG5cdH1cblxuXHRoYW5kbGVJdGVtQWRkUmVzcG9uc2UocmVzcG9uc2UpIHtcblx0XHRjb25zb2xlLmxvZyhyZXNwb25zZSlcblx0XHRyZXR1cm4gcmVzcG9uc2Vcblx0XHRcdD8gdGhpcy5pdGVtQWRkZWRBbGVydCgpXG5cdFx0XHQ6IHRoaXMuaXRlbUNvdWxkTm90QmVBZGRlZEFsZXJ0KClcblx0fVxuXG5cdGl0ZW1zQ291bGROb3RCZVJlbW92ZWRBbGVydCgpIHtcblx0XHRzd2FsLmZpcmUoe1xuXHRcdFx0dGl0bGU6ICdFcnJvcicsXG5cdFx0XHRpY29uOiAnZXJyb3InLFxuXHRcdFx0dGV4dDogJ0ZhaWxlZCB0byByZW1vdmUgaXRlbXMgZnJvbSBjYXJ0LCBwbGVhc2UgdHJ5IGFnYWluLidcblx0XHR9KVxuXHR9XG5cblx0aXRlbXNSZW1vdmVkQWxlcnQoKSB7XG5cdFx0c3dhbFxuXHRcdFx0LmZpcmUoe1xuXHRcdFx0XHR0aXRsZTogJ05vdGljZScsXG5cdFx0XHRcdGljb246ICdzdWNjZXNzJyxcblx0XHRcdFx0dGV4dDogJ0FsbCBpdGVtcyByZW1vdmVkIGZyb20gY2FydCcsXG5cdFx0XHR9KVxuXHRcdFx0LnRoZW4oKHJlc3VsdCkgPT4gbG9jYXRpb24ucmVsb2FkKCkpXG5cdH1cblxuXHRoYW5kbGVJdGVtc1JlbW92ZVJlc3BvbnNlKHJlc3BvbnNlKSB7XG5cdFx0cmV0dXJuIHJlc3BvbnNlLnN0YXR1cyAhPT0gMjA0XG5cdFx0XHQ/IHRoaXMuaXRlbXNDb3VsZE5vdEJlUmVtb3ZlZEFsZXJ0KClcblx0XHRcdDogdGhpcy5pdGVtc1JlbW92ZWRBbGVydCgpXG5cdH1cblxuXG5cdGdldEFsbENhdGVnb3J5UHJvZHVjdElkcygpIHtcblx0XHRjb25zdCBpZHMgPSBbXVxuXHRcdC8vIHB1bGwgaWQncyBmb3IgZWFjaCBpdGVtIG9uIHRoZSBwYWdlXG5cdFx0JCgnW2RhdGEtcHJvZHVjdC1pZF0nKS5lYWNoKChpbmRleCwgZWxlKSA9PiB7XG5cdFx0XHRpZHMucHVzaCgkKGVsZSkuYXR0cignZGF0YS1wcm9kdWN0LWlkJykpXG5cdFx0fSlcblxuXHRcdHJldHVybiBpZHMubWFwKChpZCkgPT4gKHtcblx0XHRcdHF1YW50aXR5OiAxLFxuXHRcdFx0cHJvZHVjdElkOiBpZCxcblx0XHR9KSlcblx0fVxuXG5cdGFyaWFOb3RpZnlOb1Byb2R1Y3RzKCkge1xuXHRcdGNvbnN0ICRub1Byb2R1Y3RzTWVzc2FnZSA9ICQoJ1tkYXRhLW5vLXByb2R1Y3RzLW5vdGlmaWNhdGlvbl0nKVxuXHRcdGlmICgkbm9Qcm9kdWN0c01lc3NhZ2UubGVuZ3RoKSB7XG5cdFx0XHQkbm9Qcm9kdWN0c01lc3NhZ2UuZm9jdXMoKVxuXHRcdH1cblx0fVxuXG5cdGluaXRGYWNldGVkU2VhcmNoKCkge1xuXHRcdGNvbnN0IHtcblx0XHRcdHByaWNlX21pbl9ldmFsdWF0aW9uOiBvbk1pblByaWNlRXJyb3IsXG5cdFx0XHRwcmljZV9tYXhfZXZhbHVhdGlvbjogb25NYXhQcmljZUVycm9yLFxuXHRcdFx0cHJpY2VfbWluX25vdF9lbnRlcmVkOiBtaW5QcmljZU5vdEVudGVyZWQsXG5cdFx0XHRwcmljZV9tYXhfbm90X2VudGVyZWQ6IG1heFByaWNlTm90RW50ZXJlZCxcblx0XHRcdHByaWNlX2ludmFsaWRfdmFsdWU6IG9uSW52YWxpZFByaWNlLFxuXHRcdH0gPSB0aGlzLnZhbGlkYXRpb25EaWN0aW9uYXJ5XG5cdFx0Y29uc3QgJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyID0gJCgnI3Byb2R1Y3QtbGlzdGluZy1jb250YWluZXInKVxuXHRcdGNvbnN0ICRmYWNldGVkU2VhcmNoQ29udGFpbmVyID0gJCgnI2ZhY2V0ZWQtc2VhcmNoLWNvbnRhaW5lcicpXG5cdFx0Y29uc3QgcHJvZHVjdHNQZXJQYWdlID0gdGhpcy5jb250ZXh0LmNhdGVnb3J5UHJvZHVjdHNQZXJQYWdlXG5cdFx0Y29uc3QgcmVxdWVzdE9wdGlvbnMgPSB7XG5cdFx0XHRjb25maWc6IHtcblx0XHRcdFx0Y2F0ZWdvcnk6IHtcblx0XHRcdFx0XHRzaG9wX2J5X3ByaWNlOiB0cnVlLFxuXHRcdFx0XHRcdHByb2R1Y3RzOiB7XG5cdFx0XHRcdFx0XHRsaW1pdDogcHJvZHVjdHNQZXJQYWdlLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdH0sXG5cdFx0XHR9LFxuXHRcdFx0dGVtcGxhdGU6IHtcblx0XHRcdFx0cHJvZHVjdExpc3Rpbmc6ICdjYXRlZ29yeS9wcm9kdWN0LWxpc3RpbmcnLFxuXHRcdFx0XHRzaWRlYmFyOiAnY2F0ZWdvcnkvc2lkZWJhcicsXG5cdFx0XHR9LFxuXHRcdFx0c2hvd01vcmU6ICdjYXRlZ29yeS9zaG93LW1vcmUnLFxuXHRcdH1cblxuXHRcdHRoaXMuZmFjZXRlZFNlYXJjaCA9IG5ldyBGYWNldGVkU2VhcmNoKFxuXHRcdFx0cmVxdWVzdE9wdGlvbnMsXG5cdFx0XHQoY29udGVudCkgPT4ge1xuXHRcdFx0XHQkcHJvZHVjdExpc3RpbmdDb250YWluZXIuaHRtbChjb250ZW50LnByb2R1Y3RMaXN0aW5nKVxuXHRcdFx0XHQkZmFjZXRlZFNlYXJjaENvbnRhaW5lci5odG1sKGNvbnRlbnQuc2lkZWJhcilcblxuXHRcdFx0XHQkKCdib2R5JykudHJpZ2dlckhhbmRsZXIoJ2NvbXBhcmVSZXNldCcpXG5cblx0XHRcdFx0JCgnaHRtbCwgYm9keScpLmFuaW1hdGUoXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0c2Nyb2xsVG9wOiAwLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0MTAwXG5cdFx0XHRcdClcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHZhbGlkYXRpb25FcnJvck1lc3NhZ2VzOiB7XG5cdFx0XHRcdFx0b25NaW5QcmljZUVycm9yLFxuXHRcdFx0XHRcdG9uTWF4UHJpY2VFcnJvcixcblx0XHRcdFx0XHRtaW5QcmljZU5vdEVudGVyZWQsXG5cdFx0XHRcdFx0bWF4UHJpY2VOb3RFbnRlcmVkLFxuXHRcdFx0XHRcdG9uSW52YWxpZFByaWNlLFxuXHRcdFx0XHR9LFxuXHRcdFx0fVxuXHRcdClcblx0fVxufVxuIiwiY29uc3QgVFJBTlNMQVRJT05TID0gJ3RyYW5zbGF0aW9ucyc7XG5jb25zdCBpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5ID0gKGRpY3Rpb25hcnkpID0+ICEhT2JqZWN0LmtleXMoZGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKS5sZW5ndGg7XG5jb25zdCBjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5ID0gKC4uLmRpY3Rpb25hcnlKc29uTGlzdCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGljdGlvbmFyeUpzb25MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGRpY3Rpb25hcnkgPSBKU09OLnBhcnNlKGRpY3Rpb25hcnlKc29uTGlzdFtpXSk7XG4gICAgICAgIGlmIChpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5KGRpY3Rpb25hcnkpKSB7XG4gICAgICAgICAgICByZXR1cm4gZGljdGlvbmFyeTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbi8qKlxuICogZGVmaW5lcyBUcmFuc2xhdGlvbiBEaWN0aW9uYXJ5IHRvIHVzZVxuICogQHBhcmFtIGNvbnRleHQgcHJvdmlkZXMgYWNjZXNzIHRvIDMgdmFsaWRhdGlvbiBKU09OcyBmcm9tIGVuLmpzb246XG4gKiB2YWxpZGF0aW9uX21lc3NhZ2VzLCB2YWxpZGF0aW9uX2ZhbGxiYWNrX21lc3NhZ2VzIGFuZCBkZWZhdWx0X21lc3NhZ2VzXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5ID0gKGNvbnRleHQpID0+IHtcbiAgICBjb25zdCB7IHZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04gfSA9IGNvbnRleHQ7XG4gICAgY29uc3QgYWN0aXZlRGljdGlvbmFyeSA9IGNob29zZUFjdGl2ZURpY3Rpb25hcnkodmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTik7XG4gICAgY29uc3QgbG9jYWxpemF0aW9ucyA9IE9iamVjdC52YWx1ZXMoYWN0aXZlRGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKTtcbiAgICBjb25zdCB0cmFuc2xhdGlvbktleXMgPSBPYmplY3Qua2V5cyhhY3RpdmVEaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pLm1hcChrZXkgPT4ga2V5LnNwbGl0KCcuJykucG9wKCkpO1xuXG4gICAgcmV0dXJuIHRyYW5zbGF0aW9uS2V5cy5yZWR1Y2UoKGFjYywga2V5LCBpKSA9PiB7XG4gICAgICAgIGFjY1trZXldID0gbG9jYWxpemF0aW9uc1tpXTtcbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSk7XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==