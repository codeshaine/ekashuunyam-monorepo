import { redirect } from "next/navigation";
import { signIn } from "@/server/auth";
import { AuthError } from "next-auth";
import { Mail } from "lucide-react";
import Link from "next/link";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const errorMessage =
    (await searchParams)?.error === "OAuthAccountNotLinked"
      ? "An account with this email already exists. Please sign in using the original method."
      : null;

  return (
    <div className="relative min-h-screen overflow-hidden bg-sky-50">
      {/* Wave Background */}
      <div className="absolute inset-0">
        <svg
          className="h-full w-full"
          viewBox="0 0 1920 1080"
          preserveAspectRatio="none"
        >
          <path
            d="M0 737L45.7 735.8C91.3 734.7 182.7 732.3 274.2 715.3C365.7 698.3 457.3 666.7 548.8 652.5C640.3 638.3 731.7 641.7 823 652.5C914.3 663.3 1005.7 681.7 1097 688.3C1188.3 695 1279.7 690 1371.2 692.7C1462.7 695.3 1554.3 705.7 1645.8 703C1737.3 700.3 1828.7 684.7 1874.3 676.8L1920 669L1920 1081L1874.3 1081C1828.7 1081 1737.3 1081 1645.8 1081C1554.3 1081 1462.7 1081 1371.2 1081C1279.7 1081 1188.3 1081 1097 1081C1005.7 1081 914.3 1081 823 1081C731.7 1081 640.3 1081 548.8 1081C457.3 1081 365.7 1081 274.2 1081C182.7 1081 91.3 1081 45.7 1081L0 1081Z"
            fill="#60bff5"
          />
          <path
            d="M0 724L45.7 732C91.3 740 182.7 756 274.2 766.7C365.7 777.3 457.3 782.7 548.8 776.3C640.3 770 731.7 752 823 737.8C914.3 723.7 1005.7 713.3 1097 712.7C1188.3 712 1279.7 721 1371.2 735.8C1462.7 750.7 1554.3 771.3 1645.8 781.2C1737.3 791 1828.7 790 1874.3 789.5L1920 789L1920 1081L1874.3 1081C1828.7 1081 1737.3 1081 1645.8 1081C1554.3 1081 1462.7 1081 1371.2 1081C1279.7 1081 1188.3 1081 1097 1081C1005.7 1081 914.3 1081 823 1081C731.7 1081 640.3 1081 548.8 1081C457.3 1081 365.7 1081 274.2 1081C182.7 1081 91.3 1081 45.7 1081L0 1081Z"
            fill="#50a7e2"
          />
          <path
            d="M0 823L45.7 828.5C91.3 834 182.7 845 274.2 838C365.7 831 457.3 806 548.8 802C640.3 798 731.7 815 823 832C914.3 849 1005.7 866 1097 875.7C1188.3 885.3 1279.7 887.7 1371.2 882.8C1462.7 878 1554.3 866 1645.8 855.3C1737.3 844.7 1828.7 835.3 1874.3 830.7L1920 826L1920 1081L1874.3 1081C1828.7 1081 1737.3 1081 1645.8 1081C1554.3 1081 1462.7 1081 1371.2 1081C1279.7 1081 1188.3 1081 1097 1081C1005.7 1081 914.3 1081 823 1081C731.7 1081 640.3 1081 548.8 1081C457.3 1081 365.7 1081 274.2 1081C182.7 1081 91.3 1081 45.7 1081L0 1081Z"
            fill="#4390ce"
          />
          <path
            d="M0 929L45.7 934.2C91.3 939.3 182.7 949.7 274.2 950C365.7 950.3 457.3 940.7 548.8 937.2C640.3 933.7 731.7 936.3 823 925C914.3 913.7 1005.7 888.3 1097 877.3C1188.3 866.3 1279.7 869.7 1371.2 878.5C1462.7 887.3 1554.3 901.7 1645.8 902C1737.3 902.3 1828.7 888.7 1874.3 881.8L1920 875L1920 1081L1874.3 1081C1828.7 1081 1737.3 1081 1645.8 1081C1554.3 1081 1462.7 1081 1371.2 1081C1279.7 1081 1188.3 1081 1097 1081C1005.7 1081 914.3 1081 823 1081C731.7 1081 640.3 1081 548.8 1081C457.3 1081 365.7 1081 274.2 1081C182.7 1081 91.3 1081 45.7 1081L0 1081Z"
            fill="#3879b9"
          />
          <path
            d="M0 1011L45.7 1008C91.3 1005 182.7 999 274.2 997.7C365.7 996.3 457.3 999.7 548.8 1002C640.3 1004.3 731.7 1005.7 823 999.3C914.3 993 1005.7 979 1097 969.7C1188.3 960.3 1279.7 955.7 1371.2 953.2C1462.7 950.7 1554.3 950.3 1645.8 962.3C1737.3 974.3 1828.7 998.7 1874.3 1010.8L1920 1023L1920 1081L1874.3 1081C1828.7 1081 1737.3 1081 1645.8 1081C1554.3 1081 1462.7 1081 1371.2 1081C1279.7 1081 1188.3 1081 1097 1081C1005.7 1081 914.3 1081 823 1081C731.7 1081 640.3 1081 548.8 1081C457.3 1081 365.7 1081 274.2 1081C182.7 1081 91.3 1081 45.7 1081L0 1081Z"
            fill="#2e63a4"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          {/* One Piece Logo */}
          <div className="space-y-4 text-center">
            <div className="mx-auto mb-6 h-24 w-24">
              <svg viewBox="0 0 100 100" className="h-full w-full">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="#FFD700"
                  stroke="#000"
                  strokeWidth="2"
                />
                <path
                  d="M25 65 C35 65, 45 35, 75 35"
                  stroke="#000"
                  strokeWidth="4"
                  fill="none"
                />
                <circle cx="35" cy="45" r="8" fill="#000" />
                <circle cx="65" cy="45" r="8" fill="#000" />
              </svg>
            </div>
            <h2 className="text-5xl font-bold tracking-tight text-gray-900">
              Set Sail!
            </h2>
            <p className="text-lg text-gray-600">
              Join our crew for the next adventure
            </p>
          </div>

          {errorMessage && (
            <div className="mt-4 rounded-2xl border border-red-100 bg-red-50 p-4 text-center text-sm text-red-700 shadow-sm">
              {errorMessage}
            </div>
          )}

          <div className="space-y-8">
            <form
              className="space-y-6 rounded-3xl border border-blue-100 bg-white/90 p-8 shadow-xl backdrop-blur-xl transition-all duration-300 hover:bg-white hover:shadow-2xl"
              action={async (formData) => {
                "use server";
                try {
                  await signIn("resend", formData);
                } catch (error) {
                  if (error instanceof AuthError) {
                    return redirect(`/auth/error?error=${error.type}`);
                  }
                  throw error;
                }
              }}
            >
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="group relative">
                  <input
                    name="email"
                    id="email"
                    type="email"
                    required
                    className="block w-full rounded-2xl border-2 border-blue-100 bg-white/90 px-4 py-3.5 placeholder-gray-400 transition-all duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 group-hover:border-blue-200"
                    placeholder="name@example.com"
                  />
                  <Mail className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 transition-colors duration-300 group-hover:text-blue-400" />
                </div>
              </div>

              <button
                type="submit"
                className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-blue-400 px-4 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Begin Journey
              </button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white/80 px-6 font-medium text-gray-600 backdrop-blur-sm">
                  Or join with
                </span>
              </div>
            </div>

            <form
              action={async () => {
                "use server";
                try {
                  await signIn("google", { redirectTo: "/" });
                } catch (error) {
                  if (error instanceof AuthError) {
                    return redirect(`/auth/error?error=${error.type}`);
                  }
                  throw error;
                }
              }}
            >
              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-blue-100 bg-white/90 px-4 py-3.5 text-sm font-semibold text-gray-700 shadow-lg backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:border-blue-200 hover:bg-white hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <svg
                  className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </button>
            </form>
          </div>

          <div className="text-center">
            <Link
              href="mailto:shainilps.work@gmail.com"
              className="inline-block rounded-lg bg-white/50 px-4 py-2 text-sm text-gray-600 backdrop-blur-sm transition-colors duration-200 hover:bg-white/70 hover:text-blue-600"
            >
              Need help? Contact your Nakama
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
