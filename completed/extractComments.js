function extractComments(input) {
  let singleCommentIndex = input.indexOf('//');
  let multilineCommentIndex = input.indexOf('/*');
  let comments = '';
  while (singleCommentIndex !== -1 || multilineCommentIndex !== -1) {
    if (
      singleCommentIndex !== -1 &&
      (singleCommentIndex < multilineCommentIndex ||
        multilineCommentIndex === -1)
    ) {
      const result = extractFirstSingleLineComment(input);
      comments += result[0];
      input = result[1];
      singleCommentIndex = input.indexOf('//');
    } else {
      const result = extractFirstMultiLineComment(input);
      comments += result[0];
      input = result[1];
      multilineCommentIndex = input.indexOf('/*');
    }
  }
  return comments.trim();
}

function extractFirstSingleLineComment(input) {
  let singleCommentIndex = input.indexOf('//');
  let endLine = input.indexOf('\n', singleCommentIndex);
  if (endLine === -1) {
    return [input.slice(singleCommentIndex) + '\n', ''];
  }
  return [
    input.slice(singleCommentIndex, endLine + 1),
    input.slice(endLine + 1),
  ];
}

function extractFirstMultiLineComment(input) {
  let openIndex = input.indexOf('/*');
  let closeIndex = input.indexOf('*/');
  if (openIndex !== -1) {
    if (closeIndex === -1) return [handleNoCloseIndex(input, openIndex), ''];
    else
      return [
        input.slice(openIndex, closeIndex + 2) + '\n',
        input.slice(closeIndex + 2),
      ];
  }
  return ['', input];
}

function handleNoCloseIndex(input, openIndex) {
  input.slice(openIndex);
}

// process.stdin.resume();
// process.stdin.setEncoding('ascii');
// var input = '';
// process.stdin.on('data', function(chunk) {
//   input += chunk;
// });
// process.stdin.on('end', function() {
console.log(
  extractComments(`
    //Hi
    there
    /* multiline */
    poopy
`)
);
// });

//using regex, but i would need documentation and am afraid of looking it up on a test
// function extractComments(input){
//     // const multiLineCommentRegex = /\/\*()?\*\//
//     // filter that stuff out and add it to output
//     // do search for // comments

// }
