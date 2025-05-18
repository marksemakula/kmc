import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBlogPosts, setCurrentPost } from '../store/slices/blogSlice';
import { Link } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';

export default function Blog() {
  const dispatch = useDispatch();
  const { posts, status, error } = useSelector((state) => state.blog);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    dispatch(fetchBlogPosts());
  }, [dispatch]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex === posts.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? posts.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => nextSlide(),
    onSwipedRight: () => prevSlide(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  const postsPerView = () => {
    if (window.innerWidth >= 1280) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  const visiblePosts = posts.slice(currentIndex, currentIndex + postsPerView());

  // Loading state
  if (status === 'loading') {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">Our Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-gray-200 animate-pulse"></div>
              <div className="p-6">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-4 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (status === 'failed') {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">Error Loading Blog</h1>
        <p className="text-gray-600 mb-4">We couldn't load the blog posts. Please try again later.</p>
        {error && <p className="text-sm text-gray-500 mb-4">Error: {error}</p>}
        <button 
          onClick={() => dispatch(fetchBlogPosts())}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  // Empty state
  if (status === 'succeeded' && posts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">No Blog Posts Available</h1>
        <p className="text-gray-600 mb-4">We'll be adding new content soon. Please check back later.</p>
      </div>
    );
  }

  // Success state
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-primary mb-8 text-center">Our Blog</h1>
      
      <div className="relative max-w-7xl mx-auto" {...handlers}>
        {/* Carousel Navigation */}
        <button 
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white p-3 rounded-full shadow-md z-10 hover:bg-gray-100 transition-colors"
          aria-label="Previous blog post"
        >
          <FaArrowLeft className="text-primary text-xl" />
        </button>
        
        <button 
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white p-3 rounded-full shadow-md z-10 hover:bg-gray-100 transition-colors"
          aria-label="Next blog post"
        >
          <FaArrowRight className="text-primary text-xl" />
        </button>

        {/* Blog Carousel */}
        <div className="overflow-hidden px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            <AnimatePresence custom={direction}>
              {visiblePosts.map((post) => (
                <motion.div
                  key={post.id}
                  custom={direction}
                  initial={{ opacity: 0, x: 100 * direction }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 * direction }}
                  transition={{ duration: 0.5 }}
                  className="flex-shrink-0"
                >
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col hover:shadow-xl transition-all duration-300"
                  >
                    {/* Image Thumbnail */}
                    <div className="h-48 overflow-hidden relative">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/images/blog/placeholder.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    </div>
                    
                    {/* Blog Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full mb-2 self-start">
                        {post.category}
                      </span>
                      <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                      <p className="text-gray-600 mb-4 flex-1">{post.excerpt}</p>
                      <div className="flex justify-between items-center mt-auto">
                        <span className="text-sm text-gray-500">{post.date}</span>
                        <Link 
                          to={`/blog/${post.id}`}
                          className="text-primary font-semibold hover:underline transition-colors"
                          onClick={() => dispatch(setCurrentPost(post))}
                        >
                          Read More
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {posts.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentIndex === index ? 'bg-primary' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}