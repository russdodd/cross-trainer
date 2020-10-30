import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CubeStateService {
  private faces:any = {"u":0,"d":1,"l":2,"r":3,"f":4,"b":5}
  private rotations:any = {
    "F": parent => parent.rotateF(),
    "F'": parent => parent.rotateFPrime(),
    "B": parent => parent.rotateB(),
    "B'": parent => parent.rotateBPrime(),
    "R": parent => parent.rotateR(),
    "R'": parent => parent.rotateRPrime(),
    "L": parent => parent.rotateL(),
    "L'": parent => parent.rotateLPrime(),
    "U": parent => parent.rotateU(),
    "U'": parent => parent.rotateUPrime(),
    "r": parent => parent.rotateWideR(),
    "r'": parent => parent.rotateWideRPrime(),
    "f": parent => parent.rotateWideF(),
    "f'": parent => parent.rotateWideFPrime(),
    "M": parent => parent.rotateM(),
    "M'": parent => parent.rotateMPrime(),
    "y": parent => parent.rotateY(),
    "y'": parent => parent.rotateYPrime(),
    "x": parent => parent.rotateX(),
    "x'": parent => parent.rotateXPrime()
  }
  private cubeState:object = {}
  private cubeStateTemplate:object = {
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
  
  curOll:string = "alg1"

  getCubeState(): any {
    return this.cubeState
  }
  rotateU(): void {
    // rotate 'u'
    this.cubeState['u'] = this.getClockwiseRotFace(this.cubeState["u"]);
    var temp = this.deepCopy(this.cubeState['b'][2])

    Object.assign(this.cubeState['b'][2], this.cubeState['l'][2])
    Object.assign(this.cubeState['l'][2], this.cubeState['f'][2])
    Object.assign(this.cubeState['f'][2], this.cubeState['r'][2])
    Object.assign(this.cubeState['r'][2], temp)
  }

  rotateUPrime(): void {
    this.rotateU();
    this.rotateU();
    this.rotateU();
  }

  rotateD(): void {
    // rotate 'd'
    this.cubeState['d'] = this.getClockwiseRotFace(this.cubeState["d"]);
    var temp = this.deepCopy(this.cubeState['f'][0])
    Object.assign(this.cubeState['f'][0], this.cubeState['l'][0])
    Object.assign(this.cubeState['l'][0], this.cubeState['b'][0])
    Object.assign(this.cubeState['b'][0], this.cubeState['r'][0])
    Object.assign(this.cubeState['r'][0], temp)
  }

  rotateF(): void {
    // rotate 'f'
    this.cubeState['f'] = this.getClockwiseRotFace(this.cubeState["f"]);
    
    // prior transformations to undo after
    this.cubeState['l'] = this.getClockwiseRotFace(this.cubeState["l"]);
    this.cubeState['r'] = this.getClockwiseRotFace(this.cubeState["r"]);

    var temp = this.deepCopy(this.cubeState['u'][0])

    this.cubeState['u'][0] = this.deepCopy(this.cubeState['l'][0])
    this.cubeState['l'][0] = this.cubeState['d'][2]
    this.cubeState['l'][0].reverse() // because of the way d is ordered when it's rotated
    this.cubeState['d'][2] = this.cubeState['r'][2]
    this.cubeState['r'][2] = temp
    this.cubeState['r'][2].reverse()

    // undo prior transformations
    this.cubeState['l'] = this.getAnticlockwiseRotFace(this.cubeState["l"]);
    this.cubeState['r'] = this.getAnticlockwiseRotFace(this.cubeState["r"]);
  }

  rotateFPrime(): void {
    this.rotateF()
    this.rotateF()
    this.rotateF()
  }

  rotateL(): void {
    // rotate 'l'
    this.cubeState['l'] = this.getClockwiseRotFace(this.cubeState["l"]);
    
    // prior transformations to undo after
    this.cubeState['b'] = this.getClockwiseRotFace(this.cubeState["b"]);
    var bCol = this.cubeState['b'][0]
    this.cubeState['f'] = this.getClockwiseRotFace(this.cubeState["f"]);
    var fCol =this.cubeState['f'][2]
    this.cubeState['u'] = this.getClockwiseRotFace(this.cubeState["u"]);
    var uCol = this.cubeState['u'][2]
    this.cubeState['d'] = this.getClockwiseRotFace(this.cubeState["d"]);
    var dCol =this.cubeState['d'][2]

    // switch around the arrays
    var temp = [...uCol]
    Object.assign(uCol, bCol)
    uCol.reverse()
    Object.assign(bCol, dCol)
    bCol.reverse() // because of how dcol is ordered after rotating
    Object.assign(dCol, fCol)
    Object.assign(fCol, temp)

    // undo prior transformations
    this.cubeState['b'] = this.getAnticlockwiseRotFace(this.cubeState["b"]);
    this.cubeState['f'] = this.getAnticlockwiseRotFace(this.cubeState["f"]);
    this.cubeState['u'] = this.getAnticlockwiseRotFace(this.cubeState["u"]);
    this.cubeState['d'] = this.getAnticlockwiseRotFace(this.cubeState["d"]);
  }

  rotateLPrime(): void {
    this.rotateL()
    this.rotateL()
    this.rotateL()
  }

  rotateB(): void {
    // rotate 'b'
    this.cubeState['b'] = this.getClockwiseRotFace(this.cubeState["b"]);

    
    // prior transformations to undo after
    this.cubeState['l'] = this.getClockwiseRotFace(this.cubeState["l"]);
    var lCol = this.cubeState['l'][2]
    this.cubeState['r'] = this.getClockwiseRotFace(this.cubeState["r"]);
    var rCol =this.cubeState['r'][0]

    var temp = [...this.cubeState['u'][2]]
    Object.assign(this.cubeState['u'][2], rCol)
    this.cubeState['u'][2].reverse() // because of the way r is ordered after rotating
    Object.assign(rCol, this.cubeState['d'][0])
    Object.assign(this.cubeState['d'][0], lCol)
    this.cubeState['d'][0].reverse()
    Object.assign(lCol, temp)

    // undo prior transformations
    this.cubeState['l'] = this.getAnticlockwiseRotFace(this.cubeState["l"]);
    this.cubeState['r'] = this.getAnticlockwiseRotFace(this.cubeState["r"]);
  }

  rotateBPrime(): void {
    this.rotateB()
    this.rotateB()
    this.rotateB()
  }

  rotateR(): void {
    // rotate 'r'
    this.cubeState['r'] = this.getClockwiseRotFace(this.cubeState["r"]);
    
    // prior transformations to undo after
    this.cubeState['b'] = this.getClockwiseRotFace(this.cubeState["b"]);
    this.cubeState['f'] = this.getClockwiseRotFace(this.cubeState["f"]);
    this.cubeState['u'] = this.getClockwiseRotFace(this.cubeState["u"]);
    this.cubeState['d'] = this.getClockwiseRotFace(this.cubeState["d"]);

    // switch around the arrays
    var temp = this.deepCopy(this.cubeState['u'][0])
    this.cubeState['u'][0] = this.deepCopy(this.cubeState['f'][0])
    this.cubeState['f'][0] = this.deepCopy(this.cubeState['d'][0])
    this.cubeState['d'][0] = this.deepCopy(this.cubeState['b'][2])
    this.cubeState['d'][0].reverse()
    this.cubeState['b'][2] = this.deepCopy(temp)
    this.cubeState['b'][2].reverse() // because of how u is ordered after rotating

    // undo prior transformations
    this.cubeState['b'] = this.getAnticlockwiseRotFace(this.cubeState["b"]);
    this.cubeState['f'] = this.getAnticlockwiseRotFace(this.cubeState["f"]);
    this.cubeState['u'] = this.getAnticlockwiseRotFace(this.cubeState["u"]);
    this.cubeState['d'] = this.getAnticlockwiseRotFace(this.cubeState["d"]);
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
  rotate(matrix: any): any {
    const n = matrix.length;
    const x = Math.floor(n/ 2);
    const y = n - 1;
    for (let i = 0; i < x; i++) {
       for (let j = i; j < y - i; j++) {
          var k = matrix[i][j];
          matrix[i][j] = matrix[y - j][i];
          matrix[y - j][i] = matrix[y - i][y - j];
          matrix[y - i][y - j] = matrix[j][y - i]
          matrix[j][y - i] = k
       }
    }
  }

  getAnticlockwiseRotFace(face:any): any {
    var copy = this.deepCopy(face)
    this.rotate(copy)
    return copy
  }

  getClockwiseRotFace(face:any): any {
    var rotated = this.getAnticlockwiseRotFace(face)
    rotated = this.getAnticlockwiseRotFace(rotated)
    rotated = this.getAnticlockwiseRotFace(rotated)
    return rotated
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

  rotateWideR(): void {
    this.rotateX()
    this.rotateL()
  }

  rotateWideRPrime(): void {
    this.rotateXPrime()
    this.rotateLPrime()
  }

  rotateWideF(): void {
    this.rotateZ()
    this.rotateB()
  }

  rotateWideFPrime(): void {
    this.rotateZPrime()
    this.rotateBPrime()
  }

  rotateM(): void {
    this.rotateXPrime()
    this.rotateR()
    this.rotateLPrime()
  }

  rotateMPrime(): void {
    this.rotateX()
    this.rotateRPrime()
    this.rotateL()
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

  executeMoves(moves: string[]): void {
    console.log("moves")
    console.log(moves)
    var moveFuncs = moves.map(elem => this.rotations[elem])
    console.log(moveFuncs)
    moveFuncs.forEach(move => {
      // console.log("***\nmove\n***")
      move(this);
      // this.printCubeFaces()
    });
  }

  initCube() {
    this.cubeState = JSON.parse(JSON.stringify(this.cubeStateTemplate))
  }

  printCubeFaces() {
    ['u', 'f', 'r', 'b', 'l', 'd'].forEach(element => {
      console.log("face: " + element)
      this.printFace(element)
    });
    // this.printFace("u")
  }

  getUToPrint(): any {
    var u = this.deepCopy(this.cubeState['u'])
    var uFlipped = u.map(elem => elem.reverse()).reverse()
    return uFlipped
  }

  getLToPrint(): any {
    var l = this.deepCopy(this.cubeState['l'])
    l.reverse()
    return l
  }
  
  getFToPrint(): any {
    var f = this.deepCopy(this.cubeState['f'])
    f.reverse()
    return f
  }

  printFace(faceName: string) {
    var face: Array<Array<number>> = this.cubeState[faceName]
    var faceAggregator: string = ""
    for (var row = 2; row >= 0; row--) {
      for (var col = 0; col < 3; col++) {
        faceAggregator += " " + face[row][col]; //change the %5d to however much space you want
      }
      faceAggregator += "\n"; //Makes a new row
    }
    console.log(faceAggregator)
  }

  printFaceSide(face: any) {
    var faceAggregator: string = ""
    for (var row = 2; row >= 0; row--) {
      for (var col = 0; col < 3; col++) {
        faceAggregator += " " + face[row][col]; //change the %5d to however much space you want
      }
      faceAggregator += "\n"; //Makes a new row
    }
    console.log(faceAggregator)
  }

  constructor() { }
}
