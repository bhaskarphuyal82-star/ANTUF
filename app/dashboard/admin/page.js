'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Users,
  DollarSign,
  ShoppingBag,
  TrendingUp,
  Calendar,
  BookOpen,
  FileText,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Edit,
  Trash2,
  Download,
} from 'lucide-react';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRevenue: 0,
    totalOrders: 0,
    totalCourses: 0,
    totalEvents: 0,
    totalArticles: 0,
    recentUsers: [],
    recentOrders: [],
    revenueData: [],
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    } else if (session?.user?.role !== 'admin') {
      router.push('/dashboard/user');
    }
  }, [session, status, router]);

  useEffect(() => {
    if (session?.user?.role === 'admin') {
      fetchDashboardData();
    }
  }, [session]);

  const fetchDashboardData = async () => {
    try {
      // Mock data for now - replace with actual API calls
      setStats({
        totalUsers: 1248,
        totalRevenue: 45231.89,
        totalOrders: 532,
        totalCourses: 24,
        totalEvents: 12,
        totalArticles: 156,
        recentUsers: [
          { id: 1, name: 'John Doe', email: 'john@example.com', joinedAt: '2024-01-15' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com', joinedAt: '2024-01-14' },
          { id: 3, name: 'Ram Sharma', email: 'ram@example.com', joinedAt: '2024-01-13' },
        ],
        recentOrders: [
          { id: 1, user: 'John Doe', course: 'Web Development', amount: 99.99, status: 'completed', date: '2024-01-15' },
          { id: 2, user: 'Jane Smith', course: 'Data Science', amount: 149.99, status: 'pending', date: '2024-01-14' },
          { id: 3, user: 'Ram Sharma', course: 'Digital Marketing', amount: 79.99, status: 'completed', date: '2024-01-13' },
        ],
        revenueData: [
          { month: 'Jan', revenue: 4200, growth: 12 },
          { month: 'Feb', revenue: 5100, growth: 21 },
          { month: 'Mar', revenue: 4800, growth: 14 },
          { month: 'Apr', revenue: 6300, growth: 31 },
          { month: 'May', revenue: 5900, growth: -6 },
          { month: 'Jun', revenue: 7200, growth: 22 },
        ],
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div style={{ textAlign: 'center', color: '#fff' }}>
          <div style={{ width: '64px', height: '64px', border: '4px solid rgba(255,255,255,0.3)', borderTop: '4px solid #fff', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }}></div>
          <p style={{ fontSize: '18px', fontWeight: '500' }}>Loading Dashboard...</p>
        </div>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!session || session.user.role !== 'admin') {
    return null;
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '24px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#fff', marginBottom: '8px' }}>
            Admin Dashboard
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)' }}>
            Welcome back, {session.user.name || 'Admin'}! Here's what's happening today.
          </p>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '32px' }}>
          {/* Total Users Card */}
          <StatCard
            title="Total Users"
            value={stats.totalUsers.toLocaleString()}
            icon={<Users size={28} />}
            trend={15.3}
            trendUp={true}
            color="#10b981"
            bgColor="rgba(16, 185, 129, 0.1)"
          />

          {/* Total Revenue Card */}
          <StatCard
            title="Total Revenue"
            value={`$${stats.totalRevenue.toLocaleString()}`}
            icon={<DollarSign size={28} />}
            trend={23.5}
            trendUp={true}
            color="#f59e0b"
            bgColor="rgba(245, 158, 11, 0.1)"
          />

          {/* Total Orders Card */}
          <StatCard
            title="Total Orders"
            value={stats.totalOrders.toLocaleString()}
            icon={<ShoppingBag size={28} />}
            trend={8.2}
            trendUp={true}
            color="#3b82f6"
            bgColor="rgba(59, 130, 246, 0.1)"
          />

          {/* Total Courses Card */}
          <StatCard
            title="Total Courses"
            value={stats.totalCourses}
            icon={<BookOpen size={28} />}
            trend={-2.1}
            trendUp={false}
            color="#8b5cf6"
            bgColor="rgba(139, 92, 246, 0.1)"
          />
        </div>

        {/* Quick Actions */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', marginBottom: '32px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>Quick Actions</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <QuickActionButton
              label="Manage Events"
              icon={<Calendar size={20} />}
              href="/dashboard/admin/events"
              color="#3b82f6"
            />
            <QuickActionButton
              label="Manage Courses"
              icon={<BookOpen size={20} />}
              href="/dashboard/admin/create"
              color="#10b981"
            />
            <QuickActionButton
              label="View Articles"
              icon={<FileText size={20} />}
              href="/dashboard/admin/post"
              color="#f59e0b"
            />
            <QuickActionButton
              label="View Orders"
              icon={<ShoppingBag size={20} />}
              href="/dashboard/admin/orders"
              color="#8b5cf6"
            />
          </div>
        </div>

        {/* Main Content Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px', marginBottom: '32px' }}>
          {/* Revenue Chart */}
          <div style={{ gridColumn: 'span 8', background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937' }}>Revenue Overview</h2>
              <button style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #e5e7eb', background: '#fff', color: '#6b7280', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Download size={16} />
                Export
              </button>
            </div>
            <div style={{ height: '300px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', gap: '12px' }}>
              {stats.revenueData.map((item, index) => (
                <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <div style={{ fontSize: '12px', fontWeight: '600', color: '#10b981' }}>
                    ${(item.revenue / 1000).toFixed(1)}k
                  </div>
                  <div
                    style={{
                      width: '100%',
                      height: `${(item.revenue / 8000) * 250}px`,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      borderRadius: '8px 8px 0 0',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                  ></div>
                  <div style={{ fontSize: '12px', fontWeight: '500', color: '#6b7280' }}>
                    {item.month}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Stats */}
          <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6' }}>
                  <Calendar size={24} />
                </div>
                <div>
                  <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Total Events</p>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>{stats.totalEvents}</p>
                </div>
              </div>
              <Link href="/dashboard/admin/events" style={{ fontSize: '14px', color: '#3b82f6', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                View all events <ArrowUpRight size={16} />
              </Link>
            </div>

            <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b' }}>
                  <FileText size={24} />
                </div>
                <div>
                  <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Total Articles</p>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>{stats.totalArticles}</p>
                </div>
              </div>
              <Link href="/dashboard/admin/post" style={{ fontSize: '14px', color: '#f59e0b', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                Manage articles <ArrowUpRight size={16} />
              </Link>
            </div>

            <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
                  <Activity size={24} />
                </div>
                <div>
                  <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Active Users</p>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>842</p>
                </div>
              </div>
              <p style={{ fontSize: '12px', color: '#6b7280' }}>67.5% of total users</p>
            </div>
          </div>
        </div>

        {/* Recent Activity Tables */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
          {/* Recent Users */}
          <div style={{ gridColumn: 'span 6', background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>Recent Users</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Name</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Email</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentUsers.map((user) => (
                    <tr key={user.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '12px 8px', fontSize: '14px', color: '#1f2937' }}>{user.name}</td>
                      <td style={{ padding: '12px 8px', fontSize: '14px', color: '#6b7280' }}>{user.email}</td>
                      <td style={{ padding: '12px 8px', fontSize: '14px', color: '#6b7280' }}>{user.joinedAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Link href="/dashboard/admin/alluser" style={{ marginTop: '16px', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '14px', color: '#3b82f6', textDecoration: 'none', fontWeight: '500' }}>
              View all users <ArrowUpRight size={16} />
            </Link>
          </div>

          {/* Recent Orders */}
          <div style={{ gridColumn: 'span 6', background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>Recent Orders</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>User</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Amount</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentOrders.map((order) => (
                    <tr key={order.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '12px 8px', fontSize: '14px', color: '#1f2937' }}>{order.user}</td>
                      <td style={{ padding: '12px 8px', fontSize: '14px', color: '#1f2937', fontWeight: '600' }}>${order.amount}</td>
                      <td style={{ padding: '12px 8px' }}>
                        <span style={{
                          padding: '4px 12px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '500',
                          background: order.status === 'completed' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                          color: order.status === 'completed' ? '#10b981' : '#f59e0b'
                        }}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Link href="/dashboard/admin/orders" style={{ marginTop: '16px', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '14px', color: '#3b82f6', textDecoration: 'none', fontWeight: '500' }}>
              View all orders <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ title, value, icon, trend, trendUp, color, bgColor }) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer',
    }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.1)';
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: color }}>
          {icon}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', fontWeight: '600', color: trendUp ? '#10b981' : '#ef4444' }}>
          {trendUp ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          {Math.abs(trend)}%
        </div>
      </div>
      <h3 style={{ fontSize: '14px', fontWeight: '500', color: '#6b7280', marginBottom: '8px' }}>
        {title}
      </h3>
      <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937' }}>
        {value}
      </p>
    </div>
  );
}

// Quick Action Button Component
function QuickActionButton({ label, icon, href, color }) {
  return (
    <Link
      href={href}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '16px',
        borderRadius: '12px',
        border: '2px solid #e5e7eb',
        textDecoration: 'none',
        color: '#1f2937',
        transition: 'all 0.3s ease',
        background: '#fff',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = color;
        e.currentTarget.style.background = `${color}10`;
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#e5e7eb';
        e.currentTarget.style.background = '#fff';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: color }}>
        {icon}
      </div>
      <span style={{ fontSize: '14px', fontWeight: '600' }}>{label}</span>
    </Link>
  );
}
