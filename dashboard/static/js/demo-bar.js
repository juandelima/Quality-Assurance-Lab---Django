//STEP 2 - Chart Data
const chartData = [{
    "label": "Foreman",
    "value": "8"
}, {
    "label": "Supervisor",
    "value": "5"
}, {
    "label": "Dept.Head",
    "value": "7"
}];

//STEP 3 - Chart Configurations
const chartConfig = {
type: 'column2d',
renderAt: 'chart-container',
width: '100%',
height: '400',
dataFormat: 'json',
dataSource: {
    // Chart Configuration
    "chart": {
        "caption": "",
        "subCaption": "",
        "xAxisName": "",
        "yAxisName": "Qty",
        "numberSuffix": "",
        "theme": "fusion",
        },
    // Chart Data
    "data": chartData
    }
};

FusionCharts.ready(function(){
    var fusioncharts = new FusionCharts(chartConfig);
    fusioncharts.render();
});