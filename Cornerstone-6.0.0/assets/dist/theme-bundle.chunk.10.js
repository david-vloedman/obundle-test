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

    var $button = $('.remove-all-cart-btn');
    _cart_cart_utils__WEBPACK_IMPORTED_MODULE_5__["default"].getCart('/api/storefront/cart/?include=lineItems.digitalItems.options,lineItems.physicalItems.options').then(function (cart) {
      // if there is a cart, show remove all button
      if (cart[0]) {
        $button.removeClass('button--hidden');
      }

      $button.on('click', function () {
        // fire confirmation of delete modal
        _global_sweet_alert__WEBPACK_IMPORTED_MODULE_6__["default"].fire({
          title: 'Notice',
          icon: 'warning',
          text: 'Remove all items from cart?',
          showCancelButton: true
        }).then(function (result) {
          // if the user confirmed, delete the cart
          if (result.isConfirmed) {
            // change the button label and disabled state while fetching
            $button.val('Removing From Cart...').prop('disabled', true); // delete the cart

            if (cart[0].id) {
              _cart_cart_utils__WEBPACK_IMPORTED_MODULE_5__["default"].deleteCart('/api/storefront/carts/', cart[0].id).then(function (res) {
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
            return _this5.handleItemAddResponse(response);
          });
        } else {
          _cart_cart_utils__WEBPACK_IMPORTED_MODULE_5__["default"].createCart('/api/storefront/cart', data).then(function (response) {
            return _this5.handleItemAddResponse(response);
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
      text: 'Failed to add items to cart. Some items may require additional options to be selected'
    });
  };

  _proto.itemAddedAlert = function itemAddedAlert() {
    _global_sweet_alert__WEBPACK_IMPORTED_MODULE_6__["default"].fire({
      title: 'Notice',
      icon: 'success',
      text: 'All items added to cart'
    }).then(function (result) {
      return location.reload();
    });
  };

  _proto.handleItemAddResponse = function handleItemAddResponse(response) {
    return response.status === 404 ? this.itemCouldNotBeAddedAlert() : this.itemAddedAlert();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2FydC9jYXJ0LXV0aWxzLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9jYXRlZ29yeS5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL3V0aWxzL3RyYW5zbGF0aW9ucy11dGlscy5qcyJdLCJuYW1lcyI6WyJjcmVhdGVDYXJ0IiwidXJsIiwiY2FydEl0ZW1zIiwiZmV0Y2giLCJtZXRob2QiLCJjcmVkZW50aWFscyIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJhZGRDYXJ0SXRlbSIsImNhcnRJZCIsImdldENhcnQiLCJkZWxldGVDYXJ0IiwiZGVsZXRlQ2FydEl0ZW0iLCJpdGVtSWQiLCJDYXRlZ29yeSIsImNvbnRleHQiLCJ2YWxpZGF0aW9uRGljdGlvbmFyeSIsImNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSIsInNldExpdmVSZWdpb25BdHRyaWJ1dGVzIiwiJGVsZW1lbnQiLCJyb2xlVHlwZSIsImFyaWFMaXZlU3RhdHVzIiwiYXR0ciIsInJvbGUiLCJtYWtlU2hvcEJ5UHJpY2VGaWx0ZXJBY2Nlc3NpYmxlIiwiJCIsImxlbmd0aCIsImhhc0NsYXNzIiwiZm9jdXMiLCJvbiIsIm9uUmVhZHkiLCJhcnJhbmdlRm9jdXNPblNvcnRCeSIsImluaXRBZGRBbGxUb0NhcnRCdG4iLCJpbml0UmVtb3ZlQWxsSXRlbXNCdG4iLCJlIiwiY3VycmVudFRhcmdldCIsIm5leHQiLCJjb21wYXJlUHJvZHVjdHMiLCJpbml0RmFjZXRlZFNlYXJjaCIsIm9uU29ydEJ5U3VibWl0IiwiYmluZCIsImhvb2tzIiwiaW5pdFByb2R1Y3RJbWFnZUhvdmVyIiwic2V0TGl2ZVJlZ2lvbnNBdHRyaWJ1dGVzIiwiYXJpYU5vdGlmeU5vUHJvZHVjdHMiLCIkaW1nIiwiZmluZCIsInNyYyIsImhvdmVyU3JjIiwicmVwbGFjZSIsImhlaWdodCIsIndpZHRoIiwiJGJ1dHRvbiIsImNhcnRVdGlscyIsImNhcnQiLCJyZW1vdmVDbGFzcyIsInN3YWwiLCJmaXJlIiwidGl0bGUiLCJpY29uIiwidGV4dCIsInNob3dDYW5jZWxCdXR0b24iLCJyZXN1bHQiLCJpc0NvbmZpcm1lZCIsInZhbCIsInByb3AiLCJpZCIsInJlcyIsImhhbmRsZUl0ZW1zUmVtb3ZlUmVzcG9uc2UiLCJkYXRhIiwibGluZUl0ZW1zIiwiZ2V0QWxsQ2F0ZWdvcnlQcm9kdWN0SWRzIiwib3JpZ2luYWxMYWJlbCIsImV4aXN0aW5nQ2FydCIsImhhbmRsZUl0ZW1BZGRSZXNwb25zZSIsIml0ZW1Db3VsZE5vdEJlQWRkZWRBbGVydCIsIml0ZW1BZGRlZEFsZXJ0IiwibG9jYXRpb24iLCJyZWxvYWQiLCJzdGF0dXMiLCJpdGVtc0NvdWxkTm90QmVSZW1vdmVkQWxlcnQiLCJpdGVtc1JlbW92ZWRBbGVydCIsImlkcyIsImVhY2giLCJpbmRleCIsImVsZSIsInB1c2giLCJtYXAiLCJxdWFudGl0eSIsInByb2R1Y3RJZCIsIiRub1Byb2R1Y3RzTWVzc2FnZSIsIm9uTWluUHJpY2VFcnJvciIsInByaWNlX21pbl9ldmFsdWF0aW9uIiwib25NYXhQcmljZUVycm9yIiwicHJpY2VfbWF4X2V2YWx1YXRpb24iLCJtaW5QcmljZU5vdEVudGVyZWQiLCJwcmljZV9taW5fbm90X2VudGVyZWQiLCJtYXhQcmljZU5vdEVudGVyZWQiLCJwcmljZV9tYXhfbm90X2VudGVyZWQiLCJvbkludmFsaWRQcmljZSIsInByaWNlX2ludmFsaWRfdmFsdWUiLCIkcHJvZHVjdExpc3RpbmdDb250YWluZXIiLCIkZmFjZXRlZFNlYXJjaENvbnRhaW5lciIsInByb2R1Y3RzUGVyUGFnZSIsImNhdGVnb3J5UHJvZHVjdHNQZXJQYWdlIiwicmVxdWVzdE9wdGlvbnMiLCJjb25maWciLCJjYXRlZ29yeSIsInNob3BfYnlfcHJpY2UiLCJwcm9kdWN0cyIsImxpbWl0IiwidGVtcGxhdGUiLCJwcm9kdWN0TGlzdGluZyIsInNpZGViYXIiLCJzaG93TW9yZSIsImZhY2V0ZWRTZWFyY2giLCJGYWNldGVkU2VhcmNoIiwiY29udGVudCIsImh0bWwiLCJ0cmlnZ2VySGFuZGxlciIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJ2YWxpZGF0aW9uRXJyb3JNZXNzYWdlcyIsIkNhdGFsb2dQYWdlIiwiVFJBTlNMQVRJT05TIiwiaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eSIsImRpY3Rpb25hcnkiLCJPYmplY3QiLCJrZXlzIiwiY2hvb3NlQWN0aXZlRGljdGlvbmFyeSIsImkiLCJwYXJzZSIsInZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiIsInZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OIiwidmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTiIsImFjdGl2ZURpY3Rpb25hcnkiLCJsb2NhbGl6YXRpb25zIiwidmFsdWVzIiwidHJhbnNsYXRpb25LZXlzIiwia2V5Iiwic3BsaXQiLCJwb3AiLCJyZWR1Y2UiLCJhY2MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFlO0FBQ2RBLFlBQVUsRUFBRSxvQkFBQ0MsR0FBRCxFQUFNQyxTQUFOLEVBQW9CO0FBQy9CLFdBQU9DLEtBQUssQ0FBQ0YsR0FBRCxFQUFNO0FBQ2pCRyxZQUFNLEVBQUUsTUFEUztBQUVqQkMsaUJBQVcsRUFBRSxhQUZJO0FBR2pCQyxhQUFPLEVBQUU7QUFDUix3QkFBZ0I7QUFEUixPQUhRO0FBTWpCQyxVQUFJLEVBQUVDLElBQUksQ0FBQ0MsU0FBTCxDQUFlUCxTQUFmO0FBTlcsS0FBTixDQUFMLENBUUxRLElBUkssQ0FRQSxVQUFDQyxRQUFEO0FBQUEsYUFBY0EsUUFBUSxDQUFDQyxJQUFULEVBQWQ7QUFBQSxLQVJBLFdBU0MsVUFBQ0MsR0FBRDtBQUFBLGFBQVNDLE9BQU8sQ0FBQ0MsS0FBUixDQUFjRixHQUFkLENBQVQ7QUFBQSxLQVRELENBQVA7QUFVQSxHQVphO0FB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QUF3R3RILE9BQXhHLENBQWtDc0gsZ0NBQWxDO0FBQUEsTUFBb0VDLCtCQUFwRSxHQUF3R3ZILE9BQXhHLENBQW9FdUgsK0JBQXBFO0FBQ0EsTUFBTUMsZ0JBQWdCLEdBQUdOLHNCQUFzQixDQUFDRyx3QkFBRCxFQUEyQkMsZ0NBQTNCLEVBQTZEQywrQkFBN0QsQ0FBL0M7QUFDQSxNQUFNRSxhQUFhLEdBQUdULE1BQU0sQ0FBQ1UsTUFBUCxDQUFjRixnQkFBZ0IsQ0FBQ1gsWUFBRCxDQUE5QixDQUF0QjtBQUNBLE1BQU1jLGVBQWUsR0FBR1gsTUFBTSxDQUFDQyxJQUFQLENBQVlPLGdCQUFnQixDQUFDWCxZQUFELENBQTVCLEVBQTRDckMsR0FBNUMsQ0FBZ0QsVUFBQW9ELEdBQUc7QUFBQSxXQUFJQSxHQUFHLENBQUNDLEtBQUosQ0FBVSxHQUFWLEVBQWVDLEdBQWYsRUFBSjtBQUFBLEdBQW5ELENBQXhCO0FBRUEsU0FBT0gsZUFBZSxDQUFDSSxNQUFoQixDQUF1QixVQUFDQyxHQUFELEVBQU1KLEdBQU4sRUFBV1QsQ0FBWCxFQUFpQjtBQUMzQ2EsT0FBRyxDQUFDSixHQUFELENBQUgsR0FBV0gsYUFBYSxDQUFDTixDQUFELENBQXhCO0FBQ0EsV0FBT2EsR0FBUDtBQUNILEdBSE0sRUFHSixFQUhJLENBQVA7QUFJSCxDQVZNLEMiLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLjEwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQge1xuXHRjcmVhdGVDYXJ0OiAodXJsLCBjYXJ0SXRlbXMpID0+IHtcblx0XHRyZXR1cm4gZmV0Y2godXJsLCB7XG5cdFx0XHRtZXRob2Q6ICdQT1NUJyxcblx0XHRcdGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nLFxuXHRcdFx0aGVhZGVyczoge1xuXHRcdFx0XHQnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuXHRcdFx0fSxcblx0XHRcdGJvZHk6IEpTT04uc3RyaW5naWZ5KGNhcnRJdGVtcyksXG5cdFx0fSlcblx0XHRcdC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuXHRcdFx0LmNhdGNoKChlcnIpID0+IGNvbnNvbGUuZXJyb3IoZXJyKSlcblx0fSxcblxuXHRhZGRDYXJ0SXRlbTogKHVybCwgY2FydElkLCBjYXJ0SXRlbXMpID0+IHtcblx0XHRyZXR1cm4gZmV0Y2godXJsICsgY2FydElkICsgJy9pdGVtcy8nLCB7XG5cdFx0XHRtZXRob2Q6ICdQT1NUJyxcblx0XHRcdGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nLFxuXHRcdFx0aGVhZGVyczoge1xuXHRcdFx0XHQnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuXHRcdFx0fSxcblx0XHRcdGJvZHk6IEpTT04uc3RyaW5naWZ5KGNhcnRJdGVtcyksXG5cdFx0fSlcblx0XHRcdC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuXHRcdFx0LmNhdGNoKChlcnIpID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKVxuXHR9LFxuXG5cdGdldENhcnQ6ICh1cmwpID0+IHtcblx0XHRyZXR1cm4gZmV0Y2godXJsLCB7XG5cdFx0XHRtZXRob2Q6ICdHRVQnLFxuXHRcdFx0Y3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicsXG5cdFx0fSkudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcblx0fSxcblxuXHRkZWxldGVDYXJ0OiAodXJsLCBjYXJ0SWQpID0+IHtcblx0XHRyZXR1cm4gZmV0Y2godXJsICsgY2FydElkLCB7XG5cdFx0XHRtZXRob2Q6ICdERUxFVEUnLFxuXHRcdFx0Y3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicsXG5cdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdCdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG5cdFx0XHR9LFxuXHRcdH0pLmNhdGNoKChlcnIpID0+IGNvbnNvbGUuZXJyb3IoZXJyKSlcblx0fSxcblxuXHRkZWxldGVDYXJ0SXRlbTogKHVybCwgY2FydElkLCBpdGVtSWQpID0+IHtcblx0XHRyZXR1cm4gZmV0Y2godXJsICsgY2FydElkICsgJy9pdGVtcy8nICsgaXRlbUlkLCB7XG5cdFx0XHRtZXRob2Q6ICdERUxFVEUnLFxuXHRcdFx0Y3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicsXG5cdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdCdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG5cdFx0XHR9LFxuXHRcdH0pXG5cdFx0LmNhdGNoKChlcnIpID0+IGNvbnNvbGUuZXJyb3IoZXJyKSlcblx0fSxcblxufVxuIiwiaW1wb3J0IHsgaG9va3MgfSBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscydcbmltcG9ydCBDYXRhbG9nUGFnZSBmcm9tICcuL2NhdGFsb2cnXG5pbXBvcnQgY29tcGFyZVByb2R1Y3RzIGZyb20gJy4vZ2xvYmFsL2NvbXBhcmUtcHJvZHVjdHMnXG5pbXBvcnQgRmFjZXRlZFNlYXJjaCBmcm9tICcuL2NvbW1vbi9mYWNldGVkLXNlYXJjaCdcbmltcG9ydCB7IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSB9IGZyb20gJy4uL3RoZW1lL2NvbW1vbi91dGlscy90cmFuc2xhdGlvbnMtdXRpbHMnXG5pbXBvcnQgY2FydFV0aWxzIGZyb20gJy4vY2FydC9jYXJ0LXV0aWxzJ1xuaW1wb3J0IHN3YWwgZnJvbSAnLi9nbG9iYWwvc3dlZXQtYWxlcnQnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhdGVnb3J5IGV4dGVuZHMgQ2F0YWxvZ1BhZ2Uge1xuXHRjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG5cdFx0c3VwZXIoY29udGV4dClcblx0XHR0aGlzLnZhbGlkYXRpb25EaWN0aW9uYXJ5ID0gY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5KGNvbnRleHQpXG5cdH1cblxuXHRzZXRMaXZlUmVnaW9uQXR0cmlidXRlcygkZWxlbWVudCwgcm9sZVR5cGUsIGFyaWFMaXZlU3RhdHVzKSB7XG5cdFx0JGVsZW1lbnQuYXR0cih7XG5cdFx0XHRyb2xlOiByb2xlVHlwZSxcblx0XHRcdCdhcmlhLWxpdmUnOiBhcmlhTGl2ZVN0YXR1cyxcblx0XHR9KVxuXHR9XG5cblx0bWFrZVNob3BCeVByaWNlRmlsdGVyQWNjZXNzaWJsZSgpIHtcblx0XHRpZiAoISQoJ1tkYXRhLXNob3AtYnktcHJpY2VdJykubGVuZ3RoKSByZXR1cm5cblxuXHRcdGlmICgkKCcubmF2TGlzdC1hY3Rpb24nKS5oYXNDbGFzcygnaXMtYWN0aXZlJykpIHtcblx0XHRcdCQoJ2EubmF2TGlzdC1hY3Rpb24uaXMtYWN0aXZlJykuZm9jdXMoKVxuXHRcdH1cblxuXHRcdCQoJ2EubmF2TGlzdC1hY3Rpb24nKS5vbignY2xpY2snLCAoKSA9PlxuXHRcdFx0dGhpcy5zZXRMaXZlUmVnaW9uQXR0cmlidXRlcyhcblx0XHRcdFx0JCgnc3Bhbi5wcmljZS1maWx0ZXItbWVzc2FnZScpLFxuXHRcdFx0XHQnc3RhdHVzJyxcblx0XHRcdFx0J2Fzc2VydGl2ZSdcblx0XHRcdClcblx0XHQpXG5cdH1cblxuXHRvblJlYWR5KCkge1xuXHRcdHRoaXMuYXJyYW5nZUZvY3VzT25Tb3J0QnkoKVxuXHRcdHRoaXMuaW5pdEFkZEFsbFRvQ2FydEJ0bigpXG5cdFx0dGhpcy5pbml0UmVtb3ZlQWxsSXRlbXNCdG4oKVxuXHRcdCQoJ1tkYXRhLWJ1dHRvbi10eXBlPVwiYWRkLWNhcnRcIl0nKS5vbignY2xpY2snLCAoZSkgPT5cblx0XHRcdHRoaXMuc2V0TGl2ZVJlZ2lvbkF0dHJpYnV0ZXMoXG5cdFx0XHRcdCQoZS5jdXJyZW50VGFyZ2V0KS5uZXh0KCksXG5cdFx0XHRcdCdzdGF0dXMnLFxuXHRcdFx0XHQncG9saXRlJ1xuXHRcdFx0KVxuXHRcdClcblxuXHRcdHRoaXMubWFrZVNob3BCeVByaWNlRmlsdGVyQWNjZXNzaWJsZSgpXG5cblx0XHRjb21wYXJlUHJvZHVjdHModGhpcy5jb250ZXh0KVxuXG5cdFx0aWYgKCQoJyNmYWNldGVkU2VhcmNoJykubGVuZ3RoID4gMCkge1xuXHRcdFx0dGhpcy5pbml0RmFjZXRlZFNlYXJjaCgpXG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMub25Tb3J0QnlTdWJtaXQgPSB0aGlzLm9uU29ydEJ5U3VibWl0LmJpbmQodGhpcylcblx0XHRcdGhvb2tzLm9uKCdzb3J0Qnktc3VibWl0dGVkJywgdGhpcy5vblNvcnRCeVN1Ym1pdClcblx0XHR9XG5cdFx0dGhpcy5pbml0UHJvZHVjdEltYWdlSG92ZXIoKVxuXG5cdFx0JCgnYS5yZXNldC1idG4nKS5vbignY2xpY2snLCAoKSA9PlxuXHRcdFx0dGhpcy5zZXRMaXZlUmVnaW9uc0F0dHJpYnV0ZXMoJCgnc3Bhbi5yZXNldC1tZXNzYWdlJyksICdzdGF0dXMnLCAncG9saXRlJylcblx0XHQpXG5cdFx0dGhpcy5hcmlhTm90aWZ5Tm9Qcm9kdWN0cygpXG5cdH1cblxuXHRpbml0UHJvZHVjdEltYWdlSG92ZXIoKSB7XG5cdFx0JCgnLmNhcmQtZmlndXJlJykub24oJ21vdXNlZW50ZXInLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRjb25zdCAkaW1nID0gJCh0aGlzKS5maW5kKCcuY2FyZC1pbWFnZScpXG5cdFx0XHRjb25zdCBzcmMgPSAkaW1nLmF0dHIoJ3NyYycpXG5cdFx0XHRjb25zdCBob3ZlclNyYyA9ICRpbWdcblx0XHRcdFx0LmF0dHIoJ2RhdGEtaG92ZXItc3JjJylcblx0XHRcdFx0LnJlcGxhY2UoJ3s6c2l6ZX0nLCAkKHRoaXMpLmhlaWdodCgpICsgJ3gnICsgJCh0aGlzKS53aWR0aCgpKVxuXHRcdFx0JGltZy5hdHRyKCdzcmNzZXQnLCBob3ZlclNyYylcblxuXHRcdFx0JCh0aGlzKS5vbignbW91c2VsZWF2ZScsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0JGltZy5hdHRyKCdzcmNzZXQnLCBzcmMpXG5cdFx0XHR9KVxuXHRcdH0pXG5cdH1cblxuXHRpbml0UmVtb3ZlQWxsSXRlbXNCdG4oKSB7XG5cdFx0Y29uc3QgJGJ1dHRvbiA9ICQoJy5yZW1vdmUtYWxsLWNhcnQtYnRuJylcblx0XHRjYXJ0VXRpbHNcblx0XHRcdC5nZXRDYXJ0KFxuXHRcdFx0XHQnL2FwaS9zdG9yZWZyb250L2NhcnQvP2luY2x1ZGU9bGluZUl0ZW1zLmRpZ2l0YWxJdGVtcy5vcHRpb25zLGxpbmVJdGVtcy5waHlzaWNhbEl0ZW1zLm9wdGlvbnMnXG5cdFx0XHQpXG5cdFx0XHQudGhlbigoY2FydCkgPT4ge1xuXHRcdFx0XHQvLyBpZiB0aGVyZSBpcyBhIGNhcnQsIHNob3cgcmVtb3ZlIGFsbCBidXR0b25cblx0XHRcdFx0aWYgKGNhcnRbMF0pIHtcblx0XHRcdFx0XHQkYnV0dG9uLnJlbW92ZUNsYXNzKCdidXR0b24tLWhpZGRlbicpXG5cdFx0XHRcdH1cblxuXHRcdFx0XHQkYnV0dG9uLm9uKCdjbGljaycsICgpID0+IHtcblx0XHRcdFx0XHQvLyBmaXJlIGNvbmZpcm1hdGlvbiBvZiBkZWxldGUgbW9kYWxcblx0XHRcdFx0XHRzd2FsXG5cdFx0XHRcdFx0XHQuZmlyZSh7XG5cdFx0XHRcdFx0XHRcdHRpdGxlOiAnTm90aWNlJyxcblx0XHRcdFx0XHRcdFx0aWNvbjogJ3dhcm5pbmcnLFxuXHRcdFx0XHRcdFx0XHR0ZXh0OiAnUmVtb3ZlIGFsbCBpdGVtcyBmcm9tIGNhcnQ/Jyxcblx0XHRcdFx0XHRcdFx0c2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHQudGhlbigocmVzdWx0KSA9PiB7XG5cdFx0XHRcdFx0XHRcdC8vIGlmIHRoZSB1c2VyIGNvbmZpcm1lZCwgZGVsZXRlIHRoZSBjYXJ0XG5cdFx0XHRcdFx0XHRcdGlmIChyZXN1bHQuaXNDb25maXJtZWQpIHtcblx0XHRcdFx0XHRcdFx0XHQvLyBjaGFuZ2UgdGhlIGJ1dHRvbiBsYWJlbCBhbmQgZGlzYWJsZWQgc3RhdGUgd2hpbGUgZmV0Y2hpbmdcblx0XHRcdFx0XHRcdFx0XHQkYnV0dG9uLnZhbCgnUmVtb3ZpbmcgRnJvbSBDYXJ0Li4uJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKVxuXHRcdFx0XHRcdFx0XHRcdC8vIGRlbGV0ZSB0aGUgY2FydFxuXHRcdFx0XHRcdFx0XHRcdGlmIChjYXJ0WzBdLmlkKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRjYXJ0VXRpbHNcblx0XHRcdFx0XHRcdFx0XHRcdFx0LmRlbGV0ZUNhcnQoJy9hcGkvc3RvcmVmcm9udC9jYXJ0cy8nLCBjYXJ0WzBdLmlkKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQudGhlbigocmVzKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5oYW5kbGVJdGVtc1JlbW92ZVJlc3BvbnNlKHJlcylcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdH0pXG5cdFx0XHR9KVxuXHR9XG5cblx0aW5pdEFkZEFsbFRvQ2FydEJ0bigpIHtcblx0XHRjb25zdCBkYXRhID0geyBsaW5lSXRlbXM6IHRoaXMuZ2V0QWxsQ2F0ZWdvcnlQcm9kdWN0SWRzKCkgfVxuXHRcdGNvbnN0ICRidXR0b24gPSAkKCcuYWRkLWFsbC10by1jYXJ0LWJ0bicpXG5cdFx0JGJ1dHRvbi5vbignY2xpY2snLCAoKSA9PiB7XG5cdFx0XHQvLyBnZXQgdGhlIG9yaWdpbmFsIGxhYmVsIGluIGNhc2UgdGhlIEhUTUwgaXMgY2hhbmdlZFxuXHRcdFx0Y29uc3Qgb3JpZ2luYWxMYWJlbCA9ICRidXR0b24udmFsKClcblx0XHRcdC8vIGNoYW5nZSB0aGUgYnV0dG9uIGxhYmVsIGFuZCBkaXNhYmxlIGJ1dHRvbiB3aGlsZSBmZXRjaGluZ1xuXHRcdFx0JGJ1dHRvbi52YWwoJ0FkZGluZyBUbyBDYXJ0Li4uJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKVxuXHRcdFx0Ly8gdHJ5IHRvIGdldCB0aGUgY3VycmVudCBjYXJ0XG5cdFx0XHRjYXJ0VXRpbHNcblx0XHRcdFx0LmdldENhcnQoXG5cdFx0XHRcdFx0Jy9hcGkvc3RvcmVmcm9udC9jYXJ0Lz9pbmNsdWRlPWxpbmVJdGVtcy5kaWdpdGFsSXRlbXMub3B0aW9ucyxsaW5lSXRlbXMucGh5c2ljYWxJdGVtcy5vcHRpb25zJ1xuXHRcdFx0XHQpXG5cdFx0XHRcdC50aGVuKChleGlzdGluZ0NhcnQpID0+IHtcblx0XHRcdFx0XHQvLyBpZiBjYXJ0IGV4aXN0cywgYWRkIGl0ZW1zLCBpZiBjYXJ0IGRvZXMgbm90IGV4aXN0LCBjcmVhdGUgYW5kIGFkZCBpdGVtc1xuXHRcdFx0XHRcdGlmIChleGlzdGluZ0NhcnRbMF0/LmlkKSB7XG5cdFx0XHRcdFx0XHRjYXJ0VXRpbHNcblx0XHRcdFx0XHRcdFx0LmFkZENhcnRJdGVtKCcvYXBpL3N0b3JlZnJvbnQvY2FydHMvJywgZXhpc3RpbmdDYXJ0WzBdLmlkLCBkYXRhKVxuXHRcdFx0XHRcdFx0XHQudGhlbigocmVzcG9uc2UpID0+IHRoaXMuaGFuZGxlSXRlbUFkZFJlc3BvbnNlKHJlc3BvbnNlKSlcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Y2FydFV0aWxzXG5cdFx0XHRcdFx0XHRcdC5jcmVhdGVDYXJ0KCcvYXBpL3N0b3JlZnJvbnQvY2FydCcsIGRhdGEpXG5cdFx0XHRcdFx0XHRcdC50aGVuKChyZXNwb25zZSkgPT4gdGhpcy5oYW5kbGVJdGVtQWRkUmVzcG9uc2UocmVzcG9uc2UpKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyByZXNldCB0aGUgYnV0dG9uIHRvIG9yaWdpbmFsIHN0YXRlXG5cdFx0XHRcdFx0JCh0aGlzKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKS52YWwob3JpZ2luYWxMYWJlbClcblx0XHRcdFx0fSlcblx0XHR9KVxuXHR9XG5cblx0aXRlbUNvdWxkTm90QmVBZGRlZEFsZXJ0KCkge1xuXHRcdHN3YWwuZmlyZSh7XG5cdFx0XHR0aXRsZTogJ0Vycm9yJyxcblx0XHRcdGljb246ICdlcnJvcicsXG5cdFx0XHR0ZXh0OiAnRmFpbGVkIHRvIGFkZCBpdGVtcyB0byBjYXJ0LiBTb21lIGl0ZW1zIG1heSByZXF1aXJlIGFkZGl0aW9uYWwgb3B0aW9ucyB0byBiZSBzZWxlY3RlZCcsXG5cdFx0fSlcblx0fVxuXG5cdGl0ZW1BZGRlZEFsZXJ0KCkge1xuXHRcdHN3YWxcblx0XHRcdC5maXJlKHtcblx0XHRcdFx0dGl0bGU6ICdOb3RpY2UnLFxuXHRcdFx0XHRpY29uOiAnc3VjY2VzcycsXG5cdFx0XHRcdHRleHQ6ICdBbGwgaXRlbXMgYWRkZWQgdG8gY2FydCcsXG5cdFx0XHR9KVxuXHRcdFx0LnRoZW4oKHJlc3VsdCkgPT4gbG9jYXRpb24ucmVsb2FkKCkpXG5cdH1cblxuXHRoYW5kbGVJdGVtQWRkUmVzcG9uc2UocmVzcG9uc2UpIHtcblx0XHRyZXR1cm4gcmVzcG9uc2Uuc3RhdHVzID09PSA0MDRcblx0XHRcdD8gdGhpcy5pdGVtQ291bGROb3RCZUFkZGVkQWxlcnQoKVxuXHRcdFx0OiB0aGlzLml0ZW1BZGRlZEFsZXJ0KClcblx0fVxuXG5cdGl0ZW1zQ291bGROb3RCZVJlbW92ZWRBbGVydCgpIHtcblx0XHRzd2FsLmZpcmUoe1xuXHRcdFx0dGl0bGU6ICdFcnJvcicsXG5cdFx0XHRpY29uOiAnZXJyb3InLFxuXHRcdFx0dGV4dDogJ0ZhaWxlZCB0byByZW1vdmUgaXRlbXMgZnJvbSBjYXJ0LCBwbGVhc2UgdHJ5IGFnYWluLicsXG5cdFx0fSlcblx0fVxuXG5cdGl0ZW1zUmVtb3ZlZEFsZXJ0KCkge1xuXHRcdHN3YWxcblx0XHRcdC5maXJlKHtcblx0XHRcdFx0dGl0bGU6ICdOb3RpY2UnLFxuXHRcdFx0XHRpY29uOiAnc3VjY2VzcycsXG5cdFx0XHRcdHRleHQ6ICdBbGwgaXRlbXMgcmVtb3ZlZCBmcm9tIGNhcnQnLFxuXHRcdFx0fSlcblx0XHRcdC50aGVuKChyZXN1bHQpID0+IGxvY2F0aW9uLnJlbG9hZCgpKVxuXHR9XG5cblx0aGFuZGxlSXRlbXNSZW1vdmVSZXNwb25zZShyZXNwb25zZSkge1xuXHRcdHJldHVybiByZXNwb25zZS5zdGF0dXMgIT09IDIwNFxuXHRcdFx0PyB0aGlzLml0ZW1zQ291bGROb3RCZVJlbW92ZWRBbGVydCgpXG5cdFx0XHQ6IHRoaXMuaXRlbXNSZW1vdmVkQWxlcnQoKVxuXHR9XG5cblx0Z2V0QWxsQ2F0ZWdvcnlQcm9kdWN0SWRzKCkge1xuXHRcdGNvbnN0IGlkcyA9IFtdXG5cdFx0Ly8gcHVsbCBpZCdzIGZvciBlYWNoIGl0ZW0gb24gdGhlIHBhZ2Vcblx0XHQkKCdbZGF0YS1wcm9kdWN0LWlkXScpLmVhY2goKGluZGV4LCBlbGUpID0+IHtcblx0XHRcdGlkcy5wdXNoKCQoZWxlKS5hdHRyKCdkYXRhLXByb2R1Y3QtaWQnKSlcblx0XHR9KVxuXG5cdFx0cmV0dXJuIGlkcy5tYXAoKGlkKSA9PiAoe1xuXHRcdFx0cXVhbnRpdHk6IDEsXG5cdFx0XHRwcm9kdWN0SWQ6IGlkLFxuXHRcdH0pKVxuXHR9XG5cblx0YXJpYU5vdGlmeU5vUHJvZHVjdHMoKSB7XG5cdFx0Y29uc3QgJG5vUHJvZHVjdHNNZXNzYWdlID0gJCgnW2RhdGEtbm8tcHJvZHVjdHMtbm90aWZpY2F0aW9uXScpXG5cdFx0aWYgKCRub1Byb2R1Y3RzTWVzc2FnZS5sZW5ndGgpIHtcblx0XHRcdCRub1Byb2R1Y3RzTWVzc2FnZS5mb2N1cygpXG5cdFx0fVxuXHR9XG5cblx0aW5pdEZhY2V0ZWRTZWFyY2goKSB7XG5cdFx0Y29uc3Qge1xuXHRcdFx0cHJpY2VfbWluX2V2YWx1YXRpb246IG9uTWluUHJpY2VFcnJvcixcblx0XHRcdHByaWNlX21heF9ldmFsdWF0aW9uOiBvbk1heFByaWNlRXJyb3IsXG5cdFx0XHRwcmljZV9taW5fbm90X2VudGVyZWQ6IG1pblByaWNlTm90RW50ZXJlZCxcblx0XHRcdHByaWNlX21heF9ub3RfZW50ZXJlZDogbWF4UHJpY2VOb3RFbnRlcmVkLFxuXHRcdFx0cHJpY2VfaW52YWxpZF92YWx1ZTogb25JbnZhbGlkUHJpY2UsXG5cdFx0fSA9IHRoaXMudmFsaWRhdGlvbkRpY3Rpb25hcnlcblx0XHRjb25zdCAkcHJvZHVjdExpc3RpbmdDb250YWluZXIgPSAkKCcjcHJvZHVjdC1saXN0aW5nLWNvbnRhaW5lcicpXG5cdFx0Y29uc3QgJGZhY2V0ZWRTZWFyY2hDb250YWluZXIgPSAkKCcjZmFjZXRlZC1zZWFyY2gtY29udGFpbmVyJylcblx0XHRjb25zdCBwcm9kdWN0c1BlclBhZ2UgPSB0aGlzLmNvbnRleHQuY2F0ZWdvcnlQcm9kdWN0c1BlclBhZ2Vcblx0XHRjb25zdCByZXF1ZXN0T3B0aW9ucyA9IHtcblx0XHRcdGNvbmZpZzoge1xuXHRcdFx0XHRjYXRlZ29yeToge1xuXHRcdFx0XHRcdHNob3BfYnlfcHJpY2U6IHRydWUsXG5cdFx0XHRcdFx0cHJvZHVjdHM6IHtcblx0XHRcdFx0XHRcdGxpbWl0OiBwcm9kdWN0c1BlclBhZ2UsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSxcblx0XHRcdH0sXG5cdFx0XHR0ZW1wbGF0ZToge1xuXHRcdFx0XHRwcm9kdWN0TGlzdGluZzogJ2NhdGVnb3J5L3Byb2R1Y3QtbGlzdGluZycsXG5cdFx0XHRcdHNpZGViYXI6ICdjYXRlZ29yeS9zaWRlYmFyJyxcblx0XHRcdH0sXG5cdFx0XHRzaG93TW9yZTogJ2NhdGVnb3J5L3Nob3ctbW9yZScsXG5cdFx0fVxuXG5cdFx0dGhpcy5mYWNldGVkU2VhcmNoID0gbmV3IEZhY2V0ZWRTZWFyY2goXG5cdFx0XHRyZXF1ZXN0T3B0aW9ucyxcblx0XHRcdChjb250ZW50KSA9PiB7XG5cdFx0XHRcdCRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lci5odG1sKGNvbnRlbnQucHJvZHVjdExpc3RpbmcpXG5cdFx0XHRcdCRmYWNldGVkU2VhcmNoQ29udGFpbmVyLmh0bWwoY29udGVudC5zaWRlYmFyKVxuXG5cdFx0XHRcdCQoJ2JvZHknKS50cmlnZ2VySGFuZGxlcignY29tcGFyZVJlc2V0JylcblxuXHRcdFx0XHQkKCdodG1sLCBib2R5JykuYW5pbWF0ZShcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRzY3JvbGxUb3A6IDAsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHQxMDBcblx0XHRcdFx0KVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dmFsaWRhdGlvbkVycm9yTWVzc2FnZXM6IHtcblx0XHRcdFx0XHRvbk1pblByaWNlRXJyb3IsXG5cdFx0XHRcdFx0b25NYXhQcmljZUVycm9yLFxuXHRcdFx0XHRcdG1pblByaWNlTm90RW50ZXJlZCxcblx0XHRcdFx0XHRtYXhQcmljZU5vdEVudGVyZWQsXG5cdFx0XHRcdFx0b25JbnZhbGlkUHJpY2UsXG5cdFx0XHRcdH0sXG5cdFx0XHR9XG5cdFx0KVxuXHR9XG59XG4iLCJjb25zdCBUUkFOU0xBVElPTlMgPSAndHJhbnNsYXRpb25zJztcbmNvbnN0IGlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkgPSAoZGljdGlvbmFyeSkgPT4gISFPYmplY3Qua2V5cyhkaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pLmxlbmd0aDtcbmNvbnN0IGNob29zZUFjdGl2ZURpY3Rpb25hcnkgPSAoLi4uZGljdGlvbmFyeUpzb25MaXN0KSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaWN0aW9uYXJ5SnNvbkxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZGljdGlvbmFyeSA9IEpTT04ucGFyc2UoZGljdGlvbmFyeUpzb25MaXN0W2ldKTtcbiAgICAgICAgaWYgKGlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkoZGljdGlvbmFyeSkpIHtcbiAgICAgICAgICAgIHJldHVybiBkaWN0aW9uYXJ5O1xuICAgICAgICB9XG4gICAgfVxufTtcblxuLyoqXG4gKiBkZWZpbmVzIFRyYW5zbGF0aW9uIERpY3Rpb25hcnkgdG8gdXNlXG4gKiBAcGFyYW0gY29udGV4dCBwcm92aWRlcyBhY2Nlc3MgdG8gMyB2YWxpZGF0aW9uIEpTT05zIGZyb20gZW4uanNvbjpcbiAqIHZhbGlkYXRpb25fbWVzc2FnZXMsIHZhbGlkYXRpb25fZmFsbGJhY2tfbWVzc2FnZXMgYW5kIGRlZmF1bHRfbWVzc2FnZXNcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkgPSAoY29udGV4dCkgPT4ge1xuICAgIGNvbnN0IHsgdmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTiB9ID0gY29udGV4dDtcbiAgICBjb25zdCBhY3RpdmVEaWN0aW9uYXJ5ID0gY2hvb3NlQWN0aXZlRGljdGlvbmFyeSh2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OKTtcbiAgICBjb25zdCBsb2NhbGl6YXRpb25zID0gT2JqZWN0LnZhbHVlcyhhY3RpdmVEaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pO1xuICAgIGNvbnN0IHRyYW5zbGF0aW9uS2V5cyA9IE9iamVjdC5rZXlzKGFjdGl2ZURpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSkubWFwKGtleSA9PiBrZXkuc3BsaXQoJy4nKS5wb3AoKSk7XG5cbiAgICByZXR1cm4gdHJhbnNsYXRpb25LZXlzLnJlZHVjZSgoYWNjLCBrZXksIGkpID0+IHtcbiAgICAgICAgYWNjW2tleV0gPSBsb2NhbGl6YXRpb25zW2ldO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KTtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9