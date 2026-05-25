/**
 * FURNOSTYLES — DASHBOARD DATA (Placeholder)
 * ==========================================
 * File: dashboards/shared/dashboard-data.js
 *
 * PURPOSE:
 *   Placeholder data for dashboard UI testing.
 *   Will be replaced with real Firestore data in future phases.
 *
 * USAGE:
 *   window.FurnostylesDashboardData.getClientMetrics()
 *   window.FurnostylesDashboardData.getClientInquiries()
 *   window.FurnostylesDashboardData.getClientActivity()
 */

(function () {
  'use strict';

  /**
   * Client dashboard metrics placeholder
   */
  var clientMetrics = {
    savedItems: 12,
    quoteRequests: 5,
    sourcingRequests: 3,
    repairRequests: 2,
    projectConsultations: 1,
    pendingActions: 4
  };

  /**
   * Client inquiries placeholder
   */
  var clientInquiries = [
    {
      id: 'inq-001',
      type: 'quote',
      title: 'Living Room Furniture Set',
      status: 'pending',
      date: '2024-01-15',
      vendor: 'Luxury Furniture Co.'
    },
    {
      id: 'inq-002',
      type: 'sourcing',
      title: 'Custom Kitchen Cabinets',
      status: 'in-progress',
      date: '2024-01-14',
      vendor: 'Premium Woodworks'
    },
    {
      id: 'inq-003',
      type: 'repair',
      title: 'Sofa Cushion Replacement',
      status: 'completed',
      date: '2024-01-10',
      vendor: 'Furnostyles Repairs'
    }
  ];

  /**
   * Client recent activity placeholder
   */
  var clientActivity = [
    {
      id: 'act-001',
      action: 'Saved item',
      description: 'Modern Leather Sofa',
      timestamp: '2 hours ago'
    },
    {
      id: 'act-002',
      action: 'Submitted quote request',
      description: 'Dining Table Set',
      timestamp: '1 day ago'
    },
    {
      id: 'act-003',
      action: 'Received response',
      description: 'Quote for Bedroom Set',
      timestamp: '2 days ago'
    }
  ];

  /**
   * Recommended services placeholder
   */
  var recommendedServices = [
    {
      id: 'srv-001',
      title: 'Interior Design Consultation',
      provider: 'Furnostyles Design',
      rating: 4.8,
      price: 'KES 5,000'
    },
    {
      id: 'srv-002',
      title: 'Furniture Assembly',
      provider: 'Quick Assembly',
      rating: 4.5,
      price: 'KES 2,000'
    },
    {
      id: 'srv-003',
      title: 'Professional Cleaning',
      provider: 'Clean Pro',
      rating: 4.7,
      price: 'KES 3,000'
    }
  ];

  /**
   * Get client metrics
   */
  function getClientMetrics() {
    return clientMetrics;
  }

  /**
   * Get client inquiries
   */
  function getClientInquiries() {
    return clientInquiries;
  }

  /**
   * Get client activity
   */
  function getClientActivity() {
    return clientActivity;
  }

  /**
   * Get recommended services
   */
  function getRecommendedServices() {
    return recommendedServices;
  }

  /**
   * Vendor dashboard metrics placeholder
   */
  var vendorMetrics = {
    totalProducts: 24,
    activeListings: 18,
    pendingInquiries: 7,
    completedOrders: 12,
    totalRevenue: 'KES 245,000',
    averageRating: 4.6,
    verificationStatus: 'pending'
  };

  /**
   * Vendor product listings placeholder
   */
  var vendorProducts = [
    {
      id: 'prod-001',
      type: 'furniture',
      title: 'Modern Leather Sofa Set',
      price: 'KES 85,000',
      status: 'active',
      views: 145,
      inquiries: 8
    },
    {
      id: 'prod-002',
      type: 'material',
      title: 'Premium Hardwood Planks',
      price: 'KES 12,000',
      status: 'active',
      views: 89,
      inquiries: 3
    },
    {
      id: 'prod-003',
      type: 'furniture',
      title: 'Oak Dining Table',
      price: 'KES 45,000',
      status: 'pending',
      views: 0,
      inquiries: 0
    }
  ];

  /**
   * Vendor customer inquiries placeholder
   */
  var vendorInquiries = [
    {
      id: 'vinq-001',
      type: 'quote',
      customer: 'John Doe',
      product: 'Modern Leather Sofa Set',
      status: 'pending',
      date: '2024-01-15',
      message: 'Is this available in brown leather?'
    },
    {
      id: 'vinq-002',
      type: 'sourcing',
      customer: 'Jane Smith',
      product: 'Custom Kitchen Cabinets',
      status: 'in-progress',
      date: '2024-01-14',
      message: 'Need custom dimensions for my kitchen.'
    },
    {
      id: 'vinq-003',
      type: 'order',
      customer: 'Michael Johnson',
      product: 'Premium Hardwood Planks',
      status: 'completed',
      date: '2024-01-10',
      message: 'Order delivered successfully.'
    }
  ];

  /**
   * Vendor performance summary placeholder
   */
  var vendorPerformance = {
    responseRate: '92%',
    averageResponseTime: '2 hours',
    fulfillmentRate: '88%',
    customerSatisfaction: 4.6,
    monthlySales: 12,
    revenueGrowth: '+15%'
  };

  /**
   * Get vendor metrics
   */
  function getVendorMetrics() {
    return vendorMetrics;
  }

  /**
   * Get vendor products
   */
  function getVendorProducts() {
    return vendorProducts;
  }

  /**
   * Get vendor inquiries
   */
  function getVendorInquiries() {
    return vendorInquiries;
  }

  /**
   * Get vendor performance
   */
  function getVendorPerformance() {
    return vendorPerformance;
  }

  /**
   * Provider dashboard metrics placeholder
   */
  var providerMetrics = {
    totalJobs: 15,
    availableRequests: 5,
    assignedJobs: 3,
    completedJobs: 7,
    totalEarnings: 'KES 78,000',
    averageRating: 4.7,
    disciplineScore: 95,
    verificationStatus: 'verified'
  };

  /**
   * Provider job requests placeholder
   */
  var providerJobs = [
    {
      id: 'job-001',
      type: 'repair',
      title: 'Sofa Cushion Replacement',
      location: 'Kasarani, Nairobi',
      status: 'available',
      budget: 'KES 5,000',
      urgency: 'normal'
    },
    {
      id: 'job-002',
      type: 'installation',
      title: 'Furniture Assembly',
      location: 'Westlands, Nairobi',
      status: 'assigned',
      budget: 'KES 3,000',
      urgency: 'high'
    },
    {
      id: 'job-003',
      type: 'maintenance',
      title: 'Wooden Table Refinishing',
      location: 'Karen, Nairobi',
      status: 'completed',
      budget: 'KES 8,000',
      urgency: 'normal'
    }
  ];

  /**
   * Provider customer inquiries placeholder
   */
  var providerInquiries = [
    {
      id: 'pinq-001',
      type: 'quote',
      customer: 'Mary Wanjiku',
      service: 'Upholstery Repair',
      status: 'pending',
      date: '2024-01-15',
      message: 'Need repair for 3-seater sofa.'
    },
    {
      id: 'pinq-002',
      type: 'consultation',
      customer: 'David Kamau',
      service: 'Furniture Assembly',
      status: 'in-progress',
      date: '2024-01-14',
      message: 'Need assembly for dining set.'
    },
    {
      id: 'pinq-003',
      type: 'booking',
      customer: 'Grace Omondi',
      service: 'Wood Refinishing',
      status: 'completed',
      date: '2024-01-10',
      message: 'Job completed successfully.'
    }
  ];

  /**
   * Provider performance summary placeholder
   */
  var providerPerformance = {
    responseRate: '95%',
    averageResponseTime: '1 hour',
    completionRate: '93%',
    customerSatisfaction: 4.7,
    disciplineScore: 95,
    onTimeDelivery: '90%'
  };

  /**
   * Contractor dashboard metrics placeholder
   */
  var contractorMetrics = {
    totalProjects: 8,
    availableProjects: 2,
    activeProjects: 3,
    completedProjects: 3,
    totalRevenue: 'KES 450,000',
    averageRating: 4.5,
    disciplineScore: 92,
    verificationStatus: 'verified'
  };

  /**
   * Contractor project requests placeholder
   */
  var contractorProjects = [
    {
      id: 'proj-001',
      type: 'renovation',
      title: 'Kitchen Renovation',
      location: 'Kileleshwa, Nairobi',
      status: 'available',
      budget: 'KES 150,000',
      duration: '2 weeks'
    },
    {
      id: 'proj-002',
      type: 'construction',
      title: 'Office Partition Installation',
      location: 'Industrial Area, Nairobi',
      status: 'active',
      budget: 'KES 80,000',
      duration: '1 week'
    },
    {
      id: 'proj-003',
      type: 'renovation',
      title: 'Living Room Remodel',
      location: 'Muthaiga, Nairobi',
      status: 'completed',
      budget: 'KES 220,000',
      duration: '3 weeks'
    }
  ];

  /**
   * Contractor client inquiries placeholder
   */
  var contractorInquiries = [
    {
      id: 'cinq-001',
      type: 'quote',
      client: 'Peter Njoroge',
      project: 'Bathroom Renovation',
      status: 'pending',
      date: '2024-01-15',
      message: 'Need quote for complete bathroom remodel.'
    },
    {
      id: 'cinq-002',
      type: 'consultation',
      client: 'Sarah Mwangi',
      project: 'Office Setup',
      status: 'in-progress',
      date: '2024-01-14',
      message: 'Need consultation for office partitioning.'
    },
    {
      id: 'cinq-003',
      type: 'booking',
      client: 'James Ochieng',
      project: 'Deck Construction',
      status: 'completed',
      date: '2024-01-10',
      message: 'Deck construction completed successfully.'
    }
  ];

  /**
   * Contractor performance summary placeholder
   */
  var contractorPerformance = {
    responseRate: '88%',
    averageResponseTime: '3 hours',
    completionRate: '90%',
    clientSatisfaction: 4.5,
    disciplineScore: 92,
    onTimeDelivery: '85%'
  };

  /**
   * Get provider metrics
   */
  function getProviderMetrics() {
    return providerMetrics;
  }

  /**
   * Get provider jobs
   */
  function getProviderJobs() {
    return providerJobs;
  }

  /**
   * Get provider inquiries
   */
  function getProviderInquiries() {
    return providerInquiries;
  }

  /**
   * Get provider performance
   */
  function getProviderPerformance() {
    return providerPerformance;
  }

  /**
   * Get contractor metrics
   */
  function getContractorMetrics() {
    return contractorMetrics;
  }

  /**
   * Get contractor projects
   */
  function getContractorProjects() {
    return contractorProjects;
  }

  /**
   * Get contractor inquiries
   */
  function getContractorInquiries() {
    return contractorInquiries;
  }

  /**
   * Get contractor performance
   */
  function getContractorPerformance() {
    return contractorPerformance;
  }

  /**
   * Property owner dashboard metrics placeholder
   */
  var propertyOwnerMetrics = {
    totalProperties: 5,
    listedProperties: 3,
    rentalInquiries: 4,
    salesInquiries: 2,
    maintenanceRequests: 1,
    totalRevenue: 'KES 180,000',
    averageRating: 4.8,
    verificationStatus: 'verified'
  };

  /**
   * Property owner properties placeholder
   */
  var propertyOwnerProperties = [
    {
      id: 'prop-001',
      type: 'apartment',
      title: '3-Bedroom Apartment in Kilimani',
      location: 'Kilimani, Nairobi',
      status: 'listed',
      price: 'KES 15,000/month',
      views: 89,
      inquiries: 6
    },
    {
      id: 'prop-002',
      type: 'house',
      title: '4-Bedroom House in Karen',
      location: 'Karen, Nairobi',
      status: 'listed',
      price: 'KES 25,000,000',
      views: 124,
      inquiries: 3
    },
    {
      id: 'prop-003',
      type: 'apartment',
      title: '2-Bedroom Apartment in Westlands',
      location: 'Westlands, Nairobi',
      status: 'pending',
      price: 'KES 12,000/month',
      views: 0,
      inquiries: 0
    }
  ];

  /**
   * Property owner inquiries placeholder
   */
  var propertyOwnerInquiries = [
    {
      id: 'poq-001',
      type: 'rental',
      inquirer: 'James Mwangi',
      property: '3-Bedroom Apartment in Kilimani',
      status: 'pending',
      date: '2024-01-15',
      message: 'Interested in viewing the property.'
    },
    {
      id: 'poq-002',
      type: 'sale',
      inquirer: 'Sarah Kamau',
      property: '4-Bedroom House in Karen',
      status: 'in-progress',
      date: '2024-01-14',
      message: 'Requesting property inspection.'
    },
    {
      id: 'poq-003',
      type: 'maintenance',
      inquirer: 'Maintenance Team',
      property: '3-Bedroom Apartment in Kilimani',
      status: 'completed',
      date: '2024-01-10',
      message: 'Plumbing repair completed.'
    }
  ];

  /**
   * Property owner performance summary placeholder
   */
  var propertyOwnerPerformance = {
    responseRate: '90%',
    averageResponseTime: '4 hours',
    occupancyRate: '85%',
    tenantSatisfaction: 4.8,
    maintenanceResponseTime: '24 hours',
    revenueGrowth: '+12%'
  };

  /**
   * Agent dashboard metrics placeholder
   */
  var agentMetrics = {
    totalListings: 12,
    activeListings: 8,
    buyerInquiries: 6,
    rentalInquiries: 4,
    propertyOwnerLeads: 3,
    totalSales: 'KES 45,000,000',
    averageRating: 4.7,
    verificationStatus: 'verified'
  };

  /**
   * Agent listings placeholder
   */
  var agentListings = [
    {
      id: 'list-001',
      type: 'apartment',
      title: 'Luxury Penthouse in Muthaiga',
      location: 'Muthaiga, Nairobi',
      status: 'active',
      price: 'KES 35,000,000',
      views: 156,
      inquiries: 8
    },
    {
      id: 'list-002',
      type: 'house',
      title: 'Modern Villa in Lavington',
      location: 'Lavington, Nairobi',
      status: 'active',
      price: 'KES 28,000,000',
      views: 98,
      inquiries: 5
    },
    {
      id: 'list-003',
      type: 'land',
      title: 'Commercial Plot in Gigiri',
      location: 'Gigiri, Nairobi',
      status: 'pending',
      price: 'KES 15,000,000',
      views: 0,
      inquiries: 0
    }
  ];

  /**
   * Agent inquiries placeholder
   */
  var agentInquiries = [
    {
      id: 'aiq-001',
      type: 'buyer',
      client: 'Peter Njoroge',
      property: 'Luxury Penthouse in Muthaiga',
      status: 'pending',
      date: '2024-01-15',
      message: 'Interested in scheduling a viewing.'
    },
    {
      id: 'aiq-002',
      type: 'rental',
      client: 'Grace Omondi',
      property: 'Modern Villa in Lavington',
      status: 'in-progress',
      date: '2024-01-14',
      message: 'Requesting rental terms.'
    },
    {
      id: 'aiq-003',
      type: 'lead',
      client: 'John Kipchoge',
      property: 'Commercial Plot in Gigiri',
      status: 'completed',
      date: '2024-01-10',
      message: 'Property sold successfully.'
    }
  ];

  /**
   * Agent performance summary placeholder
   */
  var agentPerformance = {
    responseRate: '94%',
    averageResponseTime: '2 hours',
    conversionRate: '35%',
    clientSatisfaction: 4.7,
    listingQuality: 4.8,
    revenueGrowth: '+18%'
  };

  /**
   * Get property owner metrics
   */
  function getPropertyOwnerMetrics() {
    return propertyOwnerMetrics;
  }

  /**
   * Get property owner properties
   */
  function getPropertyOwnerProperties() {
    return propertyOwnerProperties;
  }

  /**
   * Get property owner inquiries
   */
  function getPropertyOwnerInquiries() {
    return propertyOwnerInquiries;
  }

  /**
   * Get property owner performance
   */
  function getPropertyOwnerPerformance() {
    return propertyOwnerPerformance;
  }

  /**
   * Get agent metrics
   */
  function getAgentMetrics() {
    return agentMetrics;
  }

  /**
   * Get agent listings
   */
  function getAgentListings() {
    return agentListings;
  }

  /**
   * Get agent inquiries
   */
  function getAgentInquiries() {
    return agentInquiries;
  }

  /**
   * Get agent performance
   */
  function getAgentPerformance() {
    return agentPerformance;
  }

  /**
   * Admin dashboard metrics placeholder
   */
  var adminMetrics = {
    totalUsers: 156,
    activeUsers: 89,
    pendingVerifications: 12,
    totalVendors: 24,
    totalProviders: 18,
    totalContractors: 15,
    totalPropertyOwners: 32,
    totalAgents: 28,
    systemStatus: 'healthy'
  };

  /**
   * Admin recent activities placeholder
   */
  var adminActivities = [
    {
      id: 'adm-001',
      type: 'verification',
      user: 'John Doe (Vendor)',
      action: 'Verification request submitted',
      status: 'pending',
      date: '2024-01-15'
    },
    {
      id: 'adm-002',
      type: 'registration',
      user: 'Jane Smith (Provider)',
      action: 'New user registration',
      status: 'completed',
      date: '2024-01-15'
    },
    {
      id: 'adm-003',
      type: 'report',
      user: 'System',
      action: 'Daily system report generated',
      status: 'completed',
      date: '2024-01-14'
    }
  ];

  /**
   * Super admin dashboard metrics placeholder
   */
  var superAdminMetrics = {
    totalUsers: 156,
    totalRevenue: 'KES 2,450,000',
    activeSubscriptions: 45,
    pendingIssues: 3,
    systemUptime: '99.9%',
    totalAdmins: 5,
    totalRoles: 8,
    databaseSize: '2.4 GB',
    apiRequests: '1.2M/day'
  };

  /**
   * Super admin system health placeholder
   */
  var superAdminHealth = [
    {
      id: 'sys-001',
      component: 'Firebase Auth',
      status: 'operational',
      uptime: '99.9%',
      lastCheck: '2024-01-15 10:00'
    },
    {
      id: 'sys-002',
      component: 'Firestore Database',
      status: 'operational',
      uptime: '99.8%',
      lastCheck: '2024-01-15 10:00'
    },
    {
      id: 'sys-003',
      component: 'Firebase Storage',
      status: 'operational',
      uptime: '99.9%',
      lastCheck: '2024-01-15 10:00'
    }
  ];

  /**
   * Get admin metrics
   */
  function getAdminMetrics() {
    return adminMetrics;
  }

  /**
   * Get admin activities
   */
  function getAdminActivities() {
    return adminActivities;
  }

  /**
   * Get super admin metrics
   */
  function getSuperAdminMetrics() {
    return superAdminMetrics;
  }

  /**
   * Get super admin health
   */
  function getSuperAdminHealth() {
    return superAdminHealth;
  }

  /**
   * Export dashboard data API
   */
  window.FurnostylesDashboardData = {
    getClientMetrics: getClientMetrics,
    getClientInquiries: getClientInquiries,
    getClientActivity: getClientActivity,
    getRecommendedServices: getRecommendedServices,
    getVendorMetrics: getVendorMetrics,
    getVendorProducts: getVendorProducts,
    getVendorInquiries: getVendorInquiries,
    getVendorPerformance: getVendorPerformance,
    getProviderMetrics: getProviderMetrics,
    getProviderJobs: getProviderJobs,
    getProviderInquiries: getProviderInquiries,
    getProviderPerformance: getProviderPerformance,
    getContractorMetrics: getContractorMetrics,
    getContractorProjects: getContractorProjects,
    getContractorInquiries: getContractorInquiries,
    getContractorPerformance: getContractorPerformance,
    getPropertyOwnerMetrics: getPropertyOwnerMetrics,
    getPropertyOwnerProperties: getPropertyOwnerProperties,
    getPropertyOwnerInquiries: getPropertyOwnerInquiries,
    getPropertyOwnerPerformance: getPropertyOwnerPerformance,
    getAgentMetrics: getAgentMetrics,
    getAgentListings: getAgentListings,
    getAgentInquiries: getAgentInquiries,
    getAgentPerformance: getAgentPerformance,
    getAdminMetrics: getAdminMetrics,
    getAdminActivities: getAdminActivities,
    getSuperAdminMetrics: getSuperAdminMetrics,
    getSuperAdminHealth: getSuperAdminHealth
  };

}());
