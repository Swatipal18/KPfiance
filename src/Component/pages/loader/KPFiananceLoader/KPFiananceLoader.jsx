// ? with optimized animations normal loader
// import React, { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';

// const styles = {
//     loaderContainer: {
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         width: '100vw',
//         height: '100vh',
//         background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         zIndex: 9999,
//         overflow: 'hidden'
//     },
//     contentWrapper: {
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         position: 'relative'
//     },
//     logoWrapper: {
//         position: 'relative',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginBottom: '50px',
//         background: '#667eea30',
//         backdropFilter: 'blur(10px)',
//         borderRadius: '50%',
//         width: '200px',
//         height: '200px',
//         border: '1px solid #667eea'
//     },
//     svg: {
//         width: '120px',
//         height: '120px',
//     },
//     brandName: {
//         fontSize: '64px',
//         fontWeight: '800',
//         background: 'linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%)',
//         WebkitBackgroundClip: 'text',
//         WebkitTextFillColor: 'transparent',
//         backgroundClip: 'text',
//         letterSpacing: '-0.03em',
//         marginBottom: '10px',
//         fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
//         position: 'relative'
//     },
//     tagline: {
//         fontSize: '18px',
//         fontWeight: '500',
//         color: 'rgba(255, 255, 255, 0.85)',
//         letterSpacing: '0.1em',
//         textTransform: 'uppercase',
//         fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
//         marginTop: '30px'
//     },
//     orbitCircle: {
//         position: 'absolute',
//         border: '2px solid rgba(255, 255, 255, 0.15)',
//         borderRadius: '50%',
//         pointerEvents: 'none'
//     },
//     orbitDot: {
//         position: 'absolute',
//         width: '10px',
//         height: '10px',
//         background: 'linear-gradient(135deg, #ffffff 0%, #a5b4fc 100%)',
//         borderRadius: '50%',
//         boxShadow: '0 0 20px rgba(255, 255, 255, 0.8)',
//         top: '-5px',
//         left: '50%',
//         marginLeft: '-5px'
//     }
// };

// const KPFiananceLoader = () => {
//     const svgRef = useRef(null);
//     const brandRef = useRef(null);
//     const taglineRef = useRef(null);
//     const logoWrapperRef = useRef(null);
//     const orbitRef1 = useRef(null);
//     const orbitRef2 = useRef(null);
//     const orbitRef3 = useRef(null);

//     useEffect(() => {
//         const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

//         // Initial setup
//         gsap.set(['.path1', '.path2', '.path3', '.path4'], {
//             opacity: 0,
//             scale: 0.3,
//             transformOrigin: 'center'
//         });

//         gsap.set(logoWrapperRef.current, {
//             scale: 0.5,
//             opacity: 0
//         });

//         // Logo wrapper entrance
//         tl.to(logoWrapperRef.current, {
//             scale: 1,
//             opacity: 1,
//             duration: 1,
//             ease: 'elastic.out(1, 0.5)'
//         });

//         // Animate SVG paths sequentially
//         tl.to('.path1', {
//             opacity: 1,
//             scale: 1,
//             duration: 0.5,
//             ease: 'back.out(2)'
//         }, '-=0.5')
//             .to('.path2', {
//                 opacity: 1,
//                 scale: 1,
//                 duration: 0.5,
//                 ease: 'back.out(2)'
//             }, '-=0.3')
//             .to('.path3', {
//                 opacity: 1,
//                 scale: 1,
//                 duration: 0.5,
//                 ease: 'back.out(2)'
//             }, '-=0.3')
//             .to('.path4', {
//                 opacity: 1,
//                 scale: 1,
//                 duration: 0.5,
//                 ease: 'back.out(2)'
//             }, '-=0.3');

//         // Single smooth rotation
//         gsap.to(svgRef.current, {
//             rotation: 360,
//             duration: 2.5,
//             ease: 'power2.inOut',
//             delay: 0.3
//         });

//         // Brand name animation
//         gsap.from(brandRef.current, {
//             y: 50,
//             opacity: 0,
//             duration: 1.2,
//             delay: 0.8,
//             ease: 'power3.out'
//         });

