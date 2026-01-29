'use client';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ChevronRight } from 'lucide-react';
import Layout from '@/components/layout/layout';


export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32 min-h-[80vh] flex items-center">
        {/* Arrière-plan avec image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/image.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0
          }}
        >
          {/* Calque de superposition avec dégradé */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-red-0"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-white">
              <h2 className="text-4xl sm:text-5xl font-bold leading-tight drop-shadow-lg">
                Excellence Académique à Madagascar
              </h2>
              <p className="text-lg text-blue-100 leading-relaxed">
                Découvrez notre établissement d'enseignement de référence, offrant une formation de qualité du collège au lycée avec des programmes internationaux et un encadrement personnalisé.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/presentation" className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition flex items-center justify-center gap-2">
                  Découvrir Plus <ChevronRight size={20} />
                </Link>
                <Link to="/contact" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition">
                  Inscriptions
                </Link>
              </div>
            </div>
           
          </div>
        </div>
      </section>

      {/* Presentation Section */}
      <section className="py-20 bg-blue-50 mt-4">
        <div className="  items-center">
          <div className="text-center mb-16 ">
            <h3 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4">Notre Vision</h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Préparer les élèves à réussir dans un monde en constante évolution
            </p>
          </div>
          

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🌍',
                title: 'Ouverture Internationale',
                description: 'Programme bilingue français-anglais avec partenariats internationaux et opportunités d\'échange.',
              },
              {
                icon: '🏆',
                title: 'Excellence Académique',
                description: 'Enseignants qualifiés et méthodes pédagogiques modernes pour un apprentissage optimal.',
              },
              {
                icon: '❤️',
                title: 'Valeurs Humaines',
                description: 'Développement du civisme, solidarité et respect de la diversité culturelle.',
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h4 className="text-xl font-bold text-blue-900 mb-3">{item.title}</h4>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl sm:text-4xl font-bold text-blue-900 text-center mb-16">
            Nos Atouts
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Corps Enseignant Qualifié',
                items: ['Diplômés des universités prestigieuses', 'Formation continue annuelle', 'Suivi personnalisé des élèves'],
              },
              {
                title: 'Infrastructure Moderne',
                items: ['Laboratoires scientifiques équipés', 'Bibliothèque digitale', 'Espace informatique dernier cri'],
              },
              {
                title: 'Programmes Diversifiés',
                items: ['Filière générale et technologique', 'Options sportives et artistiques', 'Club de sciences et débats'],
              },
              {
                title: 'Accompagnement Personnalisé',
                items: ['Tutorat académique', 'Orientation professionnelle', 'Soutien psychosocial'],
              },
            ].map((feature, idx) => (
              <div key={idx} className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition">
                <h4 className="text-xl font-bold text-blue-900 mb-4">{feature.title}</h4>
                <ul className="space-y-3">
                  {feature.items.map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="text-orange-500 font-bold mt-0.5">✓</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Restez Connecté
          </h3>
          <p className="text-blue-100 text-lg mb-8">
            Inscrivez-vous à notre newsletter pour recevoir les actualités de l'établissement
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre email"
              className="flex-1 px-6 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              S'inscrire
            </button>
          </form>

          {subscribed && (
            <div className="mt-4 text-green-200 font-semibold">
              ✓ Merci pour votre inscription!
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: '1500+', label: 'Élèves' },
              { number: '120+', label: 'Enseignants' },
              { number: '25', label: 'Ans d\'expérience' },
              { number: '98%', label: 'Réussite au bac' },
            ].map((stat, idx) => (
              <div key={idx}>
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">Établissement</h4>
              <ul className="space-y-2 text-sm text-blue-100">
                <li><Link to="/presentation" className="hover:text-white transition">Présentation</Link></li>
                <li><Link to="/presentation" className="hover:text-white transition">Historique</Link></li>
                <li><Link to="/presentation" className="hover:text-white transition">Équipe</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Programmes</h4>
              <ul className="space-y-2 text-sm text-blue-100">
                <li><Link to="/programmes" className="hover:text-white transition">Collège</Link></li>
                <li><Link to="/programmes" className="hover:text-white transition">Lycée</Link></li>
                <li><Link to="/programmes" className="hover:text-white transition">Spécialités</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-blue-100">
                <li><Link to="/services" className="hover:text-white transition">Ressources</Link></li>
                <li><Link to="/services" className="hover:text-white transition">Activités</Link></li>
                <li><Link to="/services" className="hover:text-white transition">Bourses</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Suivez-Nous</h4>
              <div className="flex gap-4">
                {['f', 't', 'i', 'l'].map((icon) => (
                  <a key={icon} to="#" className="w-10 h-10 bg-blue-800 hover:bg-blue-700 rounded-full flex items-center justify-center transition">
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-blue-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-blue-100">
              <p>&copy; 2025 Collège-Lycée Madagascar. Tous droits réservés.</p>
              <div className="flex gap-6">
                <a to="#" className="hover:text-white transition">Politique de Confidentialité</a>
                <a to="#" className="hover:text-white transition">Conditions d'Utilisation</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </Layout>
  );
}
