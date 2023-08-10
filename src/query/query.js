export function getQueryParams() {
  // Select hash formattedQuery from URL
  let hashQuery = ''
  const hashString = window.location.hash;
  const hashIndex = hashString.indexOf("#");

  if (hashIndex !== -1) {
    const queryIndex = hashString.indexOf("?", hashIndex);
    hashQuery = queryIndex !== -1 ? hashString.slice(hashIndex + 1, queryIndex) : hashString.slice(hashIndex + 1);
  }

  // Select formattedQuery from URL
  let formattedQuery = {};
  let originalQuery = {};
  let queryString = [];
  // Find every formattedQuery String start with ? and end with # or end of string
  const queryRegex = /\?[^#]+/g;
  const tempQueryString = window.location.href.match(queryRegex);
  if (tempQueryString.length > 0) {
    queryString = tempQueryString.map((formattedQuery) => formattedQuery.slice(1));
  }
  // Parse formattedQuery string to object
  queryString.forEach((query1) => {
    const queryArray = query1.split("&");
    queryArray.forEach((query2) => {
      const queryPair = query2.split("=");
      originalQuery[queryPair[0]] = queryPair[1];
      // Check if formattedQuery value is encoded
      let isEncoded = false;
      try {
        isEncoded = decodeURIComponent(queryPair[1]) !== queryPair[1];
      } catch (error) {
        // decodeURIComponent and it is not encoded 
      }
      // Decode formattedQuery value
      if (isEncoded) {
        queryPair[1] = decodeURIComponent(queryPair[1]);
        // Make a check if queryPair[1] contains '{' (%7B) or '[' (%5B)
        // If it does, it means that it is a JSON and still encoded
        if (queryPair[1].indexOf("%7B") !== -1 || queryPair[1].indexOf("%5B") !== -1) {
          queryPair[1] = decodeURIComponent(queryPair[1]);
        }
        // Check if formattedQuery value is JSON
        if (queryPair[1].indexOf("{") !== -1 || queryPair[1].indexOf("[") !== -1) {
          try {
            queryPair[1] = JSON.parse(queryPair[1]);
          } catch (e) {
            // Do nothing
          }
        }
      } else {
        // For basic types
        // Bring formattedQuery value to correct type
        switch (queryPair[1]) {
          case "true":
            queryPair[1] = true;
            break;
          case "false":
            queryPair[1] = false;
            break;
          case "null":
            queryPair[1] = null;
            break;
          case "undefined":
            queryPair[1] = undefined;
            break;
          case "NaN":
            queryPair[1] = NaN;
            break;
          case "Infinity":
            queryPair[1] = Infinity;
            break;
          case "-Infinity":
            queryPair[1] = -Infinity;
            break;
          default:
          // Do nothing
        }
      }
      formattedQuery[queryPair[0]] = queryPair[1];
    })
  })


  // Return results
  const queryParam = {
    hashQuery,
    formattedQuery,
    originalQuery
  }
  return queryParam;
}