//         // Tagline animation
//         gsap.from(taglineRef.current, {
//             y: 30,
//             opacity: 0,
//             duration: 1,
//             delay: 1.2,
//             ease: 'power3.out'
//         });

//         // Orbit circles rotation
//         gsap.to(orbitRef1.current, {
//             rotation: 360,
//             duration: 8,
//             ease: 'none',
//             repeat: -1
//         });

//         gsap.to(orbitRef2.current, {
//             rotation: -360,
//             duration: 12,
//             ease: 'none',
//             repeat: -1
//         });

//         gsap.to(orbitRef3.current, {
//             rotation: 360,
//             duration: 15,
//             ease: 'none',
//             repeat: -1
//         });

//         // Floating animation for logo wrapper
//         gsap.to(logoWrapperRef.current, {
//             y: -10,
//             duration: 2,
//             ease: 'power1.inOut',
//             repeat: -1,
//             yoyo: true,
//             delay: 1
//         });

//         return () => {
//             tl.kill();
//             gsap.killTweensOf([svgRef.current, brandRef.current, taglineRef.current, logoWrapperRef.current, orbitRef1.current, orbitRef2.current, orbitRef3.current]);
//         };
//     }, []);

//     return (
//         <div style={styles.loaderContainer}>
//             <div style={styles.contentWrapper}>
//                 <div ref={brandRef} style={styles.brandName}>
//                     K P Fianance
//                 </div>

//                 <div ref={logoWrapperRef} style={styles.logoWrapper}>

//                     <svg
//                         ref={svgRef}
//                         style={styles.svg}
//                         viewBox="0 0 25 25"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                     >
//                         <path
//                             className="path1"
//                             d="M6.3733 2.01372C5.2412 3.16679 5.2412 5.03265 6.39427 6.18572L8.91004 8.7015C11.2791 11.0705 11.2791 14.928 8.91004 17.2971L4.29779 12.6848C3.11327 11.5003 2.51578 9.93842 2.51578 8.38702C2.51578 6.83563 3.11327 5.27375 4.29779 4.08924L6.34185 2.04517C6.35234 2.03469 6.36282 2.02421 6.3733 2.01372Z"
//                             fill="#ffffff"
//                             stroke="#667eea"
//                             strokeWidth="2"
//                             strokeMiterlimit="10"
//                         />
//                         <path
//                             className="path2"
//                             d="M8.38581 8.17627L6.39415 6.18462C5.24108 5.03155 5.2306 3.17617 6.37318 2.01262C7.50528 0.901485 9.30826 0.922449 10.4299 2.04407C10.9959 2.61012 11.2789 3.35437 11.2789 4.08813C11.2789 4.8219 10.9959 5.56615 10.4299 6.1322L9.95817 6.60391"
//                             fill="#ffffff"
//                             stroke="#667eea"
//                             strokeWidth="2"
//                             strokeMiterlimit="10"
//                         />
//                         <path
//                             className="path3"
//                             d="M18.2705 22.6109C19.4026 21.4578 19.4026 19.592 18.2496 18.4389L15.7338 15.9231C13.3648 13.5541 13.3648 9.69659 15.7338 7.32757L20.346 11.9398C21.5305 13.1243 22.128 14.6862 22.128 16.2376C22.128 17.789 21.5305 19.3509 20.346 20.5354L18.302 22.5795C18.281 22.6004 18.2705 22.6109 18.2705 22.6109Z"
//                             fill="#ffffff"
//                             stroke="#667eea"
//                             strokeWidth="2"
//                             strokeMiterlimit="10"
//                         />
//                         <path
//                             className="path4"
//                             d="M16.247 16.4577L18.2386 18.4493C19.3917 19.6024 19.4022 21.4578 18.2596 22.6213C17.1275 23.7325 15.3245 23.7115 14.2029 22.5899C13.6368 22.0238 13.3538 21.2796 13.3538 20.5458C13.3538 19.812 13.6368 19.0678 14.2029 18.5017L14.6851 18.0195"
//                             fill="#ffffff"
//                             stroke="#667eea"
//                             strokeWidth="2"
//                             strokeMiterlimit="10"
//                         />
//                     </svg>
//                 </div>

//                 <div ref={taglineRef} style={styles.tagline}>
//                     Your Financial Partner
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default KPFiananceLoader;



