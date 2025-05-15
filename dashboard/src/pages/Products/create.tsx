/** @format */

import { useState, useRef, ChangeEvent } from "react";
import { Plus, Upload, X, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { createProduct } from "@/slicer/products/productsSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

export function CreateProduct() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    brand: "",
    category_id: "",
    seller_id: "1", // Default seller as in your controller
  });

  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    
    // Validate file types and sizes (matches your multer config)
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const maxSize = 50 * 1024 * 1024; // 50MB
    
    const validFiles = files.filter(file => {
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Only JPEG, JPG, and PNG files are allowed",
          variant: "destructive",
        });
        return false;
      }
      if (file.size > maxSize) {
        toast({
          title: "File too large",
          description: "Maximum file size is 50MB",
          variant: "destructive",
        });
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    const newPreviewUrls: string[] = [];
    
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviewUrls.push(reader.result as string);
        if (newPreviewUrls.length === validFiles.length) {
          setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
          setImages(prev => [...prev, ...validFiles]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    const newPreviews = [...previewUrls];
    
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setImages(newImages);
    setPreviewUrls(newPreviews);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.price) newErrors.price = "Price is required";
    if (isNaN(Number(formData.price))) newErrors.price = "Price must be a number";
    if (Number(formData.price) <= 0) newErrors.price = "Price must be greater than 0";
    if (!formData.stock) newErrors.stock = "Stock is required";
    if (isNaN(Number(formData.stock))) newErrors.stock = "Stock must be a number";
    if (Number(formData.stock) < 0) newErrors.stock = "Stock cannot be negative";
    if (!formData.category_id) newErrors.category_id = "Category is required";
    if (images.length === 0) newErrors.images = "At least one image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsUploading(true);

    // Create FormData that matches your backend expectations
    const formDataWithImages = new FormData();
    formDataWithImages.append("name", formData.name);
    formDataWithImages.append("description", formData.description);
    formDataWithImages.append("price", formData.price);
    formDataWithImages.append("stock", formData.stock);
    formDataWithImages.append("brand", formData.brand);
    formDataWithImages.append("category_id", formData.category_id);
    formDataWithImages.append("seller_id", formData.seller_id);
    
    // Append each image file
    images.forEach((file) => {
      formDataWithImages.append("images", file); // Matches your multer config
    });

    try {
      await dispatch(createProduct(formDataWithImages)).unwrap();
      toast({
        title: "Product created successfully",
        description: "Your new product has been added",
      });
      navigate("/Products");
    } catch (error) {
      console.error("Failed to create product:", error);
      toast({
        title: "Error creating product",
        description: "There was an error while creating the product",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const categories = [
    { id: "1", name: "Electronics" },
    { id: "2", name: "Clothing" },
    { id: "3", name: "Home & Garden" },
    { id: "4", name: "Sports & Outdoors" },
    { id: "5", name: "Health & Beauty" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Create Product</h1>
        <Button onClick={() => navigate("/Products")} variant="outline">
          Back to Products
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="brand">Brand</Label>
                <Input
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  placeholder="Enter brand name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                />
                {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock">Stock *</Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="0"
                />
                {errors.stock && <p className="text-sm text-red-500">{errors.stock}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category_id">Category *</Label>
                <Select
                  onValueChange={(value) =>
                    setFormData({ ...formData, category_id: value })
                  }
                  value={formData.category_id}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category_id && (
                  <p className="text-sm text-red-500">{errors.category_id}</p>
                )}
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Product Images *</Label>
                <div className="flex flex-col gap-4">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/jpeg, image/jpg, image/png"
                    multiple
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={triggerFileInput}
                    className="gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    Upload Images (JPEG, JPG, PNG up to 50MB)
                  </Button>
                  
                  {errors.images && (
                    <p className="text-sm text-red-500">{errors.images}</p>
                  )}
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {previewUrls.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url}
                          alt={`Preview ${index + 1}`}
                          className="h-32 w-full object-cover rounded-md border"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute top-1 right-1 h-8 w-8 rounded-full bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter product description"
                rows={4}
              />
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/products")}
                disabled={isUploading}
              >
                Cancel
              </Button>
              <Button type="submit" className="gap-2" disabled={isUploading}>
                {isUploading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    Create Product
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}