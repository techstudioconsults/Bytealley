/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Badge } from "~/components/ui/badge";
import { cn, formatDate, formatTime } from "~/utils/utils";
import { CopyAction } from "../copy-action";

interface TableHeaderInfoProperties {
  headers: string[];
  product: any;
}

const renderCellContent = (header: string, product: any) => {
  switch (header.toLowerCase()) {
    case "publish date": {
      return formatDate(product.updated_at);
    }
    case "price": {
      return <span>₦{product.price?.toLocaleString()}</span>;
    }
    case "product link": {
      return (
        <span className={`flex items-center space-x-2`}>
          <a href={product.link} target="_blank" rel="noopener noreferrer">
            {product.link}
          </a>
          <CopyAction textToCopy={product.link} />
        </span>
      );
    }
    case "status": {
      return (
        <Badge
          className={cn(
            product.status === "draft" ? "bg-low-warning text-high-warning" : "bg-low-success text-mid-success",
            "rounded-sm px-4 py-2",
          )}
        >
          {product.status}
        </Badge>
      );
    }
    case "joined": {
      return formatDate(product.joined);
    }
    case "email address": {
      return product.email;
    }
    case "withdrawal amount": {
      return <span className={`text-xl font-semibold`}>{`₦${product.amount?.toLocaleString()}`}</span>;
    }
    case "time": {
      return formatTime(product.created_at);
    }
    case "paid on": {
      return formatDate(product.created_at);
    }
    case "account name": {
      return product.account.name;
    }
    case "reference": {
      return product.id;
    }
    case "bank name": {
      return product.bank_name;
    }
    case "bank account": {
      return product.account.number;
    }
    default: {
      return null;
    }
  }
};

export const TableHeaderInfo: React.FC<TableHeaderInfoProperties> = ({ headers, product }) => {
  return (
    <div className="overflow-x-auto">
      {/* Desktop View */}
      <table className="hidden min-w-full md:table">
        <thead>
          <tr className="border-t">
            {headers.map((header, index) => (
              <th key={index} className="pb-3 pt-6 text-left font-semibold text-mid-grey-III">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            {headers.map((header, index) => (
              <td key={index} className="pb-6 pt-3 text-mid-grey-III">
                {renderCellContent(header, product)}
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      {/* Mobile View */}
      <section className="md:hidden">
        <section className="space-y-4 border-b py-4">
          {headers.map((header, index) => (
            <div key={index} className="space-y-2">
              <p className="font-semibold">{header}:</p>
              <div>{renderCellContent(header, product)}</div>
            </div>
          ))}
        </section>
      </section>
    </div>
  );
};