// ? with optimized animations  very  fast loader
// import React, { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';

// const styles = {
//     loaderContainer: {
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         width: '100vw',
//         height: '100vh',
//         background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         zIndex: 9999,
//         overflow: 'hidden'
//     },
//     contentWrapper: {
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         position: 'relative'
//     },
//     logoWrapper: {
//         position: 'relative',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginBottom: '50px',
//         background: '#667eea30',
//         backdropFilter: 'blur(10px)',
//         borderRadius: '50%',
//         width: '200px',
//         height: '200px',
//         border: '1px solid #667eea'
//     },
//     svg: {
//         width: '120px',
//         height: '120px',
//     },
//     brandName: {
//         fontSize: '64px',
//         fontWeight: '800',
//         background: 'linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%)',
//         WebkitBackgroundClip: 'text',
//         WebkitTextFillColor: 'transparent',
//         backgroundClip: 'text',
//         letterSpacing: '-0.03em',
//         marginBottom: '10px',
//         fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
//         position: 'relative'
//     },
//     tagline: {
//         fontSize: '18px',
//         fontWeight: '500',
//         color: 'rgba(255, 255, 255, 0.85)',
//         letterSpacing: '0.1em',
//         textTransform: 'uppercase',
//         fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
//         marginTop: '30px'
//     }
// };

// const KPFiananceLoader = () => {
//     const svgRef = useRef(null);
//     const brandRef = useRef(null);
//     const taglineRef = useRef(null);
//     const logoWrapperRef = useRef(null);

//     useEffect(() => {
//         const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

//         // Initial setup
//         gsap.set(['.path1', '.path2', '.path3', '.path4'], {
//             opacity: 0,
//             scale: 0.3,
//             transformOrigin: 'center'
//         });

//         gsap.set(logoWrapperRef.current, {
//             scale: 0.5,
//             opacity: 0
//         });

//         // Logo wrapper entrance - faster
//         tl.to(logoWrapperRef.current, {
//             scale: 1,
//             opacity: 1,
//             duration: 0.4,
//             ease: 'back.out(1.5)'
//         });

//         // Animate SVG paths sequentially - much faster
//         tl.to('.path1', {
//             opacity: 1,
//             scale: 1,
//             duration: 0.2,
//             ease: 'back.out(2)'
//         }, '-=0.2')
//             .to('.path2', {
//                 opacity: 1,
//                 scale: 1,
//                 duration: 0.2,
//                 ease: 'back.out(2)'
//             }, '-=0.1')
//             .to('.path3', {
//                 opacity: 1,
//                 scale: 1,
//                 duration: 0.2,
//                 ease: 'back.out(2)'
//             }, '-=0.1')
//             .to('.path4', {
//                 opacity: 1,
//                 scale: 1,
//                 duration: 0.2,
//                 ease: 'back.out(2)'
//             }, '-=0.1');

//         // Faster rotation
//         gsap.to(svgRef.current, {
//             rotation: 360,
//             duration: 0.8,
//             ease: 'power2.inOut',
//             delay: 0.1
//         });

//         // Brand name animation - faster with less delay
//         gsap.from(brandRef.current, {
//             y: 30,
//             opacity: 0,
//             duration: 0.5,
//             delay: 0.3,
//             ease: 'power3.out'
//         });

//         // Tagline animation - faster with less delay
//         gsap.from(taglineRef.current, {
//             y: 20,
//             opacity: 0,
//             duration: 0.4,
//             delay: 0.5,
//             ease: 'power3.out'
//         });

//         // Floating animation for logo wrapper - starts sooner
//         gsap.to(logoWrapperRef.current, {
//             y: -10,
//             duration: 1.5,
//             ease: 'power1.inOut',
//             repeat: -1,
//             yoyo: true,
//             delay: 0.4
//         });

//         return () => {
//             tl.kill();
//             gsap.killTweensOf([svgRef.current, brandRef.current, taglineRef.current, logoWrapperRef.current]);
//         };
//     }, []);

//     return (
//         <div style={styles.loaderContainer}>
//             <div style={styles.contentWrapper}>
//                 <div ref={brandRef} style={styles.brandName}>
//                     K P Fianance
//                 </div>

