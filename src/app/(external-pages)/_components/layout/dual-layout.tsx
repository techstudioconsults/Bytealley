import { Wrapper } from "~/components/layout/wrapper";
import { cn } from "~/utils/utils";

export const DualLayout: React.FC<DualLayoutProperties> = ({
  bgClassName = "h-[30rem] lg:h-[40rem]",
  leftChild,
  leftChildBgColor,
  rightChild,
  rightChildBgColor,
  rightChildClassName,
  leftChildClassName,
  className,
}) => {
  return (
    <section className={cn(`item-center relative flex justify-between`, bgClassName)}>
      <div className={cn(`h-full flex-1`, leftChildBgColor)} />
      <Wrapper className={cn(`absolute inset-0 flex items-stretch justify-between gap-16`, className)}>
        <div className={cn(`flex-1`, leftChildClassName)}>{leftChild}</div>
        <div className={cn(`hidden flex-1 lg:flex`, rightChildClassName)}>{rightChild}</div>
      </Wrapper>
      <div className={cn(`hidden h-full flex-1 lg:flex`, rightChildBgColor)} />
    </section>
  );
};
