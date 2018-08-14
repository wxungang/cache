/**
 * Created by xiaogang on 2018/5/28.
 *
 */
"use strict";
const request = require('request');

exports.post = function (params) {
  return new Promise((resolve, reject) => {
    request({
      uri: params.url,
      method: "POST",
      body: params.data,
      json: true
    }, function (err, res, resBody) {
      console.log("=============== proxy ==========");
      console.log(err);
      console.log("=============== proxy _resBody ==========");
      // console.log(resBody);
      console.log("=============== proxy _res ==========");
      //console.log(res);

      if (err) {
        reject(resBody);
      } else {
        resolve(resBody);
      }
    });
  })

}

exports.get = function (params) {
  return new Promise((resolve, reject) => {
    request({
      uri: params.url,
      qs: params.data,//query string object
      method: "get",
      // body: params.data,//not for get
      json: true
    }, function (err, res, resBody) {
      console.log("=============== proxy ==========");
      console.log(err);
      console.log("=============== proxy _resBody ==========");
      // console.log(resBody);
      console.log("=============== proxy _res ==========");
      //console.log(res);

      if (err) {
        reject(resBody);
      } else {
        resolve(resBody);
      }
    });
  })

}
