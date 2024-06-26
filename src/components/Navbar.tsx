import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export const Navbar = () => {
  return (
    <>
      <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 backdrop-blur-lg bg-white/75 transition-all">
        <MaxWidthWrapper>
          <div className="flex h-14 items-center justify-between border-b borrder-zinc-200">
            <Link href="/" className="flex z-40 font-bold">
              <span>twill.</span>
            </Link>
            {/* todo: add mobile navbar */}

            <div className="hidden space-x-4 items-center sm:flex">
              <>
                <Link
                  href="/pricing"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  Pricing
                </Link>
                <LoginLink
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  Sign in
                </LoginLink>
                <RegisterLink
                  className={buttonVariants({
                    size: "sm",
                  })}
                >
                  Get started
                  <ArrowRight className="ml-2 size-5" />
                </RegisterLink>
              </>
            </div>
          </div>
        </MaxWidthWrapper>
      </nav>
    </>
  );
};
