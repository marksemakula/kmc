import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock data - replace with real API call later
const mockBlogPosts = [
  {
    id: 1,
    title: "Advancements in Telemedicine",
    excerpt: "Explore how telemedicine is revolutionizing patient care and accessibility.",
    date: "May 15, 2024",
    image: "/images/blog/telemedicine.jpg",
    category: "Technology",
    content: "Full article content would go here..."
  },
  {
    id: 2,
    title: "Healthy Living Tips",
    excerpt: "Simple daily habits that can significantly improve your overall health.",
    date: "April 28, 2024",
    image: "/images/blog/health-tips.jpg",
    category: "Wellness",
    content: "Full article content would go here..."
  },
  {
    id: 3,
    title: "New Pediatric Wing Opening",
    excerpt: "Our new state-of-the-art pediatric facility is now accepting patients.",
    date: "April 10, 2024",
    image: "/images/blog/pediatric-wing.jpg",
    category: "News",
    content: "Full article content would go here..."
  }
];

export const fetchBlogPosts = createAsyncThunk(
  'blog/fetchPosts',
  async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockBlogPosts;
    // For real API: 
    // const response = await axios.get('YOUR_REAL_API_ENDPOINT');
    // return response.data;
  }
);

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    posts: [],
    currentPost: null,
    status: 'idle',
    error: null
  },
  reducers: {
    setCurrentPost: (state, action) => {
      state.currentPost = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBlogPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBlogPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchBlogPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { setCurrentPost } = blogSlice.actions;
export default blogSlice.reducer;