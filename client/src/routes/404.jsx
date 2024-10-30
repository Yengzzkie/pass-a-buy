import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/home');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold text-red-500">404 - Page Not Found</h1>
      <p className="text-gray-500 mt-2">Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
      <button 
        onClick={handleRedirect} 
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded"
      >
        Go Back to Home
      </button>
    </div>
  );
}

export default NotFound;
