import { Spinner } from "@material-tailwind/react";

export default function Loading({ size = 12 }) {
  return (
    <div className="flex items-center justify-center">
      <Spinner color="blue" className={`h-${size} w-${size}`} />
    </div>
  );
}
