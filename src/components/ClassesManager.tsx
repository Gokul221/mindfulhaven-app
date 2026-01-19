"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { ClassForm, ClassFormData } from "@/components/ClassForm";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Calendar, Clock, MapPin, Loader2 } from "lucide-react";
import { storage } from "@/lib/storage";

interface YogaClass {
    id: string;
    title: string;
    description?: string;
    startAt: string;
    endAt: string;
    capacity: number;
    priceCents: number;
    location?: string;
    trainerId: string;
}

export function ClassesManager() {
    const { user } = useAuth();
    const [classes, setClasses] = useState<YogaClass[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingClass, setEditingClass] = useState<YogaClass | null>(null);

    // Fetch classes for this trainer
    const fetchClasses = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/classes");
            if (res.ok) {
                const data = await res.json();
                // Filter for only this trainer's classes
                if (user?.trainer?.id) {
                    setClasses(data.filter((c: YogaClass) => c.trainerId === user.trainer?.id));
                }
            }
        } catch (error) {
            console.error("Failed to fetch classes", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.trainer?.id) {
            fetchClasses();
        }
    }, [user]);

    // Create a new class
    const handleCreate = async (data: ClassFormData) => {
        try {
            const token = storage.get<string>("token");
            const res = await fetch("/api/classes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setIsCreateOpen(false);
                fetchClasses();
            } else {
                const error = await res.json();
                alert(error.error || "Failed to create class");
            }
        } catch (error) {
            console.error("Error creating class:", error);
            alert("Failed to create class");
        }
    };

    // Update an existing class
    const handleUpdate = async (data: ClassFormData) => {
        if (!editingClass) return;
        try {
            const token = storage.get<string>("token");
            const res = await fetch(`/api/classes/${editingClass.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setEditingClass(null);
                fetchClasses();
            } else {
                const error = await res.json();
                alert(error.error || "Failed to update class");
            }
        } catch (error) {
            console.error("Error updating class:", error);
            alert("Failed to update class");
        }
    };

    // Delete a class
    const handleDelete = async (classId: string) => {
        if (!confirm("Are you sure you want to delete this class?")) return;

        try {
            const token = storage.get<string>("token");
            const res = await fetch(`/api/classes/${classId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.ok) {
                fetchClasses();
            } else {
                const error = await res.json();
                alert(error.error || "Failed to delete class");
            }
        } catch (error) {
            console.error("Error deleting class:", error);
            alert("Failed to delete class");
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="flex justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">My Classes</h2>
                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Create Class
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Create New Class</DialogTitle>
                            <DialogDescription>
                                Add a new yoga class to your schedule.
                            </DialogDescription>
                        </DialogHeader>
                        <ClassForm
                            onSubmit={handleCreate}
                            onCancel={() => setIsCreateOpen(false)}
                        />
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {classes.length === 0 ? (
                    <div className="col-span-full text-center text-muted-foreground py-12">
                        You haven't created any classes yet.
                    </div>
                ) : (
                    classes.map((cls) => (
                        <Card key={cls.id}>
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <CardTitle className="text-lg">{cls.title}</CardTitle>
                                        <CardDescription>{cls.location || "No location"}</CardDescription>
                                    </div>
                                    <div className="flex gap-1">
                                        <Dialog open={editingClass?.id === cls.id} onOpenChange={(open) => !open && setEditingClass(null)}>
                                            <DialogTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    onClick={() => setEditingClass(cls)}
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[500px]">
                                                <DialogHeader>
                                                    <DialogTitle>Edit Class</DialogTitle>
                                                </DialogHeader>
                                                <ClassForm
                                                    initialData={{
                                                        ...cls,
                                                        description: cls.description || "",
                                                        location: cls.location || "",
                                                    }}
                                                    onSubmit={handleUpdate}
                                                    onCancel={() => setEditingClass(null)}
                                                />
                                            </DialogContent>
                                        </Dialog>

                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-destructive hover:text-destructive"
                                            onClick={() => handleDelete(cls.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Calendar className="h-4 w-4" />
                                    <span>
                                        {new Date(cls.startAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Clock className="h-4 w-4" />
                                    <span>
                                        {new Date(cls.startAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -
                                        {new Date(cls.endAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <MapPin className="h-4 w-4" />
                                    <span>{cls.capacity} spots • ₹{(cls.priceCents / 100).toFixed(2)}</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
