// function solution(s) {
//   var answer = 0;
//   let min = 0;
//   const result = {

//   };
//   for (let length = 1; length <= s.length / 2; length++) {

//     const str = s;
//       result[length] = '';
//       let sameCount = 1;
//       let prevStr = '';
//       for (let step = 0; step < s.length; step += length) {
//           const thisStr = s.slice(step, step + length);
//           console.log(thisStr, sameCount)
//           if (prevStr === thisStr) {
//               sameCount++;

//           } else {
//               console.log(prevStr, thisStr, sameCount)
//               if (sameCount > 1) result[length] += `${sameCount}${prevStr}`;
//               else result[length] += `${prevStr}`
//               sameCount = 1;
//               prevStr = thisStr;
//           }
//           console.log(step, length, s.length)
//             if (step + length >= s.length) {
//                   if (sameCount > 1) result[length] += `${sameCount}${prevStr}`;
//                   else result[length] += `${thisStr}`
//               }
//       }
//       // result[length] += result[length].length
//   }
//   console.log(result);
//   console.log(s)
//   let t = [...s];
//   if (Object.keys(result).length > 0)t = Object.values(result).sort((a, b) => a.length - b.length)
//   console.log(t)
//   return t[0].length;
// }



// const s1 = "aabbaccc"
// // const s1a = solution(s1); // 7

// const s2 = "ababcdcdababcdcd"
// const s2a = solution(s2); // 9

// const s3 = "abcabcdede"
// // const s3a = solution(s3); // 8

// const s4 = "abcabcabcabcdededededede"
// // const s4a = solution(s4); // 14

// const s5 = "xababcdcdababcdcd"
// // const s5a = solution(s5); // 17

// const s6 = "1";
// const s6a = solution(s6);
// console.log(`${s6} `);


// // console.log(`${s1a} 7`);
// console.log(`${s2a} 9`);
// // console.log(`${s3a} 8`);
// // console.log(`${s4a} 14`);
// // console.log(`${s5a} 17`);



// 숫자 문자열과 영단어
// https://programmers.co.kr/learn/courses/30/lessons/81301

// const solution = (s) => {
//   const num = {
//     zero: 0,
//     one: 1,
//     two: 2,
//     three: 3,
//     four: 4,
//     five: 5,
//     six: 6,
//     seven: 7,
//     eight: 8,
//     nine: 9,
//   }
//   const test = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
//   // eslint-disable-next-line guard-for-in
//   for(const i in test ) {
//     const ch = test[i];
//     const regexAll = new RegExp(ch, "g"); // 모든 패턴을 찾음
//     s = s.replace(regexAll, i);
//   }
//   console.log(s)
//   return parseInt(s, 10)
// };


// const inputs = [
//   "one4seveneight",
//   "23four5six7",
//   "2three45sixseven",
//   "123",
//   "oneone"
// ];

// const outputs = [
//   1478,
//   234567,
//   234567,
//   123,
//   11,
// ]
// // eslint-disable-next-line guard-for-in
// for (const index in inputs) {
//   const result = solution(inputs[index]);
//   console.log(`result: ${result} : outputs: ${outputs[index]}`)
// };

// const input1 = "";
// const output1 = solution(input1);


// [카카오 인턴] 키패드 누르기
// https://programmers.co.kr/learn/courses/30/lessons/67256

// const solution = (numbers, hand) => {
//   console.log(numbers, hand)
//   var answer = '';
//   const phone = [
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 8, 9],
//     ['*', 0, '#'],
//   ];
//   const phone1 = [
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 8, 9],
//     [10, 11, 12],
//   ];

//   let leftHand = 10
//   let rightHand = 12

//   const getStep = (handPosition, target) => {

//     let step = 0;
//     if ([1, 4, 7, 10].includes(handPosition)) {
//       step++;
//       handPosition += 1;
//     } else if ([3, 6, 9, 12].includes(handPosition)) {
//       step++;
//       handPosition -= 1;
//     }
//     step += Math.abs(handPosition - target) / 3;
//     console.log(step, handPosition, target)
//     return step;
//   };

