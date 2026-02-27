import './styles/App.css'
import Header from './layout/Header.tsx';
import Home from './pages/Home.tsx';
import Footer from './layout/Footer.tsx';
import WhatsAppButton from './components/WhatsAppButton.tsx';
function App() {


  return (
    <>
      <Header />
      <Home />
      <Footer />
      <WhatsAppButton />
    </>
  )
}

export default App
