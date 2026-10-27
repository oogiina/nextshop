import { Clock3, HeartHandshake, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";

export default function About() {
  return (
    <main className="about-page">
      <section className="about-hero"><span className="eyebrow">БИДНИЙ ТУХАЙ</span><h1>Өдөр тутмын хэрэгцээг<br /><span>хялбархан.</span></h1><p>Online Shop нь чанартай бүтээгдэхүүнийг нэг дороос сонгож, найдвартай захиалах энгийн орчныг бүрдүүлдэг.</p></section>
      <section className="about-story"><div><span className="eyebrow">БИДНИЙ ЗОРИЛГО</span><h2>Танд хэрэгтэй зүйлсийг илүү ойртуулна.</h2></div><p>Бид хэрэглэгч бүрт ойлгомжтой, хурдан, найдвартай онлайн худалдааны туршлагыг хүргэхийг зорьдог. Бүтээгдэхүүнээ ангиллаар нь сонгож, сагсандаа нэмээд хэдхэн алхмаар захиалаарай.</p></section>
      <section className="about-values" aria-label="Бидний давуу тал">
        <article><HeartHandshake size={25} /><h2>Хэрэглэгч төвтэй</h2><p>Таны хэрэгцээ, тав тухыг үргэлж нэгдүгээрт тавина.</p></article>
        <article><ShieldCheck size={25} /><h2>Найдвартай</h2><p>Захиалга бүрийг анхааралтай, хариуцлагатай хүргэнэ.</p></article>
        <article><Truck size={25} /><h2>Хурдан хүргэлт</h2><p>Хот доторх захиалгыг шуурхай хүргэхэд анхаарна.</p></article>
        <article><Clock3 size={25} /><h2>Өдөр бүр нээлттэй</h2><p>Даваа–Ням гарагт 09:00–21:00 цагт ажиллана.</p></article>
      </section>
      <section className="about-cta"><div><h2>Худалдан авалтаа эхлүүлээрэй.</h2><p>Өөрт хэрэгтэй бүтээгдэхүүнээ өнөөдөр сонгоорой.</p></div><Link href="/categories" className="primary-button">Ангилал үзэх <span aria-hidden="true">→</span></Link></section>
    </main>
  );
}
