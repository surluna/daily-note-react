import Header from "@/components/Header";
import NoteForm from "@/components/NoteForm";
import Intro from "./components/Intro";
import Dashboard from "./Dashboard/page";

export default function Home() {
  return (
    <>
      <Header />
      <section className="w-[70%] h-screen mx-auto flex items-center">
        <div className="relative flex flex-col justify-center items-start h-[400px] flex-[5.5]">
          <Intro />
        </div>
        <div className="flex flex-col justify-center items-center flex-[4.5]">
          <NoteForm />
        </div>
      </section>
    </>
  );
}
