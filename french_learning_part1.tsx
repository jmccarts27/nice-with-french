import React, { useState, useEffect } from 'react';
import { Volume2, BookOpen, Zap, Image, BarChart3, Coffee, ChevronLeft, ChevronRight, RotateCcw, CheckCircle, XCircle, Search, Filter } from 'lucide-react';

// PART 1: DATA AND STATE MANAGEMENT
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

const FrenchLearning = () => {
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

  // COPY FROM HERE FOR PART 2 - This is just a marker
  // Part 2 will contain: filtered data logic, handlers, render functions, and UI components

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-indigo-900 mb-2">🇫🇷 Apprendre le Français</h1>
          <p className="text-gray-600">Master 120+ essential French words and phrases</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="text-center text-gray-500">Part 1 loaded. Please add Part 2 code below this component.</p>
        </div>
      </div>
    </div>
  );
};

export default FrenchLearning;