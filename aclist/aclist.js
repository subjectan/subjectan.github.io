function load(){
  $.get("/sub_bot/aclist/", function(data){
	  function account_dict(data){
			a = $("a", data);
			span = $("span", data);
			map = [];
			for (var i=0; i<a.length; i++){
				if (a[i]['href'] == "http://twitter.com/clerk_tan"){ continue; }
				map.push({'name': a[i].textContent, 'link': a[i]['href'], 'created_at': new Date((span[i].textContent).split(" ")[0])});
			}
			return map;
		}

	  var aclist_map = account_dict(data);
	  aclist_map.sort(function(a, b){ return a.created_at - b.created_at; })
	  set(aclist_map);
	  });
}

load();

function set(aclist_map){
	var now = new Date();
	var margin = {
		top: 70,
		left: 40,
		right: 40,
		line: 20
	};
	var size = {
		width: 1280 - margin.right,
		scale: 2/3
	};

	var svg = d3.select('body').append('svg')
	.attr("width", 1280)
	.attr("height", (2.5 + margin.line)*aclist_map.length);
	
	function run_days(d){
		return Math.floor((now - d.created_at)/1000/60/60/24);
	}

	var account = svg.selectAll('.account')
		.data(aclist_map)
		.enter();
	
	function mouseover(d, i){
		function over_c(obj){
			obj
			.attr("r", 10)
			.style("opacity", 1.0)
			.style("stroke-width", 2.0)
			.style("stroke", "#3ae");
		}
		function over_l(obj){
			obj
			.style("font-size", "12px")
			.style("font-weight", "bold")
			.style("opacity", "1.0");
		}
		d3.select(d3.selectAll('.created_at')[0][i]).transition().duration(100)
		.style("visibility", "visible");
		over_c(d3.select(d3.selectAll('.circle')[0][i]).transition().duration(100));
		over_l(d3.select(d3.selectAll('.label')[0][i]).transition().duration(100));
	}
	function mouseout(d, i){
		function out_c(obj){
			obj
			.attr("r", 5)
			.style("opacity", .8)
			.style("stroke-width", 1.5)
			.style("stroke", "#f00");
		}
		function out_l(obj){
			obj
			.style("font-size", "x-small")
			.style("font-weight", "normal")
			.style("opacity", ".4");
		}
		d3.select(d3.selectAll('.created_at')[0][i]).transition().duration(100)
		.style("visibility", "hidden");
		out_c(d3.select(d3.selectAll('.circle')[0][i]).transition().duration(100));
		out_l(d3.select(d3.selectAll('.label')[0][i]).transition().duration(100));
	}

	account
		.append('text')
		.attr("class", "label")
		.attr("dx", function(d) { return size.width*size.scale + margin.left; })
		.attr("dy", function(d, i) { return margin.top + i*margin.line + 2.5; })
		.text(function(d) { return d.name; })
		.style("fill", "black")
		.style("font-size", "x-small")
		.style("opacity", ".4");

	account
		.append('line')
	    .attr("class", "path")
	    .attr("x1", function(d, i) {
	    	var k = i-1;
	    	if (k < 0){ k = 0; }
	    	return (size.width - run_days(aclist_map[k]))*size.scale; })
	    .attr("y1", function(d, i) { 
	    	var k = i-1;
	    	if (k < 0){ k = 0; }
	    	return margin.top + k*margin.line; })
	    .attr("x2", function(d, i) { return (size.width - run_days(d))*size.scale; })
	    .attr("y2", function(d, i) { return margin.top + i*margin.line; })
	    .style("opacity", .8)
		.style("stroke-width", 1.5);

	account
		.append('circle')
	    .attr("class", "circle")
		.attr("r", 5)
		.attr("cx", function(d){ return (size.width - run_days(d))*size.scale; })
		.attr("cy", function(d, i) { return margin.top + i*margin.line; })
	    .style("opacity", .8)
		.style("stroke-width", 1.5)

		.on("mouseover", mouseover)
		.on("mouseout", mouseout);

	account
		.append('text')
		.attr("class", "created_at")
		.attr("dx", function(d) {
			var days = run_days(d);
			var width = (size.width - run_days(d))*size.scale;
			if (days < 150) { width -= 110; }
			else { width += 20; }
			return width;
		})
		.attr("dy", function(d, i) { return margin.top + i*margin.line + 5; })
		.text(function(d) { return d3.time.format('%Y-%m-%d')(d.created_at); })
		.style("stroke-width", 1.0)
		.style("visibility", "hidden");

	var x = d3.time.scale()
    .range([margin.left, size.width*size.scale - margin.right]);
	var xAxis = d3.svg.axis()
    .scale(x)
    .orient("top");

	x.domain(d3.extent(aclist_map, function(d) { return d.created_at; }));
	  svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", "translate(" + margin.left + "," + 40 + ")")
      .call(xAxis);
}