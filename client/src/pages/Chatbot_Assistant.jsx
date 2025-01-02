import React, { useEffect, useState } from "react";

const faqs = [
  {
    question: "What is Blockchain, and how does it work?",
    answer:
      "Blockchain is a decentralized, digital ledger that records transactions securely and transparently. It works by storing data in immutable blocks linked through cryptographic hashes, ensuring integrity and tamper resistance.",
  },
  {
    question: "What are the advantages of using Blockchain in fundraising?",
    answer:
      "Blockchain enables secure, transparent, and borderless transactions. It reduces intermediaries, cuts costs, and ensures real-time tracking of funds, building trust among investors and donors.",
  },
  {
    question: "How can Blockchain enhance trust in fundraising?",
    answer:
      "Blockchain provides transparency by allowing donors and investors to track how funds are used. Immutable records ensure that transactions cannot be altered, increasing accountability.",
  },
  {
    question: "Can Blockchain be used for charity fundraising? How?",
    answer:
      "Yes, Blockchain can be used for charity fundraising by providing transparency in donations, reducing transaction costs, and enabling global contributions. Smart contracts can automate fund allocation and ensure that funds reach the intended beneficiaries.",
  },
  {
    question:
      "What are Initial Coin Offerings (ICOs), and how are they used for fundraising?",
    answer:
      "ICOs are blockchain-based crowdfunding methods where startups or projects issue tokens to investors in exchange for cryptocurrency or fiat money. These tokens can represent ownership, utility, or future profits.",
  },
];

const Chatbot_Assistant = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const botpressScript = document.createElement("script");
    botpressScript.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js";
    botpressScript.async = true;

    const configScript = document.createElement("script");
    configScript.src =
      "https://files.bpcontent.cloud/2025/01/01/14/20250101140326-75SDRKJZ.js";
    configScript.async = true;

    botpressScript.onload = () => {
      if (window.botpressWebChat) {
        window.botpressWebChat.init({
          hostUrl: "https://cdn.botpress.cloud/webchat/v2.3",
          botId: "177bb07c-25e7-4702-9587-0a3a32701aae",
          configUrl:
            "https://files.bpcontent.cloud/2025/01/01/14/20250101140326-9ETS39NY.json",
          botName: "Blockchain Assistant",
          enableReset: true,
          enableTranscriptDownload: true,
          showPoweredBy: false,
        });
      }
    };

    document.body.appendChild(botpressScript);
    document.body.appendChild(configScript);

    return () => {
      document.body.removeChild(botpressScript);
      document.body.removeChild(configScript);
    };
  }, []);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-[#1e1e2d] via-[#23233d] to-[#181a21] text-white">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-[#9b73d3]">
          Blockchain Info
        </h1>
        <p className="text-lg text-gray-400 mt-4">
          Learn about Blockchain and its use in fundraising through FAQs or chat
          with our assistant!
        </p>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-[#57eba3] mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg bg-[#2d2d3d] cursor-pointer border ${
                activeIndex === index ? "border-[#57eba3]" : "border-[#3a3a4a]"
              }`}
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-lg font-semibold">{faq.question}</h3>
              {activeIndex === index && (
                <p className="mt-2 text-gray-300">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chatbot Section */}
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-[#57eba3] mb-4">
          Chat with Steve - Your Blockchain Assistant
        </h2>
        <p className="text-gray-400 mb-6">
          Have more personalized questions? Talk to Steve using the message icon
          on the right.
        </p>
      </div>
    </div>
  );
};

export default Chatbot_Assistant;
