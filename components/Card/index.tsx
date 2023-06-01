import React, { ReactNode } from 'react';


import { motion } from 'framer-motion';

interface IndexProps {
    children: ReactNode;
    className?: string;
}
const Index: React.FC<IndexProps> = ({ children, className = '', ...props }) => (
    <motion.div
        className={`max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden ${className}`}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        {...props}
    >
        {children}
    </motion.div>
);
export default Index;