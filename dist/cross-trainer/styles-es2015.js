(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
    ["styles"], {

        /***/
        3:
        /*!******************************!*\
          !*** multi ./src/styles.css ***!
          \******************************/
        /*! no static exports found */
        /***/
            (function(module, exports, __webpack_require__) {

            module.exports = __webpack_require__( /*! /Users/rdodd/coding/cube-trainer/src/styles.css */ "OmL/");


            /***/
        }),

        /***/
        "JPst":
        /*!*****************************************************!*\
          !*** ./node_modules/css-loader/dist/runtime/api.js ***!
          \*****************************************************/
        /*! no static exports found */
        /***/
            (function(module, exports, __webpack_require__) {

            "use strict";


            /*
              MIT License http://www.opensource.org/licenses/mit-license.php
              Author Tobias Koppers @sokra
            */
            // css base code, injected by the css-loader
            // eslint-disable-next-line func-names
            module.exports = function(useSourceMap) {
                var list = []; // return the list of modules as css string

                list.toString = function toString() {
                    return this.map(function(item) {
                        var content = cssWithMappingToString(item, useSourceMap);

                        if (item[2]) {
                            return "@media ".concat(item[2], " {").concat(content, "}");
                        }

                        return content;
                    }).join('');
                }; // import a list of modules into the list
                // eslint-disable-next-line func-names


                list.i = function(modules, mediaQuery, dedupe) {
                    if (typeof modules === 'string') {
                        // eslint-disable-next-line no-param-reassign
                        modules = [
                            [null, modules, '']
                        ];
                    }

                    var alreadyImportedModules = {};

                    if (dedupe) {
                        for (var i = 0; i < this.length; i++) {
                            // eslint-disable-next-line prefer-destructuring
                            var id = this[i][0];

                            if (id != null) {
                                alreadyImportedModules[id] = true;
                            }
                        }
                    }

                    for (var _i = 0; _i < modules.length; _i++) {
                        var item = [].concat(modules[_i]);

                        if (dedupe && alreadyImportedModules[item[0]]) {
                            // eslint-disable-next-line no-continue
                            continue;
                        }

                        if (mediaQuery) {
                            if (!item[2]) {
                                item[2] = mediaQuery;
                            } else {
                                item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
                            }
                        }

                        list.push(item);
                    }
                };

                return list;
            };

            function cssWithMappingToString(item, useSourceMap) {
                var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

                var cssMapping = item[3];

                if (!cssMapping) {
                    return content;
                }

                if (useSourceMap && typeof btoa === 'function') {
                    var sourceMapping = toComment(cssMapping);
                    var sourceURLs = cssMapping.sources.map(function(source) {
                        return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
                    });
                    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
                }

                return [content].join('\n');
            } // Adapted from convert-source-map (MIT)


            function toComment(sourceMap) {
                // eslint-disable-next-line no-undef
                var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
                var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
                return "/*# ".concat(data, " */");
            }

            /***/
        }),

        /***/
        "LboF":
        /*!****************************************************************************!*\
          !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
          \****************************************************************************/
        /*! no static exports found */
        /***/
            (function(module, exports, __webpack_require__) {

            "use strict";


            var isOldIE = function isOldIE() {
                var memo;
                return function memorize() {
                    if (typeof memo === 'undefined') {
                        // Test for IE <= 9 as proposed by Browserhacks
                        // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
                        // Tests for existence of standard globals is to allow style-loader
                        // to operate correctly into non-standard environments
                        // @see https://github.com/webpack-contrib/style-loader/issues/177
                        memo = Boolean(window && document && document.all && !window.atob);
                    }

                    return memo;
                };
            }();

            var getTarget = function getTarget() {
                var memo = {};
                return function memorize(target) {
                    if (typeof memo[target] === 'undefined') {
                        var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

                        if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
                            try {
                                // This will throw an exception if access to iframe is blocked
                                // due to cross-origin restrictions
                                styleTarget = styleTarget.contentDocument.head;
                            } catch (e) {
                                // istanbul ignore next
                                styleTarget = null;
                            }
                        }

                        memo[target] = styleTarget;
                    }

                    return memo[target];
                };
            }();

            var stylesInDom = [];

            function getIndexByIdentifier(identifier) {
                var result = -1;

                for (var i = 0; i < stylesInDom.length; i++) {
                    if (stylesInDom[i].identifier === identifier) {
                        result = i;
                        break;
                    }
                }

                return result;
            }

            function modulesToDom(list, options) {
                var idCountMap = {};
                var identifiers = [];

                for (var i = 0; i < list.length; i++) {
                    var item = list[i];
                    var id = options.base ? item[0] + options.base : item[0];
                    var count = idCountMap[id] || 0;
                    var identifier = "".concat(id, " ").concat(count);
                    idCountMap[id] = count + 1;
                    var index = getIndexByIdentifier(identifier);
                    var obj = {
                        css: item[1],
                        media: item[2],
                        sourceMap: item[3]
                    };

                    if (index !== -1) {
                        stylesInDom[index].references++;
                        stylesInDom[index].updater(obj);
                    } else {
                        stylesInDom.push({
                            identifier: identifier,
                            updater: addStyle(obj, options),
                            references: 1
                        });
                    }

                    identifiers.push(identifier);
                }

                return identifiers;
            }

            function insertStyleElement(options) {
                var style = document.createElement('style');
                var attributes = options.attributes || {};

                if (typeof attributes.nonce === 'undefined') {
                    var nonce = true ? __webpack_require__.nc : undefined;

                    if (nonce) {
                        attributes.nonce = nonce;
                    }
                }

                Object.keys(attributes).forEach(function(key) {
                    style.setAttribute(key, attributes[key]);
                });

                if (typeof options.insert === 'function') {
                    options.insert(style);
                } else {
                    var target = getTarget(options.insert || 'head');

                    if (!target) {
                        throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
                    }

                    target.appendChild(style);
                }

                return style;
            }

            function removeStyleElement(style) {
                // istanbul ignore if
                if (style.parentNode === null) {
                    return false;
                }

                style.parentNode.removeChild(style);
            }
            /* istanbul ignore next  */


            var replaceText = function replaceText() {
                var textStore = [];
                return function replace(index, replacement) {
                    textStore[index] = replacement;
                    return textStore.filter(Boolean).join('\n');
                };
            }();

            function applyToSingletonTag(style, index, remove, obj) {
                var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

                /* istanbul ignore if  */

                if (style.styleSheet) {
                    style.styleSheet.cssText = replaceText(index, css);
                } else {
                    var cssNode = document.createTextNode(css);
                    var childNodes = style.childNodes;

                    if (childNodes[index]) {
                        style.removeChild(childNodes[index]);
                    }

                    if (childNodes.length) {
                        style.insertBefore(cssNode, childNodes[index]);
                    } else {
                        style.appendChild(cssNode);
                    }
                }
            }

            function applyToTag(style, options, obj) {
                var css = obj.css;
                var media = obj.media;
                var sourceMap = obj.sourceMap;

                if (media) {
                    style.setAttribute('media', media);
                } else {
                    style.removeAttribute('media');
                }

                if (sourceMap && btoa) {
                    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
                } // For old IE

                /* istanbul ignore if  */


                if (style.styleSheet) {
                    style.styleSheet.cssText = css;
                } else {
                    while (style.firstChild) {
                        style.removeChild(style.firstChild);
                    }

                    style.appendChild(document.createTextNode(css));
                }
            }

            var singleton = null;
            var singletonCounter = 0;

            function addStyle(obj, options) {
                var style;
                var update;
                var remove;

                if (options.singleton) {
                    var styleIndex = singletonCounter++;
                    style = singleton || (singleton = insertStyleElement(options));
                    update = applyToSingletonTag.bind(null, style, styleIndex, false);
                    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
                } else {
                    style = insertStyleElement(options);
                    update = applyToTag.bind(null, style, options);

                    remove = function remove() {
                        removeStyleElement(style);
                    };
                }

                update(obj);
                return function updateStyle(newObj) {
                    if (newObj) {
                        if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
                            return;
                        }

                        update(obj = newObj);
                    } else {
                        remove();
                    }
                };
            }

            module.exports = function(list, options) {
                options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
                // tags it will allow on a page

                if (!options.singleton && typeof options.singleton !== 'boolean') {
                    options.singleton = isOldIE();
                }

                list = list || [];
                var lastIdentifiers = modulesToDom(list, options);
                return function update(newList) {
                    newList = newList || [];

                    if (Object.prototype.toString.call(newList) !== '[object Array]') {
                        return;
                    }

                    for (var i = 0; i < lastIdentifiers.length; i++) {
                        var identifier = lastIdentifiers[i];
                        var index = getIndexByIdentifier(identifier);
                        stylesInDom[index].references--;
                    }

                    var newLastIdentifiers = modulesToDom(newList, options);

                    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
                        var _identifier = lastIdentifiers[_i];

                        var _index = getIndexByIdentifier(_identifier);

                        if (stylesInDom[_index].references === 0) {
                            stylesInDom[_index].updater();

                            stylesInDom.splice(_index, 1);
                        }
                    }

                    lastIdentifiers = newLastIdentifiers;
                };
            };

            /***/
        }),

        /***/
        "OmL/":
        /*!************************!*\
          !*** ./src/styles.css ***!
          \************************/
        /*! no static exports found */
        /***/
            (function(module, exports, __webpack_require__) {

            var api = __webpack_require__( /*! ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "LboF");
            var content = __webpack_require__( /*! !../node_modules/css-loader/dist/cjs.js??ref--12-1!../node_modules/postcss-loader/src??embedded!./styles.css */ "W9N5");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
                content = [
                    [module.i, content, '']
                ];
            }

            var options = {};

            options.insert = "head";
            options.singleton = false;

            var update = api(content, options);



            module.exports = content.locals || {};

            /***/
        }),

        /***/
        "W9N5":
        /*!*********************************************************************************************************************!*\
          !*** ./node_modules/css-loader/dist/cjs.js??ref--12-1!./node_modules/postcss-loader/src??embedded!./src/styles.css ***!
          \*********************************************************************************************************************/
        /*! exports provided: default */
        /***/
            (function(module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony import */
            var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ../node_modules/css-loader/dist/runtime/api.js */ "JPst");
            /* harmony import */
            var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
            // Imports

            var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
            // Module
            ___CSS_LOADER_EXPORT___.push([module.i, "/* You can add global styles to this file, and also import other style files */\n:root {\n    --bg-color: 236, 240, 241;\n    --logo-color: 107, 89, 109;\n    --accent-color: 170, 109, 163;\n}\nbody {\n    font-family: Arial, sans-serif;\n    font-weight: bold;\n    font-size: 14px;\n    color: rgb(var(--logo-color));\n    background: rgb(var(--bg-color));\n    text-align: center;\n}\n.input-color-container {\n    position: relative;\n    overflow: hidden;\n    width: 24px;\n    height: 24px;\n    border-radius: 2px;\n    border-color: #FFF;\n    border-style: solid;\n    border-width: 2px;\n    margin: 5px;\n    display: inline-block;\n}\n.input-color {\n    position: absolute;\n    right: -8px;\n    top: -8px;\n    width: 56px;\n    height: 56px;\n    border: none;\n}\n.title {\n    font-weight: bold;\n    font-size: 40px;\n}\n.ritle {\n    font-weight: normal;\n    margin-top: -20px;\n}\n.wrap {\n    margin-top: -15px;\n    margin-left: 0px;\n    text-align: center;\n}\n.outder {\n    border: 5px;\n    border-color: rgb(var(--accent-color));\n    padding: 25px;\n    background: rgb(var(--accent-color));\n    color: rgb(var(--bg-color));\n    margin: 40px auto;\n    border-radius: 8px;\n    padding-top: 20px;\n    padding-bottom: 20px;\n    width: 70%;\n}\n.settings {\n    border: 5px;\n    border-color: rgb(var(--bg-color));\n    padding: 25px;\n    background: rgb(var(--bg-color));\n    margin: 40px auto;\n    border-radius: 8px;\n    padding-top: 20px;\n    padding-bottom: 20px;\n    width: 25%;\n    z-index: 999;\n    position: fixed;\n    top: 25%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n}\na {\n    transition: all 200ms cubic-bezier(0.390, 0.500, 0.150, 1.360);\n    display: block;\n    margin: 20px auto;\n    max-width: 100px;\n    text-decoration: none;\n    border-radius: 8px;\n    padding-top: 10px;\n    padding-left: 25px;\n    padding-bottom: 10px;\n    padding-right: 25px;\n}\na.button {\n    color: rgba(var(--bg-color), 0.8);\n    background: rgba(var(--accent-color), 0.7);\n    box-shadow: rgba(var(--accent-color), 0.4) 0 0px 0px 3px inset;\n}\na.button:hover {\n    color: rgba(var(--bg-color), 0.95);\n    box-shadow: rgba(var(--accent-color), 0.7) 0 0px 0px 40px inset;\n}\n.big {\n    font-size: 1.2em;\n}\n.small {\n    font-size: .7em;\n}\n.square {\n    width: .7em;\n    height: .7em;\n    margin: .5em;\n    display: inline-block;\n}\n/* Custom dropdown */\n.custom-dropdown {\n    position: relative;\n    display: inline-block;\n    vertical-align: middle;\n    margin: 10px;\n    /* demo only */\n}\n.custom-dropdown select {\n    background-color: rgb(var(--accent-color));\n    color: rgb(var(--bg-color));\n    font-size: inherit;\n    padding: .5em;\n    padding-right: 2.5em;\n    border: 0;\n    margin: 0;\n    border-radius: 3px;\n    text-indent: 0.01px;\n    text-overflow: '';\n    /*Hiding the select arrow for firefox*/\n    -moz-appearance: none;\n    /*Hiding the select arrow for chrome*/\n    -webkit-appearance: none;\n    /*Hiding the select arrow default implementation*/\n    appearance: none;\n}\n/*Hiding the select arrow for IE10*/\n.custom-dropdown select::-ms-expand {\n    display: none;\n}\n.custom-dropdown::before,\n.custom-dropdown::after {\n    content: \"\";\n    position: absolute;\n    pointer-events: none;\n}\n.custom-dropdown::after {\n    /*  Custom dropdown arrow */\n    content: \"\\25BC\";\n    height: 1em;\n    font-size: .625em;\n    line-height: 1;\n    right: 1.2em;\n    top: 50%;\n    margin-top: -.5em;\n}\n.custom-dropdown::before {\n    /*  Custom dropdown arrow cover */\n    width: 2em;\n    right: 0;\n    top: 0;\n    bottom: 0;\n    border-radius: 0 3px 3px 0;\n    background-color: rgba(0, 0, 0, .2);\n}\n.custom-dropdown::after {\n    color: rgba(0, 0, 0, .6);\n}\n.custom-dropdown select[disabled] {\n    color: rgba(0, 0, 0, .25);\n}\n.icon {\n    position: absolute;\n    top: 0;\n    margin: 5px;\n    fill: rgb(var(--logo-color));\n}\nh3 {\n    display: inline-block;\n    vertical-align: middle;\n    padding-right: 5px;\n}\n.break {\n    flex-basis: 100%;\n    height: 0;\n}\n.settingsWindow {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    justify-content: center;\n}\n.parentDisable {\n    position: fixed;\n    top: 0;\n    left: 0;\n    background: #000;\n    opacity: 0.25;\n    z-index: 998;\n    height: 100%;\n    width: 100%;\n}\n.no-js #loader { display: none;  }\n.js #loader { display: block; position: absolute; left: 100px; top: 0; }\n", "", { "version": 3, "sources": ["webpack://src/styles.css"], "names": [], "mappings": "AAAA,8EAA8E;AAC9E;IACI,yBAAyB;IACzB,0BAA0B;IAC1B,6BAA6B;AACjC;AAEA;IACI,8BAA8B;IAC9B,iBAAiB;IACjB,eAAe;IACf,6BAA6B;IAC7B,gCAAgC;IAChC,kBAAkB;AACtB;AAEA;IACI,kBAAkB;IAClB,gBAAgB;IAChB,WAAW;IACX,YAAY;IACZ,kBAAkB;IAClB,kBAAkB;IAClB,mBAAmB;IACnB,iBAAiB;IACjB,WAAW;IACX,qBAAqB;AACzB;AAEA;IACI,kBAAkB;IAClB,WAAW;IACX,SAAS;IACT,WAAW;IACX,YAAY;IACZ,YAAY;AAChB;AAEA;IACI,iBAAiB;IACjB,eAAe;AACnB;AAEA;IACI,mBAAmB;IACnB,iBAAiB;AACrB;AAEA;IACI,iBAAiB;IACjB,gBAAgB;IAChB,kBAAkB;AACtB;AAEA;IACI,WAAW;IACX,sCAAsC;IACtC,aAAa;IACb,oCAAoC;IACpC,2BAA2B;IAC3B,iBAAiB;IACjB,kBAAkB;IAClB,iBAAiB;IACjB,oBAAoB;IACpB,UAAU;AACd;AAEA;IACI,WAAW;IACX,kCAAkC;IAClC,aAAa;IACb,gCAAgC;IAChC,iBAAiB;IACjB,kBAAkB;IAClB,iBAAiB;IACjB,oBAAoB;IACpB,UAAU;IACV,YAAY;IACZ,eAAe;IACf,QAAQ;IACR,SAAS;IACT,gCAAgC;AACpC;AAEA;IAKI,8DAA8D;IAC9D,cAAc;IACd,iBAAiB;IACjB,gBAAgB;IAChB,qBAAqB;IACrB,kBAAkB;IAClB,iBAAiB;IACjB,kBAAkB;IAClB,oBAAoB;IACpB,mBAAmB;AACvB;AAEA;IACI,iCAAiC;IACjC,0CAA0C;IAC1C,8DAA8D;AAClE;AAEA;IACI,kCAAkC;IAClC,+DAA+D;AACnE;AAEA;IACI,gBAAgB;AACpB;AAEA;IACI,eAAe;AACnB;AAEA;IACI,WAAW;IACX,YAAY;IACZ,YAAY;IACZ,qBAAqB;AACzB;AAGA,oBAAoB;AAEpB;IACI,kBAAkB;IAClB,qBAAqB;IACrB,sBAAsB;IACtB,YAAY;IACZ,cAAc;AAClB;AAEA;IACI,0CAA0C;IAC1C,2BAA2B;IAC3B,kBAAkB;IAClB,aAAa;IACb,oBAAoB;IACpB,SAAS;IACT,SAAS;IACT,kBAAkB;IAClB,mBAAmB;IACnB,iBAAiB;IACjB,sCAAsC;IACtC,qBAAqB;IACrB,qCAAqC;IACrC,wBAAwB;IACxB,iDAAiD;IACjD,gBAAgB;AACpB;AAGA,mCAAmC;AAEnC;IACI,aAAa;AACjB;AAEA;;IAEI,WAAW;IACX,kBAAkB;IAClB,oBAAoB;AACxB;AAEA;IACI,2BAA2B;IAC3B,gBAAgB;IAChB,WAAW;IACX,iBAAiB;IACjB,cAAc;IACd,YAAY;IACZ,QAAQ;IACR,iBAAiB;AACrB;AAEA;IACI,iCAAiC;IACjC,UAAU;IACV,QAAQ;IACR,MAAM;IACN,SAAS;IACT,0BAA0B;IAC1B,mCAAmC;AACvC;AAEA;IACI,wBAAwB;AAC5B;AAEA;IACI,yBAAyB;AAC7B;AAEA;IACI,kBAAkB;IAClB,MAAM;IACN,WAAW;IACX,4BAA4B;AAChC;AAEA;IACI,qBAAqB;IACrB,sBAAsB;IACtB,kBAAkB;AACtB;AAEA;IACI,gBAAgB;IAChB,SAAS;AACb;AAEA;IACI,aAAa;IACb,eAAe;IACf,mBAAmB;IACnB,uBAAuB;AAC3B;AAEA;IACI,eAAe;IACf,MAAM;IACN,OAAO;IACP,gBAAgB;IAChB,aAAa;IACb,YAAY;IACZ,YAAY;IACZ,WAAW;AACf;AAEA,iBAAiB,aAAa,GAAG;AACjC,cAAc,cAAc,EAAE,kBAAkB,EAAE,WAAW,EAAE,MAAM,EAAE", "sourcesContent": ["/* You can add global styles to this file, and also import other style files */\n:root {\n    --bg-color: 236, 240, 241;\n    --logo-color: 107, 89, 109;\n    --accent-color: 170, 109, 163;\n}\n\nbody {\n    font-family: Arial, sans-serif;\n    font-weight: bold;\n    font-size: 14px;\n    color: rgb(var(--logo-color));\n    background: rgb(var(--bg-color));\n    text-align: center;\n}\n\n.input-color-container {\n    position: relative;\n    overflow: hidden;\n    width: 24px;\n    height: 24px;\n    border-radius: 2px;\n    border-color: #FFF;\n    border-style: solid;\n    border-width: 2px;\n    margin: 5px;\n    display: inline-block;\n}\n\n.input-color {\n    position: absolute;\n    right: -8px;\n    top: -8px;\n    width: 56px;\n    height: 56px;\n    border: none;\n}\n\n.title {\n    font-weight: bold;\n    font-size: 40px;\n}\n\n.ritle {\n    font-weight: normal;\n    margin-top: -20px;\n}\n\n.wrap {\n    margin-top: -15px;\n    margin-left: 0px;\n    text-align: center;\n}\n\n.outder {\n    border: 5px;\n    border-color: rgb(var(--accent-color));\n    padding: 25px;\n    background: rgb(var(--accent-color));\n    color: rgb(var(--bg-color));\n    margin: 40px auto;\n    border-radius: 8px;\n    padding-top: 20px;\n    padding-bottom: 20px;\n    width: 70%;\n}\n\n.settings {\n    border: 5px;\n    border-color: rgb(var(--bg-color));\n    padding: 25px;\n    background: rgb(var(--bg-color));\n    margin: 40px auto;\n    border-radius: 8px;\n    padding-top: 20px;\n    padding-bottom: 20px;\n    width: 25%;\n    z-index: 999;\n    position: fixed;\n    top: 25%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n}\n\na {\n    -webkit-transition: all 200ms cubic-bezier(0.390, 0.500, 0.150, 1.360);\n    -moz-transition: all 200ms cubic-bezier(0.390, 0.500, 0.150, 1.360);\n    -ms-transition: all 200ms cubic-bezier(0.390, 0.500, 0.150, 1.360);\n    -o-transition: all 200ms cubic-bezier(0.390, 0.500, 0.150, 1.360);\n    transition: all 200ms cubic-bezier(0.390, 0.500, 0.150, 1.360);\n    display: block;\n    margin: 20px auto;\n    max-width: 100px;\n    text-decoration: none;\n    border-radius: 8px;\n    padding-top: 10px;\n    padding-left: 25px;\n    padding-bottom: 10px;\n    padding-right: 25px;\n}\n\na.button {\n    color: rgba(var(--bg-color), 0.8);\n    background: rgba(var(--accent-color), 0.7);\n    box-shadow: rgba(var(--accent-color), 0.4) 0 0px 0px 3px inset;\n}\n\na.button:hover {\n    color: rgba(var(--bg-color), 0.95);\n    box-shadow: rgba(var(--accent-color), 0.7) 0 0px 0px 40px inset;\n}\n\n.big {\n    font-size: 1.2em;\n}\n\n.small {\n    font-size: .7em;\n}\n\n.square {\n    width: .7em;\n    height: .7em;\n    margin: .5em;\n    display: inline-block;\n}\n\n\n/* Custom dropdown */\n\n.custom-dropdown {\n    position: relative;\n    display: inline-block;\n    vertical-align: middle;\n    margin: 10px;\n    /* demo only */\n}\n\n.custom-dropdown select {\n    background-color: rgb(var(--accent-color));\n    color: rgb(var(--bg-color));\n    font-size: inherit;\n    padding: .5em;\n    padding-right: 2.5em;\n    border: 0;\n    margin: 0;\n    border-radius: 3px;\n    text-indent: 0.01px;\n    text-overflow: '';\n    /*Hiding the select arrow for firefox*/\n    -moz-appearance: none;\n    /*Hiding the select arrow for chrome*/\n    -webkit-appearance: none;\n    /*Hiding the select arrow default implementation*/\n    appearance: none;\n}\n\n\n/*Hiding the select arrow for IE10*/\n\n.custom-dropdown select::-ms-expand {\n    display: none;\n}\n\n.custom-dropdown::before,\n.custom-dropdown::after {\n    content: \"\";\n    position: absolute;\n    pointer-events: none;\n}\n\n.custom-dropdown::after {\n    /*  Custom dropdown arrow */\n    content: \"\\25BC\";\n    height: 1em;\n    font-size: .625em;\n    line-height: 1;\n    right: 1.2em;\n    top: 50%;\n    margin-top: -.5em;\n}\n\n.custom-dropdown::before {\n    /*  Custom dropdown arrow cover */\n    width: 2em;\n    right: 0;\n    top: 0;\n    bottom: 0;\n    border-radius: 0 3px 3px 0;\n    background-color: rgba(0, 0, 0, .2);\n}\n\n.custom-dropdown::after {\n    color: rgba(0, 0, 0, .6);\n}\n\n.custom-dropdown select[disabled] {\n    color: rgba(0, 0, 0, .25);\n}\n\n.icon {\n    position: absolute;\n    top: 0;\n    margin: 5px;\n    fill: rgb(var(--logo-color));\n}\n\nh3 {\n    display: inline-block;\n    vertical-align: middle;\n    padding-right: 5px;\n}\n\n.break {\n    flex-basis: 100%;\n    height: 0;\n}\n\n.settingsWindow {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    justify-content: center;\n}\n\n.parentDisable {\n    position: fixed;\n    top: 0;\n    left: 0;\n    background: #000;\n    opacity: 0.25;\n    z-index: 998;\n    height: 100%;\n    width: 100%;\n}\n\n.no-js #loader { display: none;  }\n.js #loader { display: block; position: absolute; left: 100px; top: 0; }\n"], "sourceRoot": "" }]);
            // Exports
            /* harmony default export */
            __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


            /***/
        })

    },
    [
        [3, "runtime"]
    ]
]);
//# sourceMappingURL=styles-es2015.js.map