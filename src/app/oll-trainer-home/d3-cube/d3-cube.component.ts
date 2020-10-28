import * as d3 from 'd3';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-d3-cube',
  templateUrl: './d3-cube.component.html',
  styleUrls: ['./d3-cube.component.css']
})
export class D3CubeComponent implements OnInit {

  constructor() { }

  private faces:any = {"u":0,"d":1,"l":2,"r":3,"f":4,"b":5}
  private colors:any = [
    d3.color("yellow"),
    d3.color("white"),
    d3.color("green"),
    d3.color("blue"),
    d3.color("orange"),
    d3.color("red")
  ]

  private rotations:any = {
    "F": this.rotateF,
    "F'": this.rotateFPrime,
    "B": this.rotateB,
    "B'": this.rotateBPrime,
    "R": this.rotateR,
    "R'": this.rotateRPrime,
    "L": this.rotateL,
    "L'": this.rotateLPrime,
    "U": this.rotateU,
    "U'": this.rotateUPrime
  }

  private ollAlgs:any = {}

  private cubeState:object = {
    "u": [
      [0,0,0],
      [0,0,0],
      [0,0,0]
    ],
    "d": [
      [1,1,1],
      [1,1,1],
      [1,1,1]
    ],
    "l":[
      [2,2,2],
      [2,2,2],
      [2,2,2]
    ],
    "r":[
      [3,3,3],
      [3,3,3],
      [3,3,3]
    ],
    "f":[
      [4,4,4],
      [4,4,4],
      [4,4,4]
    ],
    "b":[
      [5,5,5],
      [5,5,5],
      [5,5,5]
    ]
  };

  rotateU(): void {
    // rotate 'u'
    this.cubeState['u'] = [...this.cubeState["u"][0].map((_, colIndex) => this.cubeState["u"].map(row => row[colIndex]))];
    var temp = [...this.cubeState['b'][0]]

    Object.assign(this.cubeState['b'][0], this.cubeState['l'][0])
    Object.assign(this.cubeState['l'][0], this.cubeState['f'][0])
    Object.assign(this.cubeState['f'][0], this.cubeState['r'][0])
    Object.assign(this.cubeState['r'][0], temp)
  }

  rotateUPrime(): void {
    this.rotateU();
    this.rotateU();
    this.rotateU();
  }

  rotateD(): void {
    // rotate 'd'
    this.cubeState['d'] = [...this.cubeState["d"][0].map((_, colIndex) => this.cubeState["d"].map(row => row[colIndex]))];
    var temp = [...this.cubeState['f'][2]]
    Object.assign(this.cubeState['f'][2], this.cubeState['l'][2])
    Object.assign(this.cubeState['l'][2], this.cubeState['b'][2])
    Object.assign(this.cubeState['b'][2], this.cubeState['r'][2])
    Object.assign(this.cubeState['r'][0], temp)
  }

  rotateF(): void {
    // rotate 'f'
    this.cubeState['f'] = [...this.cubeState["f"][0].map((_, colIndex) => this.cubeState["f"].map(row => row[colIndex]))];
    
    // prior transformations to undo after
    this.cubeState['l'] = [...this.cubeState["l"][0].map((_, colIndex) => this.cubeState["l"].map(row => row[colIndex]))];
    var lCol = this.cubeState['l'][2]
    this.cubeState['r'] = [...this.cubeState["r"][0].map((_, colIndex) => this.cubeState["r"].map(row => row[colIndex]))];
    var rCol =this.cubeState['r'][0]

    var temp = [...this.cubeState['u'][2]]

    Object.assign(this.cubeState['u'][2], lCol)
    Object.assign(lCol, this.cubeState['d'][0])
    Object.assign(this.cubeState['d'][0], rCol)
    Object.assign(rCol, temp)

    // undo prior transformations
    this.cubeState['l'] = [...this.cubeState["l"][0].map((_, colIndex) => this.cubeState["l"].map(row => row[2-colIndex]))];
    this.cubeState['r'] = [...this.cubeState["r"][0].map((_, colIndex) => this.cubeState["r"].map(row => row[2-colIndex]))];
    console.log(this.cubeState)
  }

  rotateFPrime(): void {
    this.rotateF()
    this.rotateF()
    this.rotateF()
  }

