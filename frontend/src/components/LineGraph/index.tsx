import React from 'react'

import {
	CategoryScale,
	Chart as ChartJS,
	LinearScale,
	LineElement,
	PointElement,
	Legend,
	Tooltip,
	Interaction,
} from 'chart.js'

import {CrosshairPlugin, Interpolate} from 'chartjs-plugin-crosshair'

//chartjs
// import { Chart } from "chart.js";
// import 'chart.js/auto'
import {Line} from 'react-chartjs-2'
import GraphTooltip from '../GraphTooltip/index'
import { min } from 'moment'

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Legend,
	Tooltip,
	CrosshairPlugin,
)
Interaction.modes.interpolate = Interpolate

ChartJS.defaults.borderColor = '#333333'

interface ILineGraph {
	data?: any
}

const chartAreaBorder = {
	id: 'chartAreaBorder',
	afterDraw(chart, args, options) {
		const {
			ctx,
			chartArea: {left, top, width, height},
		} = chart
		ctx.save()
		ctx.strokeStyle = options.borderColor
		ctx.lineWidth = options.borderWidth
		ctx.setLineDash(options.borderDash || [])
		ctx.lineDashOffset = options.borderDashOffset
		ctx.strokeRect(left, top, width, height)
		ctx.restore()
	},
}

const tooltip = [
	{
		color: '#4169E1',
		text: 'Клики',
		count: '1,007,265',
	},
	{
		color: '#F3A63B',
		text: 'Конверсия: Все цели',
		count: '4.16%',
	},
	{
		color: '#6049B4',
		text: 'Расходы',
		count: '41,941.32₽',
	},
	{
		color: '#57BD53',
		text: 'Доля рекламных ра…',
		count: '27,89%',
	},
	{
		color: '#F3553E',
		text: 'Доходы: Все целы',
		count: '121,414.39₽',
	},
]

const options = {
	maintainAspectRatio: false,
	points: {
		radius: 0,
		hoverRadius: 0,
		hitRadius: 0,
	},
	line: {
		tension: 0.1,
	},
	responsive: true,
	interaction: {
		mode: 'index',
		intersect: false,
	},

	stacked: true,
	plugins: {
		chartAreaBorder: {
			borderColor: '#333',

			// borderColor: 'red',
			borderWidth: 2,
			// borderDash: [1, 1],
			borderDashOffset: 2,
		},

		legend: {
			display: false,
			position: 'top',
			align: 'left',
			rtl: true,
		},
		tooltip: {
			enabled: false,
			animation: false,
			callbacks: {
				title: async function (e) {
					const currentChart = e[0].chart
					//get #tooltip-graph element and set x position of tooltip
					const tooltipGraph = document.getElementById('tooltip-graph')
					if (tooltipGraph) {
						tooltipGraph.style.left = e[0].element.x + 'px'
						tooltipGraph.style.top = e[0].element.y + 'px'
						tooltipGraph.style.display = 'block'
					}
				},
				//   title: function(a, d) {
				//     return a[0].element.x.toFixed(2);
				//   },
				//   label: function(d) {
				//     console.log('TESTSDKAJLGS:DKJG;k');
				//     return (
				//       d.chart.data.datasets[d.datasetIndex].label + ": " + d.element.y.toFixed(2)
				//     );
				//   }
			},
		},
		title: {
			display: true,
		},

		crosshair: {
			enabled: true,
			snapToDataPoint: true,
			line: {
				color: '#474747', // Crosshair line color
				width: 1, // Crosshair line width
			},
			sync: {
				enabled: false, // Enable crosshair synchronization
				group: 2,
				suppressTooltips: true,
			},
			zoom: {
				enabled: false, // enable zooming
				zoomboxBackgroundColor: 'rgba(66,133,244,0.2)', // background color of zoom box
				zoomboxBorderColor: '#48F', // border color of zoom box
				zoomButtonText: 'Reset Zoom', // reset zoom button text
				zoomButtonClass: 'reset-zoom', // reset zoom button class
			},
		},
	},
	scales: {
		x: {
			gridLines: {
				borderDash: [8, 10],
				dashOffset: 2,
				color: '#979797',
			},
			border: {dash: [4, 4]},
			grid: {
				BorderDash: [33, 40],
				BorderDashOffset: 2,
				tickLength: 12,
			},
			ticks: {
				callback: function (val, index) {
					// Hide every 10nd tick label
					return index % 8 === 0 ? this.getLabelForValue(val) : ''
				},

				align: 'inner',
				maxRotation: 0,
				// maxTicksLimit: 11,
				// maxTextWidth: 800,
				labelOffset: 0,
			},
		},
		y: {
			grid: {
				tickLength: 0,
			},
			gridLines: {
				borderDash: [10, 10],
				color: '#979797',
			},
			//don't display the y values, but dispaly the grid
			ticks: {
				display: false,
			},
		},
	},
}

const LineGraph: React.FC<ILineGraph> = ({data}: ILineGraph) => {
	return (
		//line chart
		<>
			<Line
				type="monotone"
				dot={false}
				data={data}
				plugins={[chartAreaBorder]}
				options={options}
			/>
			{/* <GraphTooltip info={tooltip} /> */}
		</>
	)
}

export default LineGraph
