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
            _this5.handleItemAddResponse(response);

            $button.prop('disabled', false).val(originalLabel);
          })["catch"](function (err) {
            return _this5.itemCouldNotBeAddedAlert();
          });
        } else {
          _cart_cart_utils__WEBPACK_IMPORTED_MODULE_5__["default"].createCart('/api/storefront/cart', data).then(function (response) {
            _this5.handleItemAddResponse(response);

            $button.prop('disabled', false).val(originalLabel);
          })["catch"](function (err) {
            return _this5.itemCouldNotBeAddedAlert();
          });
        }
      });
    });
  };

  _proto.itemCouldNotBeAddedAlert = function itemCouldNotBeAddedAlert() {
    _global_sweet_alert__WEBPACK_IMPORTED_MODULE_6__["default"].fire({
      title: 'Error',
      icon: 'error',
      text: 'Failed to add items to cart. Some items may require additional options to be selected.'
    });
  };

  _proto.itemAddedAlert = function itemAddedAlert() {
    _global_sweet_alert__WEBPACK_IMPORTED_MODULE_6__["default"].fire({
      title: 'Success',
      icon: 'success',
      text: 'All items added to cart.'
    }).then(function (result) {
      return location.reload();
    });
  };

  _proto.handleItemAddResponse = function handleItemAddResponse(response) {
    return response.status === 404 || response.status === 422 ? this.itemCouldNotBeAddedAlert() : this.itemAddedAlert();
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
      title: 'Success',
      icon: 'success',
      text: 'All items removed from cart.'
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2FydC9jYXJ0LXV0aWxzLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9jYXRlZ29yeS5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL3V0aWxzL3RyYW5zbGF0aW9ucy11dGlscy5qcyJdLCJuYW1lcyI6WyJjcmVhdGVDYXJ0IiwidXJsIiwiY2FydEl0ZW1zIiwiZmV0Y2giLCJtZXRob2QiLCJjcmVkZW50aWFscyIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJhZGRDYXJ0SXRlbSIsImNhcnRJZCIsImdldENhcnQiLCJkZWxldGVDYXJ0IiwiZGVsZXRlQ2FydEl0ZW0iLCJpdGVtSWQiLCJDYXRlZ29yeSIsImNvbnRleHQiLCJ2YWxpZGF0aW9uRGljdGlvbmFyeSIsImNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSIsInNldExpdmVSZWdpb25BdHRyaWJ1dGVzIiwiJGVsZW1lbnQiLCJyb2xlVHlwZSIsImFyaWFMaXZlU3RhdHVzIiwiYXR0ciIsInJvbGUiLCJtYWtlU2hvcEJ5UHJpY2VGaWx0ZXJBY2Nlc3NpYmxlIiwiJCIsImxlbmd0aCIsImhhc0NsYXNzIiwiZm9jdXMiLCJvbiIsIm9uUmVhZHkiLCJhcnJhbmdlRm9jdXNPblNvcnRCeSIsImluaXRBZGRBbGxUb0NhcnRCdG4iLCJpbml0UmVtb3ZlQWxsSXRlbXNCdG4iLCJlIiwiY3VycmVudFRhcmdldCIsIm5leHQiLCJjb21wYXJlUHJvZHVjdHMiLCJpbml0RmFjZXRlZFNlYXJjaCIsIm9uU29ydEJ5U3VibWl0IiwiYmluZCIsImhvb2tzIiwiaW5pdFByb2R1Y3RJbWFnZUhvdmVyIiwic2V0TGl2ZVJlZ2lvbnNBdHRyaWJ1dGVzIiwiYXJpYU5vdGlmeU5vUHJvZHVjdHMiLCIkaW1nIiwiZmluZCIsInNyYyIsImhvdmVyU3JjIiwicmVwbGFjZSIsImhlaWdodCIsIndpZHRoIiwiJGJ1dHRvbiIsImNhcnRVdGlscyIsImNhcnQiLCJyZW1vdmVDbGFzcyIsInN3YWwiLCJmaXJlIiwidGl0bGUiLCJpY29uIiwidGV4dCIsInNob3dDYW5jZWxCdXR0b24iLCJyZXN1bHQiLCJpc0NvbmZpcm1lZCIsInZhbCIsInByb3AiLCJpZCIsInJlcyIsImhhbmRsZUl0ZW1zUmVtb3ZlUmVzcG9uc2UiLCJkYXRhIiwibGluZUl0ZW1zIiwiZ2V0QWxsQ2F0ZWdvcnlQcm9kdWN0SWRzIiwib3JpZ2luYWxMYWJlbCIsImV4aXN0aW5nQ2FydCIsImhhbmRsZUl0ZW1BZGRSZXNwb25zZSIsIml0ZW1Db3VsZE5vdEJlQWRkZWRBbGVydCIsIml0ZW1BZGRlZEFsZXJ0IiwibG9jYXRpb24iLCJyZWxvYWQiLCJzdGF0dXMiLCJpdGVtc0NvdWxkTm90QmVSZW1vdmVkQWxlcnQiLCJpdGVtc1JlbW92ZWRBbGVydCIsImlkcyIsImVhY2giLCJpbmRleCIsImVsZSIsInB1c2giLCJtYXAiLCJxdWFudGl0eSIsInByb2R1Y3RJZCIsIiRub1Byb2R1Y3RzTWVzc2FnZSIsIm9uTWluUHJpY2VFcnJvciIsInByaWNlX21pbl9ldmFsdWF0aW9uIiwib25NYXhQcmljZUVycm9yIiwicHJpY2VfbWF4X2V2YWx1YXRpb24iLCJtaW5QcmljZU5vdEVudGVyZWQiLCJwcmljZV9taW5fbm90X2VudGVyZWQiLCJtYXhQcmljZU5vdEVudGVyZWQiLCJwcmljZV9tYXhfbm90X2VudGVyZWQiLCJvbkludmFsaWRQcmljZSIsInByaWNlX2ludmFsaWRfdmFsdWUiLCIkcHJvZHVjdExpc3RpbmdDb250YWluZXIiLCIkZmFjZXRlZFNlYXJjaENvbnRhaW5lciIsInByb2R1Y3RzUGVyUGFnZSIsImNhdGVnb3J5UHJvZHVjdHNQZXJQYWdlIiwicmVxdWVzdE9wdGlvbnMiLCJjb25maWciLCJjYXRlZ29yeSIsInNob3BfYnlfcHJpY2UiLCJwcm9kdWN0cyIsImxpbWl0IiwidGVtcGxhdGUiLCJwcm9kdWN0TGlzdGluZyIsInNpZGViYXIiLCJzaG93TW9yZSIsImZhY2V0ZWRTZWFyY2giLCJGYWNldGVkU2VhcmNoIiwiY29udGVudCIsImh0bWwiLCJ0cmlnZ2VySGFuZGxlciIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJ2YWxpZGF0aW9uRXJyb3JNZXNzYWdlcyIsIkNhdGFsb2dQYWdlIiwiVFJBTlNMQVRJT05TIiwiaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eSIsImRpY3Rpb25hcnkiLCJPYmplY3QiLCJrZXlzIiwiY2hvb3NlQWN0aXZlRGljdGlvbmFyeSIsImkiLCJwYXJzZSIsInZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiIsInZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OIiwidmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTiIsImFjdGl2ZURpY3Rpb25hcnkiLCJsb2NhbGl6YXRpb25zIiwidmFsdWVzIiwidHJhbnNsYXRpb25LZXlzIiwia2V5Iiwic3BsaXQiLCJwb3AiLCJyZWR1Y2UiLCJhY2MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFlO0FBQ2RBLFlBQVUsRUFBRSxvQkFBQ0MsR0FBRCxFQUFNQyxTQUFOLEVBQW9CO0FBQy9CLFdBQU9DLEtBQUssQ0FBQ0YsR0FBRCxFQUFNO0FBQ2pCRyxZQUFNLEVBQUUsTUFEUztBQUVqQkMsaUJBQVcsRUFBRSxhQUZJO0FBR2pCQyxhQUFPLEVBQUU7QUFDUix3QkFBZ0I7QUFEUixPQUhRO0FBTWpCQyxVQUFJLEVBQUVDLElBQUksQ0FBQ0MsU0FBTCxDQUFlUCxTQUFmO0FBTlcsS0FBTixDQUFMLENBUUxRLElBUkssQ0FRQSxVQUFDQyxRQUFEO0FBQUEsYUFBY0EsUUFBUSxDQUFDQyxJQUFULEVBQWQ7QUFBQSxLQVJBLFdBU0MsVUFBQ0MsR0FBRDtBQUFBLGFBQVNDLE9BQU8sQ0FBQ0MsS0FBUixDQUFjRixHQUFkLENBQVQ7QUFBQSxLQVRELENBQVA7QUFVQSxHQVphO0FB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QUFDQTs7O0FBQ08sSUFBTTdHLDJCQUEyQixHQUFHLFNBQTlCQSwyQkFBOEIsQ0FBQ0YsT0FBRCxFQUFhO0FBQ3BELE1BQVFxSCx3QkFBUixHQUF3R3JILE9BQXhHLENBQVFxSCx3QkFBUjtBQUFBLE1BQWtDQyxnQ0FBbEMsR0FBd0d0SCxPQUF4RyxDQUFrQ3NILGdDQUFsQztBQUFBLE1BQW9FQywrQkFBcEUsR0FBd0d2SCxPQUF4RyxDQUFvRXVILCtCQUFwRTtBQUNBLE1BQU1DLGdCQUFnQixHQUFHTixzQkFBc0IsQ0FBQ0csd0JBQUQsRUFBMkJDLGdDQUEzQixFQUE2REMsK0JBQTdELENBQS9DO0FBQ0EsTUFBTUUsYUFBYSxHQUFHVCxNQUFNLENBQUNVLE1BQVAsQ0FBY0YsZ0JBQWdCLENBQUNYLFlBQUQsQ0FBOUIsQ0FBdEI7QUFDQSxNQUFNYyxlQUFlLEdBQUdYLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZTyxnQkFBZ0IsQ0FBQ1gsWUFBRCxDQUE1QixFQUE0Q3JDLEdBQTVDLENBQWdELFVBQUFvRCxHQUFHO0FBQUEsV0FBSUEsR0FBRyxDQUFDQyxLQUFKLENBQVUsR0FBVixFQUFlQyxHQUFmLEVBQUo7QUFBQSxHQUFuRCxDQUF4QjtBQUVBLFNBQU9ILGVBQWUsQ0FBQ0ksTUFBaEIsQ0FBdUIsVUFBQ0MsR0FBRCxFQUFNSixHQUFOLEVBQVdULENBQVgsRUFBaUI7QUFDM0NhLE9BQUcsQ0FBQ0osR0FBRCxDQUFILEdBQVdILGFBQWEsQ0FBQ04sQ0FBRCxDQUF4QjtBQUNBLFdBQU9hLEdBQVA7QUFDSCxHQUhNLEVBR0osRUFISSxDQUFQO0FBSUgsQ0FWTSxDIiwiZmlsZSI6InRoZW1lLWJ1bmRsZS5jaHVuay4xMC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcblx0Y3JlYXRlQ2FydDogKHVybCwgY2FydEl0ZW1zKSA9PiB7XG5cdFx0cmV0dXJuIGZldGNoKHVybCwge1xuXHRcdFx0bWV0aG9kOiAnUE9TVCcsXG5cdFx0XHRjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcblx0XHRcdGhlYWRlcnM6IHtcblx0XHRcdFx0J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcblx0XHRcdH0sXG5cdFx0XHRib2R5OiBKU09OLnN0cmluZ2lmeShjYXJ0SXRlbXMpLFxuXHRcdH0pXG5cdFx0XHQudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcblx0XHRcdC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmVycm9yKGVycikpXG5cdH0sXG5cblx0YWRkQ2FydEl0ZW06ICh1cmwsIGNhcnRJZCwgY2FydEl0ZW1zKSA9PiB7XG5cdFx0cmV0dXJuIGZldGNoKHVybCArIGNhcnRJZCArICcvaXRlbXMvJywge1xuXHRcdFx0bWV0aG9kOiAnUE9TVCcsXG5cdFx0XHRjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcblx0XHRcdGhlYWRlcnM6IHtcblx0XHRcdFx0J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcblx0XHRcdH0sXG5cdFx0XHRib2R5OiBKU09OLnN0cmluZ2lmeShjYXJ0SXRlbXMpLFxuXHRcdH0pXG5cdFx0LnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG5cdH0sXG5cblx0Z2V0Q2FydDogKHVybCkgPT4ge1xuXHRcdHJldHVybiBmZXRjaCh1cmwsIHtcblx0XHRcdG1ldGhvZDogJ0dFVCcsXG5cdFx0XHRjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcblx0XHR9KS50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuXHR9LFxuXG5cdGRlbGV0ZUNhcnQ6ICh1cmwsIGNhcnRJZCkgPT4ge1xuXHRcdHJldHVybiBmZXRjaCh1cmwgKyBjYXJ0SWQsIHtcblx0XHRcdG1ldGhvZDogJ0RFTEVURScsXG5cdFx0XHRjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcblx0XHRcdGhlYWRlcnM6IHtcblx0XHRcdFx0J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcblx0XHRcdH0sXG5cdFx0fSkuY2F0Y2goKGVycikgPT4gY29uc29sZS5lcnJvcihlcnIpKVxuXHR9LFxuXG5cdGRlbGV0ZUNhcnRJdGVtOiAodXJsLCBjYXJ0SWQsIGl0ZW1JZCkgPT4ge1xuXHRcdHJldHVybiBmZXRjaCh1cmwgKyBjYXJ0SWQgKyAnL2l0ZW1zLycgKyBpdGVtSWQsIHtcblx0XHRcdG1ldGhvZDogJ0RFTEVURScsXG5cdFx0XHRjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcblx0XHRcdGhlYWRlcnM6IHtcblx0XHRcdFx0J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcblx0XHRcdH0sXG5cdFx0fSlcblx0XHQuY2F0Y2goKGVycikgPT4gY29uc29sZS5lcnJvcihlcnIpKVxuXHR9LFxuXG59XG4iLCJpbXBvcnQgeyBob29rcyB9IGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJ1xuaW1wb3J0IENhdGFsb2dQYWdlIGZyb20gJy4vY2F0YWxvZydcbmltcG9ydCBjb21wYXJlUHJvZHVjdHMgZnJvbSAnLi9nbG9iYWwvY29tcGFyZS1wcm9kdWN0cydcbmltcG9ydCBGYWNldGVkU2VhcmNoIGZyb20gJy4vY29tbW9uL2ZhY2V0ZWQtc2VhcmNoJ1xuaW1wb3J0IHsgY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5IH0gZnJvbSAnLi4vdGhlbWUvY29tbW9uL3V0aWxzL3RyYW5zbGF0aW9ucy11dGlscydcbmltcG9ydCBjYXJ0VXRpbHMgZnJvbSAnLi9jYXJ0L2NhcnQtdXRpbHMnXG5pbXBvcnQgc3dhbCBmcm9tICcuL2dsb2JhbC9zd2VldC1hbGVydCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2F0ZWdvcnkgZXh0ZW5kcyBDYXRhbG9nUGFnZSB7XG5cdGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcblx0XHRzdXBlcihjb250ZXh0KVxuXHRcdHRoaXMudmFsaWRhdGlvbkRpY3Rpb25hcnkgPSBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkoY29udGV4dClcblx0fVxuXG5cdHNldExpdmVSZWdpb25BdHRyaWJ1dGVzKCRlbGVtZW50LCByb2xlVHlwZSwgYXJpYUxpdmVTdGF0dXMpIHtcblx0XHQkZWxlbWVudC5hdHRyKHtcblx0XHRcdHJvbGU6IHJvbGVUeXBlLFxuXHRcdFx0J2FyaWEtbGl2ZSc6IGFyaWFMaXZlU3RhdHVzLFxuXHRcdH0pXG5cdH1cblxuXHRtYWtlU2hvcEJ5UHJpY2VGaWx0ZXJBY2Nlc3NpYmxlKCkge1xuXHRcdGlmICghJCgnW2RhdGEtc2hvcC1ieS1wcmljZV0nKS5sZW5ndGgpIHJldHVyblxuXG5cdFx0aWYgKCQoJy5uYXZMaXN0LWFjdGlvbicpLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSkge1xuXHRcdFx0JCgnYS5uYXZMaXN0LWFjdGlvbi5pcy1hY3RpdmUnKS5mb2N1cygpXG5cdFx0fVxuXG5cdFx0JCgnYS5uYXZMaXN0LWFjdGlvbicpLm9uKCdjbGljaycsICgpID0+XG5cdFx0XHR0aGlzLnNldExpdmVSZWdpb25BdHRyaWJ1dGVzKFxuXHRcdFx0XHQkKCdzcGFuLnByaWNlLWZpbHRlci1tZXNzYWdlJyksXG5cdFx0XHRcdCdzdGF0dXMnLFxuXHRcdFx0XHQnYXNzZXJ0aXZlJ1xuXHRcdFx0KVxuXHRcdClcblx0fVxuXG5cdG9uUmVhZHkoKSB7XG5cdFx0dGhpcy5hcnJhbmdlRm9jdXNPblNvcnRCeSgpXG5cdFx0dGhpcy5pbml0QWRkQWxsVG9DYXJ0QnRuKClcblx0XHR0aGlzLmluaXRSZW1vdmVBbGxJdGVtc0J0bigpXG5cdFx0JCgnW2RhdGEtYnV0dG9uLXR5cGU9XCJhZGQtY2FydFwiXScpLm9uKCdjbGljaycsIChlKSA9PlxuXHRcdFx0dGhpcy5zZXRMaXZlUmVnaW9uQXR0cmlidXRlcyhcblx0XHRcdFx0JChlLmN1cnJlbnRUYXJnZXQpLm5leHQoKSxcblx0XHRcdFx0J3N0YXR1cycsXG5cdFx0XHRcdCdwb2xpdGUnXG5cdFx0XHQpXG5cdFx0KVxuXG5cdFx0dGhpcy5tYWtlU2hvcEJ5UHJpY2VGaWx0ZXJBY2Nlc3NpYmxlKClcblxuXHRcdGNvbXBhcmVQcm9kdWN0cyh0aGlzLmNvbnRleHQpXG5cblx0XHRpZiAoJCgnI2ZhY2V0ZWRTZWFyY2gnKS5sZW5ndGggPiAwKSB7XG5cdFx0XHR0aGlzLmluaXRGYWNldGVkU2VhcmNoKClcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5vblNvcnRCeVN1Ym1pdCA9IHRoaXMub25Tb3J0QnlTdWJtaXQuYmluZCh0aGlzKVxuXHRcdFx0aG9va3Mub24oJ3NvcnRCeS1zdWJtaXR0ZWQnLCB0aGlzLm9uU29ydEJ5U3VibWl0KVxuXHRcdH1cblx0XHR0aGlzLmluaXRQcm9kdWN0SW1hZ2VIb3ZlcigpXG5cblx0XHQkKCdhLnJlc2V0LWJ0bicpLm9uKCdjbGljaycsICgpID0+XG5cdFx0XHR0aGlzLnNldExpdmVSZWdpb25zQXR0cmlidXRlcygkKCdzcGFuLnJlc2V0LW1lc3NhZ2UnKSwgJ3N0YXR1cycsICdwb2xpdGUnKVxuXHRcdClcblx0XHR0aGlzLmFyaWFOb3RpZnlOb1Byb2R1Y3RzKClcblx0fVxuXG5cdGluaXRQcm9kdWN0SW1hZ2VIb3ZlcigpIHtcblx0XHQkKCcuY2FyZC1maWd1cmUnKS5vbignbW91c2VlbnRlcicsIGZ1bmN0aW9uICgpIHtcblx0XHRcdGNvbnN0ICRpbWcgPSAkKHRoaXMpLmZpbmQoJy5jYXJkLWltYWdlJylcblx0XHRcdGNvbnN0IHNyYyA9ICRpbWcuYXR0cignc3JjJylcblx0XHRcdGNvbnN0IGhvdmVyU3JjID0gJGltZ1xuXHRcdFx0XHQuYXR0cignZGF0YS1ob3Zlci1zcmMnKVxuXHRcdFx0XHQucmVwbGFjZSgnezpzaXplfScsICQodGhpcykuaGVpZ2h0KCkgKyAneCcgKyAkKHRoaXMpLndpZHRoKCkpXG5cdFx0XHQkaW1nLmF0dHIoJ3NyY3NldCcsIGhvdmVyU3JjKVxuXG5cdFx0XHQkKHRoaXMpLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHQkaW1nLmF0dHIoJ3NyY3NldCcsIHNyYylcblx0XHRcdH0pXG5cdFx0fSlcblx0fVxuXG5cdGluaXRSZW1vdmVBbGxJdGVtc0J0bigpIHtcblx0XHRjb25zdCAkYnV0dG9uID0gJCgnLnJlbW92ZS1hbGwtY2FydC1idG4nKVxuXHRcdGNhcnRVdGlsc1xuXHRcdFx0LmdldENhcnQoXG5cdFx0XHRcdCcvYXBpL3N0b3JlZnJvbnQvY2FydC8/aW5jbHVkZT1saW5lSXRlbXMuZGlnaXRhbEl0ZW1zLm9wdGlvbnMsbGluZUl0ZW1zLnBoeXNpY2FsSXRlbXMub3B0aW9ucydcblx0XHRcdClcblx0XHRcdC50aGVuKChjYXJ0KSA9PiB7XG5cdFx0XHRcdC8vIGlmIHRoZXJlIGlzIGEgY2FydCwgc2hvdyByZW1vdmUgYWxsIGJ1dHRvblxuXHRcdFx0XHRpZiAoY2FydFswXSkge1xuXHRcdFx0XHRcdCRidXR0b24ucmVtb3ZlQ2xhc3MoJ2J1dHRvbi0taGlkZGVuJylcblx0XHRcdFx0fVxuXG5cdFx0XHRcdCRidXR0b24ub24oJ2NsaWNrJywgKCkgPT4ge1xuXHRcdFx0XHRcdC8vIGZpcmUgY29uZmlybWF0aW9uIG9mIGRlbGV0ZSBtb2RhbFxuXHRcdFx0XHRcdHN3YWxcblx0XHRcdFx0XHRcdC5maXJlKHtcblx0XHRcdFx0XHRcdFx0dGl0bGU6ICdOb3RpY2UnLFxuXHRcdFx0XHRcdFx0XHRpY29uOiAnd2FybmluZycsXG5cdFx0XHRcdFx0XHRcdHRleHQ6ICdSZW1vdmUgYWxsIGl0ZW1zIGZyb20gY2FydD8nLFxuXHRcdFx0XHRcdFx0XHRzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdC50aGVuKChyZXN1bHQpID0+IHtcblx0XHRcdFx0XHRcdFx0Ly8gaWYgdGhlIHVzZXIgY29uZmlybWVkLCBkZWxldGUgdGhlIGNhcnRcblx0XHRcdFx0XHRcdFx0aWYgKHJlc3VsdC5pc0NvbmZpcm1lZCkge1xuXHRcdFx0XHRcdFx0XHRcdC8vIGNoYW5nZSB0aGUgYnV0dG9uIGxhYmVsIGFuZCBkaXNhYmxlZCBzdGF0ZSB3aGlsZSBmZXRjaGluZ1xuXHRcdFx0XHRcdFx0XHRcdCRidXR0b24udmFsKCdSZW1vdmluZyBGcm9tIENhcnQuLi4nKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpXG5cdFx0XHRcdFx0XHRcdFx0Ly8gZGVsZXRlIHRoZSBjYXJ0XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGNhcnRbMF0uaWQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGNhcnRVdGlsc1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQuZGVsZXRlQ2FydCgnL2FwaS9zdG9yZWZyb250L2NhcnRzLycsIGNhcnRbMF0uaWQpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC50aGVuKChyZXMpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0aGlzLmhhbmRsZUl0ZW1zUmVtb3ZlUmVzcG9uc2UocmVzKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0fSlcblx0XHRcdH0pXG5cdH1cblxuXHRpbml0QWRkQWxsVG9DYXJ0QnRuKCkge1xuXHRcdGNvbnN0IGRhdGEgPSB7IGxpbmVJdGVtczogdGhpcy5nZXRBbGxDYXRlZ29yeVByb2R1Y3RJZHMoKSB9XG5cdFx0Y29uc3QgJGJ1dHRvbiA9ICQoJy5hZGQtYWxsLXRvLWNhcnQtYnRuJylcblx0XHQkYnV0dG9uLm9uKCdjbGljaycsICgpID0+IHtcblx0XHRcdC8vIGdldCB0aGUgb3JpZ2luYWwgbGFiZWwgaW4gY2FzZSB0aGUgSFRNTCBpcyBjaGFuZ2VkXG5cdFx0XHRjb25zdCBvcmlnaW5hbExhYmVsID0gJGJ1dHRvbi52YWwoKVxuXHRcdFx0Ly8gY2hhbmdlIHRoZSBidXR0b24gbGFiZWwgYW5kIGRpc2FibGUgYnV0dG9uIHdoaWxlIGZldGNoaW5nXG5cdFx0XHQkYnV0dG9uLnZhbCgnQWRkaW5nIFRvIENhcnQuLi4nKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpXG5cdFx0XHQvLyB0cnkgdG8gZ2V0IHRoZSBjdXJyZW50IGNhcnRcblx0XHRcdGNhcnRVdGlsc1xuXHRcdFx0XHQuZ2V0Q2FydChcblx0XHRcdFx0XHQnL2FwaS9zdG9yZWZyb250L2NhcnQvP2luY2x1ZGU9bGluZUl0ZW1zLmRpZ2l0YWxJdGVtcy5vcHRpb25zLGxpbmVJdGVtcy5waHlzaWNhbEl0ZW1zLm9wdGlvbnMnXG5cdFx0XHRcdClcblx0XHRcdFx0LnRoZW4oKGV4aXN0aW5nQ2FydCkgPT4ge1xuXHRcdFx0XHRcdC8vIGlmIGNhcnQgZXhpc3RzLCBhZGQgaXRlbXMsIGlmIGNhcnQgZG9lcyBub3QgZXhpc3QsIGNyZWF0ZSBhbmQgYWRkIGl0ZW1zXG5cdFx0XHRcdFx0aWYgKGV4aXN0aW5nQ2FydFswXT8uaWQpIHtcblx0XHRcdFx0XHRcdGNhcnRVdGlsc1xuXHRcdFx0XHRcdFx0XHQuYWRkQ2FydEl0ZW0oJy9hcGkvc3RvcmVmcm9udC9jYXJ0cy8nLCBleGlzdGluZ0NhcnRbMF0uaWQsIGRhdGEpXG5cdFx0XHRcdFx0XHRcdC50aGVuKChyZXNwb25zZSkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuaGFuZGxlSXRlbUFkZFJlc3BvbnNlKHJlc3BvbnNlKVxuXHRcdFx0XHRcdFx0XHRcdCRidXR0b24ucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSkudmFsKG9yaWdpbmFsTGFiZWwpXG5cdFx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHRcdC5jYXRjaCgoZXJyKSA9PiB0aGlzLml0ZW1Db3VsZE5vdEJlQWRkZWRBbGVydCgpKVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRjYXJ0VXRpbHNcblx0XHRcdFx0XHRcdFx0LmNyZWF0ZUNhcnQoJy9hcGkvc3RvcmVmcm9udC9jYXJ0JywgZGF0YSlcblx0XHRcdFx0XHRcdFx0LnRoZW4oKHJlc3BvbnNlKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5oYW5kbGVJdGVtQWRkUmVzcG9uc2UocmVzcG9uc2UpXG5cdFx0XHRcdFx0XHRcdFx0JGJ1dHRvbi5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKS52YWwob3JpZ2luYWxMYWJlbClcblx0XHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdFx0LmNhdGNoKChlcnIpID0+IHRoaXMuaXRlbUNvdWxkTm90QmVBZGRlZEFsZXJ0KCkpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXHRcdH0pXG5cdH1cblxuXHRpdGVtQ291bGROb3RCZUFkZGVkQWxlcnQoKSB7XG5cdFx0c3dhbC5maXJlKHtcblx0XHRcdHRpdGxlOiAnRXJyb3InLFxuXHRcdFx0aWNvbjogJ2Vycm9yJyxcblx0XHRcdHRleHQ6ICdGYWlsZWQgdG8gYWRkIGl0ZW1zIHRvIGNhcnQuIFNvbWUgaXRlbXMgbWF5IHJlcXVpcmUgYWRkaXRpb25hbCBvcHRpb25zIHRvIGJlIHNlbGVjdGVkLicsXG5cdFx0fSlcblx0fVxuXG5cdGl0ZW1BZGRlZEFsZXJ0KCkge1xuXHRcdHN3YWxcblx0XHRcdC5maXJlKHtcblx0XHRcdFx0dGl0bGU6ICdTdWNjZXNzJyxcblx0XHRcdFx0aWNvbjogJ3N1Y2Nlc3MnLFxuXHRcdFx0XHR0ZXh0OiAnQWxsIGl0ZW1zIGFkZGVkIHRvIGNhcnQuJyxcblx0XHRcdH0pXG5cdFx0XHQudGhlbigocmVzdWx0KSA9PiBsb2NhdGlvbi5yZWxvYWQoKSlcblx0fVxuXG5cdGhhbmRsZUl0ZW1BZGRSZXNwb25zZShyZXNwb25zZSkge1xuXHRcdHJldHVybiByZXNwb25zZS5zdGF0dXMgPT09IDQwNCB8fCByZXNwb25zZS5zdGF0dXMgPT09IDQyMlxuXHRcdFx0PyB0aGlzLml0ZW1Db3VsZE5vdEJlQWRkZWRBbGVydCgpXG5cdFx0XHQ6IHRoaXMuaXRlbUFkZGVkQWxlcnQoKVxuXHR9XG5cblx0aXRlbXNDb3VsZE5vdEJlUmVtb3ZlZEFsZXJ0KCkge1xuXHRcdHN3YWwuZmlyZSh7XG5cdFx0XHR0aXRsZTogJ0Vycm9yJyxcblx0XHRcdGljb246ICdlcnJvcicsXG5cdFx0XHR0ZXh0OiAnRmFpbGVkIHRvIHJlbW92ZSBpdGVtcyBmcm9tIGNhcnQsIHBsZWFzZSB0cnkgYWdhaW4uJyxcblx0XHR9KVxuXHR9XG5cblx0aXRlbXNSZW1vdmVkQWxlcnQoKSB7XG5cdFx0c3dhbFxuXHRcdFx0LmZpcmUoe1xuXHRcdFx0XHR0aXRsZTogJ1N1Y2Nlc3MnLFxuXHRcdFx0XHRpY29uOiAnc3VjY2VzcycsXG5cdFx0XHRcdHRleHQ6ICdBbGwgaXRlbXMgcmVtb3ZlZCBmcm9tIGNhcnQuJyxcblx0XHRcdH0pXG5cdFx0XHQudGhlbigocmVzdWx0KSA9PiBsb2NhdGlvbi5yZWxvYWQoKSlcblx0fVxuXG5cdGhhbmRsZUl0ZW1zUmVtb3ZlUmVzcG9uc2UocmVzcG9uc2UpIHtcblx0XHRyZXR1cm4gcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDRcblx0XHRcdD8gdGhpcy5pdGVtc0NvdWxkTm90QmVSZW1vdmVkQWxlcnQoKVxuXHRcdFx0OiB0aGlzLml0ZW1zUmVtb3ZlZEFsZXJ0KClcblx0fVxuXG5cdGdldEFsbENhdGVnb3J5UHJvZHVjdElkcygpIHtcblx0XHRjb25zdCBpZHMgPSBbXVxuXHRcdC8vIHB1bGwgaWQncyBmb3IgZWFjaCBpdGVtIG9uIHRoZSBwYWdlXG5cdFx0JCgnW2RhdGEtcHJvZHVjdC1pZF0nKS5lYWNoKChpbmRleCwgZWxlKSA9PiB7XG5cdFx0XHRpZHMucHVzaCgkKGVsZSkuYXR0cignZGF0YS1wcm9kdWN0LWlkJykpXG5cdFx0fSlcblxuXHRcdHJldHVybiBpZHMubWFwKChpZCkgPT4gKHtcblx0XHRcdHF1YW50aXR5OiAxLFxuXHRcdFx0cHJvZHVjdElkOiBpZCxcblx0XHR9KSlcblx0fVxuXG5cdGFyaWFOb3RpZnlOb1Byb2R1Y3RzKCkge1xuXHRcdGNvbnN0ICRub1Byb2R1Y3RzTWVzc2FnZSA9ICQoJ1tkYXRhLW5vLXByb2R1Y3RzLW5vdGlmaWNhdGlvbl0nKVxuXHRcdGlmICgkbm9Qcm9kdWN0c01lc3NhZ2UubGVuZ3RoKSB7XG5cdFx0XHQkbm9Qcm9kdWN0c01lc3NhZ2UuZm9jdXMoKVxuXHRcdH1cblx0fVxuXG5cdGluaXRGYWNldGVkU2VhcmNoKCkge1xuXHRcdGNvbnN0IHtcblx0XHRcdHByaWNlX21pbl9ldmFsdWF0aW9uOiBvbk1pblByaWNlRXJyb3IsXG5cdFx0XHRwcmljZV9tYXhfZXZhbHVhdGlvbjogb25NYXhQcmljZUVycm9yLFxuXHRcdFx0cHJpY2VfbWluX25vdF9lbnRlcmVkOiBtaW5QcmljZU5vdEVudGVyZWQsXG5cdFx0XHRwcmljZV9tYXhfbm90X2VudGVyZWQ6IG1heFByaWNlTm90RW50ZXJlZCxcblx0XHRcdHByaWNlX2ludmFsaWRfdmFsdWU6IG9uSW52YWxpZFByaWNlLFxuXHRcdH0gPSB0aGlzLnZhbGlkYXRpb25EaWN0aW9uYXJ5XG5cdFx0Y29uc3QgJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyID0gJCgnI3Byb2R1Y3QtbGlzdGluZy1jb250YWluZXInKVxuXHRcdGNvbnN0ICRmYWNldGVkU2VhcmNoQ29udGFpbmVyID0gJCgnI2ZhY2V0ZWQtc2VhcmNoLWNvbnRhaW5lcicpXG5cdFx0Y29uc3QgcHJvZHVjdHNQZXJQYWdlID0gdGhpcy5jb250ZXh0LmNhdGVnb3J5UHJvZHVjdHNQZXJQYWdlXG5cdFx0Y29uc3QgcmVxdWVzdE9wdGlvbnMgPSB7XG5cdFx0XHRjb25maWc6IHtcblx0XHRcdFx0Y2F0ZWdvcnk6IHtcblx0XHRcdFx0XHRzaG9wX2J5X3ByaWNlOiB0cnVlLFxuXHRcdFx0XHRcdHByb2R1Y3RzOiB7XG5cdFx0XHRcdFx0XHRsaW1pdDogcHJvZHVjdHNQZXJQYWdlLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdH0sXG5cdFx0XHR9LFxuXHRcdFx0dGVtcGxhdGU6IHtcblx0XHRcdFx0cHJvZHVjdExpc3Rpbmc6ICdjYXRlZ29yeS9wcm9kdWN0LWxpc3RpbmcnLFxuXHRcdFx0XHRzaWRlYmFyOiAnY2F0ZWdvcnkvc2lkZWJhcicsXG5cdFx0XHR9LFxuXHRcdFx0c2hvd01vcmU6ICdjYXRlZ29yeS9zaG93LW1vcmUnLFxuXHRcdH1cblxuXHRcdHRoaXMuZmFjZXRlZFNlYXJjaCA9IG5ldyBGYWNldGVkU2VhcmNoKFxuXHRcdFx0cmVxdWVzdE9wdGlvbnMsXG5cdFx0XHQoY29udGVudCkgPT4ge1xuXHRcdFx0XHQkcHJvZHVjdExpc3RpbmdDb250YWluZXIuaHRtbChjb250ZW50LnByb2R1Y3RMaXN0aW5nKVxuXHRcdFx0XHQkZmFjZXRlZFNlYXJjaENvbnRhaW5lci5odG1sKGNvbnRlbnQuc2lkZWJhcilcblxuXHRcdFx0XHQkKCdib2R5JykudHJpZ2dlckhhbmRsZXIoJ2NvbXBhcmVSZXNldCcpXG5cblx0XHRcdFx0JCgnaHRtbCwgYm9keScpLmFuaW1hdGUoXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0c2Nyb2xsVG9wOiAwLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0MTAwXG5cdFx0XHRcdClcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHZhbGlkYXRpb25FcnJvck1lc3NhZ2VzOiB7XG5cdFx0XHRcdFx0b25NaW5QcmljZUVycm9yLFxuXHRcdFx0XHRcdG9uTWF4UHJpY2VFcnJvcixcblx0XHRcdFx0XHRtaW5QcmljZU5vdEVudGVyZWQsXG5cdFx0XHRcdFx0bWF4UHJpY2VOb3RFbnRlcmVkLFxuXHRcdFx0XHRcdG9uSW52YWxpZFByaWNlLFxuXHRcdFx0XHR9LFxuXHRcdFx0fVxuXHRcdClcblx0fVxufVxuIiwiY29uc3QgVFJBTlNMQVRJT05TID0gJ3RyYW5zbGF0aW9ucyc7XG5jb25zdCBpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5ID0gKGRpY3Rpb25hcnkpID0+ICEhT2JqZWN0LmtleXMoZGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKS5sZW5ndGg7XG5jb25zdCBjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5ID0gKC4uLmRpY3Rpb25hcnlKc29uTGlzdCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGljdGlvbmFyeUpzb25MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGRpY3Rpb25hcnkgPSBKU09OLnBhcnNlKGRpY3Rpb25hcnlKc29uTGlzdFtpXSk7XG4gICAgICAgIGlmIChpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5KGRpY3Rpb25hcnkpKSB7XG4gICAgICAgICAgICByZXR1cm4gZGljdGlvbmFyeTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbi8qKlxuICogZGVmaW5lcyBUcmFuc2xhdGlvbiBEaWN0aW9uYXJ5IHRvIHVzZVxuICogQHBhcmFtIGNvbnRleHQgcHJvdmlkZXMgYWNjZXNzIHRvIDMgdmFsaWRhdGlvbiBKU09OcyBmcm9tIGVuLmpzb246XG4gKiB2YWxpZGF0aW9uX21lc3NhZ2VzLCB2YWxpZGF0aW9uX2ZhbGxiYWNrX21lc3NhZ2VzIGFuZCBkZWZhdWx0X21lc3NhZ2VzXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5ID0gKGNvbnRleHQpID0+IHtcbiAgICBjb25zdCB7IHZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04gfSA9IGNvbnRleHQ7XG4gICAgY29uc3QgYWN0aXZlRGljdGlvbmFyeSA9IGNob29zZUFjdGl2ZURpY3Rpb25hcnkodmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTik7XG4gICAgY29uc3QgbG9jYWxpemF0aW9ucyA9IE9iamVjdC52YWx1ZXMoYWN0aXZlRGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKTtcbiAgICBjb25zdCB0cmFuc2xhdGlvbktleXMgPSBPYmplY3Qua2V5cyhhY3RpdmVEaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pLm1hcChrZXkgPT4ga2V5LnNwbGl0KCcuJykucG9wKCkpO1xuXG4gICAgcmV0dXJuIHRyYW5zbGF0aW9uS2V5cy5yZWR1Y2UoKGFjYywga2V5LCBpKSA9PiB7XG4gICAgICAgIGFjY1trZXldID0gbG9jYWxpemF0aW9uc1tpXTtcbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSk7XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==