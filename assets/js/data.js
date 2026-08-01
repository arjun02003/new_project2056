const HIWIN_DATA = {
    categories: [
        {
            id: 'linear-guideways',
            name: 'Linear Guideways',
            image: 'assets/images/categories/linear-guideways.jpg',
            description: 'High precision linear guide solutions for industrial automation, CNC, and heavy-duty motion systems.'
        },
        {
            id: 'ball-screw',
            name: 'Ball Screw',
            image: 'assets/images/categories/ball-screw.jpg',
            description: 'Reliable ball screw systems for low backlash and accurate positioning in demanding applications.'
        },
        {
            id: 'gear-box',
            name: 'Gear Box',
            image: 'assets/images/categories/gear-box.jpg',
            description: 'Robust gearboxes engineered for efficient torque transmission and industrial reliability.'
        },
        {
            id: 'servo-motor-drive',
            name: 'Servo Motor & Drive',
            image: 'assets/images/categories/servo-motor.jpg',
            description: 'Advanced servo systems for responsive control and high-performance motion automation.'
        },
        {
            id: 'stepper-motor-drive',
            name: 'Stepper Motor & Drive',
            image: 'assets/images/categories/stepper-motor.jpg',
            description: 'Reliable stepper motors for accurate positioning and repeatable motion in automation systems.'
        },
        {
            id: 'integrated-servo',
            name: 'Integrated Servo',
            image: 'assets/images/categories/integrated-servo.jpg',
            description: 'Compact integrated servo units that simplify installation and higher system efficiency.'
        },
        {
            id: 'bearings',
            name: 'Bearings',
            image: 'assets/images/categories/bearings.jpg',
            description: 'Industrial bearings for smooth rotation, long life, and dependable load handling.'
        },
        {
            id: 'hard-chrome-shaft-block',
            name: 'Hard Chrome Shaft & Block',
            image: 'assets/images/categories/hard-chrome-shaft.jpg',
            description: 'Precision hard chrome shafts and blocks for abrasion-resistant motion guidance.'
        }
    ],
    series: [
        // Linear Guideways
        { id: 'hg-series', categoryId: 'linear-guideways', name: 'HG Series', image: 'assets/images/categories/hg-series.jpg', description: 'Heavy-load linear guideways designed for high precision, high rigidity and smooth linear motion.' },
        { id: 'eg-series', categoryId: 'linear-guideways', name: 'EG Series', image: 'assets/images/categories/eg-series.jpg', description: 'Low-profile linear guideways for compact industrial automation applications.' },
        { id: 'guide', categoryId: 'linear-guideways', name: 'Guide', image: 'assets/images/categories/guide-blocks.jpg', description: 'Precision guide blocks compatible with multiple rail series.' },
        
        // Ball Screw
        { id: 'rolled-ball-screw', categoryId: 'ball-screw', name: 'Rolled Ball Screw', image: 'assets/images/categories/ball-screw.jpg', description: 'Cost-effective rolled ball screws for standard applications.' },
        { id: 'precision-ground-ball-screw', categoryId: 'ball-screw', name: 'Precision Ground Ball Screw', image: 'assets/images/categories/ball-screw.jpg', description: 'High-precision ground ball screws for CNC and robotics.' },
        
        // Gear Box
        { id: 'helical-gear-box', categoryId: 'gear-box', name: 'Helical Gear Box', image: 'assets/images/categories/gear-box.jpg', description: 'High-efficiency helical gearboxes.' },
        
        // Servo Motor
        { id: 'servo-motor-drive-cable', categoryId: 'servo-motor-drive', name: 'Servo Motor + Drive + Cable', image: 'assets/images/categories/servo-motor.jpg', description: 'Complete servo kits for automation.' },
        { id: 'pulse-type', categoryId: 'servo-motor-drive', name: 'Pulse Type', image: 'assets/images/categories/servo-motor.jpg', description: 'Pulse control servo drives.' },
        { id: 'ethercat', categoryId: 'servo-motor-drive', name: 'EtherCAT', image: 'assets/images/categories/servo-motor.jpg', description: 'High-speed EtherCAT servo drives.' },

        // Stepper Motor
        { id: '57-115-motor', categoryId: 'stepper-motor-drive', name: '57-115 Motor', image: 'assets/images/categories/stepper-motor.jpg', description: 'Standard NEMA 23/24 stepper motors.' },
        { id: '86-115-motor', categoryId: 'stepper-motor-drive', name: '86-115 Motor', image: 'assets/images/categories/stepper-motor.jpg', description: 'High-torque NEMA 34 stepper motors.' },

        // Integrated Servo
        { id: 'integrated-servo-series', categoryId: 'integrated-servo', name: 'Integrated Servo Systems', image: 'assets/images/categories/integrated-servo.jpg', description: 'Motor and drive combined.' },

        // Bearings
        { id: 'bearings-series', categoryId: 'bearings', name: 'Industrial Bearings', image: 'assets/images/categories/bearings.jpg', description: 'Deep groove and flange bearings.' },

        // Hard Chrome Shaft
        { id: 'hard-chrome-shaft-series', categoryId: 'hard-chrome-shaft-block', name: 'Hard Chrome Shaft & Block', image: 'assets/images/categories/hard-chrome-shaft.jpg', description: 'Linear shafts and slide blocks.' }
    ],
    models: [
        // HG Series Models
        { id: 'hgr20c', seriesId: 'hg-series', name: 'HGR20C', image: 'assets/images/products/hgr20.jpg', description: '20mm Heavy Load Linear Guideway' },
        { id: 'hgr25c', seriesId: 'hg-series', name: 'HGR25C', image: 'assets/images/products/hgr20.jpg', description: '25mm Heavy Load Linear Guideway' },
        { id: 'hgr35c', seriesId: 'hg-series', name: 'HGR35C', image: 'assets/images/products/hgr20.jpg', description: '35mm Heavy Load Linear Guideway' },
        
        // EG Series Models
        { id: 'egr15c', seriesId: 'eg-series', name: 'EGR15C', image: 'assets/images/products/hgr20.jpg', description: '15mm Low Profile Linear Guideway' },
        { id: 'egr20c', seriesId: 'eg-series', name: 'EGR20C', image: 'assets/images/products/hgr20.jpg', description: '20mm Low Profile Linear Guideway' },

        // Guide Models
        { id: 'hgh20c', seriesId: 'guide', name: 'HGH20C', image: 'assets/images/categories/guide-blocks.jpg', description: 'Square Type Guide Block' },
        { id: 'hgh25c', seriesId: 'guide', name: 'HGH25C', image: 'assets/images/categories/guide-blocks.jpg', description: 'Square Type Guide Block' },
        { id: 'hgh35c', seriesId: 'guide', name: 'HGH35C', image: 'assets/images/categories/guide-blocks.jpg', description: 'Square Type Guide Block' },
        { id: 'hgw20c', seriesId: 'guide', name: 'HGW20C', image: 'assets/images/categories/guide-blocks.jpg', description: 'Flange Type Guide Block' },
        { id: 'hgw25c', seriesId: 'guide', name: 'HGW25C', image: 'assets/images/categories/guide-blocks.jpg', description: 'Flange Type Guide Block' },
        { id: 'egh15c', seriesId: 'guide', name: 'EGH15C', image: 'assets/images/categories/guide-blocks.jpg', description: 'Low Profile Guide Block' },
        { id: 'egh20c', seriesId: 'guide', name: 'EGH20C', image: 'assets/images/categories/guide-blocks.jpg', description: 'Low Profile Guide Block' },
        { id: 'egh15ca', seriesId: 'guide', name: 'EGH15CA', image: 'assets/images/categories/guide-blocks.jpg', description: 'Low Profile Guide Block CA' },
        { id: 'egh20ca', seriesId: 'guide', name: 'EGH20CA', image: 'assets/images/categories/guide-blocks.jpg', description: 'Low Profile Guide Block CA' },
        { id: 'qeh20c', seriesId: 'guide', name: 'QEH20C', image: 'assets/images/categories/guide-blocks.jpg', description: 'Quiet Type Guide Block' },


        // Rolled Ball Screw
        { id: '16x5', seriesId: 'rolled-ball-screw', name: '16×5 (16mm)', image: 'assets/images/products/ball-screw-1605.jpg', description: '16mm Diameter, 5mm Lead' },
        { id: '16x10', seriesId: 'rolled-ball-screw', name: '16×10 (16mm)', image: 'assets/images/products/ball-screw-1605.jpg', description: '16mm Diameter, 10mm Lead' },
        { id: '16x20', seriesId: 'rolled-ball-screw', name: '16×20 (16mm)', image: 'assets/images/products/ball-screw-1605.jpg', description: '16mm Diameter, 20mm Lead' },
        { id: '25x5', seriesId: 'rolled-ball-screw', name: '25×5 (25mm)', image: 'assets/images/products/ball-screw-1605.jpg', description: '25mm Diameter, 5mm Lead' },
        { id: '25x10', seriesId: 'rolled-ball-screw', name: '25×10 (25mm)', image: 'assets/images/products/ball-screw-1605.jpg', description: '25mm Diameter, 10mm Lead' },
        { id: '35x5', seriesId: 'rolled-ball-screw', name: '35×5 (35mm)', image: 'assets/images/products/ball-screw-1605.jpg', description: '35mm Diameter, 5mm Lead' },
        { id: '35x10', seriesId: 'rolled-ball-screw', name: '35×10 (35mm)', image: 'assets/images/products/ball-screw-1605.jpg', description: '35mm Diameter, 10mm Lead' },

        // Precision Ground
        { id: 'pg-16x10', seriesId: 'precision-ground-ball-screw', name: '16×10 (16mm)', image: 'assets/images/products/ball-screw-1605.jpg', description: '16mm Diameter, 10mm Lead' },
        { id: 'pg-16x20', seriesId: 'precision-ground-ball-screw', name: '16×20 (16mm)', image: 'assets/images/products/ball-screw-1605.jpg', description: '16mm Diameter, 20mm Lead' },

        // Helical Gear Box
        { id: 'gear-box-1.5kw', seriesId: 'helical-gear-box', name: 'Gear Box 1.5KW (130mm)', image: 'assets/images/products/helical-gear-box.jpg', description: '1.5KW Rating' },
        { id: 'gear-box-400w', seriesId: 'helical-gear-box', name: 'Gear Box 400W', image: 'assets/images/products/helical-gear-box.jpg', description: '400W Rating' },
        { id: 'gear-box-750w', seriesId: 'helical-gear-box', name: 'Gear Box 750W', image: 'assets/images/products/helical-gear-box.jpg', description: '750W Rating' },

        // Servo Motor + Drive + Cable
        { id: 'servo-400w', seriesId: 'servo-motor-drive-cable', name: '400W', image: 'assets/images/products/servo-750w.jpg', description: '400W Output' },
        { id: 'servo-750w', seriesId: 'servo-motor-drive-cable', name: '750W', image: 'assets/images/products/servo-750w.jpg', description: '750W Output' },
        { id: 'servo-1.3kw', seriesId: 'servo-motor-drive-cable', name: '1.3KW', image: 'assets/images/products/servo-750w.jpg', description: '1.3KW Output' },
        { id: 'servo-1.5kw', seriesId: 'servo-motor-drive-cable', name: '1.5KW', image: 'assets/images/products/servo-750w.jpg', description: '1.5KW Output' },
        { id: 'servo-1.8kw', seriesId: 'servo-motor-drive-cable', name: '1.8KW', image: 'assets/images/products/servo-750w.jpg', description: '1.8KW Output' },
        { id: 'servo-2.5kw', seriesId: 'servo-motor-drive-cable', name: '2.5KW', image: 'assets/images/products/servo-750w.jpg', description: '2.5KW Output' },

        // Pulse Type
        { id: 'ys2p', seriesId: 'pulse-type', name: 'YS2P', image: 'assets/images/products/servo-750w.jpg', description: 'YS2P Model' },
        { id: 'ys3p', seriesId: 'pulse-type', name: 'YS3P', image: 'assets/images/products/servo-750w.jpg', description: 'YS3P Model' },
        { id: 'ys7p', seriesId: 'pulse-type', name: 'YS7P', image: 'assets/images/products/servo-750w.jpg', description: 'YS7P Model' },

        // EtherCAT
        { id: 'ys5p', seriesId: 'ethercat', name: 'YS5P', image: 'assets/images/products/servo-750w.jpg', description: 'YS5P Model' },

        // Stepper Motor
        { id: 'ms542-drive', seriesId: '57-115-motor', name: 'MS542 Drive', image: 'assets/images/categories/stepper-motor.jpg', description: 'Drive for 57-115 Motor' },
        { id: '1800-closed-loop', seriesId: '57-115-motor', name: '1800 Closed Loop', image: 'assets/images/categories/stepper-motor.jpg', description: 'Closed Loop System' },
        { id: 'm786-drive', seriesId: '86-115-motor', name: 'M786 Drive', image: 'assets/images/categories/stepper-motor.jpg', description: 'Drive for 86-115 Motor' },

        // Integrated Servo
        { id: 'int-100w', seriesId: 'integrated-servo-series', name: '100W', image: 'assets/images/categories/integrated-servo.jpg', description: '100W Integrated Servo' },
        { id: 'int-400w', seriesId: 'integrated-servo-series', name: '400W', image: 'assets/images/categories/integrated-servo.jpg', description: '400W Integrated Servo' },
        { id: 'int-800w', seriesId: 'integrated-servo-series', name: '800W', image: 'assets/images/categories/integrated-servo.jpg', description: '800W Integrated Servo' },

        // Bearings
        { id: 'bearing-6801', seriesId: 'bearings-series', name: '6801', image: 'assets/images/products/bearing-6801.jpg', description: 'Deep Groove Ball Bearing' },
        { id: 'bearing-f6801', seriesId: 'bearings-series', name: 'F6801', image: 'assets/images/products/bearing-6801.jpg', description: 'Flanged Deep Groove Ball Bearing' },
        { id: 'bearing-6203', seriesId: 'bearings-series', name: '6203', image: 'assets/images/products/bearing-6801.jpg', description: 'Deep Groove Ball Bearing' },

        // Hard Chrome Shaft & Block
        { id: 'shaft-10mm', seriesId: 'hard-chrome-shaft-series', name: '10mm Shaft', image: 'assets/images/categories/hard-chrome-shaft.jpg', description: '10mm Hard Chrome Shaft' },
        { id: 'shaft-12mm', seriesId: 'hard-chrome-shaft-series', name: '12mm Shaft', image: 'assets/images/categories/hard-chrome-shaft.jpg', description: '12mm Hard Chrome Shaft' },
        { id: 'shaft-20mm', seriesId: 'hard-chrome-shaft-series', name: '20mm Shaft', image: 'assets/images/categories/hard-chrome-shaft.jpg', description: '20mm Hard Chrome Shaft' },
        { id: 'block-sc20h', seriesId: 'hard-chrome-shaft-series', name: 'SC20H Block (20mm)', image: 'assets/images/categories/hard-chrome-shaft.jpg', description: 'Linear Slide Block SC20H' },
    ]
};

// Generate default product details for all models to avoid repeating
HIWIN_DATA.products = {};
HIWIN_DATA.models.forEach(model => {
    HIWIN_DATA.products[model.id] = {
        name: model.name + ' Product Details',
        image: model.image,
        gallery: [model.image, model.image, model.image],
        description: 'Premium industrial automation component engineered for high precision, durability, and smooth motion. Suitable for demanding industrial applications requiring reliability and long service life.',
        features: [
            'High rigidity and load capacity',
            'Smooth and precise motion',
            'Easy installation and maintenance',
            'Interchangeable specifications'
        ],
        specifications: {
            'Material': 'High Carbon Steel',
            'Accuracy Grade': 'High (H)',
            'Preload': 'ZA',
            'Operating Temp': '-10°C to +80°C'
        },
        applications: [
            'CNC Machining Centers',
            'Industrial Robotics',
            'Packaging Machinery',
            'Automated Production Lines'
        ],
        related: [] // We'll populate this dynamically in the UI
    };
});
