import Card from "./card/page";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <div>
      <Hero />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mx-5  ">
        <Card
          id={1}
          img="/img/artificial-football.jpg"
          title="ملعب كرة قدم"
          desc="ملعب كرة قدم سداسي"
          price={"الساعة 2000 ل.س"}
        />
        <Card
          id={2}
          img="/img/tennis.jpg"
          title="ملعب كرة تنس"
          desc="ملعب كرة تنس "
          price={"الساعة 3000 ل.س"}
        />
        <Card
          id={3}
          img="/img/basketball.jpg"
          title="ملعب كرة سلة"
          desc="ملعب كرة سلة "
          price={"الساعة 8000 ل.س"}
        />
        <Card
          id={4}
          img="/img/handball.jpg"
          title="ملعب كرة اليد"
          desc="ملعب كرة اليد "
          price={"الساعة 10000 ل.س"}
        />
        <Card
          id={5}
          img="/img/volleyball.jpg"
          title="ملعب كرة الطائرة"
          desc="ملعب كرة الطائرة "
          price={"الساعة 5000 ل.س"}
        />
      </div>
    </div>
  );
}
