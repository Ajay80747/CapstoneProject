/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.5708333333333333, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.9, 500, 1500, "LuxaryVan-CarTrawlersHTTP Request-0"], "isController": false}, {"data": [0.475, 500, 1500, "LuxaryVan-CarTrawlersHTTP Request-1"], "isController": false}, {"data": [0.925, 500, 1500, "Prefered-CarTrawlersHTTP Request-0"], "isController": false}, {"data": [0.9375, 500, 1500, "Nationsl-CarTrawlersHTTP Request-0"], "isController": false}, {"data": [0.425, 500, 1500, "Prefered-CarTrawlersHTTP Request-1"], "isController": false}, {"data": [0.3375, 500, 1500, "Internation-CarTrawlersHTTP Request"], "isController": false}, {"data": [0.3875, 500, 1500, "LuxaryVan-CarTrawlersHTTP Request"], "isController": false}, {"data": [0.3625, 500, 1500, "Nationsl-CarTrawlersHTTP Request"], "isController": false}, {"data": [0.425, 500, 1500, "Nationsl-CarTrawlersHTTP Request-1"], "isController": false}, {"data": [0.925, 500, 1500, "Internation-CarTrawlersHTTP Request-0"], "isController": false}, {"data": [0.36875, 500, 1500, "Prefered-CarTrawlersHTTP Request"], "isController": false}, {"data": [0.375, 500, 1500, "Internation-CarTrawlersHTTP Request-1"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 600, 0, 0.0, 1063.283333333334, 18, 8225, 901.5, 2860.7999999999993, 3297.7499999999995, 3882.4900000000007, 46.42884779076066, 2720.1529915170627, 7.726050452681266], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["LuxaryVan-CarTrawlersHTTP Request-0", 40, 0, 0.0, 310.6, 19, 3100, 48.5, 1169.8999999999996, 2983.599999999992, 3100.0, 5.092297899427116, 1.710693825588797, 0.611672501591343], "isController": false}, {"data": ["LuxaryVan-CarTrawlersHTTP Request-1", 40, 0, 0.0, 1161.5749999999998, 63, 3368, 996.5, 2610.8999999999996, 3098.449999999999, 3368.0, 6.0395591121848105, 601.1043723105088, 0.7726389098595802], "isController": false}, {"data": ["Prefered-CarTrawlersHTTP Request-0", 80, 0, 0.0, 283.9625, 18, 7077, 51.5, 904.0000000000014, 1278.2000000000003, 7077.0, 6.222775357809583, 2.090463596764157, 0.7474622744243933], "isController": false}, {"data": ["Nationsl-CarTrawlersHTTP Request-0", 40, 0, 0.0, 185.67500000000004, 19, 1283, 50.5, 928.2999999999997, 1203.6499999999994, 1283.0, 3.51493848857645, 1.1464740773286466, 0.3878789543057996], "isController": false}, {"data": ["Prefered-CarTrawlersHTTP Request-1", 80, 0, 0.0, 1347.5000000000002, 66, 3476, 1030.0, 3030.400000000001, 3306.3, 3476.0, 6.878761822871883, 366.843813816638, 0.8799978503869303], "isController": false}, {"data": ["Internation-CarTrawlersHTTP Request", 40, 0, 0.0, 1669.9, 123, 4274, 1173.5, 3377.6, 3557.45, 4274.0, 5.181347150259067, 582.5065019834844, 1.4268944300518136], "isController": false}, {"data": ["LuxaryVan-CarTrawlersHTTP Request", 40, 0, 0.0, 1474.0500000000002, 85, 3691, 1079.0, 3228.2999999999997, 3442.2999999999997, 3691.0, 5.051780752715333, 504.4899921460596, 1.2530784288961858], "isController": false}, {"data": ["Nationsl-CarTrawlersHTTP Request", 40, 0, 0.0, 1568.9499999999996, 114, 7286, 1091.0, 3380.7, 3858.599999999998, 7286.0, 3.487054310870892, 417.70534799712317, 0.7968463952576061], "isController": false}, {"data": ["Nationsl-CarTrawlersHTTP Request-1", 40, 0, 0.0, 1381.575, 90, 7209, 951.0, 3250.499999999999, 3368.3999999999996, 7209.0, 3.930045195519749, 469.48822675132635, 0.4643901061112202], "isController": false}, {"data": ["Internation-CarTrawlersHTTP Request-0", 40, 0, 0.0, 234.02499999999992, 19, 3077, 49.0, 934.3999999999996, 1279.3499999999997, 3077.0, 5.251411316791388, 1.835942628331364, 0.7025813968754102], "isController": false}, {"data": ["Prefered-CarTrawlersHTTP Request", 80, 0, 0.0, 1633.125, 89, 8225, 1104.0, 3278.1000000000004, 3491.7500000000005, 8225.0, 6.190513038768088, 332.2191870840749, 1.535537413913178], "isController": false}, {"data": ["Internation-CarTrawlersHTTP Request-1", 40, 0, 0.0, 1433.7250000000004, 102, 3486, 1091.5, 3121.8999999999996, 3317.9999999999995, 3486.0, 6.22568093385214, 697.7378708657587, 0.8815661478599222], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 600, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
