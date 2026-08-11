export const weevStats = [
  { id: 1, label: 'Active Projects', value: '14', change: '+2 this week', icon: 'FolderKanban' },
  { id: 2, label: 'Cataloged Materials', value: '482', change: '+18 added', icon: 'Layers' },
  { id: 3, label: 'Verified Suppliers', value: '38', change: 'Global Network', icon: 'Building2' },
  { id: 4, label: 'Pending Proposals', value: '6', change: 'Requires Action', icon: 'FileText' },
];

export const dummyMaterials = [
  {
    id: 'mat-01',
    name: 'Organic Indigo Denim 12oz',
    category: 'Fabric & Textile',
    supplier: 'EcoWeave Mills',
    composition: '100% Organic Cotton',
    weight: '340 gsm',
    sustainability: 'GOTS Certified',
    status: 'In Stock',
    image: 'https://images.unsplash.com/photo-1542272604-780c96856592?w=400&auto=format&fit=crop&q=60'
  },
  {
    id: 'mat-02',
    name: 'Recycled Ocean Polyester Mesh',
    category: 'Synthetic / Recycled',
    supplier: 'CleanSea Fiber Co.',
    composition: '92% rPET, 8% Elastane',
    weight: '180 gsm',
    sustainability: 'Ocean Plastic Standard',
    status: 'Sample Available',
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400&auto=format&fit=crop&q=60'
  },
  {
    id: 'mat-03',
    name: 'Natural Bamboo Viscose Satin',
    category: 'Luxury Silk Blend',
    supplier: 'SilkWay Artisans',
    composition: '70% Bamboo, 30% Mulberry Silk',
    weight: '120 gsm',
    sustainability: 'Biodegradable',
    status: 'In Stock',
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&auto=format&fit=crop&q=60'
  },
  {
    id: 'mat-04',
    name: 'Unbleached Raw Linen Blend',
    category: 'Natural Fiber',
    supplier: 'Nordic Flax Ltd.',
    composition: '55% Linen, 45% Cotton',
    weight: '260 gsm',
    sustainability: 'Zero Chemical Dye',
    status: 'Low Stock',
    image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=400&auto=format&fit=crop&q=60'
  }
];

export const dummyProjects = [
  {
    id: 'proj-1',
    name: 'SS26 Sustainable Activewear Line',
    client: 'Weev Studio',
    status: 'In Development',
    progress: 75,
    materialsCount: 8,
    lastUpdated: '2 hours ago'
  },
  {
    id: 'proj-2',
    name: 'Zero-Waste Denim Capsule',
    client: 'Urban Green Collection',
    status: 'Proposal Ready',
    progress: 90,
    materialsCount: 4,
    lastUpdated: 'Yesterday'
  },
  {
    id: 'proj-3',
    name: 'Eco Outerwear Outer Layer',
    client: 'Weev Core Brand',
    status: 'Material Sourcing',
    progress: 40,
    materialsCount: 12,
    lastUpdated: '3 days ago'
  }
];

export const dummySuppliers = [
  {
    id: 'sup-1',
    name: 'EcoWeave Mills Ltd.',
    location: 'Portugal',
    rating: 4.9,
    certifications: ['GOTS', 'OEKO-TEX 100', 'ISO 14001'],
    specialty: 'Sustainable Denim & Cotton'
  },
  {
    id: 'sup-2',
    name: 'CleanSea Fiber Co.',
    location: 'Taiwan',
    rating: 4.8,
    certifications: ['GRS Certified', 'Ocean Bound Plastic'],
    specialty: 'High Performance Recycled Synthetics'
  },
  {
    id: 'sup-3',
    name: 'SilkWay Artisans',
    location: 'Italy',
    rating: 4.95,
    certifications: ['Fair Trade Certified', 'Zero Water Waste'],
    specialty: 'Luxury Bio-Satin & Silk'
  }
];

