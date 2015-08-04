'use strict';

angular.module('your-module-here')

	/**
	 * Chart directive for AngularJS
	 * Requires CanvasJS library
	 *
	 * A chart can be created using a single directive:
	 *
	 * <ng-chart
	 *     chartData="{array}"				default: {} (see below for more information)
	 *     lineThickness="{int}"			default: 0.5
	 *     fontFamily="{string}"			default: "Helvetica Neue","Helvetica",Helvetica,Arial,sans-serif
	 *     animationEnabled="{bool}"		default: true
	 *     interactivityEnabled="{bool}"	default: true
	 *     title="{string}"					default: ''
	 *     titleX="{string}"				default: ''
	 *     titleY="{string}"				default: ''
	 *     intervalType="{string}"			default: 'number' ('day', 'month', 'year', 'number')
	 *     interval="{int}"					default: 1
	 *     sharedTooltip="{bool}"			default: true
	 *     chartType="{string}"				default: 'column' (see link in description blow for all supported types)
	 *     showLegend="{bool}"				default: true
	 *     showAxisLabels="{bool}"			default: true
	 *     showTicks="{bool}"				default: true
	 *     gridColor="{string}"				default: '#CCCCCC'
	 *     gridTextColor="{string}"			default: '#808080'
	 *     textColor="{string}"				default: '#505050'
	 * ></ng-chart>
	 *
	 * It's also possible to use any HTML container and simply add the attribute "ng-chart".
	 *
	 * @link http://canvasjs.com/
	 *
	 * chartData: Array(
	 *     name: '{string}' Name of the dataset
	 *     points: Array(
	 *         x: {int} Anchor on x-axis
	 *         y: {int} Value on y-axis
	 *         label: {string} Name of x-axis field and tooltip Title
	 *         indexLabel: {string} Label assigned to a specific point/bar/column/...
	 *         toolTipValue: {string} Custom tooltip point value
	 *         toolTipFields: Array( Customizable values for tooltip content
	 *             {string} : {string} Will be displayed exactly like defined here (e.g.
	 *                                 'Key 1': 'Value 1' will be displayed as "Key1: Value1"
	 *             {string} : {string} You can define as many keys as you want
	 *         )
	 *     )
	 * )
	 *
	 * lineThickness: Thickness of the whole grid
	 *
	 * fontFamily: Font family of the whole chart
	 *
	 * animationEnabled: Toggles chart animation at initialization
	 *
	 * interactivityEnabled: Toggles highlighting/tooltip display on hover
	 *
	 * title: Title of the chart, displayed on top
	 *
	 * titleX: Title of the x-axis, displayed beneath the x-axis
	 *
	 * titleY: Title of the y-axis, displayed vertically beside the y-axis
	 *
	 * intervalType: If the value on x-axis is a date, it's easy to use day, month or year as interval
	 *
	 * interval: Defines the interval of labels displayed at the x-axis
	 *
	 * sharedTooltip: If the chart displays more than one dataset, shared tooltips are available. If you
	 *     hover any point, all points with same x-axis value will be displayed in the same tooltip.
	 *     Set to false to show a single tooltip for every point
	 *
	 * chartType: Defines how the chart will be displayed. Following the link below, you can find out which
	 *     chart types are supported. Keep in mind that some chart types needs a special data structure.
	 *     Take a look at the official CanvasJS docs for further information
	 * @link http://canvasjs.com/docs/charts/chart-types/
	 *
	 * showLegend: Toggles the legend on bottom of the chart
	 *
	 * showAxisLabels: Toggles the labels at the axis. Switch to false to enable only the ticks on the axis.
	 *     Combine with showTicks to completely disable all axis markers and to get a clean axis line
	 *
	 * gridColor: Defines the color of the whole grid. You can use hexadecimal values with hash (#) or color names
	 *
	 * gridTextColor: Defines the color of the labels at the axis
	 *
	 * textColor: Defines the color of all texts (e.g. title, axis titles and tooltip values)
	 */
	.directive('ngChart', function () {
		return {
			restrict: 'EA',
			scope: {
				chartData: '=',
				lineThickness: '=',
				fontFamily: '=',
				animationEnabled: '=',
				interactivityEnabled: '=',
				title: '=',
				titleX: '=',
				titleY: '=',
				intervalType: '=',
				interval: '=',
				sharedTooltip: '=',
				chartType: '=',
				showLegend: '=',
				showAxisLabels: '=',
				showTicks: '=',
				gridColor: '=',
				gridTextColor: '=',
				textColor: '='
			},
			link: function (scope, element, attrs) {
				var configOptions = {};

				configOptions.chartData = scope.chartData || {};
				configOptions.lineThickness = scope.lineThickness || 0.5;
				configOptions.fontFamily = scope.fontFamily || '"Helvetica Neue","Helvetica",Helvetica,Arial,sans-serif';
				configOptions.animationEnabled = typeof scope.animationEnabled === 'undefined' ? true : scope.animationEnabled;
				configOptions.interactivityEnabled = typeof scope.interactivityEnabled === 'undefined' ? true : scope.interactivityEnabled;
				configOptions.title = scope.title || '';
				configOptions.titleX = scope.titleX || '';
				configOptions.titleY = scope.titleY || '';
				configOptions.intervalType = scope.intervalType || 'number';
				configOptions.interval = scope.interval || 1;
				configOptions.sharedTooltip = typeof scope.sharedTooltip === 'undefined' ? true : scope.sharedTooltip;
				configOptions.chartType = scope.chartType || 'column';
				configOptions.showLegend = typeof scope.showLegend === 'undefined' ? true : scope.showLegend;
				configOptions.showAxisLabels = typeof scope.showAxisLabels === 'undefined' ? true : scope.showAxisLabels;
				configOptions.showTicks = typeof scope.showTicks === 'undefined' ? true : scope.showTicks;
				configOptions.gridColor = scope.gridColor || '#CCCCCC';
				configOptions.gridTextColor = scope.gridTextColor || '#808080';
				configOptions.textColor = scope.textColor || '#505050';

				switch (configOptions.intervalType) {
					case 'day':
						configOptions.intervalIsDate = true;
						configOptions.axisValueFormat = 'DD.MM.YYYY';
						configOptions.internalIntervalType = 'day';
						break;
					case 'month':
						configOptions.intervalIsDate = true;
						configOptions.axisValueFormat = 'MM.YYYY';
						configOptions.internalIntervalType = 'month';
						break;
					case 'year':
						configOptions.intervalIsDate = true;
						configOptions.axisValueFormat = 'YYYY';
						configOptions.internalIntervalType = 'year';
						break;
					default:
						configOptions.intervalIsDate = false;
						configOptions.axisValueFormat = '';
						configOptions.internalIntervalType = 'number';
				}

				var config = {
					animationEnabled: configOptions.animationEnabled,
					interactivityEnabled: configOptions.interactivityEnabled,
					colorSet: "chartWidgetColorSet",
					title: {
						text: configOptions.title,
						fontFamily: configOptions.fontFamily,

						fontColor: configOptions.textColor
					},
					axisX: {
						title: configOptions.titleX,
						labelFontFamily: configOptions.fontFamily,

						lineThickness: configOptions.lineThickness,
						tickThickness: configOptions.lineThickness,

						lineColor: configOptions.gridColor,
						gridColor: configOptions.gridColor,
						tickColor: configOptions.showTicks ? configOptions.gridColor : 'transparent',
						labelFontColor: configOptions.showAxisLabels ? configOptions.gridTextColor : 'transparent',
						titleFontColor: configOptions.textColor,

						intervalType: configOptions.internalIntervalType,
						valueFormatString: configOptions.axisValueFormat,
						interval: configOptions.interval
					},
					axisY: {
						title: configOptions.titleY,
						labelFontFamily: configOptions.fontFamily,

						lineThickness: configOptions.lineThickness,
						gridThickness: configOptions.lineThickness,
						tickThickness: configOptions.lineThickness,

						lineColor: configOptions.gridColor,
						gridColor: configOptions.gridColor,
						tickColor: configOptions.showTicks ? configOptions.gridColor : 'transparent',
						labelFontColor: configOptions.showAxisLabels ? configOptions.gridTextColor : 'transparent',
						titleFontColor: configOptions.textColor
					},
					toolTip: {
						shared: configOptions.sharedTooltip,
						fontFamily: configOptions.fontFamily,
						content: function (e) {
							var toolTipContent = ''
								+ '<strong style="color: ' + configOptions.textColor + ';">'
									+ (e.entries[0].dataPoint.label ? e.entries[0].dataPoint.label : e.entries[0].dataPoint.x)
								+ '</strong><br />'
							;

							for (var key in e.entries) {
								var entry = e.entries[key];

								if (entry.dataSeries.visible === false) {
									continue;
								}

								var entryText = ''
									+ '<span style="color: ' + entry.dataSeries.color + ';">'
										+ entry.dataSeries.name
									+ '</span>'
									+ ': '
									+ '<strong style="color: ' + configOptions.textColor + ';">'
										+ (entry.dataPoint.toolTipValue ? entry.dataPoint.toolTipValue : entry.dataPoint.y)
									+ '</strong><br />'
								;

								if (entry.dataPoint.tooltipFields) {
									entryText = entryText.concat('<p>');

									for (var key in entry.dataPoint.tooltipFields) {
										var tooltipValue = entry.dataPoint.tooltipFields[key];

										entryText = entryText.concat(key + ': ' + tooltipValue + '<br />');
									}

									entryText = entryText.concat('</p>');
								}

								toolTipContent = toolTipContent.concat(entryText);
							}

							return toolTipContent;
						},

						fontColor: configOptions.textColor
					},
					legend: configOptions.showLegend !== true ? {} : {
						fontFamily: configOptions.fontFamily,
						cursor: "pointer",
						itemclick: function (e) {
							if (
								typeof (e.dataSeries.visible) === "undefined"
								|| e.dataSeries.visible
							) {
								e.dataSeries.visible = false;
							} else {
								e.dataSeries.visible = true;
							}
							chart.render();
						}
					},
					data: generateDataSets(configOptions)
				};

				CanvasJS.addColorSet('chartWidgetColorSet', [
					'#369EAD',
					'#EC5657',
					'#96BF0D',
					'#1BCDD1',
					'#B08BEB',
					'#3EA0DD',
					'#4661EE',
					'#F5A52A',
					'#23BFAA',
					'#FAA586',
					'#EB8CC6',
					'#8FAABB'
				]);

				var chart = new CanvasJS.Chart(element[0], config);
				chart.render();

				/**
				 * Generates the datasets of this chart based on the chart configuration
				 *
				 * @param {Array} configOptions
				 * @returns {Array}
				 */
				function generateDataSets(configOptions) {
					var data = [];
					var dataSetPreset = {
						showInLegend: configOptions.showLegend,
						type: configOptions.chartType,
						dataPoints: []
					};
					var dataPointPreset = {};

					for (var graphKey in configOptions.chartData) {
						var graphData = configOptions.chartData[graphKey];
						var dataSet = {};
						angular.copy(dataSetPreset, dataSet);

						dataSet.name = graphData['name'] || '';
						dataSet.legendText = dataSet.showInLegend ? dataSet.name : '';

						for (var pointKey in graphData['points']) {
							var pointData = graphData['points'][pointKey];
							var dataPoint = {};
							angular.copy(dataPointPreset, dataPoint);

							dataPoint.x = pointData['x'] || pointKey;
							if (
								configOptions.intervalIsDate
								&& pointData['x']
							) {
								var date = new Date(pointData['x']);
								date.setUTCMinutes(date.getTimezoneOffset());
								dataPoint.x = date;
							}

							dataPoint.y = pointData['y'] || 0;
							dataPoint.label = pointData['label'] || '';
							dataPoint.toolTipValue = pointData['toolTipValue'] || '';

							if (pointData['indexLabel']) {
								dataPoint.indexLabel = pointData['indexLabel'];
							}

							if (pointData['toolTipFields']) {
								dataPoint.tooltipFields = {};
								for (var key in pointData['toolTipFields']) {
									if (!pointData['toolTipFields'].hasOwnProperty(key)) {
										continue;
									}

									dataPoint.tooltipFields[key] = pointData['toolTipFields'][key];
								}
							}

							dataSet.dataPoints.push(dataPoint);
						}

						data.push(dataSet);
					}

					return data;
				}
			}
		};
	})
;