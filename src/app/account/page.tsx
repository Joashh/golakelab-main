import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Account() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          {session.user?.image ? (
            <img
              src={session.user.image}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-800 text-white flex items-center justify-center text-xl font-semibold">
              {session.user?.name?.charAt(0) || "U"}
            </div>
          )}

          <div>
            <h1 className="text-lg font-semibold text-gray-900 leading-tight">
              {session.user?.name || "User"}
            </h1>
            <p className="text-sm text-gray-500">
              {session.user?.email || "No email available"}
            </p>
          </div>
        </div>

        {/* Profile Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">
            Profile Information
          </h2>

          <div className="space-y-4 text-sm">
            <div>
              <p className="text-gray-500">Full Name</p>
              <p className="text-gray-900 font-medium">
                {session.user?.name || "-"}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Email Address</p>
              <p className="text-gray-900 font-medium">
                {session.user?.email || "-"}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end">
          <button className="px-4 py-2 text-sm font-medium bg-gray-900 text-white rounded-md hover:bg-gray-800 transition">
            Edit Profile
          </button>
        </div>

      </div>
    </div>
  );
}