export const dummyAlerts = [
  {
    id: 'alert-1',
    type: 'order',
    unread: false,
    title: 'Order request waiting for approval',
    description: 'New order request by Tilo Jaehn.',
    time: '4 months ago',
    icon: 'ShoppingBag'
  },
  {
    id: 'alert-2',
    type: 'message',
    unread: true,
    title: 'Smith & Jones Tannery',
    description: 'New message from Joel Alberto Hernández Duran.',
    time: '6 months ago',
    icon: 'Message' // using a generic indicator for supplier message, maybe an image avatar
  },
  {
    id: 'alert-3',
    type: 'order_update',
    unread: false,
    title: 'Your order request has been updated',
    description: 'Reviewed by Tilo Jaehn.',
    time: '9 months ago',
    icon: 'ShoppingBag'
  },
  {
    id: 'alert-4',
    type: 'order',
    unread: false,
    title: 'Order request waiting for approval',
    description: 'New order request by Tilo Jaehn.',
    time: '9 months ago',
    icon: 'ShoppingBag'
  },
  {
    id: 'alert-5',
    type: 'message',
    unread: true,
    title: 'Teneria Vargas',
    description: 'New message from Vargas Gonzalez Huguette.',
    time: '10 months ago',
    icon: 'Message'
  }
];

export const dummyRecentOrders = [
  {
    id: '1',
    orderNumber: '2025102800000000000000019',
    orderDate: 'Oct 28,\n2025',
    supplier: 'Smith & Jones Tannery\nGermany',
    estimatedCost: '128.00 EUR',
    status: 'Received'
  },
  {
    id: '2',
    orderNumber: '2025102800000000000000020',
    orderDate: 'Oct 28,\n2025',
    supplier: 'Curtidos Bengala S.A. de C.V.',
    estimatedCost: '5.70 EUR\n(6.20 USD)',
    status: 'Received'
  },
  {
    id: '3',
    orderNumber: '2025072300000000000000018',
    orderDate: 'Jul 23, 2025',
    supplier: 'Smith & Jones Finished Goods',
    estimatedCost: '22.97 EUR\n(25.00 USD)',
    status: 'Received'
  },
  {
    id: '4',
    orderNumber: '2025072300000000000000017',
    orderDate: 'Jul 23, 2025',
    supplier: 'Smith & Jones Tannery',
    estimatedCost: '8.28 EUR\n(9.00 USD)',
    status: 'In\nProgress'
  },
  {
    id: '5',
    orderNumber: '2025061100000000000000016',
    orderDate: 'Jun 11, 2025',
    supplier: 'Acopol',
    estimatedCost: '0.00 EUR\n(0.00 MXN)',
    status: 'Received'
  }
];

export const dummyCuttingEdgeSuppliers = [
  {
    id: 's1',
    name: 'New Dportus sub company 1',
    type: '-',
    headquarters: '-',
    countryOfProduction: '-',
    capacity: '-'
  },
  {
    id: 's2',
    name: 'New GEM Industria Calzature sub company 2',
    type: '-',
    headquarters: '-',
    countryOfProduction: '-',
    capacity: '-'
  },
  {
    id: 's3',
    name: 'New SF Supp sub company 5',
    type: '-',
    headquarters: '-',
    countryOfProduction: '-',
    capacity: '-'
  }
];

export const dummyMyProjects = [
  {
    id: 'p1',
    title: 'CSI Project',
    actionText: 'New Material added by Chris Hillyer',
    time: '10 months ago',
    icon: 'Building'
  },
  {
    id: 'p2',
    title: 'CSI Project',
    actionText: 'New Material added by Chris Hillyer',
    time: '10 months ago',
    icon: 'Building'
  },
  {
    id: 'p3',
    title: 'CSI Project',
    actionText: 'New Material Sku added by Chris Hillyer',
    time: '10 months ago',
    icon: 'Folder'
  }
];

