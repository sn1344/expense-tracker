import supabase from "../config/supabaseClient";
import React, { useState, useEffect } from "react";
import { useTable } from "react-table";

const SupabaseTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: allData, error } = await supabase.from("shopping").select("*");

      if (error) {
        console.log(error);
      } else {
        setData(allData);
      }
    };

    fetchData();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Category",
        accessor: "category",
      },
      {
        Header: "Amount",
        accessor: "amount",
      },
    ],
    []
  );

  const tableData = React.useMemo(() => data, [data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: tableData });

  const sumGroceries = rows
    .filter((row) => row.values.category === "groceries")
    .reduce((total, row) => total + parseFloat(row.values.amount), 0)
    .toFixed(2);

  const sumRent = rows
    .filter((row) => row.values.category === "rent")
    .reduce((total, row) => total + parseFloat(row.values.amount), 0)
    .toFixed(2);

  const sumElectronic = rows
    .filter((row) => row.values.category === "electronic")
    .reduce((total, row) => total + parseFloat(row.values.amount), 0)
    .toFixed(2);

  return (
    <>
      <table
        {...getTableProps()}
        className="mx-auto mt-10 border-collapse border rounded-lg overflow-hidden"
      >
        <thead className="bg-black">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          {...getTableBodyProps()}
          className="bg-white divide-y divide-gray-200"
        >
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="px-6 py-4 whitespace-nowrap"
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody> 
      </table>
      <div className="flex justify-center mt-4">
        <p className="mx-4">Total amount of groceries: {sumGroceries}</p>
        <p className="mx-4">Total amount of rent: {sumRent}</p>
        <p className="mx-4">Total amount of electronic: {sumElectronic}</p>
      </div>
    </>
  );
};

export default SupabaseTable;
