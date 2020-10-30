import { OllAlg } from '../oll-alg';

export const OllAlgs: OllAlg[] = [
  { id: 1, name: 'alg1', 'src': 'assets/oll-pics/1.svg', type: 'dot', alg: "R U2 R2 F R F' U2 R' F R F'" },
  { id: 2, name: 'alg2', 'src': 'assets/oll-pics/2.svg', type: 'dot', alg: "F R U R' U' F' f R U R' U' f'" },
  { id: 3, name: 'alg3', 'src': 'assets/oll-pics/3.svg', type: 'dot', alg: "y' f R U R' U' f' U' F R U R' U' F'" },
  { id: 4, name: 'alg4', 'src': 'assets/oll-pics/4.svg', type: 'dot', alg: "y' f R U R' U' f' U F R U R' U' F'" },
  { id: 5, name: 'alg5', 'src': 'assets/oll-pics/5.svg', type: 'square', alg: "r' U2 R U R' U r" },
  { id: 6, name: 'alg6', 'src': 'assets/oll-pics/6.svg', type: 'square', alg: "r U2 R' U' R U' r'" },
  { id: 7, name: 'alg7', 'src': 'assets/oll-pics/7.svg', type: 'lightning', alg: "r U R' U R U2 r'" },
  { id: 8, name: 'alg8', 'src': 'assets/oll-pics/8.svg', type: 'lightning', alg: "y2 r' U' R U' R' U2 r" },
  { id: 9, name: 'alg9', 'src': 'assets/oll-pics/9.svg', type: 'fish', alg: "y R U R' U' R' F R2 U R' U' F'" },
  { id: 10, name: 'alg10', 'src': 'assets/oll-pics/10.svg', type: 'fish', alg: "R U R' U R' F R F' R U2 R'" },
  { id: 11, name: 'alg11', 'src': 'assets/oll-pics/11.svg', type: 'lightning', alg: "r' R2 U R' U R U2 R' U M'" },
  { id: 12, name: 'alg12', 'src': 'assets/oll-pics/12.svg', type: 'lightning', alg: "F R U R' U' F' U F R U R' U' F'" },
  { id: 13, name: 'alg13', 'src': 'assets/oll-pics/13.svg', type: 'knight move', alg: "r U' r' U' r U r' F' U F" },
  { id: 14, name: 'alg14', 'src': 'assets/oll-pics/14.svg', type: 'knight move', alg: "R' F R U R' F' R F U' F'" },
  { id: 15, name: 'alg15', 'src': 'assets/oll-pics/15.svg', type: 'knight move', alg: "r' U' r R' U' R U r' U r" },
  { id: 16, name: 'alg16', 'src': 'assets/oll-pics/16.svg', type: 'knight move', alg: "r U r' R U R' U' r U' r'" },
  { id: 17, name: 'alg17', 'src': 'assets/oll-pics/17.svg', type: 'dot', alg: "R U R' U R' F R F' U2 R' F R F'" },
  { id: 18, name: 'alg18', 'src': 'assets/oll-pics/18.svg', type: 'dot', alg: "r U R' U R U2 r2 U' R U' R' U2 r" },
  { id: 19, name: 'alg19', 'src': 'assets/oll-pics/19.svg', type: 'dot', alg: "M U R U R' U' M' R' F R F'" },
  { id: 20, name: 'alg20', 'src': 'assets/oll-pics/20.svg', type: 'dot', alg: "M U R U R' U' M2 U R U' r'" },
  { id: 21, name: 'alg21', 'src': 'assets/oll-pics/21.svg', type: 'edges oriented', alg: "y R U2 R' U' R U R' U' R U' R'" },
  { id: 22, name: 'alg22', 'src': 'assets/oll-pics/22.svg', type: 'edges oriented', alg: "R U2 R2 U' R2 U' R2 U2 R" },
  { id: 23, name: 'alg23', 'src': 'assets/oll-pics/23.svg', type: 'edges oriented', alg: "R2 D R' U2 R D' R' U2 R'" },
  { id: 24, name: 'alg24', 'src': 'assets/oll-pics/24.svg', type: 'edges oriented', alg: "r U R' U' r' F R F'" },
  { id: 25, name: 'alg25', 'src': 'assets/oll-pics/25.svg', type: 'edges oriented', alg: "y F' r U R' U' r' F R" },
  { id: 26, name: 'alg26', 'src': 'assets/oll-pics/26.svg', type: 'edges oriented', alg: "y R U2 R' U' R U' R'" },
  { id: 27, name: 'alg27', 'src': 'assets/oll-pics/27.svg', type: 'edges oriented', alg: "R U R' U R U2 R'" },
  { id: 28, name: 'alg28', 'src': 'assets/oll-pics/28.svg', type: 'corners oriented', alg: "r U R' U' M U R U' R'" },
  { id: 29, name: 'alg29', 'src': 'assets/oll-pics/29.svg', type: 'awkward', alg: "M U R U R' U' R' F R F' M'" },
  { id: 30, name: 'alg30', 'src': 'assets/oll-pics/30.svg', type: 'awkward', alg: "y2 F U R U2 R' U' R U2 R' U' F'" },
  { id: 31, name: 'alg31', 'src': 'assets/oll-pics/31.svg', type: 'p', alg: "R' U' F U R U' R' F' R" },
  { id: 32, name: 'alg32', 'src': 'assets/oll-pics/32.svg', type: 'p', alg: "R U B' U' R' U R B R'" },
  { id: 33, name: 'alg33', 'src': 'assets/oll-pics/33.svg', type: 't', alg: "R U R' U' R' F R F'" },
  { id: 34, name: 'alg34', 'src': 'assets/oll-pics/34.svg', type: 'c', alg: "y2 R U R2 U' R' F R U R U' F'" },
  { id: 35, name: 'alg35', 'src': 'assets/oll-pics/35.svg', type: 'fish', alg: "R U2 R2 F R F' R U2 R'" },
  { id: 36, name: 'alg36', 'src': 'assets/oll-pics/36.svg', type: 'w', alg: "y2 L' U' L U' L' U L U L F' L' F" },
  { id: 37, name: 'alg37', 'src': 'assets/oll-pics/37.svg', type: 'fish', alg: "F R U' R' U' R U R' F'" },
  { id: 38, name: 'alg38', 'src': 'assets/oll-pics/38.svg', type: 'w', alg: "R U R' U R U' R' U' R' F R F'" },
  { id: 39, name: 'alg39', 'src': 'assets/oll-pics/39.svg', type: 'lightning', alg: "y L F' L' U' L U F U' L'" },
  { id: 40, name: 'alg40', 'src': 'assets/oll-pics/40.svg', type: 'lightning', alg: "y R' F R U R' U' F' U R" },
  { id: 41, name: 'alg41', 'src': 'assets/oll-pics/41.svg', type: 'awkward', alg: "y2 R U R' U R U2 R' F R U R' U' F'" },
  { id: 42, name: 'alg42', 'src': 'assets/oll-pics/42.svg', type: 'awkward', alg: "R' U' R U' R' U2 R F R U R' U' F'" },
  { id: 43, name: 'alg43', 'src': 'assets/oll-pics/43.svg', type: 'p', alg: "f' L' U' L U f" },
  { id: 44, name: 'alg44', 'src': 'assets/oll-pics/44.svg', type: 'p', alg: "f R U R' U' f'" },
  { id: 45, name: 'alg45', 'src': 'assets/oll-pics/45.svg', type: 't', alg: "F R U R' U' F'" },
  { id: 46, name: 'alg46', 'src': 'assets/oll-pics/46.svg', type: 'c', alg: "R' U' R' F R F' U R" },
  { id: 47, name: 'alg47', 'src': 'assets/oll-pics/47.svg', type: 'l', alg: "F' L' U' L U L' U' L U F" },
  { id: 48, name: 'alg48', 'src': 'assets/oll-pics/48.svg', type: 'l', alg: "F R U R' U' R U R' U' F'" },
  { id: 49, name: 'alg49', 'src': 'assets/oll-pics/49.svg', type: 'l', alg: "y2 r U' r2 U r2 U r2 U' r" },
  { id: 50, name: 'alg50', 'src': 'assets/oll-pics/50.svg', type: 'l', alg: "r' U r2 U' r2 U' r2 U r'" },
  { id: 51, name: 'alg51', 'src': 'assets/oll-pics/51.svg', type: 'line', alg: "f R U R' U' R U R' U' f'" },
  { id: 52, name: 'alg52', 'src': 'assets/oll-pics/52.svg', type: 'line', alg: "R U R' U R d' R U' R' F'" },
  { id: 53, name: 'alg53', 'src': 'assets/oll-pics/53.svg', type: 'l', alg: "r' U' R U' R' U R U' R' U2 r" },
  { id: 54, name: 'alg54', 'src': 'assets/oll-pics/54.svg', type: 'l', alg: "r U R' U R U' R' U R U2 r'" },
  { id: 55, name: 'alg55', 'src': 'assets/oll-pics/55.svg', type: 'line', alg: "R U2 R2 U' R U' R' U2 F R F'" },
  { id: 56, name: 'alg56', 'src': 'assets/oll-pics/56.svg', type: 'line', alg: "r U r' U R U' R' U R U' R' r U' r'" },
  { id: 57, name: 'alg57', 'src': 'assets/oll-pics/57.svg', type: 'corners oriented', alg: "R U R' U' M' U R U' r'" }
];

export function reverseAlg(alg: string): string[] {
  var convertMove = {
    "r": "r'",
    "r'": "r",
    "l": "l'",
    "l'": "l",
    "u": "u'",
    "u'": "u",
    "d": "d'",
    "d'": "d",
    "f": "f'",
    "f'": "f",
    "b": "b'",
    "b'": "b",
    "R": "R'",
    "R'": "R",
    "L": "L'",
    "L'": "L",
    "U": "U'",
    "U'": "U",
    "D": "D'",
    "D'": "D",
    "F": "F'",
    "F'": "F",
    "B": "B'",
    "B'": "B",
    "x": "x'",
    "x'": "x",
    "y": "y'",
    "y'": "y",
    "z": "z'",
    "z'": "z",
    "M": "M'",
    "M'": "M",
  }
  var result = ""
  var moves = alg.split(" ").reverse()
  var flattenedMoves = []
  moves.forEach(elem => {
    if (elem.split("2").length == 2) {
      var move = elem.split("2")[0]
      flattenedMoves.push(move)
      flattenedMoves.push(move)
    } else {
      flattenedMoves.push(elem)
    }
  });
  var resultMoves = flattenedMoves.map(elem => convertMove[elem])
  return resultMoves
}