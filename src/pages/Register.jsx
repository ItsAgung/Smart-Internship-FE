import RegisterComp from "../components/auth/RegisterComp";

const Register = () => {
  return (
    <>
      <section className="max-w-full min-h-screen bg-gray-100 flex flex-col justify-center items-center">
        <main className="rounded-xl md:w-1/3 w-[90%]  p-6 bg-white shadow-md ">
          <RegisterComp />
        </main>
      </section>
    </>
  );
};

export default Register;
