// components/StatsGrid.tsx

const StatsGrid = () => {
  const stats = [
    { value: "30k+", label: "Digital Creators" },
    { value: "100k+", label: "Digital Creators" },
    { value: "45k+", label: "Digital Creators" },
  ];

  return (
    <div className="flex flex-col items-center justify-between gap-10 md:flex-row">
      {stats.map((stat, index) => (
        <section key={index} className="flex w-fit flex-col items-center justify-center">
          <div>
            <h2 className="font-nr text-5xl font-black">{stat.value}</h2>
          </div>
          <div>
            <p className="text-center text-lg">{stat.label}</p>
          </div>
        </section>
      ))}
    </div>
  );
};

export default StatsGrid;
