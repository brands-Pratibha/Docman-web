/**
 * Product Translations Data
 * Contains translations for product titles and descriptions.
 * Keys match Product IDs from product-data.js.
 */

const PRODUCT_I18N = {
    "FR": {
        // Selected Product Translations (Pharma)
        1: { title: "Amoxicilline 500mg", desc: "Antibiotique à large spectre pour les infections bactériennes." },
        2: { title: "Azithromycine 250mg", desc: "Antibiotique macrolide pour les infections respiratoires." },
        3: { title: "Ciprofloxacine 500mg", desc: "Antibiotique fluoroquinolone pour les infections urinaires." },
        4: { title: "Amlodipine 5mg", desc: "Bloqueur des canaux calciques pour l'hypertension." },
        5: { title: "Atorvastatine 10mg", desc: "Médicament de statine pour réduire le cholestérol." },
        // Add more product translations here as needed...
    },
    "ES": {
        // Selected Product Translations (Pharma)
        1: { title: "Amoxicilina 500mg", desc: "Antibiótico de amplio espectro para infecciones bacterianas." },
        2: { title: "Azitromicina 250mg", desc: "Antibiótico macrólido para infecciones respiratorias." },
        3: { title: "Ciprofloxacino 500mg", desc: "Antibiótico fluoroquinolona para infecciones del tracto urinario." },
        4: { title: "Amlodipino 5mg", desc: "Bloqueador de canales de calcio para la hipertensión." },
        5: { title: "Atorvastatina 10mg", desc: "Medicamento de estatina para reducir el colesterol." },
        // Add more product translations here as needed...
    }
};

/**
 * Helper to get translated product data
 * @param {Object} product - Original product object
 * @param {string} lang - Language code (EN, FR, ES)
 * @returns {Object} Translated product object (clone)
 */
function getTranslatedProduct(product, lang) {
    if (!product) return null;
    const p = { ...product }; // Clone

    // Normalize lang
    lang = (lang || 'EN').toUpperCase();
    if (lang === 'EN') return p; // Default currently English for Data

    // 1. Translate Title & Description
    if (PRODUCT_I18N[lang] && PRODUCT_I18N[lang][product.id]) {
        const trans = PRODUCT_I18N[lang][product.id];
        if (trans.title) p.title = trans.title;
        if (trans.desc) p.desc = trans.desc;
    }

    // 2. Translate Category & Subcategory using Translations Keys
    // Category Mapping (Slug -> Key)
    const categoryMap = {
        'pharmaceutical-products': 'cat_pharma',
        'bandages-surgical': 'cat_bandages',
        'dental-equipment': 'cat_dental',
        'hospital-equipment': 'cat_hospital',
        'medical-disposables': 'cat_disposables',
        'veterinary-products': 'cat_vet',
        'surgical-products': 'cat_surgical',
        'narcotic-products': 'cat_narcotic'
    };

    // Subcategory Mapping (Slug -> Key)
    const subcategoryMap = {
        // Pharmaceutical subcategories (new from Excel)
        'capsules': 'sub_capsules',
        'tablets': 'sub_tablets',
        'injectables': 'sub_injectables',
        'liquid-orals': 'sub_liquid_orals',
        'dry-syrups': 'sub_dry_syrups',
        'creams-ointments': 'sub_creams_ointments',
        'eyeearnasal-drops': 'sub_eye_ear_nasal',
        'liquid-externals': 'sub_liquid_externals',
        'powders': 'sub_powders',
        'suppositories': 'sub_suppositories',
        'combination-kits': 'sub_combination_kits',
        'veterinary-tablets': 'sub_vet_tablets',
        // Legacy pharmaceutical subcategories
        'antibiotics': 'sub_antibiotics',
        'cardiovascular': 'sub_cardio',
        'cns': 'sub_cns',
        'anti-diabetic': 'sub_diabetic',
        'analgesics': 'sub_analgesics',
        // Bandages & Surgical Dressings
        'gauze': 'sub_gauze',
        'crepe': 'sub_crepe',
        'elastic': 'sub_elastic',
        'compress': 'sub_compress',
        'paraffin': 'sub_paraffin',
        'cotton': 'sub_cotton',
        'plaster-of-paris': 'sub_pop',
        // Dental Equipment
        'machines': 'sub_machines',
        'hand-pieces': 'sub_handpieces',
        'filling-materials': 'sub_filling',
        'polishing-items': 'sub_polishing',
        // Hospital Equipment
        'diagnostic': 'sub_diagnostic',
        'surgical': 'sub_surgical',
        'patient-care': 'sub_patient',
        'laboratory': 'sub_lab',
        // Medical Disposables
        'syringes': 'sub_syringes',
        'gloves': 'sub_gloves',
        'catheters': 'sub_catheters',
        'iv-sets': 'sub_iv',
        // Veterinary subcategories
        'injection': 'sub_injection',
        'tablet': 'sub_tablet',
        'suspension': 'sub_suspension',
        // Surgical subcategories
        'blades': 'sub_blades',
        'cannula': 'sub_cannula',
        'enema-sets': 'sub_enema',
        'infusion-sets': 'sub_infusion',
        'blood-collection': 'sub_blood_collection',
        'urine-bags': 'sub_urine_bags',
        'tubes': 'sub_tubes',
        'sutures': 'sub_sutures',
        'general-surgical': 'sub_general_surgical'
    };

    if (window.translations && window.translations[lang]) {
        const t = window.translations[lang];

        // Category
        const catKey = categoryMap[p.categorySlug];
        if (catKey && t[catKey]) {
            p.category = t[catKey];
        }

        // Subcategory
        const subKey = subcategoryMap[p.subcategorySlug];
        if (subKey && t[subKey]) {
            p.subcategory = t[subKey];
        }
    }

    return p;
}
