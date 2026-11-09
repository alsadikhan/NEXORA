import { Product } from '@/types/product';

export const dummyProducts: Product[] = [
  {
    id: 1,
    name: 'Premium Cotton T-Shirt',
    sku: 'TSH-001',
    price: 499,
    comparePrice: 599,
    costPrice: 250,
    rating: 4.9,
    category: 'T-Shirts',
    subCategory: 'Essential',
    link: '/shop/product/1',
    isNew: true,
    isFeatured: true,
    isBestSeller: false,
    isOnSale: true,
    isActive: true,
    inStock: true,
    stock: 150,
    reservedStock: 10,
    lowStockThreshold: 20,
    reorderPoint: 15,
    hasColorOptions: true,
    colorVariants: [
      { 
        color: '#000000',
        name: 'Black',
        image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995330/blank-tshirt-19_mhmvoh.jpg'
      },
      {
        color: '#FFFFFF',
        name: 'White',
        image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995325/blank-tshirt-15_sm6qa8.jpg'
      },
      {
        color: '#D5D8DC',
        name: 'Gray',
        image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995337/blank-tshirt-6_sjbzub.jpg'
      }
    ],
    image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995324/blank-tshirt-14_cfsydj.jpg',
    description: 'Our premium cotton t-shirt offers exceptional comfort and durability for everyday wear. Made from 100% organic cotton, this t-shirt features a classic fit that works for any occasion. The breathable fabric ensures all-day comfort, while the reinforced seams add extra durability.',
    longDescription: [
      {
        title: 'Product Overview',
        content: 'This premium cotton t-shirt is crafted from the finest organic cotton fibers, ensuring both comfort and sustainability. The fabric is carefully selected and processed to maintain its natural softness while providing excellent durability.'
      },
      {
        title: 'Key Benefits',
        content: 'The breathable cotton fabric regulates body temperature, keeping you cool in warm weather and comfortable in cooler conditions. The reinforced stitching ensures long-lasting wear, making this t-shirt a reliable choice for everyday use.'
      },
      {
        title: 'Perfect Fit',
        content: 'Designed with a classic regular fit that flatters all body types. The t-shirt features a comfortable neckline and sleeves that provide ease of movement without being too loose or restrictive.'
      }
    ],
    careInstructions: [
      'Machine wash cold with like colors',
      'Tumble dry on low heat',
      'Do not bleach',
      'Iron on low heat if needed',
      'Store in a cool, dry place'
    ],
    features: [
      '100% Organic Cotton',
      'Breathable fabric',
      'Reinforced seams',
      'Classic regular fit',
      'Sustainable production',
      'Hypoallergenic material'
    ],
    tags: ['cotton', 'essential', 'premium', 'organic', 'sustainable'],
    additionalImages: [
      'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995330/blank-tshirt-19_mhmvoh.jpg',
      'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995325/blank-tshirt-15_sm6qa8.jpg',
      'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995337/blank-tshirt-6_sjbzub.jpg'
    ],
    specifications: [
      { label: 'Material', value: '100% Organic Cotton' },
      { label: 'Fit', value: 'Regular Fit' },
      { label: 'Care', value: 'Machine wash cold, tumble dry low' },
      { label: 'Origin', value: 'Made in Bangladesh' },
      { label: 'Weight', value: '180 GSM' },
      { label: 'Fabric Type', value: 'Single Jersey' },
      { label: 'Neck Style', value: 'Crew Neck' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    metaTitle: 'Premium Cotton T-Shirt - Organic Comfort | NEXORA Fashion',
    metaDescription: 'Discover our premium organic cotton t-shirt offering exceptional comfort and durability. Made from 100% organic cotton with reinforced seams for long-lasting wear.',
    urlSlug: 'premium-cotton-tshirt',
    bulkPricing: [
      { minQuantity: 5, maxQuantity: 9, price: 450 },
      { minQuantity: 10, maxQuantity: 19, price: 400 },
      { minQuantity: 20, maxQuantity: 49, price: 350 }
    ]
  },
  {
    id: 2,
    name: 'Slim Fit Polo Shirt',
    sku: 'POLO-002',
    price: 699,
    comparePrice: 799,
    costPrice: 350,
    rating: 4.7,
    category: 'Polo Shirts',
    subCategory: 'Slim Fit',
    link: '/shop/product/2',
    isNew: false,
    isFeatured: false,
    isBestSeller: true,
    isOnSale: false,
    isActive: true,
    inStock: true,
    stock: 85,
    reservedStock: 5,
    lowStockThreshold: 15,
    reorderPoint: 10,
    hasColorOptions: true,
    colorVariants: [
      {
        color: '#1C2833',
        name: 'Navy',
        image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995428/image-5_shfwmg.jpg'
      },
      {
        color: '#5D6D7E',
        name: 'Blue',
        image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995421/image-119_cnolq1.jpg'
      }
    ],
    image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995427/image-157_xsbuoe.jpg',
    description: 'A modern slim fit polo shirt that offers both style and comfort for a polished casual look. The premium piqué cotton fabric provides breathability and a soft feel against the skin. Features a classic two-button placket and ribbed collar and cuffs for a refined finish.',
    longDescription: [
      {
        title: 'Design & Style',
        content: 'This slim fit polo shirt features a modern silhouette that flatters the body while maintaining comfort. The classic two-button placket adds a sophisticated touch, while the ribbed collar and cuffs provide structure and durability.'
      },
      {
        title: 'Premium Fabric',
        content: 'Crafted from premium piqué cotton, this polo shirt offers exceptional breathability and moisture-wicking properties. The fabric is soft against the skin and maintains its shape even after multiple washes.'
      },
      {
        title: 'Versatile Wear',
        content: 'Perfect for both casual and smart-casual occasions. Pair with chinos for a polished look or jeans for a more relaxed style. The slim fit design ensures a modern, tailored appearance.'
      }
    ],
    careInstructions: [
      'Machine wash cold with like colors',
      'Do not bleach',
      'Tumble dry on low heat',
      'Iron on medium heat if needed',
      'Professional dry clean if necessary'
    ],
    features: [
      'Premium Piqué Cotton',
      'Slim fit design',
      'Two-button placket',
      'Ribbed collar and cuffs',
      'Breathable fabric',
      'Moisture-wicking properties'
    ],
    tags: ['polo', 'slim fit', 'casual', 'premium', 'piqué'],
    additionalImages: [
      'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995428/image-5_shfwmg.jpg',
      'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995421/image-119_cnolq1.jpg',
      'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995427/image-157_xsbuoe.jpg'
    ],
    specifications: [
      { label: 'Material', value: 'Premium Piqué Cotton' },
      { label: 'Fit', value: 'Slim Fit' },
      { label: 'Care', value: 'Machine wash cold, do not bleach' },
      { label: 'Features', value: 'Two-button placket, ribbed collar and cuffs' },
      { label: 'Weight', value: '200 GSM' },
      { label: 'Fabric Type', value: 'Piqué' },
      { label: 'Neck Style', value: 'Polo Collar' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    metaTitle: 'Slim Fit Polo Shirt - Modern Style | NEXORA Fashion',
    metaDescription: 'Discover our slim fit polo shirt with premium piqué cotton fabric. Perfect for casual and smart-casual occasions with a modern, tailored fit.',
    urlSlug: 'slim-fit-polo-shirt',
    bulkPricing: [
      { minQuantity: 3, maxQuantity: 5, price: 650 },
      { minQuantity: 6, maxQuantity: 10, price: 600 },
      { minQuantity: 11, maxQuantity: 20, price: 550 }
    ]
  },
  {
    id: 3,
    name: 'Signature Collection Tee',
    sku: 'SIG-003',
    price: 599,
    comparePrice: 699,
    costPrice: 300,
    rating: 4.8,
    category: 'T-Shirts',
    subCategory: 'Signature',
    link: '/shop/product/3',
    isNew: true,
    isFeatured: true,
    isBestSeller: false,
    isOnSale: false,
    isActive: true,
    inStock: true,
    stock: 60,
    reservedStock: 8,
    lowStockThreshold: 12,
    reorderPoint: 8,
    hasColorOptions: false,
    image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748817871/tshirt-6_dzfego.jpg',
    description: 'Part of our exclusive signature collection, this tee combines premium fabric with distinctive design. The unique cut and premium materials make this a standout piece in any wardrobe.',
    longDescription: [
      {
        title: 'Signature Collection',
        content: 'This tee is part of our exclusive signature collection, featuring unique design elements and premium materials that set it apart from standard offerings. Each piece is carefully crafted to represent our brand\'s commitment to quality and style.'
      },
      {
        title: 'Premium Materials',
        content: 'Crafted from a premium cotton blend that offers the perfect balance of comfort, durability, and style. The fabric is carefully selected and processed to ensure it maintains its quality and appearance over time.'
      },
      {
        title: 'Distinctive Design',
        content: 'Features a modern fit with unique design elements that make it instantly recognizable as part of our signature collection. The cut and styling are designed to flatter while maintaining exceptional comfort.'
      }
    ],
    careInstructions: [
      'Machine wash cold with like colors',
      'Tumble dry on low heat',
      'Do not bleach',
      'Iron on low heat if needed',
      'Store flat to maintain shape'
    ],
    features: [
      'Premium Cotton Blend',
      'Modern fit design',
      'Signature collection piece',
      'Unique styling elements',
      'Exceptional comfort',
      'Durable construction'
    ],
    tags: ['signature', 'exclusive', 'premium', 'collection', 'modern'],
    additionalImages: [
      'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748817871/tshirt-6_dzfego.jpg',
      'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748817883/tshirt-75_utfpmc.jpg',
      'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748817862/tshirt-31_pksbeu.jpg'
    ],
    specifications: [
      { label: 'Material', value: 'Premium Cotton Blend' },
      { label: 'Fit', value: 'Modern Fit' },
      { label: 'Care', value: 'Machine wash cold, hang dry' },
      { label: 'Origin', value: 'Designed in Bangladesh' },
      { label: 'Collection', value: 'Signature Series' },
      { label: 'Weight', value: '170 GSM' },
      { label: 'Fabric Type', value: 'Single Jersey' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    metaTitle: 'Signature Collection Tee - Exclusive Design | NEXORA Fashion',
    metaDescription: 'Discover our exclusive signature collection tee with premium cotton blend and distinctive design. A standout piece for those who appreciate unique style.',
    urlSlug: 'signature-collection-tee',
    bulkPricing: [
      { minQuantity: 2, maxQuantity: 4, price: 550 },
      { minQuantity: 5, maxQuantity: 9, price: 500 },
      { minQuantity: 10, maxQuantity: 15, price: 450 }
    ]
  },
  {
    id: 4,
    name: 'Essential Performance Tee',
    sku: 'PERF-004',
    price: 545,
    comparePrice: 645,
    costPrice: 275,
    rating: 4.6,
    category: 'Performance',
    subCategory: 'Active',
    link: '/shop/product/4',
    isNew: false,
    isFeatured: false,
    isBestSeller: false,
    isOnSale: true,
    isActive: true,
    inStock: true,
    stock: 120,
    reservedStock: 15,
    lowStockThreshold: 25,
    reorderPoint: 20,
    hasColorOptions: false,
    image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748817883/tshirt-75_utfpmc.jpg',
    description: 'Designed for active lifestyles, this performance tee wicks moisture and keeps you comfortable during workouts. The lightweight fabric moves with you and dries quickly.',
    longDescription: [
      {
        title: 'Performance Technology',
        content: 'This performance tee is engineered with advanced moisture-wicking technology that pulls sweat away from your body and to the surface of the fabric, where it can evaporate quickly. This keeps you dry and comfortable during intense workouts.'
      },
      {
        title: 'Lightweight & Breathable',
        content: 'The lightweight fabric construction allows for maximum breathability while providing the support you need during physical activities. The fabric moves with your body, ensuring unrestricted movement.'
      },
      {
        title: 'Quick-Dry Technology',
        content: 'Advanced quick-dry technology ensures the fabric dries rapidly, preventing that uncomfortable damp feeling during and after your workout. Perfect for high-intensity training sessions.'
      }
    ],
    careInstructions: [
      'Machine wash cold with like colors',
      'Tumble dry on low heat',
      'Do not bleach',
      'Do not iron on high heat',
      'Avoid fabric softeners'
    ],
    features: [
      'Moisture-wicking technology',
      'Quick-dry fabric',
      'Lightweight construction',
      'Breathable material',
      'Athletic fit design',
      'Anti-odor properties'
    ],
    tags: ['performance', 'active', 'workout', 'moisture-wicking', 'quick-dry'],
    additionalImages: [
      'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748817883/tshirt-75_utfpmc.jpg',
      'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748817862/tshirt-31_pksbeu.jpg',
      'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748817871/tshirt-6_dzfego.jpg'
    ],
    specifications: [
      { label: 'Material', value: '92% Polyester, 8% Elastane' },
      { label: 'Fit', value: 'Athletic Fit' },
      { label: 'Care', value: 'Machine wash cold, tumble dry low' },
      { label: 'Features', value: 'Moisture-wicking, Quick-dry technology' },
      { label: 'Weight', value: '150 GSM' },
      { label: 'Fabric Type', value: 'Performance Jersey' },
      { label: 'Technology', value: 'Moisture-wicking, Quick-dry' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    metaTitle: 'Essential Performance Tee - Active Wear | NEXORA Fashion',
    metaDescription: 'Discover our performance tee with moisture-wicking technology and quick-dry fabric. Perfect for active lifestyles and intense workouts.',
    urlSlug: 'essential-performance-tee',
    bulkPricing: [
      { minQuantity: 5, maxQuantity: 9, price: 500 },
      { minQuantity: 10, maxQuantity: 19, price: 450 },
      { minQuantity: 20, maxQuantity: 49, price: 400 }
    ]
  },
  {
    id: 5,
    name: 'Lightweight Merino Tee',
    sku: 'MERINO-005',
    price: 445,
    comparePrice: 545,
    costPrice: 225,
    rating: 4.9,
    category: 'Premium',
    subCategory: 'Merino',
    link: '/shop/product/5',
    isNew: true,
    isFeatured: true,
    isBestSeller: false,
    isOnSale: false,
    isActive: true,
    inStock: false,
    stock: 0,
    reservedStock: 0,
    lowStockThreshold: 8,
    reorderPoint: 5,
    hasColorOptions: true,
    colorVariants: [
      {
        color: '#283747',
        name: 'Charcoal',
        image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748817862/tshirt-31_pksbeu.jpg'
      },
      {
        color: '#FBFCFC',
        name: 'Light Gray',
        image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748817883/tshirt-78_me3l07.jpg'
      }
    ],
    image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748817863/tshirt-38_jwjr9w.jpg',
    description: 'Luxurious merino wool creates a naturally breathable, temperature-regulating fabric for year-round comfort. This premium tee is perfect for both everyday wear and outdoor activities.',
    longDescription: [
      {
        title: 'Natural Merino Wool',
        content: 'Crafted from 100% merino wool, this tee offers natural temperature regulation that keeps you warm in cold weather and cool in warm weather. The wool fibers are incredibly soft and naturally odor-resistant.'
      },
      {
        title: 'Year-Round Comfort',
        content: 'Merino wool\'s natural properties make this tee perfect for year-round wear. It provides warmth without bulk in winter and breathability in summer, making it an essential piece for any wardrobe.'
      },
      {
        title: 'Sustainable Luxury',
        content: 'Our merino wool is ethically sourced from sustainable farms, ensuring both environmental responsibility and exceptional quality. This premium material represents the perfect balance of luxury and sustainability.'
      }
    ],
    careInstructions: [
      'Hand wash cold with mild detergent',
      'Lay flat to dry',
      'Do not bleach',
      'Do not tumble dry',
      'Store in a cool, dry place',
      'Use wool-specific detergent if needed'
    ],
    features: [
      '100% Merino Wool',
      'Natural temperature regulation',
      'Odor-resistant properties',
      'Breathable fabric',
      'Sustainable material',
      'Year-round comfort'
    ],
    tags: ['merino', 'premium', 'lightweight', 'wool', 'sustainable', 'luxury'],
    additionalImages: [
      'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748817863/tshirt-38_jwjr9w.jpg',
      'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748817862/tshirt-31_pksbeu.jpg',
      'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748817883/tshirt-78_me3l07.jpg'
    ],
    specifications: [
      { label: 'Material', value: '100% Merino Wool' },
      { label: 'Fit', value: 'Regular Fit' },
      { label: 'Care', value: 'Hand wash cold, lay flat to dry' },
      { label: 'Origin', value: 'Ethically sourced wool' },
      { label: 'Weight', value: '160 GSM' },
      { label: 'Fabric Type', value: 'Merino Jersey' },
      { label: 'Sustainability', value: 'Ethically sourced' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    metaTitle: 'Lightweight Merino Tee - Premium Wool | NEXORA Fashion',
    metaDescription: 'Discover our luxurious merino wool tee with natural temperature regulation and sustainable sourcing. Perfect for year-round comfort and style.',
    urlSlug: 'lightweight-merino-tee',
    bulkPricing: [
      { minQuantity: 2, maxQuantity: 3, price: 400 },
      { minQuantity: 4, maxQuantity: 6, price: 375 },
      { minQuantity: 7, maxQuantity: 10, price: 350 }
    ]
  },
  {
    id: 6,
    name: 'Heritage Embroidered Polo',
    sku: 'HERITAGE-006',
    price: 799,
    comparePrice: 899,
    costPrice: 400,
    rating: 4.7,
    category: 'Polo Shirts',
    subCategory: 'Heritage',
    link: '/shop/product/6',
    isNew: true,
    isFeatured: false,
    isBestSeller: false,
    isOnSale: false,
    isActive: true,
    inStock: true,
    stock: 45,
    reservedStock: 3,
    lowStockThreshold: 10,
    reorderPoint: 8,
    hasColorOptions: false,
    image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995415/66cd75ad24196-square_gly7is.png',
    description: 'Our heritage polo features elegant embroidery and classic styling for a sophisticated appearance. Made with premium cotton for exceptional comfort and durability.',
    longDescription: [
      {
        title: 'Heritage Design',
        content: 'This heritage polo represents our commitment to timeless style and quality craftsmanship. The elegant embroidery adds a sophisticated touch that sets it apart from standard polo shirts.'
      },
      {
        title: 'Premium Construction',
        content: 'Crafted from 100% premium cotton, this polo offers exceptional comfort and durability. The fabric is carefully selected and processed to ensure it maintains its quality and appearance over time.'
      },
      {
        title: 'Classic Styling',
        content: 'Features a classic fit with a three-button placket and embroidered logo for a refined, professional appearance. Perfect for both casual and business-casual occasions.'
      }
    ],
    careInstructions: [
      'Machine wash cold with like colors',
      'Tumble dry on low heat',
      'Do not bleach',
      'Iron on medium heat if needed',
      'Professional dry clean if necessary'
    ],
    features: [
      '100% Premium Cotton',
      'Elegant embroidery',
      'Three-button placket',
      'Classic fit design',
      'Durable construction',
      'Professional styling'
    ],
    tags: ['heritage', 'embroidered', 'sophisticated', 'premium', 'classic'],
    additionalImages: [
      'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995415/66cd75ad24196-square_gly7is.png',
      'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995427/image-157_xsbuoe.jpg',
      'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995428/image-5_shfwmg.jpg'
    ],
    specifications: [
      { label: 'Material', value: '100% Premium Cotton' },
      { label: 'Fit', value: 'Classic Fit' },
      { label: 'Care', value: 'Machine wash cold, tumble dry low' },
      { label: 'Features', value: 'Embroidered logo, three-button placket' },
      { label: 'Weight', value: '220 GSM' },
      { label: 'Fabric Type', value: 'Piqué' },
      { label: 'Neck Style', value: 'Polo Collar' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    metaTitle: 'Heritage Embroidered Polo - Classic Style | NEXORA Fashion',
    metaDescription: 'Discover our heritage polo with elegant embroidery and premium cotton construction. Perfect for sophisticated, professional styling.',
    urlSlug: 'heritage-embroidered-polo',
    bulkPricing: [
      { minQuantity: 2, maxQuantity: 4, price: 750 },
      { minQuantity: 5, maxQuantity: 9, price: 700 },
      { minQuantity: 10, maxQuantity: 15, price: 650 }
    ]
  },
  {
    id: 7,
    name: 'Urban Streetwear Hoodie',
    sku: 'HOODIE-007',
    price: 899,
    comparePrice: 999,
    costPrice: 450,
    rating: 4.8,
    category: 'Hoodies',
    subCategory: 'Urban',
    link: '/shop/product/7',
    isNew: false,
    isFeatured: false,
    isBestSeller: true,
    isOnSale: false,
    isActive: true,
    inStock: true,
    stock: 75,
    reservedStock: 12,
    lowStockThreshold: 15,
    reorderPoint: 12,
    hasColorOptions: true,
    colorVariants: [
      {
        color: '#000000',
        name: 'Black',
        image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748817862/tshirt-31_pksbeu.jpg'
      },
      {
        color: '#7B7D7D',
        name: 'Gray',
        image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748817883/tshirt-78_me3l07.jpg'
      }
    ],
    image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748817862/tshirt-31_pksbeu.jpg',
    description: 'Contemporary urban style meets comfort in this versatile hoodie perfect for everyday wear.',
    longDescription: [
      {
        title: 'Urban Streetwear Style',
        content: 'This hoodie embodies contemporary urban streetwear aesthetics with a relaxed fit and modern design elements. Perfect for those who appreciate both style and comfort in their everyday wear.'
      },
      {
        title: 'Comfort & Versatility',
        content: 'Crafted from a premium cotton-polyester blend, this hoodie offers exceptional comfort and warmth. The relaxed fit ensures ease of movement while maintaining a stylish appearance.'
      },
      {
        title: 'Practical Features',
        content: 'Features a kangaroo pocket for convenient storage and an adjustable hood for customizable coverage. The ribbed cuffs and hem provide a secure fit and prevent cold air from entering.'
      }
    ],
    careInstructions: [
      'Machine wash cold with like colors',
      'Tumble dry on low heat',
      'Do not bleach',
      'Iron on low heat if needed',
      'Store in a cool, dry place'
    ],
    features: [
      'Cotton-Polyester Blend',
      'Relaxed fit design',
      'Kangaroo pocket',
      'Adjustable hood',
      'Ribbed cuffs and hem',
      'Urban streetwear style'
    ],
    tags: ['hoodie', 'urban', 'streetwear', 'casual', 'comfortable'],
    additionalImages: [
      'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748817862/tshirt-31_pksbeu.jpg',
      'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748817883/tshirt-78_me3l07.jpg',
      'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748817863/tshirt-38_jwjr9w.jpg'
    ],
    specifications: [
      { label: 'Material', value: '80% Cotton, 20% Polyester' },
      { label: 'Fit', value: 'Relaxed Fit' },
      { label: 'Care', value: 'Machine wash cold, tumble dry low' },
      { label: 'Features', value: 'Kangaroo pocket, adjustable hood' },
      { label: 'Weight', value: '320 GSM' },
      { label: 'Fabric Type', value: 'Fleece' },
      { label: 'Style', value: 'Urban Streetwear' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    metaTitle: 'Urban Streetwear Hoodie - Contemporary Style | NEXORA Fashion',
    metaDescription: 'Discover our urban streetwear hoodie with contemporary design and premium comfort. Perfect for everyday wear with style.',
    urlSlug: 'urban-streetwear-hoodie',
    bulkPricing: [
      { minQuantity: 3, maxQuantity: 5, price: 850 },
      { minQuantity: 6, maxQuantity: 10, price: 800 },
      { minQuantity: 11, maxQuantity: 20, price: 750 }
    ]
  },
  {
    id: 8,
    name: 'Vintage Washed Denim Jacket',
    sku: 'DENIM-008',
    price: 1299,
    comparePrice: 1499,
    costPrice: 650,
    rating: 4.9,
    category: 'Jackets',
    subCategory: 'Denim',
    link: '/shop/product/8',
    isNew: false,
    isFeatured: false,
    isBestSeller: false,
    isOnSale: true,
    isActive: true,
    inStock: true,
    stock: 30,
    reservedStock: 5,
    lowStockThreshold: 8,
    reorderPoint: 6,
    hasColorOptions: false,
    image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995337/blank-tshirt-6_sjbzub.jpg',
    description: 'Classic denim jacket with a vintage wash for an authentic lived-in look and feel.',
    longDescription: [
      {
        title: 'Vintage Aesthetic',
        content: 'This denim jacket features a carefully crafted vintage wash that gives it an authentic, lived-in appearance. The distressed finish and faded areas create a timeless, retro aesthetic that never goes out of style.'
      },
      {
        title: 'Classic Design',
        content: 'Following the iconic denim jacket silhouette, this piece features a button-up front, chest pockets, and adjustable waist tabs. The classic design ensures it pairs perfectly with any casual outfit.'
      },
      {
        title: 'Premium Denim',
        content: 'Crafted from 100% cotton denim, this jacket offers exceptional durability and comfort. The fabric softens with wear while maintaining its structure and vintage appeal.'
      }
    ],
    careInstructions: [
      'Machine wash cold with like colors',
      'Hang dry to maintain shape',
      'Do not bleach',
      'Iron on low heat if needed',
      'Store on a hanger to prevent wrinkles'
    ],
    features: [
      '100% Cotton Denim',
      'Vintage wash finish',
      'Button-up closure',
      'Chest pockets',
      'Adjustable waist tabs',
      'Classic denim jacket design'
    ],
    tags: ['denim', 'jacket', 'vintage', 'classic', 'casual'],
    additionalImages: [
      'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995337/blank-tshirt-6_sjbzub.jpg',
      'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995330/blank-tshirt-19_mhmvoh.jpg',
      'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995325/blank-tshirt-15_sm6qa8.jpg'
    ],
    specifications: [
      { label: 'Material', value: '100% Cotton Denim' },
      { label: 'Fit', value: 'Regular Fit' },
      { label: 'Care', value: 'Machine wash cold, hang dry' },
      { label: 'Features', value: 'Button closure, multiple pockets' },
      { label: 'Wash', value: 'Medium vintage wash' },
      { label: 'Weight', value: '12 oz Denim' },
      { label: 'Style', value: 'Classic Denim Jacket' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    metaTitle: 'Vintage Washed Denim Jacket - Classic Style | NEXORA Fashion',
    metaDescription: 'Discover our vintage washed denim jacket with authentic distressed finish and classic design. Perfect for timeless casual styling.',
    urlSlug: 'vintage-washed-denim-jacket',
    bulkPricing: [
      { minQuantity: 2, maxQuantity: 3, price: 1200 },
      { minQuantity: 4, maxQuantity: 6, price: 1150 },
      { minQuantity: 7, maxQuantity: 10, price: 1100 }
    ]
  },
  {
    id: 9,
    name: 'Casual Linen Shirt',
    sku: 'LINEN-009',
    price: 749,
    comparePrice: 849,
    costPrice: 375,
    rating: 4.6,
    category: 'Shirts',
    subCategory: 'Linen',
    link: '/shop/product/9',
    isNew: true,
    isFeatured: false,
    isBestSeller: false,
    isOnSale: false,
    isActive: true,
    inStock: true,
    stock: 55,
    reservedStock: 7,
    lowStockThreshold: 12,
    reorderPoint: 10,
    hasColorOptions: true,
    colorVariants: [
      {
        color: '#FFFFFF',
        name: 'White',
        image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995325/blank-tshirt-15_sm6qa8.jpg'
      },
      {
        color: '#F4F6F7',
        name: 'Off-white',
        image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995337/blank-tshirt-6_sjbzub.jpg'
      }
    ],
    image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995325/blank-tshirt-15_sm6qa8.jpg',
    description: 'Breathable linen shirt perfect for warm weather and casual occasions.',
    longDescription: [
      {
        title: 'Natural Linen Fabric',
        content: 'Crafted from 100% pure linen, this shirt offers exceptional breathability and natural moisture-wicking properties. Linen is known for its ability to keep you cool and comfortable in warm weather.'
      },
      {
        title: 'Casual Elegance',
        content: 'The relaxed fit and button-down collar create a perfect balance between casual comfort and refined style. This shirt is ideal for warm weather occasions where you want to look polished while staying cool.'
      },
      {
        title: 'Sustainable Choice',
        content: 'Linen is one of the most sustainable natural fibers, requiring minimal water and pesticides to grow. This shirt represents an eco-friendly choice for conscious consumers.'
      }
    ],
    careInstructions: [
      'Machine wash cold with like colors',
      'Hang dry to maintain shape',
      'Do not bleach',
      'Iron on medium heat if needed',
      'Store on a hanger to prevent wrinkles'
    ],
    features: [
      '100% Pure Linen',
      'Breathable fabric',
      'Button-down collar',
      'Chest pocket',
      'Relaxed fit design',
      'Natural moisture-wicking'
    ],
    tags: ['linen', 'shirt', 'breathable', 'casual', 'sustainable'],
    additionalImages: [
      'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995325/blank-tshirt-15_sm6qa8.jpg',
      'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995337/blank-tshirt-6_sjbzub.jpg',
      'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995324/blank-tshirt-14_cfsydj.jpg'
    ],
    specifications: [
      { label: 'Material', value: '100% Pure Linen' },
      { label: 'Fit', value: 'Relaxed Fit' },
      { label: 'Care', value: 'Machine wash cold, hang dry' },
      { label: 'Features', value: 'Button-down collar, chest pocket' },
      { label: 'Weight', value: 'Lightweight' },
      { label: 'Fabric Type', value: 'Linen' },
      { label: 'Sustainability', value: 'Natural fiber' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    metaTitle: 'Casual Linen Shirt - Breathable Comfort | NEXORA Fashion',
    metaDescription: 'Discover our casual linen shirt with natural breathability and sustainable fabric. Perfect for warm weather and casual occasions.',
    urlSlug: 'casual-linen-shirt',
    bulkPricing: [
      { minQuantity: 2, maxQuantity: 4, price: 700 },
      { minQuantity: 5, maxQuantity: 9, price: 650 },
      { minQuantity: 10, maxQuantity: 15, price: 600 }
    ]
  },
  {
    id: 10,
    name: 'Minimalist Leather Wallet',
    price: 349,
    rating: 4.7,
    category: 'Accessories',
    subCategory: 'Wallets',
    link: '/shop/product/10',
    isNew: false,
    inStock: true,
    hasColorOptions: true,
    colorVariants: [
      {
        color: '#000000',
        name: 'Black',
        image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748817862/tshirt-31_pksbeu.jpg'
      },
      {
        color: '#5D4037',
        name: 'Brown',
        image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748817883/tshirt-78_me3l07.jpg'
      }
    ],
    image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748817862/tshirt-31_pksbeu.jpg',
    description: 'Sleek minimalist design crafted from genuine leather for those who appreciate simplicity.',
    tags: ['wallet', 'leather', 'minimalist'],
    additionalImages: [
      'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748817862/tshirt-31_pksbeu.jpg',
      'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748817883/tshirt-78_me3l07.jpg',
      'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748817863/tshirt-38_jwjr9w.jpg'
    ],
    specifications: [
      { label: 'Material', value: 'Genuine Leather' },
      { label: 'Dimensions', value: '9cm x 11cm' },
      { label: 'Card Slots', value: '6 slots' },
      { label: 'Features', value: 'RFID blocking, slim profile' },
      { label: 'Color', value: 'Black/Brown' }
    ],
    sizes: ['One Size']
  },
  {
    id: 11,
    name: 'Classic Cotton Chinos',
    price: 899,
    rating: 4.8,
    category: 'Pants',
    subCategory: 'Chinos',
    link: '/shop/product/11',
    isNew: false,
    inStock: true,
    hasColorOptions: true,
    colorVariants: [
      {
        color: '#F4F6F7',
        name: 'Beige',
        image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995337/blank-tshirt-6_sjbzub.jpg'
      },
      {
        color: '#17202A',
        name: 'Navy',
        image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995330/blank-tshirt-19_mhmvoh.jpg'
      }
    ],
    image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995337/blank-tshirt-6_sjbzub.jpg',
    description: 'Versatile cotton chinos combining comfort and style for both casual and smart-casual occasions.',
    tags: ['chinos', 'cotton', 'pants']
  },
  {
    id: 12,
    name: 'Adjustable Canvas Belt',
    price: 299,
    rating: 4.5,
    category: 'Accessories',
    subCategory: 'Belts',
    link: '/shop/product/12',
    isNew: false,
    inStock: false,
    hasColorOptions: false,
    image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995330/blank-tshirt-19_mhmvoh.jpg',
    description: 'Casual canvas belt with adjustable length and durable metal buckle.',
    tags: ['belt', 'canvas', 'adjustable']
  },
  {
    id: 13,
    name: 'Wool Blend Cardigan',
    price: 1199,
    rating: 4.9,
    category: 'Knitwear',
    subCategory: 'Cardigans',
    link: '/shop/product/13',
    isNew: true,
    inStock: true,
    hasColorOptions: true,
    colorVariants: [
      {
        color: '#34495E',
        name: 'Navy',
        image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995428/image-5_shfwmg.jpg'
      },
      {
        color: '#7B7D7D',
        name: 'Gray',
        image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995421/image-119_cnolq1.jpg'
      }
    ],
    image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995428/image-5_shfwmg.jpg',
    description: 'Warm and stylish wool blend cardigan perfect for layering during colder months.',
    tags: ['cardigan', 'wool', 'knitwear']
  },
  {
    id: 14,
    name: 'Premium Leather Sneakers',
    price: 1499,
    rating: 4.8,
    category: 'Footwear',
    subCategory: 'Sneakers',
    link: '/shop/product/14',
    isNew: false,
    inStock: true,
    hasColorOptions: true,
    colorVariants: [
      {
        color: '#FFFFFF',
        name: 'White',
        image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995325/blank-tshirt-15_sm6qa8.jpg'
      },
      {
        color: '#000000',
        name: 'Black',
        image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995330/blank-tshirt-19_mhmvoh.jpg'
      }
    ],
    image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995325/blank-tshirt-15_sm6qa8.jpg',
    description: 'Handcrafted leather sneakers that combine comfort with sophisticated style.',
    tags: ['sneakers', 'leather', 'footwear']
  },
  {
    id: 15,
    name: 'Quilted Down Jacket',
    price: 1899,
    rating: 4.9,
    category: 'Jackets',
    subCategory: 'Winter',
    link: '/shop/product/15',
    isNew: true,
    inStock: true,
    hasColorOptions: false,
    image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748995330/blank-tshirt-19_mhmvoh.jpg',
    description: 'Lightweight yet warm quilted jacket filled with premium down insulation for winter protection.',
    tags: ['jacket', 'winter', 'quilted']
  },
  {
    id: 16,
    name: 'Graphic Print T-Shirt',
    price: 449,
    rating: 4.7,
    category: 'T-Shirts',
    subCategory: 'Graphic',
    link: '/shop/product/16',
    isNew: false,
    inStock: true,
    hasColorOptions: false,
    image: 'https://res.cloudinary.com/dfijxvhfl/image/upload/v1748817871/tshirt-6_dzfego.jpg',
    description: 'Express your personality with our unique graphic print t-shirt design.',
    tags: ['graphic', 't-shirt', 'print']
  }
];

// Categories and subcategories
export const productCategories = [
  { 
    name: 'T-Shirts', 
    subcategories: ['Essential', 'Graphic', 'Signature']
  },
  { 
    name: 'Polo Shirts', 
    subcategories: ['Slim Fit', 'Heritage']
  },
  { 
    name: 'Shirts', 
    subcategories: ['Linen', 'Casual', 'Formal']
  },
  { 
    name: 'Knitwear', 
    subcategories: ['Cardigans', 'Sweaters']
  },
  { 
    name: 'Hoodies', 
    subcategories: ['Urban', 'Casual']
  },
  { 
    name: 'Jackets', 
    subcategories: ['Denim', 'Winter']
  },
  { 
    name: 'Pants', 
    subcategories: ['Chinos', 'Jeans']
  },
  { 
    name: 'Performance', 
    subcategories: ['Active', 'Sport']
  },
  { 
    name: 'Premium', 
    subcategories: ['Merino', 'Cashmere']
  },
  { 
    name: 'Footwear', 
    subcategories: ['Sneakers', 'Casual']
  },
  { 
    name: 'Accessories', 
    subcategories: ['Wallets', 'Belts', 'Bags']
  }
]; 