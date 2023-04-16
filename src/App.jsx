import './App.css';
import Tracker from './components/Tracker';

function App() {
    return (
        <div className='App'>
            <Tracker />
            <footer className='attribution'>
                Challenge by{' '}
                <a
                    href='https://www.frontendmentor.io?ref=challenge'
                    target='_blank'>
                    Frontend Mentor
                </a>
                .
                <br /> Coded by{' '}
                <a href='https://github.com/Mudi-Igbinoba' target='_blank'>
                    Osamudiame Igbinoba
                </a>
                .
            </footer>
        </div>
    );
}

export default App;
