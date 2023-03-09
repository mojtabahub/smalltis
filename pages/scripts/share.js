import { FetchUrl, phpExtension, authHeader } from "../connection/base";
import React from "react";

export default class Share extends React.Component {
  render() {
    return <></>;
  }
}

export function getTableAllData(tableName, doUserTableDataFunc) {
  console.log(FetchUrl)
  try {
    fetch(FetchUrl + "/share/selectAllTableData" + phpExtension, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify({
        tableName: tableName,
      }),
    })
      .then(function (body) {
        return body.text();
      })
      .then(function (data) {
        let response = "[" + data + "]";
        response = response.replace(/\}\{/g, "},{");

        doUserTableDataFunc(response);
      })
      .catch((error) => console.log("errr:", error));
  } catch (error) {
    alert(error);
  }
}

export function getTablesColumnName(Table, afterGetTableColumnFunc) {
  var tablesCloumnNames = [];
  try {
    fetch(FetchUrl + "/share/selectTableColumnName" + phpExtension, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify({
        tableName: Table,
      }),
    })
      .then(function (body) {
        return body.text();
      })
      .then(function (data) {
        let response = "[" + data + "]";
        response = response.replace(/\}\{/g, "},{");
        response = JSON.parse(response);

        response.forEach((value) => {
          tablesCloumnNames.push(value.COLUMN_NAME);
        });

        afterGetTableColumnFunc(tablesCloumnNames);
      })
      .catch((error) => console.log("errr:", error));
  } catch (error) {
    alert(error);
  }
}

export function addTableAllDataToEval(tablesCloumnName, arrayNameStr) {
  var evalString = arrayNameStr + ".push({";
  for (var i = 0; i < tablesCloumnName.length; i++) {
    evalString += tablesCloumnName[i] + " : value." + tablesCloumnName[i];
    if (i < tablesCloumnName.length - 1) evalString += ",";
  }
  evalString += "})";

  return evalString;
}

export function getDBTableData(table_name, afterGetTableFunc) {
  let tableArray = [];
  getTableAllData(table_name, doUserTableDataFunc);
  function doUserTableDataFunc(response) {
    getTablesColumnName(table_name, afterGetTableColumnFunc);
    function afterGetTableColumnFunc(tablesCloumnNames) {
      if (response != []) {
        response = JSON.parse(response);

        response.forEach((value) => {
          eval(addTableAllDataToEval(tablesCloumnNames, "tableArray"));
        });
      }
      //console.log("length=" + tableArray.length + " <--> Array=" + tableArray)
      afterGetTableFunc(tableArray);
    }
  }
}

export function getDBPartOfTable(url, data, table_name, afterGetPartTableFunc) {
  let tableArray = [];
  data.tableName = table_name;
  getTablesColumnName(table_name, afterGetTableColumnFunc);
  function afterGetTableColumnFunc(tablesCloumnNames) {
    try {
      fetch(FetchUrl + url + phpExtension, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
        body: JSON.stringify(data),
      })
        .then(function (body) {
          return body.text();
        })
        .then(function (response) {
          if (response.charAt(0) != "[") {
            response = "[" + response + "]";
            response = response.replace(/\}\{/g, "},{");
          }

          response = JSON.parse(response);

          response.forEach((value) => {
            eval(addTableAllDataToEval(tablesCloumnNames, "tableArray"));
          });

          afterGetPartTableFunc(tableArray);
          return tableArray;
        })
        .catch((error) => console.log("errr:", error));
    } catch (error) {
      console.log(error);
    }
  }
}

export function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

export function commaToPrice(priceVal, action) {
  if (action == "add") {
    return priceVal.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  } else if (action == "remove") {
    return priceVal.replace(/,/g, "");
  }
}

var persianNumbers = [
  /۰/g,
  /۱/g,
  /۲/g,
  /۳/g,
  /۴/g,
  /۵/g,
  /۶/g,
  /۷/g,
  /۸/g,
  /۹/g,
];
var arabicNumbers = [
  /٠/g,
  /١/g,
  /٢/g,
  /٣/g,
  /٤/g,
  /٥/g,
  /٦/g,
  /٧/g,
  /٨/g,
  /٩/g,
];
export function convertFaToEnNumber(str) {
  if (typeof str === "string") {
    for (var i = 0; i < 10; i++) {
      str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
    }
  }
  return str;
}

export function convertEnToFaNumber(str) {
  const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  return str.toString().replace(/\d/g, (x) => farsiDigits[x]);
}
