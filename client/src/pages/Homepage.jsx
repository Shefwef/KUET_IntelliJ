import { Link } from "react-router-dom"; // Import Link
import video1 from "../assets/video1.mp4";
import video2 from "../assets/video2.mp4";

const Homepage = () => {
  return (
    <div className="flex flex-col items-center mt-8 lg:mt-24 p-5 bg-gradient-to-b from-[#1e1e2d] to-[#2a2d35] min-h-screen">
      {/* App Title */}
      <h1 className="text-4xl sm:text-6xl lg:text-8xl text-center tracking-wide">
        <span className="bg-gradient-to-r from-[#006A4E] to-[#004F39] text-transparent bg-clip-text font-semibold">
          Block
        </span>
        <span className="text-white font-semibold">Funder</span>
      </h1>

      {/* Subtitle */}
      <p className="text-lg sm:text-2xl lg:text-3xl text-center mt-3 text-neutral-100">
        <span className="bg-gradient-to-r from-orange-400 via-yellow-500 to-red-600 text-transparent bg-clip-text animate-gradient-move">
          Crowdfunding Powered by Blockchain
        </span>
      </p>

      {/* App Description */}
      <p className="mt-8 text-base sm:text-lg lg:text-xl text-center text-neutral-200 max-w-3xl leading-relaxed">
        Welcome to{" "}
        <span className="text-[#00A86B] font-semibold">BlockFunder</span>, where
        transparency meets innovation. Create impactful campaigns, accept secure
        Ethereum donations, and experience the power of blockchain for
        fundraising. Every transaction is decentralized, transparent, and secure
        — redefining how we fund change.
      </p>

      {/* Call to Action */}
      <div className="flex justify-center my-8 space-x-4">
        <Link
          to="/home" // Navigate to /home
          className="bg-gradient-to-r from-[#006A4E] to-[#004F39] py-4 px-6 rounded-lg text-white text-lg font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-transform"
        >
          View Campaigns
        </Link>
        <Link
          to="/chatbot" // Navigate to /chatbot
          className="py-4 px-6 rounded-lg border border-[#006A4E] text-[#006A4E] text-lg font-medium shadow-lg hover:bg-[#006A4E] hover:text-white hover:shadow-xl hover:scale-105 transition-transform"
        >
          Learn More
        </Link>
      </div>

      {/* Video Section */}
      <div className="flex flex-col lg:flex-row mt-12 justify-center gap-6">
        <video
          autoPlay
          loop
          muted
          className="rounded-lg w-4/5 lg:w-2/5 border-4 shadow-md transition-transform duration-300 hover:scale-105"
          style={{
            borderImage: "linear-gradient(to right, #006A4E, #FF8C00) 1",
            borderImageSlice: 1,
          }}
        >
          <source src={video1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <video
          autoPlay
          loop
          muted
          className="rounded-lg w-4/5 lg:w-2/5 border-4 shadow-md transition-transform duration-300 hover:scale-105"
          style={{
            borderImage: "linear-gradient(to right, #006A4E, #FF8C00) 1",
            borderImageSlice: 1,
          }}
        >
          <source src={video2} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-neutral-400 text-center text-sm">
        © 2025 BlockFunder. All Rights Reserved.
      </footer>
    </div>
  );
};

export default Homepage;
