import React, { useEffect, useState } from 'react';
import { Filter, Package, Truck, CheckCircle, XCircle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchMyOrders } from '../store/slices/orderSlice';
import { Link } from 'react-router-dom';

const Orders = () => {
    const [statusFilter, setStatusFilter] = useState('All');
    const { myOrders } = useSelector((state) => state.order);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchMyOrders());
    }, [dispatch]);

    const filterOrders = myOrders.filter(
        (order) =>
            statusFilter === 'All' || order.order_status === statusFilter,
    );

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Processing':
                return <Package className="w-5 h-5 text-yellow-500" />;
            case 'Shipped':
                return <Truck className="w-5 h-5 text-blue-500" />;
            case 'Delivered':
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'Cancelled':
                return <XCircle className="w-5 h-5 text-red-500" />;
            default:
                return <Package className="w-5 h-5 text-yellow-500" />;
        }
    };
    const getStatusColor = (status) => {
        switch (status) {
            case 'Processing':
                return 'bg-yellow-500/20 text-yellow-400';
            case 'Shipped':
                return 'bg-blue-500/20 text-blue-400';
            case 'Delivered':
                return 'bg-green-500/20 text-green-400';
            case 'Cancelled':
                return 'bg-red-500/20 text-red-400';
            default:
                return 'bg-gray-500/20 text-gray-400';
        }
    };
    const statusArray = [
        'All',
        'Processing',
        'Shipped',
        'Delivered',
        'Cancelled',
    ];

    const { authUser } = useSelector((state) => state.auth);
    const navigateTo = useNavigate();
    if (!authUser) return navigateTo('/products');

    return (
        <>
            <div className="min-h-screen pt-20">
                <div className="container mx-auto px-4 py-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-foreground mb-2">
                            Đơn hàng của tôi
                        </h1>
                        <p className="text-muted-foreground">
                            Theo dõi và quản lý lịch sử đơn hàng của bạn
                        </p>
                    </div>
                    {/* STATUS FILTER */}
                    <div className="glass-card p-4 mb-8">
                        <div className="flex items-center space-x-4 flex-wrap">
                            <div className="flex items-center space-x-2">
                                <Filter className="w-5 h-5 text-primary" />
                                <span className="font-medium">
                                    Lọc theo trạng thái:
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {statusArray.map((status) => {
                                    return (
                                        <button
                                            key={status}
                                            onClick={() =>
                                                setStatusFilter(status)
                                            }
                                            className={`
                                            px-4 py-2 rounded-lg font-medium transition-all capitalize ${
                                                statusFilter === status
                                                    ? 'gradient-primary text-primary-foreground'
                                                    : 'glass-card hover:glow-on-hover text-foreground'
                                            }`}
                                        >
                                            {status}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* ORDER LIST */}
                    {filterOrders.length === 0 ? (
                        <div className="text-center glass-panel max-w-md mx-auto">
                            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                            <h2 className="text-xl font-semibold text-foreground mb-2">
                                Không tìm thấy đơn hàng nào
                            </h2>
                            <p className="text-muted-foreground">
                                {statusFilter === 'All'
                                    ? 'Bạn vẫn chưa đặt đơn hàng nào.'
                                    : `Không tìm thấy đơn hàng nào với trạng thái "${statusFilter}".`}
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {filterOrders.map((order) => {
                                return (
                                    <div
                                        key={order.id}
                                        className="glass-card p-6"
                                    >
                                        {/* ORDER HEADER */}
                                        <div
                                            className="flex flex-col md:flex-row md:items-center 
                                        md:justify-between mb-6 space-y-4 md:space-y-0"
                                        >
                                            <div>
                                                <h3 className="text-lg font-semibold from-foreground mb-1">
                                                    Đơn hàng #{order.id}
                                                </h3>
                                                <p className="text-muted-foreground">
                                                    Ngày đặt hàng{' '}
                                                    {new Date(
                                                        order.created_at,
                                                    ).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <div className="flex items-center space-x-2">
                                                    {getStatusIcon(
                                                        order.order_status,
                                                    )}
                                                    <span
                                                        className={`px-3 py-1 rounded text-sm font-medium 
                                                            ${getStatusColor(order.order_status)}`}
                                                    >
                                                        {order.order_status}
                                                    </span>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm text-muted-foreground">
                                                        Tổng tiền
                                                    </p>
                                                    <p className="text-xl font-bold text-primary">
                                                        {Number(
                                                            order.total_price,
                                                        ).toLocaleString(
                                                            'vi-VN',
                                                        )}
                                                        đ
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* ORDER ITEMS */}
                                        <div className="space-y-4">
                                            {order?.order_items?.map((item) => {
                                                return (
                                                    <div
                                                        key={item.product_id}
                                                        className="flex items-center 
                                                        space-x-4 p-4 bg-secondary/50 rounded-lg"
                                                    >
                                                        <img
                                                            src={item.image}
                                                            alt={item.title}
                                                            className="w-16 h-16 object-cover rounded-lg"
                                                        />
                                                        <div className="flex-1 min-w-0 ">
                                                            <h4 className="font-medium text-foreground truncate">
                                                                {item.title}
                                                            </h4>
                                                            <p className="text-sm text-muted-foreground">
                                                                Số lượng:{' '} 
                                                                {item.quantity}
                                                            </p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="font-semibold text-foreground">
                                                                {Number(
                                                                    item.price,
                                                                ).toLocaleString(
                                                                    'vi-VN',
                                                                )}
                                                                đ
                                                            </p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {/* ORDER ACTIONS */}
                                        {/* <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-[hsla(var(--glass-border))]">
                                            <button className="px-4 py-2 glass-card hover:glow-on-hover animate-smooth text-sm">
                                                View Details
                                            </button>
                                            <button className="px-4 py-2 glass-card hover:glow-on-hover animate-smooth text-sm">
                                                Track Order
                                            </button>
                                            {order.status === 'Delivered' && (
                                                <>
                                                    <button className="px-4 py-2 glass-card hover:glow-on-hover animate-smooth text-sm">
                                                        Write Review
                                                    </button>

                                                    <button className="px-4 py-2 glass-card hover:glow-on-hover animate-smooth text-sm">
                                                        Reorder
                                                    </button>
                                                </>
                                            )}

                                            {order.status === 'Processing' && (
                                                <button className="px-4 py-2 glass-card hover:glow-on-hover animate-smooth text-sm text-destructive">
                                                    Cancel Order
                                                </button>
                                            )}
                                        </div> */}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Orders;
