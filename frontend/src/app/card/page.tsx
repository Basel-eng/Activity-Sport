import Image from "next/image";
import Link from "next/link";

type Sport = {
  id:number;
  img: string;
  title: string;
  desc: string;
  price: string;
};

const Card = ({id, img, title, desc, price }: Sport) => {
  return (
    <div className="relative w-full ">
      <div className="w-[400px] bg-white  mb-5 p-2 transition">
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
          <p className="p-2 text-xl font-bold"> {desc} </p>
          <p className="p-2 text-xl font-bold"> {price}</p>
        </div>
        <div className="flex justify-between p-2">
          <Link
            href={`/amount/${id}`}
            className="font-bold text-2xl transition-all bg-blue-600 hover:bg-blue-400 text-white p-2 rounded-full"
            type="submit"
          >
            ذهاب الى التفاصيل
          </Link>
          <Link
            href={`/activity`}
            className="font-bold text-2xl transition-all bg-blue-600 hover:bg-blue-400 text-white p-2 rounded-full"
            type="submit"
          >
            تفقد الحجوزات
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
