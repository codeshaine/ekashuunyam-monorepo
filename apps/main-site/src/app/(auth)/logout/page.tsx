import { signOut } from "@/server/auth";
import { LogOut } from "lucide-react";

export default function SignOutPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-50 via-fuchsia-50 to-rose-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-6 rounded-3xl border border-violet-100 bg-white/80 p-8 text-center shadow-xl backdrop-blur-xl transition-all duration-300 hover:bg-white/90 hover:shadow-2xl">
          <div className="mb-2 inline-flex h-20 w-20 animate-pulse items-center justify-center rounded-full bg-gradient-to-br from-violet-100 to-fuchsia-100">
            <LogOut className="h-10 w-10 text-violet-600 transition-transform duration-300 hover:scale-110" />
          </div>

          <div className="space-y-3">
            <h5 className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-3xl font-bold text-transparent">
              Ready to sign out?
            </h5>
            <p className="text-gray-600">
              Thank you for using our service. You can always sign back in
              anytime!
            </p>
          </div>

          <form
            className="pt-2"
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button
              type="submit"
              className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-4 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all duration-300 hover:scale-[1.02] hover:from-violet-500 hover:to-fuchsia-500 hover:shadow-violet-500/30 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
            >
              <span className="flex items-center justify-center gap-2">
                <LogOut className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                Sign out
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
