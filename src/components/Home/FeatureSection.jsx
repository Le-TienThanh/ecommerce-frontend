import { Truck, Shield, Headphones, CreditCard } from 'lucide-react';

const FeatureSection = () => {
    const features = [
        {
            icon: Truck,
            title: 'Miễn phí vận chuyển',
            description:
                'Miễn phí vận chuyển toàn cầu cho đơn hàng trên 1,000,000đ',
        },
        {
            icon: Shield,
            title: 'Thanh toán an toàn',
            description: 'Thanh toán an toàn với công nghệ mã hóa SSL',
        },
        {
            icon: Headphones,
            title: 'Hỗ trợ 24/7',
            description: 'Đội ngũ hỗ trợ khách hàng luôn sẵn sàng mọi lúc',
        },
        {
            icon: CreditCard,
            title: 'Đổi trả dễ dàng',
            description: 'Chính sách đổi trả trong vòng 30 ngày',
        },
    ];

    return (
        <section className="py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="glass-card p-6 text-center hover:glow-on-hover animate-smooth"
                    >
                        <div className="w-16 h-16 mx-auto mb-4 gradient-primary rounded-full flex items-center justify-center">
                            <feature.icon className="w-8 h-8 text-primary-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                            {feature.title}
                        </h3>
                        <p className="text-muted-foreground">
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeatureSection;
