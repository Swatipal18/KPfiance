// ? with  all function working
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import styles from "./Login.module.css";
// import { FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
// // import { getFcmToken } from "../../firebase";
// import axiosInstance, { setAuthToken } from "../../api/axiosInstance";



// ? with animations and  illustrations  and no functionality
// import React, { useEffect, useRef, useState } from 'react';
// import gsap from 'gsap';

// const styles = {
//   container: {
//     minHeight: '100vh',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//     padding: '20px',
//     fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
//     position: 'relative',
//     overflow: 'hidden'
//   },
//   bgShapes: {
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//     overflow: 'hidden',
//     zIndex: 0
//   },
//   shape: {
//     position: 'absolute',
//     background: 'rgba(255, 255, 255, 0.05)',
//     borderRadius: '50%'
//   },
//   illustration: {
//     position: 'absolute',
//     zIndex: 0
//   },
//   mainContainer: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: '60px',
//     width: '100%',
//     maxWidth: '1100px',
//     position: 'relative',
//     zIndex: 1,
//     flexWrap: 'wrap'
//   },
//   illustrationPanel: {
//     flex: '1',
//     minWidth: '300px',
//     maxWidth: '450px',
//     position: 'relative',
//     height: '500px'
//   },
//   loginCard: {
//     background: 'rgba(255, 255, 255, 0.95)',
//     backdropFilter: 'blur(10px)',
//     borderRadius: '20px',
//     boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
//     width: '100%',
//     maxWidth: '420px',
//     padding: '40px 30px',
//     position: 'relative',
//     zIndex: 1
//   },
//   header: {
//     textAlign: 'center',
//     marginBottom: '35px'
//   },
//   logo: {
//     width: '60px',
//     height: '60px',
//     margin: '0 auto 20px',
//     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//     borderRadius: '15px',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     fontSize: '28px',
//     color: '#fff',
//     fontWeight: '700'
//   },
//   title: {
//     fontSize: '26px',
//     fontWeight: '700',
//     color: '#1a202c',
//     marginBottom: '8px',
//     letterSpacing: '-0.5px'
//   },
//   subtitle: {
//     fontSize: '14px',
//     color: '#718096',
//     fontWeight: '400'
//   },
//   formContainer: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '20px'
//   },
//   inputGroup: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '8px'
//   },
//   label: {
//     fontSize: '14px',
//     fontWeight: '600',
//     color: '#2d3748',
//     marginLeft: '4px'
//   },
//   input: {
//     width: '100%',
//     padding: '14px 16px',
//     fontSize: '15px',
//     border: '2px solid #e2e8f0',
//     borderRadius: '10px',
//     outline: 'none',
//     transition: 'all 0.3s ease',
//     fontFamily: 'inherit',
//     boxSizing: 'border-box'
//   },
//   inputFocus: {
//     border: '2px solid #667eea',
//     boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
//   },
//   rememberForgot: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     fontSize: '14px',
//     flexWrap: 'wrap',
//     gap: '10px'
//   },
//   checkboxLabel: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '8px',
//     color: '#4a5568',
//     cursor: 'pointer',
//     userSelect: 'none'
//   },
//   checkbox: {
//     width: '18px',
//     height: '18px',
//     cursor: 'pointer'
//   },
//   forgotLink: {
//     color: '#667eea',
//     textDecoration: 'none',
//     fontWeight: '600',
//     transition: 'color 0.2s',
//     cursor: 'pointer'
//   },
//   button: {
//     width: '100%',
//     padding: '14px',
//     fontSize: '16px',
//     fontWeight: '600',
//     color: '#fff',
//     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//     border: 'none',
//     borderRadius: '10px',
//     cursor: 'pointer',
//     transition: 'all 0.3s ease',
//     marginTop: '10px'
//   },
//   buttonHover: {
//     transform: 'translateY(-2px)',
//     boxShadow: '0 10px 25px rgba(102, 126, 234, 0.4)'
//   },
//   footer: {
//     textAlign: 'center',
//     marginTop: '30px',
//     paddingTop: '25px',
//     borderTop: '1px solid #e2e8f0',
//     fontSize: '13px',
//     color: '#718096'
//   },
//   footerLink: {
//     color: '#667eea',
//     fontWeight: '600',
//     marginLeft: '5px',
//     cursor: 'pointer'
//   }
// };

