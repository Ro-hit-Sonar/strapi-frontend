import Link from "next/link";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { UserMenu } from "./auth/user-menu";

export const Header = () => {
  return (
    <div className="fixed z-50 pt-8 md:pt-14 top-0 left-0 w-full">
      <header className="flex items-center justify-between container">
        <Link href="/">
          <Logo className="w-[100px] md:w-[120px]" />
        </Link>
        <nav className="flex max-lg:hidden absolute left-1/2 -translate-x-1/2 items-center justify-center gap-x-10">
          {["About", "Portfolio", "Insights", "Blog", "Gold", "Contact"].map(
            (item) => (
              <Link
                className="uppercase inline-block font-mono text-foreground/60 hover:text-foreground/100 duration-150 transition-colors ease-out"
                href={
                  item === "Blog"
                    ? "/blog"
                    : item === "Gold"
                    ? "/gold"
                    : `#${item.toLowerCase()}`
                }
                key={item}
              >
                {item}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-4">
          <UserMenu />
          <MobileMenu />
        </div>
      </header>
    </div>
  );
};
