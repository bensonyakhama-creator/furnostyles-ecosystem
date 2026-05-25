/**
 * FURNOSTYLES — ADMIN DASHBOARD PREPARATION
 * ===========================================
 * File: dashboards/admin/admin-dashboard-prep.js
 * Purpose: Centralized admin dashboard preparation for ecosystem management,
 *          vendors, products, services, sourcing, marketplace analytics,
 *          inquiries, and approvals.
 */

(function () {
  'use strict';

  var AdminDashboardStructure = {
    path: 'admin/dashboard.html',
    sections: [
      { id: 'overview', title: 'Dashboard', type: 'stats', widgets: [
        { id: 'total-users', title: 'Total Users', type: 'metric' },
        { id: 'total-vendors', title: 'Total Vendors', type: 'metric' },
        { id: 'total-products', title: 'Total Products', type: 'metric' },
        { id: 'pending-approvals', title: 'Pending Approvals', type: 'metric' }
      ]},
      { id: 'users', title: 'Users', type: 'table', dataSource: 'users', actions: ['view', 'edit', 'suspend', 'delete'] },
      { id: 'vendors', title: 'Vendors', type: 'table', dataSource: 'vendors', actions: ['view', 'verify', 'suspend', 'delete'] },
      { id: 'products', title: 'Products', type: 'table', dataSource: 'products', actions: ['view', 'approve', 'reject', 'delete'] },
      { id: 'services', title: 'Services', type: 'table', dataSource: 'services', actions: ['view', 'approve', 'reject', 'delete'] },
      { id: 'sourcing', title: 'Sourcing', type: 'table', dataSource: 'sourcing', actions: ['view', 'approve', 'reject'] },
      { id: 'marketplace-analytics', title: 'Marketplace Analytics', type: 'charts', dataSource: 'analytics' },
      { id: 'inquiries', title: 'Inquiries', type: 'table', dataSource: 'inquiries', actions: ['view', 'respond'] },
      { id: 'approvals', title: 'Approvals', type: 'list', dataSource: 'approvals', actions: ['approve', 'reject'] },
      { id: 'settings', title: 'Settings', type: 'form', dataSource: 'settings' }
    ],
    navigation: [
      { id: 'overview', label: 'Dashboard', icon: 'dashboard' },
      { id: 'users', label: 'Users', icon: 'users' },
      { id: 'vendors', label: 'Vendors', icon: 'store' },
      { id: 'products', label: 'Products', icon: 'package' },
      { id: 'services', label: 'Services', icon: 'tool' },
      { id: 'sourcing', label: 'Sourcing', icon: 'globe' },
      { id: 'marketplace-analytics', label: 'Analytics', icon: 'chart' },
      { id: 'inquiries', label: 'Inquiries', icon: 'message' },
      { id: 'approvals', label: 'Approvals', icon: 'check' },
      { id: 'settings', label: 'Settings', icon: 'settings' }
    ]
  };

  window.FurnostylesAdminDashboardPrep = {
    AdminDashboardStructure: AdminDashboardStructure
  };

}());
