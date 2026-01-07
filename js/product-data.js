/**
 * Shared Product Data
 * Central data store for all products, used by both products.html and products-listing.html
 */

const PRODUCT_DATA = [
    // ========================================
    // Pharmaceutical Products
    // ========================================
    // Antibiotics
    {
        id: 1,
        category: "Pharmaceutical Products",
        categorySlug: "pharmaceutical-products",
        subcategory: "Antibiotics",
        subcategorySlug: "antibiotics",
        title: "Amoxicillin 500mg",
        desc: "Broad-spectrum antibiotic for bacterial infections.",
        packaging: "Blister Pack",
        unit: "pack"
    },
    {
        id: 2,
        category: "Pharmaceutical Products",
        categorySlug: "pharmaceutical-products",
        subcategory: "Antibiotics",
        subcategorySlug: "antibiotics",
        title: "Azithromycin 250mg",
        desc: "Macrolide antibiotic for respiratory infections.",
        packaging: "Blister Pack",
        unit: "pack"
    },
    {
        id: 3,
        category: "Pharmaceutical Products",
        categorySlug: "pharmaceutical-products",
        subcategory: "Antibiotics",
        subcategorySlug: "antibiotics",
        title: "Ciprofloxacin 500mg",
        desc: "Fluoroquinolone antibiotic for urinary tract infections.",
        packaging: "Strip",
        unit: "strip"
    },
    // Cardiovascular
    {
        id: 4,
        category: "Pharmaceutical Products",
        categorySlug: "pharmaceutical-products",
        subcategory: "Cardiovascular",
        subcategorySlug: "cardiovascular",
        title: "Atorvastatin 20mg",
        desc: "Statin medication for lowering cholesterol.",
        packaging: "Blister Pack",
        unit: "pack"
    },
    {
        id: 5,
        category: "Pharmaceutical Products",
        categorySlug: "pharmaceutical-products",
        subcategory: "Cardiovascular",
        subcategorySlug: "cardiovascular",
        title: "Amlodipine 5mg",
        desc: "Calcium channel blocker for hypertension.",
        packaging: "Strip",
        unit: "strip"
    },
    {
        id: 6,
        category: "Pharmaceutical Products",
        categorySlug: "pharmaceutical-products",
        subcategory: "Cardiovascular",
        subcategorySlug: "cardiovascular",
        title: "Lisinopril 10mg",
        desc: "ACE inhibitor for blood pressure control.",
        packaging: "Blister Pack",
        unit: "pack"
    },
    // CNS
    {
        id: 7,
        category: "Pharmaceutical Products",
        categorySlug: "pharmaceutical-products",
        subcategory: "CNS",
        subcategorySlug: "cns",
        title: "Alprazolam 0.5mg",
        desc: "Benzodiazepine for anxiety disorders.",
        packaging: "Strip",
        unit: "strip"
    },
    {
        id: 8,
        category: "Pharmaceutical Products",
        categorySlug: "pharmaceutical-products",
        subcategory: "CNS",
        subcategorySlug: "cns",
        title: "Sertraline 50mg",
        desc: "SSRI antidepressant medication.",
        packaging: "Blister Pack",
        unit: "pack"
    },
    // Anti-diabetic
    {
        id: 9,
        category: "Pharmaceutical Products",
        categorySlug: "pharmaceutical-products",
        subcategory: "Anti-diabetic",
        subcategorySlug: "anti-diabetic",
        title: "Metformin 850mg",
        desc: "Oral diabetes medicine to control blood sugar levels.",
        packaging: "Strip",
        unit: "strip"
    },
    {
        id: 10,
        category: "Pharmaceutical Products",
        categorySlug: "pharmaceutical-products",
        subcategory: "Anti-diabetic",
        subcategorySlug: "anti-diabetic",
        title: "Glimepiride 2mg",
        desc: "Sulfonylurea for type 2 diabetes management.",
        packaging: "Blister Pack",
        unit: "pack"
    },
    {
        id: 11,
        category: "Pharmaceutical Products",
        categorySlug: "pharmaceutical-products",
        subcategory: "Anti-diabetic",
        subcategorySlug: "anti-diabetic",
        title: "Sitagliptin 100mg",
        desc: "DPP-4 inhibitor for blood glucose control.",
        packaging: "Strip",
        unit: "strip"
    },
    // Analgesics
    {
        id: 12,
        category: "Pharmaceutical Products",
        categorySlug: "pharmaceutical-products",
        subcategory: "Analgesics",
        subcategorySlug: "analgesics",
        title: "Paracetamol 500mg",
        desc: "Pain reliever and fever reducer.",
        packaging: "Strip",
        unit: "strip"
    },
    {
        id: 13,
        category: "Pharmaceutical Products",
        categorySlug: "pharmaceutical-products",
        subcategory: "Analgesics",
        subcategorySlug: "analgesics",
        title: "Ibuprofen 400mg",
        desc: "NSAID for pain and inflammation.",
        packaging: "Blister Pack",
        unit: "pack"
    },
    {
        id: 14,
        category: "Pharmaceutical Products",
        categorySlug: "pharmaceutical-products",
        subcategory: "Analgesics",
        subcategorySlug: "analgesics",
        title: "Diclofenac 50mg",
        desc: "Anti-inflammatory for muscle and joint pain.",
        packaging: "Strip",
        unit: "strip"
    },

    // ========================================
    // Bandages and Surgical Dressings
    // ========================================
    // Gauze
    {
        id: 15,
        category: "Bandages and Surgical Dressings",
        categorySlug: "bandages-surgical",
        subcategory: "Gauze",
        subcategorySlug: "gauze",
        title: "Sterile Gauze Pads 4x4",
        desc: "Absorbent cotton gauze for wound dressing.",
        packaging: "Pack (100 units)",
        unit: "pack"
    },
    {
        id: 16,
        category: "Bandages and Surgical Dressings",
        categorySlug: "bandages-surgical",
        subcategory: "Gauze",
        subcategorySlug: "gauze",
        title: "Non-Woven Gauze Swabs",
        desc: "Soft, lint-free gauze for sensitive skin.",
        packaging: "Pack (200 units)",
        unit: "pack"
    },
    // Crepe
    {
        id: 17,
        category: "Bandages and Surgical Dressings",
        categorySlug: "bandages-surgical",
        subcategory: "Crepe",
        subcategorySlug: "crepe",
        title: "Crepe Bandage 4 inch",
        desc: "Elastic crepe bandage for compression and support.",
        packaging: "Roll",
        unit: "roll"
    },
    {
        id: 18,
        category: "Bandages and Surgical Dressings",
        categorySlug: "bandages-surgical",
        subcategory: "Crepe",
        subcategorySlug: "crepe",
        title: "Crepe Bandage 6 inch",
        desc: "Wide crepe bandage for joint support.",
        packaging: "Roll",
        unit: "roll"
    },
    // Elastic
    {
        id: 19,
        category: "Bandages and Surgical Dressings",
        categorySlug: "bandages-surgical",
        subcategory: "Elastic",
        subcategorySlug: "elastic",
        title: "Elastic Bandage Roll",
        desc: "Compression bandage for sprains and strains.",
        packaging: "Roll",
        unit: "roll"
    },
    {
        id: 20,
        category: "Bandages and Surgical Dressings",
        categorySlug: "bandages-surgical",
        subcategory: "Elastic",
        subcategorySlug: "elastic",
        title: "Cohesive Elastic Bandage",
        desc: "Self-adhering elastic bandage.",
        packaging: "Roll",
        unit: "roll"
    },
    // Compress
    {
        id: 21,
        category: "Bandages and Surgical Dressings",
        categorySlug: "bandages-surgical",
        subcategory: "Compress",
        subcategorySlug: "compress",
        title: "Compression Bandage Set",
        desc: "Multi-layer compression system.",
        packaging: "Kit",
        unit: "kit"
    },
    // Cotton
    {
        id: 22,
        category: "Bandages and Surgical Dressings",
        categorySlug: "bandages-surgical",
        subcategory: "Cotton",
        subcategorySlug: "cotton",
        title: "Absorbent Cotton Roll",
        desc: "Pure cotton for medical applications.",
        packaging: "Roll (500g)",
        unit: "roll"
    },
    {
        id: 23,
        category: "Bandages and Surgical Dressings",
        categorySlug: "bandages-surgical",
        subcategory: "Cotton",
        subcategorySlug: "cotton",
        title: "Cotton Balls",
        desc: "Sterilized cotton balls for wound care.",
        packaging: "Pack (100 units)",
        unit: "pack"
    },

    // ========================================
    // Dental Equipment
    // ========================================
    // Machines
    {
        id: 24,
        category: "Dental Equipment",
        categorySlug: "dental-equipment",
        subcategory: "Machines",
        subcategorySlug: "machines",
        title: "Dental Chair Unit",
        desc: "Complete dental treatment unit with chair.",
        packaging: "Unit",
        unit: "unit"
    },
    {
        id: 25,
        category: "Dental Equipment",
        categorySlug: "dental-equipment",
        subcategory: "Machines",
        subcategorySlug: "machines",
        title: "Dental X-Ray Machine",
        desc: "Digital dental radiography system.",
        packaging: "Unit",
        unit: "unit"
    },
    // Hand Pieces
    {
        id: 26,
        category: "Dental Equipment",
        categorySlug: "dental-equipment",
        subcategory: "Hand Pieces",
        subcategorySlug: "hand-pieces",
        title: "High-Speed Handpiece",
        desc: "Air-driven dental handpiece for drilling.",
        packaging: "Unit",
        unit: "unit"
    },
    {
        id: 27,
        category: "Dental Equipment",
        categorySlug: "dental-equipment",
        subcategory: "Hand Pieces",
        subcategorySlug: "hand-pieces",
        title: "Low-Speed Handpiece",
        desc: "Electric handpiece for polishing and finishing.",
        packaging: "Unit",
        unit: "unit"
    },
    // Filling Materials
    {
        id: 28,
        category: "Dental Equipment",
        categorySlug: "dental-equipment",
        subcategory: "Filling Materials",
        subcategorySlug: "filling-materials",
        title: "Composite Resin Kit",
        desc: "Tooth-colored filling material set.",
        packaging: "Kit",
        unit: "kit"
    },
    {
        id: 29,
        category: "Dental Equipment",
        categorySlug: "dental-equipment",
        subcategory: "Filling Materials",
        subcategorySlug: "filling-materials",
        title: "Glass Ionomer Cement",
        desc: "Dental cement for restorations.",
        packaging: "Pack",
        unit: "pack"
    },
    // Polishing Items
    {
        id: 30,
        category: "Dental Equipment",
        categorySlug: "dental-equipment",
        subcategory: "Polishing Items",
        subcategorySlug: "polishing-items",
        title: "Dental Polishing Paste",
        desc: "Professional tooth polishing compound.",
        packaging: "Jar",
        unit: "jar"
    },

    // ========================================
    // Hospital Equipment
    // ========================================
    // Diagnostic
    {
        id: 31,
        category: "Hospital Equipment",
        categorySlug: "hospital-equipment",
        subcategory: "Diagnostic",
        subcategorySlug: "diagnostic",
        title: "Digital X-Ray Machine",
        desc: "High-resolution digital X-ray system with advanced imaging.",
        packaging: "Unit",
        unit: "unit"
    },
    {
        id: 32,
        category: "Hospital Equipment",
        categorySlug: "hospital-equipment",
        subcategory: "Diagnostic",
        subcategorySlug: "diagnostic",
        title: "Ultrasound Scanner",
        desc: "Portable ultrasound scanner with multiple probe options.",
        packaging: "Unit",
        unit: "unit"
    },
    {
        id: 33,
        category: "Hospital Equipment",
        categorySlug: "hospital-equipment",
        subcategory: "Diagnostic",
        subcategorySlug: "diagnostic",
        title: "ECG Machine",
        desc: "12-lead electrocardiograph for cardiac monitoring.",
        packaging: "Unit",
        unit: "unit"
    },
    // Surgical
    {
        id: 34,
        category: "Hospital Equipment",
        categorySlug: "hospital-equipment",
        subcategory: "Surgical",
        subcategorySlug: "surgical",
        title: "Operating Table",
        desc: "Hydraulic surgical operating table.",
        packaging: "Unit",
        unit: "unit"
    },
    {
        id: 35,
        category: "Hospital Equipment",
        categorySlug: "hospital-equipment",
        subcategory: "Surgical",
        subcategorySlug: "surgical",
        title: "Surgical Light",
        desc: "LED shadowless surgical lamp.",
        packaging: "Unit",
        unit: "unit"
    },
    // Patient Care
    {
        id: 36,
        category: "Hospital Equipment",
        categorySlug: "hospital-equipment",
        subcategory: "Patient Care",
        subcategorySlug: "patient-care",
        title: "Hospital Bed - Electric",
        desc: "Fully electric hospital bed with adjustable positioning.",
        packaging: "Unit",
        unit: "unit"
    },
    {
        id: 37,
        category: "Hospital Equipment",
        categorySlug: "hospital-equipment",
        subcategory: "Patient Care",
        subcategorySlug: "patient-care",
        title: "Patient Wheelchair",
        desc: "Foldable wheelchair for patient mobility.",
        packaging: "Unit",
        unit: "unit"
    },
    {
        id: 38,
        category: "Hospital Equipment",
        categorySlug: "hospital-equipment",
        subcategory: "Patient Care",
        subcategorySlug: "patient-care",
        title: "IV Stand - Stainless Steel",
        desc: "Adjustable height IV pole with wheels.",
        packaging: "Unit",
        unit: "unit"
    },
    // Laboratory
    {
        id: 39,
        category: "Hospital Equipment",
        categorySlug: "hospital-equipment",
        subcategory: "Laboratory",
        subcategorySlug: "laboratory",
        title: "Centrifuge Machine",
        desc: "High-speed laboratory centrifuge.",
        packaging: "Unit",
        unit: "unit"
    },
    {
        id: 40,
        category: "Hospital Equipment",
        categorySlug: "hospital-equipment",
        subcategory: "Laboratory",
        subcategorySlug: "laboratory",
        title: "Laboratory Microscope",
        desc: "Binocular microscope for clinical analysis.",
        packaging: "Unit",
        unit: "unit"
    },

    // ========================================
    // Medical Disposables
    // ========================================
    // Syringes
    {
        id: 41,
        category: "Medical Disposables",
        categorySlug: "medical-disposables",
        subcategory: "Syringes",
        subcategorySlug: "syringes",
        title: "Disposable Syringes 5ml",
        desc: "Single-use syringes with needles for injections.",
        packaging: "Box (100 units)",
        unit: "box"
    },
    {
        id: 42,
        category: "Medical Disposables",
        categorySlug: "medical-disposables",
        subcategory: "Syringes",
        subcategorySlug: "syringes",
        title: "Disposable Syringes 10ml",
        desc: "Larger capacity syringes for medical procedures.",
        packaging: "Box (100 units)",
        unit: "box"
    },
    {
        id: 43,
        category: "Medical Disposables",
        categorySlug: "medical-disposables",
        subcategory: "Syringes",
        subcategorySlug: "syringes",
        title: "Insulin Syringes 1ml",
        desc: "Fine needle syringes for insulin administration.",
        packaging: "Box (100 units)",
        unit: "box"
    },
    // Gloves
    {
        id: 44,
        category: "Medical Disposables",
        categorySlug: "medical-disposables",
        subcategory: "Gloves",
        subcategorySlug: "gloves",
        title: "Surgical Gloves - Latex",
        desc: "Sterile latex surgical gloves for medical procedures.",
        packaging: "Box (50 pairs)",
        unit: "box"
    },
    {
        id: 45,
        category: "Medical Disposables",
        categorySlug: "medical-disposables",
        subcategory: "Gloves",
        subcategorySlug: "gloves",
        title: "Nitrile Examination Gloves",
        desc: "Powder-free nitrile gloves for examinations.",
        packaging: "Box (100 units)",
        unit: "box"
    },
    {
        id: 46,
        category: "Medical Disposables",
        categorySlug: "medical-disposables",
        subcategory: "Gloves",
        subcategorySlug: "gloves",
        title: "Vinyl Gloves",
        desc: "Economical vinyl gloves for general use.",
        packaging: "Box (100 units)",
        unit: "box"
    },
    // Catheters
    {
        id: 47,
        category: "Medical Disposables",
        categorySlug: "medical-disposables",
        subcategory: "Catheters",
        subcategorySlug: "catheters",
        title: "Foley Catheter",
        desc: "Silicone urinary catheter with balloon.",
        packaging: "Unit",
        unit: "unit"
    },
    {
        id: 48,
        category: "Medical Disposables",
        categorySlug: "medical-disposables",
        subcategory: "Catheters",
        subcategorySlug: "catheters",
        title: "IV Catheter",
        desc: "Peripheral intravenous catheter.",
        packaging: "Box (50 units)",
        unit: "box"
    },
    // IV Sets
    {
        id: 49,
        category: "Medical Disposables",
        categorySlug: "medical-disposables",
        subcategory: "IV Sets",
        subcategorySlug: "iv-sets",
        title: "IV Infusion Set",
        desc: "Complete IV administration set with drip chamber.",
        packaging: "Unit",
        unit: "unit"
    },
    {
        id: 50,
        category: "Medical Disposables",
        categorySlug: "medical-disposables",
        subcategory: "IV Sets",
        subcategorySlug: "iv-sets",
        title: "Blood Transfusion Set",
        desc: "Specialized set for blood transfusions.",
        packaging: "Unit",
        unit: "unit"
    },
    {
        id: 51,
        category: "Medical Disposables",
        categorySlug: "medical-disposables",
        subcategory: "IV Sets",
        subcategorySlug: "iv-sets",
        title: "Face Masks N95",
        desc: "High-filtration respiratory protection masks.",
        packaging: "Box (20 units)",
        unit: "box"
    },

    // ========================================
    // Veterinary Products
    // ========================================
    // Injection
    {
        id: 52,
        category: "Veterinary Products",
        categorySlug: "veterinary-products",
        subcategory: "Injection",
        subcategorySlug: "injection",
        title: "Ivermectin+Clorsulon Injection 1%+10% 10ml",
        desc: "Antiparasitic injection for livestock treatment.",
        packaging: "Vial (10ml)",
        unit: "vial"
    },
    {
        id: 53,
        category: "Veterinary Products",
        categorySlug: "veterinary-products",
        subcategory: "Injection",
        subcategorySlug: "injection",
        title: "Ivermectin+Clorsulon Injection 1%+10% 50ml",
        desc: "Antiparasitic injection for livestock treatment.",
        packaging: "Vial (50ml)",
        unit: "vial"
    },
    {
        id: 54,
        category: "Veterinary Products",
        categorySlug: "veterinary-products",
        subcategory: "Injection",
        subcategorySlug: "injection",
        title: "Ivermectin+Clorsulon Injection 1%+10% 100ml",
        desc: "Antiparasitic injection for livestock treatment.",
        packaging: "Vial (100ml)",
        unit: "vial"
    },
    {
        id: 55,
        category: "Veterinary Products",
        categorySlug: "veterinary-products",
        subcategory: "Injection",
        subcategorySlug: "injection",
        title: "Nitroxynil Injection 25% 250ml",
        desc: "Anthelmintic injection for cattle and sheep.",
        packaging: "Vial (250ml)",
        unit: "vial"
    },
    {
        id: 56,
        category: "Veterinary Products",
        categorySlug: "veterinary-products",
        subcategory: "Injection",
        subcategorySlug: "injection",
        title: "Oxytetracycline Injection 5% 50ml",
        desc: "Broad-spectrum antibiotic for veterinary use.",
        packaging: "Vial (50ml)",
        unit: "vial"
    },
    {
        id: 57,
        category: "Veterinary Products",
        categorySlug: "veterinary-products",
        subcategory: "Injection",
        subcategorySlug: "injection",
        title: "Oxytetracycline Injection 5% 100ml",
        desc: "Broad-spectrum antibiotic for veterinary use.",
        packaging: "Vial (100ml)",
        unit: "vial"
    },
    {
        id: 58,
        category: "Veterinary Products",
        categorySlug: "veterinary-products",
        subcategory: "Injection",
        subcategorySlug: "injection",
        title: "Oxytetracycline Injection 20% 50ml",
        desc: "High-concentration antibiotic for veterinary use.",
        packaging: "Vial (50ml)",
        unit: "vial"
    },
    {
        id: 59,
        category: "Veterinary Products",
        categorySlug: "veterinary-products",
        subcategory: "Injection",
        subcategorySlug: "injection",
        title: "Oxytetracycline Injection 20% 100ml",
        desc: "High-concentration antibiotic for veterinary use.",
        packaging: "Vial (100ml)",
        unit: "vial"
    },
    {
        id: 60,
        category: "Veterinary Products",
        categorySlug: "veterinary-products",
        subcategory: "Injection",
        subcategorySlug: "injection",
        title: "Tylosine Injection 10% 100ml",
        desc: "Macrolide antibiotic for livestock infections.",
        packaging: "Vial (100ml)",
        unit: "vial"
    },
    {
        id: 61,
        category: "Veterinary Products",
        categorySlug: "veterinary-products",
        subcategory: "Injection",
        subcategorySlug: "injection",
        title: "Gentamycin Injection 4% 100ml",
        desc: "Aminoglycoside antibiotic for veterinary use.",
        packaging: "Vial (100ml)",
        unit: "vial"
    },
    {
        id: 62,
        category: "Veterinary Products",
        categorySlug: "veterinary-products",
        subcategory: "Injection",
        subcategorySlug: "injection",
        title: "Gentamycin Injection 8% 100ml",
        desc: "High-concentration aminoglycoside antibiotic.",
        packaging: "Vial (100ml)",
        unit: "vial"
    },
    {
        id: 63,
        category: "Veterinary Products",
        categorySlug: "veterinary-products",
        subcategory: "Injection",
        subcategorySlug: "injection",
        title: "Meloxicam+Paracetamol Injection 0.5%+15% 100ml",
        desc: "Anti-inflammatory and analgesic for animals.",
        packaging: "Vial (100ml)",
        unit: "vial"
    },
    {
        id: 64,
        category: "Veterinary Products",
        categorySlug: "veterinary-products",
        subcategory: "Injection",
        subcategorySlug: "injection",
        title: "Analgin Injection 50% 100ml",
        desc: "Analgesic and antipyretic for veterinary use.",
        packaging: "Vial (100ml)",
        unit: "vial"
    },
    {
        id: 65,
        category: "Veterinary Products",
        categorySlug: "veterinary-products",
        subcategory: "Injection",
        subcategorySlug: "injection",
        title: "Sulfadimidine Sodium Injection 33.3% 100ml",
        desc: "Sulfonamide antibiotic for livestock.",
        packaging: "Vial (100ml)",
        unit: "vial"
    },
    {
        id: 66,
        category: "Veterinary Products",
        categorySlug: "veterinary-products",
        subcategory: "Injection",
        subcategorySlug: "injection",
        title: "Diminazene Acceturate+Phenazone Injection 7%+37.5% 50ml",
        desc: "Antiprotozoal for treatment of trypanosomosis.",
        packaging: "Vial (50ml)",
        unit: "vial"
    },
    {
        id: 67,
        category: "Veterinary Products",
        categorySlug: "veterinary-products",
        subcategory: "Injection",
        subcategorySlug: "injection",
        title: "Diminazene Acceturate+Phenazone Injection 7%+37.5% 100ml",
        desc: "Antiprotozoal for treatment of trypanosomosis.",
        packaging: "Vial (100ml)",
        unit: "vial"
    },
    {
        id: 68,
        category: "Veterinary Products",
        categorySlug: "veterinary-products",
        subcategory: "Injection",
        subcategorySlug: "injection",
        title: "Fortified Procaine Penicillin Injection 4,000,000 IU",
        desc: "Penicillin antibiotic for bacterial infections.",
        packaging: "Vial",
        unit: "vial"
    },
    {
        id: 69,
        category: "Veterinary Products",
        categorySlug: "veterinary-products",
        subcategory: "Injection",
        subcategorySlug: "injection",
        title: "Fortified Procaine Penicillin Injection (Oily) 34,000,000 IU",
        desc: "Long-acting oily penicillin antibiotic.",
        packaging: "Vial",
        unit: "vial"
    },
    {
        id: 70,
        category: "Veterinary Products",
        categorySlug: "veterinary-products",
        subcategory: "Injection",
        subcategorySlug: "injection",
        title: "Benzathine Penicillin Injection 4,800,000 IU",
        desc: "Long-acting penicillin antibiotic dry powder.",
        packaging: "Vial",
        unit: "vial"
    },
    // Tablet
    {
        id: 71,
        category: "Veterinary Products",
        categorySlug: "veterinary-products",
        subcategory: "Tablet",
        subcategorySlug: "tablet",
        title: "Praziquantel 50mg + Pyrantel Pamoate 144mg + Fenbendazole 150mg Tablets",
        desc: "Broad-spectrum dewormer for pets.",
        packaging: "Box (4 bolus/blister)",
        unit: "box"
    },
    {
        id: 72,
        category: "Veterinary Products",
        categorySlug: "veterinary-products",
        subcategory: "Tablet",
        subcategorySlug: "tablet",
        title: "Levamisole Hydrochloride Bolus 150mg",
        desc: "Anthelmintic bolus for livestock deworming.",
        packaging: "Bolus (2.5g)",
        unit: "bolus"
    },
    {
        id: 73,
        category: "Veterinary Products",
        categorySlug: "veterinary-products",
        subcategory: "Tablet",
        subcategorySlug: "tablet",
        title: "Levamisole Hydrochloride Bolus 300mg",
        desc: "Anthelmintic bolus for livestock deworming.",
        packaging: "Bolus (2.5g)",
        unit: "bolus"
    },
    {
        id: 74,
        category: "Veterinary Products",
        categorySlug: "veterinary-products",
        subcategory: "Tablet",
        subcategorySlug: "tablet",
        title: "Levamisole Hydrochloride Bolus 600mg",
        desc: "Anthelmintic bolus for livestock deworming.",
        packaging: "Bolus (2.5g)",
        unit: "bolus"
    },
    // Suspension
    {
        id: 75,
        category: "Veterinary Products",
        categorySlug: "veterinary-products",
        subcategory: "Suspension",
        subcategorySlug: "suspension",
        title: "Cypermethrin 10% EC 100ml",
        desc: "Insecticide for external parasite control.",
        packaging: "Bottle (100ml)",
        unit: "piece"
    },
    {
        id: 76,
        category: "Veterinary Products",
        categorySlug: "veterinary-products",
        subcategory: "Suspension",
        subcategorySlug: "suspension",
        title: "Cypermethrin 10% EC 250ml",
        desc: "Insecticide for external parasite control.",
        packaging: "Bottle (250ml)",
        unit: "piece"
    },

    // ========================================
    // Surgical Products
    // ========================================
    // Blades
    {
        id: 77,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Blades",
        subcategorySlug: "blades",
        title: "Blade Handle No. 3",
        desc: "Stainless steel surgical blade handle for scalpels.",
        packaging: "Unit",
        unit: "unit"
    },
    {
        id: 78,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Blades",
        subcategorySlug: "blades",
        title: "Blade Handle No. 4",
        desc: "Stainless steel surgical blade handle for larger blades.",
        packaging: "Unit",
        unit: "unit"
    },
    {
        id: 79,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Blades",
        subcategorySlug: "blades",
        title: "Blade Handle No. 7",
        desc: "Fine surgical blade handle for precision cuts.",
        packaging: "Unit",
        unit: "unit"
    },
    {
        id: 80,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Blades",
        subcategorySlug: "blades",
        title: "Surgical Blades No. 10-15 (Sterile/Non-Sterile)",
        desc: "Surgical blades sizes 10-15, available in sterile and non-sterile variants.",
        packaging: "Box (100 units)",
        unit: "box"
    },
    {
        id: 81,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Blades",
        subcategorySlug: "blades",
        title: "Surgical Blades No. 20-25 (Sterile/Non-Sterile)",
        desc: "Surgical blades sizes 20-25, available in sterile and non-sterile variants.",
        packaging: "Box (100 units)",
        unit: "box"
    },
    // Cannula
    {
        id: 82,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Cannula",
        subcategorySlug: "cannula",
        title: "Cannula with IV Sets",
        desc: "Complete cannula set with attached IV administration set.",
        packaging: "Unit",
        unit: "unit"
    },
    {
        id: 83,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Cannula",
        subcategorySlug: "cannula",
        title: "Cannula without IV Sets",
        desc: "Standalone cannula without IV set attachment.",
        packaging: "Unit",
        unit: "unit"
    },
    {
        id: 84,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Cannula",
        subcategorySlug: "cannula",
        title: "I.V. Cannula (All Colours)",
        desc: "Intravenous cannula available in all gauge colors.",
        packaging: "Box (100 units)",
        unit: "box"
    },
    {
        id: 85,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Cannula",
        subcategorySlug: "cannula",
        title: "I.V. Cannula with Injection Port & Wings",
        desc: "IV cannula with injection port and wings for secure placement.",
        packaging: "Box (100 units)",
        unit: "box"
    },
    {
        id: 86,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Cannula",
        subcategorySlug: "cannula",
        title: "I.V. Cannula with Injection Port Only",
        desc: "IV cannula with injection port for medication delivery.",
        packaging: "Box (100 units)",
        unit: "box"
    },
    {
        id: 87,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Cannula",
        subcategorySlug: "cannula",
        title: "Safety I.V. Cannula (All Colours)",
        desc: "Safety IV cannula with needle protection mechanism.",
        packaging: "Box (100 units)",
        unit: "box"
    },
    {
        id: 88,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Cannula",
        subcategorySlug: "cannula",
        title: "Pen Like I.V. Cannula (All Colours)",
        desc: "Pen-style IV cannula for easy insertion.",
        packaging: "Box (100 units)",
        unit: "box"
    },
    // Catheters
    {
        id: 89,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Catheters",
        subcategorySlug: "catheters",
        title: "2 Way Siliconized Latex Foley Catheter FR 12",
        desc: "Two-way siliconized latex Foley catheter, French size 12.",
        packaging: "Unit",
        unit: "unit"
    },
    {
        id: 90,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Catheters",
        subcategorySlug: "catheters",
        title: "2 Way Siliconized Latex Foley Catheter FR 14",
        desc: "Two-way siliconized latex Foley catheter, French size 14.",
        packaging: "Unit",
        unit: "unit"
    },
    {
        id: 91,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Catheters",
        subcategorySlug: "catheters",
        title: "2 Way Siliconized Latex Foley Catheter FR 16",
        desc: "Two-way siliconized latex Foley catheter, French size 16.",
        packaging: "Unit",
        unit: "unit"
    },
    {
        id: 92,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Catheters",
        subcategorySlug: "catheters",
        title: "2 Way Siliconized Latex Foley Catheter FR 18",
        desc: "Two-way siliconized latex Foley catheter, French size 18.",
        packaging: "Unit",
        unit: "unit"
    },
    {
        id: 93,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Catheters",
        subcategorySlug: "catheters",
        title: "2 Way Siliconized Latex Foley Catheter FR 20",
        desc: "Two-way siliconized latex Foley catheter, French size 20.",
        packaging: "Unit",
        unit: "unit"
    },
    {
        id: 94,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Catheters",
        subcategorySlug: "catheters",
        title: "2 Way Siliconized Latex Foley Catheter FR 22",
        desc: "Two-way siliconized latex Foley catheter, French size 22.",
        packaging: "Unit",
        unit: "unit"
    },
    {
        id: 95,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Catheters",
        subcategorySlug: "catheters",
        title: "2 Way Siliconized Latex Foley Catheter FR 24",
        desc: "Two-way siliconized latex Foley catheter, French size 24.",
        packaging: "Unit",
        unit: "unit"
    },
    {
        id: 96,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Catheters",
        subcategorySlug: "catheters",
        title: "3 Way Catheter FR 18",
        desc: "Three-way catheter for continuous irrigation, French size 18.",
        packaging: "Unit",
        unit: "unit"
    },
    {
        id: 97,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Catheters",
        subcategorySlug: "catheters",
        title: "3 Way Catheter FR 20",
        desc: "Three-way catheter for continuous irrigation, French size 20.",
        packaging: "Unit",
        unit: "unit"
    },
    {
        id: 98,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Catheters",
        subcategorySlug: "catheters",
        title: "3 Way Catheter FR 22",
        desc: "Three-way catheter for continuous irrigation, French size 22.",
        packaging: "Unit",
        unit: "unit"
    },
    {
        id: 99,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Catheters",
        subcategorySlug: "catheters",
        title: "3 Way Catheter FR 24",
        desc: "Three-way catheter for continuous irrigation, French size 24.",
        packaging: "Unit",
        unit: "unit"
    },
    {
        id: 100,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Catheters",
        subcategorySlug: "catheters",
        title: "Central Venous Catheter (CVC) Single Lumen 16G & 14G",
        desc: "Single lumen central venous catheter for central line access.",
        packaging: "Unit",
        unit: "unit"
    },
    {
        id: 101,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Catheters",
        subcategorySlug: "catheters",
        title: "Central Venous Catheter (CVC) Double Lumen 16G & 14G",
        desc: "Double lumen central venous catheter for dual access.",
        packaging: "Unit",
        unit: "unit"
    },
    {
        id: 102,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Catheters",
        subcategorySlug: "catheters",
        title: "Central Venous Catheter (CVC) Triple Lumen",
        desc: "Triple lumen central venous catheter for multiple infusions.",
        packaging: "Unit",
        unit: "unit"
    },
    // Enema Sets
    {
        id: 103,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Enema Sets",
        subcategorySlug: "enema-sets",
        title: "Enema Set Bulb Type",
        desc: "Bulb-type enema set for rectal administration.",
        packaging: "Unit",
        unit: "unit"
    },
    {
        id: 104,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Enema Sets",
        subcategorySlug: "enema-sets",
        title: "Enema Set Can Type",
        desc: "Can-type enema set for controlled administration.",
        packaging: "Unit",
        unit: "unit"
    },
    {
        id: 105,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Enema Sets",
        subcategorySlug: "enema-sets",
        title: "Enema Syringe 200ml",
        desc: "200ml enema syringe for irrigation procedures.",
        packaging: "Unit",
        unit: "unit"
    },
    // Infusion Sets
    {
        id: 106,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Infusion Sets",
        subcategorySlug: "infusion-sets",
        title: "Infusion Set (Vented)",
        desc: "Vented IV infusion set for non-collapsible containers.",
        packaging: "Unit",
        unit: "unit"
    },
    {
        id: 107,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Infusion Sets",
        subcategorySlug: "infusion-sets",
        title: "Infusion Set (Non-Vented)",
        desc: "Non-vented IV infusion set for collapsible bags.",
        packaging: "Unit",
        unit: "unit"
    },
    {
        id: 108,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Infusion Sets",
        subcategorySlug: "infusion-sets",
        title: "Micro Infusion Set (Burette Set) 110ml",
        desc: "110ml burette set for precise pediatric infusions.",
        packaging: "Unit",
        unit: "unit"
    },
    {
        id: 109,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Infusion Sets",
        subcategorySlug: "infusion-sets",
        title: "Micro Infusion Set (Burette Set) 150ml",
        desc: "150ml burette set for controlled fluid delivery.",
        packaging: "Unit",
        unit: "unit"
    },
    // Syringes
    {
        id: 110,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Syringes",
        subcategorySlug: "syringes",
        title: "Syringe 1ml (Without Needle)",
        desc: "1ml disposable syringe without needle attachment.",
        packaging: "Box (100 units)",
        unit: "box"
    },
    {
        id: 111,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Syringes",
        subcategorySlug: "syringes",
        title: "Syringe 2ml (Without Needle & With Needle)",
        desc: "2ml disposable syringe available with or without needle.",
        packaging: "Box (100 units)",
        unit: "box"
    },
    {
        id: 112,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Syringes",
        subcategorySlug: "syringes",
        title: "Syringe 3ml (Without Needle & With Needle)",
        desc: "3ml disposable syringe available with or without needle.",
        packaging: "Box (100 units)",
        unit: "box"
    },
    {
        id: 113,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Syringes",
        subcategorySlug: "syringes",
        title: "Syringe 5ml (Without Needle & With Needle)",
        desc: "5ml disposable syringe available with or without needle.",
        packaging: "Box (100 units)",
        unit: "box"
    },
    {
        id: 114,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Syringes",
        subcategorySlug: "syringes",
        title: "Syringe 10ml (Without Needle & With Needle)",
        desc: "10ml disposable syringe available with or without needle.",
        packaging: "Box (100 units)",
        unit: "box"
    },
    {
        id: 115,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Syringes",
        subcategorySlug: "syringes",
        title: "Syringe 20ml (Without Needle & With Needle)",
        desc: "20ml disposable syringe available with or without needle.",
        packaging: "Box (100 units)",
        unit: "box"
    },
    {
        id: 116,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Syringes",
        subcategorySlug: "syringes",
        title: "Syringe 30ml (Without Needle)",
        desc: "30ml disposable syringe without needle attachment.",
        packaging: "Box (50 units)",
        unit: "box"
    },
    {
        id: 117,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Syringes",
        subcategorySlug: "syringes",
        title: "Syringe 50ml (Without Needle)",
        desc: "50ml disposable syringe without needle attachment.",
        packaging: "Box (25 units)",
        unit: "box"
    },
    {
        id: 118,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Syringes",
        subcategorySlug: "syringes",
        title: "Syringe 60ml (Without Needle)",
        desc: "60ml disposable syringe without needle attachment.",
        packaging: "Box (25 units)",
        unit: "box"
    },
    // Blood Collection
    {
        id: 119,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Blood Collection",
        subcategorySlug: "blood-collection",
        title: "Scalp Vein Set (All Sizes)",
        desc: "Winged infusion set for pediatric and difficult venous access.",
        packaging: "Box (100 units)",
        unit: "box"
    },
    {
        id: 120,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Blood Collection",
        subcategorySlug: "blood-collection",
        title: "Blood Lancet (All Sizes)",
        desc: "Sterile blood lancets for capillary blood sampling.",
        packaging: "Box (100 units)",
        unit: "box"
    },
    // Urine Bags
    {
        id: 121,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Urine Bags",
        subcategorySlug: "urine-bags",
        title: "Urine Bag with T-Type Outlet 2 Litre",
        desc: "2 litre urine collection bag with T-type outlet valve.",
        packaging: "Unit",
        unit: "unit"
    },
    {
        id: 122,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Urine Bags",
        subcategorySlug: "urine-bags",
        title: "Urine Bag with Push & Pull Type 2 Litre",
        desc: "2 litre urine collection bag with push and pull outlet.",
        packaging: "Unit",
        unit: "unit"
    },
    {
        id: 123,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Urine Bags",
        subcategorySlug: "urine-bags",
        title: "Urine Bag with Bottom Outlet with Hanger 2 Litre",
        desc: "2 litre urine collection bag with bottom outlet and bed hanger.",
        packaging: "Unit",
        unit: "unit"
    },
    {
        id: 124,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Urine Bags",
        subcategorySlug: "urine-bags",
        title: "Urine Bag with T-Type Outlet with Measured Volume 2 Litre",
        desc: "2 litre urine bag with T-type outlet and volume measurement markings.",
        packaging: "Unit",
        unit: "unit"
    },
    // Tubes
    {
        id: 125,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Tubes",
        subcategorySlug: "tubes",
        title: "Endotracheal Tube (Cuffed & Plain) 2.0mm to 10.0mm",
        desc: "Airway management tubes available in cuffed and plain variants.",
        packaging: "Unit",
        unit: "unit"
    },
    {
        id: 126,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Tubes",
        subcategorySlug: "tubes",
        title: "Endotracheal Tube (Flexometallic) 2.0mm to 10.0mm",
        desc: "Reinforced flexometallic endotracheal tube for difficult airways.",
        packaging: "Unit",
        unit: "unit"
    },
    {
        id: 127,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Tubes",
        subcategorySlug: "tubes",
        title: "Stomach Tube (Ryle's Tube) FR 6 to FR 20",
        desc: "Nasogastric tube for gastric decompression and feeding.",
        packaging: "Unit",
        unit: "unit"
    },
    {
        id: 128,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Tubes",
        subcategorySlug: "tubes",
        title: "Gastric Feeding Tube FR 4/5/6/8/10/12/14/16",
        desc: "Enteral feeding tube for nutritional support.",
        packaging: "Unit",
        unit: "unit"
    },
    {
        id: 129,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Tubes",
        subcategorySlug: "tubes",
        title: "Suction Catheter Plain FR 5 to FR 18",
        desc: "Plain suction catheter for airway clearance.",
        packaging: "Unit",
        unit: "unit"
    },
    {
        id: 130,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Tubes",
        subcategorySlug: "tubes",
        title: "Suction Catheter with Thumb Control FR 5 to FR 18",
        desc: "Suction catheter with thumb control for intermittent suction.",
        packaging: "Unit",
        unit: "unit"
    },
    {
        id: 131,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Tubes",
        subcategorySlug: "tubes",
        title: "Suction Catheter Closed (72 hours) FR 5 to FR 18",
        desc: "Closed suction system for 72-hour continuous use.",
        packaging: "Unit",
        unit: "unit"
    },
    {
        id: 132,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Tubes",
        subcategorySlug: "tubes",
        title: "Infant Mucus Extractor (Easy-Vac)",
        desc: "Disposable mucus extractor for neonatal airway clearance.",
        packaging: "Unit",
        unit: "unit"
    },
    {
        id: 133,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Tubes",
        subcategorySlug: "tubes",
        title: "Infant Feeding Tube FR 4/5/6/8/10/12/14/16",
        desc: "Enteral feeding tube for infant nutritional support.",
        packaging: "Unit",
        unit: "unit"
    },
    {
        id: 134,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Tubes",
        subcategorySlug: "tubes",
        title: "Rectal Catheter FR 18/20/22/24/26/28/30",
        desc: "Rectal tube for bowel decompression and drainage.",
        packaging: "Unit",
        unit: "unit"
    },
    // Sutures
    {
        id: 135,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Sutures",
        subcategorySlug: "sutures",
        title: "Suture: Catgut (Plain)",
        desc: "Absorbable plain catgut surgical suture material.",
        packaging: "Box (12 units)",
        unit: "box"
    },
    {
        id: 136,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Sutures",
        subcategorySlug: "sutures",
        title: "Suture: Catgut (Chromic)",
        desc: "Absorbable chromic catgut suture with extended absorption time.",
        packaging: "Box (12 units)",
        unit: "box"
    },
    {
        id: 137,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Sutures",
        subcategorySlug: "sutures",
        title: "Suture: Polyglycolic Acid (PGA)",
        desc: "Synthetic absorbable PGA suture for soft tissue closure.",
        packaging: "Box (12 units)",
        unit: "box"
    },
    {
        id: 138,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Sutures",
        subcategorySlug: "sutures",
        title: "Suture: Polyglactine 910",
        desc: "Synthetic absorbable braided suture material.",
        packaging: "Box (12 units)",
        unit: "box"
    },
    {
        id: 139,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Sutures",
        subcategorySlug: "sutures",
        title: "Suture: Silk",
        desc: "Non-absorbable braided silk suture for skin closure.",
        packaging: "Box (12 units)",
        unit: "box"
    },
    {
        id: 140,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Sutures",
        subcategorySlug: "sutures",
        title: "Suture: Polyamide (Nylon)",
        desc: "Non-absorbable nylon monofilament suture.",
        packaging: "Box (12 units)",
        unit: "box"
    },
    {
        id: 141,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Sutures",
        subcategorySlug: "sutures",
        title: "Suture: Polypropylene",
        desc: "Non-absorbable polypropylene monofilament suture.",
        packaging: "Box (12 units)",
        unit: "box"
    },
    {
        id: 142,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Sutures",
        subcategorySlug: "sutures",
        title: "Suture: Stainless Steel",
        desc: "Non-absorbable stainless steel wire suture for bone fixation.",
        packaging: "Box (12 units)",
        unit: "box"
    },
    // Gloves
    {
        id: 143,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Gloves",
        subcategorySlug: "gloves",
        title: "Surgical Gloves (Powder Free)",
        desc: "Sterile latex surgical gloves without powder.",
        packaging: "Box (50 pairs)",
        unit: "box"
    },
    {
        id: 144,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Gloves",
        subcategorySlug: "gloves",
        title: "Surgical Gloves (Powdered)",
        desc: "Sterile latex surgical gloves with powder for easy donning.",
        packaging: "Box (50 pairs)",
        unit: "box"
    },
    {
        id: 145,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Gloves",
        subcategorySlug: "gloves",
        title: "Surgical Gloves (Disposable)",
        desc: "Single-use disposable surgical gloves for procedures.",
        packaging: "Box (50 pairs)",
        unit: "box"
    },
    {
        id: 146,
        category: "Surgical Products",
        categorySlug: "surgical-products",
        subcategory: "Gloves",
        subcategorySlug: "gloves",
        title: "Examination Gloves (Latex/Nitrile)",
        desc: "Non-sterile examination gloves in latex or nitrile variants.",
        packaging: "Box (100 units)",
        unit: "box"
    }
];

