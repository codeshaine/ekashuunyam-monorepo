import { Card, CardContent, CardHeader } from "@/components/ui/card";
export default function ProfileSkeleton() {
  return (
    <Card className="animate-pulse overflow-hidden border-none bg-white/80 shadow-xl md:col-span-2">
      <CardHeader className="border-b border-blue-100 bg-gradient-to-br from-blue-500/5 to-blue-600/5">
        <div className="flex items-center space-x-4">
          <div className="h-24 w-24 rounded-full bg-gray-300" />
          <div>
            <div className="mb-2 h-6 w-32 rounded-md bg-gray-300" />
            <div className="h-4 w-20 rounded-md bg-gray-300" />
            <div className="mt-2 h-8 w-24 rounded-md bg-gray-300" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="mt-6 space-y-4">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="h-12 w-full rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 shadow-md"
          >
            <div className="flex items-center space-x-3 p-4">
              <div className="h-5 w-5 rounded-md bg-gray-300" />
              <div className="h-4 w-40 rounded-md bg-gray-300" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