// const Login = () => {
//   const cardRef = useRef(null);
//   const logoRef = useRef(null);
//   const titleRef = useRef(null);
//   const formRef = useRef(null);
//   const shapesRef = useRef([]);
//   const coinsRef = useRef([]);
//   const chartRef = useRef(null);
//   const docRef = useRef(null);
//   const calculatorRef = useRef(null);
//   const creditCardRef = useRef(null);
//   const walletRef = useRef(null);
//   const bankRef = useRef(null);
//   const growthArrowRef = useRef(null);
//   const dollarSignsRef = useRef([]);
  
//   const [focusedInput, setFocusedInput] = useState(null);
//   const [isHovered, setIsHovered] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   useEffect(() => {
//     // Background shapes animation
//     shapesRef.current.forEach((shape, i) => {
//       if (shape) {
//         gsap.to(shape, {
//           y: `${Math.random() * 100 - 50}`,
//           x: `${Math.random() * 100 - 50}`,
//           duration: 10 + i * 2,
//           repeat: -1,
//           yoyo: true,
//           ease: 'sine.inOut'
//         });
//       }
//     });

//     // Card entrance animation
//     const tl = gsap.timeline();
//     tl.from(cardRef.current, {
//       scale: 0.8,
//       opacity: 0,
//       duration: 0.6,
//       ease: 'back.out(1.7)'
//     })
//     .from(logoRef.current, {
//       scale: 0,
//       rotation: 360,
//       duration: 0.6,
//       ease: 'back.out(2)'
//     }, '-=0.3')
//     .from(titleRef.current, {
//       y: 20,
//       opacity: 0,
//       duration: 0.4
//     }, '-=0.2')
//     .from(formRef.current.children, {
//       y: 20,
//       opacity: 0,
//       duration: 0.4,
//       stagger: 0.1
//     }, '-=0.2');

//     // Coins floating animation
//     coinsRef.current.forEach((coin, i) => {
//       if (coin) {
//         gsap.from(coin, {
//           y: 100,
//           opacity: 0,
//           scale: 0,
//           rotation: 360,
//           duration: 1,
//           delay: 0.5 + i * 0.15,
//           ease: 'back.out(1.7)'
//         });
        
//         gsap.to(coin, {
//           y: '+=25',
//           rotation: '+=15',
//           duration: 2 + i * 0.5,
//           repeat: -1,
//           yoyo: true,
//           ease: 'sine.inOut'
//         });
//       }
//     });

//     // Chart animation with bar growth
//     if (chartRef.current) {
//       const bars = chartRef.current.querySelectorAll('.chart-bar');
//       gsap.from(chartRef.current, {
//         scale: 0,
//         opacity: 0,
//         rotation: -10,
//         duration: 0.8,
//         delay: 0.7,
//         ease: 'back.out(1.7)'
//       });
      
//       gsap.from(bars, {
//         scaleY: 0,
//         transformOrigin: 'bottom',
//         duration: 0.6,
//         stagger: 0.1,
//         delay: 1.2,
//         ease: 'back.out(1.7)'
//       });

//       gsap.to(chartRef.current, {
//         y: '+=10',
//         rotation: 3,
//         duration: 3,
//         repeat: -1,
//         yoyo: true,
//         ease: 'sine.inOut'
//       });
//     }

//     // Document animation with page flip effect
//     if (docRef.current) {
//       gsap.from(docRef.current, {
//         x: -100,
//         opacity: 0,
//         rotationY: 90,
//         duration: 0.8,
//         delay: 0.9,
//         ease: 'back.out(1.7)'
//       });
      
//       gsap.to(docRef.current, {
//         y: '+=15',
//         rotation: 2,
//         duration: 2.5,
//         repeat: -1,
//         yoyo: true,
//         ease: 'sine.inOut'
//       });
//     }

//     // Calculator animation with button press
//     if (calculatorRef.current) {
//       gsap.from(calculatorRef.current, {
//         x: 100,
//         opacity: 0,
//         scale: 0.5,
//         duration: 0.8,
//         delay: 1.1,
//         ease: 'back.out(1.7)'
//       });
      
//       gsap.to(calculatorRef.current, {
//         rotation: -3,
//         y: '+=12',
//         duration: 3.5,
//         repeat: -1,
//         yoyo: true,
//         ease: 'sine.inOut'
//       });
//     }

//     // Credit Card animation with shine effect
//     if (creditCardRef.current) {
//       gsap.from(creditCardRef.current, {
//         x: -150,
//         opacity: 0,
//         rotationY: -90,
//         duration: 1,
//         delay: 1.3,
//         ease: 'back.out(1.7)'
//       });
      
