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

  _proto.initAddAllToCartBtn = function initAddAllToCartBtn() {
    var _this4 = this;

    $('.add-all-to-cart-btn').on('click', function () {
      var data = {
        lineItems: _this4.getAllCategoryProductIds()
      };

      var getResponseHandler = function getResponseHandler(statusCode) {
        return statusCode !== 200 ? _cart_cart_utils__WEBPACK_IMPORTED_MODULE_5__["default"].itemCouldNotBeAdded() : _cart_cart_utils__WEBPACK_IMPORTED_MODULE_5__["default"].itemAdded();
      };

      _cart_cart_utils__WEBPACK_IMPORTED_MODULE_5__["default"].getCart('/api/storefront/cart/?include=lineItems.digitalItems.options,lineItems.physicalItems.options').then(function (existingCart) {
        var _existingCart$;

        if ((_existingCart$ = existingCart[0]) != null && _existingCart$.id) {
          _cart_cart_utils__WEBPACK_IMPORTED_MODULE_5__["default"].addCartItem('/api/storefront/carts/', existingCart[0].id, data).then(function (response) {
            console.log(response); // getResponseHandler(response.status)
          });
        }

        _cart_cart_utils__WEBPACK_IMPORTED_MODULE_5__["default"].createCart('/api/storefront/cart', data).then(function (response) {
          console.log(response); // getResponseHandler(response.status)
        });
      });
    });
  };

  _proto.getAllCategoryProductIds = function getAllCategoryProductIds() {
    var ids = [];
    $('[data-product-id]').each(function (index, ele) {
      ids.push($(ele).attr('data-product-id'));
    });
    var uniqueIds = ids.filter(function (id, i) {
      return ids.indexOf(id) === i;
    }).map(function (id) {
      return {
        quantity: 1,
        productId: id
      };
    });
    return uniqueIds;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2FydC9jYXJ0LXV0aWxzLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9jYXRlZ29yeS5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL3V0aWxzL3RyYW5zbGF0aW9ucy11dGlscy5qcyJdLCJuYW1lcyI6WyJjcmVhdGVDYXJ0IiwidXJsIiwiY2FydEl0ZW1zIiwiZmV0Y2giLCJtZXRob2QiLCJjcmVkZW50aWFscyIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJhZGRDYXJ0SXRlbSIsImNhcnRJZCIsImdldENhcnQiLCJDYXRlZ29yeSIsImNvbnRleHQiLCJ2YWxpZGF0aW9uRGljdGlvbmFyeSIsImNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSIsInNldExpdmVSZWdpb25BdHRyaWJ1dGVzIiwiJGVsZW1lbnQiLCJyb2xlVHlwZSIsImFyaWFMaXZlU3RhdHVzIiwiYXR0ciIsInJvbGUiLCJtYWtlU2hvcEJ5UHJpY2VGaWx0ZXJBY2Nlc3NpYmxlIiwiJCIsImxlbmd0aCIsImhhc0NsYXNzIiwiZm9jdXMiLCJvbiIsIm9uUmVhZHkiLCJhcnJhbmdlRm9jdXNPblNvcnRCeSIsImluaXRBZGRBbGxUb0NhcnRCdG4iLCJlIiwiY3VycmVudFRhcmdldCIsIm5leHQiLCJjb21wYXJlUHJvZHVjdHMiLCJpbml0RmFjZXRlZFNlYXJjaCIsIm9uU29ydEJ5U3VibWl0IiwiYmluZCIsImhvb2tzIiwiaW5pdFByb2R1Y3RJbWFnZUhvdmVyIiwic2V0TGl2ZVJlZ2lvbnNBdHRyaWJ1dGVzIiwiYXJpYU5vdGlmeU5vUHJvZHVjdHMiLCIkaW1nIiwiZmluZCIsInNyYyIsImhvdmVyU3JjIiwicmVwbGFjZSIsImhlaWdodCIsIndpZHRoIiwiZGF0YSIsImxpbmVJdGVtcyIsImdldEFsbENhdGVnb3J5UHJvZHVjdElkcyIsImdldFJlc3BvbnNlSGFuZGxlciIsInN0YXR1c0NvZGUiLCJDYXJ0VXRpbHMiLCJpdGVtQ291bGROb3RCZUFkZGVkIiwiaXRlbUFkZGVkIiwiZXhpc3RpbmdDYXJ0IiwiaWQiLCJjb25zb2xlIiwibG9nIiwiaWRzIiwiZWFjaCIsImluZGV4IiwiZWxlIiwicHVzaCIsInVuaXF1ZUlkcyIsImZpbHRlciIsImkiLCJpbmRleE9mIiwibWFwIiwicXVhbnRpdHkiLCJwcm9kdWN0SWQiLCIkbm9Qcm9kdWN0c01lc3NhZ2UiLCJvbk1pblByaWNlRXJyb3IiLCJwcmljZV9taW5fZXZhbHVhdGlvbiIsIm9uTWF4UHJpY2VFcnJvciIsInByaWNlX21heF9ldmFsdWF0aW9uIiwibWluUHJpY2VOb3RFbnRlcmVkIiwicHJpY2VfbWluX25vdF9lbnRlcmVkIiwibWF4UHJpY2VOb3RFbnRlcmVkIiwicHJpY2VfbWF4X25vdF9lbnRlcmVkIiwib25JbnZhbGlkUHJpY2UiLCJwcmljZV9pbnZhbGlkX3ZhbHVlIiwiJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyIiwiJGZhY2V0ZWRTZWFyY2hDb250YWluZXIiLCJwcm9kdWN0c1BlclBhZ2UiLCJjYXRlZ29yeVByb2R1Y3RzUGVyUGFnZSIsInJlcXVlc3RPcHRpb25zIiwiY29uZmlnIiwiY2F0ZWdvcnkiLCJzaG9wX2J5X3ByaWNlIiwicHJvZHVjdHMiLCJsaW1pdCIsInRlbXBsYXRlIiwicHJvZHVjdExpc3RpbmciLCJzaWRlYmFyIiwic2hvd01vcmUiLCJmYWNldGVkU2VhcmNoIiwiRmFjZXRlZFNlYXJjaCIsImNvbnRlbnQiLCJodG1sIiwidHJpZ2dlckhhbmRsZXIiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwidmFsaWRhdGlvbkVycm9yTWVzc2FnZXMiLCJDYXRhbG9nUGFnZSIsIlRSQU5TTEFUSU9OUyIsImlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkiLCJkaWN0aW9uYXJ5IiwiT2JqZWN0Iiwia2V5cyIsImNob29zZUFjdGl2ZURpY3Rpb25hcnkiLCJwYXJzZSIsInZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiIsInZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OIiwidmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTiIsImFjdGl2ZURpY3Rpb25hcnkiLCJsb2NhbGl6YXRpb25zIiwidmFsdWVzIiwidHJhbnNsYXRpb25LZXlzIiwia2V5Iiwic3BsaXQiLCJwb3AiLCJyZWR1Y2UiLCJhY2MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFlO0FBQ2RBLFlBQVUsRUFBRSxvQkFBQ0MsR0FBRCxFQUFNQyxTQUFOLEVBQW9CO0FBQy9CLFdBQU9DLEtBQUssQ0FBQ0YsR0FBRCxFQUFNO0FBQ2pCRyxZQUFNLEVBQUUsTUFEUztBQUVqQkMsaUJBQVcsRUFBRSxhQUZJO0FBR2pCQyxhQUFPLEVBQUU7QUFDUix3QkFBZ0I7QUFEUixPQUhRO0FBTWpCQyxVQUFJLEVBQUVDLElBQUksQ0FBQ0MsU0FBTCxDQUFlUCxTQUFmO0FBTlcsS0FBTixDQUFMLENBT0pRLElBUEksQ0FPQyxVQUFBQyxRQUFRO0FBQUEsYUFBSUEsUUFBUSxDQUFDQyxJQUFULEVBQUo7QUFBQSxLQVBULENBQVA7QUFRQSxHQVZhO0FBWWRDLGFBQVcsRUFBRSxxQkFBQ1osR0FBRCxFQUFNYSxNQUFOLEVBQWNaLFNBQWQsRUFBNEI7QUFDeEMsV0FBUUMsS0FBSyxDQUFDRixHQUFHLEdBQUdhLE1BQU4sR0FBZSxTQUFoQixFQUEyQjtBQUN2Q1YsWUFBTSxFQUFFLE1BRCtCO0FBRXZDQyxpQkFBVyxFQUFFLGFBRjBCO0FBR3ZDQyxhQUFPLEVBQUU7QUFDUix3QkFBZ0I7QUFEUixPQUg4QjtBQU12Q0MsVUFBSSxFQUFFQyxJQUFJLENBQUNDLFNBQUwsQ0FBZVAsU0FBZjtBQU5pQyxLQUEzQixDQUFMLENBT0xRLElBUEssQ0FPQSxVQUFBQyxRQUFRO0FBQUEsYUFBSUEsUUFBUSxDQUFDQyxJQUFULEVBQUo7QUFBQSxLQVBSLENBQVI7QUFRQSxHQXJCYTtBQXVCZEcsU0FBTyxFQUFF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TUFBTUMsZ0JBQWdCLEdBQUdMLHNCQUFzQixDQUFDRSx3QkFBRCxFQUEyQkMsZ0NBQTNCLEVBQTZEQywrQkFBN0QsQ0FBL0M7QUFDQSxNQUFNRSxhQUFhLEdBQUdSLE1BQU0sQ0FBQ1MsTUFBUCxDQUFjRixnQkFBZ0IsQ0FBQ1YsWUFBRCxDQUE5QixDQUF0QjtBQUNBLE1BQU1hLGVBQWUsR0FBR1YsTUFBTSxDQUFDQyxJQUFQLENBQVlNLGdCQUFnQixDQUFDVixZQUFELENBQTVCLEVBQTRDckMsR0FBNUMsQ0FBZ0QsVUFBQW1ELEdBQUc7QUFBQSxXQUFJQSxHQUFHLENBQUNDLEtBQUosQ0FBVSxHQUFWLEVBQWVDLEdBQWYsRUFBSjtBQUFBLEdBQW5ELENBQXhCO0FBRUEsU0FBT0gsZUFBZSxDQUFDSSxNQUFoQixDQUF1QixVQUFDQyxHQUFELEVBQU1KLEdBQU4sRUFBV3JELENBQVgsRUFBaUI7QUFDM0N5RCxPQUFHLENBQUNKLEdBQUQsQ0FBSCxHQUFXSCxhQUFhLENBQUNsRCxDQUFELENBQXhCO0FBQ0EsV0FBT3lELEdBQVA7QUFDSCxHQUhNLEVBR0osRUFISSxDQUFQO0FBSUgsQ0FWTSxDIiwiZmlsZSI6InRoZW1lLWJ1bmRsZS5jaHVuay4xMC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcblx0Y3JlYXRlQ2FydDogKHVybCwgY2FydEl0ZW1zKSA9PiB7XG5cdFx0cmV0dXJuIGZldGNoKHVybCwge1xuXHRcdFx0bWV0aG9kOiAnUE9TVCcsXG5cdFx0XHRjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcblx0XHRcdGhlYWRlcnM6IHtcblx0XHRcdFx0J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcblx0XHRcdH0sXG5cdFx0XHRib2R5OiBKU09OLnN0cmluZ2lmeShjYXJ0SXRlbXMpLFxuXHRcdH0pLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuXHR9LFxuXG5cdGFkZENhcnRJdGVtOiAodXJsLCBjYXJ0SWQsIGNhcnRJdGVtcykgPT4ge1xuXHRcdHJldHVybiAgZmV0Y2godXJsICsgY2FydElkICsgJy9pdGVtcy8nLCB7XG5cdFx0XHRtZXRob2Q6ICdQT1NUJyxcblx0XHRcdGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nLFxuXHRcdFx0aGVhZGVyczoge1xuXHRcdFx0XHQnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuXHRcdFx0fSxcblx0XHRcdGJvZHk6IEpTT04uc3RyaW5naWZ5KGNhcnRJdGVtcyksXG5cdFx0fSkudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG5cdH0sXG5cblx0Z2V0Q2FydDogKHVybCkgPT4ge1xuXHRcdHJldHVybiBmZXRjaCh1cmwsIHtcblx0XHRcdG1ldGhvZDogJ0dFVCcsXG5cdFx0XHRjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcblx0XHR9KS50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcblx0fSxcbn1cbiIsImltcG9ydCB7IGhvb2tzIH0gZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnXG5pbXBvcnQgQ2F0YWxvZ1BhZ2UgZnJvbSAnLi9jYXRhbG9nJ1xuaW1wb3J0IGNvbXBhcmVQcm9kdWN0cyBmcm9tICcuL2dsb2JhbC9jb21wYXJlLXByb2R1Y3RzJ1xuaW1wb3J0IEZhY2V0ZWRTZWFyY2ggZnJvbSAnLi9jb21tb24vZmFjZXRlZC1zZWFyY2gnXG5pbXBvcnQgeyBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkgfSBmcm9tICcuLi90aGVtZS9jb21tb24vdXRpbHMvdHJhbnNsYXRpb25zLXV0aWxzJ1xuaW1wb3J0IENhcnRVdGlscyBmcm9tICcuL2NhcnQvY2FydC11dGlscydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2F0ZWdvcnkgZXh0ZW5kcyBDYXRhbG9nUGFnZSB7XG5cdGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcblx0XHRzdXBlcihjb250ZXh0KVxuXHRcdHRoaXMudmFsaWRhdGlvbkRpY3Rpb25hcnkgPSBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkoY29udGV4dClcblx0fVxuXG5cdHNldExpdmVSZWdpb25BdHRyaWJ1dGVzKCRlbGVtZW50LCByb2xlVHlwZSwgYXJpYUxpdmVTdGF0dXMpIHtcblx0XHQkZWxlbWVudC5hdHRyKHtcblx0XHRcdHJvbGU6IHJvbGVUeXBlLFxuXHRcdFx0J2FyaWEtbGl2ZSc6IGFyaWFMaXZlU3RhdHVzLFxuXHRcdH0pXG5cdH1cblxuXHRtYWtlU2hvcEJ5UHJpY2VGaWx0ZXJBY2Nlc3NpYmxlKCkge1xuXHRcdGlmICghJCgnW2RhdGEtc2hvcC1ieS1wcmljZV0nKS5sZW5ndGgpIHJldHVyblxuXG5cdFx0aWYgKCQoJy5uYXZMaXN0LWFjdGlvbicpLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSkge1xuXHRcdFx0JCgnYS5uYXZMaXN0LWFjdGlvbi5pcy1hY3RpdmUnKS5mb2N1cygpXG5cdFx0fVxuXG5cdFx0JCgnYS5uYXZMaXN0LWFjdGlvbicpLm9uKCdjbGljaycsICgpID0+XG5cdFx0XHR0aGlzLnNldExpdmVSZWdpb25BdHRyaWJ1dGVzKFxuXHRcdFx0XHQkKCdzcGFuLnByaWNlLWZpbHRlci1tZXNzYWdlJyksXG5cdFx0XHRcdCdzdGF0dXMnLFxuXHRcdFx0XHQnYXNzZXJ0aXZlJ1xuXHRcdFx0KVxuXHRcdClcblx0fVxuXG5cdG9uUmVhZHkoKSB7XG5cdFx0dGhpcy5hcnJhbmdlRm9jdXNPblNvcnRCeSgpXG5cdFx0dGhpcy5pbml0QWRkQWxsVG9DYXJ0QnRuKClcblx0XHQkKCdbZGF0YS1idXR0b24tdHlwZT1cImFkZC1jYXJ0XCJdJykub24oJ2NsaWNrJywgKGUpID0+XG5cdFx0XHR0aGlzLnNldExpdmVSZWdpb25BdHRyaWJ1dGVzKFxuXHRcdFx0XHQkKGUuY3VycmVudFRhcmdldCkubmV4dCgpLFxuXHRcdFx0XHQnc3RhdHVzJyxcblx0XHRcdFx0J3BvbGl0ZSdcblx0XHRcdClcblx0XHQpXG5cblx0XHR0aGlzLm1ha2VTaG9wQnlQcmljZUZpbHRlckFjY2Vzc2libGUoKVxuXG5cdFx0Y29tcGFyZVByb2R1Y3RzKHRoaXMuY29udGV4dClcblxuXHRcdGlmICgkKCcjZmFjZXRlZFNlYXJjaCcpLmxlbmd0aCA+IDApIHtcblx0XHRcdHRoaXMuaW5pdEZhY2V0ZWRTZWFyY2goKVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLm9uU29ydEJ5U3VibWl0ID0gdGhpcy5vblNvcnRCeVN1Ym1pdC5iaW5kKHRoaXMpXG5cdFx0XHRob29rcy5vbignc29ydEJ5LXN1Ym1pdHRlZCcsIHRoaXMub25Tb3J0QnlTdWJtaXQpXG5cdFx0fVxuXHRcdHRoaXMuaW5pdFByb2R1Y3RJbWFnZUhvdmVyKClcblxuXHRcdCQoJ2EucmVzZXQtYnRuJykub24oJ2NsaWNrJywgKCkgPT5cblx0XHRcdHRoaXMuc2V0TGl2ZVJlZ2lvbnNBdHRyaWJ1dGVzKCQoJ3NwYW4ucmVzZXQtbWVzc2FnZScpLCAnc3RhdHVzJywgJ3BvbGl0ZScpXG5cdFx0KVxuXHRcdHRoaXMuYXJpYU5vdGlmeU5vUHJvZHVjdHMoKVxuXHR9XG5cblx0aW5pdFByb2R1Y3RJbWFnZUhvdmVyKCkge1xuXHRcdCQoJy5jYXJkLWZpZ3VyZScpLm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0Y29uc3QgJGltZyA9ICQodGhpcykuZmluZCgnLmNhcmQtaW1hZ2UnKVxuXHRcdFx0Y29uc3Qgc3JjID0gJGltZy5hdHRyKCdzcmMnKVxuXHRcdFx0Y29uc3QgaG92ZXJTcmMgPSAkaW1nXG5cdFx0XHRcdC5hdHRyKCdkYXRhLWhvdmVyLXNyYycpXG5cdFx0XHRcdC5yZXBsYWNlKCd7OnNpemV9JywgJCh0aGlzKS5oZWlnaHQoKSArICd4JyArICQodGhpcykud2lkdGgoKSlcblx0XHRcdCRpbWcuYXR0cignc3Jjc2V0JywgaG92ZXJTcmMpXG5cblx0XHRcdCQodGhpcykub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdCRpbWcuYXR0cignc3Jjc2V0Jywgc3JjKVxuXHRcdFx0fSlcblx0XHR9KVxuXHR9XG5cblx0aW5pdEFkZEFsbFRvQ2FydEJ0bigpIHtcblx0XHQkKCcuYWRkLWFsbC10by1jYXJ0LWJ0bicpLm9uKCdjbGljaycsICgpID0+IHtcblx0XHRcdGNvbnN0IGRhdGEgPSB7IGxpbmVJdGVtczogdGhpcy5nZXRBbGxDYXRlZ29yeVByb2R1Y3RJZHMoKSB9XG5cblx0XHRcdGNvbnN0IGdldFJlc3BvbnNlSGFuZGxlciA9IChzdGF0dXNDb2RlKSA9PlxuXHRcdFx0XHRzdGF0dXNDb2RlICE9PSAyMDBcblx0XHRcdFx0XHQ/IENhcnRVdGlscy5pdGVtQ291bGROb3RCZUFkZGVkKClcblx0XHRcdFx0XHQ6IENhcnRVdGlscy5pdGVtQWRkZWQoKVxuXG5cdFx0XHRDYXJ0VXRpbHMuZ2V0Q2FydChcblx0XHRcdFx0Jy9hcGkvc3RvcmVmcm9udC9jYXJ0Lz9pbmNsdWRlPWxpbmVJdGVtcy5kaWdpdGFsSXRlbXMub3B0aW9ucyxsaW5lSXRlbXMucGh5c2ljYWxJdGVtcy5vcHRpb25zJ1xuXHRcdFx0KS50aGVuKChleGlzdGluZ0NhcnQpID0+IHtcblx0XHRcdFx0aWYgKGV4aXN0aW5nQ2FydFswXT8uaWQpIHtcblx0XHRcdFx0XHRDYXJ0VXRpbHMuYWRkQ2FydEl0ZW0oXG5cdFx0XHRcdFx0XHQnL2FwaS9zdG9yZWZyb250L2NhcnRzLycsXG5cdFx0XHRcdFx0XHRleGlzdGluZ0NhcnRbMF0uaWQsXG5cdFx0XHRcdFx0XHRkYXRhXG5cdFx0XHRcdFx0KS50aGVuKChyZXNwb25zZSkgPT4ge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2cocmVzcG9uc2UpXG5cdFx0XHRcdFx0XHQvLyBnZXRSZXNwb25zZUhhbmRsZXIocmVzcG9uc2Uuc3RhdHVzKVxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRDYXJ0VXRpbHMuY3JlYXRlQ2FydCgnL2FwaS9zdG9yZWZyb250L2NhcnQnLCBkYXRhKS50aGVuKChyZXNwb25zZSkgPT4ge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuXHRcdFx0XHRcdC8vIGdldFJlc3BvbnNlSGFuZGxlcihyZXNwb25zZS5zdGF0dXMpXG5cdFx0XHRcdH0pXG5cdFx0XHR9KVxuXHRcdH0pXG5cdH1cblxuXHRnZXRBbGxDYXRlZ29yeVByb2R1Y3RJZHMoKSB7XG5cdFx0Y29uc3QgaWRzID0gW11cblxuXHRcdCQoJ1tkYXRhLXByb2R1Y3QtaWRdJykuZWFjaCgoaW5kZXgsIGVsZSkgPT4ge1xuXHRcdFx0aWRzLnB1c2goJChlbGUpLmF0dHIoJ2RhdGEtcHJvZHVjdC1pZCcpKVxuXHRcdH0pXG5cblx0XHRjb25zdCB1bmlxdWVJZHMgPSBpZHNcblx0XHRcdC5maWx0ZXIoKGlkLCBpKSA9PiBpZHMuaW5kZXhPZihpZCkgPT09IGkpXG5cdFx0XHQubWFwKChpZCkgPT4gKHtcblx0XHRcdFx0cXVhbnRpdHk6IDEsXG5cdFx0XHRcdHByb2R1Y3RJZDogaWQsXG5cdFx0XHR9KSlcblxuXHRcdHJldHVybiB1bmlxdWVJZHNcblx0fVxuXG5cdGFyaWFOb3RpZnlOb1Byb2R1Y3RzKCkge1xuXHRcdGNvbnN0ICRub1Byb2R1Y3RzTWVzc2FnZSA9ICQoJ1tkYXRhLW5vLXByb2R1Y3RzLW5vdGlmaWNhdGlvbl0nKVxuXHRcdGlmICgkbm9Qcm9kdWN0c01lc3NhZ2UubGVuZ3RoKSB7XG5cdFx0XHQkbm9Qcm9kdWN0c01lc3NhZ2UuZm9jdXMoKVxuXHRcdH1cblx0fVxuXG5cdGluaXRGYWNldGVkU2VhcmNoKCkge1xuXHRcdGNvbnN0IHtcblx0XHRcdHByaWNlX21pbl9ldmFsdWF0aW9uOiBvbk1pblByaWNlRXJyb3IsXG5cdFx0XHRwcmljZV9tYXhfZXZhbHVhdGlvbjogb25NYXhQcmljZUVycm9yLFxuXHRcdFx0cHJpY2VfbWluX25vdF9lbnRlcmVkOiBtaW5QcmljZU5vdEVudGVyZWQsXG5cdFx0XHRwcmljZV9tYXhfbm90X2VudGVyZWQ6IG1heFByaWNlTm90RW50ZXJlZCxcblx0XHRcdHByaWNlX2ludmFsaWRfdmFsdWU6IG9uSW52YWxpZFByaWNlLFxuXHRcdH0gPSB0aGlzLnZhbGlkYXRpb25EaWN0aW9uYXJ5XG5cdFx0Y29uc3QgJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyID0gJCgnI3Byb2R1Y3QtbGlzdGluZy1jb250YWluZXInKVxuXHRcdGNvbnN0ICRmYWNldGVkU2VhcmNoQ29udGFpbmVyID0gJCgnI2ZhY2V0ZWQtc2VhcmNoLWNvbnRhaW5lcicpXG5cdFx0Y29uc3QgcHJvZHVjdHNQZXJQYWdlID0gdGhpcy5jb250ZXh0LmNhdGVnb3J5UHJvZHVjdHNQZXJQYWdlXG5cdFx0Y29uc3QgcmVxdWVzdE9wdGlvbnMgPSB7XG5cdFx0XHRjb25maWc6IHtcblx0XHRcdFx0Y2F0ZWdvcnk6IHtcblx0XHRcdFx0XHRzaG9wX2J5X3ByaWNlOiB0cnVlLFxuXHRcdFx0XHRcdHByb2R1Y3RzOiB7XG5cdFx0XHRcdFx0XHRsaW1pdDogcHJvZHVjdHNQZXJQYWdlLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdH0sXG5cdFx0XHR9LFxuXHRcdFx0dGVtcGxhdGU6IHtcblx0XHRcdFx0cHJvZHVjdExpc3Rpbmc6ICdjYXRlZ29yeS9wcm9kdWN0LWxpc3RpbmcnLFxuXHRcdFx0XHRzaWRlYmFyOiAnY2F0ZWdvcnkvc2lkZWJhcicsXG5cdFx0XHR9LFxuXHRcdFx0c2hvd01vcmU6ICdjYXRlZ29yeS9zaG93LW1vcmUnLFxuXHRcdH1cblxuXHRcdHRoaXMuZmFjZXRlZFNlYXJjaCA9IG5ldyBGYWNldGVkU2VhcmNoKFxuXHRcdFx0cmVxdWVzdE9wdGlvbnMsXG5cdFx0XHQoY29udGVudCkgPT4ge1xuXHRcdFx0XHQkcHJvZHVjdExpc3RpbmdDb250YWluZXIuaHRtbChjb250ZW50LnByb2R1Y3RMaXN0aW5nKVxuXHRcdFx0XHQkZmFjZXRlZFNlYXJjaENvbnRhaW5lci5odG1sKGNvbnRlbnQuc2lkZWJhcilcblxuXHRcdFx0XHQkKCdib2R5JykudHJpZ2dlckhhbmRsZXIoJ2NvbXBhcmVSZXNldCcpXG5cblx0XHRcdFx0JCgnaHRtbCwgYm9keScpLmFuaW1hdGUoXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0c2Nyb2xsVG9wOiAwLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0MTAwXG5cdFx0XHRcdClcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHZhbGlkYXRpb25FcnJvck1lc3NhZ2VzOiB7XG5cdFx0XHRcdFx0b25NaW5QcmljZUVycm9yLFxuXHRcdFx0XHRcdG9uTWF4UHJpY2VFcnJvcixcblx0XHRcdFx0XHRtaW5QcmljZU5vdEVudGVyZWQsXG5cdFx0XHRcdFx0bWF4UHJpY2VOb3RFbnRlcmVkLFxuXHRcdFx0XHRcdG9uSW52YWxpZFByaWNlLFxuXHRcdFx0XHR9LFxuXHRcdFx0fVxuXHRcdClcblx0fVxufVxuIiwiY29uc3QgVFJBTlNMQVRJT05TID0gJ3RyYW5zbGF0aW9ucyc7XG5jb25zdCBpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5ID0gKGRpY3Rpb25hcnkpID0+ICEhT2JqZWN0LmtleXMoZGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKS5sZW5ndGg7XG5jb25zdCBjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5ID0gKC4uLmRpY3Rpb25hcnlKc29uTGlzdCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGljdGlvbmFyeUpzb25MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGRpY3Rpb25hcnkgPSBKU09OLnBhcnNlKGRpY3Rpb25hcnlKc29uTGlzdFtpXSk7XG4gICAgICAgIGlmIChpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5KGRpY3Rpb25hcnkpKSB7XG4gICAgICAgICAgICByZXR1cm4gZGljdGlvbmFyeTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbi8qKlxuICogZGVmaW5lcyBUcmFuc2xhdGlvbiBEaWN0aW9uYXJ5IHRvIHVzZVxuICogQHBhcmFtIGNvbnRleHQgcHJvdmlkZXMgYWNjZXNzIHRvIDMgdmFsaWRhdGlvbiBKU09OcyBmcm9tIGVuLmpzb246XG4gKiB2YWxpZGF0aW9uX21lc3NhZ2VzLCB2YWxpZGF0aW9uX2ZhbGxiYWNrX21lc3NhZ2VzIGFuZCBkZWZhdWx0X21lc3NhZ2VzXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5ID0gKGNvbnRleHQpID0+IHtcbiAgICBjb25zdCB7IHZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04gfSA9IGNvbnRleHQ7XG4gICAgY29uc3QgYWN0aXZlRGljdGlvbmFyeSA9IGNob29zZUFjdGl2ZURpY3Rpb25hcnkodmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTik7XG4gICAgY29uc3QgbG9jYWxpemF0aW9ucyA9IE9iamVjdC52YWx1ZXMoYWN0aXZlRGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKTtcbiAgICBjb25zdCB0cmFuc2xhdGlvbktleXMgPSBPYmplY3Qua2V5cyhhY3RpdmVEaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pLm1hcChrZXkgPT4ga2V5LnNwbGl0KCcuJykucG9wKCkpO1xuXG4gICAgcmV0dXJuIHRyYW5zbGF0aW9uS2V5cy5yZWR1Y2UoKGFjYywga2V5LCBpKSA9PiB7XG4gICAgICAgIGFjY1trZXldID0gbG9jYWxpemF0aW9uc1tpXTtcbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSk7XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==