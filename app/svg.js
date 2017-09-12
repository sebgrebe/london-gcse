$.ajax({
	url: '/data',
	type: 'GET',
	error: (xhr,errorType) => {
			console.log(errorType)
		},
	success: (data) => {
		console.log(data);
		const dataset = data;       
		const padding_left = 70;
		const padding_top = 20;
		const padding_bottom = 40;
		const padding_right = 120;
		const w = 1000;
		const h = window.innerHeight-200;
		const graph = document.getElementById('graph');
		function gather(data,type) {
			var array = []
			for (var i=0;i<dataset.length;i++) {
				array.push(dataset[i][type])
			}
			return array
		}
		var income = gather(dataset,'income');
		var gcse_perc = gather(dataset,'gcse');
		const svg = d3.select(graph)
		    .append('svg')
		    .attr('width',w)
		    .attr('height',h);
		const xScale = d3.scaleLinear()
			.domain([30000,d3.max(income)])
			.range([padding_left,w-padding_right])
		const yScale = d3.scaleLinear()
			.domain([55,d3.max(gcse_perc)])
			.range([h-padding_bottom,padding_top])
		const xAxis = d3.axisBottom(xScale)
        const yAxis = d3.axisLeft(yScale)

		svg.selectAll('g')
			.data(dataset)
			.enter()
			.append('circle')
			.attr('cx',(d) => xScale(d['income']))
			.attr('cy',(d) => yScale(d['gcse']))
			.attr('fill','#39CCCC')
			.attr('r',3)
			.attr('class','circle')

		//tooltips
       	svg.selectAll('circle')
      		.data(dataset)
      		.on('mouseover',(d,i) =>
             svg.append('foreignObject')
             	.attr("x", xScale(d['income']))
             	.attr("y", yScale(d['gcse']) + 10)
             	.attr('width', 120)
             	.attr('height',45)
             	.append('xhtml:div')
             	.html('<b>'+d['area']+'</b><br>Income: '+'£'+d['income']+'<br>GCSE: '+d['gcse']+'%')
             	.attr('class','tip')
             	)
      		.on('mouseout',() =>
            	 svg.selectAll('div.tip').remove()
             	)

		//x-Axis
       svg.append('g')
              .attr("transform", "translate(0, " + (h - padding_bottom) + ")")
              .call(xAxis)
                                   
       //y-Axis
       svg.append('g')
              .attr("transform", "translate("+padding_left+", 0)")
              .call(yAxis)

       //y-label
       svg.append('text')
       .text("% of pupils achieving 5 A*-C GCSEs")
       .attr('x',20)
       .attr('y',70)
       .attr('class','label_y')

       //x-label
       svg.append('text')
       .text("Median income household (in £)")
       .attr('x',330)
       .attr('y',h)
       .attr('class','label_x')
		}
	})



























