import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Users, Trophy, Timer } from 'lucide-react';

const TEAMS = {
  premierLeague: [
    { name: 'Manchester City', logo: 'https://upload.wikimedia.org/wikipedia/sco/e/eb/Manchester_City_FC_badge.svg' },
    { name: 'Arsenal', logo: 'https://resources.premierleague.com/premierleague/badges/70/t3.png' },
    { name: 'Manchester United', logo: 'https://resources.premierleague.com/premierleague/badges/70/t1.png' },
    { name: 'Chelsea', logo: 'https://resources.premierleague.com/premierleague/badges/70/t8.png' },
    { name: 'Liverpool', logo: 'https://resources.premierleague.com/premierleague/badges/70/t14.png' },
    { name: 'Tottenham', logo: 'https://resources.premierleague.com/premierleague/badges/70/t6.png' },
    { name: 'Newcastle', logo: 'https://resources.premierleague.com/premierleague/badges/70/t4.png' },
    { name: 'Brighton', logo: 'https://resources.premierleague.com/premierleague/badges/70/t36.png' },
    { name: 'Aston Villa', logo: 'https://resources.premierleague.com/premierleague/badges/70/t7.png' }
  ],
   laLiga: [
    { name: 'Real Madrid', logo: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg' },
    { name: 'Barcelona', logo: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg' },
    { name: 'Atletico Madrid', logo: 'https://upload.wikimedia.org/wikipedia/fr/9/93/Logo_Atl%C3%A9tico_Madrid_2017.svg' },
    { name: 'Sevilla', logo: 'https://upload.wikimedia.org/wikipedia/en/3/3b/Sevilla_FC_logo.svg' },
    { name: 'Real Sociedad', logo: 'https://upload.wikimedia.org/wikipedia/en/f/f1/Real_Sociedad_logo.svg' },
    { name: 'Villarreal', logo: 'https://upload.wikimedia.org/wikipedia/en/b/b9/Villarreal_CF_logo-en.svg' },
    { name: 'Real Betis', logo: 'https://upload.wikimedia.org/wikipedia/en/1/13/Real_betis_logo.svg' },
    { name: 'Athletic Bilbao', logo: 'https://upload.wikimedia.org/wikipedia/en/9/98/Club_Athletic_Bilbao_logo.svg' }
  ],
  serieA: [
    { name: 'Juventus', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ed/Juventus_FC_-_logo_black_%28Italy%2C_2020%29.svg' },
    { name: 'AC Milan', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg' },
    { name: 'Inter Milan', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021_logo.svg' },
    { name: 'Napoli', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/SSC_Napoli_logo.svg' },
    { name: 'AS Roma', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/AS_Roma_logo.svg' },
    { name: 'Lazio', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/SS_Lazio_crest.svg' },
    { name: 'Atalanta', logo: 'https://upload.wikimedia.org/wikipedia/en/6/66/Atalanta_BC_logo.svg' },
    { name: 'Fiorentina', logo: 'https://upload.wikimedia.org/wikipedia/en/2/2c/ACF_Fiorentina_2.svg' }
  ],
  bundesliga: [
    { name: 'Bayern Munich', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/FC_Bayern_München_logo_%282017%29.svg' },
    { name: 'Borussia Dortmund', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg' },
    { name: 'RB Leipzig', logo: 'https://upload.wikimedia.org/wikipedia/en/0/04/RB_Leipzig_2014_logo.svg' },
    { name: 'Bayer Leverkusen', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Bayer_Leverkusen_logo.svg' },
    { name: 'Eintracht Frankfurt', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Eintracht_Frankfurt_Logo_2010.svg' },
    { name: 'Wolfsburg', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/VfL_Wolfsburg_logo.svg' },
    { name: 'Borussia Mönchengladbach', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Borussia_Mönchengladbach_logo.svg' }
  ],
  ligue1: [
    { name: 'Paris Saint-Germain', logo: 'https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg' },
    { name: 'Marseille', logo: 'https://upload.wikimedia.org/wikipedia/en/2/29/Olympique_de_Marseille_logo.svg' },
    { name: 'Lyon', logo: 'https://upload.wikimedia.org/wikipedia/en/c/c6/Olympique_Lyonnais.svg' },
    { name: 'Monaco', logo: 'https://upload.wikimedia.org/wikipedia/en/f/fd/AS_Monaco_FC.svg' },
    { name: 'Lille', logo: 'https://upload.wikimedia.org/wikipedia/en/1/12/Lille_OSC_logo.svg' },
    { name: 'Rennes', logo: 'https://upload.wikimedia.org/wikipedia/en/f/f6/Stade_Rennais_FC.svg' },
    { name: 'Nice', logo: 'https://upload.wikimedia.org/wikipedia/en/8/88/OGC_Nice_logo.svg' },
    { name: 'Bordeaux', logo: 'https://upload.wikimedia.org/wikipedia/en/e/ec/FC_Girondins_de_Bordeaux_logo.svg' }
  ],
  additional: [
    { name: 'Benfica', logo: 'https://upload.wikimedia.org/wikipedia/sco/a/a2/SL_Benfica_logo.svg' },
    { name: 'Al-Nassr', logo: 'https://upload.wikimedia.org/wikipedia/en/3/3f/Nassr_FC_Logo.svg' },
    { name: 'Al-Hilal', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Al_Hilal_SFC_Logo.svg' },
    { name: 'Al-Ahly', logo: 'https://upload.wikimedia.org/wikipedia/en/4/45/Al_Ahli_Saudi_FC_logo.svg' },
    { name: 'Al-Ittihad', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Al-Ittihad_logo.png' }
  ]
};

// Flatten all teams into a single array
const ALL_TEAMS = Object.values(TEAMS).flat();

const FootballTeamRandomizer = () => {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentTeam, setCurrentTeam] = useState(null);
  const [assignedTeams, setAssignedTeams] = useState({ player1: null, player2: null });
  const [attempts, setAttempts] = useState(0);
  const [errors, setErrors] = useState({});
  const [animationSpeed, setAnimationSpeed] = useState(50);
  
  const animationRef = useRef(null);
  const timeoutRef = useRef(null);
  
  const MAX_ATTEMPTS = 3;
  const ANIMATION_DURATION = 3000;

  // Validation function
  const validateInputs = () => {
    const newErrors = {};
    
    if (!player1.trim()) {
      newErrors.player1 = 'Player 1 name is required';
    }
    
    if (!player2.trim()) {
      newErrors.player2 = 'Player 2 name is required';
    }
    
    if (player1.trim() === player2.trim() && player1.trim()) {
      newErrors.player2 = 'Player names must be different';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Animation logic
  const startAnimation = () => {
    if (!validateInputs()) return;
    
    setIsAnimating(true);
    setAnimationSpeed(50);
    
    // Start the team cycling animation
    const animate = () => {
      const randomTeam = ALL_TEAMS[Math.floor(Math.random() * ALL_TEAMS.length)];
      setCurrentTeam(randomTeam);
    };
    
    // Initial animation with fast speed
    animationRef.current = setInterval(animate, animationSpeed);
    
    // Gradually slow down the animation
    const slowDown = () => {
      setAnimationSpeed(prev => {
        const newSpeed = prev + 10;
        if (newSpeed < 200) {
          clearInterval(animationRef.current);
          animationRef.current = setInterval(animate, newSpeed);
          timeoutRef.current = setTimeout(slowDown, 300);
        }
        return newSpeed;
      });
    };
    
    // Start slowing down after 1 second
    timeoutRef.current = setTimeout(slowDown, 1000);
    
    // Stop animation after 3 seconds and assign teams
    setTimeout(() => {
      clearInterval(animationRef.current);
      clearTimeout(timeoutRef.current);
      
      // Select two different teams
      const availableTeams = [...ALL_TEAMS];
      const team1 = availableTeams[Math.floor(Math.random() * availableTeams.length)];
      availableTeams.splice(availableTeams.indexOf(team1), 1);
      const team2 = availableTeams[Math.floor(Math.random() * availableTeams.length)];
      
      setAssignedTeams({
        player1: team1,
        player2: team2
      });
      
      setCurrentTeam(null);
      setIsAnimating(false);
      setAttempts(prev => prev + 1);
    }, ANIMATION_DURATION);
  };

  // Reset function
  const resetGame = () => {
    setPlayer1('');
    setPlayer2('');
    setAssignedTeams({ player1: null, player2: null });
    setAttempts(0);
    setCurrentTeam(null);
    setErrors({});
    setIsAnimating(false);
  };

  // Try again function
  const tryAgain = () => {
    setAssignedTeams({ player1: null, player2: null });
    setCurrentTeam(null);
    setErrors({});
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) clearInterval(animationRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="text-yellow-500" size={48} />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              Football Team Randomizer
            </h1>
            <Trophy className="text-yellow-500" size={48} />
          </div>
          <p className="text-gray-600 text-lg">
            Enter two player names and let fate decide your teams!
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          {/* Player Input Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <Users className="text-blue-500" size={24} />
              Player Names
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Player 1
                </label>
                <input
                  type="text"
                  value={player1}
                  onChange={(e) => setPlayer1(e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.player1 ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter player 1 name"
                  disabled={isAnimating}
                />
                {errors.player1 && (
                  <p className="text-red-500 text-sm mt-1">{errors.player1}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Player 2
                </label>
                <input
                  type="text"
                  value={player2}
                  onChange={(e) => setPlayer2(e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.player2 ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter player 2 name"
                  disabled={isAnimating}
                />
                {errors.player2 && (
                  <p className="text-red-500 text-sm mt-1">{errors.player2}</p>
                )}
              </div>
            </div>
          </div>

          {/* Animation Display */}
          {(isAnimating || currentTeam) && (
            <div className="mb-8">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Timer className="text-white animate-spin" size={24} />
                  <h3 className="text-white text-xl font-semibold">
                    {isAnimating ? 'Selecting Teams...' : 'Team Selected!'}
                  </h3>
                </div>
                <div className="text-white min-h-[80px] flex flex-col items-center justify-center">
                  {currentTeam && (
                    <div className="animate-pulse flex flex-col items-center gap-3">
                      <img 
                        src={currentTeam.logo} 
                        alt={currentTeam.name}
                        className="w-16 h-16 object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      <span className="text-2xl font-bold">{currentTeam.name}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Team Assignments */}
          {assignedTeams.player1 && assignedTeams.player2 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Team Assignments
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white transform hover:scale-105 transition-transform">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-4">{player1}</h3>
                    <div className="mb-4">
                      <img 
                        src={assignedTeams.player1.logo} 
                        alt={assignedTeams.player1.name}
                        className="w-20 h-20 object-contain mx-auto mb-2"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                    <div className="text-xl font-bold">{assignedTeams.player1.name}</div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white transform hover:scale-105 transition-transform">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-4">{player2}</h3>
                    <div className="mb-4">
                      <img 
                        src={assignedTeams.player2.logo} 
                        alt={assignedTeams.player2.name}
                        className="w-20 h-20 object-contain mx-auto mb-2"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                    <div className="text-xl font-bold">{assignedTeams.player2.name}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Control Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            {!assignedTeams.player1 ? (
              <button
                onClick={startAnimation}
                disabled={isAnimating}
                className={`flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-white transition-all ${
                  isAnimating
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transform hover:scale-105'
                }`}
              >
                <Play size={20} />
                {isAnimating ? 'Selecting...' : 'Start Team Selection'}
              </button>
            ) : (
              <div className="flex flex-wrap gap-4">
                {attempts < MAX_ATTEMPTS && (
                  <button
                    onClick={tryAgain}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-semibold transition-all transform hover:scale-105"
                  >
                    <RotateCcw size={20} />
                    Try Again ({MAX_ATTEMPTS - attempts} left)
                  </button>
                )}
                
                <button
                  onClick={resetGame}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-lg font-semibold transition-all transform hover:scale-105"
                >
                  <Users size={20} />
                  New Game
                </button>
              </div>
            )}
          </div>
          

          {/* Attempts Counter */}
          {attempts > 0 && (
            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
                <span className="text-gray-600">Attempts used:</span>
                <span className="font-semibold text-gray-800">{attempts}/{MAX_ATTEMPTS}</span>
              </div>
            </div>
          )}
        </div>

        {/* Team Database Info */}
        {/* <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Available Teams</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            {Object.entries(TEAMS).map(([league, teams]) => (
              <div key={league} className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-700 mb-3 capitalize">
                  {league.replace(/([A-Z])/g, ' $1').trim()}
                </h4>
                <div className="space-y-2">
                  {teams.map((team, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <img 
                        src={team.logo} 
                        alt={team.name}
                        className="w-6 h-6 object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      <span className="text-gray-600">{team.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default FootballTeamRandomizer;