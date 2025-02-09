export const ProgressBar = ({ width }: { width: number | undefined }) => {
  console.log(width);
  return (
    <div>
      <div className="w-full bg-gray-200 rounded-full h-4   ">
        <div
          className="bg-blue-600 text-[10px]  font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
          style={{
            width: `${width}%`,

            transition: 'width 0.5s ease-out',
          }}
        >
          {' '}
          {width}%
        </div>
      </div>
    </div>
  );
};
