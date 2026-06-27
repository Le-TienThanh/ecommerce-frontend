import { Users, Target, Award, Heart } from 'lucide-react';

const About = () => {
    const values = [
        {
            icon: Heart,
            title: 'Khách Hàng Là Ưu Tiên',
            description:
                'Chúng tôi luôn đặt khách hàng làm trung tâm trong mọi hoạt động và dịch vụ.',
        },
        {
            icon: Award,
            title: 'Sản Phẩm Chất Lượng',
            description:
                'Mọi sản phẩm đều được chọn lọc kỹ lưỡng để đảm bảo chất lượng tốt nhất.',
        },
        {
            icon: Users,
            title: 'Cộng Đồng Tin Cậy',
            description:
                'Xây dựng mối quan hệ lâu dài và đáng tin cậy với khách hàng.',
        },
        {
            icon: Target,
            title: 'Đổi Mới Không Ngừng',
            description:
                'Không ngừng cải tiến nền tảng và nâng cao trải nghiệm mua sắm.',
        },
    ];

    return (
        <div className="min-h-screen bg-background pt-20">
            <div className="max-w-4xl mx-auto px-4 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-foreground mb-6">
                        Giới thiệu về TechStore
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Nền tảng thương mại điện tử đáng tin cậy của bạn, cung
                        cấp các sản phẩm chất lượng và dịch vụ vượt trội.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {values.map((value, index) => (
                        <div
                            key={index}
                            className="bg-secondary rounded-xl p-6 text-center"
                        >
                            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                                <value.icon className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold text-foreground mb-2">
                                {value.title}
                            </h3>
                            <p className="text-muted-foreground">
                                {value.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="bg-secondary rounded-xl p-8">
                    <h2 className="text-2xl font-bold text-foreground mb-4">
                        Câu chuyện của chúng tôi
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Được thành lập với tầm nhìn làm cho việc mua sắm trực
                        tuyến trở nên đơn giản và thú vị, TechStore đã phát
                        triển trở thành một nền tảng đáng tin cậy cho hàng ngàn
                        khách hàng trên toàn quốc. Chúng tôi tin rằng mọi người
                        đều xứng đáng được tiếp cận với các sản phẩm chất lượng
                        với giá cả hợp lý, được hỗ trợ bởi những dịch vụ khách
                        hàng tốt nhất.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
