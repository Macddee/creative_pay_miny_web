import About from "../components/home/About";
import Banner from "../components/home/Banner";
import Services from "../components/home/Services";



export default function Mainpage() {
  return (
    <>
      <Banner title="This is the home page title" extraClasses="bg-red-600" />
      <About />
      <Services />
    </>
  )
}
