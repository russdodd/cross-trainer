import * as d3 from 'd3';
import { Component, OnInit } from '@angular/core';
import { OllSelectedStateService } from '../../oll-selected-state.service';
import { CubeStateService } from './cube-state.service';
import { OllAlgs, reverseAlg } from '../oll-alg-info/oll-alg-info';
import { OllAlg } from '../oll-alg';

@Component({
  selector: 'app-d3-cube',
  templateUrl: './d3-cube.component.html',
  styleUrls: ['./d3-cube.component.css']
})
export class D3CubeComponent implements OnInit {
  constructor(private ollStateService: OllSelectedStateService, private cubeStateService: CubeStateService) {}

  private faces:any = {"u":0,"d":1,"l":2,"r":3,"f":4,"b":5}
  private colors:any = [
    d3.color("yellow"),
    d3.color("white"),
    d3.color("green"),
    d3.color("blue"),
    d3.color("orange"),
    d3.color("red")
  ]  

  private ollAlgs:any = {}

  ngOnInit(): void {
    this.initCube(this.colors, []);
  }

  drawOll(): void {
    console.log("drawing oll")
    var newOll = this.ollStateService.drawNewOll()
    var oll:OllAlg = OllAlgs.filter(elem => elem.name == newOll)[0]
    var algMoves: string[] = reverseAlg(oll.alg)
    this.initCube(this.colors, algMoves);
  }

  gridData(colors: Array<any>) :any[] {
    var data = new Array();
    var xpos = 1; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
    var ypos = 1;
    var width = 50;
    var height = 50;
    
    // iterate for rows	
    for (var row = 0; row < 3; row++) {
      data.push( new Array() );
      
      // iterate for cells/columns inside rows
      for (var column = 0; column < 3; column++) {
        data[row].push({
          x: xpos,
          y: ypos,
          width: width,
          height: height,
          color: colors[row][column]
        })
        // increment the x position. I.e. move it over by 50 (width variable)
        xpos += width;
      }
      // reset the x position after a row is complete
      xpos = 1;
      // increment the y position for the next row. Move it down 50 (height variable)
      ypos += height;	
    }
    return data;
  }


  initCube(colors: any, moves: string[]): void {
    // deep copy complex object
    const cubeWidth = 50;
    const angle = 30
    const angle2 = 180
    const lengthTrans = 1
    this.cubeStateService.initCube()
    this.cubeStateService.executeMoves(moves)

    var cubeState = this.cubeStateService.getCubeState()
    var gridData = this.gridData(this.cubeStateService.getUToPrint());	
    // I like to log the data to the console for quick debugging
    var dx = 255, dy = 0;
    var a = -lengthTrans, b = 0, c = 0, d = Math.sin(30 * Math.PI/angle2);
    b = Math.sin(angle * Math.PI/angle2),
    c = 1;
    var matrix = [a, b, c, d, dx, dy];
    d3.select("svg").remove();
    var grid = d3.select("#grid")
      .append("svg")
      .attr("width","510px")
      .attr("height","310px");
    const translateTop = 255;
    var row = grid.selectAll("#row_0")
      .data(gridData)
      .enter().append("g")
      .attr("class", "row")
      .attr("id", "row_0")
      .attr("transform", "matrix("+matrix+")");
      
    row.selectAll(".square")
      .data(function(d: any) { return d; })
      .enter().append("rect")
      .attr("class","square")
      .attr("x", function(d: any) { return d.x; })
      .attr("y", function(d: any) { return d.y; })
      .attr("width", function(d: any) { return d.width; })
      .attr("height", function(d: any) { return d.height; })
      .attr("fill", function(d: any) { return colors[d.color]; })
      .style("stroke", "#222");
  
    var gridDataLeft = this.gridData(this.cubeStateService.getLToPrint());	
    dx = 255 - 150 * 2 * Math.sin(angle * Math.PI/180), dy = 75 * 2 * Math.sin(angle * Math.PI/angle2);
    a = 1, b = 0, c = 0, d = 1;
    b = Math.sin(angle * Math.PI/angle2)
    matrix = [a, b, c, d, dx, dy];
    var row2 = grid.selectAll("#row_1")
        .data(gridDataLeft)
        .enter().append("g")
        .attr("class", "row")
      .attr("id", "row_1")
      .attr("transform", "matrix("+matrix+")");

    var column = row2.selectAll(".square")
        .data(function(d: any) { return d; })
        .enter().append("rect")
        .attr("class","square")
        .attr("x", function(d: any) { return d.x; })
        .attr("y", function(d: any) { return d.y; })
        .attr("width", function(d: any) { return d.width; })
        .attr("height", function(d: any) { return d.height; })
        .style("fill", function(d: any) { return colors[d.color]; })
        .style("stroke", "#222")

  // cubeState['f'][0][0] = 1
  var fToPrint = this.cubeStateService.getFToPrint()
  var gridDataRight = this.gridData(fToPrint);	
  dx = 255, dy = 150 * 2 * Math.sin(angle * Math.PI/angle2);
  a = 1, b = 0, c = 0, d = 1;
  b = -Math.sin(angle * Math.PI/angle2);
  matrix = [a, b, c, d, dx, dy];
    var row3 = grid.selectAll("#row_2")
        .data(gridDataRight)
        .enter().append("g")
        .attr("class", "row")
      .attr("id", "row_2")
      .attr("transform", "matrix("+matrix+")");

    var column = row3.selectAll(".square")
        .data(function(d: any) { return d; })
        .enter().append("rect")
        .attr("class","square")
        .attr("x", function(d: any) { return d.x; })
        .attr("y", function(d: any) { return d.y; })
        .attr("width", function(d: any) { return d.width; })
        .attr("height", function(d: any) { return d.height; })
        .style("fill", function(d: any) { return colors[d.color]; })
        .style("stroke", "#222")
  }
}
