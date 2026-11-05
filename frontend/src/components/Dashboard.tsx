'use client';

import { useEffect, useState } from 'react';

interface Metrics {
  totalVendors: number;
  activeVendors: number;
  pendingVendors: number;
  averageRating: number;
  totalSpend: number;
  monthlySpend: number;
  savingsAchieved: number;
  contractsActive: number;
  contractsExpiring: number;
}

export default function Dashboard() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/dashboard/metrics');
      const data = await response.json();
      setMetrics(data);
    } catch (error) {
      console.error('Failed to fetch metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading dashboard...</div>;
  }

  if (!metrics) {
    return <div className="text-center py-12 text-red-600">Failed to load dashboard data</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Procurement Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-500">Total Vendors</div>
          <div className="mt-2 text-3xl font-bold text-gray-900">{metrics.totalVendors}</div>
          <div className="mt-2 text-sm text-green-600">
            {metrics.activeVendors} active
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-500">Total Spend</div>
          <div className="mt-2 text-3xl font-bold text-gray-900">
            ${metrics.totalSpend.toLocaleString()}
          </div>
          <div className="mt-2 text-sm text-gray-500">Year to date</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-500">Savings Achieved</div>
          <div className="mt-2 text-3xl font-bold text-green-600">
            ${metrics.savingsAchieved.toLocaleString()}
          </div>
          <div className="mt-2 text-sm text-gray-500">This quarter</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-500">Average Rating</div>
          <div className="mt-2 text-3xl font-bold text-gray-900">
            {metrics.averageRating.toFixed(1)}
          </div>
          <div className="mt-2 text-sm text-gray-500">Vendor performance</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Contracts Overview</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Active Contracts</span>
              <span className="text-2xl font-bold text-blue-600">{metrics.contractsActive}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Expiring Soon</span>
              <span className="text-2xl font-bold text-orange-600">{metrics.contractsExpiring}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Vendor Status</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Active Vendors</span>
              <span className="text-2xl font-bold text-green-600">{metrics.activeVendors}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Pending Review</span>
              <span className="text-2xl font-bold text-yellow-600">{metrics.pendingVendors}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Spend</h3>
        <div className="text-4xl font-bold text-gray-900">
          ${metrics.monthlySpend.toLocaleString()}
        </div>
        <div className="mt-2 text-sm text-gray-500">Current month</div>
      </div>
    </div>
  );
}
