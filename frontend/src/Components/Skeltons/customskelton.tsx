type sizetype = "large" | "small";
export const CustomSkelton = ({ size = "large" }: { size: sizetype }) => {
  return (
    <div
      className={` 
      
        
       lg:w-[300px] w-10/12 bg-gray-300 mt-5 rounded-lg h-fit 
        `}
    >
      Loading
    </div>
  );
};
