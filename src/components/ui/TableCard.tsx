// src/components/TableCard.tsx

import React, { type JSX } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./Card";

interface TableCardProps {
  title: string;
  viewAllLink?: string;
  addNewLink?: string;
  headers: string[];
  data: { cells: (string | JSX.Element)[] }[];
  emptyMessage?: string;
  icon?: JSX.Element;
}

const TableCard: React.FC<TableCardProps> = ({
  title,
  viewAllLink,
  addNewLink,
  headers,
  data,
  emptyMessage = "No data available",
  icon,
}) => {
  return (
    <Card className="w-full mb-4">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="flex items-center gap-2">
          {icon} {title}
        </CardTitle>
        <div>
          {addNewLink && (
            <a href={addNewLink} className="btn btn-sm btn-success me-2">
              Add New
            </a>
          )}
          {viewAllLink && (
            <a href={viewAllLink} className="btn btn-sm btn-primary">
              View All
            </a>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <table className="table table-hover w-full">
          <thead>
            <tr>
              {headers.map((header, i) => (
                <th key={i} className="text-left">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row, i) => (
                <tr key={i}>
                  {row.cells.map((cell, j) => (
                    <td key={j}>{cell}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={headers.length} className="text-center">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};

export default TableCard;
