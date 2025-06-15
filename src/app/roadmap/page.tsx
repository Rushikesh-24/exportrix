

'use client';
import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  Circle, 
  MapPin, 
  Package, 
  FileText, 
  ExternalLink, 
  Clock, 
  AlertTriangle,
  Info,
  Download,
  User,
  Building,
  Truck,
  Ship,
  Plane
} from 'lucide-react';

const ExportImportRoadmap = () => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');
  const [tradeType, setTradeType] = useState('export');
  const [completedForms, setCompletedForms] = useState(new Set());
  const [roadmap, setRoadmap] = useState([]);

  // Product categories with specific requirements
  const productCategories = {
    'textiles': {
      name: 'Textiles & Garments',
      icon: '👔',
      specialRequirements: ['Cotton Textiles Order', 'Pre-shipment Inspection']
    },
    'electronics': {
      name: 'Electronics & IT Hardware',
      icon: '💻',
      specialRequirements: ['BIS Certification', 'STQC Certification']
    },
    'pharmaceuticals': {
      name: 'Pharmaceuticals & Drugs',
      icon: '💊',
      specialRequirements: ['Drug License', 'WHO-GMP Certificate', 'COPP']
    },
    'food_products': {
      name: 'Food Products & Agriculture',
      icon: '🌾',
      specialRequirements: ['FSSAI License', 'Phytosanitary Certificate', 'APEDA Registration']
    },
    'chemicals': {
      name: 'Chemicals & Petrochemicals',
      icon: '⚗️',
      specialRequirements: ['Chemical License', 'MSDS Certificate', 'Hazardous Goods Declaration']
    },
    'machinery': {
      name: 'Machinery & Equipment',
      icon: '⚙️',
      specialRequirements: ['CE Marking', 'Test Certificates', 'Installation Manual']
    },
    'gems_jewelry': {
      name: 'Gems & Jewelry',
      icon: '💎',
      specialRequirements: ['Kimberley Certificate', 'Hallmarking Certificate']
    },
    'automotive': {
      name: 'Automotive & Parts',
      icon: '🚗',
      specialRequirements: ['Type Approval', 'Pollution Certificate', 'ARAI Certification']
    }
  };

  // Destination countries with specific requirements
  const destinations = {
    'usa': {
      name: 'United States',
      flag: '🇺🇸',
      region: 'North America',
      specialRequirements: ['FDA Approval', 'FCC Certification', 'CBP Requirements']
    },
    'eu': {
      name: 'European Union',
      flag: '🇪🇺',
      region: 'Europe',
      specialRequirements: ['CE Marking', 'REACH Compliance', 'EUR.1 Certificate']
    },
    'uae': {
      name: 'United Arab Emirates',
      flag: '🇦🇪',
      region: 'Middle East',
      specialRequirements: ['Chamber Certificate', 'Embassy Attestation', 'SASO Certificate']
    },
    'china': {
      name: 'China',
      flag: '🇨🇳',
      region: 'Asia',
      specialRequirements: ['CCC Certification', 'AQSIQ Registration', 'Form A Certificate']
    },
    'uk': {
      name: 'United Kingdom',
      flag: '🇬🇧',
      region: 'Europe',
      specialRequirements: ['UKCA Marking', 'GSP Certificate', 'Veterinary Certificate']
    },
    'japan': {
      name: 'Japan',
      flag: '🇯🇵',
      region: 'Asia',
      specialRequirements: ['JIS Certification', 'Form A Certificate', 'Quarantine Certificate']
    },
    'australia': {
      name: 'Australia',
      flag: '🇦🇺',
      region: 'Oceania',
      specialRequirements: ['ACMA Certification', 'Biosecurity Certificate', 'GSP Certificate']
    },
    'canada': {
      name: 'Canada',
      flag: '🇨🇦',
      region: 'North America',
      specialRequirements: ['Health Canada Approval', 'ISED Certification', 'CFIA Certificate']
    }
  };

  // Base documentation requirements
  const baseDocuments = {
    export: [
      {
        category: 'Company Registration',
        icon: <Building className="w-5 h-5" />,
        forms: [
          {
            name: 'IEC (Import Export Code)',
            description: 'Mandatory 10-digit code for export/import business',
            steps: ['Apply online at DGFT portal', 'Submit required documents', 'Pay fee of ₹500'],
            requiredDocs: ['PAN Card', 'Aadhaar Card', 'Bank Certificate', 'Photograph'],
            link: 'https://dgft.gov.in',
            timeframe: '7-15 days',
            priority: 'high'
          },
          {
            name: 'GST Registration',
            description: 'Goods and Services Tax registration for tax compliance',
            steps: ['Apply on GST portal', 'Document verification', 'Receive GSTIN'],
            requiredDocs: ['PAN Card', 'Aadhaar Card', 'Business Address Proof', 'Bank Account Details'],
            link: 'https://gst.gov.in',
            timeframe: '3-7 days',
            priority: 'high'
          }
        ]
      },
      {
        category: 'Export Licenses & Permits',
        icon: <FileText className="w-5 h-5" />,
        forms: [
          {
            name: 'Export License (if required)',
            description: 'Required for restricted/prohibited items',
            steps: ['Check SCOMET list', 'Apply through DGFT', 'Submit technical specifications'],
            requiredDocs: ['IEC', 'Product specifications', 'End user certificate'],
            link: 'https://dgft.gov.in',
            timeframe: '30-45 days',
            priority: 'medium'
          },
          {
            name: 'RCMC Certificate',
            description: 'Registration cum Membership Certificate from Export Promotion Council',
            steps: ['Contact relevant EPC', 'Submit application', 'Pay membership fee'],
            requiredDocs: ['IEC', 'GST Certificate', 'MOA/AOA', 'Product catalog'],
            link: '#',
            timeframe: '15-30 days',
            priority: 'medium'
          }
        ]
      },
      {
        category: 'Shipping & Logistics',
        icon: <Ship className="w-5 h-5" />,
        forms: [
          {
            name: 'Shipping Bill',
            description: 'Main document for customs clearance of exports',
            steps: ['File through customs broker', 'Submit supporting documents', 'Pay applicable duties'],
            requiredDocs: ['Commercial Invoice', 'Packing List', 'Export License', 'Insurance Policy'],
            link: '#',
            timeframe: '1-2 days',
            priority: 'high'
          },
          {
            name: 'Bill of Lading/Airway Bill',
            description: 'Receipt and contract for transportation of goods',
            steps: ['Book cargo space', 'Submit cargo details', 'Receive B/L from carrier'],
            requiredDocs: ['Shipping Bill', 'Commercial Invoice', 'Packing List'],
            link: '#',
            timeframe: '1-3 days',
            priority: 'high'
          }
        ]
      },
      {
        category: 'Financial Documents',
        icon: <User className="w-5 h-5" />,
        forms: [
          {
            name: 'Commercial Invoice',
            description: 'Detailed bill for goods sold to foreign buyer',
            steps: ['Prepare detailed invoice', 'Include all required information', 'Get signed by authorized signatory'],
            requiredDocs: ['Purchase Order', 'Product specifications', 'Company letterhead'],
            link: '#',
            timeframe: '1 day',
            priority: 'high'
          },
          {
            name: 'Letter of Credit (LC)',
            description: 'Bank guarantee for payment (if applicable)',
            steps: ['Receive LC from buyer', 'Verify terms and conditions', 'Submit compliant documents'],
            requiredDocs: ['Export contract', 'Proforma invoice', 'Bank account details'],
            link: '#',
            timeframe: '7-15 days',
            priority: 'medium'
          }
        ]
      }
    ],
    import: [
      {
        category: 'Company Registration',
        icon: <Building className="w-5 h-5" />,
        forms: [
          {
            name: 'IEC (Import Export Code)',
            description: 'Mandatory 10-digit code for export/import business',
            steps: ['Apply online at DGFT portal', 'Submit required documents', 'Pay fee of ₹500'],
            requiredDocs: ['PAN Card', 'Aadhaar Card', 'Bank Certificate', 'Photograph'],
            link: 'https://dgft.gov.in',
            timeframe: '7-15 days',
            priority: 'high'
          },
          {
            name: 'GST Registration',
            description: 'Goods and Services Tax registration for tax compliance',
            steps: ['Apply on GST portal', 'Document verification', 'Receive GSTIN'],
            requiredDocs: ['PAN Card', 'Aadhaar Card', 'Business Address Proof', 'Bank Account Details'],
            link: 'https://gst.gov.in',
            timeframe: '3-7 days',
            priority: 'high'
          }
        ]
      },
      {
        category: 'Import Licenses & Permits',
        icon: <FileText className="w-5 h-5" />,
        forms: [
          {
            name: 'Import License (if required)',
            description: 'Required for restricted/prohibited/canalized items',
            steps: ['Check import policy', 'Apply through DGFT', 'Submit technical specifications'],
            requiredDocs: ['IEC', 'Product specifications', 'Manufacturing license (if applicable)'],
            link: 'https://dgft.gov.in',
            timeframe: '30-60 days',
            priority: 'medium'
          },
          {
            name: 'BIS License (if applicable)',
            description: 'Bureau of Indian Standards certification for specific products',
            steps: ['Check BIS mandatory list', 'Apply for license', 'Factory inspection'],
            requiredDocs: ['Product test reports', 'Factory details', 'Quality manual'],
            link: 'https://bis.gov.in',
            timeframe: '60-90 days',
            priority: 'medium'
          }
        ]
      },
      {
        category: 'Customs & Clearance',
        icon: <Truck className="w-5 h-5" />,
        forms: [
          {
            name: 'Bill of Entry',
            description: 'Main document for customs clearance of imports',
            steps: ['File through customs broker', 'Submit supporting documents', 'Pay customs duty'],
            requiredDocs: ['Commercial Invoice', 'Packing List', 'Bill of Lading', 'Insurance Policy'],
            link: '#',
            timeframe: '2-5 days',
            priority: 'high'
          },
          {
            name: 'GSTR-1 Filing',
            description: 'Monthly GST return filing for imported goods',
            steps: ['Compile import invoices', 'File return online', 'Pay applicable GST'],
            requiredDocs: ['Bill of Entry', 'Tax invoices', 'Import documents'],
            link: 'https://gst.gov.in',
            timeframe: 'Monthly',
            priority: 'high'
          }
        ]
      }
    ]
  };

  // Generate roadmap based on selections
  useEffect(() => {
    if (selectedProduct && selectedDestination) {
      generateRoadmap();
    }
  }, [selectedProduct, selectedDestination, tradeType]);

  const generateRoadmap = () => {
    // Deep clone the base documents without JSON methods to avoid circular reference
    let generatedRoadmap = baseDocuments[tradeType].map(category => ({
      ...category,
      forms: category.forms.map(form => ({ ...form }))
    }));
    
    // Add product-specific requirements
    const productInfo = productCategories[selectedProduct];
    if (productInfo && productInfo.specialRequirements) {
      const productSpecificCategory = {
        category: `${productInfo.name} Specific`,
        icon: <Package className="w-5 h-5" />,
        forms: productInfo.specialRequirements.map(req => ({
          name: req,
          description: getProductSpecificDescription(req),
          steps: getProductSpecificSteps(req),
          requiredDocs: getProductSpecificDocs(req),
          link: '#',
          timeframe: getProductSpecificTimeframe(req),
          priority: 'medium'
        }))
      };
      generatedRoadmap.push(productSpecificCategory);
    }

    // Add destination-specific requirements
    const destinationInfo = destinations[selectedDestination];
    if (destinationInfo && destinationInfo.specialRequirements) {
      const destinationSpecificCategory = {
        category: `${destinationInfo.name} Specific`,
        icon: <MapPin className="w-5 h-5" />,
        forms: destinationInfo.specialRequirements.map(req => ({
          name: req,
          description: getDestinationSpecificDescription(req),
          steps: getDestinationSpecificSteps(req),
          requiredDocs: getDestinationSpecificDocs(req),
          link: '#',
          timeframe: getDestinationSpecificTimeframe(req),
          priority: 'medium'
        }))
      };
      generatedRoadmap.push(destinationSpecificCategory);
    }

    setRoadmap(generatedRoadmap);
  };

  // Helper functions for product-specific requirements
  const getProductSpecificDescription = (req) => {
    const descriptions = {
      'Cotton Textiles Order': 'Compliance with Cotton Textiles Order for export of cotton textiles',
      'Pre-shipment Inspection': 'Third-party inspection before shipment',
      'BIS Certification': 'Bureau of Indian Standards certification for electronics',
      'STQC Certification': 'Standardisation Testing and Quality Certification',
      'Drug License': 'License to manufacture and export pharmaceutical products',
      'WHO-GMP Certificate': 'World Health Organization Good Manufacturing Practice certificate',
      'COPP': 'Certificate of Pharmaceutical Product',
      'FSSAI License': 'Food Safety and Standards Authority of India license',
      'Phytosanitary Certificate': 'Certificate for plant and plant products',
      'APEDA Registration': 'Agricultural and Processed Food Products Export Development Authority registration'
    };
    return descriptions[req] || `Documentation required for ${req}`;
  };

  const getProductSpecificSteps = (req) => {
    return ['Check eligibility criteria', 'Submit application with documents', 'Complete inspection/verification', 'Receive certificate'];
  };

  const getProductSpecificDocs = (req) => {
    return ['Application form', 'Product specifications', 'Test certificates', 'Company registration documents'];
  };

  const getProductSpecificTimeframe = (req) => {
    const timeframes = {
      'Cotton Textiles Order': '15-30 days',
      'Pre-shipment Inspection': '3-7 days',
      'BIS Certification': '30-60 days',
      'Drug License': '60-90 days',
      'FSSAI License': '30-45 days'
    };
    return timeframes[req] || '15-30 days';
  };

  // Helper functions for destination-specific requirements
  const getDestinationSpecificDescription = (req) => {
    const descriptions = {
      'FDA Approval': 'Food and Drug Administration approval for USA',
      'FCC Certification': 'Federal Communications Commission certification',
      'CE Marking': 'Conformité Européenne marking for EU',
      'REACH Compliance': 'Registration, Evaluation, Authorisation and Restriction of Chemicals',
      'Chamber Certificate': 'Certificate from local Chamber of Commerce',
      'Embassy Attestation': 'Document attestation from respective embassy'
    };
    return descriptions[req] || `Required certification for destination country: ${req}`;
  };

  const getDestinationSpecificSteps = (req) => {
    return ['Check specific requirements', 'Submit application', 'Complete testing/verification', 'Obtain certificate'];
  };

  const getDestinationSpecificDocs = (req) => {
    return ['Product documentation', 'Test reports', 'Declaration of conformity', 'Technical specifications'];
  };

  const getDestinationSpecificTimeframe = (req) => {
    return '30-45 days';
  };

  const toggleFormCompletion = (formName) => {
    const newCompleted = new Set(completedForms);
    if (newCompleted.has(formName)) {
      newCompleted.delete(formName);
    } else {
      newCompleted.add(formName);
    }
    setCompletedForms(newCompleted);
  };

  const getCompletionStats = () => {
    if (roadmap.length === 0) return { completed: 0, total: 0, percentage: 0 };
    
    const totalForms = roadmap.reduce((sum, category) => sum + category.forms.length, 0);
    const completedCount = completedForms.size;
    return {
      completed: completedCount,
      total: totalForms,
      percentage: totalForms > 0 ? Math.round((completedCount / totalForms) * 100) : 0
    };
  };

  const stats = getCompletionStats();

  // Tab categories for filtering
  const categories = ['All Documents', 'Company Registration', 'Licenses & Permits', 'Shipping', 'Financial'];
  const [selectedCategory, setSelectedCategory] = useState('All Documents');

  const getFilteredRoadmap = () => {
    if (selectedCategory === 'All Documents') return roadmap;
    return roadmap.filter(category => 
      category.category.toLowerCase().includes(selectedCategory.toLowerCase().replace(' & ', ' '))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Automated Documentation
          </h1>
          <p className="text-gray-600">
            Generate and download export/import documentation
          </p>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center mb-6">
          {/* Category Tabs */}
          <div className="flex gap-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  selectedCategory === category
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => setTradeType('export')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  tradeType === 'export'
                    ? 'bg-gray-800 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Export
              </button>
              <button
                onClick={() => setTradeType('import')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  tradeType === 'import'
                    ? 'bg-gray-800 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Import
              </button>
            </div>
            
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Product Category</option>
              {Object.entries(productCategories).map(([key, product]) => (
                <option key={key} value={key}>
                  {product.icon} {product.name}
                </option>
              ))}
            </select>
            
            <select
              value={selectedDestination}
              onChange={(e) => setSelectedDestination(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Destination</option>
              {Object.entries(destinations).map(([key, country]) => (
                <option key={key} value={key}>
                  {country.flag} {country.name}
                </option>
              ))}
            </select>
            
            {/* <button className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors">
              Generate All
            </button> */}
          </div>
        </div>

        {/* Progress Stats */}
        {roadmap.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Progress Overview</h2>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  {stats.completed} of {stats.total} completed
                </span>
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${stats.percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-green-600">
                  {stats.percentage}%
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <FileText className="text-blue-600 mr-2" size={20} />
                  <span className="text-blue-800 font-medium">Total Documents</span>
                </div>
                <p className="text-2xl font-bold text-blue-600 mt-1">{stats.total}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="text-green-600 mr-2" size={20} />
                  <span className="text-green-800 font-medium">Completed</span>
                </div>
                <p className="text-2xl font-bold text-green-600 mt-1">{stats.completed}</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <Clock className="text-orange-600 mr-2" size={20} />
                  <span className="text-orange-800 font-medium">Remaining</span>
                </div>
                <p className="text-2xl font-bold text-orange-600 mt-1">{stats.total - stats.completed}</p>
              </div>
            </div>
          </div>
        )}

        {/* Roadmap */}
        {roadmap.length > 0 ? (
          <div className="space-y-6">
            {getFilteredRoadmap().map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                <div className="bg-gray-800 text-white px-6 py-4">
                  <div className="flex items-center">
                    {category.icon}
                    <h3 className="text-xl font-semibold ml-2">{category.category}</h3>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {category.forms.map((form, formIndex) => (
                      <div
                        key={formIndex}
                        className={`border rounded-lg p-4 transition-all ${
                          completedForms.has(form.name)
                            ? 'border-green-300 bg-green-50'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3 flex-1">
                            <button
                              onClick={() => toggleFormCompletion(form.name)}
                              className="mt-1 transition-colors"
                            >
                              {completedForms.has(form.name) ? (
                                <CheckCircle className="text-green-600" size={24} />
                              ) : (
                                <Circle className="text-gray-400 hover:text-blue-600" size={24} />
                              )}
                            </button>

                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className={`font-semibold ${
                                  completedForms.has(form.name) ? 'text-green-800' : 'text-gray-800'
                                }`}>
                                  {form.name}
                                </h4>
                                {form.priority === 'high' && (
                                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                                    High Priority
                                  </span>
                                )}
                                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                  <Clock className="inline w-3 h-3 mr-1" />
                                  {form.timeframe}
                                </span>
                              </div>

                              <p className="text-gray-600 mb-3 text-sm">{form.description}</p>

                              <div className="mb-3">
                                <h5 className="font-medium text-gray-700 mb-1 text-sm">Steps:</h5>
                                <ol className="text-sm text-gray-600 space-y-1">
                                  {form.steps.map((step, stepIndex) => (
                                    <li key={stepIndex} className="flex items-start">
                                      <span className="bg-gray-300 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                        {stepIndex + 1}
                                      </span>
                                      {step}
                                    </li>
                                  ))}
                                </ol>
                              </div>

                              <div className="mb-3">
                                <h5 className="font-medium text-gray-700 mb-1 text-sm">Required Documents:</h5>
                                <ul className="text-sm text-gray-600 space-y-1">
                                  {form.requiredDocs.map((doc, docIndex) => (
                                    <li key={docIndex} className="flex items-center">
                                      <FileText className="w-3 h-3 mr-2 text-gray-400" />
                                      {doc}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {form.link !== '#' && (
                                <a
                                  href={form.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                                >
                                  Access Form
                                  <ExternalLink className="w-3 h-3 ml-1" />
                                </a>
                              )}
                            </div>
                          </div>

                          <button 
                            className={`p-2 rounded-lg transition-colors ${
                              completedForms.has(form.name)
                                ? 'hover:bg-green-100 text-green-600' 
                                : 'hover:bg-gray-100 text-gray-600'
                            }`}
                          >
                            <Download className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center border border-gray-200">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Select Product and Destination
            </h3>
            <p className="text-gray-500">
              Choose your product category and destination country to generate a personalized documentation roadmap
            </p>
          </div>
        )}


        </div>
        </div>


    );}
export default ExportImportRoadmap;