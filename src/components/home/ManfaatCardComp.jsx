import "animate.css";
import { AnimationOnScroll } from "react-animation-on-scroll";
const ManfaatCardComp = ({ content }) => {
  return (
    <AnimationOnScroll
      animateOnce
      animateIn="animate__bounceInLeft"
      className="carousel-item w-fit md:w-[70%] md:rounded-3xl flex-col p-4 shadow-md bg-white border border-gray-200 shadow-black dark:bg-gray-800 dark:border-gray-700"
    >
      <div className="place-content-start w-full py-3">{content.logo}</div>
      <div>
        <h5 className="my-3 text-lg text-center font-semibold text-gray-900 dark:text-white">
          {content.title}
        </h5>
      </div>
      <div>
        <p className="font-normal text-center text-sm text-gray-500 dark:text-gray-400">
          {content.description}
        </p>
      </div>
    </AnimationOnScroll>
  );
};

export default ManfaatCardComp;
