import mongoose from 'mongoose';

const sectionSchema = new mongoose.Schema({
  subHeading: String,
  paragraph: String,
  codeSnippet: String, // Add a field for the code snippet within the section
});

const blogSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  mainHeading: {
    type: String,
    required: [true, 'A Blog must have a Title'],
    unique: true,
  },
  image: {
    data: Buffer, // Store image data as binary
    contentType: String, // Store content type of the image (e.g., image/png, image/jpeg)
  },
  author: String,
  category: String,
  sections: [sectionSchema],
});

const Blog =
  mongoose.models.Blog || mongoose.model('Blog', blogSchema); //Model

export default Blog;
