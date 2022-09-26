import React, { useState, useMemo } from "react";
import { Button } from "react-bootstrap";
import { sortRows, filterRows, paginateRows } from "./helpers";
import { Pagination } from "./pagination";
import { useHistory } from "react-router-dom";

const columns = [
  { accessor: "name", label: "Name" },
  { accessor: "age", label: "Age" },
  { accessor: "start_date", label: "Start Date" },
];
// custom columns and rows

const rows = [
  {
    id: 1,
    name: "neha",
    age: 36,
    start_date: "02-28-1999",
  },
  {
    id: 2,
    name: "Jackie",
    age: 40,
    start_date: "03-05-1997",
  },
  {
    id: 3,
    name: "misha",
    age: 20,
    start_date: "07-12-2002",
  },
  {
    id: 4,
    name: "Jenny",
    age: 25,
    start_date: "02-28-1999",
  },
  {
    id: 5,
    name: "Kenny",
    age: 29,
    start_date: "01-01-1970",
  },
  {
    id: 6,
    name: "evil",
    age: 40,
    start_date: "04-01-2000",
  },
  {
    id: 7,
    name: "franil",
    age: 30,
    start_date: "06-09-2004",
  },
  { id: 8, name: null, age: null, start_date: null },
];

const Details = () => {
  const history = useHistory();
  const [activePage, setActivePage] = useState(1);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState({ order: "asc", orderBy: "id" });
  const rowsPerPage = 3;
  //  default initial values

  const filteredRows = useMemo(
    () => filterRows(rows, filters),
    [rows, filters]
  );
  const sortedRows = useMemo(
    () => sortRows(filteredRows, sort),
    [filteredRows, sort]
  );
  const calculatedRows = paginateRows(sortedRows, activePage, rowsPerPage);

  const count = filteredRows && filteredRows.length;
  const totalPages = Math.ceil(count / rowsPerPage);

  const handleSearch = (value, accessor) => {
    setActivePage(1);

    if (value) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [accessor]: value,
      }));
    } else {
      setFilters((prevFilters) => {
        const updatedFilters = { ...prevFilters };
        delete updatedFilters[accessor];

        return updatedFilters;
      });
    }
  };

  const handleSort = (accessor) => {
    setActivePage(1);
    setSort((prevSort) => ({
      order:
        prevSort.order === "asc" && prevSort.orderBy === accessor
          ? "desc"
          : "asc",
      orderBy: accessor,
    }));
  };

  const handleClear = () => {
    localStorage.removeItem("user_login");
    history.push("/login");
  };
  return (
    <>
      <Button
        className="text-decoration-none text-light mx-2 btn-right mt-3"
        onClick={() => handleClear()}
      >
        Log out
      </Button>
      <div className="wrapper m-auto">
        <h3 className="text-center mt-5">Custom Table</h3>

        {/* table view */}
        <table>
          <thead>
            <tr>
              {columns &&
                columns.map((column) => {
                  const sortIcon = () => {
                    if (column.accessor === sort.orderBy) {
                      if (sort.order === "asc") {
                        return "asc";
                      }
                      return "dec";
                    } else {
                      return "default";
                    }
                  };
                  return (
                    <th key={column.accessor}>
                      <span>{column.label}</span>
                      <Button
                        onClick={() => handleSort(column.accessor)}
                        variant="secondary"
                      >
                        {sortIcon()}
                      </Button>
                    </th>
                  );
                })}
            </tr>
            <tr>
              {columns &&
                columns.map((column) => {
                  return (
                    <th>
                      <input
                        key={`${column.accessor}-search`}
                        type="search"
                        className="rounded"
                        placeholder={`Search ${column.label}`}
                        value={filters[column.accessor]}
                        onChange={(event) =>
                          handleSearch(event.target.value, column.accessor)
                        }
                      />
                    </th>
                  );
                })}
            </tr>
          </thead>
          <tbody>
            {calculatedRows &&
              calculatedRows.map((row) => {
                return (
                  <tr key={row.id}>
                    {columns.map((column) => {
                      if (column.format) {
                        return (
                          <td key={column.accessor}>
                            {column.format(row[column.accessor])}
                          </td>
                        );
                      }
                      return (
                        <td key={column.accessor}>{row[column.accessor]}</td>
                      );
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>

        {count > 0 ? (
          <Pagination
            activePage={activePage}
            count={count}
            rowsPerPage={rowsPerPage}
            totalPages={totalPages}
            setActivePage={setActivePage}
          />
        ) : (
          <p>No data found</p>
        )}
      </div>
    </>
  );
};

export default Details;
