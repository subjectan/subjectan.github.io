loadData = (f) ->
  $.ajax({
    url: "http://sub-tan.appspot.com/sub_bot/aclist/",
    type: "GET",
    cache: false,
    datatype: "HTML",
    success: (res) ->
      $(".loading").remove()
      f $(res.responseText)
    })

loadFirstTweetDate = (screen_name, f) ->
  $.ajax({
    url: "https://discover.twitter.com/first-tweet#sub_tan",
    type: "GET",
    cache: false,
    datatype: "HTML",
    success: (res) ->
      div = $(res.responseText).find("#first-tweet-wrapper")[0]
      console.log(res.responseText)
    })

toTable = (data, f) ->
  toDate = (k) -> new Date(k.replace(/-/g,"/"))
  array = new Array
  for d in data.filter("p")
    n = $(d).find("a")[0].innerHTML
    sc = $(d).find("a")[0].className
    c = $(d).find("span")[0].innerHTML
    array.push([n,toDate(c)])

  array.sort((a1,a2) -> a1[1]-a2[1])
  t = google.visualization.arrayToDataTable(array)
  f(t)

load = () ->
  loadFirstTweetDate "sub_tan", ""
  drawChart = (data) ->
    chart = new google.visualization.LineChart(document.getElementById 'graph')
    chart.draw data,
      orientation: 'vertical'
      fontSize: 11
      chartArea:
        top: 0
        width: '50%'
        height: '90%'
      hAxis:
        color: 'black'
        bold: true

  loadData((data) -> toTable(data, (t) -> google.setOnLoadCallback -> drawChart(t)))

$(document).ready(load)
