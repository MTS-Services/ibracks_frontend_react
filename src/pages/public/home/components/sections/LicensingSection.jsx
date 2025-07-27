import { FaCheck } from "react-icons/fa";
import planData from "/public/data/plan";

const LicensingSection = () => {
  return (
    <section className="bg-gradient-to-b from-[#150618] to-[#150620] px-4 py-16">
      <div className="mx-auto max-w-7xl">
        <div>
          <h2 className="mb-10 text-center text-2xl font-bold text-white md:text-3xl">
            Licensing Info
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {planData.map((plan) => (
            <div
              key={plan.id}
              className="flex h-full flex-col justify-between rounded-2xl border border-gray-500 bg-[#0A030B] p-5 text-white sm:p-6"
            >
              {/* Top content container */}
              <div className="flex flex-grow flex-col gap-6 sm:gap-8">
                {/* Tier Badge & Description */}
                <div className="w-fit rounded-md bg-black/20 bg-gradient-to-b from-yellow-700 to-yellow-300 px-3 py-1.5">
                  <h3 className="text-center text-sm font-semibold text-white">
                    {plan.tier}
                  </h3>
                </div>

                <p className="text-sm font-light text-[#A1A1A1]">
                  {plan.description}
                </p>

                <div className="h-px w-full bg-gray-200 opacity-30" />

                <div className="text-5xl leading-tight font-semibold sm:text-6xl md:text-7xl">
                  {plan.price}
                </div>
                <p className="text-sm font-semibold text-[#A1A1A1]">
                  {plan.note}
                </p>

                <div className="h-px w-full bg-neutral-500 opacity-30" />

                {/* Features List */}
                <div className="flex flex-col gap-3 text-sm text-neutral-400">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <FaCheck className="mt-1 min-w-[1.2rem] flex-shrink-0 text-[#A1A1A1]" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom CTA Button */}
              <button className="mt-8 w-full rounded-lg bg-gradient-to-b from-orange-200 to-yellow-500 px-4 py-3 font-medium text-black transition-all hover:opacity-90">
                Read License
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LicensingSection;
