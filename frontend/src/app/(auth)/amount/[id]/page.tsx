"use client";
import CardSection from "@/app/components/CardSection";
import axios from "axios";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const Amount = () => {
  const [inputt, setinputt] = useState({
    typeActivity: "",
    username: "",
    email: "",
    usernumber: "",
    history: "",
    time: "",
  });
  const [loading, setloading] = useState(false);

  const isinput =
    inputt.username == "" ||
    inputt.email == "" ||
    inputt.history == "" ||
    inputt.usernumber == "" ||
    inputt.time == "";

  let Colorinput = "";
  if (isinput) {
    Colorinput = "disabled";
  } else {
    Colorinput = "";
  }

  async function hanlechange(e: React.FormEvent) {
    e.preventDefault();
    if (inputt.username === "") return toast.error("name is required");
    if (inputt.email === "") return toast.error("email is required");
    if (inputt.usernumber === "") return toast.error("number is required");
    if (inputt.history === "") return toast.error("history is required");
    if (inputt.time === "") return toast.error("time is required");
    try {
      setloading(true);
      await axios.post("http://localhost:8000/api/sports/create", {
        typeActivity: inputt.typeActivity,
        username: inputt.username,
        email: inputt.email,
        usernumber: Number(inputt.usernumber),
        history: inputt.history,
        time: inputt.time,
      });
      toast.success("تم الحجز بنجاح");
      setloading(false);
    } catch (error) {
      console.log(error);
      toast.error("wrong activity");
    }
  }

  const cards = [
    {
      id: 1,
      typeActivity: "ملعب كرة قدم",
      img: "/img/artificial-football.jpg",
      title: "ملعب كرة قدم",
      desc: "ملعب كرة قدم سداسي",
      price: "الساعة 2000 ل.س",
      paraghraph:
        "ملعب التنس هو مساحة رياضية مستطيلة الشكل مخصصة لممارسة لعبة التنس، وتُصمم وفق معايير دولية تضمن التوازن بين الأداء والعدالة في اللعب. يبلغ طوله 23.77 مترًا، وعرضه 8.23 مترًا في مباريات الفردي، ويزداد العرض إلى 10.97 مترًا في مباريات الزوجي. يُقسم الملعب إلى نصفين بواسطة شبكة مشدودة في المنتصف، ويُحيط به خطوط تحدد مناطق الإرسال والاستقبال. يمكن أن تكون أرضيته من العشب الطبيعي، أو الطين، أو الأسطح الصلبة مثل الأكريليك، وكل نوع يؤثر على سرعة الكرة وطريقة اللعب. يُستخدم الملعب في البطولات الرسمية، النوادي الرياضية، والمدارس، ويُعد من أكثر الملاعب دقة في التصميم نظرًا لتأثير كل تفصيل فيه على مجريات المباراة.",
    },
    {
      id: 2,
      typeActicity: "ملعب كرة تنس",
      img: "/img/tennis.jpg",
      title: "ملعب كرة تنس",
      desc: "ملعب كرة تنس ",
      price: "الساعة 3000 ل.س",
      paraghraph:
        "ملعب كرة القدم السداسي هو مساحة رياضية مخصصة لمباريات كرة القدم التي تُلعب بين فريقين، يتكون كل منهما من ستة لاعبين فقط. يتميز هذا النوع من الملاعب بحجمه الأصغر مقارنة بالملعب التقليدي، حيث يُصمم عادةً بأبعاد تتراوح بين 30 إلى 40 متر طولًا، و20 إلى 25 متر عرضًا، مع أرضية غالبًا ما تكون من العشب الصناعي أو المطاط المخصص للرياضات. يُستخدم الملعب السداسي في البطولات المحلية، والمدارس، والمراكز الرياضية، ويُعد مثاليًا للعب السريع والتكتيك الجماعي، نظرًا لقرب اللاعبين من بعضهم وسرعة تبادل الكرة. كما يُحيط به سور أو شبك للحفاظ على الكرة داخل الملعب، مما يضمن استمرارية اللعب دون توقف.",
    },
    {
      id: 3,
      typeActicity: "ملعب كرة سلة",
      img: "/img/basketball.jpg",
      title: "ملعب كرة سلة",
      desc: "ملعب كرة سلة ",
      price: "الساعة 8000 ل.س",
      paraghraph:
        "ملعب كرة السلة هو مساحة مستطيلة مخصصة لممارسة لعبة كرة السلة، ويُعد من أكثر الملاعب ديناميكية وتفاعلاً في الرياضات الجماعية. يبلغ طوله القياسي 28 مترًا وعرضه 15 مترًا، وتُحدد عليه خطوط واضحة تشمل منطقة الثلاث نقاط، خط الرمية الحرة، والمنطقة المحرّمة تحت السلة. يتوسط كل طرف من طرفي الملعب سلة معلّقة على لوحة خلفية بارتفاع 3.05 متر، وهي الهدف الأساسي الذي يسعى اللاعبون لتسجيل النقاط فيه. أرضية الملعب غالبًا ما تكون من الخشب المصقول لتوفير سرعة الحركة وتخفيف الإصابات، ويُحيط به عادةً مدرجات للجمهور. يُستخدم الملعب في المباريات الرسمية، التدريبات، والمسابقات المدرسية، ويُعد بيئة مثالية لتطوير المهارات الفردية والجماعية في اللعب.",
    },
    {
      id: 4,
      typeActivity: "ملعب كرة اليد",
      img: "/img/handball.jpg",
      title: "ملعب كرة اليد",
      desc: "ملعب كرة اليد ",
      price: "الساعة 10000 ل.س",
      paraghraph:
        "ملعب كرة اليد هو مساحة مستطيلة مخصصة لممارسة لعبة كرة اليد، ويُصمم وفق معايير دولية تضمن التوازن بين السرعة والدقة في اللعب الجماعي. يبلغ طوله 40 مترًا وعرضه 20 مترًا، ويُقسم إلى منطقتين رئيسيتين لكل فريق، مع وجود مرمى في كل طرف بعرض 3 أمتار وارتفاع 2 متر. تُحيط بكل مرمى منطقة دائرية تُعرف بمنطقة الستة أمتار، وهي المنطقة التي يُمنع على اللاعبين دخولها إلا في حالات معينة. أرضية الملعب عادةً ما تكون من الخشب أو مادة صناعية مرنة لتوفير الثبات وتقليل الإصابات. يُستخدم الملعب في البطولات الرسمية، المدارس، والمراكز الرياضية، ويُعد بيئة مثالية لتطوير المهارات الحركية والتكتيك الجماعي، نظرًا لطبيعة اللعبة السريعة وتعدد الأدوار داخل الفريق.",
    },
    {
      id: 5,
      typeActivity: "ملعب كرة الطائرة",
      img: "/img/volleyball.jpg",
      title: "ملعب كرة الطائرة",
      desc: "ملعب كرة الطائرة ",
      price: "الساعة 5000 ل.س",
      paraghraph:
        "ملعب كرة الطائرة هو مساحة مستطيلة مخصصة لممارسة لعبة كرة الطائرة، ويُصمم وفق مواصفات دقيقة تضمن التوازن بين الأداء والعدالة في اللعب. يبلغ طوله 18 مترًا وعرضه 9 أمتار، ويُقسم إلى نصفين متساويين بواسطة شبكة معلّقة في المنتصف بارتفاع 2.43 متر للرجال و2.24 متر للنساء. يحتوي الملعب على خطوط تحدد مناطق الإرسال والاستقبال، بالإضافة إلى منطقة الهجوم والدفاع لكل فريق. تُصنع أرضية الملعب غالبًا من الخشب أو مواد صناعية مرنة، وتُستخدم الملاعب الرملية في النسخة الشاطئية من اللعبة. يُعد ملعب كرة الطائرة بيئة مثالية لتطوير المهارات الجماعية والتكتيك السريع، نظرًا لطبيعة اللعبة التي تعتمد على التنسيق والدقة في التمرير والتصدي والهجوم.",
    },
  ];

  const { id } = useParams();
  const cardspara = cards.find((card) => card.id === Number(id));

  return (
    <section className="container">
      <ToastContainer position="top-center" />

      <div className="text-2xl flex justify-around m-4">
        {cardspara && (
          <CardSection
            id={cardspara.id}
            img={cardspara.img}
            title={cardspara.title}
            desc={cardspara.desc}
            price={cardspara.price}
            paraghraph={cardspara.paraghraph}
          />
        )}
        <form onSubmit={hanlechange}>
          <div style={{ direction: "rtl" }}>
            <div className="flex justify-center items-center ">
              <div className="w-[500px] border rounded-xl bg-gradient-to-t from-blue-500  to-blue-300 p-4 text-white mt-8 bg-white">
                <div className="p-2 flex flex-col">
                  <label>الاسم الكامل:</label>
                  <input
                    placeholder="اكتب اسمك"
                    type="text"
                    value={inputt.username}
                    onChange={(e) =>
                      setinputt({ ...inputt, username: e.target.value })
                    }
                    name="text"
                    className="p-2 border text-black bg-white border-black rounded-lg m-1"
                  />
                </div>
                <div className="p-2 flex flex-col">
                  <label>نوع الحجز:</label>
                  <select
                    value={inputt.typeActivity}
                    onChange={(e) =>
                      setinputt({ ...inputt, typeActivity: e.target.value })
                    }
                    className="p-2 border text-black bg-white border-black rounded-lg m-1"
                  >
                    <option>كرة قدم</option>
                    <option>كرة سلة</option>
                    <option>كرة طائرة</option>
                    <option>كرة تنس</option>
                    <option>كرة اليد</option>
                  </select>
                </div>

                <div className="p-2 flex flex-col">
                  <label> رقم الهاتف:</label>
                  <input
                    placeholder="اكتب رقمك"
                    type="number"
                    name="phone"
                    value={inputt.usernumber}
                    onChange={(e) =>
                      setinputt({ ...inputt, usernumber: e.target.value })
                    }
                    style={{direction:"rtl"}}
                    className="p-2 border text-black bg-white border-black rounded-lg m-1"
                  />
                </div>
                <div className="p-2 flex flex-col">
                  <label> البريد الالكتروني:</label>
                  <input
                    placeholder="اكتب بريدك الالكتروني"
                    type="email"
                    value={inputt.email}
                    onChange={(e) =>
                      setinputt({ ...inputt, email: e.target.value })
                    }
                    name="text"
                    className="p-2 border text-black bg-white border-black rounded-lg m-1"
                  />
                </div>
                <div className="p-2 flex justify-around items-center text-black">
                  <label> التاريخ:</label>
                  <input
                    placeholder="ادخل التاريخ المناسب "
                    name="text"
                    value={inputt.history}
                    onChange={(e) =>
                      setinputt({ ...inputt, history: e.target.value })
                    }
                    type="date"
                    className="p-1 w-[100px] text-black border-black bg-white rounded-lg border"
                  />
                  <label>التوقيت:</label>
                  <input
                    placeholder="ادخل الوقت المناسب للعب"
                    name="text"
                    value={inputt.time}
                    onChange={(e) =>
                      setinputt({ ...inputt, time: e.target.value })
                    }
                    type="time"
                    className="p-1 w-[100px] border-gray-400 bg-white rounded-lg border"
                  />
                </div>
                <div className="p-2 ">
                  <button
                    className={`${Colorinput} rounded-xl text-2xl cursor-pointer bg-black text-white transition-all hover:bg-white hover:text-black p-2 w-full`}
                  >
                    احجز
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Amount;