//                 <div ref={logoWrapperRef} style={styles.logoWrapper}>
//                     <svg
//                         ref={svgRef}
//                         style={styles.svg}
//                         viewBox="0 0 25 25"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                     >
//                         <path
//                             className="path1"
//                             d="M6.3733 2.01372C5.2412 3.16679 5.2412 5.03265 6.39427 6.18572L8.91004 8.7015C11.2791 11.0705 11.2791 14.928 8.91004 17.2971L4.29779 12.6848C3.11327 11.5003 2.51578 9.93842 2.51578 8.38702C2.51578 6.83563 3.11327 5.27375 4.29779 4.08924L6.34185 2.04517C6.35234 2.03469 6.36282 2.02421 6.3733 2.01372Z"
//                             fill="#ffffff"
//                             stroke="#667eea"
//                             strokeWidth="2"
//                             strokeMiterlimit="10"
//                         />
//                         <path
//                             className="path2"
//                             d="M8.38581 8.17627L6.39415 6.18462C5.24108 5.03155 5.2306 3.17617 6.37318 2.01262C7.50528 0.901485 9.30826 0.922449 10.4299 2.04407C10.9959 2.61012 11.2789 3.35437 11.2789 4.08813C11.2789 4.8219 10.9959 5.56615 10.4299 6.1322L9.95817 6.60391"
//                             fill="#ffffff"
//                             stroke="#667eea"
//                             strokeWidth="2"
//                             strokeMiterlimit="10"
//                         />
//                         <path
//                             className="path3"
//                             d="M18.2705 22.6109C19.4026 21.4578 19.4026 19.592 18.2496 18.4389L15.7338 15.9231C13.3648 13.5541 13.3648 9.69659 15.7338 7.32757L20.346 11.9398C21.5305 13.1243 22.128 14.6862 22.128 16.2376C22.128 17.789 21.5305 19.3509 20.346 20.5354L18.302 22.5795C18.281 22.6004 18.2705 22.6109 18.2705 22.6109Z"
//                             fill="#ffffff"
//                             stroke="#667eea"
//                             strokeWidth="2"
//                             strokeMiterlimit="10"
//                         />
//                         <path
//                             className="path4"
//                             d="M16.247 16.4577L18.2386 18.4493C19.3917 19.6024 19.4022 21.4578 18.2596 22.6213C17.1275 23.7325 15.3245 23.7115 14.2029 22.5899C13.6368 22.0238 13.3538 21.2796 13.3538 20.5458C13.3538 19.812 13.6368 19.0678 14.2029 18.5017L14.6851 18.0195"
//                             fill="#ffffff"
//                             stroke="#667eea"
//                             strokeWidth="2"
//                             strokeMiterlimit="10"
//                         />
//                     </svg>
//                 </div>

//                 <div ref={taglineRef} style={styles.tagline}>
//                     Your Financial Partner
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default KPFiananceLoader;


// ? with optimized animations NORMAL speed loader
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const styles = {
    loaderContainer: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        overflow: 'hidden'
    },
    contentWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    logoWrapper: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '50px',
        background: '#667eea30',
        backdropFilter: 'blur(10px)',
        borderRadius: '50%',
        width: '200px',
        height: '200px',
        border: '1px solid #667eea'
    },
    svg: {
        width: '120px',
        height: '120px',
    },
    brandName: {
        fontSize: '64px',
        fontWeight: '800',
        background: 'linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        letterSpacing: '-0.03em',
        marginBottom: '10px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        position: 'relative'
    },
    tagline: {
        fontSize: '18px',
        fontWeight: '500',
        color: 'rgba(255, 255, 255, 0.85)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        marginTop: '30px'
    }
};

