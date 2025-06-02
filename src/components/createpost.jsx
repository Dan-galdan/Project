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
  const modalRef = useRef(null);

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
                  <input type="text" placeholder="Select or Enter your School Name" />
                </div>

                <div className="postfieldtitle">
                  <input type="text" id="balls" placeholder="Title" />
                  <input type="text" id="description" placeholder="Share your school Experience" />

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
                  <StarRating />
                </div>

                <div className="identity">
                  <div className="bu">
                    <img
                      src="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
                      alt="User avatar"
                    />
                  </div>
                  <div className="anon">
                    <input className="anonname" type="text" placeholder="Your Name (Optional)" />
                    <div className="bruh">
                      <input type="checkbox" />
                      <p>Post Anonymously</p>
                    </div>
                  </div>
                </div>
                <div className="postparent">
                  <button>Post</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}