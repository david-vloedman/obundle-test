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
  },
  deleteCart: function deleteCart(url, cartId) {
    return fetch(url + cartId, {
      method: 'DELETE',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (response) {
      return response.json();
    });
  },
  deleteCartItem: function deleteCartItem(url, cartId, itemId) {
    return fetch(url + cartId + '/items/' + itemId, {
      method: 'DELETE',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (response) {
      return response.json();
    });
  },
  itemCouldNotBeAddedAlert: function itemCouldNotBeAddedAlert() {},
  itemAddedAlert: function itemAddedAlert() {},
  handleItemAddResponse: function handleItemAddResponse(response) {
    return response.status !== 200 ? this.itemCouldNotBeAddedAlert() : this.itemAddedAlert();
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

    _this.initRemoveAllItemsBtn();

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

  _proto.initRemoveAllItemsBtn = function initRemoveAllItemsBtn() {};

  _proto.initAddAllToCartBtn = function initAddAllToCartBtn() {
    var _this4 = this;

    $('.add-all-to-cart-btn').on('click', function () {
      var data = {
        lineItems: _this4.getAllCategoryProductIds()
      };
      _cart_cart_utils__WEBPACK_IMPORTED_MODULE_5__["default"].getCart('/api/storefront/cart/?include=lineItems.digitalItems.options,lineItems.physicalItems.options').then(function (existingCart) {
        var _existingCart$;

        if ((_existingCart$ = existingCart[0]) != null && _existingCart$.id) {
          _cart_cart_utils__WEBPACK_IMPORTED_MODULE_5__["default"].addCartItem('/api/storefront/carts/', existingCart[0].id, data).then(function (response) {
            console.log(response);
            _cart_cart_utils__WEBPACK_IMPORTED_MODULE_5__["default"].handleItemAddResponse(response);
          });
        } else {
          _cart_cart_utils__WEBPACK_IMPORTED_MODULE_5__["default"].createCart('/api/storefront/cart', data).then(function (response) {
            console.log(response);
            _cart_cart_utils__WEBPACK_IMPORTED_MODULE_5__["default"].handleItemAddResponse(response);
          });
        }
      });
    });
  };

  _proto.getAllCategoryProductIds = function getAllCategoryProductIds() {
    var ids = [];
    $('[data-product-id]').each(function (index, ele) {
      ids.push($(ele).attr('data-product-id'));
    });
    return ids.map(function (id) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2FydC9jYXJ0LXV0aWxzLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9jYXRlZ29yeS5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL3V0aWxzL3RyYW5zbGF0aW9ucy11dGlscy5qcyJdLCJuYW1lcyI6WyJjcmVhdGVDYXJ0IiwidXJsIiwiY2FydEl0ZW1zIiwiZmV0Y2giLCJtZXRob2QiLCJjcmVkZW50aWFscyIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJhZGRDYXJ0SXRlbSIsImNhcnRJZCIsImdldENhcnQiLCJkZWxldGVDYXJ0IiwiZGVsZXRlQ2FydEl0ZW0iLCJpdGVtSWQiLCJpdGVtQ291bGROb3RCZUFkZGVkQWxlcnQiLCJpdGVtQWRkZWRBbGVydCIsImhhbmRsZUl0ZW1BZGRSZXNwb25zZSIsInN0YXR1cyIsIkNhdGVnb3J5IiwiY29udGV4dCIsInZhbGlkYXRpb25EaWN0aW9uYXJ5IiwiY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5IiwiaW5pdFJlbW92ZUFsbEl0ZW1zQnRuIiwic2V0TGl2ZVJlZ2lvbkF0dHJpYnV0ZXMiLCIkZWxlbWVudCIsInJvbGVUeXBlIiwiYXJpYUxpdmVTdGF0dXMiLCJhdHRyIiwicm9sZSIsIm1ha2VTaG9wQnlQcmljZUZpbHRlckFjY2Vzc2libGUiLCIkIiwibGVuZ3RoIiwiaGFzQ2xhc3MiLCJmb2N1cyIsIm9uIiwib25SZWFkeSIsImFycmFuZ2VGb2N1c09uU29ydEJ5IiwiaW5pdEFkZEFsbFRvQ2FydEJ0biIsImUiLCJjdXJyZW50VGFyZ2V0IiwibmV4dCIsImNvbXBhcmVQcm9kdWN0cyIsImluaXRGYWNldGVkU2VhcmNoIiwib25Tb3J0QnlTdWJtaXQiLCJiaW5kIiwiaG9va3MiLCJpbml0UHJvZHVjdEltYWdlSG92ZXIiLCJzZXRMaXZlUmVnaW9uc0F0dHJpYnV0ZXMiLCJhcmlhTm90aWZ5Tm9Qcm9kdWN0cyIsIiRpbWciLCJmaW5kIiwic3JjIiwiaG92ZXJTcmMiLCJyZXBsYWNlIiwiaGVpZ2h0Iiwid2lkdGgiLCJkYXRhIiwibGluZUl0ZW1zIiwiZ2V0QWxsQ2F0ZWdvcnlQcm9kdWN0SWRzIiwiQ2FydFV0aWxzIiwiZXhpc3RpbmdDYXJ0IiwiaWQiLCJjb25zb2xlIiwibG9nIiwiaWRzIiwiZWFjaCIsImluZGV4IiwiZWxlIiwicHVzaCIsIm1hcCIsInF1YW50aXR5IiwicHJvZHVjdElkIiwidW5pcXVlSWRzIiwiJG5vUHJvZHVjdHNNZXNzYWdlIiwib25NaW5QcmljZUVycm9yIiwicHJpY2VfbWluX2V2YWx1YXRpb24iLCJvbk1heFByaWNlRXJyb3IiLCJwcmljZV9tYXhfZXZhbHVhdGlvbiIsIm1pblByaWNlTm90RW50ZXJlZCIsInByaWNlX21pbl9ub3RfZW50ZXJlZCIsIm1heFByaWNlTm90RW50ZXJlZCIsInByaWNlX21heF9ub3RfZW50ZXJlZCIsIm9uSW52YWxpZFByaWNlIiwicHJpY2VfaW52YWxpZF92YWx1ZSIsIiRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lciIsIiRmYWNldGVkU2VhcmNoQ29udGFpbmVyIiwicHJvZHVjdHNQZXJQYWdlIiwiY2F0ZWdvcnlQcm9kdWN0c1BlclBhZ2UiLCJyZXF1ZXN0T3B0aW9ucyIsImNvbmZpZyIsImNhdGVnb3J5Iiwic2hvcF9ieV9wcmljZSIsInByb2R1Y3RzIiwibGltaXQiLCJ0ZW1wbGF0ZSIsInByb2R1Y3RMaXN0aW5nIiwic2lkZWJhciIsInNob3dNb3JlIiwiZmFjZXRlZFNlYXJjaCIsIkZhY2V0ZWRTZWFyY2giLCJjb250ZW50IiwiaHRtbCIsInRyaWdnZXJIYW5kbGVyIiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsInZhbGlkYXRpb25FcnJvck1lc3NhZ2VzIiwiQ2F0YWxvZ1BhZ2UiLCJUUkFOU0xBVElPTlMiLCJpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5IiwiZGljdGlvbmFyeSIsIk9iamVjdCIsImtleXMiLCJjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5IiwiaSIsInBhcnNlIiwidmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OIiwidmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04iLCJ2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OIiwiYWN0aXZlRGljdGlvbmFyeSIsImxvY2FsaXphdGlvbnMiLCJ2YWx1ZXMiLCJ0cmFuc2xhdGlvbktleXMiLCJrZXkiLCJzcGxpdCIsInBvcCIsInJlZHVjZSIsImFjYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQWU7QUFDZEEsWUFBVSxFQUFFLG9CQUFDQyxHQUFELEVBQU1DLFNBQU4sRUFBb0I7QUFDL0IsV0FBT0MsS0FBSyxDQUFDRixHQUFELEVBQU07QUFDakJHLFlBQU0sRUFBRSxNQURTO0FBRWpCQyxpQkFBVyxFQUFFLGFBRkk7QUFHakJDLGFBQU8sRUFBRTtBQUNSLHdCQUFnQjtBQURSLE9BSFE7QUFNakJDLFVBQUksRUFBRUMsSUFBSSxDQUFDQyxTQUFMLENBQWVQLFNBQWY7QUFOVyxLQUFOLENBQUwsQ0FPSlEsSUFQSSxDQU9DLFVBQUNDLFFBQUQ7QUFBQSxhQUFjQSxRQUFRLENBQUNDLElBQVQsRUFBZDtBQUFBLEtBUEQsQ0FBUDtBQVFBLEdBVmE7QUFZZEMsYUFBVyxFQUFFLHFCQUFDWixHQUFELEVBQU1hLE1BQU4sRUFBY1osU0FBZCxFQUE0QjtBQUN4QyxXQUFPQyxLQUFLLENBQUNGLEdBQUcsR0FBR2EsTUFBTixHQUFlLFNBQWhCLEVBQTJCO0FBQ3RDVixZQUFNLEVBQUUsTUFEOEI7QUFFdENDLGlCQUFXLEVBQUUsYUFGeUI7QUFHdENDLGFBQU8sRUFBRTtBQUNSLHdCQUFnQjtBQURSLE9BSDZCO0FBTXRDQyxVQUFJLEVBQUVDLElBQUksQ0FBQ0MsU0FBTCxDQUFlUCxTQUFmO0FBTmdDLEtBQTNCLENBQUwsQ0FPSlEsSUFQSSxDQU9DLFVBQUNDLFFBQUQ7QUFBQSxhQUFjQSxRQUFRLENBQUND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QyxHQUE1QyxDQUFnRCxVQUFBcUQsR0FBRztBQUFBLFdBQUlBLEdBQUcsQ0FBQ0MsS0FBSixDQUFVLEdBQVYsRUFBZUMsR0FBZixFQUFKO0FBQUEsR0FBbkQsQ0FBeEI7QUFFQSxTQUFPSCxlQUFlLENBQUNJLE1BQWhCLENBQXVCLFVBQUNDLEdBQUQsRUFBTUosR0FBTixFQUFXVCxDQUFYLEVBQWlCO0FBQzNDYSxPQUFHLENBQUNKLEdBQUQsQ0FBSCxHQUFXSCxhQUFhLENBQUNOLENBQUQsQ0FBeEI7QUFDQSxXQUFPYSxHQUFQO0FBQ0gsR0FITSxFQUdKLEVBSEksQ0FBUDtBQUlILENBVk0sQyIsImZpbGUiOiJ0aGVtZS1idW5kbGUuY2h1bmsuMTAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XG5cdGNyZWF0ZUNhcnQ6ICh1cmwsIGNhcnRJdGVtcykgPT4ge1xuXHRcdHJldHVybiBmZXRjaCh1cmwsIHtcblx0XHRcdG1ldGhvZDogJ1BPU1QnLFxuXHRcdFx0Y3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicsXG5cdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdCdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG5cdFx0XHR9LFxuXHRcdFx0Ym9keTogSlNPTi5zdHJpbmdpZnkoY2FydEl0ZW1zKSxcblx0XHR9KS50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuXHR9LFxuXG5cdGFkZENhcnRJdGVtOiAodXJsLCBjYXJ0SWQsIGNhcnRJdGVtcykgPT4ge1xuXHRcdHJldHVybiBmZXRjaCh1cmwgKyBjYXJ0SWQgKyAnL2l0ZW1zLycsIHtcblx0XHRcdG1ldGhvZDogJ1BPU1QnLFxuXHRcdFx0Y3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicsXG5cdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdCdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG5cdFx0XHR9LFxuXHRcdFx0Ym9keTogSlNPTi5zdHJpbmdpZnkoY2FydEl0ZW1zKSxcblx0XHR9KS50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuXHR9LFxuXG5cdGdldENhcnQ6ICh1cmwpID0+IHtcblx0XHRyZXR1cm4gZmV0Y2godXJsLCB7XG5cdFx0XHRtZXRob2Q6ICdHRVQnLFxuXHRcdFx0Y3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicsXG5cdFx0fSkudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcblx0fSxcblxuXHRkZWxldGVDYXJ0OiAodXJsLCBjYXJ0SWQpID0+IHtcblx0XHRyZXR1cm4gZmV0Y2godXJsICsgY2FydElkLCB7XG5cdFx0XHRtZXRob2Q6ICdERUxFVEUnLFxuXHRcdFx0Y3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicsXG5cdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdCdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG5cdFx0XHR9LFxuXHRcdH0pLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG5cdH0sXG5cblx0ZGVsZXRlQ2FydEl0ZW06ICh1cmwsIGNhcnRJZCwgaXRlbUlkKSA9PiB7XG5cdFx0cmV0dXJuIGZldGNoKHVybCArIGNhcnRJZCArICcvaXRlbXMvJyArIGl0ZW1JZCwge1xuXHRcdFx0bWV0aG9kOiAnREVMRVRFJyxcblx0XHRcdGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nLFxuXHRcdFx0aGVhZGVyczoge1xuXHRcdFx0XHQnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuXHRcdFx0fSxcblx0XHR9KS50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuXHR9LFxuXG5cdGl0ZW1Db3VsZE5vdEJlQWRkZWRBbGVydCgpIHt9LFxuXG5cdGl0ZW1BZGRlZEFsZXJ0KCkge30sXG5cblx0aGFuZGxlSXRlbUFkZFJlc3BvbnNlKHJlc3BvbnNlKSB7XG5cdFx0cmV0dXJuIHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwXG5cdFx0XHQ/IHRoaXMuaXRlbUNvdWxkTm90QmVBZGRlZEFsZXJ0KClcblx0XHRcdDogdGhpcy5pdGVtQWRkZWRBbGVydCgpXG5cdH0sXG59XG4iLCJpbXBvcnQgeyBob29rcyB9IGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJ1xuaW1wb3J0IENhdGFsb2dQYWdlIGZyb20gJy4vY2F0YWxvZydcbmltcG9ydCBjb21wYXJlUHJvZHVjdHMgZnJvbSAnLi9nbG9iYWwvY29tcGFyZS1wcm9kdWN0cydcbmltcG9ydCBGYWNldGVkU2VhcmNoIGZyb20gJy4vY29tbW9uL2ZhY2V0ZWQtc2VhcmNoJ1xuaW1wb3J0IHsgY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5IH0gZnJvbSAnLi4vdGhlbWUvY29tbW9uL3V0aWxzL3RyYW5zbGF0aW9ucy11dGlscydcbmltcG9ydCBDYXJ0VXRpbHMgZnJvbSAnLi9jYXJ0L2NhcnQtdXRpbHMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhdGVnb3J5IGV4dGVuZHMgQ2F0YWxvZ1BhZ2Uge1xuXHRjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG5cdFx0c3VwZXIoY29udGV4dClcblx0XHR0aGlzLnZhbGlkYXRpb25EaWN0aW9uYXJ5ID0gY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5KGNvbnRleHQpXG5cdFx0dGhpcy5pbml0UmVtb3ZlQWxsSXRlbXNCdG4oKVxuXHR9XG5cblx0c2V0TGl2ZVJlZ2lvbkF0dHJpYnV0ZXMoJGVsZW1lbnQsIHJvbGVUeXBlLCBhcmlhTGl2ZVN0YXR1cykge1xuXHRcdCRlbGVtZW50LmF0dHIoe1xuXHRcdFx0cm9sZTogcm9sZVR5cGUsXG5cdFx0XHQnYXJpYS1saXZlJzogYXJpYUxpdmVTdGF0dXMsXG5cdFx0fSlcblx0fVxuXG5cdG1ha2VTaG9wQnlQcmljZUZpbHRlckFjY2Vzc2libGUoKSB7XG5cdFx0aWYgKCEkKCdbZGF0YS1zaG9wLWJ5LXByaWNlXScpLmxlbmd0aCkgcmV0dXJuXG5cblx0XHRpZiAoJCgnLm5hdkxpc3QtYWN0aW9uJykuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpKSB7XG5cdFx0XHQkKCdhLm5hdkxpc3QtYWN0aW9uLmlzLWFjdGl2ZScpLmZvY3VzKClcblx0XHR9XG5cblx0XHQkKCdhLm5hdkxpc3QtYWN0aW9uJykub24oJ2NsaWNrJywgKCkgPT5cblx0XHRcdHRoaXMuc2V0TGl2ZVJlZ2lvbkF0dHJpYnV0ZXMoXG5cdFx0XHRcdCQoJ3NwYW4ucHJpY2UtZmlsdGVyLW1lc3NhZ2UnKSxcblx0XHRcdFx0J3N0YXR1cycsXG5cdFx0XHRcdCdhc3NlcnRpdmUnXG5cdFx0XHQpXG5cdFx0KVxuXHR9XG5cblx0b25SZWFkeSgpIHtcblx0XHR0aGlzLmFycmFuZ2VGb2N1c09uU29ydEJ5KClcblx0XHR0aGlzLmluaXRBZGRBbGxUb0NhcnRCdG4oKVxuXHRcdFxuXHRcdFxuXHRcdCQoJ1tkYXRhLWJ1dHRvbi10eXBlPVwiYWRkLWNhcnRcIl0nKS5vbignY2xpY2snLCAoZSkgPT5cblx0XHRcdHRoaXMuc2V0TGl2ZVJlZ2lvbkF0dHJpYnV0ZXMoXG5cdFx0XHRcdCQoZS5jdXJyZW50VGFyZ2V0KS5uZXh0KCksXG5cdFx0XHRcdCdzdGF0dXMnLFxuXHRcdFx0XHQncG9saXRlJ1xuXHRcdFx0KVxuXHRcdClcblxuXHRcdHRoaXMubWFrZVNob3BCeVByaWNlRmlsdGVyQWNjZXNzaWJsZSgpXG5cblx0XHRjb21wYXJlUHJvZHVjdHModGhpcy5jb250ZXh0KVxuXG5cdFx0aWYgKCQoJyNmYWNldGVkU2VhcmNoJykubGVuZ3RoID4gMCkge1xuXHRcdFx0dGhpcy5pbml0RmFjZXRlZFNlYXJjaCgpXG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMub25Tb3J0QnlTdWJtaXQgPSB0aGlzLm9uU29ydEJ5U3VibWl0LmJpbmQodGhpcylcblx0XHRcdGhvb2tzLm9uKCdzb3J0Qnktc3VibWl0dGVkJywgdGhpcy5vblNvcnRCeVN1Ym1pdClcblx0XHR9XG5cdFx0dGhpcy5pbml0UHJvZHVjdEltYWdlSG92ZXIoKVxuXG5cdFx0JCgnYS5yZXNldC1idG4nKS5vbignY2xpY2snLCAoKSA9PlxuXHRcdFx0dGhpcy5zZXRMaXZlUmVnaW9uc0F0dHJpYnV0ZXMoJCgnc3Bhbi5yZXNldC1tZXNzYWdlJyksICdzdGF0dXMnLCAncG9saXRlJylcblx0XHQpXG5cdFx0dGhpcy5hcmlhTm90aWZ5Tm9Qcm9kdWN0cygpXG5cdH1cblxuXHRpbml0UHJvZHVjdEltYWdlSG92ZXIoKSB7XG5cdFx0JCgnLmNhcmQtZmlndXJlJykub24oJ21vdXNlZW50ZXInLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRjb25zdCAkaW1nID0gJCh0aGlzKS5maW5kKCcuY2FyZC1pbWFnZScpXG5cdFx0XHRjb25zdCBzcmMgPSAkaW1nLmF0dHIoJ3NyYycpXG5cdFx0XHRjb25zdCBob3ZlclNyYyA9ICRpbWdcblx0XHRcdFx0LmF0dHIoJ2RhdGEtaG92ZXItc3JjJylcblx0XHRcdFx0LnJlcGxhY2UoJ3s6c2l6ZX0nLCAkKHRoaXMpLmhlaWdodCgpICsgJ3gnICsgJCh0aGlzKS53aWR0aCgpKVxuXHRcdFx0JGltZy5hdHRyKCdzcmNzZXQnLCBob3ZlclNyYylcblxuXHRcdFx0JCh0aGlzKS5vbignbW91c2VsZWF2ZScsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0JGltZy5hdHRyKCdzcmNzZXQnLCBzcmMpXG5cdFx0XHR9KVxuXHRcdH0pXG5cdH1cblxuXHRpbml0UmVtb3ZlQWxsSXRlbXNCdG4oKXtcblxuXHR9XG5cblx0aW5pdEFkZEFsbFRvQ2FydEJ0bigpIHtcblx0XHQkKCcuYWRkLWFsbC10by1jYXJ0LWJ0bicpLm9uKCdjbGljaycsICgpID0+IHtcblx0XHRcdGNvbnN0IGRhdGEgPSB7IGxpbmVJdGVtczogdGhpcy5nZXRBbGxDYXRlZ29yeVByb2R1Y3RJZHMoKSB9XG5cblx0XHRcdENhcnRVdGlscy5nZXRDYXJ0KFxuXHRcdFx0XHQnL2FwaS9zdG9yZWZyb250L2NhcnQvP2luY2x1ZGU9bGluZUl0ZW1zLmRpZ2l0YWxJdGVtcy5vcHRpb25zLGxpbmVJdGVtcy5waHlzaWNhbEl0ZW1zLm9wdGlvbnMnXG5cdFx0XHQpLnRoZW4oKGV4aXN0aW5nQ2FydCkgPT4ge1xuXHRcdFx0XHRpZiAoZXhpc3RpbmdDYXJ0WzBdPy5pZCkge1xuXHRcdFx0XHRcdENhcnRVdGlscy5hZGRDYXJ0SXRlbShcblx0XHRcdFx0XHRcdCcvYXBpL3N0b3JlZnJvbnQvY2FydHMvJyxcblx0XHRcdFx0XHRcdGV4aXN0aW5nQ2FydFswXS5pZCxcblx0XHRcdFx0XHRcdGRhdGFcblx0XHRcdFx0XHQpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhyZXNwb25zZSlcblx0XHRcdFx0XHRcdENhcnRVdGlscy5oYW5kbGVJdGVtQWRkUmVzcG9uc2UocmVzcG9uc2UpXG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRDYXJ0VXRpbHMuY3JlYXRlQ2FydCgnL2FwaS9zdG9yZWZyb250L2NhcnQnLCBkYXRhKS50aGVuKFxuXHRcdFx0XHRcdFx0KHJlc3BvbnNlKSA9PiB7XG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuXHRcdFx0XHRcdFx0XHRDYXJ0VXRpbHMuaGFuZGxlSXRlbUFkZFJlc3BvbnNlKHJlc3BvbnNlKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdClcblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHR9KVxuXHR9XG5cblx0Z2V0QWxsQ2F0ZWdvcnlQcm9kdWN0SWRzKCkge1xuXHRcdGNvbnN0IGlkcyA9IFtdXG5cblx0XHQkKCdbZGF0YS1wcm9kdWN0LWlkXScpLmVhY2goKGluZGV4LCBlbGUpID0+IHtcblx0XHRcdGlkcy5wdXNoKCQoZWxlKS5hdHRyKCdkYXRhLXByb2R1Y3QtaWQnKSlcblx0XHR9KVxuXG5cdFx0cmV0dXJuIGlkcy5tYXAoKGlkKSA9PiAoe1xuXHRcdFx0cXVhbnRpdHk6IDEsXG5cdFx0XHRwcm9kdWN0SWQ6IGlkLFxuXHRcdH0pKVxuXG5cdFx0cmV0dXJuIHVuaXF1ZUlkc1xuXHR9XG5cblx0YXJpYU5vdGlmeU5vUHJvZHVjdHMoKSB7XG5cdFx0Y29uc3QgJG5vUHJvZHVjdHNNZXNzYWdlID0gJCgnW2RhdGEtbm8tcHJvZHVjdHMtbm90aWZpY2F0aW9uXScpXG5cdFx0aWYgKCRub1Byb2R1Y3RzTWVzc2FnZS5sZW5ndGgpIHtcblx0XHRcdCRub1Byb2R1Y3RzTWVzc2FnZS5mb2N1cygpXG5cdFx0fVxuXHR9XG5cblx0aW5pdEZhY2V0ZWRTZWFyY2goKSB7XG5cdFx0Y29uc3Qge1xuXHRcdFx0cHJpY2VfbWluX2V2YWx1YXRpb246IG9uTWluUHJpY2VFcnJvcixcblx0XHRcdHByaWNlX21heF9ldmFsdWF0aW9uOiBvbk1heFByaWNlRXJyb3IsXG5cdFx0XHRwcmljZV9taW5fbm90X2VudGVyZWQ6IG1pblByaWNlTm90RW50ZXJlZCxcblx0XHRcdHByaWNlX21heF9ub3RfZW50ZXJlZDogbWF4UHJpY2VOb3RFbnRlcmVkLFxuXHRcdFx0cHJpY2VfaW52YWxpZF92YWx1ZTogb25JbnZhbGlkUHJpY2UsXG5cdFx0fSA9IHRoaXMudmFsaWRhdGlvbkRpY3Rpb25hcnlcblx0XHRjb25zdCAkcHJvZHVjdExpc3RpbmdDb250YWluZXIgPSAkKCcjcHJvZHVjdC1saXN0aW5nLWNvbnRhaW5lcicpXG5cdFx0Y29uc3QgJGZhY2V0ZWRTZWFyY2hDb250YWluZXIgPSAkKCcjZmFjZXRlZC1zZWFyY2gtY29udGFpbmVyJylcblx0XHRjb25zdCBwcm9kdWN0c1BlclBhZ2UgPSB0aGlzLmNvbnRleHQuY2F0ZWdvcnlQcm9kdWN0c1BlclBhZ2Vcblx0XHRjb25zdCByZXF1ZXN0T3B0aW9ucyA9IHtcblx0XHRcdGNvbmZpZzoge1xuXHRcdFx0XHRjYXRlZ29yeToge1xuXHRcdFx0XHRcdHNob3BfYnlfcHJpY2U6IHRydWUsXG5cdFx0XHRcdFx0cHJvZHVjdHM6IHtcblx0XHRcdFx0XHRcdGxpbWl0OiBwcm9kdWN0c1BlclBhZ2UsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSxcblx0XHRcdH0sXG5cdFx0XHR0ZW1wbGF0ZToge1xuXHRcdFx0XHRwcm9kdWN0TGlzdGluZzogJ2NhdGVnb3J5L3Byb2R1Y3QtbGlzdGluZycsXG5cdFx0XHRcdHNpZGViYXI6ICdjYXRlZ29yeS9zaWRlYmFyJyxcblx0XHRcdH0sXG5cdFx0XHRzaG93TW9yZTogJ2NhdGVnb3J5L3Nob3ctbW9yZScsXG5cdFx0fVxuXG5cdFx0dGhpcy5mYWNldGVkU2VhcmNoID0gbmV3IEZhY2V0ZWRTZWFyY2goXG5cdFx0XHRyZXF1ZXN0T3B0aW9ucyxcblx0XHRcdChjb250ZW50KSA9PiB7XG5cdFx0XHRcdCRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lci5odG1sKGNvbnRlbnQucHJvZHVjdExpc3RpbmcpXG5cdFx0XHRcdCRmYWNldGVkU2VhcmNoQ29udGFpbmVyLmh0bWwoY29udGVudC5zaWRlYmFyKVxuXG5cdFx0XHRcdCQoJ2JvZHknKS50cmlnZ2VySGFuZGxlcignY29tcGFyZVJlc2V0JylcblxuXHRcdFx0XHQkKCdodG1sLCBib2R5JykuYW5pbWF0ZShcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRzY3JvbGxUb3A6IDAsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHQxMDBcblx0XHRcdFx0KVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dmFsaWRhdGlvbkVycm9yTWVzc2FnZXM6IHtcblx0XHRcdFx0XHRvbk1pblByaWNlRXJyb3IsXG5cdFx0XHRcdFx0b25NYXhQcmljZUVycm9yLFxuXHRcdFx0XHRcdG1pblByaWNlTm90RW50ZXJlZCxcblx0XHRcdFx0XHRtYXhQcmljZU5vdEVudGVyZWQsXG5cdFx0XHRcdFx0b25JbnZhbGlkUHJpY2UsXG5cdFx0XHRcdH0sXG5cdFx0XHR9XG5cdFx0KVxuXHR9XG59XG4iLCJjb25zdCBUUkFOU0xBVElPTlMgPSAndHJhbnNsYXRpb25zJztcbmNvbnN0IGlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkgPSAoZGljdGlvbmFyeSkgPT4gISFPYmplY3Qua2V5cyhkaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pLmxlbmd0aDtcbmNvbnN0IGNob29zZUFjdGl2ZURpY3Rpb25hcnkgPSAoLi4uZGljdGlvbmFyeUpzb25MaXN0KSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaWN0aW9uYXJ5SnNvbkxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZGljdGlvbmFyeSA9IEpTT04ucGFyc2UoZGljdGlvbmFyeUpzb25MaXN0W2ldKTtcbiAgICAgICAgaWYgKGlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkoZGljdGlvbmFyeSkpIHtcbiAgICAgICAgICAgIHJldHVybiBkaWN0aW9uYXJ5O1xuICAgICAgICB9XG4gICAgfVxufTtcblxuLyoqXG4gKiBkZWZpbmVzIFRyYW5zbGF0aW9uIERpY3Rpb25hcnkgdG8gdXNlXG4gKiBAcGFyYW0gY29udGV4dCBwcm92aWRlcyBhY2Nlc3MgdG8gMyB2YWxpZGF0aW9uIEpTT05zIGZyb20gZW4uanNvbjpcbiAqIHZhbGlkYXRpb25fbWVzc2FnZXMsIHZhbGlkYXRpb25fZmFsbGJhY2tfbWVzc2FnZXMgYW5kIGRlZmF1bHRfbWVzc2FnZXNcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkgPSAoY29udGV4dCkgPT4ge1xuICAgIGNvbnN0IHsgdmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTiB9ID0gY29udGV4dDtcbiAgICBjb25zdCBhY3RpdmVEaWN0aW9uYXJ5ID0gY2hvb3NlQWN0aXZlRGljdGlvbmFyeSh2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OKTtcbiAgICBjb25zdCBsb2NhbGl6YXRpb25zID0gT2JqZWN0LnZhbHVlcyhhY3RpdmVEaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pO1xuICAgIGNvbnN0IHRyYW5zbGF0aW9uS2V5cyA9IE9iamVjdC5rZXlzKGFjdGl2ZURpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSkubWFwKGtleSA9PiBrZXkuc3BsaXQoJy4nKS5wb3AoKSk7XG5cbiAgICByZXR1cm4gdHJhbnNsYXRpb25LZXlzLnJlZHVjZSgoYWNjLCBrZXksIGkpID0+IHtcbiAgICAgICAgYWNjW2tleV0gPSBsb2NhbGl6YXRpb25zW2ldO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KTtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9