import { Link } from 'react-router-dom';
import {
    Mail,
    Phone,
    MapPin,
    Facebook,
    Twitter,
    Instagram,
    Youtube,
} from 'lucide-react';

const Footer = () => {
    const footerLinks = {
        company: [
            { name: 'Về chúng tôi', path: '/about' },
            { name: 'Tuyển dụng', path: '#' },
            { name: 'Báo chí', path: '#' },
            { name: 'Blog', path: '#' },
        ],
        customer: [
            { name: 'Liên hệ', path: '/contact' },
            { name: 'Câu hỏi thường gặp', path: '/faq' },
            { name: 'Thông tin vận chuyển', path: '#' },
            { name: 'Chính sách đổi trả', path: '#' },
        ],
        legal: [
            { name: 'Chính sách bảo mật', path: '#' },
            { name: 'Điều khoản dịch vụ', path: '#' },
            { name: 'Chính sách cookie', path: '#' },
            { name: 'Bảo mật', path: '#' },
        ],
    };

    const socialLinks = [
        {
            icon: Facebook,
            href: 'https://www.facebook.com/le.tien.thanh.102004',
            label: 'Facebook',
        },
        { icon: Twitter, href: '#', label: 'Twitter' },
        { icon: Instagram, href: '#', label: 'Instagram' },
        { icon: Youtube, href: '#', label: 'YouTube' },
    ];

    return (
        <footer className="glass border-t border-[hsla(var(--glass-border))] mt-16">
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Brand & Contact */}
                    <div className="lg:col-span-1">
                        <h2 className="text-2xl font-bold gradient-primary bg-clip-text text-transparent mb-4">
                            TechStore
                        </h2>
                        <p className="text-muted-foreground mb-6">
                            Đối tác mua sắm trực tuyến đáng tin cậy của bạn.
                            Khám phá những sản phẩm chất lượng cùng dịch vụ tận
                            tâm và trải nghiệm mua sắm tuyệt vời.
                        </p>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3 text-muted-foreground">
                                <Mail className="w-5 h-5 text-primary" />
                                <span>letienthanhthptbs@gmail.com</span>
                            </div>
                            <div className="flex items-center space-x-3 text-muted-foreground">
                                <Phone className="w-5 h-5 text-primary" />
                                <span>0326135***</span>
                            </div>
                            <div className="flex items-center space-x-3 text-muted-foreground">
                                <MapPin className="w-5 h-5 text-primary" />
                                <span>Đại học Bách Khoa Hà Nội</span>
                            </div>
                        </div>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-foreground mb-4">
                            Công ty
                        </h3>
                        <ul className="space-y-2">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-lg font-semibold text-foreground mb-4">
                            Chăm sóc khách hàng
                        </h3>
                        <ul className="space-y-2">
                            {footerLinks.customer.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-lg font-semibold text-foreground mb-4">
                            Điều khoản và chính sách
                        </h3>
                        <ul className="space-y-2">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Newsletter Signup */}
                <div className="glass-panel mb-12">
                    <div className="text-center mb-6">
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                            Luôn kết nối cùng chúng tôi
                        </h3>
                        <p className="text-muted-foreground">
                            Đăng ký nhận bản tin của chúng tôi để cập nhật ưu
                            đãi độc quyền và thông tin mới nhất.
                        </p>
                    </div>
                    <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Nhập Email của bạn"
                            className="flex-1 px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder-muted-foreground"
                        />
                        <button
                            type="submit"
                            className="px-6 py-3 gradient-primary text-primary-foreground rounded-lg hover:glow-on-hover animate-smooth font-semibold"
                        >
                            Đăng ký
                        </button>
                    </form>
                </div>

                {/* Social Links & Copyright */}
                <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[hsla(var(--glass-border))]">
                    <div className="flex items-center space-x-4 mb-4 md:mb-0">
                        {socialLinks.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                aria-label={social.label}
                                target="_blank"
                                className="p-2 glass-card hover:glow-on-hover animate-smooth"
                            >
                                <social.icon className="w-5 h-5 text-primary" />
                            </a>
                        ))}
                    </div>

                    <div className="text-center md:text-right">
                        <p className="text-muted-foreground text-sm">
                            © 2026 TechStore. All rights reserved.
                        </p>
                        <p className="text-muted-foreground text-xs mt-1">
                            Developed By ThanhLe
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
