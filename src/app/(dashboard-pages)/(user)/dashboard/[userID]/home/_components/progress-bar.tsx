interface ProgressBarProperties {
  current: number;
  total: number;
}

export const ProgressBar = ({ current, total }: ProgressBarProperties) => {
  const percentage = (current / total) * 100;

  return (
    <div className="flex w-full flex-col items-end gap-2 lg:w-[216px]">
      <div className="text-sm">
        <span className="text-mid-grey-III">
          {current} of {total} tasks completed
        </span>
      </div>
      <div className="h-1 w-full overflow-hidden rounded-full bg-low-success">
        <div
          className="h-full bg-mid-success transition-all duration-300 ease-in-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
