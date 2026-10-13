/**
 * KOMOREBI — Study Buddy & Focus Companion
 * Handcrafted Client-side Architecture (No AI bloat, fully offline & responsive)
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. DEFAULT DATA & STORAGE
     ========================================================================== */
  const STORAGE_KEYS = {
    SETTINGS: 'komorebi_settings_v1',
    DECKS: 'komorebi_decks_v1',
    QUIZZES: 'komorebi_quizzes_v1',
    LOGS: 'komorebi_logs_v1',
    STATS: 'komorebi_stats_v1',
  };

  const DEFAULT_SETTINGS = {
    focusMins: 25,
    shortBreakMins: 5,
    longBreakMins: 15,
    roundsCount: 4,
    theme: 'paper',
    buddy: 'cat',
    soundEnabled: true,
    tickEnabled: false,
    autostartEnabled: false,
  };

  const DEFAULT_DECKS = [
    {
      id: 'deck-psych-memory',
      title: 'Cognitive Science & Memory',
      description: 'Key principles of retention, active recall, and cognitive load theory.',
      color: '#C8553D',
      createdAt: '2026-10-01',
      cards: [
        {
          id: 'c1',
          front: 'What is the "Testing Effect" (Retrieval Practice)?',
          back: 'The phenomenon where actively retrieving information from memory produces stronger and more durable retention than passive restudying.',
          hint: 'Think about active search vs. passive reading',
          repetitions: 3,
          ease: 2.5
        },
        {
          id: 'c2',
          front: 'What does the Ebbinghaus Forgetting Curve demonstrate?',
          back: 'The exponential rate at which information is forgotten over time without periodic spaced review.',
          hint: 'Discovered in 1885 with nonsense syllables',
          repetitions: 2,
          ease: 2.3
        },
        {
          id: 'c3',
          front: 'Explain Miller\'s Law of Working Memory capacity.',
          back: 'The average number of objects an individual can hold in working memory is 7 ± 2 (commonly refined to 4 ± 1 for complex items).',
          hint: 'The magic number seven',
          repetitions: 4,
          ease: 2.6
        },
        {
          id: 'c4',
          front: 'What is the Zeigarnik Effect?',
          back: 'The tendency of the human brain to remember uncompleted or interrupted tasks better than completed ones.',
          hint: 'Why cliffhangers and unfinished to-do lists keep buzzing in your mind',
          repetitions: 1,
          ease: 2.1
        },
        {
          id: 'c5',
          front: 'What is "Interleaving" practice?',
          back: 'Mixing different topics or problem types during study rather than blocking one type at a time, leading to superior category discrimination.',
          hint: 'Opposite of blocked practice (e.g., ABCABC vs. AAABBBCCC)',
          repetitions: 2,
          ease: 2.4
        },
        {
          id: 'c6',
          front: 'What is Dual Coding Theory?',
          back: 'Allan Paivio\'s theory stating that both visual and verbal information are processed along distinct channels, reinforcing learning when paired.',
          hint: 'Words combined with meaningful diagrams',
          repetitions: 3,
          ease: 2.5
        }
      ]
    },
    {
      id: 'deck-arch-landmarks',
      title: 'World Architectural Monuments',
      description: 'Iconic architectural marvels, periods, and their structural innovations.',
      color: '#3D5A80',
      createdAt: '2026-10-02',
      cards: [
        {
          id: 'a1',
          front: 'Which ancient Roman building features an unreinforced concrete dome with a 9-meter oculus?',
          back: 'The Pantheon in Rome, Italy, completed under Emperor Hadrian around 125 AD.',
          hint: 'Temple to all gods with a hole in the ceiling',
          repetitions: 3,
          ease: 2.5
        },
        {
          id: 'a2',
          front: 'Who designed "Fallingwater" in Mill Run, Pennsylvania?',
          back: 'Frank Lloyd Wright (1935), a pinnacle of Organic Architecture built over a waterfall.',
          hint: 'Pioneer of Prairie School architecture',
          repetitions: 2,
          ease: 2.4
        },
        {
          id: 'a3',
          front: 'What architectural movement is Walter Gropius associated with founding in Weimar, Germany?',
          back: 'The Bauhaus movement (founded 1919), emphasizing the harmony of functional craftsmanship and mass production.',
          hint: 'Form follows function',
          repetitions: 4,
          ease: 2.7
        },
        {
          id: 'a4',
          front: 'Which iconic Catalan church has been under construction in Barcelona since 1882?',
          back: 'Basílica de la Sagrada Família, designed by Antoni Gaudí in modernisme/Gothic-revival style.',
          hint: 'Gaudí\'s life masterpiece',
          repetitions: 1,
          ease: 2.2
        }
      ]
    },
    {
      id: 'deck-travel-japanese',
      title: 'Everyday Japanese Phrases',
      description: 'Crucial polite conversational phrases for studying and navigating in Japan.',
      color: '#4A7C59',
      createdAt: '2026-10-03',
      cards: [
        {
          id: 'j1',
          front: 'Sumimasen (すみません)',
          back: '"Excuse me" or "I\'m sorry" (also frequently used to politely get a waiter\'s attention or thank someone for a favor).',
          hint: 'Multi-purpose daily courtesy word',
          repetitions: 4,
          ease: 2.8
        },
        {
          id: 'j2',
          front: 'Kore wa ikura desu ka? (これはいくらですか？)',
          back: '"How much is this?" — Essential for ordering or shopping.',
          hint: 'Asking the price of an item near you',
          repetitions: 3,
          ease: 2.5
        },
        {
          id: 'j3',
          front: 'O-kaikei kudasai (お会計ください)',
          back: '"The check / bill, please." — Used at restaurants and cafes.',
          hint: 'Paying the total bill',
          repetitions: 2,
          ease: 2.3
        },
        {
          id: 'j4',
          front: 'Daijoubu desu (大丈夫です)',
          back: '"It\'s okay", "I\'m fine", or "No thank you" (polite refusal).',
          hint: 'All good / everything is fine',
          repetitions: 3,
          ease: 2.5
        }
      ]
    }
  ];

  const DEFAULT_QUIZZES = [
    {
      id: 'quiz-cognitive-mastery',
      title: 'Cognitive Science & Memory Lab',
      subject: 'Psychology',
      bestScore: 100,
      timesTaken: 1,
      questions: [
        {
          prompt: 'Which practice has scientific consensus for yielding superior long-term retention compared to rereading?',
          options: [
            'Active Retrieval Practice (self-testing)',
            'Highlighting multiple textbook passages',
            'Cramming right before sleep',
            'Passive re-reading of summary notes'
          ],
          correctIndex: 0,
          explanation: 'Testing yourself forces the neural pathways to reconstruct memory traces, dramatically cementing knowledge over passive re-reading.'
        },
        {
          prompt: 'What did Hermann Ebbinghaus discover regarding memory retention without review?',
          options: [
            'Memory improves naturally over 48 hours',
            'Information is lost exponentially fast, mostly within the first 24-48 hours',
            'Forgetting only happens after 30 days',
            'Memory is completely linear and predictable'
          ],
          correctIndex: 1,
          explanation: 'The Forgetting Curve drops steeply immediately after learning; spaced repetition reviews flatten this curve over time.'
        },
        {
          prompt: 'Why does "Interleaving" practice work effectively?',
          options: [
            'It allows you to finish study sessions faster',
            'It trains the brain to recognize differences between problem classes and select suitable solutions',
            'It reduces total cognitive load to zero',
            'It completely eliminates the need for working memory'
          ],
          correctIndex: 1,
          explanation: 'Interleaving forces you to continuously discriminate between categories, rather than mindlessly applying the same formula repeatedly.'
        },
        {
          prompt: 'The Zeigarnik Effect suggests that humans recall which type of tasks best?',
          options: [
            'Tasks completed three weeks ago',
            'Tasks rewarded with tangible prizes',
            'Uncompleted or interrupted tasks',
            'Tasks reviewed strictly in chronological order'
          ],
          correctIndex: 2,
          explanation: 'Incomplete tasks maintain cognitive tension until closed, keeping them active in episodic memory.'
        }
      ]
    },
    {
      id: 'quiz-arch-mastery',
      title: 'Architectural Landmarks Test',
      subject: 'Architecture',
      bestScore: 75,
      timesTaken: 1,
      questions: [
        {
          prompt: 'What structural innovation distinguishes the Roman Pantheon\'s dome?',
          options: [
            'It is constructed using steel rebar skeleton',
            'It is the world\'s largest unreinforced concrete dome, with an open oculus',
            'It is supported entirely by wooden flying buttresses',
            'It was imported in carved sections from Greece'
          ],
          correctIndex: 1,
          explanation: 'Built nearly 2,000 years ago, Hadrian\'s Pantheon remains the largest unreinforced solid concrete dome in history.'
        },
        {
          prompt: 'Frank Lloyd Wright\'s "Fallingwater" is celebrated as a masterpiece of which architectural philosophy?',
          options: [
            'Brutalism',
            'Organic Architecture',
            'Art Deco',
            'International High-Tech'
          ],
          correctIndex: 1,
          explanation: 'Organic Architecture seeks total integration between human habitation and the natural topography, cantilevering directly over the river falls.'
        },
        {
          prompt: 'Who founded the revolutionary Bauhaus design school in 1919?',
          options: [
            'Le Corbusier',
            'Walter Gropius',
            'Mies van der Rohe',
            'Antoni Gaudí'
          ],
          correctIndex: 1,
          explanation: 'Walter Gropius founded the Bauhaus school in Weimar, aiming to merge fine arts, crafts, and industrial production.'
        }
      ]
    }
  ];

  /* ==========================================================================
     2. AUDIO ENGINE (Web Audio API Synthesizer)
     ========================================================================== */
  const AudioEngine = {
    ctx: null,
    ambientGain: null,
    ambientSource: null,
    currentTrack: 'off',

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    },

    // Gentle singing bowl / harmonic bell for timer completion
    playBowlBell() {
      if (!App.settings.soundEnabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // Singing bowl harmonic frequencies (Root 432Hz + warm harmonics)
      const freqs = [432, 864, 1296];
      const gains = [0.35, 0.15, 0.08];

      freqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(gains[idx], now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.5);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 3.6);
      });
    },

    // Tactile wood click for button / timer ticks
    playWoodTick() {
      if (!App.settings.tickEnabled && !App.settings.soundEnabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(680, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.035);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    },

    // Subtle paper flip sound
    playCardFlip() {
      if (!App.settings.soundEnabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.08;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(900, now);
      filter.Q.setValueAtTime(2.0, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
    },

    // Quiz positive chime
    playSuccessChime() {
      if (!App.settings.soundEnabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);

        gain.gain.setValueAtTime(0.18, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.5);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.55);
      });
    },

    // Quiz error tone
    playErrorTone() {
      if (!App.settings.soundEnabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.setValueAtTime(220, now + 0.12);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.45);
    },

    // Ambient Synthesizer (Rain, Coffee Library, Deep Noise)
    setAmbientTrack(trackName, volume = 0.3) {
      this.init();
      this.stopAmbient();

      if (trackName === 'off' || !this.ctx) {
        this.currentTrack = 'off';
        return;
      }

      this.currentTrack = trackName;
      const bufferSize = this.ctx.sampleRate * 3;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        if (trackName === 'brown' || trackName === 'cafe') {
          // Brown noise approximation
          data[i] = (lastOut + 0.02 * white) / 1.02;
          lastOut = data[i];
          data[i] *= 3.5;
        } else {
          // Pink noise for rain
          data[i] = white * 0.7;
        }
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      if (trackName === 'rain') {
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1400, this.ctx.currentTime);
      } else if (trackName === 'cafe') {
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(450, this.ctx.currentTime);
        filter.Q.setValueAtTime(0.8, this.ctx.currentTime);
      } else {
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(320, this.ctx.currentTime);
      }

      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(volume, this.ctx.currentTime);

      noise.connect(filter);
      filter.connect(this.ambientGain);
      this.ambientGain.connect(this.ctx.destination);

      noise.start();
      this.ambientSource = noise;
    },

    setAmbientVolume(vol) {
      if (this.ambientGain && this.ctx) {
        this.ambientGain.gain.setValueAtTime(vol, this.ctx.currentTime);
      }
    },

    stopAmbient() {
      if (this.ambientSource) {
        try {
          this.ambientSource.stop();
          this.ambientSource.disconnect();
        } catch (e) {
          // Ignore if already stopped
        }
        this.ambientSource = null;
      }
    }
  };

  /* ==========================================================================
     3. STUDY BUDDY MASCOTS & ANIMATIONS (Handcrafted SVG Companions)
     ========================================================================== */
  const BuddyData = {
    cat: {
      name: 'Mochi the Cat',
      status: 'Studying with you',
      quotes: {
        focusStart: 'Deep breath. 25 minutes of quiet craftsmanship begins.',
        focusMid: 'The mind wanders like a stray leaf; we gently guide it back.',
        break: 'Purr... stretch your shoulders! Time for a warm cup of tea.',
        quizStart: 'Let\'s see what stayed in memory. Trust your recall.',
        quizGreat: 'Magnificent retention! Your brain is purring with mastery.'
      },
      svg: `
        <svg class="mascot-svg" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Warm Cozy Cat Head -->
          <ellipse cx="60" cy="68" rx="42" ry="36" fill="#F4EDE4" stroke="#4A443C" stroke-width="3"/>
          <!-- Cat Ears -->
          <polygon points="26,45 38,15 54,38" fill="#F4EDE4" stroke="#4A443C" stroke-width="3" stroke-linejoin="round"/>
          <polygon points="31,40 38,22 48,36" fill="#E8B4A8"/>
          <polygon points="94,45 82,15 66,38" fill="#F4EDE4" stroke="#4A443C" stroke-width="3" stroke-linejoin="round"/>
          <polygon points="89,40 82,22 72,36" fill="#E8B4A8"/>
          <!-- Spectacles (Focus Glasses) -->
          <circle cx="45" cy="65" r="14" fill="#FFFFFF" fill-opacity="0.8" stroke="#3D5A80" stroke-width="2.5"/>
          <circle cx="75" cy="65" r="14" fill="#FFFFFF" fill-opacity="0.8" stroke="#3D5A80" stroke-width="2.5"/>
          <line x1="59" y1="65" x2="61" y2="65" stroke="#3D5A80" stroke-width="3"/>
          <!-- Eyes -->
          <ellipse class="mascot-eye" cx="45" cy="65" rx="3.5" ry="4" fill="#2B2824"/>
          <ellipse class="mascot-eye" cx="75" cy="65" rx="3.5" ry="4" fill="#2B2824"/>
          <!-- Nose & Whisker Smile -->
          <polygon points="60,74 57,71 63,71" fill="#C8553D"/>
          <path d="M56 75 C 56 78, 60 78, 60 76 C 60 78, 64 78, 64 75" stroke="#4A443C" stroke-width="2" fill="none" stroke-linecap="round"/>
          <!-- Whiskers -->
          <line x1="22" y1="68" x2="33" y2="70" stroke="#4A443C" stroke-width="2" stroke-linecap="round"/>
          <line x1="20" y1="76" x2="32" y2="75" stroke="#4A443C" stroke-width="2" stroke-linecap="round"/>
          <line x1="98" y1="68" x2="87" y2="70" stroke="#4A443C" stroke-width="2" stroke-linecap="round"/>
          <line x1="100" y1="76" x2="88" y2="75" stroke="#4A443C" stroke-width="2" stroke-linecap="round"/>
          <!-- Open Study Book -->
          <path d="M30 102 C 45 98, 58 100, 60 104 C 62 100, 75 98, 90 102 L 92 114 C 77 110, 62 112, 60 115 C 58 112, 43 110, 28 114 Z" fill="#FAF8F5" stroke="#4A443C" stroke-width="2.5"/>
          <line x1="60" y1="104" x2="60" y2="115" stroke="#4A443C" stroke-width="2"/>
        </svg>
      `
    },
    owl: {
      name: 'Hoot the Owl',
      status: 'Scholarly companion',
      quotes: {
        focusStart: 'Open your notebook. Wisdom gathers drop by drop.',
        focusMid: 'Focus is a muscle. You are training endurance right now.',
        break: 'Rest your eyes! Gaze into the far distance for 20 seconds.',
        quizStart: 'Time to test understanding against assumptions.',
        quizGreat: 'Superb mastery! Your intellectual foundation stands tall.'
      },
      svg: `
        <svg class="mascot-svg" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Owl Body -->
          <ellipse cx="60" cy="65" rx="38" ry="42" fill="#EAE2D5" stroke="#42392E" stroke-width="3"/>
          <path d="M40 70 Q 60 92 80 70" fill="#FAF6EE" stroke="#42392E" stroke-width="2"/>
          <!-- Feather tufts / ears -->
          <polygon points="34,35 48,22 52,38" fill="#D3C3AF" stroke="#42392E" stroke-width="2.5"/>
          <polygon points="86,35 72,22 68,38" fill="#D3C3AF" stroke="#42392E" stroke-width="2.5"/>
          <!-- Big Wise Eyes -->
          <circle cx="46" cy="56" r="15" fill="#FFFFFF" stroke="#42392E" stroke-width="2.5"/>
          <circle cx="74" cy="56" r="15" fill="#FFFFFF" stroke="#42392E" stroke-width="2.5"/>
          <circle class="mascot-eye" cx="46" cy="56" r="6" fill="#D49A3D"/>
          <circle cx="47" cy="55" r="2.5" fill="#1C1814"/>
          <circle class="mascot-eye" cx="74" cy="56" r="6" fill="#D49A3D"/>
          <circle cx="75" cy="55" r="2.5" fill="#1C1814"/>
          <!-- Beak -->
          <polygon points="60,62 55,70 65,70" fill="#D49A3D" stroke="#42392E" stroke-width="2"/>
          <!-- Little Scholarly Bowtie -->
          <polygon points="53,88 60,93 53,98" fill="#C8553D"/>
          <polygon points="67,88 60,93 67,98" fill="#C8553D"/>
          <circle cx="60" cy="93" r="3" fill="#A83E28"/>
        </svg>
      `
    },
    sprout: {
      name: 'Sprout the Plant',
      status: 'Quietly growing',
      quotes: {
        focusStart: 'Patience. Even the mightiest oak was once a patient seedling.',
        focusMid: 'Small continuous efforts compound exponentially.',
        break: 'Time for hydration! Drink a glass of fresh water.',
        quizStart: 'Let\'s check the roots of your knowledge.',
        quizGreat: 'Healthy blooms! Your study discipline is bearing fruit.'
      },
      svg: `
        <svg class="mascot-svg" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Ceramic Pot -->
          <polygon points="40,72 80,72 73,108 47,108" fill="#E89B84" stroke="#4A342B" stroke-width="3"/>
          <rect x="36" y="65" width="48" height="9" rx="3" fill="#D67B62" stroke="#4A342B" stroke-width="2.5"/>
          <!-- Cute face on pot -->
          <circle cx="53" cy="88" r="2.5" fill="#3D2B23"/>
          <circle cx="67" cy="88" r="2.5" fill="#3D2B23"/>
          <path d="M57 93 Q 60 97 63 93" stroke="#3D2B23" stroke-width="2" stroke-linecap="round" fill="none"/>
          <!-- Green Sprout Stem -->
          <path d="M60 65 Q 58 46 60 38" stroke="#4A7C59" stroke-width="4.5" stroke-linecap="round"/>
          <!-- Leaves -->
          <path d="M60 48 C 45 42 42 26 56 28 C 58 35 60 42 60 48 Z" fill="#679C75" stroke="#31553C" stroke-width="2.5"/>
          <path d="M60 42 C 75 36 78 20 64 22 C 62 30 60 38 60 42 Z" fill="#88B896" stroke="#31553C" stroke-width="2.5"/>
          <!-- Little dew drop -->
          <circle cx="50" cy="30" r="2" fill="#E8F4F8"/>
        </svg>
      `
    },
    shiba: {
      name: 'Pippin the Dog',
      status: 'Cheering you on',
      quotes: {
        focusStart: 'Let\'s dig into this task! Ready when you are.',
        focusMid: 'Stay focused! You\'re doing fantastic work today.',
        break: 'Wag wag! Time to get up, walk around, and reset.',
        quizStart: 'Quiz time! Let\'s fetch those correct answers.',
        quizGreat: 'Golden paws! 100% effort pays off every single time.'
      },
      svg: `
        <svg class="mascot-svg" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Shiba Head -->
          <ellipse cx="60" cy="65" rx="38" ry="34" fill="#DFA15B" stroke="#4A3928" stroke-width="3"/>
          <!-- White muzzle / cheeks -->
          <path d="M42 62 Q 60 74 78 62 Q 86 86 60 92 Q 34 86 42 62 Z" fill="#FFFDF8" stroke="#4A3928" stroke-width="2"/>
          <!-- Shiba Ears -->
          <polygon points="28,45 36,18 52,38" fill="#DFA15B" stroke="#4A3928" stroke-width="3" stroke-linejoin="round"/>
          <polygon points="34,40 38,26 48,37" fill="#E8B4A8"/>
          <polygon points="92,45 84,18 68,38" fill="#DFA15B" stroke="#4A3928" stroke-width="3" stroke-linejoin="round"/>
          <polygon points="86,40 82,26 72,37" fill="#E8B4A8"/>
          <!-- Eyebrow dots -->
          <ellipse cx="48" cy="50" rx="3.5" ry="2.5" fill="#FFFDF8"/>
          <ellipse cx="72" cy="50" rx="3.5" ry="2.5" fill="#FFFDF8"/>
          <!-- Eyes -->
          <ellipse class="mascot-eye" cx="48" cy="58" rx="3.5" ry="4" fill="#2B2824"/>
          <ellipse class="mascot-eye" cx="72" cy="58" rx="3.5" ry="4" fill="#2B2824"/>
          <!-- Nose & Smile -->
          <polygon points="60,68 56,64 64,64" fill="#2B2824"/>
          <path d="M57 69 Q 60 74 63 69" stroke="#2B2824" stroke-width="2" stroke-linecap="round" fill="none"/>
          <!-- Tiny red bandana -->
          <polygon points="46,92 60,104 74,92" fill="#C8553D" stroke="#4A3928" stroke-width="2"/>
        </svg>
      `
    }
  };

  /* ==========================================================================
     4. MAIN APP CONTROLLER
     ========================================================================== */
  const App = {
    settings: {},
    decks: [],
    quizzes: [],
    logs: [],
    stats: {
      totalFocusSeconds: 0,
      totalPomodoros: 0,
      totalCardsReviewed: 0,
      masteredCards: 0,
      quizzesTaken: 0,
      totalQuizScorePct: 0,
      lastStudyDate: null,
      streakDays: 1,
    },

    // Active Timer State
    timer: {
      mode: 'focus', // 'focus' | 'shortBreak' | 'longBreak'
      remainingSeconds: 25 * 60,
      totalSeconds: 25 * 60,
      isRunning: false,
      intervalId: null,
      roundIndex: 0, // 0 to settings.roundsCount - 1
      activeGoal: '',
      tickCount: 0
    },

    // Active Study Arena State (Flashcards)
    study: {
      activeDeck: null,
      cardsQueue: [],
      currentIndex: 0,
      isFlipped: false
    },

    // Active Quiz Player State
    quizPlayer: {
      activeQuiz: null,
      questionIndex: 0,
      score: 0,
      startTime: null,
      answersGiven: [],
      elapsedTimerId: null,
      elapsedSeconds: 0
    },

    init() {
      this.loadStorage();
      this.applyTheme(this.settings.theme);
      this.renderBuddy();
      this.initNavigation();
      this.initTimer();
      this.initFlashcards();
      this.initQuiz();
      this.initProgressLogs();
      this.initSettingsModal();
      this.initSoundscape();
      this.initKeyboardShortcuts();
      this.updateDailyStreak();
    },

    /* ------------------------------------------------------------------------
       STORAGE & BACKUP
       ------------------------------------------------------------------------ */
    loadStorage() {
      // Settings
      const savedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      this.settings = savedSettings ? { ...DEFAULT_SETTINGS, ...JSON.parse(savedSettings) } : { ...DEFAULT_SETTINGS };

      // Decks
      const savedDecks = localStorage.getItem(STORAGE_KEYS.DECKS);
      this.decks = savedDecks ? JSON.parse(savedDecks) : JSON.parse(JSON.stringify(DEFAULT_DECKS));

      // Quizzes
      const savedQuizzes = localStorage.getItem(STORAGE_KEYS.QUIZZES);
      this.quizzes = savedQuizzes ? JSON.parse(savedQuizzes) : JSON.parse(JSON.stringify(DEFAULT_QUIZZES));

      // Logs & Stats
      const savedLogs = localStorage.getItem(STORAGE_KEYS.LOGS);
      this.logs = savedLogs ? JSON.parse(savedLogs) : [];

      const savedStats = localStorage.getItem(STORAGE_KEYS.STATS);
      if (savedStats) {
        this.stats = { ...this.stats, ...JSON.parse(savedStats) };
      }
    },

    saveStorage(keys = ['SETTINGS', 'DECKS', 'QUIZZES', 'LOGS', 'STATS']) {
      if (keys.includes('SETTINGS')) localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(this.settings));
      if (keys.includes('DECKS')) localStorage.setItem(STORAGE_KEYS.DECKS, JSON.stringify(this.decks));
      if (keys.includes('QUIZZES')) localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(this.quizzes));
      if (keys.includes('LOGS')) localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(this.logs));
      if (keys.includes('STATS')) localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(this.stats));
    },

    updateDailyStreak() {
      const todayStr = new Date().toISOString().slice(0, 10);
      if (!this.stats.lastStudyDate) {
        this.stats.lastStudyDate = todayStr;
        this.stats.streakDays = 1;
      } else if (this.stats.lastStudyDate !== todayStr) {
        const lastDate = new Date(this.stats.lastStudyDate);
        const currentDate = new Date(todayStr);
        const diffDays = Math.round((currentDate - lastDate) / (1000 * 3600 * 24));
        if (diffDays === 1) {
          this.stats.streakDays += 1;
        } else if (diffDays > 1) {
          this.stats.streakDays = 1;
        }
        this.stats.lastStudyDate = todayStr;
      }
      this.saveStorage(['STATS']);
    },

    /* ------------------------------------------------------------------------
       THEMING & BUDDY
       ------------------------------------------------------------------------ */
    applyTheme(themeName) {
      document.body.setAttribute('data-theme', themeName);
      this.settings.theme = themeName;
      this.saveStorage(['SETTINGS']);
    },

    renderBuddy() {
      const buddyKey = this.settings.buddy || 'cat';
      const buddy = BuddyData[buddyKey] || BuddyData.cat;

      const mascotFrame = document.getElementById('mascot-frame');
      const buddyNameLabel = document.getElementById('buddy-name-label');
      const buddyStatusChip = document.getElementById('buddy-status-chip');
      const buddyQuote = document.getElementById('buddy-quote');

      if (mascotFrame) mascotFrame.innerHTML = buddy.svg;
      if (buddyNameLabel) buddyNameLabel.textContent = buddy.name;
      if (buddyStatusChip) buddyStatusChip.textContent = buddy.status;

      // Update quote based on active mode
      if (buddyQuote) {
        if (this.timer.mode === 'focus') {
          buddyQuote.textContent = `"${buddy.quotes.focusStart}"`;
        } else {
          buddyQuote.textContent = `"${buddy.quotes.break}"`;
        }
      }
    },

    speakBuddy(quoteKey) {
      const buddyKey = this.settings.buddy || 'cat';
      const buddy = BuddyData[buddyKey] || BuddyData.cat;
      const quoteEl = document.getElementById('buddy-quote');
      if (quoteEl && buddy.quotes[quoteKey]) {
        quoteEl.textContent = `"${buddy.quotes[quoteKey]}"`;
      }
    },

    /* ------------------------------------------------------------------------
       NAVIGATION
       ------------------------------------------------------------------------ */
    initNavigation() {
      const tabs = document.querySelectorAll('.nav-tab');
      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          tabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');

          const targetTab = tab.getAttribute('data-tab');
          document.querySelectorAll('.tab-view').forEach(view => view.classList.remove('active'));
          const activeView = document.getElementById(`view-${targetTab}`);
          if (activeView) activeView.classList.add('active');

          if (targetTab === 'flashcards') {
            this.renderDecksGrid();
          } else if (targetTab === 'quiz') {
            this.renderQuizzesGrid();
          } else if (targetTab === 'progress') {
            this.renderProgressStats();
          }
        });
      });

      // Quick Deck Review CTA from Buddy card
      const quickBtn = document.getElementById('buddy-quick-review-btn');
      if (quickBtn) {
        quickBtn.addEventListener('click', () => {
          const tabCards = document.getElementById('tab-flashcards');
          if (tabCards) tabCards.click();
          if (this.decks.length > 0) {
            this.startStudyDeck(this.decks[0]);
          }
        });
      }

      // Buddy Switch modal quick trigger
      const buddySwitchBtn = document.getElementById('buddy-switch-btn');
      if (buddySwitchBtn) {
        buddySwitchBtn.addEventListener('click', () => {
          document.getElementById('open-settings-btn').click();
        });
      }
    },

    /* ========================================================================
       5. POMODORO TIMER ENGINE
       ======================================================================== */
    initTimer() {
      const toggleBtn = document.getElementById('timer-toggle-btn');
      const resetBtn = document.getElementById('timer-reset-btn');
      const skipBtn = document.getElementById('timer-skip-btn');
      const modePills = document.querySelectorAll('.mode-pill');
      const taskInput = document.getElementById('current-task-input');
      const clearTaskBtn = document.getElementById('clear-task-btn');

      // Set initial duration from settings
      this.setTimerMode('focus', false);

      // Mode pill clicks
      modePills.forEach(pill => {
        pill.addEventListener('click', () => {
          const mode = pill.getAttribute('data-mode');
          this.setTimerMode(mode, false);
        });
      });

      // Play / Pause toggle
      toggleBtn.addEventListener('click', () => {
        AudioEngine.playWoodTick();
        if (this.timer.isRunning) {
          this.pauseTimer();
        } else {
          this.startTimer();
        }
      });

      // Reset
      resetBtn.addEventListener('click', () => {
        AudioEngine.playWoodTick();
        this.resetTimer();
      });

      // Skip
      skipBtn.addEventListener('click', () => {
        AudioEngine.playWoodTick();
        this.skipTimer();
      });

      // Goal Input
      taskInput.addEventListener('input', (e) => {
        this.timer.activeGoal = e.target.value.trim();
      });

      clearTaskBtn.addEventListener('click', () => {
        taskInput.value = '';
        this.timer.activeGoal = '';
      });

      this.updateTimerDisplay();
      this.updateRoundDots();
    },

    setTimerMode(mode, autostart = false) {
      this.pauseTimer();
      this.timer.mode = mode;

      let minutes = 25;
      if (mode === 'focus') minutes = parseInt(this.settings.focusMins, 10) || 25;
      if (mode === 'shortBreak') minutes = parseInt(this.settings.shortBreakMins, 10) || 5;
      if (mode === 'longBreak') minutes = parseInt(this.settings.longBreakMins, 10) || 15;

      this.timer.totalSeconds = minutes * 60;
      this.timer.remainingSeconds = this.timer.totalSeconds;

      // Update Mode Pills
      document.querySelectorAll('.mode-pill').forEach(pill => {
        const isMatch = pill.getAttribute('data-mode') === mode;
        pill.classList.toggle('active', isMatch);
        pill.setAttribute('aria-selected', isMatch ? 'true' : 'false');
      });

      // Update Status Label
      const statusLabel = document.getElementById('timer-status-label');
      if (statusLabel) {
        if (mode === 'focus') statusLabel.textContent = 'Focus Session';
        else if (mode === 'shortBreak') statusLabel.textContent = 'Short Rest';
        else statusLabel.textContent = 'Long Deep Rest';
      }

      // Update Dial Progress stroke color
      const dialProgress = document.getElementById('dial-progress');
      if (dialProgress) {
        if (mode === 'focus') dialProgress.style.stroke = 'var(--accent-focus)';
        else if (mode === 'shortBreak') dialProgress.style.stroke = 'var(--accent-break)';
        else dialProgress.style.stroke = 'var(--accent-long)';
      }

      this.updateTimerDisplay();
      this.speakBuddy(mode === 'focus' ? 'focusStart' : 'break');

      if (autostart) {
        this.startTimer();
      }
    },

    startTimer() {
      if (this.timer.isRunning) return;
      this.timer.isRunning = true;

      // Update button state
      const toggleBtn = document.getElementById('timer-toggle-btn');
      const toggleText = document.getElementById('toggle-text');
      const toggleIcon = document.getElementById('toggle-icon');

      if (toggleText) toggleText.textContent = 'Pause Focus';
      if (toggleIcon) {
        toggleIcon.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`;
      }
      if (toggleBtn) toggleBtn.classList.add('running');

      this.timer.intervalId = setInterval(() => {
        this.tick();
      }, 1000);
    },

    pauseTimer() {
      if (!this.timer.isRunning) return;
      this.timer.isRunning = false;
      clearInterval(this.timer.intervalId);
      this.timer.intervalId = null;

      const toggleText = document.getElementById('toggle-text');
      const toggleIcon = document.getElementById('toggle-icon');
      const toggleBtn = document.getElementById('timer-toggle-btn');

      if (toggleText) toggleText.textContent = 'Resume Focus';
      if (toggleIcon) {
        toggleIcon.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
      }
      if (toggleBtn) toggleBtn.classList.remove('running');
    },

    resetTimer() {
      this.pauseTimer();
      this.timer.remainingSeconds = this.timer.totalSeconds;
      const toggleText = document.getElementById('toggle-text');
      if (toggleText) toggleText.textContent = 'Begin Session';
      this.updateTimerDisplay();
    },

    skipTimer() {
      this.pauseTimer();
      this.handleSessionComplete(false);
    },

    tick() {
      if (this.timer.remainingSeconds > 0) {
        this.timer.remainingSeconds--;

        // Optional wood ticking sound
        if (this.settings.tickEnabled && this.timer.mode === 'focus') {
          AudioEngine.playWoodTick();
        }

        // Tally focus seconds for daily journal
        if (this.timer.mode === 'focus') {
          this.stats.totalFocusSeconds++;
          if (this.stats.totalFocusSeconds % 15 === 0) {
            this.saveStorage(['STATS']);
            this.updateTodayMetrics();
          }
        }

        this.updateTimerDisplay();
      } else {
        this.handleSessionComplete(true);
      }
    },

    handleSessionComplete(playChime = true) {
      this.pauseTimer();
      if (playChime) {
        AudioEngine.playBowlBell();
      }

      const completedMode = this.timer.mode;
      const durationMins = Math.round(this.timer.totalSeconds / 60);

      // Record to Log
      const newLog = {
        id: 'log-' + Date.now(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: new Date().toISOString().slice(0, 10),
        mode: completedMode === 'focus' ? 'Focus Block' : (completedMode === 'shortBreak' ? 'Short Rest' : 'Long Rest'),
        goal: this.timer.activeGoal || (completedMode === 'focus' ? 'Deep Work Session' : 'Mindful Rest'),
        duration: `${durationMins} min`
      };
      this.logs.unshift(newLog);
      if (this.logs.length > 50) this.logs.pop(); // keep last 50

      if (completedMode === 'focus') {
        this.stats.totalPomodoros++;
        this.timer.roundIndex++;
      }

      this.saveStorage(['LOGS', 'STATS']);
      this.updateTodayMetrics();
      this.renderSessionLogTable();

      // Cycle to next mode
      const totalRounds = parseInt(this.settings.roundsCount, 10) || 4;
      let nextMode = 'focus';

      if (completedMode === 'focus') {
        if (this.timer.roundIndex >= totalRounds) {
          nextMode = 'longBreak';
          this.timer.roundIndex = 0; // reset rounds
        } else {
          nextMode = 'shortBreak';
        }
      } else {
        // Break ended -> go back to focus
        nextMode = 'focus';
      }

      this.updateRoundDots();
      const shouldAutostart = this.settings.autostartEnabled;
      this.setTimerMode(nextMode, shouldAutostart);
    },

    updateTimerDisplay() {
      const minutes = Math.floor(this.timer.remainingSeconds / 60);
      const seconds = this.timer.remainingSeconds % 60;
      const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

      const display = document.getElementById('timer-display');
      if (display) display.textContent = formatted;

      // Update Browser Title
      const modeLabel = this.timer.mode === 'focus' ? 'Focus' : 'Break';
      document.title = `(${formatted}) ${modeLabel} — Komorebi`;

      // Update Circular Progress Ring
      const progressCircle = document.getElementById('dial-progress');
      if (progressCircle && this.timer.totalSeconds > 0) {
        const circumference = 879.6; // 2 * PI * 140
        const fraction = this.timer.remainingSeconds / this.timer.totalSeconds;
        const offset = circumference * (1 - fraction);
        progressCircle.style.strokeDashoffset = offset;
      }
    },

    updateRoundDots() {
      const container = document.getElementById('round-dots');
      if (!container) return;
      const totalRounds = parseInt(this.settings.roundsCount, 10) || 4;
      container.innerHTML = '';

      for (let i = 0; i < totalRounds; i++) {
        const dot = document.createElement('span');
        dot.className = 'round-dot';
        if (i < this.timer.roundIndex) {
          dot.classList.add('done');
        } else if (i === this.timer.roundIndex) {
          dot.classList.add('active');
        }
        container.appendChild(dot);
      }
    },

    updateTodayMetrics() {
      const todayMinutes = Math.floor(this.stats.totalFocusSeconds / 60);
      const todayMinsEl = document.getElementById('today-minutes');
      const todayPomodorosEl = document.getElementById('today-pomodoros');
      const todayCardsEl = document.getElementById('today-cards');

      if (todayMinsEl) todayMinsEl.textContent = `${todayMinutes}m`;
      if (todayPomodorosEl) todayPomodorosEl.textContent = this.stats.totalPomodoros;
      if (todayCardsEl) todayCardsEl.textContent = this.stats.totalCardsReviewed;
    },

    /* ========================================================================
       6. FLASHCARDS SYSTEM & 3D STUDY ARENA
       ======================================================================== */
    initFlashcards() {
      this.renderDecksGrid();

      // New Deck Button
      const createDeckBtn = document.getElementById('create-deck-btn');
      createDeckBtn.addEventListener('click', () => {
        this.openDeckEditor();
      });

      // Exit Study Arena
      const exitStudyBtn = document.getElementById('exit-study-btn');
      exitStudyBtn.addEventListener('click', () => {
        this.exitStudyArena();
      });

      // 3D Card Flip
      const cardWrap = document.getElementById('flashcard-wrap');
      cardWrap.addEventListener('click', () => {
        this.flipCard();
      });

      // Hint reveal
      const hintBtn = document.getElementById('card-hint-btn');
      hintBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const hintText = document.getElementById('card-hint-text');
        hintText.classList.toggle('hidden');
      });

      // Confidence Rating Buttons (Again, Hard, Good, Easy)
      const ratingBtns = document.querySelectorAll('.rating-btn');
      ratingBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const rating = btn.getAttribute('data-rating');
          this.rateCard(rating);
        });
      });

      // Shuffle deck
      const shuffleBtn = document.getElementById('shuffle-deck-btn');
      shuffleBtn.addEventListener('click', () => {
        this.shuffleCurrentDeck();
      });

      // Edit Current Card directly from arena
      const editCardBtn = document.getElementById('edit-current-card-btn');
      editCardBtn.addEventListener('click', () => {
        const curCard = this.study.cardsQueue[this.study.currentIndex];
        if (curCard) {
          this.openCardEditor(curCard, this.study.activeDeck);
        }
      });

      // Deck Manager Modal
      const closeDeckManageBtn = document.getElementById('close-deck-manage-btn');
      closeDeckManageBtn.addEventListener('click', () => {
        document.getElementById('deck-manage-overlay').classList.add('hidden');
      });

      const openAddCardBtn = document.getElementById('open-add-card-btn');
      openAddCardBtn.addEventListener('click', () => {
        this.openCardEditor(null, this.managingDeck);
      });

      // Deck Convert to Quiz Button
      const deckConvertBtn = document.getElementById('deck-convert-quiz-btn');
      deckConvertBtn.addEventListener('click', () => {
        if (this.managingDeck) {
          this.convertDeckToQuiz(this.managingDeck);
        }
      });

      // Delete deck
      const deleteDeckBtn = document.getElementById('delete-deck-btn');
      deleteDeckBtn.addEventListener('click', () => {
        if (this.managingDeck && confirm(`Delete deck "${this.managingDeck.title}" and all its cards?`)) {
          this.decks = this.decks.filter(d => d.id !== this.managingDeck.id);
          this.saveStorage(['DECKS']);
          document.getElementById('deck-manage-overlay').classList.add('hidden');
          this.renderDecksGrid();
        }
      });

      // Card Editor Modal Form
      const cardForm = document.getElementById('card-editor-form');
      cardForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.saveCardFromEditor();
      });

      const cancelCardBtn = document.getElementById('cancel-card-editor-btn');
      const closeCardEditorBtn = document.getElementById('close-card-editor-btn');
      [cancelCardBtn, closeCardEditorBtn].forEach(b => {
        b.addEventListener('click', () => {
          document.getElementById('card-editor-modal').classList.add('hidden');
        });
      });

      // Deck Editor Modal Form
      const deckForm = document.getElementById('deck-editor-form');
      deckForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.saveDeckFromEditor();
      });

      const cancelDeckBtn = document.getElementById('cancel-deck-editor-btn');
      const closeDeckEditorBtn = document.getElementById('close-deck-editor-btn');
      [cancelDeckBtn, closeDeckEditorBtn].forEach(b => {
        b.addEventListener('click', () => {
          document.getElementById('deck-editor-modal').classList.add('hidden');
        });
      });

      // Deck Color Picker Swatches
      const swatches = document.querySelectorAll('#deck-color-picker .color-swatch');
      swatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
          swatches.forEach(s => s.classList.remove('active'));
          swatch.classList.add('active');
        });
      });

      // Backup / Import / Export Deck
      const backupBtn = document.getElementById('import-export-deck-btn');
      backupBtn.addEventListener('click', () => {
        document.getElementById('backup-modal').classList.remove('hidden');
      });

      document.getElementById('close-backup-modal-btn').addEventListener('click', () => {
        document.getElementById('backup-modal').classList.add('hidden');
      });

      document.getElementById('download-json-btn').addEventListener('click', () => {
        this.downloadBackupJSON();
      });

      document.getElementById('import-json-btn').addEventListener('click', () => {
        this.importBackupJSON();
      });
    },

    renderDecksGrid() {
      const grid = document.getElementById('decks-grid');
      if (!grid) return;
      grid.innerHTML = '';

      // Update badge count in navbar
      let totalCards = 0;
      this.decks.forEach(d => totalCards += (d.cards ? d.cards.length : 0));
      const badge = document.getElementById('badge-card-count');
      if (badge) badge.textContent = totalCards;

      if (this.decks.length === 0) {
        grid.innerHTML = `
          <div class="empty-table-cell" style="grid-column: 1 / -1; padding: 48px; text-align: center;">
            <p>No study decks found. Click "+ New Deck" above to create your first flashcard set!</p>
          </div>
        `;
        return;
      }

      this.decks.forEach(deck => {
        const cardCount = deck.cards ? deck.cards.length : 0;
        const deckEl = document.createElement('div');
        deckEl.className = 'deck-card';
        deckEl.innerHTML = `
          <div class="deck-color-strip" style="background-color: ${deck.color || '#C8553D'};"></div>
          <div class="deck-card-top">
            <div class="deck-tag-row">
              <span class="deck-card-badge">${cardCount} ${cardCount === 1 ? 'card' : 'cards'}</span>
              <button class="btn btn-subtle small manage-deck-btn" title="Manage Cards">Edit Deck</button>
            </div>
            <h3 class="deck-title">${escapeHTML(deck.title)}</h3>
            <p class="deck-description">${escapeHTML(deck.description || 'No description provided.')}</p>
          </div>
          <div class="deck-card-bottom">
            <span style="font-size: 0.78rem; color: var(--text-muted); font-family: var(--font-mono);">
              ${cardCount > 0 ? 'Ready to Review' : 'Empty Deck'}
            </span>
            <div class="deck-actions-group">
              <button class="btn btn-primary small study-deck-btn" ${cardCount === 0 ? 'disabled' : ''}>
                Study Now &rarr;
              </button>
            </div>
          </div>
        `;

        // Study button click
        deckEl.querySelector('.study-deck-btn').addEventListener('click', (e) => {
          e.stopPropagation();
          this.startStudyDeck(deck);
        });

        // Manage button click
        deckEl.querySelector('.manage-deck-btn').addEventListener('click', (e) => {
          e.stopPropagation();
          this.openDeckManager(deck);
        });

        // Whole card click
        deckEl.addEventListener('click', () => {
          if (cardCount > 0) this.startStudyDeck(deck);
          else this.openDeckManager(deck);
        });

        grid.appendChild(deckEl);
      });
    },

    startStudyDeck(deck) {
      if (!deck.cards || deck.cards.length === 0) {
        alert('This deck has no cards yet. Click "Edit Deck" to add some cards first!');
        return;
      }

      this.study.activeDeck = deck;
      this.study.cardsQueue = [...deck.cards];
      this.study.currentIndex = 0;
      this.study.isFlipped = false;

      // Show Arena, Hide Decks
      document.querySelector('.deck-browser-header').classList.add('hidden');
      document.getElementById('decks-grid').classList.add('hidden');
      document.getElementById('study-arena').classList.remove('hidden');

      const deckNameEl = document.getElementById('arena-deck-name');
      if (deckNameEl) deckNameEl.textContent = deck.title;

      this.renderCurrentStudyCard();
    },

    exitStudyArena() {
      document.querySelector('.deck-browser-header').classList.remove('hidden');
      document.getElementById('decks-grid').classList.remove('hidden');
      document.getElementById('study-arena').classList.add('hidden');
      this.renderDecksGrid();
    },

    renderCurrentStudyCard() {
      const card = this.study.cardsQueue[this.study.currentIndex];
      if (!card) {
        // Study session complete
        this.finishStudySession();
        return;
      }

      this.study.isFlipped = false;
      const wrap = document.getElementById('flashcard-wrap');
      if (wrap) wrap.classList.remove('flipped');

      const frontText = document.getElementById('card-front-text');
      const backText = document.getElementById('card-back-text');
      const hintWrap = document.getElementById('card-hint-wrap');
      const hintText = document.getElementById('card-hint-text');

      if (frontText) frontText.textContent = card.front;
      if (backText) backText.textContent = card.back;

      if (card.hint) {
        if (hintWrap) hintWrap.classList.remove('hidden');
        if (hintText) {
          hintText.textContent = card.hint;
          hintText.classList.add('hidden'); // hidden until user clicks
        }
      } else {
        if (hintWrap) hintWrap.classList.add('hidden');
      }

      // Progress bar & indicators
      const currentNum = this.study.currentIndex + 1;
      const totalNum = this.study.cardsQueue.length;
      const pct = Math.round((currentNum / totalNum) * 100);

      const progressIndicator = document.getElementById('arena-progress-indicator');
      const progressFill = document.getElementById('arena-progress-fill');

      if (progressIndicator) progressIndicator.textContent = `Card ${currentNum} of ${totalNum}`;
      if (progressFill) progressFill.style.width = `${pct}%`;
    },

    flipCard() {
      AudioEngine.playCardFlip();
      this.study.isFlipped = !this.study.isFlipped;
      const wrap = document.getElementById('flashcard-wrap');
      if (wrap) wrap.classList.toggle('flipped', this.study.isFlipped);
    },

    rateCard(rating) {
      AudioEngine.playWoodTick();
      this.stats.totalCardsReviewed++;
      if (rating === 'easy' || rating === 'good') {
        this.stats.masteredCards++;
      }
      this.saveStorage(['STATS']);
      this.updateTodayMetrics();

      const currentCard = this.study.cardsQueue[this.study.currentIndex];
      if (currentCard) {
        currentCard.repetitions = (currentCard.repetitions || 0) + 1;
        if (rating === 'again') {
          // Re-queue card to end of deck session
          this.study.cardsQueue.push(currentCard);
        }
      }

      this.study.currentIndex++;
      this.renderCurrentStudyCard();
    },

    finishStudySession() {
      AudioEngine.playBowlBell();
      this.speakBuddy('quizGreat');
      alert(`Well done! You reviewed all cards in "${this.study.activeDeck.title}".`);
      this.exitStudyArena();
    },

    shuffleCurrentDeck() {
      AudioEngine.playCardFlip();
      const currentCard = this.study.cardsQueue[this.study.currentIndex];
      const rest = this.study.cardsQueue.slice(this.study.currentIndex);
      for (let i = rest.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [rest[i], rest[j]] = [rest[j], rest[i]];
      }
      this.study.cardsQueue = [...this.study.cardsQueue.slice(0, this.study.currentIndex), ...rest];
      this.renderCurrentStudyCard();
    },

    /* Deck Manager Modal */
    openDeckManager(deck) {
      this.managingDeck = deck;
      const modal = document.getElementById('deck-manage-overlay');
      const title = document.getElementById('manage-deck-title');
      const count = document.getElementById('manage-deck-count');
      const list = document.getElementById('manage-cards-list');

      if (title) title.textContent = deck.title;
      if (count) count.textContent = `${deck.cards ? deck.cards.length : 0} cards`;

      list.innerHTML = '';
      if (!deck.cards || deck.cards.length === 0) {
        list.innerHTML = `<p style="padding: 24px; text-align: center; color: var(--text-muted); font-style: italic;">No cards yet. Click "+ Add Card" above!</p>`;
      } else {
        deck.cards.forEach((card, index) => {
          const row = document.createElement('div');
          row.className = 'manage-card-row';
          row.innerHTML = `
            <div class="manage-card-texts">
              <div class="manage-card-front">${escapeHTML(card.front)}</div>
              <div class="manage-card-back">${escapeHTML(card.back)}</div>
            </div>
            <div class="manage-card-actions">
              <button class="btn btn-secondary small edit-card-item-btn" title="Edit Card">Edit</button>
              <button class="btn btn-danger-subtle small delete-card-item-btn" title="Delete Card">&times;</button>
            </div>
          `;

          row.querySelector('.edit-card-item-btn').addEventListener('click', () => {
            this.openCardEditor(card, deck);
          });

          row.querySelector('.delete-card-item-btn').addEventListener('click', () => {
            if (confirm('Delete this flashcard?')) {
              deck.cards.splice(index, 1);
              this.saveStorage(['DECKS']);
              this.openDeckManager(deck);
            }
          });

          list.appendChild(row);
        });
      }

      modal.classList.remove('hidden');
    },

    /* Card Editor */
    openCardEditor(card = null, deck = null) {
      this.editingCard = card;
      this.editingCardDeck = deck || this.managingDeck || this.decks[0];

      const modal = document.getElementById('card-editor-modal');
      const title = document.getElementById('card-editor-title');
      const frontInput = document.getElementById('card-front-input');
      const backInput = document.getElementById('card-back-input');
      const hintInput = document.getElementById('card-hint-input');

      if (card) {
        title.textContent = 'Edit Flashcard';
        frontInput.value = card.front;
        backInput.value = card.back;
        hintInput.value = card.hint || '';
      } else {
        title.textContent = 'Add New Flashcard';
        frontInput.value = '';
        backInput.value = '';
        hintInput.value = '';
      }

      modal.classList.remove('hidden');
      frontInput.focus();
    },

    saveCardFromEditor() {
      const front = document.getElementById('card-front-input').value.trim();
      const back = document.getElementById('card-back-input').value.trim();
      const hint = document.getElementById('card-hint-input').value.trim();

      if (!front || !back) return;

      if (this.editingCard) {
        this.editingCard.front = front;
        this.editingCard.back = back;
        this.editingCard.hint = hint;
      } else {
        const newCard = {
          id: 'card-' + Date.now(),
          front,
          back,
          hint,
          repetitions: 0,
          ease: 2.5
        };
        if (!this.editingCardDeck.cards) this.editingCardDeck.cards = [];
        this.editingCardDeck.cards.push(newCard);
      }

      this.saveStorage(['DECKS']);
      document.getElementById('card-editor-modal').classList.add('hidden');

      if (this.managingDeck) {
        this.openDeckManager(this.managingDeck);
      }
      this.renderDecksGrid();
      if (!document.getElementById('study-arena').classList.contains('hidden')) {
        this.renderCurrentStudyCard();
      }
    },

    /* Deck Editor */
    openDeckEditor(deck = null) {
      this.editingDeck = deck;
      const modal = document.getElementById('deck-editor-modal');
      const titleEl = document.getElementById('deck-editor-title');
      const titleInput = document.getElementById('deck-title-input');
      const descInput = document.getElementById('deck-desc-input');

      if (deck) {
        titleEl.textContent = 'Edit Deck Details';
        titleInput.value = deck.title;
        descInput.value = deck.description || '';
      } else {
        titleEl.textContent = 'Create New Study Deck';
        titleInput.value = '';
        descInput.value = '';
      }

      modal.classList.remove('hidden');
      titleInput.focus();
    },

    saveDeckFromEditor() {
      const title = document.getElementById('deck-title-input').value.trim();
      const desc = document.getElementById('deck-desc-input').value.trim();
      const activeSwatch = document.querySelector('#deck-color-picker .color-swatch.active');
      const color = activeSwatch ? activeSwatch.getAttribute('data-color') : '#C8553D';

      if (!title) return;

      if (this.editingDeck) {
        this.editingDeck.title = title;
        this.editingDeck.description = desc;
        this.editingDeck.color = color;
      } else {
        const newDeck = {
          id: 'deck-' + Date.now(),
          title,
          description: desc,
          color,
          createdAt: new Date().toISOString().slice(0, 10),
          cards: []
        };
        this.decks.unshift(newDeck);
      }

      this.saveStorage(['DECKS']);
      document.getElementById('deck-editor-modal').classList.add('hidden');
      this.renderDecksGrid();
    },

    /* Backup JSON export/import */
    downloadBackupJSON() {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify({
        decks: this.decks,
        quizzes: this.quizzes,
        settings: this.settings,
        exportDate: new Date().toISOString()
      }, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `komorebi_study_backup_${Date.now()}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    },

    importBackupJSON() {
      const jsonText = document.getElementById('import-json-input').value.trim();
      if (!jsonText) return;
      try {
        const parsed = JSON.parse(jsonText);
        if (parsed.decks && Array.isArray(parsed.decks)) {
          this.decks = parsed.decks;
        }
        if (parsed.quizzes && Array.isArray(parsed.quizzes)) {
          this.quizzes = parsed.quizzes;
        }
        this.saveStorage(['DECKS', 'QUIZZES']);
        alert('Data imported successfully!');
        document.getElementById('backup-modal').classList.add('hidden');
        this.renderDecksGrid();
        this.renderQuizzesGrid();
      } catch (err) {
        alert('Invalid JSON file format. Please check the content and try again.');
      }
    },

    /* ========================================================================
       7. QUIZ LAB ENGINE (Self-testing & Quiz Creator)
       ======================================================================== */
    initQuiz() {
      this.renderQuizzesGrid();

      // Create Custom Quiz button
      const createQuizBtn = document.getElementById('create-quiz-btn');
      createQuizBtn.addEventListener('click', () => {
        this.openQuizEditor();
      });

      // Quick Deck-to-Quiz button in header
      const deckQuickQuizBtn = document.getElementById('quiz-from-deck-quick-btn');
      deckQuickQuizBtn.addEventListener('click', () => {
        if (this.decks.length === 0) {
          alert('Create a flashcard deck first!');
          return;
        }
        this.convertDeckToQuiz(this.decks[0]);
      });

      // Exit Quiz button
      const exitQuizBtn = document.getElementById('exit-quiz-btn');
      exitQuizBtn.addEventListener('click', () => {
        if (confirm('Exit active quiz? Your current progress will not be saved.')) {
          this.exitQuizPlayer();
        }
      });

      // Next Question button
      const nextBtn = document.getElementById('next-question-btn');
      nextBtn.addEventListener('click', () => {
        this.goToNextQuizQuestion();
      });

      // Retake quiz & Return to Hub buttons
      const retakeBtn = document.getElementById('retake-quiz-btn');
      retakeBtn.addEventListener('click', () => {
        if (this.quizPlayer.activeQuiz) {
          this.startQuiz(this.quizPlayer.activeQuiz);
        }
      });

      const returnHubBtn = document.getElementById('return-to-quiz-hub-btn');
      returnHubBtn.addEventListener('click', () => {
        this.exitQuizPlayer();
      });

      // Quiz Editor Modal Handlers
      const closeQuizModalBtn = document.getElementById('close-quiz-editor-btn');
      const cancelQuizModalBtn = document.getElementById('cancel-quiz-editor-btn');
      [closeQuizModalBtn, cancelQuizModalBtn].forEach(b => {
        b.addEventListener('click', () => {
          document.getElementById('quiz-editor-modal').classList.add('hidden');
        });
      });

      const addBuilderQBtn = document.getElementById('add-builder-q-btn');
      addBuilderQBtn.addEventListener('click', () => {
        this.addQuestionBlockToBuilder();
      });

      const quizForm = document.getElementById('quiz-editor-form');
      quizForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.saveQuizFromEditor();
      });
    },

    renderQuizzesGrid() {
      const grid = document.getElementById('quizzes-grid');
      if (!grid) return;
      grid.innerHTML = '';

      if (this.quizzes.length === 0) {
        grid.innerHTML = `
          <div class="empty-table-cell" style="grid-column: 1 / -1; padding: 48px; text-align: center;">
            <p>No quizzes created yet. Click "Create New Quiz" or convert any flashcard deck!</p>
          </div>
        `;
        return;
      }

      this.quizzes.forEach(quiz => {
        const qCount = quiz.questions ? quiz.questions.length : 0;
        const card = document.createElement('div');
        card.className = 'quiz-card';
        card.innerHTML = `
          <div>
            <div class="quiz-card-meta">
              <span class="quiz-subject-tag">${escapeHTML(quiz.subject || 'General')}</span>
              <span class="quiz-questions-count">${qCount} Questions</span>
            </div>
            <h3 class="quiz-card-title">${escapeHTML(quiz.title)}</h3>
            <div class="quiz-score-history">
              ${quiz.timesTaken ? `Best Score: ${quiz.bestScore}% (${quiz.timesTaken} ${quiz.timesTaken === 1 ? 'try' : 'tries'})` : 'Not yet attempted'}
            </div>
          </div>
          <div class="quiz-card-actions">
            <button class="btn btn-secondary small delete-quiz-btn">Delete</button>
            <button class="btn btn-primary small start-quiz-btn" ${qCount === 0 ? 'disabled' : ''}>
              Take Quiz &rarr;
            </button>
          </div>
        `;

        card.querySelector('.start-quiz-btn').addEventListener('click', () => {
          this.startQuiz(quiz);
        });

        card.querySelector('.delete-quiz-btn').addEventListener('click', (e) => {
          e.stopPropagation();
          if (confirm(`Delete quiz "${quiz.title}"?`)) {
            this.quizzes = this.quizzes.filter(q => q.id !== quiz.id);
            this.saveStorage(['QUIZZES']);
            this.renderQuizzesGrid();
          }
        });

        grid.appendChild(card);
      });
    },

    startQuiz(quiz) {
      if (!quiz.questions || quiz.questions.length === 0) {
        alert('This quiz has no questions yet!');
        return;
      }

      this.quizPlayer.activeQuiz = quiz;
      this.quizPlayer.questionIndex = 0;
      this.quizPlayer.score = 0;
      this.quizPlayer.startTime = Date.now();
      this.quizPlayer.answersGiven = [];
      this.quizPlayer.elapsedSeconds = 0;

      // Swap views
      document.getElementById('quiz-hub').classList.add('hidden');
      document.getElementById('quiz-summary-screen').classList.add('hidden');
      document.getElementById('quiz-player').classList.remove('hidden');

      const titleBadge = document.getElementById('player-quiz-title');
      if (titleBadge) titleBadge.textContent = quiz.title;

      // Start elapsed timer
      if (this.quizPlayer.elapsedTimerId) clearInterval(this.quizPlayer.elapsedTimerId);
      this.quizPlayer.elapsedTimerId = setInterval(() => {
        this.quizPlayer.elapsedSeconds++;
        const mins = Math.floor(this.quizPlayer.elapsedSeconds / 60);
        const secs = this.quizPlayer.elapsedSeconds % 60;
        const el = document.getElementById('quiz-elapsed-time');
        if (el) el.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      }, 1000);

      this.speakBuddy('quizStart');
      this.renderQuizQuestion();
    },

    exitQuizPlayer() {
      if (this.quizPlayer.elapsedTimerId) {
        clearInterval(this.quizPlayer.elapsedTimerId);
        this.quizPlayer.elapsedTimerId = null;
      }
      document.getElementById('quiz-player').classList.add('hidden');
      document.getElementById('quiz-summary-screen').classList.add('hidden');
      document.getElementById('quiz-hub').classList.remove('hidden');
      this.renderQuizzesGrid();
    },

    renderQuizQuestion() {
      const q = this.quizPlayer.activeQuiz.questions[this.quizPlayer.questionIndex];
      const totalQ = this.quizPlayer.activeQuiz.questions.length;
      const currentQNum = this.quizPlayer.questionIndex + 1;

      // Update counters
      const counterBadge = document.getElementById('player-quiz-counter');
      const qTag = document.getElementById('player-q-tag');
      const qText = document.getElementById('player-question-text');
      const fill = document.getElementById('quiz-progress-fill');

      if (counterBadge) counterBadge.textContent = `Question ${currentQNum} of ${totalQ}`;
      if (qTag) qTag.textContent = `Question ${currentQNum}`;
      if (qText) qText.textContent = q.prompt;
      if (fill) fill.style.width = `${Math.round((currentQNum / totalQ) * 100)}%`;

      // Hide feedback box
      const feedbackBox = document.getElementById('player-feedback-box');
      if (feedbackBox) feedbackBox.classList.add('hidden');

      // Populate Options
      const list = document.getElementById('player-options-list');
      list.innerHTML = '';
      const letters = ['A', 'B', 'C', 'D'];

      q.options.forEach((optText, idx) => {
        const item = document.createElement('div');
        item.className = 'quiz-option-item';
        item.innerHTML = `
          <span class="option-letter-badge">${letters[idx] || (idx + 1)}</span>
          <span class="option-text-label">${escapeHTML(optText)}</span>
        `;

        item.addEventListener('click', () => {
          this.selectQuizAnswer(idx, q.correctIndex, q.explanation);
        });

        list.appendChild(item);
      });
    },

    selectQuizAnswer(chosenIdx, correctIdx, explanation) {
      const list = document.getElementById('player-options-list');
      const optionItems = list.querySelectorAll('.quiz-option-item');

      // Disable all choices
      optionItems.forEach(item => item.classList.add('disabled'));

      const isCorrect = chosenIdx === correctIdx;
      if (isCorrect) {
        this.quizPlayer.score++;
        optionItems[chosenIdx].classList.add('correct');
        AudioEngine.playSuccessChime();
      } else {
        optionItems[chosenIdx].classList.add('incorrect');
        // Highlight correct option
        if (optionItems[correctIdx]) optionItems[correctIdx].classList.add('correct');
        AudioEngine.playErrorTone();
      }

      // Show Feedback Box
      const feedbackBox = document.getElementById('player-feedback-box');
      const statusBadge = document.getElementById('feedback-status-badge');
      const expText = document.getElementById('feedback-explanation-text');

      statusBadge.textContent = isCorrect ? '✓ Correct! Great recall.' : '✕ Incorrect';
      statusBadge.className = `feedback-status ${isCorrect ? 'correct' : 'incorrect'}`;
      expText.textContent = explanation || (isCorrect ? 'Well reasoned!' : 'Review this concept carefully.');

      feedbackBox.classList.remove('hidden');
    },

    goToNextQuizQuestion() {
      this.quizPlayer.questionIndex++;
      if (this.quizPlayer.questionIndex < this.quizPlayer.activeQuiz.questions.length) {
        this.renderQuizQuestion();
      } else {
        this.finishQuizSession();
      }
    },

    finishQuizSession() {
      if (this.quizPlayer.elapsedTimerId) {
        clearInterval(this.quizPlayer.elapsedTimerId);
        this.quizPlayer.elapsedTimerId = null;
      }

      AudioEngine.playBowlBell();

      const totalQ = this.quizPlayer.activeQuiz.questions.length;
      const scorePct = Math.round((this.quizPlayer.score / totalQ) * 100);

      // Update Quiz records
      this.quizPlayer.activeQuiz.timesTaken = (this.quizPlayer.activeQuiz.timesTaken || 0) + 1;
      if (!this.quizPlayer.activeQuiz.bestScore || scorePct > this.quizPlayer.activeQuiz.bestScore) {
        this.quizPlayer.activeQuiz.bestScore = scorePct;
      }

      this.stats.quizzesTaken++;
      this.stats.totalQuizScorePct += scorePct;
      this.saveStorage(['QUIZZES', 'STATS']);

      // Switch to Summary Screen
      document.getElementById('quiz-player').classList.add('hidden');
      const summaryScreen = document.getElementById('quiz-summary-screen');
      summaryScreen.classList.remove('hidden');

      const pctEl = document.getElementById('summary-score-pct');
      const ratioEl = document.getElementById('summary-score-ratio');
      const timeSpentEl = document.getElementById('summary-time-spent');
      const masteryEl = document.getElementById('summary-accuracy-label');
      const mascotCheer = document.getElementById('summary-mascot');

      if (pctEl) pctEl.textContent = `${scorePct}%`;
      if (ratioEl) ratioEl.textContent = `${this.quizPlayer.score} of ${totalQ} correct`;

      const mins = Math.floor(this.quizPlayer.elapsedSeconds / 60);
      const secs = this.quizPlayer.elapsedSeconds % 60;
      if (timeSpentEl) timeSpentEl.textContent = `${mins}m ${secs}s`;

      if (scorePct >= 80) {
        if (masteryEl) masteryEl.textContent = 'Mastered';
        this.speakBuddy('quizGreat');
      } else if (scorePct >= 50) {
        if (masteryEl) masteryEl.textContent = 'Solid Practice';
      } else {
        if (masteryEl) masteryEl.textContent = 'Needs Review';
      }

      // Render mascot in summary
      const buddyKey = this.settings.buddy || 'cat';
      if (mascotCheer && BuddyData[buddyKey]) {
        mascotCheer.innerHTML = BuddyData[buddyKey].svg;
      }
    },

    /* Convert any Flashcard Deck into a 4-choice quiz automatically! */
    convertDeckToQuiz(deck) {
      if (!deck.cards || deck.cards.length < 3) {
        alert('You need at least 3 cards in this deck to auto-generate a multiple-choice quiz.');
        return;
      }

      const generatedQuestions = [];
      const cards = [...deck.cards];

      cards.forEach((card, i) => {
        const correctChoice = card.back;
        // Distractors from other cards in the same deck
        const otherCards = cards.filter((_, idx) => idx !== i);
        // Shuffle other cards
        otherCards.sort(() => Math.random() - 0.5);

        const distractors = otherCards.slice(0, 3).map(c => c.back);
        const allChoices = [correctChoice, ...distractors];
        allChoices.sort(() => Math.random() - 0.5);

        const correctIdx = allChoices.indexOf(correctChoice);

        generatedQuestions.push({
          prompt: card.front,
          options: allChoices,
          correctIndex: correctIdx,
          explanation: `Answer: ${card.back} ${card.hint ? `(Hint: ${card.hint})` : ''}`
        });
      });

      const newQuiz = {
        id: 'quiz-' + Date.now(),
        title: `${deck.title} — Practice Test`,
        subject: 'Flashcard Test',
        bestScore: 0,
        timesTaken: 0,
        questions: generatedQuestions
      };

      this.quizzes.unshift(newQuiz);
      this.saveStorage(['QUIZZES']);

      // Switch to Quiz view and start immediately
      const tabQuiz = document.getElementById('tab-quiz');
      if (tabQuiz) tabQuiz.click();
      this.renderQuizzesGrid();

      // Close deck manage modal if open
      document.getElementById('deck-manage-overlay').classList.add('hidden');

      this.startQuiz(newQuiz);
    },

    /* Quiz Editor Builder Modal */
    openQuizEditor() {
      const modal = document.getElementById('quiz-editor-modal');
      document.getElementById('quiz-title-input').value = '';
      document.getElementById('quiz-subject-input').value = '';

      const list = document.getElementById('builder-questions-list');
      list.innerHTML = '';
      this.addQuestionBlockToBuilder(); // Add first default question
      modal.classList.remove('hidden');
    },

    addQuestionBlockToBuilder() {
      const list = document.getElementById('builder-questions-list');
      const qIndex = list.children.length;
      const block = document.createElement('div');
      block.className = 'builder-q-block';
      block.innerHTML = `
        <div class="builder-q-top">
          <span class="builder-q-tag">Question ${qIndex + 1}</span>
          ${qIndex > 0 ? '<button type="button" class="btn btn-danger-subtle small remove-q-btn">Remove</button>' : ''}
        </div>
        <div class="form-group">
          <input type="text" class="form-input q-prompt-input" placeholder="What is the question?" required>
        </div>
        <div style="font-size: 0.76rem; color: var(--text-muted); margin-top: 6px;">
          Fill 4 choices and select the radio button next to the CORRECT answer:
        </div>
        <div class="builder-choices-list">
          <div class="choice-input-item">
            <input type="radio" name="correct-radio-${qIndex}" value="0" checked>
            <input type="text" class="q-opt-input" placeholder="Choice A (Correct)" required>
          </div>
          <div class="choice-input-item">
            <input type="radio" name="correct-radio-${qIndex}" value="1">
            <input type="text" class="q-opt-input" placeholder="Choice B" required>
          </div>
          <div class="choice-input-item">
            <input type="radio" name="correct-radio-${qIndex}" value="2">
            <input type="text" class="q-opt-input" placeholder="Choice C" required>
          </div>
          <div class="choice-input-item">
            <input type="radio" name="correct-radio-${qIndex}" value="3">
            <input type="text" class="q-opt-input" placeholder="Choice D" required>
          </div>
        </div>
        <div class="form-group" style="margin-top: 8px;">
          <input type="text" class="form-input q-exp-input" placeholder="Optional explanation or reference...">
        </div>
      `;

      if (qIndex > 0) {
        block.querySelector('.remove-q-btn').addEventListener('click', () => {
          block.remove();
          this.updateBuilderCount();
        });
      }

      list.appendChild(block);
      this.updateBuilderCount();
    },

    updateBuilderCount() {
      const list = document.getElementById('builder-questions-list');
      const countEl = document.getElementById('builder-q-count');
      if (countEl && list) countEl.textContent = list.children.length;
    },

    saveQuizFromEditor() {
      const title = document.getElementById('quiz-title-input').value.trim();
      const subject = document.getElementById('quiz-subject-input').value.trim();
      const list = document.getElementById('builder-questions-list');
      const blocks = list.querySelectorAll('.builder-q-block');

      if (!title || blocks.length === 0) return;

      const questions = [];
      blocks.forEach((block, idx) => {
        const prompt = block.querySelector('.q-prompt-input').value.trim();
        const optInputs = block.querySelectorAll('.q-opt-input');
        const options = Array.from(optInputs).map(i => i.value.trim() || 'Option');
        const checkedRadio = block.querySelector(`input[name="correct-radio-${idx}"]:checked`);
        const correctIndex = checkedRadio ? parseInt(checkedRadio.value, 10) : 0;
        const explanation = block.querySelector('.q-exp-input').value.trim();

        if (prompt) {
          questions.push({
            prompt,
            options,
            correctIndex,
            explanation
          });
        }
      });

      if (questions.length === 0) {
        alert('Please fill out at least one valid question.');
        return;
      }

      const newQuiz = {
        id: 'quiz-' + Date.now(),
        title,
        subject: subject || 'General',
        bestScore: 0,
        timesTaken: 0,
        questions
      };

      this.quizzes.unshift(newQuiz);
      this.saveStorage(['QUIZZES']);
      document.getElementById('quiz-editor-modal').classList.add('hidden');
      this.renderQuizzesGrid();
    },

    /* ========================================================================
       8. PROGRESS LOGS & STATS VIEW
       ======================================================================== */
    initProgressLogs() {
      this.renderProgressStats();
      this.renderSessionLogTable();

      const clearBtn = document.getElementById('clear-history-btn');
      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          if (confirm('Clear your focus session history log?')) {
            this.logs = [];
            this.saveStorage(['LOGS']);
            this.renderSessionLogTable();
          }
        });
      }

      const exportStatsBtn = document.getElementById('export-stats-btn');
      if (exportStatsBtn) {
        exportStatsBtn.addEventListener('click', () => {
          this.downloadBackupJSON();
        });
      }
    },

    renderProgressStats() {
      const totalHours = (this.stats.totalFocusSeconds / 3600).toFixed(1);
      const totalMins = Math.floor(this.stats.totalFocusSeconds / 60);

      const timeEl = document.getElementById('stats-total-time');
      const sessEl = document.getElementById('stats-sessions-count');
      const cardsEl = document.getElementById('stats-total-cards');
      const masteredEl = document.getElementById('stats-mastered-count');
      const quizEl = document.getElementById('stats-total-quizzes');
      const avgScoreEl = document.getElementById('stats-avg-score');
      const streakEl = document.getElementById('stats-streak-days');

      if (timeEl) timeEl.textContent = `${totalHours}h (${totalMins}m)`;
      if (sessEl) sessEl.textContent = `${this.stats.totalPomodoros} blocks completed`;
      if (cardsEl) cardsEl.textContent = this.stats.totalCardsReviewed;
      if (masteredEl) masteredEl.textContent = `${this.stats.masteredCards} mastered`;
      if (quizEl) quizEl.textContent = this.stats.quizzesTaken;

      const avgPct = this.stats.quizzesTaken > 0 ? Math.round(this.stats.totalQuizScorePct / this.stats.quizzesTaken) : 0;
      if (avgScoreEl) avgScoreEl.textContent = `Avg score: ${avgPct}%`;
      if (streakEl) streakEl.textContent = `${this.stats.streakDays} ${this.stats.streakDays === 1 ? 'Day' : 'Days'}`;

      this.updateTodayMetrics();
    },

    renderSessionLogTable() {
      const tbody = document.getElementById('session-log-tbody');
      if (!tbody) return;
      tbody.innerHTML = '';

      if (this.logs.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" class="empty-table-cell">No focus sessions recorded yet. Start your first session!</td></tr>`;
        return;
      }

      this.logs.forEach(log => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td style="font-family: var(--font-mono); font-size: 0.82rem;">${log.timestamp || 'Recent'}</td>
          <td><span class="badge" style="font-size: 0.8rem; font-weight: 600;">${escapeHTML(log.mode)}</span></td>
          <td style="font-weight: 500;">${escapeHTML(log.goal)}</td>
          <td style="font-family: var(--font-mono); font-size: 0.82rem;">${escapeHTML(log.duration)}</td>
        `;
        tbody.appendChild(tr);
      });
    },

    /* ========================================================================
       9. SETTINGS MODAL ("WHERE USER CAN SET IT")
       ======================================================================== */
    initSettingsModal() {
      const openBtn = document.getElementById('open-settings-btn');
      const closeBtn = document.getElementById('close-settings-modal-btn');
      const saveBtn = document.getElementById('save-settings-btn');
      const modal = document.getElementById('settings-modal');

      openBtn.addEventListener('click', () => {
        // Load current settings into form
        document.getElementById('set-focus-mins').value = this.settings.focusMins;
        document.getElementById('set-short-mins').value = this.settings.shortBreakMins;
        document.getElementById('set-long-mins').value = this.settings.longBreakMins;
        document.getElementById('set-rounds-count').value = this.settings.roundsCount;

        document.getElementById('set-sound-enabled').checked = !!this.settings.soundEnabled;
        document.getElementById('set-tick-enabled').checked = !!this.settings.tickEnabled;
        document.getElementById('set-autostart-enabled').checked = !!this.settings.autostartEnabled;

        // Theme radio
        const themeRadio = document.querySelector(`input[name="app-theme"][value="${this.settings.theme}"]`);
        if (themeRadio) themeRadio.checked = true;

        // Buddy pills
        const buddyPills = document.querySelectorAll('#settings-buddy-picker .buddy-select-pill');
        buddyPills.forEach(p => {
          p.classList.toggle('active', p.getAttribute('data-buddy') === this.settings.buddy);
        });

        modal.classList.remove('hidden');
      });

      closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
      });

      // Buddy selection clicks
      const buddyPills = document.querySelectorAll('#settings-buddy-picker .buddy-select-pill');
      buddyPills.forEach(pill => {
        pill.addEventListener('click', () => {
          buddyPills.forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
        });
      });

      // Save button
      saveBtn.addEventListener('click', () => {
        const focusM = parseInt(document.getElementById('set-focus-mins').value, 10) || 25;
        const shortM = parseInt(document.getElementById('set-short-mins').value, 10) || 5;
        const longM = parseInt(document.getElementById('set-long-mins').value, 10) || 15;
        const rounds = parseInt(document.getElementById('set-rounds-count').value, 10) || 4;

        this.settings.focusMins = Math.max(1, Math.min(120, focusM));
        this.settings.shortBreakMins = Math.max(1, Math.min(60, shortM));
        this.settings.longBreakMins = Math.max(1, Math.min(90, longM));
        this.settings.roundsCount = Math.max(1, Math.min(12, rounds));

        this.settings.soundEnabled = document.getElementById('set-sound-enabled').checked;
        this.settings.tickEnabled = document.getElementById('set-tick-enabled').checked;
        this.settings.autostartEnabled = document.getElementById('set-autostart-enabled').checked;

        // Theme
        const checkedTheme = document.querySelector('input[name="app-theme"]:checked');
        if (checkedTheme) {
          this.applyTheme(checkedTheme.value);
        }

        // Buddy
        const activeBuddyPill = document.querySelector('#settings-buddy-picker .buddy-select-pill.active');
        if (activeBuddyPill) {
          this.settings.buddy = activeBuddyPill.getAttribute('data-buddy');
          this.renderBuddy();
        }

        this.saveStorage(['SETTINGS']);
        modal.classList.add('hidden');

        // Apply updated timer if currently stopped
        if (!this.timer.isRunning) {
          this.setTimerMode(this.timer.mode, false);
        }
        this.updateRoundDots();
      });

      // Reset Sample Data button
      const resetSampleBtn = document.getElementById('reset-sample-data-btn');
      resetSampleBtn.addEventListener('click', () => {
        if (confirm('Restore default sample decks and quizzes? Any custom decks will remain.')) {
          this.decks = JSON.parse(JSON.stringify(DEFAULT_DECKS));
          this.quizzes = JSON.parse(JSON.stringify(DEFAULT_QUIZZES));
          this.saveStorage(['DECKS', 'QUIZZES']);
          this.renderDecksGrid();
          this.renderQuizzesGrid();
          alert('Sample decks and quizzes restored!');
        }
      });

      // Clear all stored data button
      const clearAllBtn = document.getElementById('clear-all-data-btn');
      clearAllBtn.addEventListener('click', () => {
        if (confirm('WARNING: Reset ALL saved data, timer settings, decks, and journal logs?')) {
          localStorage.clear();
          location.reload();
        }
      });
    },

    /* ========================================================================
       10. AMBIENT SOUNDSCAPE DRAWER
       ======================================================================== */
    initSoundscape() {
      const btn = document.getElementById('soundscape-btn');
      const panel = document.getElementById('soundscape-panel');
      const closeBtn = document.getElementById('close-soundscape-btn');
      const trackBtns = document.querySelectorAll('.sound-track-btn');
      const volSlider = document.getElementById('soundscape-vol');
      const dot = document.querySelector('.soundscape-status-dot');

      btn.addEventListener('click', () => {
        panel.classList.toggle('hidden');
      });

      closeBtn.addEventListener('click', () => {
        panel.classList.add('hidden');
      });

      trackBtns.forEach(tBtn => {
        tBtn.addEventListener('click', () => {
          trackBtns.forEach(b => b.classList.remove('active'));
          tBtn.classList.add('active');

          const track = tBtn.getAttribute('data-track');
          const vol = parseFloat(volSlider.value) || 0.3;

          AudioEngine.setAmbientTrack(track, vol);

          if (track === 'off') {
            dot.classList.remove('active');
          } else {
            dot.classList.add('active');
          }
        });
      });

      volSlider.addEventListener('input', (e) => {
        AudioEngine.setAmbientVolume(parseFloat(e.target.value));
      });
    },

    /* ========================================================================
       11. ACCESSIBILITY & KEYBOARD SHORTCUTS
       ======================================================================== */
    initKeyboardShortcuts() {
      window.addEventListener('keydown', (e) => {
        // Ignore if typing inside input or textarea
        if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

        // If Study Arena is open
        const studyArena = document.getElementById('study-arena');
        if (studyArena && !studyArena.classList.contains('hidden')) {
          if (e.code === 'Space') {
            e.preventDefault();
            this.flipCard();
          } else if (e.key === '1') {
            this.rateCard('again');
          } else if (e.key === '2') {
            this.rateCard('hard');
          } else if (e.key === '3') {
            this.rateCard('good');
          } else if (e.key === '4') {
            this.rateCard('easy');
          } else if (e.key === 'ArrowLeft') {
            if (this.study.currentIndex > 0) {
              this.study.currentIndex--;
              this.renderCurrentStudyCard();
            }
          } else if (e.key === 'ArrowRight') {
            this.rateCard('good');
          }
          return;
        }

        // Global Space bar: Play/Pause Pomodoro if on timer tab
        const viewTimer = document.getElementById('view-timer');
        if (viewTimer && viewTimer.classList.contains('active')) {
          if (e.code === 'Space') {
            e.preventDefault();
            document.getElementById('timer-toggle-btn').click();
          }
        }
      });
    }
  };

  // Safe HTML escaper
  function escapeHTML(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Bootstrap when DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    App.init();
  });

})();
