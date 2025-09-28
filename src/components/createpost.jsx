import './header.css';
import '../index.css';
import './createpost.css';
import '@fontsource/inter/700.css';
import { StarRating } from './post';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAlignLeft,
  faImage,
  faGraduationCap,
  faCloudUpload,
} from '@fortawesome/free-solid-svg-icons';
import { AnimatePresence, motion } from 'framer-motion'; // Add Framer Motion import

export function Create() {
  const [showBlur, setShowBlur] = useState(false);
  const [showImageField, setShowImageField] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef(null);

  // Form state
  const [formData, setFormData] = useState({
    schoolName: '',
    title: '',
    description: '',
    rating: 0,
    authorName: '',
    isAnonymous: false
  });

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowBlur(false);
      }
    };

    if (showBlur) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showBlur]);

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle rating change
  const handleRatingChange = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating: rating
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Validation
    if (!formData.schoolName.trim() || !formData.title.trim() || !formData.description.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    setIsLoading(true);

    try {
      const postData = {
        schoolName: formData.schoolName.trim(),
        title: formData.title.trim(),
        description: formData.description.trim(),
        rating: formData.rating,
        authorName: formData.isAnonymous ? 'Anonymous' : (formData.authorName.trim() || 'Anonymous'),
        createdAt: new Date().toISOString()
      };

      const response = await fetch('http://localhost:3000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData)
      });

      const data = await response.json();

      if (data.success) {
        alert("Post created successfully!");
        // Reset form
        setFormData({
          schoolName: '',
          title: '',
          description: '',
          rating: 0,
          authorName: '',
          isAnonymous: false
        });
        setShowBlur(false);
        // Refresh the page to show new post
        window.location.reload();
      } else {
        alert(data.message || "Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button className="teneg1" onClick={() => setShowBlur(true)}>
        <span className="line-md--plus"></span>
        <p>Create Post</p>
      </button>

      <AnimatePresence>
        {showBlur && (
          <motion.div
            className="blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="postfield"
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <div className="postfieldHead">
                <button
                  onClick={() => setShowImageField(false)}
                  className={!showImageField ? 'tab-button active-tab' : 'tab-button'}
                >
                  <FontAwesomeIcon icon={faAlignLeft} />
                  <p>Text</p>
                </button>
                <button
                  onClick={() => setShowImageField((prev) => !prev)}
                  className={showImageField ? 'tab-button active-tab' : 'tab-button'}
                >
                  <FontAwesomeIcon icon={faImage} />
                  <p>Image</p>
                </button>
              </div>

              <div className="postfieldtext">
                <div className="wrapper">
                  <FontAwesomeIcon className="cap" icon={faGraduationCap} />
                  <input 
                    type="text" 
                    placeholder="Select or Enter your School Name" 
                    value={formData.schoolName}
                    onChange={(e) => handleInputChange('schoolName', e.target.value)}
                    required
                  />
                </div>

                <div className="postfieldtitle">
                  <input 
                    type="text" 
                    id="balls" 
                    placeholder="Title" 
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    required
                  />
                  <input 
                    type="text" 
                    id="description" 
                    placeholder="Share your school Experience" 
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    required
                  />

                  <AnimatePresence>
                    {showImageField && (
                      <motion.div
                        className="imagefield"
                        initial={{ opacity: 0, height: 0, y: 20 }}
                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                        exit={{ opacity: 0, height: 0, y: 20 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="imageheader">
                          <FontAwesomeIcon className="ico" icon={faImage} />
                          <h4>Images</h4>
                        </div>
                        <div className="imagedrop">
                          <FontAwesomeIcon className="uploadcloud" icon={faCloudUpload} />
                          <p>Drag and drop an image or click to upload</p>
                          <button>Upload Image</button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="starss">
                  <hr id="line" />
                  <p>Rate Your Experience</p>
                  <StarRating 
                    initialRating={formData.rating} 
                    onRatingChange={handleRatingChange} 
                  />
                </div>

                <div className="identity">
                  <div className="bu">
                    <img
                      src="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
                      alt="User avatar"
                    />
                  </div>
                  <div className="anon">
                    <input 
                      className="anonname" 
                      type="text" 
                      placeholder="Your Name (Optional)" 
                      value={formData.authorName}
                      onChange={(e) => handleInputChange('authorName', e.target.value)}
                    />
                    <div className="bruh">
                      <input 
                        type="checkbox" 
                        id="anonymous" 
                        checked={formData.isAnonymous}
                        onChange={(e) => handleInputChange('isAnonymous', e.target.checked)}
                      />
                      <p>Post Anonymously</p>
                    </div>
                  </div>
                </div>
                <div className="postparent">
                  <button 
                    onClick={handleSubmit}
                    disabled={isLoading}
                    style={{
                      opacity: isLoading ? 0.7 : 1,
                      cursor: isLoading ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {isLoading ? 'Posting...' : 'Post'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}