
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../App/providers/store/store';

function HomePage(): JSX.Element {
  const navigate = useNavigate();



  const  currentUser  = useAppSelector(state => state.currentUserStore.user)

  if (currentUser) {
    return <div>hello</div>;
  }

  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center">
      <header style={{ marginBottom: '2rem' }}>
        <h1 className="text-center">Заметки</h1>
        <h3 className="text-center" style={{ fontSize: '1rem', color: '#777' }}>
          Делитесь своими мыслями и идеями c вместе друзьями.
        </h3>
      </header>

      <section style={{ width: '100%', maxWidth: '800px' }}>
        <textarea
          placeholder="Напишите вашу заметку здесь..."
          style={{
            width: '100%',
            height: '200px',
            padding: '1rem',
            fontSize: '1rem',
            border: '1px solid #ddd',
            borderRadius: '8px',
            backgroundColor: '#fff',
            color: '#333',
            resize: 'none',
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
          }}
        ></textarea>

        <div className="mt-3">
          <button
            style={{
              backgroundColor: '#007bff',
              color: '#fff',
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
            }}
            onClick={() => navigate('/auth/login')}
          >
            Сохранить
          </button>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
