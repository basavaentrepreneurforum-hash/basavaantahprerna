import Link from "next/link";

export default function FounderPage() {
  return (
    <div className="relative min-h-screen bg-obsidian text-ivory pt-24 pb-16 px-5 overflow-hidden">
      {/* Dark Base Background */}
      <div className="absolute inset-0 bg-obsidian" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,168,76,0.05)_0%,transparent_70%)] pointer-events-none" />

      {/* Cinematic noise overlay */}
      <div className="absolute inset-0 noise-overlay opacity-30 pointer-events-none z-0" />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col pt-10">

        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <span className="block w-8 h-px bg-champagne/40" />
          <span className="text-champagne/70 text-xs font-semibold uppercase tracking-[0.2em] font-data">
            Founder&apos;s Message
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-white text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight mb-8">
          Building a <br />
          <span className="font-drama text-champagne text-5xl md:text-6xl italic drop-shadow-[0_0_15px_rgba(201,168,76,0.4)]">
            Legacy together.
          </span>
        </h1>

        {/* Layout: Image + Forum Message */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* Founder Image */}
          <div className="lg:col-span-5 order-2 lg:order-1 relative rounded-2xl overflow-hidden border border-champagne/10 shadow-[0_8px_32px_rgba(0,0,0,0.8)] aspect-[4/5] sm:max-w-md mx-auto w-full group">
            <div className="absolute inset-0 bg-obsidian/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
            <img
              src="/images/founder.jpg"
              alt="Arpitha S Sarathi, Founder"
              className="w-full h-full object-cover object-top filter contrast-110"
            />
          </div>

          {/* The Message Body */}
          <article className="lg:col-span-7 order-1 lg:order-2 prose prose-invert prose-lg max-w-none text-white/80 space-y-6 leading-relaxed bg-[rgba(13,13,18,0.5)] backdrop-blur-md p-6 sm:p-10 rounded-2xl border border-champagne/10 shadow-2xl">
            <p className="text-xl font-light text-white/90">
              The Hindu Veerashaiva Lingayat Entrepreneur Forum has been established with the vision of empowering startups and business entrepreneurs across Karnataka by creating opportunities for financial growth, collaboration, and mutual support.
            </p>

            <p>
              At the same time, the forum aims to strengthen the cultural and spiritual roots of our Hindu Dharma and the Veerashaiva Lingayat community by building meaningful connections among like-minded individuals.
            </p>

            <p>
              This platform stands as a bridge of support from one Hindu Veerashaiva Lingayat to another, from one entrepreneur to another, and from one individual who values humanity to another who respects and upholds it.
            </p>

            <p>
              Through unity, shared knowledge, and collective progress, the forum strives to foster growth, integrity, and prosperity within the community and beyond.
            </p>

            <p>
              The Hindu Veerashaiva Lingayat Entrepreneur Forum expresses its deep concern for the well-being of families and the social harmony within our community. In light of the increasing number of divorce cases, the Forum has decided to initiate a Counselling Support Program aimed at helping couples address their concerns and strengthen their relationships.
            </p>

            <p>
              As part of this initiative, a panel of experienced counsellors will be made available through the Counselling section on the Forum’s website. Couples who wish to seek guidance or assistance may visit the website, choose a counsellor of their preference, and schedule a session at their convenience.
            </p>

            <p className="font-drama text-2xl text-champagne italic pt-6 border-t border-white/5">
              "NEVER LOSE A HEART WHILE PURSUING THE PATH OF TRUST, LIVE A PRINCIPLED LIFE”. – BASAVANNA
            </p>
          </article>
        </div>

        {/* Section 2: About the Founder Bio */}
        <div className="mt-16 sm:mt-24 w-full">
          <div className="relative bg-[rgba(13,13,18,0.5)] backdrop-blur-md p-6 sm:p-10 lg:p-14 rounded-3xl border border-champagne/10 shadow-2xl">
            {/* Subtle Top Glow for Bio Section */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-champagne/30 to-transparent" />
            
            <div className="text-center mb-10">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">About the Founder</h2>
              <h3 className="font-drama text-champagne text-2xl tracking-wide drop-shadow-md">ARPITHA S SARATHI</h3>
              
              <div className="text-white/60 text-xs sm:text-sm uppercase tracking-wide mt-4 font-data space-y-2 inline-block text-left mx-auto">
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-champagne block" />
                  <span className="text-white/80 font-bold">Director,</span> Mavrick Developers & Designers Pvt. Ltd.
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-champagne block" />
                  <span className="text-white/80 font-bold">General Secretary,</span> All India Veerashaiva Lingayata Mahasabha (Padmanabha Nagar)
                </p>
              </div>
            </div>
            
            <article className="prose prose-invert prose-lg max-w-4xl mx-auto text-white/80 space-y-6 leading-relaxed">
              <p>
                With a strong academic foundation in law through the five-year integrated B.A., LL.B. course, I had the privilege of interning with the Ministry of Law and Justice and the Ministry of Commerce and Industry, Government of India, New Delhi, where I gained valuable exposure to the functioning of central government institutions, the evolving legal and policy framework of the country and the regulatory and commercial dynamics shaping business and industry in India. I bring over seven years of litigation experience to my professional journey. After building a strong foundation in legal practice, I have now expanded my professional horizon by venturing into the real estate sector and establishing a company by name M/s. Mavrick Developers and Designers Pvt. Ltd., a company committed to providing end-to-end real estate solutions under one roof.
              </p>

              <p>
                My professional philosophy has always been rooted in the belief that consistent hard work, integrity and a courageous attitude are the true drivers of success. These values guide my approach to both legal practice and the dynamic world of real estate.
              </p>

              <p>
                I firmly believe in the principle:
              </p>

              <blockquote className="mt-8 mb-8 mx-auto rounded-xl bg-obsidian/40 p-6 sm:p-8 border-l-4 border-champagne text-center shadow-lg">
                <p className="font-drama text-2xl md:text-3xl text-champagne italic m-0 [text-shadow:0_2px_10px_rgba(0,0,0,0.8)]">
                  &ldquo;DREAM IT, WORK HARD TO ACHIEVE IT AND CONQUER IT.&rdquo;
                </p>
              </blockquote>

              <p className="pb-4">
                With this mindset, I strive to create value, build trust and contribute meaningfully to the growth of my company and to the satisfaction of my clients.
              </p>
            </article>
          </div>
        </div>

        <div className="mt-16 flex justify-center w-full">
          <Link href="/explore" className="btn btn-primary px-10 py-4 text-sm font-bold tracking-wider rounded-xl">
            Explore the Community
          </Link>
        </div>
      </div>
    </div>
  );
}
