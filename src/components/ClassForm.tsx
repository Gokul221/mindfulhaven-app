"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export interface ClassFormData {
    title: string;
    description: string;
    startAt: string;
    endAt: string;
    capacity: number;
    priceCents: number;
    location: string;
}

interface ClassFormProps {
    initialData?: ClassFormData;
    onSubmit: (data: ClassFormData) => Promise<void>;
    isLoading?: boolean;
    onCancel: () => void;
}

export function ClassForm({ initialData, onSubmit, isLoading, onCancel }: ClassFormProps) {
    const [formData, setFormData] = useState<ClassFormData>({
        title: initialData?.title || "",
        description: initialData?.description || "",
        startAt: initialData?.startAt ? new Date(initialData.startAt).toISOString().slice(0, 16) : "",
        endAt: initialData?.endAt ? new Date(initialData.endAt).toISOString().slice(0, 16) : "",
        capacity: initialData?.capacity || 10,
        priceCents: initialData?.priceCents || 0,
        location: initialData?.location || "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "capacity" || name === "priceCents" ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                    id="title"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Morning Flow"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="A gentle start to your day..."
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="startAt">Start Time</Label>
                    <Input
                        id="startAt"
                        name="startAt"
                        type="datetime-local"
                        required
                        value={formData.startAt}
                        onChange={handleChange}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="endAt">End Time</Label>
                    <Input
                        id="endAt"
                        name="endAt"
                        type="datetime-local"
                        required
                        value={formData.endAt}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="capacity">Capacity</Label>
                    <Input
                        id="capacity"
                        name="capacity"
                        type="number"
                        min="1"
                        required
                        value={formData.capacity}
                        onChange={handleChange}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="priceCents">Price (Cents)</Label>
                    <Input
                        id="priceCents"
                        name="priceCents"
                        type="number"
                        min="0"
                        required
                        value={formData.priceCents}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Studio A"
                />
            </div>

            <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
                    Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Class"}
                </Button>
            </div>
        </form>
    );
}
