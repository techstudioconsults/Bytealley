/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useTransition } from "react";

import { EmptyState } from "~/app/(dashboard-pages)/_components/empty-state";
import Loading from "~/app/Loading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion";

export const FaqAccordion = ({ service }: { service: any }) => {
  const [isPending, startTransition] = useTransition();
  const [FAQ, setFAQ] = useState<IFAQ[]>([]);

  useEffect(() => {
    const fetchProductData = async () => {
      startTransition(async () => {
        const response = await service.getFAQ();
        if (response) {
          setFAQ(response.data);
        }
      });
    };

    fetchProductData();
  }, [service]);

  if (isPending) {
    return <Loading text={`Loading FAQ...`} className={`w-fill h-fit p-20`} />;
  }

  if (!FAQ || FAQ.length === 0) {
    return <EmptyState title="FAQ Not Found" description="Something went wrong." images={[]} className="h-full" />;
  }

  return (
    <Accordion type="single" collapsible className="w-full max-w-3xl">
      {FAQ.map((item) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger className="text-left text-xs lg:text-lg">{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
