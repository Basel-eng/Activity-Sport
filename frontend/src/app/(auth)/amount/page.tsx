import Image from "next/image";

type Sport = {
  id: number;
  img: string;
  title: string;
  desc: string;
  price: string;
  paraghraph:string;
};

const CardSection = ({ id, img, title, desc, price, paraghraph }: Sport) => {
  

  return (
    <div className="relative w-full h-screen">
      <div className="w-[400px] bg-white p-0.5 mb-5 hover:p-2 transition">
        <Image
          src={img}
          alt=""
          width={1000}
          height={50}
          className="object-cover w-[1000px] h-[200px]"
        />
        <h1
          style={{ direction: "rtl" }}
          className="text-4xl text-center p-2 font-bold "
        >
          {title}
        </h1>
        <hr />
        <div style={{ direction: "rtl" }} className="flex justify-between">
          <p className="p-2 text-xl font-semibold"> {desc} </p>
          <p className="p-2 text-xl font-bold"> {price}</p>
        </div>
        <hr className="m-2" />
        <p className="text-center text-2xl">{paraghraph}</p>
      </div>
    </div>
  );
};

export default CardSection;
