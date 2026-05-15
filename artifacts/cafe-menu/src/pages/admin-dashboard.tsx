import { useState } from "react";
import { useLocation } from "wouter";
import { useMenuStore } from "@/lib/menu-store";
import { MenuItem } from "@/lib/types";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Plus, LogOut, Edit2, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const categories = [
  { id: "hot_coffee",   label: "هوت كوفي" },
  { id: "iced_coffee",  label: "ايس كوفي" },
  { id: "hot_drinks",   label: "مشروبات ساخنة" },
  { id: "specialty",    label: "مختصة" },
  { id: "fresh_juices", label: "عصائر طبيعية" },
  { id: "cold_drinks",  label: "مشروبات باردة" },
  { id: "mojito",       label: "موهيتو" },
  { id: "milkshake",    label: "ميلك شيك" },
  { id: "energy",       label: "مشروبات طاقة" },
  { id: "soft_drinks",  label: "سوفت درنك" },
  { id: "crepe",        label: "كريب" },
  { id: "waffle",       label: "وافل" },
  { id: "pancake",      label: "بان كيك" },
];

const formSchema = z.object({
  name: z.string().min(1, "الاسم مطلوب"),
  description: z.string().optional(),
  price: z.coerce.number().min(0, "السعر يجب أن يكون 0 أو أكثر"),
  category: z.string().min(1, "الفئة مطلوبة"),
  available: z.boolean().default(true),
  sortOrder: z.coerce.number().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { logout } = useAuth();
  const { toast } = useToast();
  const { items, addItem, updateItem, deleteItem } = useMenuStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: "",
      available: true,
      sortOrder: 0,
    },
  });

  const handleLogout = () => {
    logout();
    setLocation("/admin");
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    form.reset({
      name: item.name,
      description: item.description || "",
      price: Number(item.price),
      category: item.category,
      available: item.available,
      sortOrder: item.sortOrder || 0,
    });
    setIsDialogOpen(true);
  };

  const handleOpenNew = () => {
    setEditingItem(null);
    form.reset({
      name: "",
      description: "",
      price: 0,
      category: "",
      available: true,
      sortOrder: 0,
    });
    setIsDialogOpen(true);
  };

  const onSubmit = (values: FormValues) => {
    if (editingItem) {
      updateItem(editingItem.id, {
        name: values.name,
        description: values.description || null,
        price: values.price,
        category: values.category,
        available: values.available,
        sortOrder: values.sortOrder ?? 0,
      });
      toast({ title: "تم التحديث بنجاح" });
    } else {
      addItem({
        name: values.name,
        description: values.description || null,
        price: values.price,
        category: values.category,
        available: values.available,
        sortOrder: values.sortOrder ?? 0,
      });
      toast({ title: "تمت الإضافة بنجاح" });
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("هل أنت متأكد من حذف هذا العنصر؟")) {
      deleteItem(id);
      toast({ title: "تم الحذف بنجاح" });
    }
  };

  const handleToggleAvailable = (item: MenuItem) => {
    updateItem(item.id, { available: !item.available });
  };

  const sortedItems = [...items].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-foreground">لوحة التحكم</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="ml-2 h-4 w-4" />
            تسجيل الخروج
          </Button>
        </div>

        <div className="bg-card rounded-lg shadow-sm border overflow-hidden">
          <div className="p-4 border-b flex justify-between items-center bg-muted/20">
            <h2 className="text-xl font-semibold">قائمة المنتجات ({items.length})</h2>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleOpenNew}>
                  <Plus className="ml-2 h-4 w-4" />
                  إضافة منتج
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{editingItem ? "تعديل المنتج" : "إضافة منتج جديد"}</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>الاسم</FormLabel>
                          <FormControl>
                            <Input placeholder="اسم المنتج" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>الوصف (اختياري)</FormLabel>
                          <FormControl>
                            <Input placeholder="وصف المنتج" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>السعر (د.ع)</FormLabel>
                            <FormControl>
                              <Input type="number" step="250" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>الفئة</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="اختر الفئة" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {categories.map((cat) => (
                                  <SelectItem key={cat.id} value={cat.id}>
                                    {cat.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="sortOrder"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>الترتيب</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="available"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 mt-8">
                            <div className="space-y-0.5">
                              <FormLabel>متاح</FormLabel>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      حفظ
                    </Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">الاسم</TableHead>
                  <TableHead className="text-right">الفئة</TableHead>
                  <TableHead className="text-right">السعر</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">الترتيب</TableHead>
                  <TableHead className="text-left">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>
                      {categories.find((c) => c.id === item.category)?.label || item.category}
                    </TableCell>
                    <TableCell>{Number(item.price).toLocaleString("ar-IQ")} د.ع</TableCell>
                    <TableCell>
                      <Switch
                        checked={item.available}
                        onCheckedChange={() => handleToggleAvailable(item)}
                      />
                    </TableCell>
                    <TableCell>{item.sortOrder ?? 0}</TableCell>
                    <TableCell className="text-left">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(item)}
                        className="mr-2"
                      >
                        <Edit2 className="h-4 w-4 text-blue-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {items.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      لا توجد منتجات
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
