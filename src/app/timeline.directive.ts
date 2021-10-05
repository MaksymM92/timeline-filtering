import {Directive, Input, ElementRef, Output, EventEmitter, OnInit} from '@angular/core';
import * as d3 from 'd3';
import * as moment from 'moment';

@Directive({
  selector: '[appTimeline]'
})
export class TimelineDirective implements OnInit{

  @Input() data: Array<any> | undefined;
  @Output() timeRange = new EventEmitter<object>();

  constructor(private element: ElementRef) { }

  ngOnInit() {
    this.initTimeLine();
  }

  initTimeLine() {
    const element = this.element.nativeElement;
    const width  = 1100;
    const height  = 100;
    const maxTs = 1640980799000;
    const minTs = 1609444800000;

    const brushed = (event: any) => {
      // selected area on timeline
      const selection = event.selection;
      // transforming selected area to timestamps
      const dateRange = selection.map(x.invert, x);
      const timeStart = moment(dateRange[0]).valueOf();
      const timeEnd = moment(dateRange[1]).valueOf();
      const updatedTs = {
        tsMin: timeStart,
        tsMax: timeEnd
      };
      // sending new timestamps to main component pipe
      this.timeRange.emit(updatedTs);
    };

    // Adding timeline timescale
    const x = d3.scaleTime()
      .range([0, width])
      .domain([new Date(minTs), new Date(maxTs)]);

    // Adding brush timescale
    const x2 = d3.scaleTime()
      .range([0, width])
      .domain(x.domain());

    // Adding x axis
    const xAxis = d3.axisBottom(x);

    // Appending svg to the div
    const svg = d3.select(element)
      .append("svg")
      .attr("viewBox", `0 -20 1100 100`)
   //
   //  Appending context
    const context = svg.append('g')
      .attr('class', 'context')
      .attr('transform', 'translate("40, 125")');
   //
    // Transforming data to bars representation
   // @ts-ignore
    const bar = svg.selectAll('bar').data(this.data).enter();
   //
   //  Appending bar to timeline and plcing then in accordincs with time
    bar.append('rect')
      .attr('x', (d: any) => x(d.time))
      .attr('width', '10px')
      .attr('height', height/2)
      .attr('fill', '#007FFF')
   //
   //  Adding brush
   // @ts-ignore
    const brush = d3.brushX(x2)
      .extent([[0, 0], [width, 50]])
      .on('end', brushed);
   //
   //  Appending ticks
    context.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0,50)")
      .call(xAxis);
   //
   //  Appending brush
    svg.append('g')
      .call(brush)
      .call(brush.move, x.range())
      .selectAll('rect')
      .attr('y', 0);
  }
}
