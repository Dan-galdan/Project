import './Popular.css';
import './home.css';
import '@fontsource/inter';
import Header from '../components/header.jsx';
import Side from '../components/side.jsx';

function Popular() {
  return (
    <div className="page">
      <Header />
      <Side />
      <div>Popular Content</div>
    </div>
  );
}

export default Popular;