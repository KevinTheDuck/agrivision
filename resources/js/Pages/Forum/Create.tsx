import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import Navbar from '../../Components/Navbar';
import { Upload, X } from 'lucide-react';

export default function Create({ categories }: any) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        body: '',
        categories: [] as number[],
        image: null as File | null,
        auto_classify: false,
    });

    const [preview, setPreview] = useState<string | null>(null);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        // @ts-ignore
        post(route('forum.store'));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setData('image', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const toggleCategory = (id: number) => {
        if (data.categories.includes(id)) {
            setData('categories', data.categories.filter(c => c !== id));
        } else {
            setData('categories', [...data.categories, id]);
        }
    };

    return (
        <>
            <Head title="Create Post" />
            <div className="min-h-screen bg-background text-foreground font-primary selection:bg-brand selection:text-black">
                <Navbar />
                
                <main className="pt-24 pb-12 px-4 max-w-3xl mx-auto">
                    <div className="mb-8 border-b border-white/10 pb-4">
                        <h1 className="text-3xl font-headline font-bold text-white tracking-wider">
                            NEW TRANSMISSION
                        </h1>
                        <p className="text-brand/60 text-xs font-mono uppercase tracking-widest mt-2">
                            // Broadcast to the network
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                                Subject
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                className="w-full bg-black/40 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-brand font-mono text-sm"
                                placeholder="Enter subject..."
                            />
                            {errors.title && <p className="text-red-500 text-xs mt-1 font-mono">{errors.title}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                                Message Body
                            </label>
                            <textarea
                                value={data.body}
                                onChange={e => setData('body', e.target.value)}
                                rows={8}
                                className="w-full bg-black/40 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-brand font-mono text-sm"
                                placeholder="Enter message..."
                            />
                            {errors.body && <p className="text-red-500 text-xs mt-1 font-mono">{errors.body}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                                Categories
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {categories.map((cat: any) => (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        onClick={() => toggleCategory(cat.id)}
                                        className={`px-3 py-1 text-xs font-mono border transition-colors ${
                                            data.categories.includes(cat.id)
                                                ? 'bg-brand text-black border-brand'
                                                : 'border-white/10 text-zinc-400 hover:border-white/30'
                                        }`}
                                    >
                                        {cat.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                                Attachment
                            </label>
                            <div className="border border-white/10 border-dashed p-8 text-center hover:border-brand/50 transition-colors relative">
                                {preview ? (
                                    <div className="relative inline-block">
                                        <img src={preview} alt="Preview" className="max-h-64 rounded" />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setData('image', null);
                                                setPreview(null);
                                            }}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <input
                                            type="file"
                                            id="image"
                                            className="hidden"
                                            onChange={handleImageChange}
                                            accept="image/*"
                                        />
                                        <label htmlFor="image" className="cursor-pointer flex flex-col items-center gap-2 text-zinc-500 hover:text-brand transition-colors">
                                            <Upload size={24} />
                                            <span className="text-xs font-mono uppercase">Upload Image</span>
                                        </label>
                                    </>
                                )}
                            </div>
                            {errors.image && <p className="text-red-500 text-xs mt-1 font-mono">{errors.image}</p>}
                        </div>

                        {data.image && (
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="auto_classify"
                                    checked={data.auto_classify}
                                    onChange={e => setData('auto_classify', e.target.checked)}
                                    className="rounded border-white/10 bg-black/40 text-brand focus:ring-brand"
                                />
                                <label htmlFor="auto_classify" className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                                    Request Auto-Classification (AI Analysis)
                                </label>
                            </div>
                        )}

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-brand text-black font-bold py-3 px-8 hover:bg-white transition-colors uppercase tracking-wider text-sm disabled:opacity-50"
                            >
                                {processing ? 'Transmitting...' : 'Transmit'}
                            </button>
                        </div>
                    </form>
                </main>
            </div>
        </>
    );
}
