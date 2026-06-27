import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
    const [openItems, setOpenItems] = useState({});

    const faqs = [
        {
            question: 'Làm thế nào để đặt hàng?',
            answer: 'Chỉ cần chọn sản phẩm bạn muốn, thêm vào giỏ hàng và tiến hành thanh toán. Làm theo các bước hướng dẫn để hoàn tất đơn hàng.',
        },
        {
            question: 'Website hỗ trợ những phương thức thanh toán nào?',
            answer: 'Chúng tôi hỗ trợ các loại thẻ thanh toán phổ biến, PayPal và nhiều phương thức thanh toán an toàn khác.',
        },
        {
            question: 'Thời gian giao hàng mất bao lâu?',
            answer: 'Giao hàng tiêu chuẩn thường mất từ 3-5 ngày làm việc. Bạn cũng có thể chọn hình thức giao hàng nhanh khi thanh toán.',
        },
        {
            question: 'Chính sách đổi trả như thế nào?',
            answer: 'Chúng tôi hỗ trợ đổi trả trong vòng 30 ngày đối với hầu hết sản phẩm. Sản phẩm cần còn nguyên trạng và đầy đủ tem nhãn.',
        },
    ];

    const toggleItem = (index) => {
        setOpenItems((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    return (
        <div className="min-h-screen bg-background pt-20">
            <div className="max-w-3xl mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-foreground mb-4">
                        Những câu Hỏi Thường Gặp
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Tìm câu trả lời cho những thắc mắc phổ biến của khách
                        hàng
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-secondary rounded-xl overflow-hidden"
                        >
                            <button
                                onClick={() => toggleItem(index)}
                                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-primary/10 transition-colors"
                            >
                                <h3 className="font-semibold text-foreground">
                                    {faq.question}
                                </h3>
                                {openItems[index] ? (
                                    <ChevronUp className="w-5 h-5 text-foreground" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-foreground" />
                                )}
                            </button>
                            {openItems[index] && (
                                <div className="px-6 pb-4">
                                    <p className="text-muted-foreground">
                                        {faq.answer}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;