/**
 * Get product count by category
 * @param {string} categorySlug - The category slug
 * @returns {number} - Number of products in the category
 */
function getProductCountByCategory(categorySlug) {
    return PRODUCT_DATA.filter(p => p.categorySlug === categorySlug).length;
}

/**
 * Get product count by subcategory
 * @param {string} categorySlug - The category slug
 * @param {string} subcategorySlug - The subcategory slug
 * @returns {number} - Number of products in the subcategory
 */
function getProductCountBySubcategory(categorySlug, subcategorySlug) {
    return PRODUCT_DATA.filter(p =>
        p.categorySlug === categorySlug &&
        p.subcategorySlug === subcategorySlug
    ).length;
}

/**
 * Get all category counts for display
 * @returns {Object} - Object with category slugs as keys and counts as values
 */
function getAllCategoryCounts() {
    const counts = {};
    PRODUCT_DATA.forEach(product => {
        if (!counts[product.categorySlug]) {
            counts[product.categorySlug] = 0;
        }
        counts[product.categorySlug]++;
    });
    return counts;
}

/**
 * Filter products by category and/or subcategory
 * @param {string} categorySlug - The category slug (optional)
 * @param {string} subcategorySlug - The subcategory slug (optional)
 * @returns {Array} - Filtered products
 */
function getFilteredProducts(categorySlug, subcategorySlug) {
    let filtered = PRODUCT_DATA;

    if (categorySlug && categorySlug !== 'all') {
        filtered = filtered.filter(p => p.categorySlug === categorySlug);
    }

    if (subcategorySlug) {
        filtered = filtered.filter(p => p.subcategorySlug === subcategorySlug);
    }

    return filtered;
}
