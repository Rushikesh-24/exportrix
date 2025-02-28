// pages/index.js
'use client'
import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Link from 'next/link';

export default function Home() {
  useEffect(() => {
    const interval = setInterval(() => {
      gsap.to('.testimonial-content', {
        opacity: 0,
        y: 20,
        duration: 0.3,
        onComplete: () => {
          setActiveTestimonial(prev => (prev + 1) % testimonials.length);
          gsap.to('.testimonial-content', {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out"
          });
        }
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  // Refs for animation targets
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const successStoriesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  
  // Initialize GSAP
  useEffect(() => {
    // Register ScrollTrigger plugin
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
      
      // Hero section animations
      const heroTl = gsap.timeline();
      if (heroRef.current) {
        heroTl.fromTo(heroRef.current.querySelector('h1'), 
          { y: 50, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
        )
        .fromTo(heroRef.current.querySelector('p'), 
          { y: 30, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 
          "-=0.6"
        )
      }
      
      // Stats animation
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.querySelectorAll('.stat-item'),
          { y: 40, opacity: 0 },
          {
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 80%"
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out"
          }
        );
      }
      
      // Features animation
      if (featuresRef.current) {
        gsap.fromTo(
          featuresRef.current.querySelectorAll('.feature-card'),
          { y: 50, opacity: 0 },
          {
            scrollTrigger: {
              trigger: featuresRef.current,
              start: "top 75%"
            },
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: "power2.out"
          }
        );
      }
      
      // How It Works animation
      if (howItWorksRef.current) {
        gsap.fromTo(
          howItWorksRef.current.querySelectorAll('.step-item'),
          { scale: 0.8, opacity: 0 },
          {
            scrollTrigger: {
              trigger: howItWorksRef.current,
              start: "top 75%"
            },
            scale: 1,
            opacity: 1,
            duration: 0.6,
            stagger: 0.3,
            ease: "back.out(1.7)"
          }
        );
      }
      
      // Testimonials animation
      if (testimonialsRef.current) {
        gsap.fromTo(
          testimonialsRef.current.querySelector('.testimonial-card'),
          { y: 30, opacity: 0 },
          {
            scrollTrigger: {
              trigger: testimonialsRef.current,
              start: "top 70%"
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out"
          }
        );
      }
      
      // Success Stories animation
      if (successStoriesRef.current) {
        gsap.fromTo(
          successStoriesRef.current.querySelectorAll('.story-card'),
          { x: index => index % 2 === 0 ? -50 : 50, opacity: 0 },
          {
            scrollTrigger: {
              trigger: successStoriesRef.current,
              start: "top 70%"
            },
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.3,
            ease: "power2.out"
          }
        );
      }
      
      // CTA animation
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current.querySelectorAll('h2, p, button'),
          { y: 30, opacity: 0 },
          {
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 75%"
            },
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.2,
            ease: "power2.out"
          }
        );
      }
      
      // FAQ animation
      if (faqRef.current) {
        gsap.fromTo(
          faqRef.current.querySelectorAll('.faq-item'),
          { y: 20, opacity: 0 },
          {
            scrollTrigger: {
              trigger: faqRef.current,
              start: "top 80%"
            },
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out"
          }
        );
      }
    }
  }, []);
  
  // Handle testimonial change with animation

  interface ChangeTestimonialProps {
    index: number;
  }

  const changeTestimonial = ({ index }: ChangeTestimonialProps): void => {
    gsap.to('.testimonial-content', {
      opacity: 0,
      y: 20,
      duration: 0.3,
      onComplete: () => {
        setActiveTestimonial(index);
        gsap.to('.testimonial-content', {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out"
        });
      }
    });
  };
  
  const testimonials = [
    {
      quote: "Our exports increased by 250% in just 6 months after joining the platform. The automated documentation saved us countless hours.",
      name: "Rajiv Sharma",
      company: "Sharma Textiles",
      image: "/testimonial1.jpg"
    },
    {
      quote: "As a small handicraft producer, I never imagined I could sell internationally. Now 70% of my business comes from overseas buyers.",
      name: "Meera Patel",
      company: "Artistic Creations",
      image: "/testimonial2.jpg"
    },
    {
      quote: "The compliance module helped us navigate complex regulations across different countries. We can now export to 15 countries with confidence.",
      name: "Ahmed Khan",
      company: "Organic Spices Ltd.",
      image: "/testimonial3.jpg"
    }
  ];
  
  const features = [
    {
      icon: "📄",
      title: "Automated Documentation",
      description: "Generate all required export-import documents with just a few clicks. Save time and reduce errors."
    },
    {
      icon: "✅",
      title: "Compliance",
      description: "Stay up-to-date with international trade regulations and requirements across different markets."
    },
    {
      icon: "🚢",
      title: "Logistics",
      description: "Connect with verified logistics partners for seamless shipping and delivery tracking."
    },
    {
      icon: "📊",
      title: "Market Insights",
      description: "Access data-driven insights on market trends, pricing, and potential business opportunities."
    }
  ];
  
  const successStories = [
    {
      title: "From Local to Global",
      description: "How a small textile manufacturer from Coimbatore expanded to 12 countries in 18 months",
      image: "/success1.jpg"
    },
    {
      title: "Compliance Success",
      description: "Navigating complex EU regulations to successfully export organic products",
      image: "/success2.jpg"
    }
  ];
  


  
  const cardHover = (e:React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      duration: 0.3,
      ease: "power2.out"
    });
  };
  
  const cardLeave = (e:React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      y: 0,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      duration: 0.3,
      ease: "power2.out"
    });
  };
  
  return (
    <div className="min-h-screen">
      <Head>
        <title>MSME Global Trade Platform</title>
        <meta name="description" content="Empowering MSMEs for global trade" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <header className="bg-white shadow-md fixed w-full z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-black">Exportrix</div>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="#features" className="text-gray-600 hover:text-black transition-colors duration-300 relative nav-link">Features</Link>
            <Link href="#testimonials" className="text-gray-600 hover:text-black transition-colors duration-300 relative nav-link">Testimonials</Link>
            <Link href="#success" className="text-gray-600 hover:text-black transition-colors duration-300 relative nav-link">Success Stories</Link>
            <Link href="#faq" className="text-gray-600 hover:text-black transition-colors duration-300 relative nav-link">FAQ</Link>
          </nav>
          <button className="md:hidden focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </header>
      
      <main>
        {/* Hero Section */}
        <section ref={heroRef} className="relative pt-24 pb-20 md:pt-32 md:pb-32 bg-gradient-to-r from-black to-black text-white overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Empowering MSMEs for Global Trade</h1>
              <p className="text-xl mb-10">Connect with international buyers, streamline export processes, and grow your business globally.</p>
              <div className="flex flex-col md:flex-row gap-4 justify-center z-20">
                <Link href={'/signup'}
                  className="bg-white text-black font-semibold py-3 px-6 rounded-full hover:bg-black  duration-300 relative overflow-hidden transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-black before:duration-300 before:ease-out hover:before:h-60 hover:before:w-60 group flex justify-center items-center group"
                  
                >
                  <span className="z-10 group-hover:text-white">Sell as an MSME</span>
                </Link>
                <button 
                  className="bg-transparent border-2 border-white text-white font-semibold py-3 px-6 rounded-full hover:bg-white hover:text-black  duration-300 relative overflow-hidden transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-white before:duration-300 before:ease-out hover:before:h-60 hover:before:w-60 group flex justify-center items-center group"
                  
                >
                  Buy MSME Products
                </button>
                <button 
                  className="bg-black text-white font-semibold py-3 px-6 rounded-full hover:bg-black duration-300 relative overflow-hidden transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-black before:duration-300 before:ease-out hover:before:h-60 hover:before:w-60 group flex justify-center items-center group"
                  
                >
                  Register as CHA
                </button>
              </div>
            </div>
          </div>
          <div className="absolute left-0 -bottom-20 w-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path fill="#ffffff" fillOpacity="1" d="M0,128L80,138.7C160,149,320,171,480,165.3C640,160,800,128,960,122.7C1120,117,1280,139,1360,149.3L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
            </svg>
          </div>
          
          {/* Animated background elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
            <div className="circle-1 absolute w-64 h-64 rounded-full bg-white opacity-20" style={{top: '10%', left: '5%'}}></div>
            <div className="circle-2 absolute w-96 h-96 rounded-full bg-white opacity-10" style={{bottom: '15%', right: '10%'}}></div>
            <div className="circle-3 absolute w-40 h-40 rounded-full bg-white opacity-15" style={{top: '30%', right: '25%'}}></div>
          </div>
        </section>
        
        {/* Stats */}
        <section ref={statsRef} className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center stat-item">
                <p className="text-4xl font-bold text-black mb-2 counter">5000+</p>
                <p className="text-gray-600">MSMEs on the platform</p>
              </div>
              <div className="text-center stat-item">
                <p className="text-4xl font-bold text-black mb-2 counter">75+</p>
                <p className="text-gray-600">Countries reached</p>
              </div>
              <div className="text-center stat-item">
                <p className="text-4xl font-bold text-black mb-2 counter">$250M+</p>
                <p className="text-gray-600">Trade facilitated</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Key Features */}
        <section id="features" ref={featuresRef} className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-white p-6 rounded-lg shadow-lg feature-card"
                  onMouseEnter={cardHover}
                  onMouseLeave={cardLeave}
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section ref={howItWorksRef} className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
            <div className="flex flex-col md:flex-row justify-between items-center max-w-4xl mx-auto">
              <div className="flex flex-col items-center mb-8 md:mb-0 step-item">
                <div className="bg-black text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mb-4">1</div>
                <p className="text-center">Register & Create Profile</p>
              </div>
              <div className="border-t-2 md:border-t-0 md:border-l-2 border-dashed border-gray-300 h-12 md:h-24 w-0 md:w-auto"></div>
              <div className="flex flex-col items-center mb-8 md:mb-0 step-item">
                <div className="bg-black text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mb-4">2</div>
                <p className="text-center">List Products or Source</p>
              </div>
              <div className="border-t-2 md:border-t-0 md:border-l-2 border-dashed border-gray-300 h-12 md:h-24 w-0 md:w-auto"></div>
              <div className="flex flex-col items-center step-item">
                <div className="bg-black text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mb-4">3</div>
                <p className="text-center">Connect & Trade Globally</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section id="testimonials" ref={testimonialsRef} className="py-16 bg-black">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16">What Our Users Say</h2>
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg testimonial-card">
              <div className="flex flex-col items-center">
                <div className="mb-6 relative w-20 h-20 rounded-full overflow-hidden bg-gray-300">
                  {/* You would need actual images here */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-600 text-xl">
                    {testimonials[activeTestimonial].name.charAt(0)}
                  </div>
                </div>
                <div className="testimonial-content">
                  <p className="text-gray-600 text-lg italic mb-6 text-center">&quot;{testimonials[activeTestimonial].quote}&quot;</p>
                  <h4 className="font-semibold text-center">{testimonials[activeTestimonial].name}</h4>
                  <p className="text-gray-600 text-center">{testimonials[activeTestimonial].company}</p>
                </div>
              </div>
              <div className="flex justify-center mt-8">
                {testimonials.map((_, index) => (
                  <button 
                  key={index}
                  onClick={() => changeTestimonial({ index })}
                  className={`w-3 h-3 rounded-full mx-1 transition-colors duration-300 ${activeTestimonial === index ? 'bg-black' : 'bg-gray-300'}`}
                  aria-label={`View testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Success Stories */}
        <section id="success" ref={successStoriesRef} className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16">Success Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {successStories.map((story, index) => (
                <div 
                  key={index} 
                  className="bg-gray-50 rounded-lg overflow-hidden shadow-lg story-card"
                  onMouseEnter={cardHover}
                  onMouseLeave={cardLeave}
                >
                  <div className="h-48 bg-gray-300 relative">
                    {/* You would need actual images here */}
                    <div className="absolute inset-0 flex items-center justify-center text-gray-600 text-xl">
                      Success Story Image
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3">{story.title}</h3>
                    <p className="text-gray-600 mb-4">{story.description}</p>
                    <a 
                      href="#" 
                      className="text-black font-medium hover:underline inline-flex items-center"
                    >
                      Read the full story
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section ref={ctaRef} className="py-16 bg-gradient-to-r from-black to-black text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Take Your Business Global?</h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto">Join thousands of MSMEs who have successfully expanded their business internationally through our platform.</p>
            <button 
              className="bg-white text-black font-semibold py-3 px-8 rounded-full hover:bg-blacktransition-colors duration-300 text-lg"
            >
              Get Started Now
            </button>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section id="faq" ref={faqRef} className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto">
              <div className="mb-6 border-b border-gray-200 pb-6 faq-item">
                <h3 className="text-xl font-semibold mb-3">What is MSME Trade Platform?</h3>
                <p className="text-gray-600">Our platform connects Micro, Small and Medium Enterprises with international buyers and simplifies the export-import process through automation, compliance assistance, and logistics support.</p>
              </div>
              <div className="mb-6 border-b border-gray-200 pb-6 faq-item">
                <h3 className="text-xl font-semibold mb-3">How do I register as an MSME?</h3>
                <p className="text-gray-600">Click on the &quot;Sell as an MSME&quot; button, complete the registration form, verify your business details, and create your product catalog to get started.</p>
              </div>
              <div className="mb-6 border-b border-gray-200 pb-6 faq-item">
                <h3 className="text-xl font-semibold mb-3">What is a CHA and why should I register as one?</h3>
                <p className="text-gray-600">CHA (Custom House Agent) helps businesses with customs clearance and documentation. Registering as a CHA on our platform connects you with MSMEs needing your services for international trade.</p>
              </div>
              <div className="text-center mt-10">
                <a 
                  href="#" 
                  className="text-black font-medium hover:underline inline-flex items-center"
                  onMouseEnter={(e) => gsap.to(e.currentTarget, {scale: 1.05, duration: 0.3})}
                  onMouseLeave={(e) => gsap.to(e.currentTarget, {scale: 1, duration: 0.3})}
                >
                  View all FAQs
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">MSME Trade</h3>
              <p className="text-gray-400">Empowering small businesses to participate in global trade through technology, compliance, and market access.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Features</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Testimonials</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Success Stories</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@msmetrade.com</li>
                <li>Phone: +91 98765 43210</li>
                <li>Address: Trade Tower, Sector 16, New Delhi, India</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Terms of Service</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Privacy Policy</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Cookie Policy</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Shipping Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-10 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} MSME Trade Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      <style jsx>{`
        /* Navbar underline animation */
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -4px;
          left: 0;
          background-color: #2563eb;
          transition: width 0.3s ease;
        }
        .nav-link:hover::after {
          width: 100%;
        }
        
        /* Animated background circles */
        @keyframes float1 {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(15px, -15px) rotate(5deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        @keyframes float2 {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-20px, 10px) rotate(-5deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        @keyframes float3 {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(10px, 10px) rotate(7deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        
        .circle-1 {
          animation: float1 15s ease-in-out infinite;
        }
        .circle-2 {
          animation: float2 18s ease-in-out infinite;
        }
        .circle-3 {
          animation: float3 12s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}