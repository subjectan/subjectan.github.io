(function() {
  var load, loadData, loadFirstTweetDate, toTable;

  loadData = function(f) {
    return $.ajax({
      url: "http://sub-tan.appspot.com/sub_bot/aclist/",
      type: "GET",
      cache: false,
      datatype: "HTML",
      success: function(res) {
        $(".loading").remove();
        return f($(res.responseText));
      }
    });
  };

  loadFirstTweetDate = function(screen_name, f) {
    return $.ajax({
      url: "https://discover.twitter.com/first-tweet#sub_tan",
      type: "GET",
      cache: false,
      datatype: "HTML",
      success: function(res) {
        var div;
        div = $(res.responseText).find("#first-tweet-wrapper")[0];
        return console.log(res.responseText);
      }
    });
  };

  toTable = function(data, f) {
    var array, c, d, n, sc, t, toDate, _i, _len, _ref;
    toDate = function(k) {
      return new Date(k.replace(/-/g, "/"));
    };
    array = new Array;
    _ref = data.filter("p");
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      d = _ref[_i];
      n = $(d).find("a")[0].innerHTML;
      sc = $(d).find("a")[0].className;
      c = $(d).find("span")[0].innerHTML;
      array.push([n, toDate(c)]);
    }
    array.sort(function(a1, a2) {
      return a1[1] - a2[1];
    });
    t = google.visualization.arrayToDataTable(array);
    return f(t);
  };

  load = function() {
    var drawChart;
    loadFirstTweetDate("sub_tan", "");
    drawChart = function(data) {
      var chart;
      chart = new google.visualization.LineChart(document.getElementById('graph'));
      return chart.draw(data, {
        orientation: 'vertical',
        fontSize: 11,
        chartArea: {
          top: 0,
          width: '50%',
          height: '90%'
        },
        hAxis: {
          color: 'black',
          bold: true
        }
      });
    };
    return loadData(function(data) {
      return toTable(data, function(t) {
        return google.setOnLoadCallback(function() {
          return drawChart(t);
        });
      });
    });
  };

  $(document).ready(load);

}).call(this);