export const dummyMySuppliers = [
  {
    id: 'sup1',
    name: 'ModEurop',
    subtext: 'Modeurop A/W 27-28',
    actionText: 'Collection uploaded 15 days ago',
    logo: 'modeurop'
  },
  {
    id: 'sup2',
    name: 'Curtidos Bengala S.A. de C.V.',
    subtext: '2024',
    actionText: 'Collection uploaded 17 days ago',
    logo: 'curtidos'
  },
  {
    id: 'sup3',
    name: 'Acopol',
    subtext: 'new Synthetics 2025',
    actionText: 'Collection uploaded 3 months ago',
    logo: 'acopol'
  }
];

export const dummyProjectFolders = [
  { id: 'f1', name: 'ModEurop', color: 'purple' },
  { id: 'f2', name: 'Style 700_15 men', color: 'purple' },
  { id: 'f3', name: 'Taiwan Sourcing', color: 'yellow' },
  { id: 'f4', name: 'Cambodia Sourcing', color: 'yellow' },
  { id: 'f5', name: 'Frank\'s project', color: 'purple' },
  { id: 'f6', name: 'Winter 2023', color: 'purple' },
  { id: 'f7', name: '2023 Lineapelle', color: 'yellow' },
  { id: 'f8', name: 'Fall Inspiration Trip :: Berlin', color: 'yellow' },
  { id: 'f9', name: 'Women\'s', color: 'yellow' },
  { id: 'f10', name: 'Men\'s', color: 'yellow' },
  { id: 'f11', name: 'Sourcing FW 2024', color: 'purple' },
  { id: 'f12', name: 'Spring / Summer 2026', color: 'purple' },
  { id: 'f13', name: 'Autum / Winter 2023', color: 'purple' },
  { id: 'f14', name: 'Autumn / Winter 2024', color: 'purple' }
];

export const dummyTeamProjects = [
  { id: 't1', name: 'Sourcing FW 2024', color: 'purple' },
  { id: 't2', name: 'Spring / Summer 2026', color: 'purple' },
  { id: 't3', name: 'Autumn / Winter 2024', color: 'purple' }
];

export const dummyPopularCollections = [
  { id: 'pc1', title: 'Modeurop A/W 27-28', supplier: 'ModEurop', image: '/images/modeurop.png' },
  { id: 'pc2', title: 'DANDELION NYC26', supplier: 'LeFarc', image: '/images/dandelion.png' },
  { id: 'pc3', title: 'Lefarc Lineapelle New York', supplier: 'LeFarc', image: '/images/lefarc.png' },
  { id: 'pc4', title: 'Overstock Nappa Leather', supplier: 'Smith & Jones Tannery', image: '/images/overstock.png' }
];

export const dummyExploreTypes = [
  { id: 'et1', title: 'Leather', description: 'Leather is a strong, flexible and durable material obtained from the tanning, or chemical treatment, of animal skins and hides to prevent decay.' },
  { id: 'et2', title: 'Synthetics & Leather Alternatives', description: 'Synthetic fibers are made of synthetic materials, usually formed through chemical processes. The fibers are generally extracted during the chemical process using a spinneret, which is a device that takes polymers to form...', hasReadMore: true },
  { id: 'et3', title: 'Textiles', description: 'A textile is a flexible material made by creating an interlocking network of yarns or threads, which are produced by spinning raw fibers (from either natural or synthetic sources) into long and twisted lengths. Textiles are then...', hasReadMore: true },
  { id: 'et4', title: 'Finished and semi finished Goods', description: 'Non-leather and non-synthetic material made from plant substances to create a leather-like or woven material' },
  { id: 'et5', title: 'Trims & Accessories', description: 'Items intended to fasten, decorate or identify.' },
  { id: 'et6', title: 'Hardware', description: 'Items of metal or other hard (Nylon) compound material intended to fasten, decorate or identify' },
  { id: 'et7', title: 'Components, Outsoles, Insoles, Lasts', description: 'Items necessary for construction of footwear' },
  { id: 'et8', title: 'Threads, Yarns, Fibers', description: 'Twisted filaments spun into considerable lengths for fastening or decoration' }
];
