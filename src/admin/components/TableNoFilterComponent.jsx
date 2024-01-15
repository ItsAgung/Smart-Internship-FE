import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { Select, TextInput } from "flowbite-react";
import { FaArrowDown, FaArrowUp, FaSearch } from "react-icons/fa";

const TableNoFilterComponent = ({ data, columns }) => {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <div>
      <div className="mb-5 flex gap-5 justify-between">
        <div className="flex items-center gap-2">
          <span>Show</span>
          <Select
            value={table.getState().pagination.pageSize}
            className=""
            id="entries"
            name="entries"
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </Select>
          <span>Entries</span>
        </div>
        <TextInput
          className="w-1/3 ml-auto"
          icon={FaSearch}
          type="text"
          value={filtering}
          placeholder="Search"
          onChange={(e) => setFiltering(e.target.value)}
        />
      </div>
      <div className="overflow-auto pb-25 rounded-md">
        <table className="table rounded-xl" style={{ width: "100%" }}>
          <thead className="bg-[#4F6079] text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                <th className="w-[7%] text-center">No</th>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    style={{
                      width:
                        header.getSize() !== 150 ? header.getSize() : undefined,
                    }}
                  >
                    {header.isPlaceholder ? null : (
                      <div className="cursor-pointer flex gap-1 items-center justify-center ">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {
                          { asc: <FaArrowUp />, desc: <FaArrowDown /> }[
                            header.column.getIsSorted() ?? null
                          ]
                        }
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="text-black dark:text-white ">
            {table.getRowModel().rows.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="py-3.5 border-t border-slate-300 text-center text-sm text-slate-500"
                >
                  Data belum ada.
                </td>
              </tr>
            )}
            {table.getRowModel().rows.map((row, i) => (
              <tr key={row.id}>
                <td className="text-center">{i + 1}</td>
                {row.getVisibleCells().map((cell) => (
                  <td className="text-center" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex w-full items-end justify-end mt-5">
        <div className="join grid grid-cols-3 w-full md:w-1/3">
          <button
            className="join-item btn btn-outline btn-sm capitalize text-xs hover:bg-[#4F6079] text-black dark:text-white"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            Sebelumnya
          </button>
          <button className="join-item btn-sm bg-[#4F6079] capitalize text-xs text-white dark:text-white">
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </button>
          <button
            className="join-item btn btn-outline btn-sm capitalize text-xs hover:bg-[#4F6079] text-black dark:text-white"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
          >
            Selanjutnya
          </button>
        </div>
      </div>
    </div>
  );
};
export default TableNoFilterComponent;
