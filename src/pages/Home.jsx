import React from 'react';
import HeroSlider from '../components/Home/HeroSlider';
import CategoryGrid from '../components/Home/CategoryGrid';
import ProductSlider from '../components/Home/ProductSlider';
import FeatureSection from '../components/Home/FeatureSection';
import NewsletterSection from '../components/Home/NewsletterSection';
import { useSelector } from 'react-redux';

const Index = () => {
    const { topRatedProducts, newProducts } = useSelector(
        (state) => state.product,
    );
    console.log('>>> newProducts: ', newProducts);
    return (
        <div className="min-h-screen">
            <HeroSlider />
            <div className="container mx-auto px-4 pt-20">
                <CategoryGrid />
                {newProducts.length > 0 && (
                    <ProductSlider
                        title="Sản phẩm mới"
                        products={newProducts}
                    />
                )}
                {topRatedProducts.length > 0 && (
                    <ProductSlider
                        title="Sản phẩm được đánh giá cao"
                        products={topRatedProducts}
                    />
                )}
                <FeatureSection />
                <NewsletterSection />
            </div>
        </div>
    );
};

export default Index;
