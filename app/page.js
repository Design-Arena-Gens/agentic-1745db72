'use client';

import { useState } from 'react';

export default function Home() {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateImage = async () => {
    setLoading(true);
    setError('');
    setImageUrl('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setImageUrl(data.imageUrl);
      }
    } catch (err) {
      setError('Erreur lors de la génération de l\'image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '40px',
        maxWidth: '600px',
        width: '100%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '10px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Générateur de Photo d'Influenceur
        </h1>

        <p style={{
          textAlign: 'center',
          color: '#666',
          marginBottom: '30px'
        }}>
          Créez une photo d'influenceur professionnelle en un clic
        </p>

        <button
          onClick={generateImage}
          disabled={loading}
          style={{
            width: '100%',
            padding: '15px',
            fontSize: '18px',
            fontWeight: 'bold',
            color: 'white',
            background: loading ? '#ccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            borderRadius: '10px',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'transform 0.2s',
            marginBottom: '20px'
          }}
          onMouseOver={(e) => {
            if (!loading) e.target.style.transform = 'scale(1.02)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'scale(1)';
          }}
        >
          {loading ? 'Génération en cours...' : 'Générer une Photo'}
        </button>

        {error && (
          <div style={{
            padding: '15px',
            background: '#fee',
            color: '#c33',
            borderRadius: '10px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        {imageUrl && (
          <div style={{
            textAlign: 'center',
            animation: 'fadeIn 0.5s'
          }}>
            <img
              src={imageUrl}
              alt="Influenceur généré"
              style={{
                width: '100%',
                borderRadius: '15px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
              }}
            />
            <a
              href={imageUrl}
              download="influenceur.png"
              style={{
                display: 'inline-block',
                marginTop: '15px',
                padding: '10px 20px',
                background: '#667eea',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: 'bold'
              }}
            >
              Télécharger
            </a>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
