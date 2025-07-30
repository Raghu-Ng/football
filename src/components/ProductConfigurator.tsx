import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const DUMMY_COLORS = [
	{ name: 'Red', value: '#f87171' },
	{ name: 'Blue', value: '#60a5fa' },
	{ name: 'Black', value: '#111827' },
	{ name: 'White', value: '#f3f4f6' },
];

export default function ProductConfigurator({
	sizes,
	price,
	onComplete,
}: {
	sizes: string[];
	price: number;
	onComplete: (size: string, color: string) => void;
}) {
	const [selectedSize, setSelectedSize] = useState<string | null>(null);
	const [selectedColor, setSelectedColor] = useState<string | null>(null);
	const colorRef = useRef<HTMLDivElement>(null);
	const summaryRef = useRef<HTMLDivElement>(null);
	const sizeRef = useRef<HTMLDivElement>(null);
	const [activeSection, setActiveSection] = useState<'size' | 'color' | 'summary'>('size');

	// Helper to scroll the window to a section and center it in the viewport
	const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
		if (ref.current) {
			const rect = ref.current.getBoundingClientRect();
			const scrollY =
				window.scrollY + rect.top - window.innerHeight / 2 + rect.height / 2;
			window.scrollTo({ top: scrollY, behavior: 'smooth' });
		}
	};

	// Handle size selection
	const handleSize = (size: string) => {
		setSelectedSize(size);
		setTimeout(() => scrollToSection(colorRef), 100);
	};

	// Handle color selection
	const handleColor = (color: string) => {
		setSelectedColor(color);
		setTimeout(() => scrollToSection(summaryRef), 100);
	};

	// Call onComplete when both are selected and Add to Cart is pressed
	const handleAddToCart = () => {
		if (selectedSize && selectedColor) {
			onComplete(selectedSize, selectedColor);
		}
	};

	// Detect which section is closest to the center of the viewport
	useEffect(() => {
		const handleScroll = () => {
			const center = window.scrollY + window.innerHeight / 2;
			const getDist = (ref: React.RefObject<HTMLDivElement>) => {
				if (!ref.current) return Infinity;
				const rect = ref.current.getBoundingClientRect();
				const mid = window.scrollY + rect.top + rect.height;
				return Math.abs(center - mid);
			};
			const dists = [
				{ key: 'size', dist: getDist(sizeRef) },
				{ key: 'color', dist: getDist(colorRef) },
				{ key: 'summary', dist: getDist(summaryRef) },
			];
			dists.sort((a, b) => a.dist - b.dist);
			setActiveSection(dists[0].key as 'size' | 'color' | 'summary');
		};
		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// Helper to get opacity for each section
	const getOpacity = (section: 'size' | 'color' | 'summary') => (activeSection === section ? 1 : 0.4);

	return (
		<div className="w-full">
			{/* Size Selection */}
			<motion.div ref={sizeRef} className="mb-16" style={{ opacity: getOpacity('size'), transition: 'opacity 0.4s' }}>
				<h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
					<span className="text-orange-500 dark:text-cyan-400"></span> Choose your size.
				</h2>
				<div className="flex  gap-3 w-full">
					{sizes.map((size) => (
						<button
							key={size}
							onClick={() => handleSize(size)}
							className={`w-full flex items-center justify-between border-2 rounded-xl px-4 py-3 text-left text-lg font-semibold transition-all duration-300 ${selectedSize === size ? 'border-orange-500 dark:border-cyan-400 bg-orange-50/40 dark:bg-cyan-900/20' : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-orange-400 dark:hover:border-cyan-400'}`}
						>
							<span>{size}</span>
							{/* <span className="text-base font-normal text-gray-500 dark:text-gray-300">From ${price.toLocaleString()}</span> */}
						</button>
					))}
				</div>
			</motion.div>

			{/* Color Selection */}
			<motion.div ref={colorRef} className="mb-16" style={{ opacity: getOpacity('color'), transition: 'opacity 0.4s' }}>
				<h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
					<span className="text-orange-500 dark:text-cyan-400"></span> Pick your favourite colour.
				</h2>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
					{DUMMY_COLORS.map((color) => (
						<button
							key={color.value}
							onClick={() => handleColor(color.value)}
							className={`flex flex-col items-center justify-center border-2 rounded-xl p-3 transition-all duration-300 ${selectedColor === color.value ? 'border-orange-500 dark:border-cyan-400 bg-orange-50/40 dark:bg-cyan-900/20' : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-orange-400 dark:hover:border-cyan-400'}`}
						>
							<span className="w-8 h-8 rounded-full mb-2" style={{ background: color.value, border: '1.5px solid #e5e7eb' }} />
							<span className="text-gray-700 dark:text-gray-200 font-medium">{color.name}</span>
						</button>
					))}
				</div>
			</motion.div>

			{/* Summary */}
			<motion.div ref={summaryRef} className="mb-4" style={{ opacity: getOpacity('summary'), transition: 'opacity 0.4s' }}>
				<h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
					<span className="text-orange-500 dark:text-cyan-400"></span> Review your selection.
				</h2>
				<div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700 flex flex-col gap-4 w-full">
					<div className="flex items-center gap-4">
						<span className="font-semibold text-gray-700 dark:text-gray-200">Size:</span>
						<span className="text-gray-900 dark:text-white">{selectedSize}</span>
					</div>
					<div className="flex items-center gap-4">
						<span className="font-semibold text-gray-700 dark:text-gray-200">Color:</span>
						<span className="w-6 h-6 rounded-full inline-block" style={{ background: selectedColor || '#fff', border: '1.5px solid #e5e7eb' }} />
					</div>
					<div className="flex items-center gap-4">
						<span className="font-semibold text-gray-700 dark:text-gray-200">Price:</span>
						<span className="text-gray-900 dark:text-white">${price.toLocaleString()}</span>
					</div>
				</div>
				<button
					className="mt-8 w-full bg-gradient-to-r from-orange-500 to-red-600 dark:from-cyan-500 dark:to-blue-600 hover:from-orange-400 hover:to-red-500 dark:hover:from-cyan-400 dark:hover:to-blue-500 text-white py-3 rounded-full font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 dark:shadow-cyan-500/25"
					disabled={!selectedSize || !selectedColor}
					onClick={handleAddToCart}
				>
					Add to Cart
				</button>
			</motion.div>
		</div>
	);
}
