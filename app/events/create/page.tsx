"use client"

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Clock, MapPin, Tag } from "lucide-react";
import Image from "next/image";

interface FormData {
    title: string;
    description: string;
    overview: string;
    date: string;
    time: string;
    venue: string;
    location: string;
    mode: string;
    audience: string;
    organizer: string;
    tags: string[];
    agenda: string[];
    image: File | null;
}

export default function CreateEventPage() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [formData, setFormData] = useState<FormData>({
        title: "",
        description: "",
        overview: "",
        date: "",
        time: "",
        venue: "",
        location: "",
        mode: "",
        audience: "",
        organizer: "",
        tags: [],
        agenda: [],
        image: null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleTagChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const value = e.currentTarget.value.trim();
            if (value) {
                setFormData((prev) => ({
                    ...prev,
                    tags: [...prev.tags, value],
                }));
                e.currentTarget.value = "";
            }
        }
    };

    const handleAgendaChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const value = e.currentTarget.value.trim();
            if (value) {
                setFormData((prev) => ({
                    ...prev,
                    agenda: [...prev.agenda, value],
                }));
                e.currentTarget.value = "";
            }
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData((prev) => ({ ...prev, image: file }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageUpload = () => {
        fileInputRef.current?.click();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("overview", formData.overview);
        formDataToSend.append("date", formData.date);
        formDataToSend.append("time", formData.time);
        formDataToSend.append("venue", formData.venue);
        formDataToSend.append("location", formData.location);
        formDataToSend.append("mode", formData.mode);
        formDataToSend.append("audience", formData.audience);
        formDataToSend.append("organizer", formData.organizer);
        formDataToSend.append("tags", JSON.stringify(formData.tags));
        formDataToSend.append("agenda", JSON.stringify(formData.agenda));

        if (formData.image) {
            formDataToSend.append("image", formData.image);
        }

        try {
            const response = await fetch("/api/events", {
                method: "POST",
                body: formDataToSend,
            });

            if (!response.ok) {
                throw new Error("Failed to create event");
            }

            await response.json();
            router.push("/");
        } catch (error) {
            console.error("Error creating event:", error);
        }
    };

    return (
        <section className="p-10 max-w-5xl mx-auto">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-white mb-2">Create New Event</h1>
                <p className="text-gray-400">Share your event with the world</p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="bg-gray-900 rounded-xl border border-white/10 p-6 space-y-6"
            >
                {/* Image Upload */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Event Image</label>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        accept="image/*"
                        className="hidden"
                    />
                    <div
                        onClick={handleImageUpload}
                        className="relative w-full h-48 rounded-xl border-2 border-dashed border-gray-600 cursor-pointer hover:border-emerald-500 transition flex items-center justify-center overflow-hidden"
                    >
                        {imagePreview ? (
                            <Image
                                src={imagePreview}
                                alt="Preview"
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="text-center">
                                <div className="w-12 h-12 mx-auto bg-gray-800 rounded-full flex items-center justify-center mb-3">
                                    <Tag className="w-6 h-6 text-gray-400" />
                                </div>
                                <p className="text-gray-400 text-sm">Click to upload image</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full p-3 rounded-lg border border-white/10 bg-white/5 text-white"
                            placeholder="e.g., AI Innovation Summit 2026"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Description</label>
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="w-full p-3 rounded-lg border border-white/10 bg-white/5 text-white"
                            placeholder="Short description"
                        />
                    </div>
                </div>

                {/* Event Details */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Overview</label>
                    <textarea
                        name="overview"
                        value={formData.overview}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full p-3 rounded-lg border border-white/10 bg-white/5 text-white"
                        placeholder="Detailed overview of the event"
                    ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Date</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                                className="w-full p-3 pl-10 rounded-lg border border-white/10 bg-white/5 text-white"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Time</label>
                        <div className="relative">
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                type="time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                required
                                className="w-full p-3 pl-10 rounded-lg border border-white/10 bg-white/5 text-white"
                            />
                        </div>
                    </div>
                </div>

                {/* Location, Venue & Mode */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Venue</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                type="text"
                                name="venue"
                                value={formData.venue}
                                onChange={handleChange}
                                required
                                className="w-full p-3 pl-10 rounded-lg border border-white/10 bg-white/5 text-white"
                                placeholder="e.g., Main Hall B"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Location</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                required
                                className="w-full p-3 pl-10 rounded-lg border border-white/10 bg-white/5 text-white"
                                placeholder="e.g., Convention Center, New York"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Mode</label>
                        <select
                            name="mode"
                            value={formData.mode}
                            onChange={handleChange}
                            required
                            className="w-full p-3 rounded-lg border border-white/10 bg-white/5 text-white"
                        >
                            <option value="" className="bg-gray-900">Select mode</option>
                            <option value="online" className="bg-gray-900">Online</option>
                            <option value="offline" className="bg-gray-900">Offline</option>
                            <option value="hybrid" className="bg-gray-900">Hybrid</option>
                        </select>
                    </div>
                </div>

                {/* Additional Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Audience</label>
                        <input
                            type="text"
                            name="audience"
                            value={formData.audience}
                            onChange={handleChange}
                            required
                            className="w-full p-3 rounded-lg border border-white/10 bg-white/5 text-white"
                            placeholder="e.g., Developers, Students"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Organizer</label>
                        <input
                            type="text"
                            name="organizer"
                            value={formData.organizer}
                            onChange={handleChange}
                            required
                            className="w-full p-3 rounded-lg border border-white/10 bg-white/5 text-white"
                            placeholder="e.g., Tech Innovators Inc."
                        />
                    </div>
                </div>

                {/* Tags */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Tags (Press Enter to add)</label>
                    <div className="flex flex-wrap gap-2">
                        {formData.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-sm border border-emerald-500/20"
                            >
                                {tag}
                            </span>
                        ))}
                        <input
                            type="text"
                            onKeyDown={handleTagChange}
                            className="flex-1 p-3 rounded-lg border border-white/10 bg-white/5 text-white"
                            placeholder="Add a tag..."
                        />
                    </div>
                </div>

                {/* Agenda */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Agenda (Press Enter to add)</label>
                    <div className="flex flex-wrap gap-2">
                        {formData.agenda.map((item, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm border border-blue-500/20"
                            >
                                {item}
                            </span>
                        ))}
                        <input
                            type="text"
                            onKeyDown={handleAgendaChange}
                            className="flex-1 p-3 rounded-lg border border-white/10 bg-white/5 text-white"
                            placeholder="Add an agenda item..."
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 transition rounded-lg font-medium"
                    >
                        Create Event
                    </button>
                </div>
            </form>
        </section>
    );
}