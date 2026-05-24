import { useState, useEffect } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '../components/PaymentForm';
import { loadStripe } from '@stripe/stripe-js';
import { placeOrder } from '../store/slices/orderSlice';

const Payment = () => {
    const { authUser } = useSelector((state) => state.auth);
    const navigateTo = useNavigate();
    if (!authUser) return navigateTo('/products');
    const [stripePromise, setStripePromise] = useState(null);
    useEffect(() => {
        loadStripe(
            'pk_test_51THKyeDIrV2KtPXqatP6YpDxGNL4rvcBCAUh3Pjx5VuoW8ckg3SZVEjRCVVSpQAI2Cp7YRgC3nhAgcvZJuwdGHOj005eOncJ3X',
        )
            .then((stripe) => setStripePromise(stripe))
            .catch((err) => console.log(err));
    }, []);
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.cart);
    const { orderStep } = useSelector((state) => state.order);
    const [shippingDetails, setShippingDetails] = useState({
        fullName: '',
        state: '',
        phone: '',
        address: '',
        city: '',
        zipCode: '',
        country: 'Vietnam',
    });
    const total = cart.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0,
    );

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('full_name', shippingDetails.fullName);
        formData.append('state', shippingDetails.state);
        formData.append('phone', shippingDetails.phone);
        formData.append('address', shippingDetails.address);
        formData.append('city', shippingDetails.city);
        formData.append('pincode', shippingDetails.zipCode);
        formData.append('country', shippingDetails.country);
        formData.append('orderedItems', JSON.stringify(cart));
        dispatch(placeOrder(formData));
    };
    if (cart.length === 0) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center">
                <div className="text-center glass-panel max-w-md">
                    <h1 className="text-3xl font-bold text-foreground mb-4">
                        No Items in Cart.
                    </h1>
                    <p className="text-muted-foreground mb-8">
                        Add some items to your cart before processing to
                        checkout.
                    </p>
                    <Link
                        to={'/products'}
                        className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg 
                    text-primary-foreground gradient-primary hover:glow-on-hover animate-smooth font-semibold"
                    >
                        Browser products
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen pt-20">
                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-4xl mx-auto">
                        {/* HEADER */}
                        <div className="flex items-center space-x-4 mb-8">
                            <Link
                                to={'/cart'}
                                className="p-2 glass-card hover:glow-on-hover animate-smooth"
                            >
                                <ArrowLeft className="w-5 h-5 text-primary" />
                            </Link>
                        </div>
                        {/* PROGRESS STEPS */}
                        <div className="flex items-center justify-center mb-12">
                            <div className="flex items-center space-x-4">
                                {/* STEP 1 */}
                                <div
                                    className={`flex items-center space-x-2 ${orderStep >= 1 ? 'text-primary' : 'text-muted-foreground'}`}
                                >
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center ${orderStep >= 1 ? 'gradient-primary text-primary-foreground' : 'bg-secondary'}`}
                                    >
                                        {orderStep > 1 ? (
                                            <Check className="w-5 h-5" />
                                        ) : (
                                            '1'
                                        )}
                                    </div>
                                    <span className="font-medium">Details</span>
                                </div>

                                <div
                                    className={`w-12 h-0 ${
                                        orderStep >= 2
                                            ? 'bg-primary'
                                            : 'bg-border'
                                    }`}
                                />

                                {/* STEP 2 */}
                                <div
                                    className={`flex items-center space-x-2 ${orderStep >= 2 ? 'text-primary' : 'text-muted-foreground'}`}
                                >
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center ${orderStep >= 2 ? 'gradient-primary text-primary-foreground' : 'bg-secondary'}`}
                                    >
                                        2
                                    </div>
                                    <span className="font-medium">Payment</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* FORM SECTION */}
                            <div className="lg:col-span-2">
                                {orderStep === 1 ? (
                                    // STEP 1: USER DETAILS
                                    <form
                                        onSubmit={handlePlaceOrder}
                                        className="glass-panel"
                                    >
                                        <h2 className="text-xl font-semibold text-foreground mb-6">
                                            Shipping Information
                                        </h2>
                                        <div className="mb-6">
                                            <div>
                                                <label className="block text-sm font-medium text-foreground mb-2">
                                                    Full Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={
                                                        shippingDetails.fullName
                                                    }
                                                    onChange={(e) => {
                                                        setShippingDetails({
                                                            ...shippingDetails,
                                                            fullName:
                                                                e.target.value,
                                                        });
                                                    }}
                                                    className="w-full px-4 py-3 bg-secondary border border-border rounded-lg
                                                    text-foreground"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <label className="block text-sm font-medium text-foreground mb-2">
                                                    State *
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={
                                                        shippingDetails.state
                                                    }
                                                    onChange={(e) => {
                                                        setShippingDetails({
                                                            ...shippingDetails,
                                                            state: e.target
                                                                .value,
                                                        });
                                                    }}
                                                    className="w-full px-4 py-3 bg-secondary border border-border rounded-lg
                                                    text-foreground"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-foreground mb-2">
                                                    City *
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={shippingDetails.city}
                                                    onChange={(e) => {
                                                        setShippingDetails({
                                                            ...shippingDetails,
                                                            city: e.target
                                                                .value,
                                                        });
                                                    }}
                                                    className="w-full px-4 py-3 bg-secondary border border-border rounded-lg
                                                    text-foreground"
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <div>
                                                <label className="block text-sm font-medium text-foreground mb-2">
                                                    Address *
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={
                                                        shippingDetails.address
                                                    }
                                                    onChange={(e) => {
                                                        setShippingDetails({
                                                            ...shippingDetails,
                                                            address:
                                                                e.target.value,
                                                        });
                                                    }}
                                                    className="w-full px-4 py-3 bg-secondary border border-border rounded-lg
                                                    text-foreground"
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-6">
                                            <div>
                                                <label className="block text-sm font-medium text-foreground mb-2">
                                                    Phone *
                                                </label>
                                                <input
                                                    type="tel"
                                                    required
                                                    value={
                                                        shippingDetails.phone
                                                    }
                                                    onChange={(e) => {
                                                        setShippingDetails({
                                                            ...shippingDetails,
                                                            phone: e.target
                                                                .value,
                                                        });
                                                    }}
                                                    className="w-full px-4 py-3 bg-secondary border border-border rounded-lg
                                                        text-foreground"
                                                />
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full py-3 gradient-primary text-primary-foreground rounded-lg 
                                        hover:glow-on-hover animate-smooth font-semibold"
                                        >
                                            Continue to Payment
                                        </button>
                                    </form>
                                ) : (
                                    <>
                                        <Elements stripe={stripePromise}>
                                            <PaymentForm />
                                        </Elements>
                                    </>
                                )}
                            </div>

                            {/* ORDER SUMMARY */}
                            <div className="lg:col-span-1">
                                <div className="glass-panel sticky top-24">
                                    <h2 className="text-xl font-semibold text-foreground">
                                        Order Summary
                                    </h2>
                                    <div className="space-y-4 mb-6">
                                        {cart.map((item) => {
                                            return (
                                                <div
                                                    key={item.product.id}
                                                    className="flex items-center space-x-3"
                                                >
                                                    <img
                                                        src={
                                                            item.product
                                                                .images[0].url
                                                        }
                                                        alt={item.product.name}
                                                        className="w-12 h-12 object-cover rounded"
                                                    />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-foreground truncate">
                                                            {item.product.name}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            Quantity:{' '}
                                                            {item.quantity}
                                                        </p>
                                                    </div>
                                                    <p className="text-sm font-semibold">
                                                        {Number(
                                                            item.product.price *
                                                                item.quantity,
                                                        ).toLocaleString(
                                                            'vi-VN',
                                                        )}
                                                        đ
                                                    </p>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <div className="space-y-2 border-t border-[hsla(var(--glass-border))] pt-4 ">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">
                                                Shipping
                                            </span>
                                            <span className=" text-green-500">
                                                {total >= 1000000
                                                    ? 'Free'
                                                    : '50,000 đ'}
                                            </span>
                                        </div>
                                        <div
                                            className="flex justify-between font-semibold text-lg pt-2 border-t 
                                        border-[hsla(var(--glass-border))]"
                                        >
                                            <span>Total</span>
                                            <span>
                                                {total >= 1000000
                                                    ? total.toLocaleString(
                                                          'vi-VN',
                                                      ) + ' đ'
                                                    : (
                                                          total + 50000
                                                      ).toLocaleString(
                                                          'vi-VN',
                                                      ) + ' đ'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Payment;
