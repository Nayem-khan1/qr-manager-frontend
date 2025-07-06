import { Link } from "react-router";
import { Box } from "lucide-react";
import Button from "../ui/button/Button";

const ComponentCard = ({
  title,
  children,
  className = "",
  desc = "",
  buttonTitle,
  path,
}) => {
  return (
    <div className={`rounded-2xl border border-gray-200 bg-white ${className}`}>
      {/* Card Header */}
      <div className="px-6 py-5 flex justify-between items-center">
        <div className="">
          <h3 className="text-base font-medium text-gray-800 ">{title}</h3>
          {desc && <p className="mt-1 text-sm text-gray-500 ">{desc}</p>}
        </div>
        {buttonTitle && (
          <Link to={path}>
            <Button
              size="sm"
              variant="primary"
              startIcon={<Box className="size-5" />}
            >
              {buttonTitle}
            </Button>
          </Link>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 border-t border-gray-100 sm:p-6">
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default ComponentCard;
