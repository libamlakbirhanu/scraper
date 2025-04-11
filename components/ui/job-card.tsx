import { JobData } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BuildingIcon, Clock, MapPinIcon } from "lucide-react";

type Props = {
  jobData: JobData;
  isDarkMode: boolean;
};

const JobCard = ({ jobData, isDarkMode }: Props) => {
  return (
    <Card className={`p-6 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
      <CardHeader>
        <CardTitle
          className={`text-2xl font-bold ${
            isDarkMode ? "text-white" : "text-gray-900"
          } mb-4`}
        >
          {jobData.title}
        </CardTitle>
        <div
          className={`flex flex-col sm:flex-row gap-4 text-gray-600 dark:text-gray-400`}
        >
          <div className="flex items-center gap-2">
            <BuildingIcon
              className={`w-6 h-6 ${
                isDarkMode ? "text-gray-400" : "text-blue-600"
              }`}
            />
            <span className="font-bold text-gray-500">{jobData.company}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPinIcon
              className={`w-6 h-6 ${
                isDarkMode ? "text-gray-400" : "text-blue-600"
              }`}
            />
            <span className="font-bold text-gray-500">{jobData.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock
              className={`w-6 h-6 ${
                isDarkMode ? "text-gray-400" : "text-blue-600"
              }`}
            />
            <span className="font-bold text-gray-500">
              {jobData.employee_type}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="mt-6">
        <div
          className={`prose prose-sm max-w-none dark:prose-invert ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: jobData.job_description,
            }}
          ></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
