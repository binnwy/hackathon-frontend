import React from 'react';
// Note: We don't need useNavigate as we are using window.location.href

export default function LandingPage() {
  const handleNavigation = () => {
    // Direct window location change no upyog karo
    window.location.href = '/dashboard';
  };

  // Content for the second container, formatted for easy reading
  const content = {
    title: "Unveiling the Universe's Hidden Worlds",
    body: (
      <>
        For millennia, humanity only knew the eight planets of our Solar System. Today, the census of the cosmos has exploded, with <span className="text-pink-300 font-semibold">over 5,000 confirmed exoplanets</span>—worlds orbiting stars other than our Sun. These celestial bodies have revealed a dizzying diversity far beyond our expectations. Astronomers have found <span className="text-cyan-400 font-semibold">"Hot Jupiters"</span> (massive gas giants hugging their stars), <span className="text-pink-300 font-semibold">"Super-Earths"</span> and <span className="text-pink-300 font-semibold">"Mini-Neptunes"</span> (sizes absent from our own neighborhood), and <span className="text-cyan-400 font-semibold">"Terrestrial"</span> rocky worlds.
      </>
    ),
  };

  // Updated team content with four members, only names needed now
  const teamContent = {
    title: "Meet the Crew: Architects of the Unknown",
    members: [
      { name: "Hisana Saji" },
      { name: "Niya L R" },
      { name: "Binny Thomas" },
      { name: "Arya S Nair" },
    ]
  };

  // Common styles for the glassmorphic frame
  const frameStyle = {
    backgroundColor: 'rgba(5, 5, 20, 0.7)', 
    backdropFilter: 'blur(10px)',
    border: '2px solid rgba(187, 110, 251, 0.5)',
    boxShadow: '0 0 40px rgba(187, 110, 251, 0.2), inset 0 0 20px rgba(187, 110, 251, 0.1)',
  };

  return (
    // Root container for scroll snapping
    <div className="relative snap-y snap-mandatory overflow-x-hidden" id="landing-page-root">
      
      {/* -------------------- Container 1: Hero Section Content (Cleaned) -------------------- */}
      {/* The child containers keep min-h-screen and snap-start for section definition */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center snap-start">
        <h1
          className="text-6xl md:text-7xl font-black uppercase text-white mb-8 tracking-wider"
          style={{
            fontFamily: 'Oswald, sans-serif',
            letterSpacing: '3px',
            textShadow:
              '0 0 30px rgba(255, 255, 255, 0.5), 0 0 60px rgba(187, 110, 251, 0.3)',
          }}
        >
          THE UNKNOWN
        </h1>

        <button
          onClick={handleNavigation} // Function call ne badlavyo chhe
          className="px-8 py-4 text-lg font-bold text-white rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, #BB6EFB 0%, #FF8EDF 100%)',
            fontFamily: 'Montserrat, sans-serif',
            boxShadow:
              '0 0 30px rgba(187, 110, 251, 0.4), 0 0 60px rgba(255, 142, 223, 0.2)',
          }}
          onMouseEnter={(e) => {
            e.target.style.boxShadow =
              '0 0 40px rgba(187, 110, 251, 0.6), 0 0 80px rgba(255, 142, 223, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.boxShadow =
              '0 0 30px rgba(187, 110, 251, 0.4), 0 0 60px rgba(255, 142, 223, 0.2)';
          }}
        >
          Start Prediction Now
        </button>
      </div>

      {/* -------------------- Container 2: Unveiling Worlds (Styled like the image) -------------------- */}
      <div className="relative z-10 flex items-center justify-center py-20 px-4 text-white min-h-screen snap-start">
        
        {/* Content box with glassmorphism, glowing border, and rounded corners */}
        <div
          className="relative z-20 max-w-5xl mx-auto p-8 md:p-16 rounded-[4rem] text-center"
          style={frameStyle}
        >
          <h2
            className="text-3xl md:text-5xl font-extrabold tracking-tighter mb-6 text-white"
            style={{ fontFamily: 'Oswald, sans-serif' }}
          >
            {content.title}
          </h2>
          
          <p className="text-lg md:text-xl leading-relaxed text-gray-200 text-left md:px-12">
            {content.body}
          </p>
        </div>
      </div>

      {/* -------------------- Container 3: The Team Section -------------------- */}
      <div className="relative z-10 flex items-center justify-center py-20 px-4 text-white min-h-screen snap-start">
        <div
          className="relative z-20 max-w-5xl mx-auto p-8 md:p-16 rounded-[4rem] text-center"
          style={frameStyle}
        >
          <h2
            className="text-3xl md:text-5xl font-extrabold tracking-tighter mb-12 text-white"
            style={{ fontFamily: 'Oswald, sans-serif' }}
          >
            {teamContent.title}
          </h2>

          {/* Updated grid to 2x2 on desktop, 1x4 on mobile */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamContent.members.map((member, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', boxShadow: '0 0 10px rgba(187, 110, 251, 0.1)' }}
              >
                <div className="text-4xl mb-4" role="img" aria-label="Team Member Icon">
                  {/* Using a simple astronaut emoji */}
                  🧑‍🚀
                </div>
                <h3 className="text-xl font-bold text-pink-300 mb-1">
                  {member.name}
                </h3>
                {/* Removed the role field entirely */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
