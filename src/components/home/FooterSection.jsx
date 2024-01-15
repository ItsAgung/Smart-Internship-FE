import { Footer } from "flowbite-react";
import { BsFacebook, BsInstagram, BsTiktok, BsTwitter } from "react-icons/bs";

const FooterSection = () => {
  return (
    <Footer container className="rounded-none bg-red-700 h-fit">
      <div className="w-full text-base">
        <div className="flex flex-col md:flex-row gap-5 md:gap-0 md:mx-10">
          <div className="basis-1/3 pr-0 md:pr-36 flex-grow">
            <img
              src="assets/images/footer.png"
              className="w-[350px]"
              alt="footer"
            />
            <p className="text-white text-justify">
              <br></br>
              JL. HR. Soebrantas, Sidomulyo Baru, Kec. Tampan, Kota Pekanbaru,
              Riau 28293
            </p>
          </div>

          <div className="basis-1/4">
            <Footer.Title title="Navigasi" className="text-white text-lg" />
            <Footer.LinkGroup col className="text-white text-base">
              <Footer.Link href="/">Beranda</Footer.Link>
              <Footer.Link href="/posisi">Posisi</Footer.Link>
              <Footer.Link href="/kegiatan">Kegiatan</Footer.Link>
            </Footer.LinkGroup>
          </div>

          <div className="basis-1/4">
            <Footer.Title title="Kontak" className="text-white text-lg" />
            <Footer.LinkGroup col className="text-white text-base">
              <Footer.Link>admin@garudacyber.co.id</Footer.Link>
              <Footer.Link>0811-767-4727</Footer.Link>
            </Footer.LinkGroup>
          </div>
        </div>

        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            by="PT Garuda Cyber Indonesia™"
            href="#"
            year={2023}
            className="text-white"
          />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon className="text-white" href="#" icon={BsFacebook} />
            <Footer.Icon className="text-white" href="#" icon={BsInstagram} />
            <Footer.Icon className="text-white" href="#" icon={BsTwitter} />
            <Footer.Icon className="text-white" href="#" icon={BsTiktok} />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterSection;
