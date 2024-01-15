import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const BackComponent = ({ props }) => {
  return (
    <>
      <Link to={props} className="absolute">
        <FaArrowLeft className="transform hover:scale-90" />
      </Link>
    </>
  );
};

export default BackComponent;
