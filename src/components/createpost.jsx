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
  faCloudUpload
} from '@fortawesome/free-solid-svg-icons';

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
      <button className='teneg1' onClick={() => setShowBlur(true)}>
        <span className="line-md--plus"></span>
        <p>Create Post</p>
      </button>

      {showBlur && (
        <div className={`blur ${showBlur ? 'show' : ''}`}>
          <div className="postfield" ref={modalRef}>
            <div className='postfieldHead'>
              <button
                onClick={() => setShowImageField(false)}
                className={!showImageField ? 'tab-button active-tab' : 'tab-button'}
              >
                <FontAwesomeIcon icon={faAlignLeft} />
                <p>Text</p>
              </button>
              <button
                onClick={() => setShowImageField(prev => !prev)}
                className={showImageField ? 'tab-button active-tab' : 'tab-button'}
              >
                <FontAwesomeIcon icon={faImage} />
                <p>Image</p>
              </button>
            </div>

            <div className='postfieldtext'>
              <div className='wrapper'>
                <FontAwesomeIcon className='cap' icon={faGraduationCap} />
                <input type="text" placeholder='Select or Enter your School Name' />
              </div>

              <div className='postfieldtitle'>
                <input type="text" id='balls' placeholder='Title' />
                <input type="text" id='description' placeholder='Share your school Experience' />

                {showImageField && (
                  <div className="imagefield">
                    <div className='imageheader'>
                      <FontAwesomeIcon className='ico' icon={faImage} />
                      <h4>Images</h4>
                    </div>
                    <div className='imagedrop'>
                      <FontAwesomeIcon className='uploudcloud' icon={faCloudUpload} />
                      <p>Drag and drop an image or click to upload</p>
                      <button>Upload Image</button>
                    </div>
                  </div>
                )}
              </div>

              <div className='starss'>
                <hr id='line' />
                <p>Rate Your Experience</p>
                <StarRating />
              </div>

              <div className='identity'>
                <div>
                  <img
                    src="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
                    alt="User avatar"
                  />
                </div>
                <div>
                  <input type="text" />
                  <div>
                    <input type="checkbox" />
                    <p>Post Anonymously</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
