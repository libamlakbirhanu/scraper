import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const Loader = ({ isDarkMode }: { isDarkMode: boolean }) => {
  return (
    <Card
      className={`p-6 animate-pulse ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
    >
      <CardHeader>
        <Skeleton className="h-8 w-3/4 mb-4" />
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-32 w-full" />
      </CardContent>
    </Card>
  );
};

export default Loader;