  rotateL(): void {
    // rotate 'l'
    this.cubeState['l'] = [...this.cubeState["l"][0].map((_, colIndex) => this.cubeState["l"].map(row => row[colIndex]))];
    
    // prior transformations to undo after
    this.cubeState['b'] = [...this.cubeState["b"][0].map((_, colIndex) => this.cubeState["b"].map(row => row[colIndex]))];
    var bCol = this.cubeState['b'][2]
    this.cubeState['f'] = [...this.cubeState["f"][0].map((_, colIndex) => this.cubeState["f"].map(row => row[colIndex]))];
    var fCol =this.cubeState['f'][0]
    this.cubeState['u'] = [...this.cubeState["u"][0].map((_, colIndex) => this.cubeState["u"].map(row => row[colIndex]))];
    var uCol = this.cubeState['u'][0]
    this.cubeState['d'] = [...this.cubeState["d"][0].map((_, colIndex) => this.cubeState["d"].map(row => row[colIndex]))];
    var dCol =this.cubeState['d'][2]

    // switch around the arrays
    var temp = [...uCol]
    Object.assign(uCol, bCol)
    Object.assign(bCol, dCol)
    Object.assign(dCol, fCol)
    Object.assign(fCol, temp)

    // undo prior transformations
    this.cubeState['b'] = [...this.cubeState["b"][0].map((_, colIndex) => this.cubeState["b"].map(row => row[2-colIndex]))];
    this.cubeState['f'] = [...this.cubeState["f"][0].map((_, colIndex) => this.cubeState["f"].map(row => row[2-colIndex]))];
    this.cubeState['u'] = [...this.cubeState["u"][0].map((_, colIndex) => this.cubeState["u"].map(row => row[2-colIndex]))];
    this.cubeState['d'] = [...this.cubeState["d"][0].map((_, colIndex) => this.cubeState["d"].map(row => row[2-colIndex]))];
  }

  rotateLPrime(): void {
    this.rotateL()
    this.rotateL()
    this.rotateL()
  }

  rotateB(): void {
    // rotate 'b'
    this.cubeState['b'] = [...this.cubeState["b"][0].map((_, colIndex) => this.cubeState["b"].map(row => row[colIndex]))];
    
    // prior transformations to undo after
    this.cubeState['l'] = [...this.cubeState["l"][0].map((_, colIndex) => this.cubeState["l"].map(row => row[colIndex]))];
    var lCol = this.cubeState['l'][0]
    this.cubeState['r'] = [...this.cubeState["r"][0].map((_, colIndex) => this.cubeState["r"].map(row => row[colIndex]))];
    var rCol =this.cubeState['r'][2]

    var temp = [...this.cubeState['u'][0]]
    Object.assign(this.cubeState['u'][0], rCol)
    Object.assign(rCol, this.cubeState['d'][2])
    Object.assign(this.cubeState['d'][2], lCol)
    Object.assign(lCol, temp)

    // undo prior transformations
    this.cubeState['l'] = [...this.cubeState["l"][0].map((_, colIndex) => this.cubeState["l"].map(row => row[2-colIndex]))];
    this.cubeState['r'] = [...this.cubeState["r"][0].map((_, colIndex) => this.cubeState["r"].map(row => row[2-colIndex]))];
  }

  rotateBPrime(): void {
    this.rotateB()
    this.rotateB()
    this.rotateB()
  }

  rotateR(): void {
    // rotate 'r'
    this.cubeState['r'] = [...this.cubeState["r"][0].map((_, colIndex) => this.cubeState["r"].map(row => row[colIndex]))];
    
    // prior transformations to undo after
    this.cubeState['b'] = [...this.cubeState["b"][0].map((_, colIndex) => this.cubeState["b"].map(row => row[colIndex]))];
    var bCol = this.cubeState['b'][0]
    this.cubeState['f'] = [...this.cubeState["f"][0].map((_, colIndex) => this.cubeState["f"].map(row => row[colIndex]))];
    var fCol =this.cubeState['f'][2]
    this.cubeState['u'] = [...this.cubeState["u"][0].map((_, colIndex) => this.cubeState["u"].map(row => row[colIndex]))];
    var uCol = this.cubeState['u'][2]
    this.cubeState['d'] = [...this.cubeState["d"][0].map((_, colIndex) => this.cubeState["d"].map(row => row[colIndex]))];
    var dCol =this.cubeState['d'][0]

    // switch around the arrays
    var temp = [...uCol]
    Object.assign(uCol, fCol)
    Object.assign(fCol, dCol)
    Object.assign(dCol, bCol)
    Object.assign(bCol, temp)

    // undo prior transformations
    this.cubeState['b'] = [...this.cubeState["b"][0].map((_, colIndex) => this.cubeState["b"].map(row => row[2-colIndex]))];
    this.cubeState['f'] = [...this.cubeState["f"][0].map((_, colIndex) => this.cubeState["f"].map(row => row[2-colIndex]))];
    this.cubeState['u'] = [...this.cubeState["u"][0].map((_, colIndex) => this.cubeState["u"].map(row => row[2-colIndex]))];
    this.cubeState['d'] = [...this.cubeState["d"][0].map((_, colIndex) => this.cubeState["d"].map(row => row[2-colIndex]))];
  }

