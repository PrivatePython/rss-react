import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <nav>
      <ul>
        <li>
          <button
            className="cursor-pointer inline-block bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
            onClick={() => {
              navigate('/about');
            }}
          >
            About
          </button>
        </li>
      </ul>
    </nav>
  );
};
export default NavBar;
