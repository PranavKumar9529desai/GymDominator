export const ProgressBar = ({ width }: { width: number }) => {
  return (
    <div>
      <div className="w-full bg-gray-200 rounded-full ">
        <div
          className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
          style={{ width: `${width}%` }}
        >
          {" "}
          10%
        </div>
      </div>
    </div>
  );
};
