import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPost } from '../store/slices/blogSlice';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function BlogPost() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentPost, posts, status } = useSelector((state) => state.blog);

  useEffect(() => {
    if (posts.length > 0) {
      const post = posts.find(post => post.id.toString() === id);
      dispatch(setCurrentPost(post));
    }
  }, [id, posts, dispatch]);

  if (status === 'loading') {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded w-full mb-6"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
        </div>
      </div>
    );
  }

  if (!currentPost) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-primary mb-4">Post not found</h2>
        <Link to="/blog" className="text-primary hover:underline">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-12 max-w-4xl"
    >
      <Link 
        to="/blog" 
        className="flex items-center text-primary hover:text-primary-dark mb-6"
      >
        <FaArrowLeft className="mr-2" />
        Back to Blog
      </Link>

      <article>
        <motion.h1 
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {currentPost.title}
        </motion.h1>

        <div className="flex items-center mb-6 text-gray-600">
          <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full mr-3">
            {currentPost.category}
          </span>
          <span>{currentPost.date}</span>
        </div>

        <motion.div
          className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <img 
            src={currentPost.image} 
            alt={currentPost.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div
          className="prose max-w-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            {currentPost.excerpt}
          </p>
          {/* Full content would go here */}
          <div className="border-t border-gray-200 pt-6 mt-8">
            <p className="text-gray-600">
              For more information about our services, please contact our team.
            </p>
          </div>
        </motion.div>
      </article>
    </motion.div>
  );
}