//   for (let val of numbers) {
//     if (val === '*') val = 10;
//     if (val === 0) val = 11;
//     if (val === '#') val = 12;
//     if ([1, 4, 7, 10].includes(val)) {
//       leftHand = val;
//       answer += 'L'
//     } else if ([3, 6, 9, 12].includes(val)) {
//       rightHand = val;
//       answer += 'R'
//     } else {
//       const leftStep = getStep(leftHand, val);
//       const rightSrep = getStep(rightHand, val);
//       console.log(leftStep, rightSrep)
//       if (leftStep === rightSrep) {
//         if (hand === 'right') {
//           rightHand = val;
//           answer += 'R';
//         } else {
//           leftHand = val;
//           answer += 'L';
//         }
//       } else if (leftStep > rightSrep) {
//         rightHand = val;
//         answer += 'R';
//       } else {
//         leftHand = val;
//         answer += 'L';
//       }
//       // // 위아래옆에 무슨손이 있니?
//       // let thisHand;
//       // let pri; // 우우선선순순위
//       // let step = 0;

//       // if ([2,5,8,11].includes(leftHand)) pri = 'L';
//       // if ([2,5,8,11].includes(rightHand)) pri = 'R';
//       // const left = Math.abs(([2,5,8,11].includes(leftHand) ? leftHand : leftHand + 1) - val);
//       // const right = Math.abs(([2,5,8,11].includes(rightHand) ?  rightHand : rightHand - 1 ) - val);
//       // console.log(left, right)
//       // if (left === right) {
//       //   thisHand = 'A';
//       //   console.log('tt', answer,thisHand)
//       // }
//       // if (left < right || !left) {
//       //   thisHand = 'L'
//       //   leftHand = val;
//       // } else if(left > right) {
//       //   thisHand = 'R'
//       //   rightHand = val;
//       // }
//       // answer += thisHand; 
//     }
//     console.log(val)
//   }
//   return answer;
// };

// const inputs = [
//   [[1, 3, 4, 5, 8, 2, 1, 4, 5, 9, 5], "right"],
//   [[7, 0, 8, 2, 8, 3, 1, 5, 7, 6, 2], "left"],
//   [[1, 2, 3, 4, 5, 6, 7, 8, 9, 0], "right"],
// ];

// const outputs = [
//   "LRLLLRLLRRL",
//   "LRLLRRLLLRR",
//   "LLRLLRLLRL",
// ];

// // eslint-disable-next-line guard-for-in
// for (const index in inputs) {
//   const result = solution(...inputs[index]);
//   console.log(`result: ${result} : outputs: ${outputs[index]}`)
// };




// 크레인 인형뽑기 게임
// https://programmers.co.kr/learn/courses/30/lessons/64061

// function solution(board, moves) {
//   let answer = 0;
//   const stack = [];
//   const newBoard = [];
//   // board 구조 변경....
//   for (let i = 0; i < board.length; i++) {
//     for (let j = 0; j < board[i].length; j++) {
//       if (!newBoard[j]) newBoard[j] = [];
//       const data = board[i][j];
//       if (data) newBoard[j].push(data);
//     }
//   }

  
//   console.log(newBoard)
//   console.log('d')

//   moves.forEach(element => {
//     console.log(element)
//     // const thisDol = 
//     const pre = stack.pop();
//     const data = newBoard[element - 1].shift();
    
//     if (pre !== data) {
//       if (pre) stack.push(pre);
//       if(data) stack.push(data);
//     } else {
//       if (data && pre) answer += 2;
//     }
//   });

//   console.log(board);
//   console.log(moves)
//   console.log(stack, stack.length)
//   return answer;
// }

// const inputs = [
//  [[[0,0,0,0,0],[0,0,1,0,3],[0,2,5,0,1],[4,2,4,4,2],[3,5,1,3,1]], [1,5,3,5,1,2,1,4]],
// ];

// const outputs = [
//   4,
// ];

// for (const index in inputs) {
//     if (Object.prototype.hasOwnProperty.call(inputs, index)) {
//       const result = solution(...inputs[index]);
//       console.log(`result: ${result} : outputs: ${outputs[index]}`)
//     }
// };

//없는 숫자 더하기 
//https://programmers.co.kr/learn/courses/30/lessons/86051


function solution(numbers) {
  var answer = 0;
  console.log(numbers)
  for (let i = 0; i < 10; i++) {
    if (!numbers.includes(i)) answer += i;
  }
  return answer;
}
const inputs = [
  [1,2,3,4,6,7,8,0],
  [5,8,4,0,6,7,9]
 ];
 
 const outputs = [
   14,
   6,
 ];
 
 for (const index in inputs) {
     if (Object.prototype.hasOwnProperty.call(inputs, index)) {
       const result = solution(inputs[index]);
       console.log(`result: ${result} : outputs: ${outputs[index]}`)
     }
 };