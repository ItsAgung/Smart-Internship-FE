import { FaWhatsapp } from "react-icons/fa";

const FloatingActionWa = ({ nomor, desc }) => {
  return (
    <a
      href={`https://api.whatsapp.com/send?phone=${nomor}&text=${desc}`}
      target="_blank"
      rel="noreferrer"
      title="WhatsApp"
      className="fixed z-90 btn btn-ghost bottom-20 lg:bottom-6 right-5 md:right-8 bg-[#28D146] w-14 h-14 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-[#43a855] hover:drop-shadow-2xl"
    >
      <FaWhatsapp />
    </a>
  );
};

export default FloatingActionWa;
