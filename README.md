# CanvasJS-AngularJS-Directive
CanvasJS-Directive for AngularJS

**Requires [CanvasJS](http://canvasjs.com/) library**

### Installation
1. Put the `chart.js` file into your project directory
2. Make sure this file is included in your HTML header
3. Edit the file `chart.js` and change `angular.module('your-module-here')` to your module's name
4. Call the chart as described below

### Using the directive
After following the steps above, you are able to call the directive by adding a HTML tag called `ng-chart`. It is extendable through the attributes shown below:

```html
<ng-chart
    chartData="{array}"				default: {} (see below for more information)
    lineThickness="{int}"			default: 0.5
    fontFamily="{string}"			default: "Helvetica Neue","Helvetica",Helvetica,Arial,sans-serif
    animationEnabled="{bool}"		default: true
    interactivityEnabled="{bool}"	default: true
    title="{string}"				default: ''
    titleX="{string}"				default: ''
    titleY="{string}"				default: ''
    intervalType="{string}"			default: 'number' ('day', 'month', 'year', 'number')
    interval="{int}"				default: 1
    sharedTooltip="{bool}"			default: true
    chartType="{string}"			default: 'column' (see link in description blow for all supported types)
    showLegend="{bool}"				default: true
    showAxisLabels="{bool}"			default: true
    showTicks="{bool}"				default: true
    gridColor="{string}"			default: '#CCCCCC'
    gridTextColor="{string}"		default: '#808080'
    textColor="{string}"			default: '#505050'
></ng-chart>
```

#### It's also possible to use any HTML container and simply add the attribute "ng-chart".

**chartData**:
```
Array(
    name: {string} Name of the dataset
    points: Array(
        x: {int} Anchor on x-axis
        y: {int} Value on y-axis
        label: {string} Name of x-axis field and tooltip Title
        indexLabel: {string} Label assigned to a specific point/bar/column/...
        toolTipValue: {string} Custom tooltip point value
        toolTipFields: Array( Customizable values for tooltip content
            {string} : {string} Will be displayed exactly like defined here (e.g.
                                'Key 1': 'Value 1' will be displayed as "Key1: Value1"
            {string} : {string} You can define as many keys as you want
        )
    )
)
```

**lineThickness**: Thickness of the whole grid

**fontFamily**: Font family of the whole chart

**animationEnabled**: Toggles chart animation at initialization

**interactivityEnabled**: Toggles highlighting/tooltip display on hover

**title**: Title of the chart, displayed on top

**titleX**: Title of the x-axis, displayed beneath the x-axis

**titleY**: Title of the y-axis, displayed vertically beside the y-axis

**intervalType**: If the value on x-axis is a date, it's easy to use day, month or year as interval

**interval**: Defines the interval of labels displayed at the x-axis

**sharedTooltip**: If the chart displays more than one dataset, shared tooltips are available. If you
    hover any point, all points with same x-axis value will be displayed in the same tooltip.
    Set to false to show a single tooltip for every point

**chartType**: Defines how the chart will be displayed. Following the link below, you can find out which
    chart types are supported. Keep in mind that some chart types needs a special data structure.
    Take a look at the [official CanvasJS docs](http://canvasjs.com/docs/charts/chart-types/) for further information

**showLegend**: Toggles the legend on bottom of the chart

**showAxisLabels**: Toggles the labels at the axis. Switch to false to enable only the ticks on the axis.
    Combine with showTicks to completely disable all axis markers and to get a clean axis line

**gridColor**: Defines the color of the whole grid. You can use hexadecimal values with hash (#) or color names

**gridTextColor**: Defines the color of the labels at the axis

**textColor**: Defines the color of all texts (e.g. title, axis titles and tooltip values)