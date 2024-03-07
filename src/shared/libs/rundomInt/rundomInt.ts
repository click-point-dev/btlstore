export function rundomInt(min: number, max: number, placeNum: number = 0) {
   let rand = min + Math.random() * (max + 1 - min);
   return rand.toFixed(placeNum);
}
