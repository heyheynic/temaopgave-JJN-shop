import Image from "next/image";

const Page = async () => {
  return (
    <div>
      <section>
        <div>
          <Image
            src="/faveicon.ico"
            width={200}
            height={200}
            alt="placeholder image"
          ></Image>
          <h3>Tittle</h3>
          <p>Pris</p>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center">
        <p>Du skal betale i alt </p>
        <p>Placeholder Button</p>
      </section>
    </div>
  );
};

export default Page;
