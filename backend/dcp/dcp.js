#! /usr/bin/env node

const { json } = require("body-parser");

const scheduler = "https://scheduler.distributed.computer";

/**
 * @file        events.js
 *              Sample node application showing how to deploy a DCP job whilst receiving
 *              events describing the current state of the job, processing results
 *              as they are received, and so on.
 *
 * @author Wes Garland, wes@kingsds.network
 * @date   Aug 2019
 */

async function main() {
  const compute = require("dcp/compute");
  const wallet = require("dcp/wallet");

  let job, results, startTime;

  // TODO: Change this so that it calculates the total number of contributors for each repo
  // Main function for populate data from data.json
  // May change this to populate from github.com API
  var jsonObj = require("../data-collection/repos-contributors.json");
  // console.log(jsonObj)

  // // Using for func, got do func as well
  // // Pass the [jsonObj] as first argument where first argument only accept array.
  // // https://docs.dcp.dev/module-dcp_compute.html

  // var multi_array = ["teaw"]
  // var curr_array = []
  // var splits = 4

  // console.log(jsonObj.length)

  // for (var i = 0; i < jsonObj.length; i++) {
  //   if (i % ceil(jsonObj.length / splits) == 0) {
  //     multi_array.push(curr_array)
  //     curr_array = []
  //   }

  //   curr_array.push(jsonObj[i])
  // }

  // console.log(multi_array)

  var algorithm = require("./algorithm")
  console.log(algorithm.analyzeProject)

  // for (var i = 0; i < Object.values(jsonObj).length; i++) {
  //   console.log(Object.values(jsonObj)[i])
  // }

  // [[1,obj],[2,obj],[3,obj],[4,obj]]
  // [[1,2,3,4], obj]

  var input_arr = []
  for (i = 0; i < Object.keys(jsonObj).length; i++) {
    input_arr.push([Object.keys(jsonObj)[i], jsonObj])
  }

  job = compute.for(input_arr, function (keys, jsonObj) {
    var results = [];
    console.log(keys)

    algorithm.analyzeProject(key, jsonObj)
    // for (var k = 0, length = keys.length; k < length; k++) {
      //   console.log(jsonObj[keys[k]]);
      //   console.log(jsonObj[keys[k]]["contributors"].length);
      //   results.push({ name: keys[k], count: jsonObj[keys[k]]["contributors"].length });
      // }
      
    progress();
    return keys.length
    return results;
  });

  // job = compute.for(["red", "green", "yellow", "blue", "brown", "orange", "pink"],
  // function(colour) {
  //   console.log(colour)
  //   progress()
  //   return colour
  // })

  // Probably don't need to change this
  job.on("accepted", function (ev) {
    console.log(` - Job accepted by scheduler, waiting for results`);
    console.log(` - Job has id ${this.id}`);
    startTime = Date.now();
  });

  // Probably don't need to change this
  job.on("complete", function (ev) {
    console.log(
      `Job Finished, total runtime = ${
      Math.round((Date.now() - startTime) / 100) / 10
      }s`
    );
  });

  // Probably don't need to change this
  job.on("readystatechange", function (arg) {
    console.log(`new ready state: ${arg}`);
  });

  job.on("result", function (ev) {
    console.log(
      ` - Received result for slice ${ev.sliceNumber} at ${
      Math.round((Date.now() - startTime) / 100) / 10
      }s`
    );
    console.log(` * Wow! ${ev.result} is such a pretty colour!`);
  });

  job.public.name = "events example, nodejs";
  job.public.description = "DCP-Client Example examples/node/events.js";

  // This is the default behaviour - change if you have multiple bank accounts
  // let ks = await wallet.get(); /* usually loads ~/.dcp/default.keystore */
  // job.setPaymentAccountKeystore(ks);

  // results = await job.exec(compute.marketValue)
  results = await job.localExec();
  console.log("Results are: ", results.values());
}

require("dcp-client")
  .init(scheduler)
  .then(main)
  .finally(() => setImmediate(process.exit));
