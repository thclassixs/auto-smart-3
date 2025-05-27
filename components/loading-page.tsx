import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function LoadingPage() {
  return (
    <div className="p-4 md:p-8">
      {/* Header skeleton */}
      <div className="mb-8">
        <Skeleton className="h-8 w-64 mb-2" />
        <Skeleton className="h-4 w-96" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
        {/* Main content skeleton */}
        <div className="lg:col-span-2 space-y-6 md:space-y-8">
          {/* Progress card skeleton */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-12" />
                </div>
                <Skeleton className="h-3 w-full" />
                <div className="grid grid-cols-3 gap-4 pt-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="text-center space-y-2">
                      <Skeleton className="h-8 w-12 mx-auto" />
                      <Skeleton className="h-3 w-20 mx-auto" />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lessons card skeleton */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-48" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-48" />
                      <Skeleton className="h-3 w-64" />
                      <div className="flex items-center space-x-4">
                        <Skeleton className="h-2 flex-1" />
                        <Skeleton className="h-3 w-8" />
                      </div>
                    </div>
                    <Skeleton className="h-4 w-16" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick actions skeleton */}
          <div className="grid md:grid-cols-2 gap-4">
            {[...Array(2)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6 text-center space-y-4">
                  <Skeleton className="h-12 w-12 rounded-full mx-auto" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-32 mx-auto" />
                    <Skeleton className="h-4 w-48 mx-auto" />
                  </div>
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar skeleton */}
        <div className="space-y-6">
          {/* Calendar skeleton */}
          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-64 w-full" />
            </CardContent>
          </Card>

          {/* Sessions skeleton */}
          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-32" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="p-3 border rounded-lg space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-32" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Messages skeleton */}
          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-20" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="p-3 border rounded-lg space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                ))}
              </div>
              <Skeleton className="h-10 w-full mt-4" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
