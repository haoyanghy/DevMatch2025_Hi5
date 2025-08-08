import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({ user, children }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return <div>Redirecting to login...</div>;
  }

  return children;
}

export default ProtectedRoute;
