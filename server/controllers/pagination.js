// const url = require('url');
// const _ require('underscore');

// function queryStringify(data) {
//   var tuples = [];
//   _.each(data, function(value, key) {
//     if (_.isArray(value)) {
//       _.each(value, function(item) {
//         tuples.push(key + '=' + item);
//       });
//     } else if (_.isObject(value)) {
//       _.each(value, function(item, name) {
//         tuples.push(key + '[' + name + ']=' + item);
//       });
//     } else {
//       tuples.push(key + '=' + value);
//     }
//   });
//   return tuples.join('&');
// }

// function normalize(param, value) {
//   if (param) {
//     try {
//       var num = parseInt(param, 10);
//       if (num < value) {
//         return value;
//       }
//       return num;
//     } catch(e) {
//       return value;
//     }
//   } else {
//     return value;
//   }
// }

// function getVideosPagination(req) {
//   var pagination = {};
//   var urlObj = url.parse(req.originalUrl, true);
//   var currentPage = parseInt(urlObj.query.page, 10);
//   if (_.isNaN(currentPage)) {
//     currentPage = 0;
//   }
//   var nextPage = normalize(currentPage + 1, 0);
//   var prevPage = normalize(currentPage - 1, 0);

//   urlObj.search = null;
//   urlObj.query.page = nextPage;
//   pagination.next = url.format(urlObj);

//   urlObj.search = null;
//   urlObj.query.page = prevPage;
//   pagination.prev = url.format(urlObj);

//   return pagination;
// }