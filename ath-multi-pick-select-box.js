(function () {
    'use strict';

    var module = angular.module('athMultiPickSelectBox', []);

    /**
     * A multi-pick module.
     *
     * The template for this directive expects the Bootstrap CSS framework to be
     * included by the code using this directive.
     */
    module.directive('athMultiPickSelectBoxWithGroups', [function () {
        return {
            restrict: 'A',
            require: '?',
            replace: 'false',
            scope: {
                /**
                 * The items that will be displayed. This is an array of
                 * objects.
                 * @var array
                 */
                items: '=',
                /**
                 * The values of the items that have been selected.
                 * @var array
                 */
                selectedItems: '=',
                /**
                 * Optional: Whether to display option groups in the multi-pick
                 * @var boolean
                 */
                optionGroups: '=?',
                /**
                 * The object property as display text for each item.  Each
                 * object in the "items" array must have this as a property.
                 * @var string
                 */
                label: '@',
                /**
                 * The object property to use as the value of each item. Each
                 * object in the "items" array must have this as a property.
                 * @var string
                 */
                value: '@',
                /**
                 * Optional height of the element.
                 * @var int
                 */
                size: '@?',
                /**
                 * Optional: sends OptGroup name back to parent controller
                 * for evaluation.
                 */
                groupItems: '&?'
            },
            controller: ['$scope', function ($scope) {
                $scope.loading = true;

                $scope.addRemoveOption = function (optSelected) {
                    var idx = $scope.selectedItems.indexOf(optSelected);

                    if (idx > -1) {
                        $scope.selectedItems.splice(idx, 1);
                    }
                    else {
                        $scope.selectedItems.push(optSelected);
                    }
                };

                if ($scope.optionGroups) {
                    $scope.multipickGrpOptTemplate = true;
                }
            }],
            template: '<div class="multi-pick"><div class="multi-pick-inner"><div ng-repeat="(optGrp, grpArr) in items" ng-if="multipickGrpOptTemplate"><span ng-click="groupItems({grpName:optGrp})"><strong>{{ optGrp }}</strong></span><div ng-repeat="i in grpArr" ng-class="{selectedItem: selectedItems.indexOf(i[value]) > -1}" ath-on-last-repeat><label class="checkbox" style="margin-top: auto; margin-bottom: auto; font-weight: normal; font-size: 13px; color: #555;" title="{{ i[label] }}"><input type="checkbox" value="{{ i[value] }}" ng-checked="selectedItems.indexOf(i[value]) > -1" ng-click="addRemoveOption(i[value])">{{ i[label] }}</label></div></div></div></div>',
            link: function (scope, element, attrs) {
                if (typeof scope.size != 'undefined') {
                    var size = parseInt(scope.size);
                    if (size > 1) {
                        var select = element.children('.multi-pick-inner');
                        var lineHeight = select.css('line-height');
                        lineHeight = parseInt(lineHeight.replace(/[^0-9]/, ''));
                        select.css('height', (lineHeight * size) + 'px');
                    }
                }
            }
        };
    }]);

    /**
     * A multi-pick module.
     *
     * The template for this directive expects the Bootstrap CSS framework to be
     * included by the code using this directive.
     */
    module.directive('athMultiPickSelectBox', [function () {
        return {
            restrict: 'A',
            require: '?',
            replace: 'false',
            scope: {
                /**
                 * The items that will be displayed. This is an array of
                 * objects.
                 * @var array
                 */
                items: '=',
                /**
                 * The values of the items that have been selected.
                 * @var array
                 */
                selectedItems: '=',
                /**
                 * The object property as display text for each item.  Each
                 * object in the "items" array must have this as a property.
                 * @var string
                 */
                label: '@',
                /**
                 * The object property to use as the value of each item. Each
                 * object in the "items" array must have this as a property.
                 * @var string
                 */
                value: '@',
                /**
                 * Optional height of the element.
                 * @var int
                 */
                size: '@?'
            },
            controller: ['$scope', function ($scope) {
                $scope.loading = true;

                $scope.addRemoveOption = function (optSelected) {
                    var idx = $scope.selectedItems.indexOf(optSelected);

                    if (idx > -1) {
                        $scope.selectedItems.splice(idx, 1);
                    }
                    else {
                        $scope.selectedItems.push(optSelected);
                    }
                };
            }],
            template: '<div class="multi-pick"><div class="multi-pick-inner"><div ng-repeat="item in items" ng-class="{selectedItem: selectedItems.indexOf(item[value]) > -1}" ath-on-last-repeat><label class="checkbox" title="{{ item[label] }}"><input type="checkbox" value="{{ item[value] }}" ng-checked="selectedItems.indexOf(item[value]) > -1" ng-click="addRemoveOption(item[value])">{{ item[label] }}</label></div></div></div>',
            link: function (scope, element, attrs) {
                if (typeof scope.size != 'undefined') {
                    var size = parseInt(scope.size);
                    if (size > 1) {
                        var select = element.children('.multi-pick-inner');
                        var lineHeight = select.css('line-height');
                        lineHeight = parseInt(lineHeight.replace(/[^0-9]/, ''));
                        select.css('height', (lineHeight * size) + 'px');
                    }
                }
            }
        };
    }]);

    module.directive('athMultiColumnMultiPickSelectBox', ['$sce', function ($sce) {
        return {
            restrict: 'A',
            require: '?',
            replace: 'false',
            scope: {
                /**
                 * The items that will be displayed.
                 * @var array
                 */
                items: '=',
                /**
                 * The values of the items that have been selected.
                 * @var array
                 */
                selectedItems: '=',
                /**
                 * The object property as display text for each item.
                 */
                label: '@',
                /**
                 * The object property to use as the value of each item.
                 */
                value: '@',
                /**
                 * Optional height of the element.
                 */
                size: '@?',
                /**
                 * Extra column value of the alt item selected.
                 * @var string
                 */
                selectedAltItems: '=?',
                /**
                 * Label to use for selected item, name. and title of the radio buttons.
                 */
                altLabel: '@?',
                /**
                 * Value to compare against the value of the looped over object.
                 */
                altValue: '=',
                /**
                 * Boolean value to determine if the column displays radio
                 * buttons or checkboxes.
                 *      Radio buttons would be displayed when you want the user
                 *      to only select one selection.
                 *
                 *      Checkboxes would be for multiple selections.
                 */
                multipleAltItems: '=?'
            },
            controller: ['$scope', function ($scope) {
                $scope.multiAlts = !$scope.multipleAltItems ? false : true;

                $scope.addRemoveOption = function (optSelected) {
                    var idx = $scope.selectedItems.indexOf(optSelected);

                    if (idx > -1) {
                        $scope.selectedItems.splice(idx, 1);

                        // If the selected option is unchecked, check
                        // to see if that select option has the right
                        // column checked.  If so, remove.
                        if ($scope.multiAlts) {
                            var altIdx = $scope.altValue.indexOf(optSelected);
                            if (altIdx > -1) {
                                $scope.altValue.splice(altIdx, 1);
                            }
                        } else {
                            $scope.altValue = '';
                        }
                    }
                    else {
                        $scope.selectedItems.push(optSelected);
                    }
                };

                $scope.changeSelection = function (selectedValue) {
                    $scope.selectedAltItems = selectedValue;
                };

                $scope.addRemoveMultiAlts = function (altSelected) {
                    var idx = $scope.altValue.indexOf(altSelected);

                    if (idx > -1) {
                        $scope.altValue.splice(idx, 1);
                    }
                    else {
                        $scope.altValue.push(altSelected);
                    }
                }
            }],
            templateUrl: function (element, attributes) {
                // Get the URL that was used in the SCRIPT tag to include this JS file.
                var scriptUrl = $('script[src$="ath-multi-pick-select-box.js"]').attr('src');

                // Get the first part of the script URL (i.e. "https://<domain>", no path).
                var urlPrefix = scriptUrl.substring(0, scriptUrl.lastIndexOf('/'));

                // If the prefix starts with "https" then we assume we have a
                // good domain to prefix to our path. The query string part is to
                // prevent caching (Angular is stupid about caching).
                var url = urlPrefix + '/ath-multicolumn-multipick-select-box.html?' + Math.random();

                // Return the URL telling Angular to trust it.  The trust is
                // necessary as this file is usually included from a domain
                // that the original page is not on (i.e. CRM includes this
                // file from static).
                return $sce.trustAsResourceUrl(url);
            },
            link: function (scope, element, attrs) {
                if (typeof scope.size != 'undefined') {
                    var size = parseInt(scope.size);
                    if (size > 1) {
                        var select = element.children('.multi-pick-inner');
                        var lineHeight = select.css('line-height');
                        lineHeight = parseInt(lineHeight.replace(/[^0-9]/, ''));
                        select.css('height', (lineHeight * size) + 'px');
                    }
                }
            }
        }
    }]);


    /**
     * Emits a broadcast message when the multi-pick displays its last item.
     */
    module.directive('athOnLastRepeat', [function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                if (scope.$last) {
                    setTimeout(function () {
                        scope.$emit('athOnRepeatLast', element, attrs);
                    }, 100);
                }
            }
        }
    }]);

})();
