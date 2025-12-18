import { AdminLayout } from "@/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Check, X, Star, Trash2 } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import type { Review } from "@shared/schema";

export default function AdminReviews() {
  const { toast } = useToast();

  const { data: reviews, isLoading } = useQuery<Review[]>({
    queryKey: ["/api/reviews"],
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<Review> }) => {
      return apiRequest("PATCH", `/api/reviews/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/reviews"] });
      toast({ title: "Review updated successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/reviews/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/reviews"] });
      toast({ title: "Review deleted successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const handleApprove = (id: number) => {
    updateMutation.mutate({ id, data: { approved: "approved" } });
  };

  const handleReject = (id: number) => {
    updateMutation.mutate({ id, data: { approved: "rejected" } });
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Spinner />
        </div>
      </AdminLayout>
    );
  }

  const pendingReviews = reviews?.filter((r) => r.approved === "pending") || [];
  const approvedReviews = reviews?.filter((r) => r.approved === "approved") || [];
  const rejectedReviews = reviews?.filter((r) => r.approved === "rejected") || [];

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}`}
          />
        ))}
      </div>
    );
  };

  const ReviewCard = ({ review }: { review: Review }) => (
    <Card key={review.id} data-testid={`card-review-${review.id}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="font-semibold">{review.clientName}</span>
              {renderStars(review.rating)}
              <Badge
                variant={
                  review.approved === "approved"
                    ? "default"
                    : review.approved === "rejected"
                    ? "destructive"
                    : "secondary"
                }
              >
                {review.approved}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-1">{review.business}</p>
            <p className="text-sm">{review.text}</p>
            <p className="text-xs text-muted-foreground mt-2">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex gap-2">
            {review.approved === "pending" && (
              <>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-green-600"
                  onClick={() => handleApprove(review.id)}
                  data-testid={`button-approve-${review.id}`}
                >
                  <Check className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-destructive"
                  onClick={() => handleReject(review.id)}
                  data-testid={`button-reject-${review.id}`}
                >
                  <X className="h-4 w-4" />
                </Button>
              </>
            )}
            <Button
              size="icon"
              variant="ghost"
              onClick={() => deleteMutation.mutate(review.id)}
              data-testid={`button-delete-${review.id}`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Client Reviews</h1>
        <p className="text-muted-foreground">Manage and moderate customer reviews</p>
      </div>

      {pendingReviews.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            Pending Approval
            <Badge variant="secondary">{pendingReviews.length}</Badge>
          </h2>
          <div className="grid gap-4">
            {pendingReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      )}

      {approvedReviews.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            Approved Reviews
            <Badge>{approvedReviews.length}</Badge>
          </h2>
          <div className="grid gap-4">
            {approvedReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      )}

      {rejectedReviews.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            Rejected Reviews
            <Badge variant="destructive">{rejectedReviews.length}</Badge>
          </h2>
          <div className="grid gap-4">
            {rejectedReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      )}

      {reviews?.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No reviews yet. Reviews submitted from your website will appear here for moderation.
          </CardContent>
        </Card>
      )}
    </AdminLayout>
  );
}
