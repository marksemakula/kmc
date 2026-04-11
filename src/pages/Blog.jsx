import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBlogPosts, setCurrentPost } from '../store/slices/blogSlice';
import { Link, useSearchParams } from 'react-router-dom';
import Breadcrumb from '../components/layout/Breadcrumb';

export default function Blog() {
  const dispatch = useDispatch();
  const { posts, status, error } = useSelector((state) => state.blog);

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') ?? '');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const q = searchParams.get('q') ?? '';
    setSearchQuery(q);
  }, [searchParams]);

  useEffect(() => {
    dispatch(fetchBlogPosts());
  }, [dispatch]);

  const categories = ['All', ...new Set(posts.map((post) => post.category).filter(Boolean))];

  const filteredPosts = posts.filter((post) => {
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      post.title?.toLowerCase().includes(q) ||
      post.category?.toLowerCase().includes(q) ||
      post.excerpt?.toLowerCase().includes(q);

    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;

    return matchesQuery && matchesCategory;
  });

  const featuredPost = filteredPosts[0] ?? null;
  const remainingPosts = filteredPosts.slice(featuredPost ? 1 : 0);
  const hasFilters = searchQuery.trim() || activeCategory !== 'All';

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();

    if (trimmed) {
      setSearchParams({ q: trimmed });
    } else {
      setSearchParams({});
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchParams({});
  };

  const renderPostCard = (post) => (
    <motion.article
      key={post.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 h-full flex flex-col hover:shadow-xl transition-all duration-300"
    >
      <div className="h-52 overflow-hidden bg-gray-100">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/images/blog/placeholder.jpg';
          }}
        />
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center justify-between gap-3 mb-3">
          <span className="inline-flex px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
            {post.category}
          </span>
          <span className="text-sm text-gray-500">{post.date}</span>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-3 leading-snug">{post.title}</h2>
        <p className="text-gray-600 mb-5 flex-1 leading-relaxed">{post.excerpt}</p>

        <Link
          to={`/blog/${post.slug ?? post.id}`}
          className="inline-flex items-center text-primary font-semibold hover:underline"
          onClick={() => dispatch(setCurrentPost(post))}
        >
          Read article
        </Link>
      </div>
    </motion.article>
  );

  if (status === 'loading') {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">Our Blog</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <div className="h-80 rounded-3xl bg-gray-200 animate-pulse" />
          <div className="space-y-4">
            <div className="h-10 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="h-48 bg-gray-200 animate-pulse" />
              <div className="p-6 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" />
                <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

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

  if (status === 'succeeded' && posts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">No Blog Posts Available</h1>
        <p className="text-gray-600 mb-4">We'll be adding new content soon. Please check back later.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Breadcrumb items={[{ label: 'Blog', path: '/blog' }]} />

      <section className="max-w-6xl mx-auto text-center mb-10">
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
          Health Insights & Updates
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Our Blog</h1>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Explore trusted health articles, patient education, wellness tips, and updates from the Keyawell Medical Center team.
        </p>
      </section>

      <div className="max-w-5xl mx-auto mb-8">
        <form
          onSubmit={handleSearchSubmit}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
          role="search"
          aria-label="Search blog posts"
        >
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              type="search"
              name="q"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles by topic, keyword, or category..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              aria-label="Search blog posts"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-3 bg-primary text-white text-sm rounded-xl hover:bg-primary-dark transition-colors"
          >
            Search
          </button>
          {(searchQuery || activeCategory !== 'All') && (
            <button
              type="button"
              onClick={() => {
                clearSearch();
                setActiveCategory('All');
              }}
              className="px-4 py-3 text-gray-600 hover:text-primary transition-colors"
              aria-label="Clear search and filters"
            >
              <span className="inline-flex items-center gap-2">
                <FaTimes /> Clear
              </span>
            </button>
          )}
        </form>
      </div>

      <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-3 mb-10">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category
                ? 'bg-primary text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="max-w-6xl mx-auto mb-6 flex items-center justify-between gap-4 flex-wrap">
        <p className="text-sm text-gray-500">
          Showing <span className="font-semibold text-gray-700">{filteredPosts.length}</span> article{filteredPosts.length !== 1 ? 's' : ''}
          {hasFilters ? ' matching your filters.' : ' from our latest updates.'}
        </p>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-16 text-gray-500 bg-white rounded-2xl border border-dashed border-gray-300 max-w-4xl mx-auto">
          No articles matched your search.{' '}
          <button onClick={() => { clearSearch(); setActiveCategory('All'); }} className="text-primary hover:underline">
            Reset filters
          </button>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto space-y-10">
          {featuredPost && (
            <motion.article
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid lg:grid-cols-2 gap-0 bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100"
            >
              <div className="h-72 lg:h-full bg-gray-100">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/blog/placeholder.jpg';
                  }}
                />
              </div>

              <div className="p-6 md:p-8 flex flex-col justify-center">
                <span className="inline-flex w-fit px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-4">
                  Featured article
                </span>
                <div className="flex items-center gap-3 text-sm text-gray-500 mb-3 flex-wrap">
                  <span>{featuredPost.date}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                  <span>{featuredPost.category}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{featuredPost.title}</h2>
                <p className="text-gray-600 leading-relaxed mb-6">{featuredPost.excerpt}</p>
                <Link
                  to={`/blog/${featuredPost.slug ?? featuredPost.id}`}
                  className="inline-flex items-center w-fit px-5 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-colors"
                  onClick={() => dispatch(setCurrentPost(featuredPost))}
                >
                  Read full article
                </Link>
              </div>
            </motion.article>
          )}

          {remainingPosts.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">More Articles</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {remainingPosts.map((post) => renderPostCard(post))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}