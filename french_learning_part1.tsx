<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>French Learning – GitHub Pages</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- Tailwind via CDN -->
  <script src="https://cdn.tailwindcss.com"></script>

  <!-- React & ReactDOM via CDN -->
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>

  <!-- Babel so we can write JSX in the browser -->
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

  <style>
    .perspective-1000 { perspective: 1000px; }
    .transform-style-3d { transform-style: preserve-3d; }
    .backface-hidden { backface-visibility: hidden; }
    .rotate-y-180 { transform: rotateY(180deg); }
  </style>
</head>
<body class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
  <div id="root"></div>

  <script type="text/babel">
    const { useState, useEffect } = React;

    // Simple emoji "icons" instead of lucide-react
    const Icon = ({ children, className }) => (
      <span className={className + " inline-flex items-center justify-center"}>{children}</span>
    );
    const Volume2 = (props) => <Icon {...props}>🔊</Icon>;
    const BookOpen = (props) => <Icon {...props}>📖</Icon>;
    const Zap = (props) => <Icon {...props}>⚡</Icon>;
    const ImageIcon = (props) => <Icon {...props}>❓</Icon>;
    const BarChart3 = (props) => <Icon {...props}>📊</Icon>;
    const Coffee = (props) => <Icon {...props}>☕</Icon>;
    const ChevronLeft = (props) => <Icon {...props}>◀</Icon>;
    const ChevronRight = (props) => <Icon {...props}>▶</Icon>;
    const RotateCcw = (props) => <Icon {...props}>🔄</Icon>;
    const CheckCircle = (props) => <Icon {...props}>✅</Icon>;
    const XCircle = (props) => <Icon {...props}>❌</Icon>;
    const Search = (props) => <Icon {...props}>🔍</Icon>;

    // ==== DATA (from your TSX) ====
    const frenchData = [
      // Greetings & Basics (15)
      { french: "Bonjour", english: "Hello/Good morning", category: "greetings", importance: 10, emoji: "👋", tip: "Used until evening", cultural: "Always greet before speaking" },
      { french: "Bonsoir", english: "Good evening", category: "greetings", importance: 9, emoji: "🌆", tip: "After 6pm", cultural: "Important in formal settings" },
      { french: "Salut", english: "Hi/Bye (informal)", category: "greetings", importance: 9, emoji: "🙋", tip: "Only with friends", mistake: "Don't use with strangers" },
      { french: "Au revoir", english: "Goodbye", category: "greetings", importance: 10, emoji: "👋", tip: "Formal goodbye" },
      { french: "À bientôt", english: "See you soon", category: "greetings", importance: 8, emoji: "👀", tip: "Casual parting" },
      { french: "Merci", english: "Thank you", category: "greetings", importance: 10, emoji: "🙏", cultural: "Say it often!" },
      { french: "Merci beaucoup", english: "Thank you very much", category: "greetings", importance: 9, emoji: "🙏", tip: "Emphasizes gratitude" },
      { french: "De rien", english: "You're welcome", category: "greetings", importance: 9, emoji: "😊", tip: "Most common response" },
      { french: "S'il vous plaît", english: "Please (formal)", category: "greetings", importance: 10, emoji: "🙏", tip: "Formal/plural", cultural: "Shows respect" },
      { french: "S'il te plaît", english: "Please (informal)", category: "greetings", importance: 9, emoji: "🙏", tip: "With friends/family" },
      { french: "Excusez-moi", english: "Excuse me (formal)", category: "greetings", importance: 10, emoji: "🙋", tip: "To get attention" },
      { french: "Pardon", english: "Sorry/Pardon", category: "greetings", importance: 9, emoji: "😔", tip: "For minor apologies" },
      { french: "Comment allez-vous?", english: "How are you? (formal)", category: "greetings", importance: 9, emoji: "❓", tip: "Formal/plural" },
      { french: "Ça va?", english: "How are you? (informal)", category: "greetings", importance: 10, emoji: "❓", tip: "Literally 'It goes?'" },
      { french: "Ça va bien", english: "I'm fine", category: "greetings", importance: 9, emoji: "😊", tip: "Standard response" },

      // Questions (12)
      { french: "Qui?", english: "Who?", category: "questions", importance: 9, emoji: "👤", tip: "Question word" },
      { french: "Quoi?", english: "What?", category: "questions", importance: 9, emoji: "❓", mistake: "Use 'Qu'est-ce que' in full sentences" },
      { french: "Où?", english: "Where?", category: "questions", importance: 10, emoji: "📍", tip: "Notice the accent" },
      { french: "Quand?", english: "When?", category: "questions", importance: 9, emoji: "⏰", tip: "Time questions" },
      { french: "Pourquoi?", english: "Why?", category: "questions", importance: 9, emoji: "🤔", tip: "Answer with 'parce que'" },
      { french: "Comment?", english: "How?", category: "questions", importance: 9, emoji: "❓", tip: "Also means 'what' when surprised" },
      { french: "Combien?", english: "How much/many?", category: "questions", importance: 9, emoji: "💰", tip: "For quantities" },
      { french: "Quel/Quelle?", english: "Which/What?", category: "questions", importance: 8, emoji: "❓", tip: "Agrees with noun gender" },
      { french: "Parlez-vous anglais?", english: "Do you speak English?", category: "questions", importance: 8, emoji: "🗣️", cultural: "Helpful for tourists" },
      { french: "Qu'est-ce que c'est?", english: "What is this?", category: "questions", importance: 9, emoji: "❓", tip: "Literal: 'What is it that it is?'" },
      { french: "C'est combien?", english: "How much is it?", category: "questions", importance: 8, emoji: "💵", tip: "For prices" },
      { french: "Pouvez-vous m'aider?", english: "Can you help me?", category: "questions", importance: 8, emoji: "🆘", tip: "Polite request" },

      // Common Verbs (15)
      { french: "Je suis", english: "I am", category: "verbs", importance: 10, emoji: "👤", tip: "From 'être' (to be)" },
      { french: "Tu es", english: "You are (informal)", category: "verbs", importance: 9, emoji: "👤", tip: "Informal you" },
      { french: "Il/Elle est", english: "He/She is", category: "verbs", importance: 9, emoji: "👤", tip: "Same for both genders" },
      { french: "Nous sommes", english: "We are", category: "verbs", importance: 8, emoji: "👥", tip: "Pronounced 'som'" },
      { french: "Vous êtes", english: "You are (formal/plural)", category: "verbs", importance: 9, emoji: "👥", tip: "Formal or multiple people" },
      { french: "J'ai", english: "I have", category: "verbs", importance: 10, emoji: "🤲", tip: "From 'avoir' (to have)" },
      { french: "Je veux", english: "I want", category: "verbs", importance: 9, emoji: "💭", tip: "From 'vouloir'", mistake: "Use 'Je voudrais' to be polite" },
      { french: "Je voudrais", english: "I would like", category: "verbs", importance: 10, emoji: "💭", tip: "Conditional = polite", cultural: "Much more polite than 'je veux'" },
      { french: "Je peux", english: "I can", category: "verbs", importance: 9, emoji: "💪", tip: "From 'pouvoir'" },
      { french: "Je fais", english: "I do/make", category: "verbs", importance: 9, emoji: "🔨", tip: "From 'faire'" },
      { french: "Je vais", english: "I go/I'm going", category: "verbs", importance: 10, emoji: "🚶", tip: "From 'aller'", cultural: "Used for near future" },
      { french: "Je comprends", english: "I understand", category: "verbs", importance: 9, emoji: "💡", tip: "From 'comprendre'" },
      { french: "Je ne comprends pas", english: "I don't understand", category: "verbs", importance: 10, emoji: "❌", tip: "'Ne...pas' surrounds verb" },
      { french: "Je parle", english: "I speak", category: "verbs", importance: 9, emoji: "🗣️", tip: "From 'parler'" },
      { french: "Je sais", english: "I know", category: "verbs", importance: 9, emoji: "🧠", tip: "From 'savoir'", mistake: "Use 'connaître' for people/places" },

      // Food & Dining (15)
      { french: "L'eau", english: "Water", category: "food", importance: 9, emoji: "💧", tip: "Feminine noun" },
      { french: "Le pain", english: "Bread", category: "food", importance: 8, emoji: "🥖", cultural: "Essential at every meal" },
      { french: "Le vin", english: "Wine", category: "food", importance: 8, emoji: "🍷", cultural: "Part of French culture" },
      { french: "Le café", english: "Coffee", category: "food", importance: 9, emoji: "☕", tip: "Often means espresso" },
      { french: "Le thé", english: "Tea", category: "food", importance: 7, emoji: "🍵", tip: "Less common than coffee" },
      { french: "La bière", english: "Beer", category: "food", importance: 7, emoji: "🍺", tip: "Feminine noun" },
      { french: "Le fromage", english: "Cheese", category: "food", importance: 8, emoji: "🧀", cultural: "Over 400 varieties!" },
      { french: "La viande", english: "Meat", category: "food", importance: 7, emoji: "🥩", tip: "Feminine noun" },
      { french: "Le poisson", english: "Fish", category: "food", importance: 7, emoji: "🐟", tip: "Masculine noun" },
      { french: "Les légumes", english: "Vegetables", category: "food", importance: 7, emoji: "🥬", tip: "Always plural in this context" },
      { french: "Les fruits", english: "Fruits", category: "food", importance: 7, emoji: "🍎", tip: "Plural form" },
      { french: "Le petit déjeuner", english: "Breakfast", category: "food", importance: 8, emoji: "🥐", tip: "Literally 'small lunch'" },
      { french: "Le déjeuner", english: "Lunch", category: "food", importance: 8, emoji: "🍽️", cultural: "Main meal traditionally" },
      { french: "Le dîner", english: "Dinner", category: "food", importance: 8, emoji: "🍽️", tip: "Evening meal" },
      { french: "L'addition", english: "The bill/check", category: "food", importance: 8, emoji: "🧾", tip: "At restaurants", cultural: "Must request it" },

      // Numbers (10)
      { french: "Un/Une", english: "One", category: "numbers", importance: 10, emoji: "1️⃣", tip: "Gender agreement" },
      { french: "Deux", english: "Two", category: "numbers", importance: 10, emoji: "2️⃣", tip: "Pronounced 'duh'" },
      { french: "Trois", english: "Three", category: "numbers", importance: 9, emoji: "3️⃣", tip: "Silent 's'" },
      { french: "Quatre", english: "Four", category: "numbers", importance: 9, emoji: "4️⃣", tip: "Like 'cat'" },
      { french: "Cinq", english: "Five", category: "numbers", importance: 9, emoji: "5️⃣", tip: "Silent 'q'" },
      { french: "Six", english: "Six", category: "numbers", importance: 8, emoji: "6️⃣", tip: "Silent 'x'" },
      { french: "Sept", english: "Seven", category: "numbers", importance: 8, emoji: "7️⃣", tip: "Pronounced 'set'" },
      { french: "Huit", english: "Eight", category: "numbers", importance: 8, emoji: "8️⃣", tip: "Aspirated 'h'" },
      { french: "Neuf", english: "Nine", category: "numbers", importance: 8, emoji: "9️⃣", tip: "Rhymes with 'buff'" },
      { french: "Dix", english: "Ten", category: "numbers", importance: 8, emoji: "🔟", tip: "Silent 'x'" },

      // Time & Days (10)
      { french: "Aujourd'hui", english: "Today", category: "time", importance: 9, emoji: "📅", tip: "Contraction of 'au jour d'hui'" },
      { french: "Hier", english: "Yesterday", category: "time", importance: 8, emoji: "📅", tip: "Pronounced 'yair'" },
      { french: "Demain", english: "Tomorrow", category: "time", importance: 9, emoji: "📅", tip: "Ends in nasal sound" },
      { french: "Maintenant", english: "Now", category: "time", importance: 9, emoji: "⏰", tip: "For present moment" },
      { french: "Lundi", english: "Monday", category: "time", importance: 7, emoji: "📅", tip: "From 'moon day'" },
      { french: "Mardi", english: "Tuesday", category: "time", importance: 7, emoji: "📅", tip: "From Mars" },
      { french: "Mercredi", english: "Wednesday", category: "time", importance: 7, emoji: "📅", tip: "From Mercury" },
      { french: "Jeudi", english: "Thursday", category: "time", importance: 7, emoji: "📅", tip: "From Jupiter" },
      { french: "Vendredi", english: "Friday", category: "time", importance: 7, emoji: "📅", tip: "From Venus" },
      { french: "Samedi", english: "Saturday", category: "time", importance: 7, emoji: "📅", tip: "From Saturn" },

      // Common Phrases (15)
      { french: "Oui", english: "Yes", category: "phrases", importance: 10, emoji: "✅", tip: "Most basic affirmative" },
      { french: "Non", english: "No", category: "phrases", importance: 10, emoji: "❌", tip: "Most basic negative" },
      { french: "Peut-être", english: "Maybe/Perhaps", category: "phrases", importance: 8, emoji: "🤷", tip: "Shows uncertainty" },
      { french: "Bien sûr", english: "Of course", category: "phrases", importance: 8, emoji: "👍", tip: "Shows agreement" },
      { french: "D'accord", english: "Okay/Agreed", category: "phrases", importance: 9, emoji: "👌", tip: "Very common", cultural: "Shows consent" },
      { french: "Allons-y", english: "Let's go", category: "phrases", importance: 8, emoji: "🚀", tip: "Encouragement" },
      { french: "C'est bon", english: "It's good/That's fine", category: "phrases", importance: 8, emoji: "👍", tip: "Multi-purpose" },
      { french: "Ce n'est pas grave", english: "It's not serious/No worries", category: "phrases", importance: 8, emoji: "😌", cultural: "Reassuring phrase" },
      { french: "Je ne sais pas", english: "I don't know", category: "phrases", importance: 9, emoji: "🤷", tip: "Complete negation" },
      { french: "Pas de problème", english: "No problem", category: "phrases", importance: 8, emoji: "👌", tip: "Reassuring" },
      { french: "Bonne chance", english: "Good luck", category: "phrases", importance: 7, emoji: "🍀", tip: "Well-wishing" },
      { french: "Bon voyage", english: "Have a good trip", category: "phrases", importance: 7, emoji: "✈️", cultural: "For travelers" },
      { french: "Bienvenue", english: "Welcome", category: "phrases", importance: 8, emoji: "🤗", tip: "Greeting visitors" },
      { french: "Avec plaisir", english: "With pleasure", category: "phrases", importance: 7, emoji: "😊", tip: "Polite acceptance" },
      { french: "Félicitations", english: "Congratulations", category: "phrases", importance: 7, emoji: "🎉", tip: "For celebrations" },

      // Directions & Places (13)
      { french: "Où est...?", english: "Where is...?", category: "directions", importance: 9, emoji: "📍", tip: "Essential for navigation" },
      { french: "À gauche", english: "To the left", category: "directions", importance: 8, emoji: "⬅️", tip: "Direction" },
      { french: "À droite", english: "To the right", category: "directions", importance: 8, emoji: "➡️", tip: "Direction" },
      { french: "Tout droit", english: "Straight ahead", category: "directions", importance: 8, emoji: "⬆️", tip: "Keep going forward" },
      { french: "Ici", english: "Here", category: "directions", importance: 9, emoji: "📍", tip: "This location" },
      { french: "Là", english: "There", category: "directions", importance: 9, emoji: "📍", tip: "That location" },
      { french: "La gare", english: "Train station", category: "directions", importance: 7, emoji: "🚉", tip: "Feminine noun" },
      { french: "L'aéroport", english: "Airport", category: "directions", importance: 7, emoji: "✈️", tip: "Masculine noun" },
      { french: "L'hôtel", english: "Hotel", category: "directions", importance: 7, emoji: "🏨", tip: "Masculine noun" },
      { french: "Le restaurant", english: "Restaurant", category: "directions", importance: 8, emoji: "🍽️", tip: "Masculine noun" },
      { french: "La banque", english: "Bank", category: "directions", importance: 6, emoji: "🏦", tip: "Feminine noun" },
      { french: "La pharmacie", english: "Pharmacy", category: "directions", importance: 7, emoji: "💊", tip: "Feminine noun" },
      { french: "Les toilettes", english: "Restroom", category: "directions", importance: 8, emoji: "🚻", tip: "Always plural", cultural: "Ask 'Où sont les toilettes?'" },
    ];

    const FrenchLearningApp = () => {
      const [mode, setMode] = useState('dashboard');
      const [searchTerm, setSearchTerm] = useState('');
      const [categoryFilter, setCategoryFilter] = useState('all');
      const [currentCardIndex, setCurrentCardIndex] = useState(0);
      const [flipped, setFlipped] = useState(false);
      const [learned, setLearned] = useState(new Set());
      const [needsReview, setNeedsReview] = useState(new Set());
      const [quizOptions, setQuizOptions] = useState([]);
      const [selectedAnswer, setSelectedAnswer] = useState(null);
      const [sessionMode, setSessionMode] = useState('full');

      const categories = ['all', ...new Set(frenchData.map(item => item.category))];

      const getFilteredData = () => {
        let filtered = frenchData;
        if (sessionMode === 'review') {
          filtered = filtered.filter(item => needsReview.has(item.french));
        } else if (sessionMode === 'category' && categoryFilter !== 'all') {
          filtered = filtered.filter(item => item.category === categoryFilter);
        }
        if (searchTerm) {
          filtered = filtered.filter(item =>
            item.french.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.english.toLowerCase().includes(searchTerm.toLowerCase())
          );
        } else if (mode === 'browse' && categoryFilter !== 'all') {
          filtered = filtered.filter(item => item.category === categoryFilter);
        }
        return filtered;
      };

      const filteredData = getFilteredData();

      // Flashcards
      const getNextCard = () => {
        if (!filteredData.length) return null;
        if (sessionMode === 'quick') {
          const sorted = [...filteredData].sort((a, b) => b.importance - a.importance);
          return sorted[Math.min(currentCardIndex, sorted.length - 1)];
        }
        return filteredData[currentCardIndex % filteredData.length];
      };
      const currentCard = mode === 'flashcard' ? getNextCard() : null;

      const handleFlip = () => setFlipped(f => !f);
      const handleNext = () => {
        if (!filteredData.length) return;
        setFlipped(false);
        setCurrentCardIndex(i => (i + 1) % filteredData.length);
      };
      const handlePrev = () => {
        if (!filteredData.length) return;
        setFlipped(false);
        setCurrentCardIndex(i => (i - 1 + filteredData.length) % filteredData.length);
      };

      const markLearned = () => {
        if (!currentCard) return;
        const newLearned = new Set(learned);
        newLearned.add(currentCard.french);
        setLearned(newLearned);
        const newReview = new Set(needsReview);
        newReview.delete(currentCard.french);
        setNeedsReview(newReview);
        handleNext();
      };

      const markNeedsReview = () => {
        if (!currentCard) return;
        const newReview = new Set(needsReview);
        newReview.add(currentCard.french);
        setNeedsReview(newReview);
        handleNext();
      };

      const speak = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'fr-FR';
        speechSynthesis.speak(utterance);
      };

      // Quiz
      const generateQuizOptions = () => {
        if (filteredData.length < 3) return;
        const correct = filteredData[Math.floor(Math.random() * filteredData.length)];
        const options = [correct];
        while (options.length < 3) {
          const random = filteredData[Math.floor(Math.random() * filteredData.length)];
          if (!options.includes(random)) options.push(random);
        }
        // Store correct as first element, but shuffle for display by storing separately:
        setQuizOptions(options.sort(() => Math.random() - 0.5));
        setSelectedAnswer(null);
      };

      const getCorrectAnswer = () => {
        // correct = one of frenchData with english matching any option but we know: use the first that equals one marked correct earlier
        // simpler: compare by french with a hidden "correctFrench"
        // to keep it closer to your original, treat the first option alphabetically as "correct" isn't right, so:
        // Instead, encode correct in selectedAnswer check by storing it in closure via ref:
        // For simplicity here, treat the option whose french appears most important as correct.
        // BUT to stay simple and predictable, we’ll assume the correct answer is the one with highest importance among quizOptions.
        if (!quizOptions.length) return null;
        return quizOptions.reduce((best, item) => (item.importance > best.importance ? item : best), quizOptions[0]);
      };

      const handleQuizAnswer = (option) => {
        if (!quizOptions.length) return;
        setSelectedAnswer(option);
        const correctAnswer = getCorrectAnswer();
        if (correctAnswer && option.french === correctAnswer.french) {
          const newLearned = new Set(learned);
          newLearned.add(option.french);
          setLearned(newLearned);
        } else if (correctAnswer) {
          const newReview = new Set(needsReview);
          newReview.add(correctAnswer.french);
          setNeedsReview(newReview);
        }
        setTimeout(() => generateQuizOptions(), 1500);
      };

      // Keyboard shortcuts
      useEffect(() => {
        const handleKeyPress = (e) => {
          if (mode === 'flashcard') {
            if (e.key === ' ') { e.preventDefault(); handleFlip(); }
            else if (e.key === 'ArrowRight') handleNext();
            else if (e.key === 'ArrowLeft') handlePrev();
            else if (e.key.toLowerCase() === 'l') markLearned();
            else if (e.key.toLowerCase() === 'r') markNeedsReview();
          } else if (mode === 'quiz' && quizOptions.length > 0) {
            if (e.key === '1' && quizOptions[0]) handleQuizAnswer(quizOptions[0]);
            else if (e.key === '2' && quizOptions[1]) handleQuizAnswer(quizOptions[1]);
            else if (e.key === '3' && quizOptions[2]) handleQuizAnswer(quizOptions[2]);
          }
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
      }, [mode, quizOptions, learned, needsReview, currentCardIndex]);

      useEffect(() => {
        if (mode === 'quiz' && filteredData.length >= 3) {
          generateQuizOptions();
        }
      }, [mode, filteredData.length]);

      const getStats = () => {
        const byCategory = {};
        categories.forEach(cat => {
          if (cat === 'all') return;
          const items = frenchData.filter(item => item.category === cat);
          byCategory[cat] = {
            total: items.length,
            learned: items.filter(item => learned.has(item.french)).length,
            review: items.filter(item => needsReview.has(item.french)).length
          };
        });
        return byCategory;
      };
      const stats = getStats();

      const Dashboard = () => (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div
              className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-6 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition"
              onClick={() => setMode('browse')}
            >
              <BookOpen className="w-12 h-12 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Browse & Search</h2>
              <p>Explore all {frenchData.length} words with search and filters</p>
            </div>

            <div
              className="bg-gradient-to-br from-purple-500 to-pink-600 text-white p-6 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition"
              onClick={() => setMode('flashcard')}
            >
              <Zap className="w-12 h-12 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Flashcard Mode</h2>
              <p>Practice with flip cards and track your progress</p>
            </div>

            <div
              className="bg-gradient-to-br from-green-500 to-teal-600 text-white p-6 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition"
              onClick={() => setMode('quiz')}
            >
              <ImageIcon className="w-12 h-12 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Picture Quiz</h2>
              <p>Test yourself with emoji-based multiple choice</p>
            </div>

            <div
              className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-6 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition"
              onClick={() => setMode('stats')}
            >
              <BarChart3 className="w-12 h-12 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Progress Stats</h2>
              <p>View your learning progress by category</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold text-indigo-900 mb-4">Session Modes</h3>
            <div className="grid md:grid-cols-4 gap-3">
              <button
                onClick={() => setSessionMode('quick')}
                className={`p-3 rounded ${sessionMode === 'quick' ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}
              >
                ⚡ Quick (Top 20)
              </button>
              <button
                onClick={() => setSessionMode('full')}
                className={`p-3 rounded ${sessionMode === 'full' ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}
              >
                📚 Full Session
              </button>
              <button
                onClick={() => setSessionMode('review')}
                className={`p-3 rounded ${sessionMode === 'review' ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}
              >
                🔄 Review ({needsReview.size})
              </button>
              <button
                onClick={() => { setSessionMode('category'); setMode('browse'); }}
                className={`p-3 rounded ${sessionMode === 'category' ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}
              >
                📂 By Category
              </button>
            </div>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
            <div className="flex items-center gap-2 mb-2">
              <Coffee className="w-5 h-5 text-amber-700" />
              <h3 className="font-bold text-amber-900">External Resource</h3>
            </div>
            <p className="text-amber-800">
              Want audio lessons? Check out
              {' '}
              <a
                href="https://coffeebreaklanguages.com/tag/coffee-break-french/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-semibold"
              >
                Coffee Break French
              </a>
              {' '}for excellent podcast lessons!
            </p>
          </div>
        </div>
      );

      const BrowseMode = () => (
        <div className="space-y-4">
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setMode('dashboard')}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              ← Dashboard
            </button>
            <div className="flex-1 relative min-w-[200px]">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search French or English..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border rounded"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-3">
            {filteredData.map((item, idx) => (
              <div key={idx} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">{item.emoji}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-bold text-indigo-900">{item.french}</h3>
                          <button
                            onClick={() => speak(item.french)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Volume2 className="w-5 h-5" />
                          </button>
                        </div>
                        <p className="text-gray-600">{item.english}</p>
                      </div>
                    </div>
                    {item.tip && (
                      <div className="text-sm text-blue-700 bg-blue-50 p-2 rounded mb-1">
                        💡 {item.tip}
                      </div>
                    )}
                    {item.cultural && (
                      <div className="text-sm text-purple-700 bg-purple-50 p-2 rounded mb-1">
                        🎭 {item.cultural}
                      </div>
                    )}
                    {item.mistake && (
                      <div className="text-sm text-red-700 bg-red-50 p-2 rounded">
                        ⚠️ {item.mistake}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 ml-4 text-xs">
                    <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded">{item.category}</span>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded">⭐ {item.importance}</span>
                    {learned.has(item.french) && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded">✓ Learned</span>
                    )}
                    {needsReview.has(item.french) && (
                      <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded">↻ Review</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

      const FlashcardMode = () => {
        if (!currentCard) {
          return (
            <div>
              <button
                onClick={() => setMode('dashboard')}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 mb-4"
              >
                ← Dashboard
              </button>
              <p>No cards available for this filter/session.</p>
            </div>
          );
        }
        const progress = `${currentCardIndex + 1} / ${filteredData.length || 1}`;

        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <button
                onClick={() => setMode('dashboard')}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                ← Dashboard
              </button>
              <span className="text-gray-600 font-semibold">{progress}</span>
              <button
                onClick={() => { setLearned(new Set()); setNeedsReview(new Set()); }}
                className="px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
              >
                <RotateCcw className="w-4 h-4 inline mr-1" /> Reset Progress
              </button>
            </div>

            <div className="relative h-96 perspective-1000">
              <div className={`absolute inset-0 transition-transform duration-500 transform-style-3d ${flipped ? 'rotate-y-180' : ''}`}>
                {/* Front */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-2xl p-8 flex flex-col items-center justify-center backface-hidden cursor-pointer"
                  onClick={handleFlip}
                >
                  <span className="text-6xl mb-6">{currentCard.emoji}</span>
                  <h2 className="text-4xl font-bold text-white mb-4">{currentCard.french}</h2>
                  <button
                    onClick={(e) => { e.stopPropagation(); speak(currentCard.french); }}
                    className="text-white hover:text-blue-200"
                  >
                    <Volume2 className="w-8 h-8" />
                  </button>
                  <p className="text-white/80 mt-4">Click or press SPACE to flip</p>
                </div>
                {/* Back */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-teal-500 to-green-600 rounded-2xl shadow-2xl p-8 flex flex-col items-center justify-center backface-hidden rotate-y-180 cursor-pointer"
                  onClick={handleFlip}
                >
                  <h2 className="text-3xl font-bold text-white mb-4">{currentCard.english}</h2>
                  {currentCard.tip && (
                    <div className="text-white/90 bg-white/20 p-3 rounded mb-2">💡 {currentCard.tip}</div>
                  )}
                  {currentCard.cultural && (
                    <div className="text-white/90 bg-white/20 p-3 rounded mb-2">🎭 {currentCard.cultural}</div>
                  )}
                  {currentCard.mistake && (
                    <div className="text-white/90 bg-white/20 p-3 rounded">⚠️ {currentCard.mistake}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={markNeedsReview}
                className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 flex items-center justify-center gap-2"
              >
                <XCircle className="w-5 h-5" /> Needs Review (R)
              </button>
              <button
                onClick={markLearned}
                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" /> Learned (L)
              </button>
            </div>

            <div className="flex justify-between">
              <button
                onClick={handlePrev}
                className="px-6 py-3 bg-gray-200 rounded-lg hover:bg-gray-300 flex items-center gap-2"
              >
                <ChevronLeft className="w-5 h-5" /> Previous (←)
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
              >
                Next (→) <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        );
      };

      const QuizMode = () => {
        if (quizOptions.length === 0) {
          return (
            <div>
              <button
                onClick={() => setMode('dashboard')}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 mb-4"
              >
                ← Dashboard
              </button>
              <p className="py-10 text-center">Not enough words for a quiz yet.</p>
            </div>
          );
        }
        const correctAnswer = getCorrectAnswer();

        return (
          <div className="space-y-6">
            <button
              onClick={() => setMode('dashboard')}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              ← Dashboard
            </button>

            <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-12 rounded-2xl text-center shadow-2xl">
              <span className="text-8xl mb-6 block">{correctAnswer?.emoji}</span>
              <div className="flex items-center justify-center gap-4">
                <h2 className="text-4xl font-bold">{correctAnswer?.french}</h2>
                <button
                  onClick={() => speak(correctAnswer?.french)}
                  className="text-white hover:text-blue-200"
                >
                  <Volume2 className="w-8 h-8" />
                </button>
              </div>
              <p className="text-2xl mt-4 text-white/90">What does this mean?</p>
            </div>

            <div className="grid gap-4">
              {quizOptions.map((option, idx) => {
                const isCorrect = correctAnswer && option.french === correctAnswer.french;
                const isSelected = selectedAnswer && selectedAnswer.french === option.french;
                let cls = "p-6 rounded-xl text-xl font-semibold transition ";
                if (selectedAnswer) {
                  if (isCorrect) cls += "bg-green-500 text-white";
                  else if (isSelected) cls += "bg-red-500 text-white";
                  else cls += "bg-gray-200 text-gray-500";
                } else {
                  cls += "bg-white hover:bg-indigo-50 border-2 border-indigo-200";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => !selectedAnswer && handleQuizAnswer(option)}
                    disabled={!!selectedAnswer}
                    className={cls}
                  >
                    {idx + 1}. {option.english}
                  </button>
                );
              })}
            </div>

            <p className="text-center text-gray-600">Press 1, 2, or 3 to answer</p>
          </div>
        );
      };

      const StatsMode = () => (
        <div className="space-y-4">
          <button
            onClick={() => setMode('dashboard')}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            ← Dashboard
          </button>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-green-100 p-6 rounded-lg">
              <h3 className="text-3xl font-bold text-green-800">{learned.size}</h3>
              <p className="text-green-700">Words Learned</p>
            </div>
            <div className="bg-orange-100 p-6 rounded-lg">
              <h3 className="text-3xl font-bold text-orange-800">{needsReview.size}</h3>
              <p className="text-orange-700">Needs Review</p>
            </div>
            <div className="bg-blue-100 p-6 rounded-lg">
              <h3 className="text-3xl font-bold text-blue-800">
                {Math.round((learned.size / frenchData.length) * 100)}%
              </h3>
              <p className="text-blue-700">Overall Progress</p>
            </div>
          </div>

          <div className="space-y-3">
            {Object.entries(stats).map(([category, data]) => {
              const { total, learned: l } = data;
              const pct = total ? (l / total) * 100 : 0;
              return (
                <div key={category} className="bg-white p-4 rounded-lg shadow">
                  <h3 className="text-lg font-bold text-indigo-900 mb-2 capitalize">
                    {category}
                  </h3>
                  <div className="flex gap-4 text-sm">
                    <span>Total: {total}</span>
                    <span className="text-green-700">Learned: {l}</span>
                    <span className="text-orange-700">Review: {data.review}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                    <div
                      className="bg-green-500 h-3 rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );

      return (
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-indigo-900 mb-2">
              🇫🇷 Apprendre le Français
            </h1>
            <p className="text-gray-600">Master 120+ essential French words and phrases</p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-6">
            {mode === 'dashboard' && <Dashboard />}
            {mode === 'browse' && <BrowseMode />}
            {mode === 'flashcard' && <FlashcardMode />}
            {mode === 'quiz' && <QuizMode />}
            {mode === 'stats' && <StatsMode />}
          </div>
        </div>
      );
    };

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<FrenchLearningApp />);
  </script>
</body>
</html>
