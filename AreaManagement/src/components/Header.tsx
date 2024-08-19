import { useNavigate } from 'react-router-dom';
import '../styles/header/header.css';

export const Header = () => {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate('/');
    };

    const handleAddClick = () => {
        navigate('/add');
    };

    return (
        <header>
            <div className='btn add-btn' onClick={handleHomeClick}>ホーム</div>
            <div className='btn add-btn' onClick={handleAddClick}>追加</div>
        </header>
    )
}