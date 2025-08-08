import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Admin() {
  const { toast } = useToast();

  const { data: requests, isLoading } = useQuery({
    queryKey: ["/api/admin/personalized-requests"],
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      return apiRequest("PATCH", `/api/admin/personalized-request/${id}/status`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/personalized-requests"] });
      toast({
        title: "Status Updated",
        description: "Request status has been updated successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update status",
        variant: "destructive",
      });
    },
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "pending": return "secondary";
      case "in_progress": return "default";
      case "completed": return "destructive";
      default: return "secondary";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-fa-slate-50 p-8">
        <div className="container mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-slate-200 rounded w-1/4"></div>
            <div className="space-y-3">
              <div className="h-32 bg-slate-200 rounded"></div>
              <div className="h-32 bg-slate-200 rounded"></div>
              <div className="h-32 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-fa-slate-50 p-8">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-fa-secondary mb-2">Admin Dashboard</h1>
          <p className="text-fa-slate-600">Manage personalized website requests</p>
        </div>

        <div className="space-y-6">
          {(requests as any[])?.map((request: any) => (
            <Card key={request.id} className="border-slate-200">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-fa-secondary">{request.businessName}</CardTitle>
                    <p className="text-fa-slate-600 mt-1">{request.fullName} • {request.email}</p>
                  </div>
                  <Badge variant={getStatusBadgeVariant(request.status)}>
                    {request.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-fa-secondary mb-2">Business Details</h4>
                    <p className="text-sm text-fa-slate-600 mb-2">
                      <strong>Location:</strong> {request.businessLocation}
                    </p>
                    <p className="text-sm text-fa-slate-600 mb-2">
                      <strong>Phone:</strong> {request.phone}
                    </p>
                    <p className="text-sm text-fa-slate-600 mb-2">
                      <strong>Created:</strong> {formatDate(request.createdAt)}
                    </p>
                    <p className="text-sm text-fa-slate-600">
                      <strong>Consultation Paid:</strong> {request.consultationPaid ? 'Yes' : 'No'}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-fa-secondary mb-2">Design Preferences</h4>
                    <p className="text-sm text-fa-slate-600 mb-2">
                      <strong>Style:</strong> {request.stylePreference || 'Not specified'}
                    </p>
                    <p className="text-sm text-fa-slate-600 mb-2">
                      <strong>Color Scheme:</strong> {request.colorScheme || 'Not specified'}
                    </p>
                    {request.features && request.features.length > 0 && (
                      <div>
                        <strong className="text-sm text-fa-slate-600">Features:</strong>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {request.features.map((feature: string, index: number) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {request.businessDescription && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-fa-secondary mb-2">Business Description</h4>
                    <p className="text-sm text-fa-slate-600">{request.businessDescription}</p>
                  </div>
                )}
                
                {request.additionalRequirements && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-fa-secondary mb-2">Additional Requirements</h4>
                    <p className="text-sm text-fa-slate-600">{request.additionalRequirements}</p>
                  </div>
                )}

                <div className="flex gap-2 mt-6">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateStatusMutation.mutate({ id: request.id, status: "in_progress" })}
                    disabled={updateStatusMutation.isPending}
                  >
                    Mark In Progress
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateStatusMutation.mutate({ id: request.id, status: "completed" })}
                    disabled={updateStatusMutation.isPending}
                  >
                    Mark Completed
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {(requests as any[])?.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-inbox text-slate-400 text-2xl"></i>
                </div>
                <h3 className="text-lg font-semibold text-fa-secondary mb-2">No Requests Yet</h3>
                <p className="text-fa-slate-600">Personalized website requests will appear here when submitted.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
