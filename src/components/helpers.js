/* eslint-disable eqeqeq */

// common functions
export function isEmpty(obj = {}) {
  return Object.keys(obj).length === 0;
}

export function isString(value) {
  return typeof value === "string";
}

export function isNumber(value) {
  return typeof value == "number" && !isNaN(value);
}

export function isNull(value) {
  return typeof value === "undefined" || value === null;
}

export function convertType(value) {
  if (isNumber(value)) {
    return value.toString();
  }

  return value;
}

export function filterRows(rows, filters) {
  console.log("rows,filters", rows, filters);
  if (isEmpty(filters)) return rows;

  return rows.filter((row) => {
    return Object.keys(filters).every((accessor) => {
      let value = row[accessor];
      value = value && value.toLowerCase().toString();
      console.log("value", value, accessor);
      let searchValue = filters[accessor];
      searchValue = searchValue.toLowerCase();
      console.log("searchValue", searchValue);
      return value && value.includes(searchValue);
    });
  });
}

export function sortRows(rows, sorted) {
  if (isEmpty(sorted)) return rows;

  return rows.sort((a, b) => {
    const { order, orderBy } = sorted;

    if (isNull(a[orderBy])) return 1;
    if (isNull(b[orderBy])) return -1;

    const aLocale = convertType(a[orderBy]);
    const bLocale = convertType(b[orderBy]);

    if (order === "asc") {
      return aLocale.localeCompare(bLocale, "en", {
        numeric: isNumber(b[orderBy]),
      });
    } else {
      return bLocale.localeCompare(aLocale, "en", {
        numeric: isNumber(a[orderBy]),
      });
    }
  });
}

export function paginateRows(sortedRows, activePage, rowsPerPage) {
  return [...sortedRows].slice(
    (activePage - 1) * rowsPerPage,
    activePage * rowsPerPage
  );
}
