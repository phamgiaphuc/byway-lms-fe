import type { Request } from "@/types/request";

type MyRequestPageProps = {
  requests: Request[];
};

const statusStyles: Record<Request["status"], string> = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

const typeLabels: Record<Request["type"], string> = {
  teaching: "Teaching Request",
  category: "Category Request",
  support: "Support Request",
};

const MyRequestPage = ({ requests }: MyRequestPageProps) => {
  return (
    <div className="w-full space-y-4">
      <h1 className="text-xl font-semibold">My Requests ({requests.length})</h1>
      {requests.length === 0 && (
        <div className="text-muted-foreground rounded-lg border border-dashed p-6 text-center text-sm">
          You haven’t created any requests yet.
        </div>
      )}
      <div className="grid grid-cols-2 gap-4">
        {requests.map((request) => (
          <div key={request.id} className="rounded-lg border bg-white p-4 shadow-xs transition">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <h2 className="leading-tight font-medium">{request.title}</h2>

                <p className="text-muted-foreground line-clamp-2 text-sm">{request.content}</p>

                <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-xs">
                  <span>{typeLabels[request.type]}</span>
                  <span>•</span>
                  <span>{new Date(request.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[request.status]}`}
              >
                {request.status}
              </span>
            </div>
            {request.response && (
              <div className="mt-3 rounded-md bg-gray-50 p-3 text-sm">
                <p className="font-medium text-gray-700">Response</p>
                <p className="text-muted-foreground line-clamp-2">{request.response}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRequestPage;
