import { signOut } from "@/server/auth";
import { LogOut } from "lucide-react";

export default function SignOutPage() {
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
              Farewell!
            </h2>
            <p className="text-lg text-gray-600">
              Until we meet again on the next adventure
            </p>
          </div>

          <form
            className="space-y-6 rounded-3xl border border-blue-100 bg-white/90 p-8 shadow-xl backdrop-blur-xl transition-all duration-300 hover:bg-white hover:shadow-2xl"
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <div className="space-y-3 text-center">
              <h5 className="text-2xl font-semibold text-gray-900">
                Ready to sign out?
              </h5>
              <p className="text-gray-600">
                Thank you for sailing with us. You can always return to the crew
                anytime!
              </p>
            </div>

            <button
              type="submit"
              className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-blue-400 px-4 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
