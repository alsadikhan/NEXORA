import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { ColorVariant } from '@/types/product';

export type ProductFormStep = 'basic' | 'details' | 'pricing' | 'images' | 'inventory' | 'variants' | 'seo' | 'preview';

export interface ProductFormState {
  // Basic Information
  name: string;
  sku: string;
  description: string;
  longDescription: { title: string; content: string }[];
  category: string;
  subCategory: string;
  
  // Pricing
  price: string;
  comparePrice: string;
  costPrice: string;
  
  // Product Status
  isNew: boolean;
  isFeatured: boolean;
  isBestSeller: boolean;
  isOnSale: boolean;
  isActive: boolean;
  
  // Inventory
  inStock: boolean;
  stock: string;
  reservedStock: string;
  lowStockThreshold: string;
  reorderPoint: string;
  
  // Images
  mainImage: string;
  additionalImages: string[];
  
  // Variants
  hasColorOptions: boolean;
  colorVariants: ColorVariant[];
  currentColor: ColorVariant;
  sizes: string[];
  
  // Product Details
  careInstructions: string[];
  features: string[];
  currentFeature: string;
  currentCareInstruction: string;
  currentLongDescription: { title: string; content: string };
  
  // SEO & Marketing
  metaTitle: string;
  metaDescription: string;
  urlSlug: string;
  tags: string[];
  currentTag: string;
  
  // Specifications
  specifications: { label: string; value: string }[];
  
  // Bulk Pricing
  bulkPricing: {
    minQuantity: string;
    maxQuantity: string;
    price: string;
  }[];
}

