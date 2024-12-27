
interface AboutApplyProps {
    selectedPositions: string[];
    position: any;
  }
  
  export default function AboutApply({ selectedPositions, position }: AboutApplyProps) {
    return (
      <section className="bg-neutral-900 text-white py-5 h-[328px]">
        <div className="max-w-[1400px] mx-auto ">
          <p className="text-lg text-[#A1A1A1]/40 mb-20">Jobs / Job Details</p>
          <h2 className="text-[34px] mt-4 text-[#F7F7F7]/25 leading-[1]">
            {position.subtitle}
          </h2>
          <h1 className="text-[56px] font-bold mt-2 leading-[1] text-[#F7F7F7] w-[950px]">
            {position.title}
          </h1>
          <div className="relative">
            <div className="fixed top-30 right-[20%] z-50 bg-[#F7F7F7] shadow-lg rounded-[20px] w-[341px] h-[178px] p-5 flex flex-col justify-between text-[#1E1E1E]">              
              <div className="flex justify-between gap-5 leading-[1]">
                <div className="flex flex-col space-y-[32px]">
                  <div className="text-[15px] space-y-5">
                    <p className="text-[#949494]">Location</p>
                    <p className="font-medium">{position.location}</p>
                  </div>
                  <div className="text-[15px] space-y-5">
                    <p className="text-[#949494]">Work Type</p>
                    <p className="font-medium">{position.workType}</p>
                  </div>
                </div>
                <div className="flex flex-col space-y-[32px]">
                  <div className="text-[15px] space-y-5">
                    <p className="text-[#949494]">Team</p>
                    <p className="font-medium">{position.team}</p>
                  </div>
                  <div className="text-[15px] space-y-5">
                    <p className="text-[#949494]">Position</p>
                    <p className="font-medium">
                      {selectedPositions.join(", ") || "None Selected"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  