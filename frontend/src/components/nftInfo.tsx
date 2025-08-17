import React from "react";
// -------------------- Helpers --------------------

interface NftInfoProps {
  imageUrl: string;
  name: string;
}

const NftInfo: React.FC<NftInfoProps> = ({ imageUrl, name }) => {
  return (
    <div className="max-w-md bg-grey-600 rounded-2xl overflow-hidden">
      {/* Image */}
      <div className="relative h-full w-full">
        <div className="relative rounded-2xl bg-gradient-to-b from-transparent to-black/50 inset-0 z-10">
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-cover"
          />
          <div className="absolute bottom-3 left-3 max-w-[80%] truncate bg-black/60 text-white px-3 py-1 rounded-full text-sm">
            {name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftInfo;
