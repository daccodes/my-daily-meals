import './App.css';
import Header from './Components/header/Header';
import Body from './Components/body/Body';
import Footer from './Components/footer/Footer';
import { FoodsProvider } from './context';

function App() {
  return (
    <div className="app">
      <FoodsProvider>
        <Header />
        <Body />
        <Footer />
      </FoodsProvider>
    </div>
  );
}

export default App;
