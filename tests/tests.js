$(document).ready(function() {
  var url;
  module("Basic Unit Test");
  test("Sample test", function() {
    expect(1);
    return equals(4 / 2, 2);
  });
  module("Google Spreadsheet");
  url = "https://spreadsheets.google.com/pub?key=0Ago31JQPZxZrdHF2bWNjcTJFLXJ6UUM5SldEakdEaXc&hl=en&output=html";
  QUnit.testStart = function(name) {
    return console.log(name);
  };
  test("Load from URL", function() {
    var expectedJsonUrl, expectedKey, googleUrl;
    expect(2);
    expectedKey = "0Ago31JQPZxZrdHF2bWNjcTJFLXJ6UUM5SldEakdEaXc";
    expectedJsonUrl = "http://spreadsheets.google.com/feeds/cells/" + expectedKey + "/od6/public/basic?alt=json-in-script";
    googleUrl = new GoogleUrl(url);
    equals(googleUrl.key, expectedKey);
    return equals(googleUrl.jsonUrl, expectedJsonUrl);
  });
  test("Save and find", function() {
    var googleSpreadsheet, result;
    googleSpreadsheet = new GoogleSpreadsheet();
    googleSpreadsheet.url(url);
    googleSpreadsheet.type = "test";
    googleSpreadsheet.save();
    result = GoogleSpreadsheet.find({
      url: url
    });
    return equals(JSON.stringify(result), JSON.stringify(googleSpreadsheet));
  });
  test("Load and parse", function() {
    var googleSpreadsheet;
    expect(1);
    localStorage.clear();
    googleSpreadsheet = new GoogleSpreadsheet();
    googleSpreadsheet.url(url);
    googleSpreadsheet.type = "test";
    googleSpreadsheet.save();
    stop();
    return googleSpreadsheet.load(function(result) {
      equals(result.data.length, 10);
      return start();
    });
  });
  return test("Load and parse long and complex text cell", function() {
    var googleSpreadsheet;
    expect(1);
    localStorage.clear();
    googleSpreadsheet = new GoogleSpreadsheet();
    googleSpreadsheet.url("https://spreadsheets.google.com/pub?key=0Ago31JQPZxZrdGJSZTY2MHU4VlJ3RnNtdnNDVjRjLVE&hl=en&output=html");
    googleSpreadsheet.type = "test";
    googleSpreadsheet.save();
    stop();
    return googleSpreadsheet.load(function(result) {
      console.log(result);
      equals(result.data[0].match(/correctement/).length, 1);
      return start();
    });
  });
});