  rotateRPrime(): void {
    this.rotateR()
    this.rotateR()
    this.rotateR()
  }

  deepCopy(arr:any): any {
    let copy = [];
    arr.forEach(elem => {
      if(Array.isArray(elem)){
        copy.push(this.deepCopy(elem))
      }else{
        copy.push(elem)
      }
    })
    return copy;
  }
  
  getClockwiseRotFace(face:any): any {
    return face[0].map((_, colIndex) => face.map(row => row[colIndex]))
  }

  getAnticlockwiseRotFace(face:any): any {
    return face[0].map((_, colIndex) => face.map(row => row[2-colIndex]))
  }

  // rotate the entire cube on R
  rotateX(): void {
     // rotate r
     this.cubeState['r'] = this.getClockwiseRotFace(this.cubeState["r"]);
      // rotate l anti clockwise
    this.cubeState['l'] = this.getAnticlockwiseRotFace(this.cubeState["l"]);

    var temp = this.deepCopy(this.cubeState['u'])
    this.cubeState['u'] = this.deepCopy(this.cubeState['f'])
    this.cubeState['f'] = this.deepCopy(this.cubeState['d'])
    //rotate b then assign to d
    var rotatedB = this.getClockwiseRotFace(this.getClockwiseRotFace(this.cubeState["b"]))
    this.cubeState['d'] = this.deepCopy(rotatedB)
    // rotate u then assign to b
    var rotatedU = this.getClockwiseRotFace(this.getClockwiseRotFace(temp))
    this.cubeState['b'] = this.deepCopy(rotatedU)
  }

  rotateXPrime(): void {
    this.rotateX()
    this.rotateX()
    this.rotateX()
  }

    // rotate the entire cube on U
    rotateY(): void {
      // rotate r
      this.cubeState['u'] = this.getClockwiseRotFace(this.cubeState["u"]);
       // rotate l anti clockwise
     this.cubeState['d'] = this.getAnticlockwiseRotFace(this.cubeState["d"]);
 
     var temp = this.deepCopy(this.cubeState['f'])
     this.cubeState['f'] = this.deepCopy(this.cubeState['r'])
     this.cubeState['r'] = this.deepCopy(this.cubeState['b'])
     this.cubeState['b'] = this.deepCopy(this.cubeState['l'])
     this.cubeState['l'] = this.deepCopy(temp)
   }

   rotateYPrime(): void {
    this.rotateY()
    this.rotateY()
    this.rotateY()
  }

  // rotate whole cube around f
   rotateZ(): void {
     this.rotateX()
     this.rotateY()
     this.rotateX()
     this.rotateX()
     this.rotateX()
   }

   rotateZPrime(): void {
    this.rotateXPrime()
    this.rotateY()
    this.rotateX()
  }

  ngOnInit(): void {
    console.log("cubeState: ");
    console.log(this.cubeState);
    this.initCube(this.colors);
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

  initCube(colors: any): void {
    const cubeWidth = 50;
    const angle = 30
    const angle2 = 180
    const lengthTrans = 1
    this.rotateZPrime();
    var gridData = this.gridData(this.cubeState['u']);	
    // I like to log the data to the console for quick debugging
    console.log(gridData);
    var dx = 255, dy = 0;
    var a = -lengthTrans, b = 0, c = 0, d = Math.sin(30 * Math.PI/angle2);
    b = Math.sin(angle * Math.PI/angle2),
    c = 1;
    var matrix = [a, b, c, d, dx, dy];
    var grid = d3.select("#grid")
      .append("svg")
      .attr("width","510px")
      .attr("height","510px");
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
  
    var gridDataLeft = this.gridData(this.cubeState['l']);	
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

  var gridDataRight = this.gridData(this.cubeState['f']);	
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
