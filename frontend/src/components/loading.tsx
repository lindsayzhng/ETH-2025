import { Jelly } from "ldrs/react";
import "ldrs/react/Jelly.css";

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <Jelly size="60" speed="0.9" color="#A3FFC8" />
    </div>
  );
};
export default Loading;
