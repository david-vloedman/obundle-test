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
    _cart_cart_utils__WEBPACK_IMPORTED_MODULE_5__["default"].getCart('/api/storefront/cart/?include=lineItems.digitalItems.options,lineItems.physicalItems.options').then(function (carts) {
      var cart = carts.pop(); // if there is a cart, show remove all button

      if (cart != null && cart.id) {
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

            if (cart.id) {
              _cart_cart_utils__WEBPACK_IMPORTED_MODULE_5__["default"].deleteCart('/api/storefront/carts/', cart.id).then(function (res) {
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
      text: 'Failed to add items to cart. Some items may require additional options to be selected. '
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2FydC9jYXJ0LXV0aWxzLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9jYXRlZ29yeS5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL3V0aWxzL3RyYW5zbGF0aW9ucy11dGlscy5qcyJdLCJuYW1lcyI6WyJjcmVhdGVDYXJ0IiwidXJsIiwiY2FydEl0ZW1zIiwiZmV0Y2giLCJtZXRob2QiLCJjcmVkZW50aWFscyIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJhZGRDYXJ0SXRlbSIsImNhcnRJZCIsImdldENhcnQiLCJkZWxldGVDYXJ0IiwiZGVsZXRlQ2FydEl0ZW0iLCJpdGVtSWQiLCJDYXRlZ29yeSIsImNvbnRleHQiLCJ2YWxpZGF0aW9uRGljdGlvbmFyeSIsImNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSIsInNldExpdmVSZWdpb25BdHRyaWJ1dGVzIiwiJGVsZW1lbnQiLCJyb2xlVHlwZSIsImFyaWFMaXZlU3RhdHVzIiwiYXR0ciIsInJvbGUiLCJtYWtlU2hvcEJ5UHJpY2VGaWx0ZXJBY2Nlc3NpYmxlIiwiJCIsImxlbmd0aCIsImhhc0NsYXNzIiwiZm9jdXMiLCJvbiIsIm9uUmVhZHkiLCJhcnJhbmdlRm9jdXNPblNvcnRCeSIsImluaXRBZGRBbGxUb0NhcnRCdG4iLCJpbml0UmVtb3ZlQWxsSXRlbXNCdG4iLCJlIiwiY3VycmVudFRhcmdldCIsIm5leHQiLCJjb21wYXJlUHJvZHVjdHMiLCJpbml0RmFjZXRlZFNlYXJjaCIsIm9uU29ydEJ5U3VibWl0IiwiYmluZCIsImhvb2tzIiwiaW5pdFByb2R1Y3RJbWFnZUhvdmVyIiwic2V0TGl2ZVJlZ2lvbnNBdHRyaWJ1dGVzIiwiYXJpYU5vdGlmeU5vUHJvZHVjdHMiLCIkaW1nIiwiZmluZCIsInNyYyIsImhvdmVyU3JjIiwicmVwbGFjZSIsImhlaWdodCIsIndpZHRoIiwiJGJ1dHRvbiIsImNhcnRVdGlscyIsImNhcnRzIiwiY2FydCIsInBvcCIsImlkIiwicmVtb3ZlQ2xhc3MiLCJzd2FsIiwiZmlyZSIsInRpdGxlIiwiaWNvbiIsInRleHQiLCJzaG93Q2FuY2VsQnV0dG9uIiwicmVzdWx0IiwiaXNDb25maXJtZWQiLCJ2YWwiLCJwcm9wIiwicmVzIiwiaGFuZGxlSXRlbXNSZW1vdmVSZXNwb25zZSIsImRhdGEiLCJsaW5lSXRlbXMiLCJnZXRBbGxDYXRlZ29yeVByb2R1Y3RJZHMiLCJvcmlnaW5hbExhYmVsIiwiZXhpc3RpbmdDYXJ0IiwiaGFuZGxlSXRlbUFkZFJlc3BvbnNlIiwiaXRlbUNvdWxkTm90QmVBZGRlZEFsZXJ0IiwiaXRlbUFkZGVkQWxlcnQiLCJsb2NhdGlvbiIsInJlbG9hZCIsInN0YXR1cyIsIml0ZW1zQ291bGROb3RCZVJlbW92ZWRBbGVydCIsIml0ZW1zUmVtb3ZlZEFsZXJ0IiwiaWRzIiwiZWFjaCIsImluZGV4IiwiZWxlIiwicHVzaCIsIm1hcCIsInF1YW50aXR5IiwicHJvZHVjdElkIiwiJG5vUHJvZHVjdHNNZXNzYWdlIiwib25NaW5QcmljZUVycm9yIiwicHJpY2VfbWluX2V2YWx1YXRpb24iLCJvbk1heFByaWNlRXJyb3IiLCJwcmljZV9tYXhfZXZhbHVhdGlvbiIsIm1pblByaWNlTm90RW50ZXJlZCIsInByaWNlX21pbl9ub3RfZW50ZXJlZCIsIm1heFByaWNlTm90RW50ZXJlZCIsInByaWNlX21heF9ub3RfZW50ZXJlZCIsIm9uSW52YWxpZFByaWNlIiwicHJpY2VfaW52YWxpZF92YWx1ZSIsIiRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lciIsIiRmYWNldGVkU2VhcmNoQ29udGFpbmVyIiwicHJvZHVjdHNQZXJQYWdlIiwiY2F0ZWdvcnlQcm9kdWN0c1BlclBhZ2UiLCJyZXF1ZXN0T3B0aW9ucyIsImNvbmZpZyIsImNhdGVnb3J5Iiwic2hvcF9ieV9wcmljZSIsInByb2R1Y3RzIiwibGltaXQiLCJ0ZW1wbGF0ZSIsInByb2R1Y3RMaXN0aW5nIiwic2lkZWJhciIsInNob3dNb3JlIiwiZmFjZXRlZFNlYXJjaCIsIkZhY2V0ZWRTZWFyY2giLCJjb250ZW50IiwiaHRtbCIsInRyaWdnZXJIYW5kbGVyIiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsInZhbGlkYXRpb25FcnJvck1lc3NhZ2VzIiwiQ2F0YWxvZ1BhZ2UiLCJUUkFOU0xBVElPTlMiLCJpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5IiwiZGljdGlvbmFyeSIsIk9iamVjdCIsImtleXMiLCJjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5IiwiaSIsInBhcnNlIiwidmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OIiwidmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04iLCJ2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OIiwiYWN0aXZlRGljdGlvbmFyeSIsImxvY2FsaXphdGlvbnMiLCJ2YWx1ZXMiLCJ0cmFuc2xhdGlvbktleXMiLCJrZXkiLCJzcGxpdCIsInJlZHVjZSIsImFjYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQWU7QUFDZEEsWUFBVSxFQUFFLG9CQUFDQyxHQUFELEVBQU1DLFNBQU4sRUFBb0I7QUFDL0IsV0FBT0MsS0FBSyxDQUFDRixHQUFELEVBQU07QUFDakJHLFlBQU0sRUFBRSxNQURTO0FBRWpCQyxpQkFBVyxFQUFFLGFBRkk7QUFHakJDLGFBQU8sRUFBRTtBQUNSLHdCQUFnQjtBQURSLE9BSFE7QUFNakJDLFVBQUksRUFBRUMsSUFBSSxDQUFDQyxTQUFMLENBQWVQLFNBQWY7QUFOVyxLQUFOLENBQUwsQ0FRTFEsSUFSSyxDQVFBLFVBQUNDLFFBQUQ7QUFBQSxhQUFjQSxRQUFRLENBQUNDLElBQVQsRUFBZDtBQUFBLEtBUkEsV0FTQyxVQUFDQyxHQUFEO0FBQUEsYUFBU0MsT0FBTyxDQUFDQyxLQUFSLENBQWNGLEdBQWQsQ0FBVDtBQUFBLEtBVEQsQ0FBUDtBQVVB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Q0o7QUFDSixDQVBEO0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDTyxJQUFNL0csMkJBQTJCLEdBQUcsU0FBOUJBLDJCQUE4QixDQUFDRixPQUFELEVBQWE7QUFDcEQsTUFBUXVILHdCQUFSLEdBQXdHdkgsT0FBeEcsQ0FBUXVILHdCQUFSO0FBQUEsTUFBa0NDLGdDQUFsQyxHQUF3R3hILE9BQXhHLENBQWtDd0gsZ0NBQWxDO0FBQUEsTUFBb0VDLCtCQUFwRSxHQUF3R3pILE9BQXhHLENBQW9FeUgsK0JBQXBFO0FBQ0EsTUFBTUMsZ0JBQWdCLEdBQUdOLHNCQUFzQixDQUFDRyx3QkFBRCxFQUEyQkMsZ0NBQTNCLEVBQTZEQywrQkFBN0QsQ0FBL0M7QUFDQSxNQUFNRSxhQUFhLEdBQUdULE1BQU0sQ0FBQ1UsTUFBUCxDQUFjRixnQkFBZ0IsQ0FBQ1gsWUFBRCxDQUE5QixDQUF0QjtBQUNBLE1BQU1jLGVBQWUsR0FBR1gsTUFBTSxDQUFDQyxJQUFQLENBQVlPLGdCQUFnQixDQUFDWCxZQUFELENBQTVCLEVBQTRDckMsR0FBNUMsQ0FBZ0QsVUFBQW9ELEdBQUc7QUFBQSxXQUFJQSxHQUFHLENBQUNDLEtBQUosQ0FBVSxHQUFWLEVBQWV0RixHQUFmLEVBQUo7QUFBQSxHQUFuRCxDQUF4QjtBQUVBLFNBQU9vRixlQUFlLENBQUNHLE1BQWhCLENBQXVCLFVBQUNDLEdBQUQsRUFBTUgsR0FBTixFQUFXVCxDQUFYLEVBQWlCO0FBQzNDWSxPQUFHLENBQUNILEdBQUQsQ0FBSCxHQUFXSCxhQUFhLENBQUNOLENBQUQsQ0FBeEI7QUFDQSxXQUFPWSxHQUFQO0FBQ0gsR0FITSxFQUdKLEVBSEksQ0FBUDtBQUlILENBVk0sQyIsImZpbGUiOiJ0aGVtZS1idW5kbGUuY2h1bmsuMTAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XG5cdGNyZWF0ZUNhcnQ6ICh1cmwsIGNhcnRJdGVtcykgPT4ge1xuXHRcdHJldHVybiBmZXRjaCh1cmwsIHtcblx0XHRcdG1ldGhvZDogJ1BPU1QnLFxuXHRcdFx0Y3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicsXG5cdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdCdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG5cdFx0XHR9LFxuXHRcdFx0Ym9keTogSlNPTi5zdHJpbmdpZnkoY2FydEl0ZW1zKSxcblx0XHR9KVxuXHRcdFx0LnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG5cdFx0XHQuY2F0Y2goKGVycikgPT4gY29uc29sZS5lcnJvcihlcnIpKVxuXHR9LFxuXG5cdGFkZENhcnRJdGVtOiAodXJsLCBjYXJ0SWQsIGNhcnRJdGVtcykgPT4ge1xuXHRcdHJldHVybiBmZXRjaCh1cmwgKyBjYXJ0SWQgKyAnL2l0ZW1zLycsIHtcblx0XHRcdG1ldGhvZDogJ1BPU1QnLFxuXHRcdFx0Y3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicsXG5cdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdCdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG5cdFx0XHR9LFxuXHRcdFx0Ym9keTogSlNPTi5zdHJpbmdpZnkoY2FydEl0ZW1zKSxcblx0XHR9KVxuXHRcdC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuXHR9LFxuXG5cdGdldENhcnQ6ICh1cmwpID0+IHtcblx0XHRyZXR1cm4gZmV0Y2godXJsLCB7XG5cdFx0XHRtZXRob2Q6ICdHRVQnLFxuXHRcdFx0Y3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicsXG5cdFx0fSkudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcblx0fSxcblxuXHRkZWxldGVDYXJ0OiAodXJsLCBjYXJ0SWQpID0+IHtcblx0XHRyZXR1cm4gZmV0Y2godXJsICsgY2FydElkLCB7XG5cdFx0XHRtZXRob2Q6ICdERUxFVEUnLFxuXHRcdFx0Y3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicsXG5cdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdCdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG5cdFx0XHR9LFxuXHRcdH0pLmNhdGNoKChlcnIpID0+IGNvbnNvbGUuZXJyb3IoZXJyKSlcblx0fSxcblxuXHRkZWxldGVDYXJ0SXRlbTogKHVybCwgY2FydElkLCBpdGVtSWQpID0+IHtcblx0XHRyZXR1cm4gZmV0Y2godXJsICsgY2FydElkICsgJy9pdGVtcy8nICsgaXRlbUlkLCB7XG5cdFx0XHRtZXRob2Q6ICdERUxFVEUnLFxuXHRcdFx0Y3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicsXG5cdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdCdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG5cdFx0XHR9LFxuXHRcdH0pXG5cdFx0LmNhdGNoKChlcnIpID0+IGNvbnNvbGUuZXJyb3IoZXJyKSlcblx0fSxcblxufVxuIiwiaW1wb3J0IHsgaG9va3MgfSBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscydcbmltcG9ydCBDYXRhbG9nUGFnZSBmcm9tICcuL2NhdGFsb2cnXG5pbXBvcnQgY29tcGFyZVByb2R1Y3RzIGZyb20gJy4vZ2xvYmFsL2NvbXBhcmUtcHJvZHVjdHMnXG5pbXBvcnQgRmFjZXRlZFNlYXJjaCBmcm9tICcuL2NvbW1vbi9mYWNldGVkLXNlYXJjaCdcbmltcG9ydCB7IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSB9IGZyb20gJy4uL3RoZW1lL2NvbW1vbi91dGlscy90cmFuc2xhdGlvbnMtdXRpbHMnXG5pbXBvcnQgY2FydFV0aWxzIGZyb20gJy4vY2FydC9jYXJ0LXV0aWxzJ1xuaW1wb3J0IHN3YWwgZnJvbSAnLi9nbG9iYWwvc3dlZXQtYWxlcnQnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhdGVnb3J5IGV4dGVuZHMgQ2F0YWxvZ1BhZ2Uge1xuXHRjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG5cdFx0c3VwZXIoY29udGV4dClcblx0XHR0aGlzLnZhbGlkYXRpb25EaWN0aW9uYXJ5ID0gY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5KGNvbnRleHQpXG5cdH1cblxuXHRzZXRMaXZlUmVnaW9uQXR0cmlidXRlcygkZWxlbWVudCwgcm9sZVR5cGUsIGFyaWFMaXZlU3RhdHVzKSB7XG5cdFx0JGVsZW1lbnQuYXR0cih7XG5cdFx0XHRyb2xlOiByb2xlVHlwZSxcblx0XHRcdCdhcmlhLWxpdmUnOiBhcmlhTGl2ZVN0YXR1cyxcblx0XHR9KVxuXHR9XG5cblx0bWFrZVNob3BCeVByaWNlRmlsdGVyQWNjZXNzaWJsZSgpIHtcblx0XHRpZiAoISQoJ1tkYXRhLXNob3AtYnktcHJpY2VdJykubGVuZ3RoKSByZXR1cm5cblxuXHRcdGlmICgkKCcubmF2TGlzdC1hY3Rpb24nKS5oYXNDbGFzcygnaXMtYWN0aXZlJykpIHtcblx0XHRcdCQoJ2EubmF2TGlzdC1hY3Rpb24uaXMtYWN0aXZlJykuZm9jdXMoKVxuXHRcdH1cblxuXHRcdCQoJ2EubmF2TGlzdC1hY3Rpb24nKS5vbignY2xpY2snLCAoKSA9PlxuXHRcdFx0dGhpcy5zZXRMaXZlUmVnaW9uQXR0cmlidXRlcyhcblx0XHRcdFx0JCgnc3Bhbi5wcmljZS1maWx0ZXItbWVzc2FnZScpLFxuXHRcdFx0XHQnc3RhdHVzJyxcblx0XHRcdFx0J2Fzc2VydGl2ZSdcblx0XHRcdClcblx0XHQpXG5cdH1cblxuXHRvblJlYWR5KCkge1xuXHRcdHRoaXMuYXJyYW5nZUZvY3VzT25Tb3J0QnkoKVxuXHRcdHRoaXMuaW5pdEFkZEFsbFRvQ2FydEJ0bigpXG5cdFx0dGhpcy5pbml0UmVtb3ZlQWxsSXRlbXNCdG4oKVxuXHRcdCQoJ1tkYXRhLWJ1dHRvbi10eXBlPVwiYWRkLWNhcnRcIl0nKS5vbignY2xpY2snLCAoZSkgPT5cblx0XHRcdHRoaXMuc2V0TGl2ZVJlZ2lvbkF0dHJpYnV0ZXMoXG5cdFx0XHRcdCQoZS5jdXJyZW50VGFyZ2V0KS5uZXh0KCksXG5cdFx0XHRcdCdzdGF0dXMnLFxuXHRcdFx0XHQncG9saXRlJ1xuXHRcdFx0KVxuXHRcdClcblxuXHRcdHRoaXMubWFrZVNob3BCeVByaWNlRmlsdGVyQWNjZXNzaWJsZSgpXG5cblx0XHRjb21wYXJlUHJvZHVjdHModGhpcy5jb250ZXh0KVxuXG5cdFx0aWYgKCQoJyNmYWNldGVkU2VhcmNoJykubGVuZ3RoID4gMCkge1xuXHRcdFx0dGhpcy5pbml0RmFjZXRlZFNlYXJjaCgpXG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMub25Tb3J0QnlTdWJtaXQgPSB0aGlzLm9uU29ydEJ5U3VibWl0LmJpbmQodGhpcylcblx0XHRcdGhvb2tzLm9uKCdzb3J0Qnktc3VibWl0dGVkJywgdGhpcy5vblNvcnRCeVN1Ym1pdClcblx0XHR9XG5cdFx0dGhpcy5pbml0UHJvZHVjdEltYWdlSG92ZXIoKVxuXG5cdFx0JCgnYS5yZXNldC1idG4nKS5vbignY2xpY2snLCAoKSA9PlxuXHRcdFx0dGhpcy5zZXRMaXZlUmVnaW9uc0F0dHJpYnV0ZXMoJCgnc3Bhbi5yZXNldC1tZXNzYWdlJyksICdzdGF0dXMnLCAncG9saXRlJylcblx0XHQpXG5cdFx0dGhpcy5hcmlhTm90aWZ5Tm9Qcm9kdWN0cygpXG5cdH1cblxuXHRpbml0UHJvZHVjdEltYWdlSG92ZXIoKSB7XG5cdFx0JCgnLmNhcmQtZmlndXJlJykub24oJ21vdXNlZW50ZXInLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRjb25zdCAkaW1nID0gJCh0aGlzKS5maW5kKCcuY2FyZC1pbWFnZScpXG5cdFx0XHRjb25zdCBzcmMgPSAkaW1nLmF0dHIoJ3NyYycpXG5cdFx0XHRjb25zdCBob3ZlclNyYyA9ICRpbWdcblx0XHRcdFx0LmF0dHIoJ2RhdGEtaG92ZXItc3JjJylcblx0XHRcdFx0LnJlcGxhY2UoJ3s6c2l6ZX0nLCAkKHRoaXMpLmhlaWdodCgpICsgJ3gnICsgJCh0aGlzKS53aWR0aCgpKVxuXHRcdFx0JGltZy5hdHRyKCdzcmNzZXQnLCBob3ZlclNyYylcblxuXHRcdFx0JCh0aGlzKS5vbignbW91c2VsZWF2ZScsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0JGltZy5hdHRyKCdzcmNzZXQnLCBzcmMpXG5cdFx0XHR9KVxuXHRcdH0pXG5cdH1cblxuXHRpbml0UmVtb3ZlQWxsSXRlbXNCdG4oKSB7XG5cdFx0Y29uc3QgJGJ1dHRvbiA9ICQoJy5yZW1vdmUtYWxsLWNhcnQtYnRuJylcblx0XHRjYXJ0VXRpbHNcblx0XHRcdC5nZXRDYXJ0KFxuXHRcdFx0XHQnL2FwaS9zdG9yZWZyb250L2NhcnQvP2luY2x1ZGU9bGluZUl0ZW1zLmRpZ2l0YWxJdGVtcy5vcHRpb25zLGxpbmVJdGVtcy5waHlzaWNhbEl0ZW1zLm9wdGlvbnMnXG5cdFx0XHQpXG5cdFx0XHQudGhlbigoY2FydHMpID0+IHtcblx0XHRcdFx0Y29uc3QgY2FydCA9IGNhcnRzLnBvcCgpXG5cdFx0XHRcdC8vIGlmIHRoZXJlIGlzIGEgY2FydCwgc2hvdyByZW1vdmUgYWxsIGJ1dHRvblxuXHRcdFx0XHRpZiAoY2FydD8uaWQpIHtcblx0XHRcdFx0XHQkYnV0dG9uLnJlbW92ZUNsYXNzKCdidXR0b24tLWhpZGRlbicpXG5cdFx0XHRcdH1cblxuXHRcdFx0XHQkYnV0dG9uLm9uKCdjbGljaycsICgpID0+IHtcblx0XHRcdFx0XHQvLyBmaXJlIGNvbmZpcm1hdGlvbiBvZiBkZWxldGUgbW9kYWxcblx0XHRcdFx0XHRzd2FsXG5cdFx0XHRcdFx0XHQuZmlyZSh7XG5cdFx0XHRcdFx0XHRcdHRpdGxlOiAnTm90aWNlJyxcblx0XHRcdFx0XHRcdFx0aWNvbjogJ3dhcm5pbmcnLFxuXHRcdFx0XHRcdFx0XHR0ZXh0OiAnUmVtb3ZlIGFsbCBpdGVtcyBmcm9tIGNhcnQ/Jyxcblx0XHRcdFx0XHRcdFx0c2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHQudGhlbigocmVzdWx0KSA9PiB7XG5cdFx0XHRcdFx0XHRcdC8vIGlmIHRoZSB1c2VyIGNvbmZpcm1lZCwgZGVsZXRlIHRoZSBjYXJ0XG5cdFx0XHRcdFx0XHRcdGlmIChyZXN1bHQuaXNDb25maXJtZWQpIHtcblx0XHRcdFx0XHRcdFx0XHQvLyBjaGFuZ2UgdGhlIGJ1dHRvbiBsYWJlbCBhbmQgZGlzYWJsZWQgc3RhdGUgd2hpbGUgZmV0Y2hpbmdcblx0XHRcdFx0XHRcdFx0XHQkYnV0dG9uLnZhbCgnUmVtb3ZpbmcgRnJvbSBDYXJ0Li4uJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKVxuXHRcdFx0XHRcdFx0XHRcdC8vIGRlbGV0ZSB0aGUgY2FydFxuXHRcdFx0XHRcdFx0XHRcdGlmIChjYXJ0LmlkKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRjYXJ0VXRpbHNcblx0XHRcdFx0XHRcdFx0XHRcdFx0LmRlbGV0ZUNhcnQoJy9hcGkvc3RvcmVmcm9udC9jYXJ0cy8nLCBjYXJ0LmlkKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQudGhlbigocmVzKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5oYW5kbGVJdGVtc1JlbW92ZVJlc3BvbnNlKHJlcylcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdH0pXG5cdFx0XHR9KVxuXHR9XG5cblx0aW5pdEFkZEFsbFRvQ2FydEJ0bigpIHtcblx0XHRjb25zdCBkYXRhID0geyBsaW5lSXRlbXM6IHRoaXMuZ2V0QWxsQ2F0ZWdvcnlQcm9kdWN0SWRzKCkgfVxuXHRcdGNvbnN0ICRidXR0b24gPSAkKCcuYWRkLWFsbC10by1jYXJ0LWJ0bicpXG5cdFx0JGJ1dHRvbi5vbignY2xpY2snLCAoKSA9PiB7XG5cdFx0XHQvLyBnZXQgdGhlIG9yaWdpbmFsIGxhYmVsIGluIGNhc2UgdGhlIEhUTUwgaXMgY2hhbmdlZFxuXHRcdFx0Y29uc3Qgb3JpZ2luYWxMYWJlbCA9ICRidXR0b24udmFsKClcblx0XHRcdC8vIGNoYW5nZSB0aGUgYnV0dG9uIGxhYmVsIGFuZCBkaXNhYmxlIGJ1dHRvbiB3aGlsZSBmZXRjaGluZ1xuXHRcdFx0JGJ1dHRvbi52YWwoJ0FkZGluZyBUbyBDYXJ0Li4uJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKVxuXHRcdFx0Ly8gdHJ5IHRvIGdldCB0aGUgY3VycmVudCBjYXJ0XG5cdFx0XHRjYXJ0VXRpbHNcblx0XHRcdFx0LmdldENhcnQoXG5cdFx0XHRcdFx0Jy9hcGkvc3RvcmVmcm9udC9jYXJ0Lz9pbmNsdWRlPWxpbmVJdGVtcy5kaWdpdGFsSXRlbXMub3B0aW9ucyxsaW5lSXRlbXMucGh5c2ljYWxJdGVtcy5vcHRpb25zJ1xuXHRcdFx0XHQpXG5cdFx0XHRcdC50aGVuKChleGlzdGluZ0NhcnQpID0+IHtcblx0XHRcdFx0XHQvLyBpZiBjYXJ0IGV4aXN0cywgYWRkIGl0ZW1zLCBpZiBjYXJ0IGRvZXMgbm90IGV4aXN0LCBjcmVhdGUgYW5kIGFkZCBpdGVtc1xuXHRcdFx0XHRcdGlmIChleGlzdGluZ0NhcnRbMF0/LmlkKSB7XG5cdFx0XHRcdFx0XHRjYXJ0VXRpbHNcblx0XHRcdFx0XHRcdFx0LmFkZENhcnRJdGVtKCcvYXBpL3N0b3JlZnJvbnQvY2FydHMvJywgZXhpc3RpbmdDYXJ0WzBdLmlkLCBkYXRhKVxuXHRcdFx0XHRcdFx0XHQudGhlbigocmVzcG9uc2UpID0+IHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLmhhbmRsZUl0ZW1BZGRSZXNwb25zZShyZXNwb25zZSlcblx0XHRcdFx0XHRcdFx0XHQkYnV0dG9uLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpLnZhbChvcmlnaW5hbExhYmVsKVxuXHRcdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0XHQuY2F0Y2goKGVycikgPT4gdGhpcy5pdGVtQ291bGROb3RCZUFkZGVkQWxlcnQoKSlcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Y2FydFV0aWxzXG5cdFx0XHRcdFx0XHRcdC5jcmVhdGVDYXJ0KCcvYXBpL3N0b3JlZnJvbnQvY2FydCcsIGRhdGEpXG5cdFx0XHRcdFx0XHRcdC50aGVuKChyZXNwb25zZSkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuaGFuZGxlSXRlbUFkZFJlc3BvbnNlKHJlc3BvbnNlKVxuXHRcdFx0XHRcdFx0XHRcdCRidXR0b24ucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSkudmFsKG9yaWdpbmFsTGFiZWwpXG5cdFx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHRcdC5jYXRjaCgoZXJyKSA9PiB0aGlzLml0ZW1Db3VsZE5vdEJlQWRkZWRBbGVydCgpKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSlcblx0XHR9KVxuXHR9XG5cblx0aXRlbUNvdWxkTm90QmVBZGRlZEFsZXJ0KCkge1xuXHRcdHN3YWwuZmlyZSh7XG5cdFx0XHR0aXRsZTogJ0Vycm9yJyxcblx0XHRcdGljb246ICdlcnJvcicsXG5cdFx0XHR0ZXh0OiAnRmFpbGVkIHRvIGFkZCBpdGVtcyB0byBjYXJ0LiBTb21lIGl0ZW1zIG1heSByZXF1aXJlIGFkZGl0aW9uYWwgb3B0aW9ucyB0byBiZSBzZWxlY3RlZC4gJyxcblx0XHR9KVxuXHR9XG5cblx0aXRlbUFkZGVkQWxlcnQoKSB7XG5cdFx0c3dhbFxuXHRcdFx0LmZpcmUoe1xuXHRcdFx0XHR0aXRsZTogJ1N1Y2Nlc3MnLFxuXHRcdFx0XHRpY29uOiAnc3VjY2VzcycsXG5cdFx0XHRcdHRleHQ6ICdBbGwgaXRlbXMgYWRkZWQgdG8gY2FydC4nLFxuXHRcdFx0fSlcblx0XHRcdC50aGVuKChyZXN1bHQpID0+IGxvY2F0aW9uLnJlbG9hZCgpKVxuXHR9XG5cblx0aGFuZGxlSXRlbUFkZFJlc3BvbnNlKHJlc3BvbnNlKSB7XG5cdFx0cmV0dXJuIHJlc3BvbnNlLnN0YXR1cyA9PT0gNDA0IHx8IHJlc3BvbnNlLnN0YXR1cyA9PT0gNDIyXG5cdFx0XHQ/IHRoaXMuaXRlbUNvdWxkTm90QmVBZGRlZEFsZXJ0KClcblx0XHRcdDogdGhpcy5pdGVtQWRkZWRBbGVydCgpXG5cdH1cblxuXHRpdGVtc0NvdWxkTm90QmVSZW1vdmVkQWxlcnQoKSB7XG5cdFx0c3dhbC5maXJlKHtcblx0XHRcdHRpdGxlOiAnRXJyb3InLFxuXHRcdFx0aWNvbjogJ2Vycm9yJyxcblx0XHRcdHRleHQ6ICdGYWlsZWQgdG8gcmVtb3ZlIGl0ZW1zIGZyb20gY2FydCwgcGxlYXNlIHRyeSBhZ2Fpbi4nLFxuXHRcdH0pXG5cdH1cblxuXHRpdGVtc1JlbW92ZWRBbGVydCgpIHtcblx0XHRzd2FsXG5cdFx0XHQuZmlyZSh7XG5cdFx0XHRcdHRpdGxlOiAnU3VjY2VzcycsXG5cdFx0XHRcdGljb246ICdzdWNjZXNzJyxcblx0XHRcdFx0dGV4dDogJ0FsbCBpdGVtcyByZW1vdmVkIGZyb20gY2FydC4nLFxuXHRcdFx0fSlcblx0XHRcdC50aGVuKChyZXN1bHQpID0+IGxvY2F0aW9uLnJlbG9hZCgpKVxuXHR9XG5cblx0aGFuZGxlSXRlbXNSZW1vdmVSZXNwb25zZShyZXNwb25zZSkge1xuXHRcdHJldHVybiByZXNwb25zZS5zdGF0dXMgIT09IDIwNFxuXHRcdFx0PyB0aGlzLml0ZW1zQ291bGROb3RCZVJlbW92ZWRBbGVydCgpXG5cdFx0XHQ6IHRoaXMuaXRlbXNSZW1vdmVkQWxlcnQoKVxuXHR9XG5cblx0Z2V0QWxsQ2F0ZWdvcnlQcm9kdWN0SWRzKCkge1xuXHRcdGNvbnN0IGlkcyA9IFtdXG5cdFx0Ly8gcHVsbCBpZCdzIGZvciBlYWNoIGl0ZW0gb24gdGhlIHBhZ2Vcblx0XHQkKCdbZGF0YS1wcm9kdWN0LWlkXScpLmVhY2goKGluZGV4LCBlbGUpID0+IHtcblx0XHRcdGlkcy5wdXNoKCQoZWxlKS5hdHRyKCdkYXRhLXByb2R1Y3QtaWQnKSlcblx0XHR9KVxuXG5cdFx0cmV0dXJuIGlkcy5tYXAoKGlkKSA9PiAoe1xuXHRcdFx0cXVhbnRpdHk6IDEsXG5cdFx0XHRwcm9kdWN0SWQ6IGlkLFxuXHRcdH0pKVxuXHR9XG5cblx0YXJpYU5vdGlmeU5vUHJvZHVjdHMoKSB7XG5cdFx0Y29uc3QgJG5vUHJvZHVjdHNNZXNzYWdlID0gJCgnW2RhdGEtbm8tcHJvZHVjdHMtbm90aWZpY2F0aW9uXScpXG5cdFx0aWYgKCRub1Byb2R1Y3RzTWVzc2FnZS5sZW5ndGgpIHtcblx0XHRcdCRub1Byb2R1Y3RzTWVzc2FnZS5mb2N1cygpXG5cdFx0fVxuXHR9XG5cblx0aW5pdEZhY2V0ZWRTZWFyY2goKSB7XG5cdFx0Y29uc3Qge1xuXHRcdFx0cHJpY2VfbWluX2V2YWx1YXRpb246IG9uTWluUHJpY2VFcnJvcixcblx0XHRcdHByaWNlX21heF9ldmFsdWF0aW9uOiBvbk1heFByaWNlRXJyb3IsXG5cdFx0XHRwcmljZV9taW5fbm90X2VudGVyZWQ6IG1pblByaWNlTm90RW50ZXJlZCxcblx0XHRcdHByaWNlX21heF9ub3RfZW50ZXJlZDogbWF4UHJpY2VOb3RFbnRlcmVkLFxuXHRcdFx0cHJpY2VfaW52YWxpZF92YWx1ZTogb25JbnZhbGlkUHJpY2UsXG5cdFx0fSA9IHRoaXMudmFsaWRhdGlvbkRpY3Rpb25hcnlcblx0XHRjb25zdCAkcHJvZHVjdExpc3RpbmdDb250YWluZXIgPSAkKCcjcHJvZHVjdC1saXN0aW5nLWNvbnRhaW5lcicpXG5cdFx0Y29uc3QgJGZhY2V0ZWRTZWFyY2hDb250YWluZXIgPSAkKCcjZmFjZXRlZC1zZWFyY2gtY29udGFpbmVyJylcblx0XHRjb25zdCBwcm9kdWN0c1BlclBhZ2UgPSB0aGlzLmNvbnRleHQuY2F0ZWdvcnlQcm9kdWN0c1BlclBhZ2Vcblx0XHRjb25zdCByZXF1ZXN0T3B0aW9ucyA9IHtcblx0XHRcdGNvbmZpZzoge1xuXHRcdFx0XHRjYXRlZ29yeToge1xuXHRcdFx0XHRcdHNob3BfYnlfcHJpY2U6IHRydWUsXG5cdFx0XHRcdFx0cHJvZHVjdHM6IHtcblx0XHRcdFx0XHRcdGxpbWl0OiBwcm9kdWN0c1BlclBhZ2UsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSxcblx0XHRcdH0sXG5cdFx0XHR0ZW1wbGF0ZToge1xuXHRcdFx0XHRwcm9kdWN0TGlzdGluZzogJ2NhdGVnb3J5L3Byb2R1Y3QtbGlzdGluZycsXG5cdFx0XHRcdHNpZGViYXI6ICdjYXRlZ29yeS9zaWRlYmFyJyxcblx0XHRcdH0sXG5cdFx0XHRzaG93TW9yZTogJ2NhdGVnb3J5L3Nob3ctbW9yZScsXG5cdFx0fVxuXG5cdFx0dGhpcy5mYWNldGVkU2VhcmNoID0gbmV3IEZhY2V0ZWRTZWFyY2goXG5cdFx0XHRyZXF1ZXN0T3B0aW9ucyxcblx0XHRcdChjb250ZW50KSA9PiB7XG5cdFx0XHRcdCRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lci5odG1sKGNvbnRlbnQucHJvZHVjdExpc3RpbmcpXG5cdFx0XHRcdCRmYWNldGVkU2VhcmNoQ29udGFpbmVyLmh0bWwoY29udGVudC5zaWRlYmFyKVxuXG5cdFx0XHRcdCQoJ2JvZHknKS50cmlnZ2VySGFuZGxlcignY29tcGFyZVJlc2V0JylcblxuXHRcdFx0XHQkKCdodG1sLCBib2R5JykuYW5pbWF0ZShcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRzY3JvbGxUb3A6IDAsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHQxMDBcblx0XHRcdFx0KVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dmFsaWRhdGlvbkVycm9yTWVzc2FnZXM6IHtcblx0XHRcdFx0XHRvbk1pblByaWNlRXJyb3IsXG5cdFx0XHRcdFx0b25NYXhQcmljZUVycm9yLFxuXHRcdFx0XHRcdG1pblByaWNlTm90RW50ZXJlZCxcblx0XHRcdFx0XHRtYXhQcmljZU5vdEVudGVyZWQsXG5cdFx0XHRcdFx0b25JbnZhbGlkUHJpY2UsXG5cdFx0XHRcdH0sXG5cdFx0XHR9XG5cdFx0KVxuXHR9XG59XG4iLCJjb25zdCBUUkFOU0xBVElPTlMgPSAndHJhbnNsYXRpb25zJztcbmNvbnN0IGlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkgPSAoZGljdGlvbmFyeSkgPT4gISFPYmplY3Qua2V5cyhkaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pLmxlbmd0aDtcbmNvbnN0IGNob29zZUFjdGl2ZURpY3Rpb25hcnkgPSAoLi4uZGljdGlvbmFyeUpzb25MaXN0KSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaWN0aW9uYXJ5SnNvbkxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZGljdGlvbmFyeSA9IEpTT04ucGFyc2UoZGljdGlvbmFyeUpzb25MaXN0W2ldKTtcbiAgICAgICAgaWYgKGlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkoZGljdGlvbmFyeSkpIHtcbiAgICAgICAgICAgIHJldHVybiBkaWN0aW9uYXJ5O1xuICAgICAgICB9XG4gICAgfVxufTtcblxuLyoqXG4gKiBkZWZpbmVzIFRyYW5zbGF0aW9uIERpY3Rpb25hcnkgdG8gdXNlXG4gKiBAcGFyYW0gY29udGV4dCBwcm92aWRlcyBhY2Nlc3MgdG8gMyB2YWxpZGF0aW9uIEpTT05zIGZyb20gZW4uanNvbjpcbiAqIHZhbGlkYXRpb25fbWVzc2FnZXMsIHZhbGlkYXRpb25fZmFsbGJhY2tfbWVzc2FnZXMgYW5kIGRlZmF1bHRfbWVzc2FnZXNcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkgPSAoY29udGV4dCkgPT4ge1xuICAgIGNvbnN0IHsgdmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTiB9ID0gY29udGV4dDtcbiAgICBjb25zdCBhY3RpdmVEaWN0aW9uYXJ5ID0gY2hvb3NlQWN0aXZlRGljdGlvbmFyeSh2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OKTtcbiAgICBjb25zdCBsb2NhbGl6YXRpb25zID0gT2JqZWN0LnZhbHVlcyhhY3RpdmVEaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pO1xuICAgIGNvbnN0IHRyYW5zbGF0aW9uS2V5cyA9IE9iamVjdC5rZXlzKGFjdGl2ZURpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSkubWFwKGtleSA9PiBrZXkuc3BsaXQoJy4nKS5wb3AoKSk7XG5cbiAgICByZXR1cm4gdHJhbnNsYXRpb25LZXlzLnJlZHVjZSgoYWNjLCBrZXksIGkpID0+IHtcbiAgICAgICAgYWNjW2tleV0gPSBsb2NhbGl6YXRpb25zW2ldO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KTtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9