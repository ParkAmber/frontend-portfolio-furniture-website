import Head from 'next/head'
import Image from 'next/image'
// import { Inter } from 'next/font/google'
// import styles from './../styles/Home.module.css'

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Amber Park's Portfolio Website</title>
        <meta name="description" content="Amber Park's Portfolio Website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo2.png" />
      </Head>
   <div className='portfolio-homepage'>
      <section id='portfolio-main'>
        <div className='portfolio-header'>
            <div>
              <a href='/portfolio'>
                <img src='/logo.png' />
              </a>
        </div>
        <div>
          <ul>
            <li> <a href="#portfolio-main">HOME</a></li>
            <li><a href="#portfolio-work">WORK</a></li>
            <li><a href="#portfolio-about">ABOUT</a></li>
            <li><a href="#portfolio-contact">CONTACT</a></li>
          </ul>
        </div>
        </div>
        <div className='portfolio-main-con'>
        <div className='portfolio-main-contents'>
        <h2>Frontend Developer</h2>
        <h1>Amber Park</h1>        
          <p>I am an aspiring developer with a thoughtful approach. I enjoy every step of my journey as a developer</p>
          <div className='button-con'>
              <button className='button'>
          <a href="mailto:hayoung.p12@gmail.com">CONTACT ME</a>
          </button>
          <button className='button white-button'>
          <a href="#portfolio-work" >PORTFOLIO</a>
                </button>
              </div>
        </div>
        <div className='portfolio-main-img'>
          <img src='/portfolio/portfolio-main.png' />
          </div>
        </div>
        </section>
        
      <section id='skills'>
        <h1>Skills</h1>
        <div className='skills-con'>
        <div className='skills-item'>
          <h2>WEB DESIGN</h2>
          <img src='/portfolio/portfolio-webdeign.png'/>
          <p>I specialize in creating simple and intuitive designs, always prioritizing user-friendly experiences.</p>
          <div className='webdesign-bars'>
            <div className='bar-item'>
              <p>Photoshop</p>
                <div className="animated-progress progress-photoshop">
              <span data-progress="45"></span>
              </div>
            </div>
            <div className='bar-item'>
            <p>Illustrator</p>
            <div className="animated-progress progress-illustrator">
            <span data-progress="45"></span>
              </div>
            </div>
            <div className='bar-item'>
              <p>XD</p>
                 <div className="animated-progress progress-xd">
            <span data-progress="45"></span>
          </div>
            </div>
         
          </div>
        </div>
        <div className='skills-item'>
          <h2>FRONT-END</h2>
          <img src='/portfolio/portfolio-developer.png'/>
          <p>I place a strong emphasis on data and performance optimization, consistently striving
            to write effective code. My focus extends to the visual aspects of a website.</p>
            <div className='webdesign-bars'>
            <div className='bar-item'>
              <p>HTML</p>
                <div className="animated-progress progress-html">
              <span data-progress="45"></span>
              </div>
            </div>
            <div className='bar-item'>
            <p>CSS</p>
            <div className="animated-progress progress-css">
            <span data-progress="45"></span>
              </div>
            </div>
            <div className='bar-item'>
              <p>JS</p>
                 <div className="animated-progress progress-js">
            <span data-progress="45"></span>
          </div>
            </div>
            <div className='bar-item'>
              <p>React</p>
                 <div className="animated-progress progress-react">
            <span data-progress="45"></span>
          </div>
            </div>
          </div>
        </div>
        <div className='skills-item'>
          <h2>PROBLEM-SOLVING</h2>
          <img src='/portfolio/portfolio-problem.png'/>
          <p>I excel in diagnosing and analyzing problems to gain a comprehensive understanding.
            As a developer, I contemplate the best options for more refined code,
            considering what will contribute to a superior solution.</p>
          </div>
          </div>
        </section>
        
      <section id='portfolio-about'>
        <div className='about-img'>
          <img src='/portfolio/portfolio-about.png'/>
        </div>
          <div className='about-contents'>
            <h2>About Me</h2>
          <p>I am a motivated front-end developer with an intuitive yet competitive approach. Driven by a passion for continuous growth, I dedicate time to studying new languages and refining my development skills.
            Eager to apply my enthusiasm to contribute to a talented team.
          </p>
          <div className='about-btn-con'>
          <button className='button'>
          <a href="mailto:hayoung.p12@gmail.com">CONTACT ME</a>
            </button>
            <button className='button white-button'>
          <a href="/resume" target="_blank">RESUME</a>
          </button>
          </div>
        </div>
        {/* <embed src="/resume-for-website.pdf" type="application/pdf" width="100%" height="600px" /> */}
      </section>
        <section id='portfolio-work'>
          <div className='work-bg'>
              <img src='/portfolio/portfolio-work-bg.png' />
            </div>
        <div className='work-contents'>
          <h1>
          My work
          </h1>
          <p>
          Engaged in personal design and development projects, showcasing a blend of creativity and technical expertise.
          </p>
      </div>
          <div className='work-imgs'>
   
          <div className='work-imgs-item'> 
              <img src='/portfolio/portfolio-work-photoshop.png' className='hover-img'/>
              <div className='hover-display center'>
              {/* <div className="animated-progress progress-photoshop">
              <span data-progress="45"></span>
              </div> */}
                
                <span className='button'>
                <a href="https://portfolio-photoshop.amberpark.site/photoshop/" target="_blank">Visit Website</a>
                  </span>
                
               
                <span className='button white-button'>
                  <a href="https://github.com/ParkAmber/frontend-portfolio-photoshop.git" target="_blank">View Source</a>
                  </span>
               
              </div>
          </div>
          <div className='work-imgs-item'>
              <img src='/portfolio/portfolio-work-weather.png' className='hover-img'/>
              <div className='hover-display center'>
              {/* <div className="animated-progress progress-photoshop">
              <span data-progress="45"></span>
              </div> */}
                
                <span className='button'>
                <a href="https://amberpark.site/weather/" target="_blank">Visit Website</a>
                  </span>
                
               
                <span className='button white-button'>
                  <a href="https://github.com/ParkAmber/frontend-portfolio-weather.git" target="_blank">View Source</a>
                  </span>
               
              </div>
          </div>
          <div className='work-imgs-item'>
              <img src='/portfolio/portfolio-work-flea.png' className='hover-img' />
              <div className='hover-display center'>
              {/* <div className="animated-progress progress-photoshop">
              <span data-progress="45"></span>
              </div> */}
                
                {/* <span className='button'>
                  <a href="mailto:hayoung.p12@gmail.com">Visit Website</a>
                  </span> */}
                
               
                <span className='button white-button'>
                  <a href="https://github.com/ParkAmber/frontend-portfolio-fleamarket-website.git" target="_blank">View Source</a>
                  </span>
               
              </div>
          </div>
          <div className='work-imgs-item'>
            <img src='/portfolio/portfolio-work-furniture.png' className='hover-img' />
            <div className='hover-display center'>
              {/* <div className="animated-progress progress-photoshop">
              <span data-progress="45"></span>
              </div> */}
                
                <span className='button'>
                <a href="https://amberpark.site/website/" target="_blank">Visit Website</a>
                  </span>
                
               
                <span className='button white-button'>
                  <a href="https://github.com/ParkAmber/frontend-portfolio-furniture-website.git" target="_blank">View Source</a>
                  </span>
               
              </div>
            </div>
          </div>
          <div className='get-btn'>
            <button className='button'>
            <a href="mailto:hayoung.p12@gmail.com">Get in touch</a>
            </button>
          </div>
      </section>
      <section id='portfolio-contact'>
        <div className='portfolio-contact-con'>
          <div className='contact-icons'>
          <div className='contact-img'>
            <img src='/social/portfolio-contact.png' />
            </div>
              <div className='social-icons'>
                <p>Contact</p>
                <a href="https://www.behance.net/amberpark1"> 
                  <img src='/social/contact-be.png' />
                </a>
                <a href="https://www.linkedin.com/in/hayoung-park12/">
                  <img src="/social/contact-linkden.png" />    
                </a>
                <a href="https://www.instagram.com/hayoung08park/">
                  <img src='/social/contact-insta.png' />
                </a>
                <a href="mailto:hayoung.p12@gmail.com">
                  <img src='/social/contact-mail.png' />
                </a>
          </div>
          </div>
          <div className='contact-contents'>
            <p>Interested in collaborating?<br /> Feel free to email me.</p>
            <button className='button white-button'>
            <a href="mailto:hayoung.p12@gmail.com">Email Me</a>
            </button>
         </div>
        </div>
        </section>
        </div>
    </>
  )
}
