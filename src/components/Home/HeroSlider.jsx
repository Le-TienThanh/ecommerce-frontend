import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            id: 1,
            title: 'Laptop',
            subtitle: 'Hiệu năng mạnh mẽ cho công việc và giải trí',
            description:
                'Khám phá các mẫu laptop hiện đại với thiết kế sang trọng và cấu hình mạnh',
            image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1120&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            cta: 'Mua Laptop',
            url: '/products?category=Laptop',
        },
        {
            id: 2,
            title: 'Smartphone',
            subtitle: 'Công nghệ thông minh trong tầm tay',
            description:
                'Sở hữu những chiếc điện thoại mới nhất với camera sắc nét và hiệu năng vượt trội',
            image: 'https://images.unsplash.com/photo-1707438095940-1eee18e85400?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            cta: 'Khám Phá Ngay',
            url: '/products?category=Smartphone',
        },
        {
            id: 3,
            title: 'Smartwatch',
            subtitle: 'Theo dõi sức khỏe và kết nối mọi lúc',
            description:
                'Đồng hồ thông minh hiện đại với nhiều tính năng tiện ích cho cuộc sống hàng ngày',
            image: 'https://images.unsplash.com/photo-1626194062394-022cc80f6d2d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            cta: 'Xem Sản Phẩm',
            url: '/products?category=Smartwatch',
        },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 8000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const slide = slides[currentSlide];

    return (
        <div className="relative h-[70vh] overflow-hidden rounded-2xl">
            {/* Single Active Slide */}
            <div className="relative h-full">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
                    style={{ backgroundImage: `url(${slide.image})` }}
                />
                <div className="absolute inset-0 glass" />
                <div className="relative h-full flex items-center justify-center text-center px-6">
                    <div className="max-w-3xl animate-fade-in-up">
                        <h3 className="text-lg font-medium text-primary mb-2">
                            {slide.subtitle}
                        </h3>
                        <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4">
                            {slide.title}
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                            {slide.description}
                        </p>
                        <Link
                            to={slide.url}
                            className="px-8 py-4 gradient-primary text-primary-foreground rounded-lg hover:glow-on-hover animate-smooth font-semibold text-lg"
                        >
                            {slide.cta}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Arrows */}
            <button
                onClick={prevSlide}
                className="hidden sm:block absolute left-6 top-1/2 transform -translate-y-1/2 p-3 glass-card hover:glow-on-hover animate-smooth"
            >
                <ChevronLeft className="w-6 h-6 text-primary" />
            </button>
            <button
                onClick={nextSlide}
                className="hidden sm:block absolute right-6 top-1/2 transform -translate-y-1/2 p-3 glass-card hover:glow-on-hover animate-smooth"
            >
                <ChevronRight className="w-6 h-6 text-primary" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentSlide
                                ? 'bg-primary glow-primary'
                                : 'bg-white/30 hover:bg-white/50'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroSlider;
