import { Badge } from "~/components/ui/badge";
import { cn, formatDate } from "~/utils/utils";
import { CopyAction } from "../copy-action";

interface TableHeaderInfoProperties {
  headers: string[];
  product: IProduct;
}

const renderCellContent = (header: string, product: IProduct) => {
  switch (header.toLowerCase()) {
    case "publish date": {
      return formatDate(product.updated_at);
    }
    case "price": {
      return product.price?.toLocaleString();
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
            product.status === "draft" ? "bg-mid-warning text-high-warning" : "bg-mid-success text-high-success",
            "rounded-sm px-4 py-2",
          )}
        >
          {product.status}
        </Badge>
      );
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
              <th key={index} className="px-4 py-3 text-left text-sm font-semibold text-mid-grey-III">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            {headers.map((header, index) => (
              <td key={index} className="px-4 py-3 text-mid-grey-III">
                {renderCellContent(header, product)}
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      {/* Mobile View */}
      <section className="md:hidden">
        <section className="space-y-4 border-b p-4">
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
