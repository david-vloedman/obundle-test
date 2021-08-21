(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

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

    this.setProductImageOnHover();
    $('a.reset-btn').on('click', function () {
      return _this3.setLiveRegionsAttributes($('span.reset-message'), 'status', 'polite');
    });
    this.ariaNotifyNoProducts();
  };

  _proto.setProductImageOnHover = function setProductImageOnHover() {
    $('.card-figure').on('mouseenter', function () {
      var $img = $(this).find('.card-image');
      var src = $img.attr('src');
      var hoverSrc = $img.attr('data-hover-src').replace('{:size}', $(this).height() + "x" + $(this).width());
      $img.attr('srcset', hoverSrc);
      $(this).on('mouseleave', function () {
        $img.attr('srcset', src);
      });
    });
  };

  _proto.addAllToCartHandler = function addAllToCartHandler() {
    console.log(this.context);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2F0ZWdvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi91dGlscy90cmFuc2xhdGlvbnMtdXRpbHMuanMiXSwibmFtZXMiOlsiQ2F0ZWdvcnkiLCJjb250ZXh0IiwidmFsaWRhdGlvbkRpY3Rpb25hcnkiLCJjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkiLCJzZXRMaXZlUmVnaW9uQXR0cmlidXRlcyIsIiRlbGVtZW50Iiwicm9sZVR5cGUiLCJhcmlhTGl2ZVN0YXR1cyIsImF0dHIiLCJyb2xlIiwibWFrZVNob3BCeVByaWNlRmlsdGVyQWNjZXNzaWJsZSIsIiQiLCJsZW5ndGgiLCJoYXNDbGFzcyIsImZvY3VzIiwib24iLCJvblJlYWR5IiwiYXJyYW5nZUZvY3VzT25Tb3J0QnkiLCJlIiwiY3VycmVudFRhcmdldCIsIm5leHQiLCJjb21wYXJlUHJvZHVjdHMiLCJpbml0RmFjZXRlZFNlYXJjaCIsIm9uU29ydEJ5U3VibWl0IiwiYmluZCIsImhvb2tzIiwic2V0UHJvZHVjdEltYWdlT25Ib3ZlciIsInNldExpdmVSZWdpb25zQXR0cmlidXRlcyIsImFyaWFOb3RpZnlOb1Byb2R1Y3RzIiwiJGltZyIsImZpbmQiLCJzcmMiLCJob3ZlclNyYyIsInJlcGxhY2UiLCJoZWlnaHQiLCJ3aWR0aCIsImFkZEFsbFRvQ2FydEhhbmRsZXIiLCJjb25zb2xlIiwibG9nIiwiJG5vUHJvZHVjdHNNZXNzYWdlIiwib25NaW5QcmljZUVycm9yIiwicHJpY2VfbWluX2V2YWx1YXRpb24iLCJvbk1heFByaWNlRXJyb3IiLCJwcmljZV9tYXhfZXZhbHVhdGlvbiIsIm1pblByaWNlTm90RW50ZXJlZCIsInByaWNlX21pbl9ub3RfZW50ZXJlZCIsIm1heFByaWNlTm90RW50ZXJlZCIsInByaWNlX21heF9ub3RfZW50ZXJlZCIsIm9uSW52YWxpZFByaWNlIiwicHJpY2VfaW52YWxpZF92YWx1ZSIsIiRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lciIsIiRmYWNldGVkU2VhcmNoQ29udGFpbmVyIiwicHJvZHVjdHNQZXJQYWdlIiwiY2F0ZWdvcnlQcm9kdWN0c1BlclBhZ2UiLCJyZXF1ZXN0T3B0aW9ucyIsImNvbmZpZyIsImNhdGVnb3J5Iiwic2hvcF9ieV9wcmljZSIsInByb2R1Y3RzIiwibGltaXQiLCJ0ZW1wbGF0ZSIsInByb2R1Y3RMaXN0aW5nIiwic2lkZWJhciIsInNob3dNb3JlIiwiZmFjZXRlZFNlYXJjaCIsIkZhY2V0ZWRTZWFyY2giLCJjb250ZW50IiwiaHRtbCIsInRyaWdnZXJIYW5kbGVyIiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsInZhbGlkYXRpb25FcnJvck1lc3NhZ2VzIiwiQ2F0YWxvZ1BhZ2UiLCJUUkFOU0xBVElPTlMiLCJpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5IiwiZGljdGlvbmFyeSIsIk9iamVjdCIsImtleXMiLCJjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5IiwiaSIsIkpTT04iLCJwYXJzZSIsInZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiIsInZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OIiwidmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTiIsImFjdGl2ZURpY3Rpb25hcnkiLCJsb2NhbGl6YXRpb25zIiwidmFsdWVzIiwidHJhbnNsYXRpb25LZXlzIiwibWFwIiwia2V5Iiwic3BsaXQiLCJwb3AiLCJyZWR1Y2UiLCJhY2MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0lBRXFCQSxROzs7QUFDcEIsb0JBQVlDLE9BQVosRUFBcUI7QUFBQTs7QUFDcEIsb0NBQU1BLE9BQU47QUFDQSxVQUFLQyxvQkFBTCxHQUE0QkMsMEdBQTJCLENBQUNGLE9BQUQsQ0FBdkQ7QUFGb0I7QUFHcEI7Ozs7U0FFREcsdUIsR0FBQSxpQ0FBd0JDLFFBQXhCLEVBQWtDQyxRQUFsQyxFQUE0Q0MsY0FB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Q3BELE1BQVFpRix3QkFBUixHQUF3R2pGLE9BQXhHLENBQVFpRix3QkFBUjtBQUFBLE1BQWtDQyxnQ0FBbEMsR0FBd0dsRixPQUF4RyxDQUFrQ2tGLGdDQUFsQztBQUFBLE1BQW9FQywrQkFBcEUsR0FBd0duRixPQUF4RyxDQUFvRW1GLCtCQUFwRTtBQUNBLE1BQU1DLGdCQUFnQixHQUFHUCxzQkFBc0IsQ0FBQ0ksd0JBQUQsRUFBMkJDLGdDQUEzQixFQUE2REMsK0JBQTdELENBQS9DO0FBQ0EsTUFBTUUsYUFBYSxHQUFHVixNQUFNLENBQUNXLE1BQVAsQ0FBY0YsZ0JBQWdCLENBQUNaLFlBQUQsQ0FBOUIsQ0FBdEI7QUFDQSxNQUFNZSxlQUFlLEdBQUdaLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZUSxnQkFBZ0IsQ0FBQ1osWUFBRCxDQUE1QixFQUE0Q2dCLEdBQTVDLENBQWdELFVBQUFDLEdBQUc7QUFBQSxXQUFJQSxHQUFHLENBQUNDLEtBQUosQ0FBVSxHQUFWLEVBQWVDLEdBQWYsRUFBSjtBQUFBLEdBQW5ELENBQXhCO0FBRUEsU0FBT0osZUFBZSxDQUFDSyxNQUFoQixDQUF1QixVQUFDQyxHQUFELEVBQU1KLEdBQU4sRUFBV1gsQ0FBWCxFQUFpQjtBQUMzQ2UsT0FBRyxDQUFDSixHQUFELENBQUgsR0FBV0osYUFBYSxDQUFDUCxDQUFELENBQXhCO0FBQ0EsV0FBT2UsR0FBUDtBQUNILEdBSE0sRUFHSixFQUhJLENBQVA7QUFJSCxDQVZNLEMiLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLjExLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaG9va3MgfSBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscydcbmltcG9ydCBDYXRhbG9nUGFnZSBmcm9tICcuL2NhdGFsb2cnXG5pbXBvcnQgY29tcGFyZVByb2R1Y3RzIGZyb20gJy4vZ2xvYmFsL2NvbXBhcmUtcHJvZHVjdHMnXG5pbXBvcnQgRmFjZXRlZFNlYXJjaCBmcm9tICcuL2NvbW1vbi9mYWNldGVkLXNlYXJjaCdcbmltcG9ydCB7IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSB9IGZyb20gJy4uL3RoZW1lL2NvbW1vbi91dGlscy90cmFuc2xhdGlvbnMtdXRpbHMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhdGVnb3J5IGV4dGVuZHMgQ2F0YWxvZ1BhZ2Uge1xuXHRjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG5cdFx0c3VwZXIoY29udGV4dClcblx0XHR0aGlzLnZhbGlkYXRpb25EaWN0aW9uYXJ5ID0gY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5KGNvbnRleHQpXG5cdH1cblxuXHRzZXRMaXZlUmVnaW9uQXR0cmlidXRlcygkZWxlbWVudCwgcm9sZVR5cGUsIGFyaWFMaXZlU3RhdHVzKSB7XG5cdFx0JGVsZW1lbnQuYXR0cih7XG5cdFx0XHRyb2xlOiByb2xlVHlwZSxcblx0XHRcdCdhcmlhLWxpdmUnOiBhcmlhTGl2ZVN0YXR1cyxcblx0XHR9KVxuXHR9XG5cblx0bWFrZVNob3BCeVByaWNlRmlsdGVyQWNjZXNzaWJsZSgpIHtcblx0XHRpZiAoISQoJ1tkYXRhLXNob3AtYnktcHJpY2VdJykubGVuZ3RoKSByZXR1cm5cblxuXHRcdGlmICgkKCcubmF2TGlzdC1hY3Rpb24nKS5oYXNDbGFzcygnaXMtYWN0aXZlJykpIHtcblx0XHRcdCQoJ2EubmF2TGlzdC1hY3Rpb24uaXMtYWN0aXZlJykuZm9jdXMoKVxuXHRcdH1cblxuXHRcdCQoJ2EubmF2TGlzdC1hY3Rpb24nKS5vbignY2xpY2snLCAoKSA9PlxuXHRcdFx0dGhpcy5zZXRMaXZlUmVnaW9uQXR0cmlidXRlcyhcblx0XHRcdFx0JCgnc3Bhbi5wcmljZS1maWx0ZXItbWVzc2FnZScpLFxuXHRcdFx0XHQnc3RhdHVzJyxcblx0XHRcdFx0J2Fzc2VydGl2ZSdcblx0XHRcdClcblx0XHQpXG5cdH1cblxuXHRvblJlYWR5KCkge1xuXHRcdHRoaXMuYXJyYW5nZUZvY3VzT25Tb3J0QnkoKVxuXG5cdFx0JCgnW2RhdGEtYnV0dG9uLXR5cGU9XCJhZGQtY2FydFwiXScpLm9uKCdjbGljaycsIChlKSA9PlxuXHRcdFx0dGhpcy5zZXRMaXZlUmVnaW9uQXR0cmlidXRlcyhcblx0XHRcdFx0JChlLmN1cnJlbnRUYXJnZXQpLm5leHQoKSxcblx0XHRcdFx0J3N0YXR1cycsXG5cdFx0XHRcdCdwb2xpdGUnXG5cdFx0XHQpXG5cdFx0KVxuXG5cdFx0dGhpcy5tYWtlU2hvcEJ5UHJpY2VGaWx0ZXJBY2Nlc3NpYmxlKClcblxuXHRcdGNvbXBhcmVQcm9kdWN0cyh0aGlzLmNvbnRleHQpXG5cblx0XHRpZiAoJCgnI2ZhY2V0ZWRTZWFyY2gnKS5sZW5ndGggPiAwKSB7XG5cdFx0XHR0aGlzLmluaXRGYWNldGVkU2VhcmNoKClcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5vblNvcnRCeVN1Ym1pdCA9IHRoaXMub25Tb3J0QnlTdWJtaXQuYmluZCh0aGlzKVxuXHRcdFx0aG9va3Mub24oJ3NvcnRCeS1zdWJtaXR0ZWQnLCB0aGlzLm9uU29ydEJ5U3VibWl0KVxuXHRcdH1cblx0XHR0aGlzLnNldFByb2R1Y3RJbWFnZU9uSG92ZXIoKVxuXHRcdCQoJ2EucmVzZXQtYnRuJykub24oJ2NsaWNrJywgKCkgPT5cblx0XHRcdHRoaXMuc2V0TGl2ZVJlZ2lvbnNBdHRyaWJ1dGVzKCQoJ3NwYW4ucmVzZXQtbWVzc2FnZScpLCAnc3RhdHVzJywgJ3BvbGl0ZScpXG5cdFx0KVxuXHRcdHRoaXMuYXJpYU5vdGlmeU5vUHJvZHVjdHMoKVxuXHR9XG5cblx0c2V0UHJvZHVjdEltYWdlT25Ib3ZlcigpIHtcblx0XHQkKCcuY2FyZC1maWd1cmUnKS5vbignbW91c2VlbnRlcicsIGZ1bmN0aW9uICgpIHtcblx0XHRcdGNvbnN0ICRpbWcgPSAkKHRoaXMpLmZpbmQoJy5jYXJkLWltYWdlJylcblx0XHRcdGNvbnN0IHNyYyA9ICRpbWcuYXR0cignc3JjJylcblx0XHRcdGNvbnN0IGhvdmVyU3JjID0gJGltZ1xuXHRcdFx0XHQuYXR0cignZGF0YS1ob3Zlci1zcmMnKVxuXHRcdFx0XHQucmVwbGFjZSgnezpzaXplfScsICQodGhpcykuaGVpZ2h0KCkgKyBcInhcIiArICQodGhpcykud2lkdGgoKSlcblx0XHRcdCRpbWcuYXR0cignc3Jjc2V0JywgaG92ZXJTcmMpXG5cblx0XHRcdCQodGhpcykub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdCRpbWcuYXR0cignc3Jjc2V0Jywgc3JjKVxuXHRcdFx0fSlcblx0XHR9KVxuXHR9XG5cbiAgICBhZGRBbGxUb0NhcnRIYW5kbGVyKCl7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY29udGV4dClcbiAgICB9XG5cblxuXHRhcmlhTm90aWZ5Tm9Qcm9kdWN0cygpIHtcblx0XHRjb25zdCAkbm9Qcm9kdWN0c01lc3NhZ2UgPSAkKCdbZGF0YS1uby1wcm9kdWN0cy1ub3RpZmljYXRpb25dJylcblx0XHRpZiAoJG5vUHJvZHVjdHNNZXNzYWdlLmxlbmd0aCkge1xuXHRcdFx0JG5vUHJvZHVjdHNNZXNzYWdlLmZvY3VzKClcblx0XHR9XG5cdH1cblxuXHRpbml0RmFjZXRlZFNlYXJjaCgpIHtcblx0XHRjb25zdCB7XG5cdFx0XHRwcmljZV9taW5fZXZhbHVhdGlvbjogb25NaW5QcmljZUVycm9yLFxuXHRcdFx0cHJpY2VfbWF4X2V2YWx1YXRpb246IG9uTWF4UHJpY2VFcnJvcixcblx0XHRcdHByaWNlX21pbl9ub3RfZW50ZXJlZDogbWluUHJpY2VOb3RFbnRlcmVkLFxuXHRcdFx0cHJpY2VfbWF4X25vdF9lbnRlcmVkOiBtYXhQcmljZU5vdEVudGVyZWQsXG5cdFx0XHRwcmljZV9pbnZhbGlkX3ZhbHVlOiBvbkludmFsaWRQcmljZSxcblx0XHR9ID0gdGhpcy52YWxpZGF0aW9uRGljdGlvbmFyeVxuXHRcdGNvbnN0ICRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lciA9ICQoJyNwcm9kdWN0LWxpc3RpbmctY29udGFpbmVyJylcblx0XHRjb25zdCAkZmFjZXRlZFNlYXJjaENvbnRhaW5lciA9ICQoJyNmYWNldGVkLXNlYXJjaC1jb250YWluZXInKVxuXHRcdGNvbnN0IHByb2R1Y3RzUGVyUGFnZSA9IHRoaXMuY29udGV4dC5jYXRlZ29yeVByb2R1Y3RzUGVyUGFnZVxuXHRcdGNvbnN0IHJlcXVlc3RPcHRpb25zID0ge1xuXHRcdFx0Y29uZmlnOiB7XG5cdFx0XHRcdGNhdGVnb3J5OiB7XG5cdFx0XHRcdFx0c2hvcF9ieV9wcmljZTogdHJ1ZSxcblx0XHRcdFx0XHRwcm9kdWN0czoge1xuXHRcdFx0XHRcdFx0bGltaXQ6IHByb2R1Y3RzUGVyUGFnZSxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHR9LFxuXHRcdFx0fSxcblx0XHRcdHRlbXBsYXRlOiB7XG5cdFx0XHRcdHByb2R1Y3RMaXN0aW5nOiAnY2F0ZWdvcnkvcHJvZHVjdC1saXN0aW5nJyxcblx0XHRcdFx0c2lkZWJhcjogJ2NhdGVnb3J5L3NpZGViYXInLFxuXHRcdFx0fSxcblx0XHRcdHNob3dNb3JlOiAnY2F0ZWdvcnkvc2hvdy1tb3JlJyxcblx0XHR9XG5cblx0XHR0aGlzLmZhY2V0ZWRTZWFyY2ggPSBuZXcgRmFjZXRlZFNlYXJjaChcblx0XHRcdHJlcXVlc3RPcHRpb25zLFxuXHRcdFx0KGNvbnRlbnQpID0+IHtcblx0XHRcdFx0JHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyLmh0bWwoY29udGVudC5wcm9kdWN0TGlzdGluZylcblx0XHRcdFx0JGZhY2V0ZWRTZWFyY2hDb250YWluZXIuaHRtbChjb250ZW50LnNpZGViYXIpXG5cblx0XHRcdFx0JCgnYm9keScpLnRyaWdnZXJIYW5kbGVyKCdjb21wYXJlUmVzZXQnKVxuXG5cdFx0XHRcdCQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHNjcm9sbFRvcDogMCxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdDEwMFxuXHRcdFx0XHQpXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR2YWxpZGF0aW9uRXJyb3JNZXNzYWdlczoge1xuXHRcdFx0XHRcdG9uTWluUHJpY2VFcnJvcixcblx0XHRcdFx0XHRvbk1heFByaWNlRXJyb3IsXG5cdFx0XHRcdFx0bWluUHJpY2VOb3RFbnRlcmVkLFxuXHRcdFx0XHRcdG1heFByaWNlTm90RW50ZXJlZCxcblx0XHRcdFx0XHRvbkludmFsaWRQcmljZSxcblx0XHRcdFx0fSxcblx0XHRcdH1cblx0XHQpXG5cdH1cbn1cbiIsImNvbnN0IFRSQU5TTEFUSU9OUyA9ICd0cmFuc2xhdGlvbnMnO1xuY29uc3QgaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eSA9IChkaWN0aW9uYXJ5KSA9PiAhIU9iamVjdC5rZXlzKGRpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSkubGVuZ3RoO1xuY29uc3QgY2hvb3NlQWN0aXZlRGljdGlvbmFyeSA9ICguLi5kaWN0aW9uYXJ5SnNvbkxpc3QpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpY3Rpb25hcnlKc29uTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBkaWN0aW9uYXJ5ID0gSlNPTi5wYXJzZShkaWN0aW9uYXJ5SnNvbkxpc3RbaV0pO1xuICAgICAgICBpZiAoaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eShkaWN0aW9uYXJ5KSkge1xuICAgICAgICAgICAgcmV0dXJuIGRpY3Rpb25hcnk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vKipcbiAqIGRlZmluZXMgVHJhbnNsYXRpb24gRGljdGlvbmFyeSB0byB1c2VcbiAqIEBwYXJhbSBjb250ZXh0IHByb3ZpZGVzIGFjY2VzcyB0byAzIHZhbGlkYXRpb24gSlNPTnMgZnJvbSBlbi5qc29uOlxuICogdmFsaWRhdGlvbl9tZXNzYWdlcywgdmFsaWRhdGlvbl9mYWxsYmFja19tZXNzYWdlcyBhbmQgZGVmYXVsdF9tZXNzYWdlc1xuICogQHJldHVybnMge09iamVjdH1cbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSA9IChjb250ZXh0KSA9PiB7XG4gICAgY29uc3QgeyB2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OIH0gPSBjb250ZXh0O1xuICAgIGNvbnN0IGFjdGl2ZURpY3Rpb25hcnkgPSBjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5KHZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04pO1xuICAgIGNvbnN0IGxvY2FsaXphdGlvbnMgPSBPYmplY3QudmFsdWVzKGFjdGl2ZURpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSk7XG4gICAgY29uc3QgdHJhbnNsYXRpb25LZXlzID0gT2JqZWN0LmtleXMoYWN0aXZlRGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKS5tYXAoa2V5ID0+IGtleS5zcGxpdCgnLicpLnBvcCgpKTtcblxuICAgIHJldHVybiB0cmFuc2xhdGlvbktleXMucmVkdWNlKChhY2MsIGtleSwgaSkgPT4ge1xuICAgICAgICBhY2Nba2V5XSA9IGxvY2FsaXphdGlvbnNbaV07XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30pO1xufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=