export function useProductForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState<ProductFormStep>('basic');
  const [completedSteps, setCompletedSteps] = useState<ProductFormStep[]>([]);
  
  const [formState, setFormState] = useState<ProductFormState>({
    // Basic Information
    name: '',
    sku: '',
    description: '',
    longDescription: [],
    category: '',
    subCategory: '',
    
    // Pricing
    price: '',
    comparePrice: '',
    costPrice: '',
    
    // Product Status
    isNew: false,
    isFeatured: false,
    isBestSeller: false,
    isOnSale: false,
    isActive: true,
    
    // Inventory
    inStock: true,
    stock: '',
    reservedStock: '0',
    lowStockThreshold: '10',
    reorderPoint: '5',
    
    // Images
    mainImage: '',
    additionalImages: [],
    
    // Variants
    hasColorOptions: false,
    colorVariants: [],
    currentColor: {
      color: '#000000',
      name: 'Black',
      image: ''
    },
    sizes: [],
    
    // Product Details
    careInstructions: [],
    features: [],
    currentFeature: '',
    currentCareInstruction: '',
    currentLongDescription: { title: '', content: '' },
    
    // SEO & Marketing
    metaTitle: '',
    metaDescription: '',
    urlSlug: '',
    tags: [],
    currentTag: '',
    
    // Specifications
    specifications: [{ label: '', value: '' }],
    
    // Bulk Pricing
    bulkPricing: []
  });

  const updateFormField = <K extends keyof ProductFormState>(
    field: K, 
    value: ProductFormState[K]
  ) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: ProductFormStep): boolean => {
    switch (step) {
      case 'basic':
        if (!formState.name.trim()) {
          toast.error('Product name is required');
          return false;
        }
        if (!formState.sku.trim()) {
          toast.error('SKU is required');
          return false;
        }
        if (!formState.category) {
          toast.error('Please select a category');
          return false;
        }
        if (!formState.description.trim()) {
          toast.error('Product description is required');
          return false;
        }
        return true;

      case 'details':
        if (formState.features.length === 0) {
          toast.error('Please add at least one product feature');
          return false;
        }
        return true;

      case 'pricing':
        if (!formState.price || isNaN(Number(formState.price)) || Number(formState.price) <= 0) {
          toast.error('Please enter a valid price');
          return false;
        }
        return true;

      case 'images':
        if (!formState.mainImage.trim()) {
          toast.error('Main image URL is required');
          return false;
        }
        return true;

      case 'inventory':
        if (formState.inStock && (!formState.stock || isNaN(Number(formState.stock)))) {
          toast.error('Please enter a valid stock quantity');
          return false;
        }
        return true;

      case 'variants':
        if (formState.hasColorOptions && formState.colorVariants.length === 0) {
          toast.error('Please add at least one color variant');
          return false;
        }
        return true;

      case 'seo':
        if (!formState.metaTitle.trim()) {
          toast.error('Meta title is required');
          return false;
        }
        if (!formState.metaDescription.trim()) {
          toast.error('Meta description is required');
          return false;
        }
        if (!formState.urlSlug.trim()) {
          toast.error('URL slug is required');
          return false;
        }
        return true;

      case 'preview':
        return true;

      default:
        return true;
    }
  };

  const goToNextStep = () => {
    if (validateStep(currentStep)) {
      // Mark current step as completed
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }

      // Move to next step
      switch (currentStep) {
        case 'basic':
          setCurrentStep('details');
          break;
        case 'details':
          setCurrentStep('pricing');
          break;
        case 'pricing':
          setCurrentStep('images');
          break;
        case 'images':
          setCurrentStep('inventory');
          break;
        case 'inventory':
          setCurrentStep('variants');
          break;
        case 'variants':
          setCurrentStep('seo');
          break;
        case 'seo':
          setCurrentStep('preview');
          break;
        default:
          break;
      }
    }
  };

  const goToPreviousStep = () => {
    switch (currentStep) {
      case 'details':
        setCurrentStep('basic');
        break;
      case 'pricing':
        setCurrentStep('details');
        break;
      case 'images':
        setCurrentStep('pricing');
        break;
      case 'inventory':
        setCurrentStep('images');
        break;
      case 'variants':
        setCurrentStep('inventory');
        break;
      case 'seo':
        setCurrentStep('variants');
        break;
      case 'preview':
        setCurrentStep('seo');
        break;
      default:
        break;
    }
  };

  const goToStep = (step: ProductFormStep) => {
    // Only allow navigation to completed steps or the next incomplete step
    if (completedSteps.includes(step) || 
        getStepIndex(step) === getStepIndex(currentStep) + 1) {
      setCurrentStep(step);
    }
  };

  const getStepIndex = (step: ProductFormStep): number => {
    const steps: ProductFormStep[] = ['basic', 'details', 'pricing', 'images', 'inventory', 'variants', 'seo', 'preview'];
    return steps.indexOf(step);
  };

  // Helper functions for form fields
  const handleAddColorVariant = () => {
    if (formState.currentColor.color && formState.currentColor.name && formState.currentColor.image) {
      setFormState(prev => ({
        ...prev,
        colorVariants: [...prev.colorVariants, { ...prev.currentColor }],
        currentColor: {
          color: '#000000',
          name: 'Black',
          image: ''
        }
      }));
    } else {
      toast.error('Please fill all color variant fields');
    }
  };

  const handleRemoveColorVariant = (index: number) => {
    setFormState(prev => {
      const updatedVariants = [...prev.colorVariants];
      updatedVariants.splice(index, 1);
      return { ...prev, colorVariants: updatedVariants };
    });
  };

  const handleAddSpecification = () => {
    setFormState(prev => ({
      ...prev,
      specifications: [...prev.specifications, { label: '', value: '' }]
    }));
  };

  const handleRemoveSpecification = (index: number) => {
    setFormState(prev => {
      const updatedSpecs = [...prev.specifications];
      updatedSpecs.splice(index, 1);
      return { ...prev, specifications: updatedSpecs };
    });
  };

  const handleSpecificationChange = (index: number, field: 'label' | 'value', value: string) => {
    setFormState(prev => {
      const updatedSpecs = [...prev.specifications];
      updatedSpecs[index] = { ...updatedSpecs[index], [field]: value };
      return { ...prev, specifications: updatedSpecs };
    });
  };

  const handleSizeToggle = (size: string) => {
    setFormState(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }));
  };

  const handleAddTag = () => {
    if (formState.currentTag.trim()) {
      setFormState(prev => ({
        ...prev,
        tags: [...prev.tags, prev.currentTag.trim()],
        currentTag: ''
      }));
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormState(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const handleAddFeature = () => {
    if (formState.currentFeature.trim()) {
      setFormState(prev => ({
        ...prev,
        features: [...prev.features, prev.currentFeature.trim()],
        currentFeature: ''
      }));
    }
  };

  const handleRemoveFeature = (feature: string) => {
    setFormState(prev => ({
      ...prev,
      features: prev.features.filter(f => f !== feature)
    }));
  };

  const handleAddCareInstruction = () => {
    if (formState.currentCareInstruction.trim()) {
      setFormState(prev => ({
        ...prev,
        careInstructions: [...prev.careInstructions, prev.currentCareInstruction.trim()],
        currentCareInstruction: ''
      }));
    }
  };

  const handleRemoveCareInstruction = (instruction: string) => {
    setFormState(prev => ({
      ...prev,
      careInstructions: prev.careInstructions.filter(c => c !== instruction)
    }));
  };

  const handleAddLongDescription = () => {
    if (formState.currentLongDescription.title.trim() && formState.currentLongDescription.content.trim()) {
      setFormState(prev => ({
        ...prev,
        longDescription: [...prev.longDescription, { ...prev.currentLongDescription }],
        currentLongDescription: { title: '', content: '' }
      }));
    }
  };

  const handleRemoveLongDescription = (index: number) => {
    setFormState(prev => {
      const updatedDescriptions = [...prev.longDescription];
      updatedDescriptions.splice(index, 1);
      return { ...prev, longDescription: updatedDescriptions };
    });
  };

  const handleAddAdditionalImage = (url: string) => {
    if (url.trim() && !formState.additionalImages.includes(url.trim())) {
      setFormState(prev => ({
        ...prev,
        additionalImages: [...prev.additionalImages, url.trim()]
      }));
    }
  };

  const handleRemoveAdditionalImage = (index: number) => {
    setFormState(prev => {
      const updatedImages = [...prev.additionalImages];
      updatedImages.splice(index, 1);
      return { ...prev, additionalImages: updatedImages };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Product created successfully!');
      router.push('/admin/products');
    } catch {
      toast.error('Failed to create product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formState,
    updateFormField,
    currentStep,
    completedSteps,
    isSubmitting,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    handleAddColorVariant,
    handleRemoveColorVariant,
    handleAddSpecification,
    handleRemoveSpecification,
    handleSpecificationChange,
    handleSizeToggle,
    handleAddTag,
    handleRemoveTag,
    handleAddFeature,
    handleRemoveFeature,
    handleAddCareInstruction,
    handleRemoveCareInstruction,
    handleAddLongDescription,
    handleRemoveLongDescription,
    handleAddAdditionalImage,
    handleRemoveAdditionalImage,
    handleSubmit
  };
} 