import LottieHandler from "@/components/LottieHandler";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <section className="absolute inset-0 flex items-center justify-center flex-col">
      <div className="w-full max-w-md">
        <LottieHandler
          type="notFound"
          message="Page Not Found. Please check the URL and try again."
        />
      </div>

      <Link href="/" className="main-btn text-base font-bold">
        Go Back &rarr;
      </Link>
    </section>
  );
};

export default NotFoundPage;
