import { format } from "date-fns";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { DateRange } from "react-day-picker";

import { ProductService } from "~/services/product.service";

export const AllDownloads = ({ service }: { service: ProductService }) => {
  const [isDownloadPending, startDownloadTransition] = useTransition();
  const [downloads, setDownloads] = useState<IDownload[]>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const debounceDateRangeReference = useRef(
    debounce((value: DateRange) => {
      setDateRange(value);
    }, 300),
  );

  const handleDateRangeChange = useCallback((value: DateRange) => {
    debounceDateRangeReference.current(value);
  }, []);

  useEffect(() => {
    const parameters: IFilters = {
      ...(dateRange?.from && { start_date: format(dateRange.from, "yyyy-MM-dd") }),
      ...(dateRange?.to && { end_date: format(dateRange.to, "yyyy-MM-dd") }),
    };

    startDownloadTransition(async () => {
      const productsData = await service.getPurchasedProducts(parameters);
      //   setDownloads(productsData?.data || []);
    });
  }, [dateRange?.from, dateRange?.to, service]);

  return <div>index</div>;
};
