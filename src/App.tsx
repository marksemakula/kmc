import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import Home from './pages/Home';
import Services from './pages/Services';
import Referral from './pages/Referral';
import Careers from './pages/Careers';
import AdminPanel from './pages/AdminPanel';
import Telemedicine from './pages/Telemedicine';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import PartnerForm from './components/PartnerForm';
import FloatingChat from './components/FloatingChat';

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="-mt-16 -mx-4"
            >
              <Home />
            </motion.div>
          }
        />
        <Route
          path="/services"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Services />
            </motion.div>
          }
        />
        <Route
          path="/blog"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Blog />
            </motion.div>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <BlogPost />
            </motion.div>
          }
        />
        <Route
          path="/referral"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Referral />
            </motion.div>
          }
        />
        <Route
          path="/careers"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Careers />
            </motion.div>
          }
        />
        <Route
          path="/admin"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <AdminPanel />
            </motion.div>
          }
        />
        <Route
          path="/telemedicine"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Telemedicine />
            </motion.div>
          }
        />
        <Route
          path="/become-a-partner"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <PartnerForm />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 relative flex flex-col">
        <ScrollToTop />
        <Navbar />
        <motion.main
          className="container mx-auto px-4 pt-16 pb-2 flex-grow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatedRoutes />
        </motion.main>
        <Footer />
        <FloatingChat apiKey={import.meta.env.VITE_DEEPSEEK_API_KEY} />
      </div>
    </Router>
  );
}