//       gsap.to(creditCardRef.current, {
//         y: '+=18',
//         rotation: -2,
//         duration: 2.8,
//         repeat: -1,
//         yoyo: true,
//         ease: 'sine.inOut'
//       });
//     }

//     // Wallet animation with bounce
//     if (walletRef.current) {
//       gsap.from(walletRef.current, {
//         y: -100,
//         opacity: 0,
//         scale: 0,
//         duration: 0.9,
//         delay: 1.5,
//         ease: 'bounce.out'
//       });
      
//       gsap.to(walletRef.current, {
//         y: '+=20',
//         rotation: 5,
//         duration: 2.3,
//         repeat: -1,
//         yoyo: true,
//         ease: 'sine.inOut'
//       });
//     }

//     // Bank building animation
//     if (bankRef.current) {
//       gsap.from(bankRef.current, {
//         y: 100,
//         opacity: 0,
//         scale: 0.5,
//         duration: 1,
//         delay: 1.7,
//         ease: 'back.out(1.7)'
//       });
      
//       gsap.to(bankRef.current, {
//         y: '+=10',
//         duration: 3.2,
//         repeat: -1,
//         yoyo: true,
//         ease: 'sine.inOut'
//       });
//     }

//     // Growth arrow animation
//     if (growthArrowRef.current) {
//       gsap.from(growthArrowRef.current, {
//         scale: 0,
//         opacity: 0,
//         duration: 0.8,
//         delay: 1.9,
//         ease: 'back.out(2)'
//       });
      
//       gsap.to(growthArrowRef.current, {
//         y: '+=15',
//         rotation: 3,
//         duration: 2,
//         repeat: -1,
//         yoyo: true,
//         ease: 'sine.inOut'
//       });
//     }

//     // Dollar signs animation
//     dollarSignsRef.current.forEach((sign, i) => {
//       if (sign) {
//         gsap.from(sign, {
//           y: 50,
//           opacity: 0,
//           scale: 0,
//           duration: 0.6,
//           delay: 2.1 + i * 0.2,
//           ease: 'back.out(1.7)'
//         });
        
