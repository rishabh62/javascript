/**========================================================================
 *          Async programming using callbacks
 *========================================================================**/

/**===================================================================================================================
 * * Problem : This code fakes 3 ajax calls to retrieve a peice of text that needs to be printed in correct order
 * * this is a very common synchronization problem.
 * * Here we are trying to solve this problem by just using callbacks. This also demonstrates problems with callbacks
 *===================================================================================================================**/

//below texts will be retrieved using 3 fake ajax calls and our task is to print them in correct order
let fake_responses = {
  file1: "The",
  file2: "Taj",
  file3: "Mahal",
};

//fake ajax call with random delay
function getFile(filename, cb) {
  setTimeout(() => {
    cb(filename, fake_responses[filename]);
  }, Math.random() * 1e3 + 2000);
}

//external variable to keep track of responses
let responses = {};

function handleResponse(filename, data) {
  //handle responses in way that text is printed in the order : The Taj Mahal
  //this solution uses callbacks to achieve the required output
  if (!responses[filename]) {
    responses[filename] = data;
  }
  if(responses['file1']){
    Object.entries(responses).some(({ key, val }) => {
        if (val) {
          console.log(val);
          responses[key] = false;
        }
      });
  }
}

//ajax calls to fetch all three files
getFile("file1", handleResponse);
getFile("file2", handleResponse);
getFile("file3", handleResponse);
