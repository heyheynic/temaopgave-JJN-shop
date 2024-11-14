import Link from "next/link";
import PrimaryButton from "@/components/PrimaryButton";

export default function Home() {
  return (
    <div className="homepage h-screen grid place-content-center bg-shopping">
      <div className="hero__title__area bg-white py-m w-screen ">
        <div className="wrapper__text flex flex-col md:grid md:grid-rows-[auto,1fr] md:grid-cols-[1fr,auto] gap-y-4 max-w-[80dvw] m-auto px-s">
          <h1 className="index__title text-big-title font-sans md:col-start-1 ">
            Whatever you need.
          </h1>
          <span className="index__title__smaller__text text-emphasize md:col-start-1 text-dark">
            Whenever you need it. At your hands.
          </span>
          <div
            className="index__button md:col-start-2 
        row-span-full self-center py-s px-xs"
          >
            <Link href={`./products/`}>
              <PrimaryButton btnText="Go shopping" theme="red" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