//         gsap.to(sign, {
//           y: '+=30',
//           rotation: '+=10',
//           duration: 2.5 + i * 0.3,
//           repeat: -1,
//           yoyo: true,
//           ease: 'sine.inOut'
//         });
//       }
//     });
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     gsap.to(cardRef.current, {
//       scale: 0.98,
//       duration: 0.1,
//       yoyo: true,
//       repeat: 1,
//       ease: 'power2.inOut'
//     });
//     console.log('Login submitted', { email, password });
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.bgShapes}>
//         {[...Array(6)].map((_, i) => (
//           <div
//             key={i}
//             ref={el => shapesRef.current[i] = el}
//             style={{
//               ...styles.shape,
//               width: `${Math.random() * 300 + 100}px`,
//               height: `${Math.random() * 300 + 100}px`,
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`
//             }}
//           />
//         ))}
//       </div>

//       <div style={styles.mainContainer}>
//         {/* Illustration Panel */}
//         <div style={styles.illustrationPanel}>
//           {/* Animated Coins */}
//           <svg ref={el => coinsRef.current[0] = el} width="85" height="85" viewBox="0 0 85 85" style={{...styles.illustration, top: '30px', left: '40px'}}>
//             <defs>
//               <linearGradient id="coinGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
//                 <stop offset="0%" style={{stopColor: '#FFD700', stopOpacity: 1}} />
//                 <stop offset="100%" style={{stopColor: '#FFA500', stopOpacity: 1}} />
//               </linearGradient>
//             </defs>
//             <circle cx="42.5" cy="42.5" r="38" fill="url(#coinGrad1)" opacity="0.9"/>
//             <circle cx="42.5" cy="42.5" r="32" fill="#FFC700" opacity="0.9"/>
//             <text x="42.5" y="55" fontSize="38" fill="#fff" textAnchor="middle" fontWeight="bold">₹</text>
//           </svg>

//           <svg ref={el => coinsRef.current[1] = el} width="70" height="70" viewBox="0 0 70 70" style={{...styles.illustration, top: '140px', left: '10px'}}>
//             <circle cx="35" cy="35" r="32" fill="#FFD700" opacity="0.85"/>
//             <circle cx="35" cy="35" r="27" fill="#FFC700"/>
//             <text x="35" y="45" fontSize="32" fill="#fff" textAnchor="middle" fontWeight="bold">₹</text>
//           </svg>

//           <svg ref={el => coinsRef.current[2] = el} width="60" height="60" viewBox="0 0 60 60" style={{...styles.illustration, top: '80px', right: '70px'}}>
//             <circle cx="30" cy="30" r="27" fill="#FFD700" opacity="0.8"/>
//             <circle cx="30" cy="30" r="22" fill="#FFC700"/>
//             <text x="30" y="38" fontSize="28" fill="#fff" textAnchor="middle" fontWeight="bold">₹</text>
//           </svg>

//           {/* Animated Chart with bars */}
//           <svg ref={chartRef} width="160" height="130" viewBox="0 0 160 130" style={{...styles.illustration, bottom: '110px', left: '30px'}}>
//             <rect width="160" height="130" rx="12" fill="#fff" opacity="0.98" filter="drop-shadow(0 4px 12px rgba(0,0,0,0.15))"/>
//             <rect className="chart-bar" x="25" y="75" width="22" height="40" fill="#667eea" rx="4"/>
//             <rect className="chart-bar" x="55" y="55" width="22" height="60" fill="#764ba2" rx="4"/>
//             <rect className="chart-bar" x="85" y="65" width="22" height="50" fill="#667eea" rx="4"/>
//             <rect className="chart-bar" x="115" y="45" width="22" height="70" fill="#10b981" rx="4"/>
//             <polyline points="36,80 66,60 96,70 126,50" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round"/>
//             <circle cx="36" cy="80" r="4" fill="#10b981"/>
//             <circle cx="66" cy="60" r="4" fill="#10b981"/>
//             <circle cx="96" cy="70" r="4" fill="#10b981"/>
//             <circle cx="126" cy="50" r="4" fill="#10b981"/>
//           </svg>

//           {/* Document with Invoice details */}
//           <svg ref={docRef} width="95" height="115" viewBox="0 0 95 115" style={{...styles.illustration, top: '270px', right: '40px'}}>
//             <rect width="95" height="115" rx="10" fill="#fff" opacity="0.98" filter="drop-shadow(0 4px 12px rgba(0,0,0,0.15))"/>
//             <rect width="95" height="28" rx="10" fill="#667eea"/>
//             <text x="47.5" y="19" fontSize="12" fill="#fff" textAnchor="middle" fontWeight="bold">INVOICE</text>
//             <rect x="12" y="42" width="71" height="7" rx="3.5" fill="#e2e8f0"/>
//             <rect x="12" y="55" width="60" height="6" rx="3" fill="#e2e8f0"/>
//             <rect x="12" y="67" width="65" height="6" rx="3" fill="#e2e8f0"/>
//             <rect x="12" y="79" width="55" height="6" rx="3" fill="#e2e8f0"/>
//             <rect x="12" y="95" width="40" height="10" rx="5" fill="#10b981"/>
//             <text x="32" y="103" fontSize="8" fill="#fff" textAnchor="middle" fontWeight="bold">PAID</text>
//           </svg>

//           {/* Calculator */}
//           <svg ref={calculatorRef} width="85" height="105" viewBox="0 0 85 105" style={{...styles.illustration, bottom: '40px', right: '90px'}}>
//             <rect width="85" height="105" rx="10" fill="#fff" opacity="0.98" filter="drop-shadow(0 4px 12px rgba(0,0,0,0.15))"/>
//             <rect x="10" y="10" width="65" height="22" rx="5" fill="#764ba2"/>
//             <text x="42.5" y="25" fontSize="14" fill="#fff" textAnchor="middle" fontWeight="bold">8,850</text>
//             <rect x="12" y="40" width="17" height="16" rx="4" fill="#e2e8f0"/>
//             <rect x="34" y="40" width="17" height="16" rx="4" fill="#e2e8f0"/>
//             <rect x="56" y="40" width="17" height="16" rx="4" fill="#e2e8f0"/>
//             <rect x="12" y="60" width="17" height="16" rx="4" fill="#e2e8f0"/>
//             <rect x="34" y="60" width="17" height="16" rx="4" fill="#e2e8f0"/>
//             <rect x="56" y="60" width="17" height="16" rx="4" fill="#667eea"/>
//             <rect x="12" y="80" width="39" height="16" rx="4" fill="#e2e8f0"/>
//             <rect x="56" y="80" width="17" height="16" rx="4" fill="#10b981"/>
//           </svg>

//           {/* Credit Card */}
//           <svg ref={creditCardRef} width="130" height="85" viewBox="0 0 130 85" style={{...styles.illustration, top: '180px', left: '80px'}}>
//             <defs>
//               <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
//                 <stop offset="0%" style={{stopColor: '#667eea', stopOpacity: 1}} />
//                 <stop offset="100%" style={{stopColor: '#764ba2', stopOpacity: 1}} />
//               </linearGradient>
//             </defs>
//             <rect width="130" height="85" rx="10" fill="url(#cardGrad)" filter="drop-shadow(0 6px 15px rgba(0,0,0,0.25))"/>
//             <rect y="20" width="130" height="15" fill="rgba(0,0,0,0.3)"/>
//             <rect x="15" y="48" width="35" height="8" rx="4" fill="rgba(255,255,255,0.4)"/>
//             <circle cx="105" cy="52" r="12" fill="rgba(255,255,255,0.3)"/>
//             <circle cx="115" cy="52" r="12" fill="rgba(255,255,255,0.3)"/>
//             <text x="15" y="72" fontSize="9" fill="#fff" fontWeight="bold">**** **** **** 1234</text>
//           </svg>

//           {/* Wallet */}
//           <svg ref={walletRef} width="80" height="70" viewBox="0 0 80 70" style={{...styles.illustration, top: '10px', right: '10px'}}>
//             <rect x="5" y="15" width="70" height="50" rx="8" fill="#764ba2" opacity="0.95" filter="drop-shadow(0 4px 10px rgba(0,0,0,0.2))"/>
//             <rect x="10" y="10" width="70" height="50" rx="8" fill="#667eea"/>
//             <rect x="60" y="30" width="15" height="20" rx="3" fill="#fff" opacity="0.9"/>
//             <circle cx="67.5" cy="40" r="3" fill="#764ba2"/>
//             <rect x="15" y="20" width="40" height="4" rx="2" fill="rgba(255,255,255,0.5)"/>
//             <rect x="15" y="28" width="30" height="4" rx="2" fill="rgba(255,255,255,0.5)"/>
//           </svg>

//           {/* Bank Building */}
//           <svg ref={bankRef} width="90" height="100" viewBox="0 0 90 100" style={{...styles.illustration, bottom: '180px', right: '20px'}}>
//             <polygon points="45,10 10,35 80,35" fill="#667eea"/>
//             <rect x="20" y="40" width="15" height="45" fill="#fff" opacity="0.9"/>
//             <rect x="38" y="40" width="15" height="45" fill="#fff" opacity="0.9"/>
//             <rect x="56" y="40" width="15" height="45" fill="#fff" opacity="0.9"/>
//             <rect x="15" y="88" width="60" height="8" fill="#764ba2"/>
//             <circle cx="45" cy="23" r="5" fill="#FFD700"/>
//             <text x="45" y="28" fontSize="8" fill="#fff" textAnchor="middle" fontWeight="bold">₹</text>
//           </svg>

//           {/* Growth Arrow */}
//           <svg ref={growthArrowRef} width="100" height="100" viewBox="0 0 100 100" style={{...styles.illustration, bottom: '220px', left: '150px'}}>
//             <defs>
//               <linearGradient id="arrowGrad" x1="0%" y1="100%" x2="100%" y2="0%">
//                 <stop offset="0%" style={{stopColor: '#10b981', stopOpacity: 1}} />
//                 <stop offset="100%" style={{stopColor: '#34d399', stopOpacity: 1}} />
//               </linearGradient>
//             </defs>
//             <path d="M 20 80 Q 40 50 60 30 L 85 15" stroke="url(#arrowGrad)" strokeWidth="5" fill="none" strokeLinecap="round"/>
//             <polygon points="85,15 75,10 80,20" fill="#10b981"/>
//             <circle cx="20" cy="80" r="4" fill="#10b981"/>
//             <circle cx="45" cy="55" r="4" fill="#10b981"/>
//             <circle cx="70" cy="25" r="4" fill="#10b981"/>
//           </svg>

//           {/* Floating Dollar Signs */}
//           <text ref={el => dollarSignsRef.current[0] = el} x="0" y="0" fontSize="24" fill="#FFD700" fontWeight="bold" style={{...styles.illustration, top: '50px', right: '150px'}}>$</text>
//           <text ref={el => dollarSignsRef.current[1] = el} x="0" y="0" fontSize="20" fill="#10b981" fontWeight="bold" style={{...styles.illustration, top: '350px', left: '5px'}}>$</text>
//           <text ref={el => dollarSignsRef.current[2] = el} x="0" y="0" fontSize="18" fill="#667eea" fontWeight="bold" style={{...styles.illustration, bottom: '20px', left: '200px'}}>$</text>
//         </div>

//         {/* Login Card */}
//         <div ref={cardRef} style={styles.loginCard}>
//           <div style={styles.header}>
//             <div ref={logoRef} style={styles.logo}>₹</div>
//             <h1 ref={titleRef} style={styles.title}>Admin Login</h1>
//             <p style={styles.subtitle}>Finance Management Portal</p>
//           </div>

//           <div ref={formRef} style={styles.formContainer}>
//             <div style={styles.inputGroup}>
//               <label style={styles.label}>Email Address</label>
//               <input
//                 type="email"
//                 placeholder="admin@finance.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 style={{
//                   ...styles.input,
//                   ...(focusedInput === 'email' ? styles.inputFocus : {})
//                 }}
//                 onFocus={() => setFocusedInput('email')}
//                 onBlur={() => setFocusedInput(null)}
//               />
//             </div>

//             <div style={styles.inputGroup}>
//               <label style={styles.label}>Password</label>
//               <input
//                 type="password"
//                 placeholder="••••••••"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 style={{
//                   ...styles.input,
//                   ...(focusedInput === 'password' ? styles.inputFocus : {})
//                 }}
//                 onFocus={() => setFocusedInput('password')}
//                 onBlur={() => setFocusedInput(null)}
//               />
//             </div>

//             <div style={styles.rememberForgot}>
//               <label style={styles.checkboxLabel}>
//                 <input type="checkbox" style={styles.checkbox} />
//                 <span>Remember me</span>
//               </label>
//               <span 
//                 style={styles.forgotLink}
//                 onMouseEnter={(e) => e.target.style.color = '#764ba2'}
//                 onMouseLeave={(e) => e.target.style.color = '#667eea'}
//               >
//                 Forgot password?
//               </span>
//             </div>

//             <button
//               onClick={handleSubmit}
//               style={{
//                 ...styles.button,
//                 ...(isHovered ? styles.buttonHover : {})
//               }}
//               onMouseEnter={() => setIsHovered(true)}
//               onMouseLeave={() => setIsHovered(false)}
//             >
//               Sign In
//             </button>
//           </div>

//           <div style={styles.footer}>
//             Need help?
//             <span 
//               style={styles.footerLink}
//               onMouseEnter={(e) => e.target.style.color = '#764ba2'}
//               onMouseLeave={(e) => e.target.style.color = '#667eea'}
//             >
//               Contact Support
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;










// ? with animations and no functionality
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    position: 'relative',
    overflow: 'hidden'
  },
  bgShapes: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    zIndex: 0
  },
  shape: {
    position: 'absolute',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '50%'
  },
  illustration: {
    position: 'absolute',
    zIndex: 0
  },
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '60px',
    width: '100%',
    maxWidth: '1100px',
    position: 'relative',
    zIndex: 1,
    flexWrap: 'wrap'
  },
  illustrationPanel: {
    flex: '1',
    minWidth: '300px',
    maxWidth: '450px',
    position: 'relative',
    height: '500px'
  },
  loginCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    width: '100%',
    maxWidth: '420px',
    padding: '40px 30px',
    position: 'relative',
    zIndex: 1
  },
  header: {
    textAlign: 'center',
    marginBottom: '35px'
  },
  logo: {
    width: '60px',
    height: '60px',
    margin: '0 auto 20px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '28px',
    color: '#fff',
    fontWeight: '700'
  },
  title: {
    fontSize: '26px',
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: '8px',
    letterSpacing: '-0.5px'
  },
  subtitle: {
    fontSize: '14px',
    color: '#718096',
    fontWeight: '400'
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#2d3748',
    marginLeft: '4px'
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    fontSize: '15px',
    border: '2px solid #e2e8f0',
    borderRadius: '10px',
    outline: 'none',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit',
    boxSizing: 'border-box'
  },
  inputFocus: {
    border: '2px solid #667eea',
    boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
  },
  rememberForgot: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '14px',
    flexWrap: 'wrap',
    gap: '10px'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#4a5568',
    cursor: 'pointer',
    userSelect: 'none'
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer'
  },
  forgotLink: {
    color: '#667eea',
    textDecoration: 'none',
    fontWeight: '600',
    transition: 'color 0.2s',
    cursor: 'pointer'
  },
  button: {
    width: '100%',
    padding: '14px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#fff',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '10px'
  },
  buttonHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 25px rgba(102, 126, 234, 0.4)'
  },
  footer: {
    textAlign: 'center',
    marginTop: '30px',
    paddingTop: '25px',
    borderTop: '1px solid #e2e8f0',
    fontSize: '13px',
    color: '#718096'
  },
  footerLink: {
    color: '#667eea',
    fontWeight: '600',
    marginLeft: '5px',
    cursor: 'pointer'
  }
};

const Login = () => {
  const cardRef = useRef(null);
  const logoRef = useRef(null);
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const shapesRef = useRef([]);
  const coinsRef = useRef([]);
  const chartRef = useRef(null);
  const docRef = useRef(null);
  const calculatorRef = useRef(null);
  
  const [focusedInput, setFocusedInput] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Background shapes
    shapesRef.current.forEach((shape, i) => {
      if (shape) {
        gsap.to(shape, {
          y: `${Math.random() * 100 - 50}`,
          x: `${Math.random() * 100 - 50}`,
          duration: 10 + i * 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }
    });

    // Card animation
    const tl = gsap.timeline();
    tl.from(cardRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.6,
      ease: 'back.out(1.7)'
    })
    .from(logoRef.current, {
      scale: 0,
      rotation: 180,
      duration: 0.5,
      ease: 'back.out(1.7)'
    }, '-=0.3')
    .from(titleRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.4
    }, '-=0.2')
    .from(formRef.current.children, {
      y: 20,
      opacity: 0,
      duration: 0.4,
      stagger: 0.1
    }, '-=0.2');

    // Coins floating animation
    coinsRef.current.forEach((coin, i) => {
      if (coin) {
        gsap.from(coin, {
          y: 100,
          opacity: 0,
          duration: 1,
          delay: 0.5 + i * 0.2,
          ease: 'back.out(1.7)'
        });
        
        gsap.to(coin, {
          y: '+=20',
          duration: 2 + i * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }
    });

    // Chart animation
    if (chartRef.current) {
      gsap.from(chartRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        delay: 0.7,
        ease: 'back.out(1.7)'
      });
      
      gsap.to(chartRef.current, {
        rotation: 5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }

    // Document animation
    if (docRef.current) {
      gsap.from(docRef.current, {
        x: -100,
        opacity: 0,
        duration: 0.8,
        delay: 0.9,
        ease: 'back.out(1.7)'
      });
      
      gsap.to(docRef.current, {
        y: '+=15',
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }

    // Calculator animation
    if (calculatorRef.current) {
      gsap.from(calculatorRef.current, {
        x: 100,
        opacity: 0,
        duration: 0.8,
        delay: 1.1,
        ease: 'back.out(1.7)'
      });
      
      gsap.to(calculatorRef.current, {
        rotation: -5,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    gsap.to(e.target, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1
    });
    console.log('Login submitted', { email, password });
  };

  return (
    <div style={styles.container}>
      <div style={styles.bgShapes}>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            ref={el => shapesRef.current[i] = el}
            style={{
              ...styles.shape,
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      <div style={styles.mainContainer}>
        {/* Illustration Panel */}
        <div style={styles.illustrationPanel}>
          {/* Coins */}
          <svg ref={el => coinsRef.current[0] = el} width="80" height="80" viewBox="0 0 80 80" style={{...styles.illustration, top: '50px', left: '50px'}}>
            <circle cx="40" cy="40" r="35" fill="#FFD700" opacity="0.9"/>
            <circle cx="40" cy="40" r="30" fill="#FFC700"/>
            <text x="40" y="50" fontSize="35" fill="#fff" textAnchor="middle" fontWeight="bold">₹</text>
          </svg>

          <svg ref={el => coinsRef.current[1] = el} width="70" height="70" viewBox="0 0 70 70" style={{...styles.illustration, top: '150px', left: '20px'}}>
            <circle cx="35" cy="35" r="30" fill="#FFD700" opacity="0.8"/>
            <circle cx="35" cy="35" r="25" fill="#FFC700"/>
            <text x="35" y="43" fontSize="30" fill="#fff" textAnchor="middle" fontWeight="bold">₹</text>
          </svg>

          <svg ref={el => coinsRef.current[2] = el} width="65" height="65" viewBox="0 0 65 65" style={{...styles.illustration, top: '100px', right: '80px'}}>
            <circle cx="32.5" cy="32.5" r="28" fill="#FFD700" opacity="0.85"/>
            <circle cx="32.5" cy="32.5" r="23" fill="#FFC700"/>
            <text x="32.5" y="40" fontSize="28" fill="#fff" textAnchor="middle" fontWeight="bold">₹</text>
          </svg>

          {/* Chart */}
          <svg ref={chartRef} width="150" height="120" viewBox="0 0 150 120" style={{...styles.illustration, bottom: '120px', left: '40px'}}>
            <rect width="150" height="120" rx="10" fill="#fff" opacity="0.95"/>
            <rect x="20" y="70" width="20" height="35" fill="#667eea" rx="3"/>
            <rect x="50" y="50" width="20" height="55" fill="#764ba2" rx="3"/>
            <rect x="80" y="60" width="20" height="45" fill="#667eea" rx="3"/>
            <rect x="110" y="40" width="20" height="65" fill="#764ba2" rx="3"/>
            <polyline points="30,75 60,55 90,65 120,45" fill="none" stroke="#10b981" strokeWidth="2"/>
          </svg>

          {/* Document */}
          <svg ref={docRef} width="90" height="110" viewBox="0 0 90 110" style={{...styles.illustration, top: '280px', right: '50px'}}>
            <rect width="90" height="110" rx="8" fill="#fff" opacity="0.95"/>
            <rect width="90" height="25" rx="8" fill="#667eea"/>
            <rect x="10" y="40" width="70" height="6" rx="3" fill="#e2e8f0"/>
            <rect x="10" y="55" width="60" height="6" rx="3" fill="#e2e8f0"/>
            <rect x="10" y="70" width="65" height="6" rx="3" fill="#e2e8f0"/>
            <rect x="10" y="85" width="55" height="6" rx="3" fill="#e2e8f0"/>
          </svg>

          {/* Calculator */}
          <svg ref={calculatorRef} width="80" height="100" viewBox="0 0 80 100" style={{...styles.illustration, bottom: '50px', right: '100px'}}>
            <rect width="80" height="100" rx="8" fill="#fff" opacity="0.95"/>
            <rect x="8" y="8" width="64" height="20" rx="4" fill="#764ba2"/>
            <rect x="10" y="35" width="15" height="15" rx="3" fill="#e2e8f0"/>
            <rect x="30" y="35" width="15" height="15" rx="3" fill="#e2e8f0"/>
            <rect x="50" y="35" width="15" height="15" rx="3" fill="#e2e8f0"/>
            <rect x="10" y="55" width="15" height="15" rx="3" fill="#e2e8f0"/>
            <rect x="30" y="55" width="15" height="15" rx="3" fill="#e2e8f0"/>
            <rect x="50" y="55" width="15" height="15" rx="3" fill="#667eea"/>
            <rect x="10" y="75" width="35" height="15" rx="3" fill="#e2e8f0"/>
            <rect x="50" y="75" width="15" height="15" rx="3" fill="#10b981"/>
          </svg>
        </div>

        {/* Login Card */}
        <div ref={cardRef} style={styles.loginCard}>
          <div style={styles.header}>
            <div ref={logoRef} style={styles.logo}>₹</div>
            <h1 ref={titleRef} style={styles.title}>Admin Login</h1>
            <p style={styles.subtitle}>Finance Management Portal</p>
          </div>

          <div ref={formRef} style={styles.formContainer}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>
              <input
                type="email"
                placeholder="admin@finance.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  ...styles.input,
                  ...(focusedInput === 'email' ? styles.inputFocus : {})
                }}
                onFocus={() => setFocusedInput('email')}
                onBlur={() => setFocusedInput(null)}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  ...styles.input,
                  ...(focusedInput === 'password' ? styles.inputFocus : {})
                }}
                onFocus={() => setFocusedInput('password')}
                onBlur={() => setFocusedInput(null)}
              />
            </div>

            <div style={styles.rememberForgot}>
              <label style={styles.checkboxLabel}>
                <input type="checkbox" style={styles.checkbox} />
                <span>Remember me</span>
              </label>
              <span 
                style={styles.forgotLink}
                onMouseEnter={(e) => e.target.style.color = '#764ba2'}
                onMouseLeave={(e) => e.target.style.color = '#667eea'}
              >
                Forgot password?
              </span>
            </div>

            <button
              onClick={handleSubmit}
              style={{
                ...styles.button,
                ...(isHovered ? styles.buttonHover : {})
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Sign In
            </button>
          </div>

          <div style={styles.footer}>
            Need help?
            <span 
              style={styles.footerLink}
              onMouseEnter={(e) => e.target.style.color = '#764ba2'}
              onMouseLeave={(e) => e.target.style.color = '#667eea'}
            >
              Contact Support
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;







