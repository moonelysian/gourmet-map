import { useEffect } from "react";

import { AiOutlineGoogle } from "react-icons/ai";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const { status, data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [router, status]);

  return (
    <div className="flex flex-col justify-center px-6 lg:px-8 h-[60vh]">
      <div className="mx-auto w-full max-w-sm">
        <div className="text-blue-800 text-center text-2xl font-semibold italic">
          Gourmet-map
        </div>
        <div className="text-center mt-6 text-2xl font-bold text-gray-600">
          SNS 계정으로 로그인해주세요
        </div>
        <p className="mt-2 text-center text-sm text-gray-600">
          계정이 없다면 자동으로 회원가입이 진행됩니다.
        </p>
      </div>
      <div className="mt-10 mx-auto w-full max-w-sm">
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="text-white flex gap-2 bg-[#4285F4] hover:bg-[#4285F4]/90 font-medium rounded-lg w-full px-5 py-4 text-center items-center justify-center"
          >
            <AiOutlineGoogle className="w-6 h-6" />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}