const KPFiananceLoader = () => {
    const svgRef = useRef(null);
    const brandRef = useRef(null);
    const taglineRef = useRef(null);
    const logoWrapperRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

        // Initial setup
        gsap.set(['.path1', '.path2', '.path3', '.path4'], {
            opacity: 0,
            scale: 0.3,
            transformOrigin: 'center'
        });

        gsap.set(logoWrapperRef.current, {
            scale: 0.5,
            opacity: 0
        });

        // Logo wrapper entrance - balanced speed
        tl.to(logoWrapperRef.current, {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: 'back.out(1.7)'
        });

        // Animate SVG paths sequentially - moderate speed
        tl.to('.path1', {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: 'back.out(2)'
        }, '-=0.3')
            .to('.path2', {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                ease: 'back.out(2)'
            }, '-=0.2')
            .to('.path3', {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                ease: 'back.out(2)'
            }, '-=0.2')
            .to('.path4', {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                ease: 'back.out(2)'
            }, '-=0.2');

        // Smooth rotation
        gsap.to(svgRef.current, {
            rotation: 360,
            duration: 1.2,
            ease: 'power2.inOut',
            delay: 0.2
        });

        // Brand name animation
        gsap.from(brandRef.current, {
            y: 40,
            opacity: 0,
            duration: 0.7,
            delay: 0.4,
            ease: 'power3.out'
        });

        // Tagline animation
        gsap.from(taglineRef.current, {
            y: 25,
            opacity: 0,
            duration: 0.6,
            delay: 0.7,
            ease: 'power3.out'
        });

        // Floating animation for logo wrapper
        gsap.to(logoWrapperRef.current, {
            y: -10,
            duration: 1.8,
            ease: 'power1.inOut',
            repeat: -1,
            yoyo: true,
            delay: 0.6
        });

        return () => {
            tl.kill();
            gsap.killTweensOf([svgRef.current, brandRef.current, taglineRef.current, logoWrapperRef.current]);
        };
    }, []);

    return (
        <div style={styles.loaderContainer}>
            <div style={styles.contentWrapper}>
                <div ref={brandRef} style={styles.brandName}>
                    K P Fianance
                </div>

                <div ref={logoWrapperRef} style={styles.logoWrapper}>
                    <svg
                        ref={svgRef}
                        style={styles.svg}
                        viewBox="0 0 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            className="path1"
                            d="M6.3733 2.01372C5.2412 3.16679 5.2412 5.03265 6.39427 6.18572L8.91004 8.7015C11.2791 11.0705 11.2791 14.928 8.91004 17.2971L4.29779 12.6848C3.11327 11.5003 2.51578 9.93842 2.51578 8.38702C2.51578 6.83563 3.11327 5.27375 4.29779 4.08924L6.34185 2.04517C6.35234 2.03469 6.36282 2.02421 6.3733 2.01372Z"
                            fill="#ffffff"
                            stroke="#667eea"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                        />
                        <path
                            className="path2"
                            d="M8.38581 8.17627L6.39415 6.18462C5.24108 5.03155 5.2306 3.17617 6.37318 2.01262C7.50528 0.901485 9.30826 0.922449 10.4299 2.04407C10.9959 2.61012 11.2789 3.35437 11.2789 4.08813C11.2789 4.8219 10.9959 5.56615 10.4299 6.1322L9.95817 6.60391"
                            fill="#ffffff"
                            stroke="#667eea"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                        />
                        <path
                            className="path3"
                            d="M18.2705 22.6109C19.4026 21.4578 19.4026 19.592 18.2496 18.4389L15.7338 15.9231C13.3648 13.5541 13.3648 9.69659 15.7338 7.32757L20.346 11.9398C21.5305 13.1243 22.128 14.6862 22.128 16.2376C22.128 17.789 21.5305 19.3509 20.346 20.5354L18.302 22.5795C18.281 22.6004 18.2705 22.6109 18.2705 22.6109Z"
                            fill="#ffffff"
                            stroke="#667eea"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                        />
                        <path
                            className="path4"
                            d="M16.247 16.4577L18.2386 18.4493C19.3917 19.6024 19.4022 21.4578 18.2596 22.6213C17.1275 23.7325 15.3245 23.7115 14.2029 22.5899C13.6368 22.0238 13.3538 21.2796 13.3538 20.5458C13.3538 19.812 13.6368 19.0678 14.2029 18.5017L14.6851 18.0195"
                            fill="#ffffff"
                            stroke="#667eea"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                        />
                    </svg>
                </div>

                <div ref={taglineRef} style={styles.tagline}>
                    Your Financial Partner
                </div>
            </div>
        </div>
    );
};

export default KPFiananceLoader;