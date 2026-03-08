import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const [isHovering, setIsHovering] = useState(false);
    const [clickEffect, setClickEffect] = useState(false);

    const springConfig = { damping: 40, stiffness: 600 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleHover = (e) => {
            const isClickable = e.target.closest('button, a, .cursor-pointer, input, select');
            setIsHovering(!!isClickable);
        };

        const handleMouseDown = () => setClickEffect(true);
        const handleMouseUp = () => setClickEffect(false);

        window.addEventListener('mousemove', moveCursor);
        document.addEventListener('mouseover', handleHover);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            document.removeEventListener('mouseover', handleHover);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [cursorX, cursorY]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[99999]">
            {/* Outer Ring */}
            <motion.div
                className="absolute top-0 left-0 w-10 h-10 border border-violet-500/40 rounded-full flex items-center justify-center p-2"
                style={{
                    translateX: cursorXSpring,
                    translateY: cursorYSpring,
                    x: '-50%',
                    y: '-50%',
                    scale: isHovering ? 1.5 : (clickEffect ? 0.8 : 1),
                    backgroundColor: isHovering ? 'rgba(139, 92, 246, 0.1)' : 'transparent',
                }}
            />
            {/* Inner Dot */}
            <motion.div
                className="absolute top-0 left-0 w-1.5 h-1.5 bg-violet-400 rounded-full"
                style={{
                    translateX: cursorX,
                    translateY: cursorY,
                    x: '-50%',
                    y: '-50%',
                    scale: clickEffect ? 2 : 1,
                    opacity: isHovering ? 0 : 1,
                }}
            />
            {/* Trail effect bubble */}
            <motion.div
                className="absolute top-0 left-0 w-4 h-4 bg-violet-500/10 rounded-full blur-md"
                style={{
                    translateX: cursorXSpring,
                    translateY: cursorYSpring,
                    x: '-50%',
                    y: '-50%',
                }}
            />
        </div>
    );
};

export default CustomCursor;
