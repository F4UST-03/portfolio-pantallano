import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';

export function FeaturesSection() {
  const [activeTab, setActiveTab] = useState('personal-info');

  const tabs = [
    { id: 'personal-info', icon: '👩🏻‍💻', label: 'Personal Info' },
    { id: 'education', icon: '🏫', label: 'Educational Background' },
    { id: 'hobbies', icon: '🎭', label: 'Hobbies & Interests' },
    { id: 'skills', icon: '📊', label: 'Skills' },
    { id: 'tech-stacks', icon: '⚙️', label: 'Tech Stacks' },
    { id: 'resume', icon: '📃', label: 'My Resume' },
  ];

  const handleDownload = () => {
    // Download the real PDF from public/assets
    const link = document.createElement('a');
    link.href = '/personal-portfolio/assets/resume-pantallano.pdf';
    link.download = 'resume-pantallano.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="features" id="about">
      <h2 className="section-title">About Me</h2>
      <div className="features-container">
        {/* Tabs */}
        <div className="feature-tabs">
          {tabs.map(tab => (
            <div
              key={tab.id}
              className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span>{tab.label}</span>
            </div>
          ))}
        </div>

        {/* Content Panels */}
        <div className="feature-content">
          <div className={`content-panel ${activeTab === 'personal-info' ? 'active' : ''}`} id="personal-info">
            <h3>My Personal Info</h3>
            <img src="assets/my-pic.jpg" alt="my-picture" className='my-pic'/>
            <ul className="feature-list">
              <li><strong>Name: </strong>Jorilyn Pantallano</li>
              <li><strong>Age: </strong>22</li>
              <li><strong>Birthyear: </strong>2003</li>
              <li><strong>Address: </strong>Apalit, Pampanga</li>
              <li><strong>Hometown: </strong> <br />
              Rodriguez, Rizal <br />
              Sipalay, Negros Occidental <br />
              Puerto Princesa, Palawan
              </li>
            </ul>
          </div>

          <div className={`content-panel ${activeTab === 'education' ? 'active' : ''}`} id="education">
            <h3>Educational Background</h3>
            <ul className="feature-list">
              <li><strong>High School: </strong>Kasiglahan Village National High School, Rizal</li>
              <li><strong>Senior High School: </strong>Southville 8B Senior High School (HUMSS), Rizal</li>
              <li><strong>Undergraduate: </strong>La Verdad Christian College (Bachelor of Science in Information Systems), Pampanga</li>
              <li><strong>Certifications: </strong> <br />
              Graduated w/ Honor (SHS) <br />
              Dean's Lister (1st year College) <br />
              President's Lister (2nd year College) <br />
              English Academic Vocabulary Professional Certification AVPC (MTF Institute) <br />
              Improve Business Performance with Google Forms (Google)
              </li>
            </ul>
          </div>

          <div className={`content-panel ${activeTab === 'hobbies' ? 'active' : ''}`} id="hobbies">
            <h3>Hobbies & Interests</h3>
            <ul className="feature-list">
              <li>Listening to Music</li>
              <li>Singing</li>
              <li>Dancing</li>
              <li>Psychology</li>
              <li>Debugging</li>
              <li>Watching Anime & Memes</li>
              <li>Playing Adventure Games</li>
            </ul>
          </div>

          <div className={`content-panel ${activeTab === 'skills' ? 'active' : ''}`} id="skills">
            <h3>My Skills</h3>
            <ul className="feature-list">
              <li>Performing Arts (9/10)</li>
              <li>Behavioral Observation (9/10)</li>
              <li>Backend Development (7/10)</li>
              <li>Frontend Development (6/10)</li>
              <li>Listening & Decision making (9/10)</li>
              <li>UI/UX Designing & Prototyping (8/10)</li>
            </ul>
          </div>

          <div className={`content-panel ${activeTab === 'tech-stacks' ? 'active' : ''}`} id="tech-stacks">
            <h3>Tools & Tech Stacks</h3>
            <ul className="feature-list">
              <li>Python</li>
              <li>C#</li>
              <li>Php, Laravel</li>
              <li>HTML5, CSS</li>
              <li>React</li>
              <li>JavaScript</li>
              <li>MySQL</li>
              <li>Git, GitHub</li>
              <li>Figma</li>
              <li>Microsoft Office</li>
              <li>OBS Studio</li>
              <li>Canva</li>
            </ul>
          </div>

          <div className={`content-panel ${activeTab === 'resume' ? 'active' : ''}`} id="resume">
            <h3>My Resume</h3>
            <p>You can download my resume by clicking the button below.</p>
            <br />
              <button onClick={handleDownload}>
                Download Resume
              </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TextRotator() {
  const texts = [
    { id: 0, label: 'TECH ENTHUSIAST' },
    { id: 1, label: 'MUSIC LOVER' },
    { id: 2, label: 'ELECTRIC DREAMER' },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % texts.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <div className="text-rotator">
      {texts.map((text, index) => (
        <div key={text.id} className={`text-set ${index === activeIndex ? 'active' : ''}`}>
          <h1 className="glitch-text" data-text={text.label}>{text.label}</h1>
        </div>
      ))}
    </div>
  );
}



function App() {

  const [menuActive, setMenuActive] = useState(false);
  const formRef = useRef(null);
  const [formStatus, setFormStatus] = useState('');

  const handleContactSubmit = (e) => {
    e.preventDefault();

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setFormStatus('Email service is not configured. Please set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY.');
      return;
    }

    const formData = new FormData(formRef.current);
    const templateParams = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
      reply_to: formData.get('email'),
      from_name: formData.get('name'),
    };

    setFormStatus('Sending...');

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then(() => {
        setFormStatus('Message sent! Thank you.');
        if (formRef.current) formRef.current.reset();
      })
      .catch((error) => {
        console.error('Email send error:', error);
        setFormStatus('Unable to send message. Please try again later.');
      });
  };

  useEffect(() => {
    const toggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (toggle && navLinks) {
      toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        setMenuActive(!menuActive);
      });
    }

    // Cleanup to avoid duplicate listeners
    return () => {
      if (toggle) {
        toggle.removeEventListener('click', () => {});
      }
    };
  }, [menuActive]);


  return (
    <>
      {/* Animated Grid Background */}
          <div className="grid-bg"></div>
          <div className="gradient-overlay"></div>
          <div className="scanlines"></div>

          {/* Animated Shapes */}
          <div className="shapes-container">
              <div className="shape shape-circle"></div>
              <div className="shape shape-triangle"></div>
              <div className="shape shape-square"></div>
          </div>

          {/* Floating Particles */}
          <div id="particles"></div>

          {/* Navigation */}
          <nav id="navbar">
              <div className="nav-container">
                  <a href="#home" className="logo-link">
                      <svg className="logo-svg" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" style={{"stopColor":"#FF5E00","stopOpacity":"1"}} />
                                  <stop offset="100%" style={{"stopColor":"#00B2FF","stopOpacity":"1"}} />
                              </linearGradient>
                          </defs>
                          <polygon points="20,2 38,14 38,26 20,38 2,26 2,14" fill="none" stroke="url(#logoGradient)" stroke-width="2"/>
                          <polygon points="20,8 32,16 32,24 20,32 8,24 8,16" fill="url(#logoGradient)" opacity="0.3"/>
                          <circle cx="20" cy="20" r="3" fill="url(#logoGradient)"/>
                      </svg>
                      <span className="logo-text">PERSONAL PORTFOLIO</span>
                  </a>
                  <ul className="nav-links" id="navLinks">
                      <li><a href="#home" className="nav-link">Home</a></li>
                      <li><a href="#about" className="nav-link">About Me</a></li>
                      <li><a href="#projects" className="nav-link">Projects</a></li>
                      <li><a href="#contact" className="nav-link">Contact</a></li>
                  </ul>
                  <div className="menu-toggle" id="menuToggle">
                      <span></span>
                      <span></span>
                      <span></span>
                  </div>
              </div>
          </nav>

          {/* Hero Section */}
          <section className="hero" id="home">
              <div className="hero-content">
                  <div className="text-rotator">
                      <TextRotator />
                  </div>
              </div>
              <div className="cta-container">
                  <a href="#about" className="cta-button cta-primary">Get Started</a>
                  <a href="#projects" className="cta-button cta-secondary">View Projects</a>
              </div>
          </section>

          <FeaturesSection />

          {/* Projects Section */}
          <section className="about" id="projects">
              <h2 className="section-title">Notable Projects</h2>
              <div className="about-content">
                  <div className="about-text">
                      <h2>PEP-7 Web Application</h2>
                      <img src="assets/pep7.png" alt="pep-7" className='pep'/>
                      <p>PEP-7 is a web application that helps children learn the Filipino language, specifically Tagalog, through interactive games and exercises.</p>
                      <p>We created this project around year 2024 as compliance with our course Web Applications Development. 
                        This project is a team effort, and the one who handles the backend development using Php and Laravel framework are Mr. Rasheed Esponga and Mr. Mark Jason Patron, 
                        while me and Mr. Rasheed Esponga are among those who are in charge of frontend development.</p>
                      <p>This project aims to entertain and give educational information at the same time 
                      to the children who had difficulty learning and exercising Filipino language, Tagalog in particular.</p>
                  </div>
                  <div className="about-visual">
                      <div className="about-graphic"></div>
                  </div>
              </div>
              
              {/* Second row with reversed layout */}
              <div className="about-content" style={{"marginTop":"80px"}}>
                  <div className="about-visual">
                      <div className="about-graphic-alt">
                          <div className="hexagon"></div>
                          <div className="hexagon"></div>
                          <div className="hexagon"></div>
                      </div>
                  </div>
                  <div className="about-text">
                      <h2>KwentoKidz UI/UX Layout (from PEP-7)</h2>
                      <img src="assets/kwentokidz.png" alt="landing" className='kwentokidz'/>
                      <img src="assets/kwentokidz-home.png" alt="home" className='kwentokidz'/>
                      <img src="assets/books.png" alt="books" className='kwentokidz'/>
                      <img src="assets/avatar.png" alt="avatar" className='kwentokidz'/>
                      <p>This project is the simple and engaging UI version of our Web Application Project PEP-7 with paired goals.</p>
                      <p>The UI/UX was particulaly made by me with assets that came from my teammate, for IT Marketing presentation.</p>
                  </div>
              </div>

              <div className="about-content" style={{"marginTop":"80px"}}>
                  <div className="about-text">
                      <h2>Cat Breeds Palette Web App</h2>
                      <img src="assets/cat-breeds.png" alt="cat-breeds" className='breed1'/>
                      <img src="assets/cat-breed-details.png" alt="breed-details" className='breed2'/>
                      <p>A web application that allows users to explore different cat breeds, view their characteristics, and learn more about each breed.</p>
                      <p>This app is a simple web application that I created as part of my learning journey in web development.</p>
                      <p>It was built using React for the frontend and utilizes the Cat API to fetch data about various cat breeds.</p>
                  </div>
                  <div className="about-visual">
                      <div className="about-graphic"></div>
                  </div>
              </div>
          </section>


          {/* Contact Section */}
          <section className="contact" id="contact">
              <h2 className="section-title">Get In Touch</h2>
              <div className="contact-container">
                  <div className="contact-form">
                      <form id="contactForm" ref={formRef} onSubmit={handleContactSubmit}>
                          <div className="form-group">
                              <label htmlFor="name">Name</label>
                              <input type="text" id="name" name="name" required/>
                          </div>
                          <div className="form-group">
                              <label htmlFor="email">Email</label>
                              <input type="email" id="email" name="email" required/>
                          </div>
                          <div className="form-group">
                              <label htmlFor="subject">Subject</label>
                              <input type="text" id="subject" name="subject" required/>
                          </div>
                          <div className="form-group">
                              <label htmlFor="message">Message</label>
                              <textarea id="message" name="message" required></textarea>
                          </div>
                          <button type="submit" className="submit-btn">Send Message</button>
                          {formStatus && <p className="form-status">{formStatus}</p>}
                      </form>
                  </div>
                  <div className="contact-info">
                      <h3>Connect With Me</h3>
                      <div className="info-item">
                          <div className="info-icon">📧</div>
                          <div className="info-details">
                              <h4>Email</h4>
                              <p>pantallanojojo1994@gmail.com</p>
                          </div>
                      </div>
                      <div className="info-item">
                          <div className="info-icon">📱</div>
                          <div className="info-details">
                              <h4>Phone</h4>
                              <p>(+63) 960-819-8874</p>
                          </div>
                      </div>
                      <div className="info-item">
                          <div className="info-icon">📍</div>
                          <div className="info-details">
                              <h4>Location</h4>
                              <p>Apalit, Pampanga</p>
                          </div>
                      </div>
                      <div className="map-container">
                          <div className="map-placeholder">
                              <iframe 
                                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.686648580634!2d120.7068733153632!3d14.98330958972202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b7c8f4f6b8d7%3A0x8e8e8e8e8e8e8e8e!2sApalit%2C%20Pampanga%2C%20Philippines!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
                                  width="100%" 
                                  height="200" 
                                  style={{"border":"0"}} 
                                  allowFullScreen="" 
                                  loading="lazy" 
                                  referrerPolicy="no-referrer-when-downgrade" 
                                  title="Apalit, Pampanga Location"
                              ></iframe>
                              <p style={{"fontSize":"0.9rem","marginTop":"10px"}}>Apalit, Pampanga</p>
                          </div>
                          <div className="map-overlay"></div>
                      </div>
                  </div>
              </div>
          </section>

          {/* Footer */}
          <footer>
              <div className="footer-content">
                  <div className="footer-links">
                      <a href="#privacy">Privacy Policy</a>
                      <a href="#terms">Terms of Service</a>
                      <a href="#careers">Careers</a>
                  </div>
                  <p className="copyright">© 2025 ELECTRIC XTRA. All rights reserved. Building tomorrow, today. | Design: <a href="https://templatemo.com" target="_blank" rel="nofollow noopener">TemplateMo</a></p>
              </div>
          </footer>
      </>
  )
}

export default App
