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
