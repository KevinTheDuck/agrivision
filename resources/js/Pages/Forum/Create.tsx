import React, { useState } from 'react';
import { Head, useForm, usePage, Link } from '@inertiajs/react';
import Navbar from '../../Components/Navbar';
import FlashMessage from '../../Components/FlashMessage';
import { Upload, X, Shield, Check } from 'lucide-react';

export default function Create({ categories }: any) {
    const { auth } = usePage().props as any;
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        body: '',
        categories: [] as number[],
        image: null as File | null,
        auto_classify: false,
    });

    const [preview, setPreview] = useState<string | null>(null);
    const isModerator = auth.user && (auth.user.role === 'moderator' || auth.user.role === 'admin');

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
                <FlashMessage />
                
                <main className="pt-24 pb-12 px-4 max-w-3xl mx-auto">
                    <div className="mb-8 border-b border-white/10 pb-4">
                        <h1 className="text-3xl font-headline font-bold text-white tracking-wider">
                            NEW TRANSMISSION
                        </h1>
                        <p className="text-brand/60 text-xs font-primary uppercase tracking-widest mt-2">
                            // Broadcast to the network
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label className="block text-xs font-primary text-zinc-400 uppercase tracking-wider mb-2">
                                Subject
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                className="w-full bg-black/40 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-brand font-primary text-sm"
                                placeholder="Enter subject..."
                            />
                            {errors.title && <p className="text-red-500 text-xs mt-1 font-primary">{errors.title}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-primary text-zinc-400 uppercase tracking-wider mb-2">
                                Message Body
                            </label>
                            <textarea
                                value={data.body}
                                onChange={e => setData('body', e.target.value)}
                                rows={8}
                                className="w-full bg-black/40 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-brand font-primary text-sm"
                                placeholder="Enter message..."
                            />
                            {errors.body && <p className="text-red-500 text-xs mt-1 font-primary">{errors.body}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-primary text-zinc-400 uppercase tracking-wider mb-2">
                                Categories
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {categories.filter((cat: any) => !cat.is_restricted || isModerator).map((cat: any) => (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        onClick={() => toggleCategory(cat.id)}
                                        className={`px-3 py-1 text-xs font-primary border transition-colors flex items-center gap-2 ${
                                            data.categories.includes(cat.id)
                                                ? 'bg-brand text-black border-brand'
                                                : 'border-white/10 text-zinc-400 hover:border-white/30'
                                        }`}
                                    >
                                        {cat.is_restricted && <Shield size={10} />}
                                        {cat.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-primary text-zinc-400 uppercase tracking-wider mb-2">
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
                                            <span className="text-xs font-primary uppercase">Upload Image</span>
                                        </label>
                                    </>
                                )}
                            </div>
                            {errors.image && <p className="text-red-500 text-xs mt-1 font-primary">{errors.image}</p>}
                        </div>

                        {data.image && (
                            <div 
                                onClick={() => setData('auto_classify', !data.auto_classify)}
                                className={`cursor-pointer border p-4 flex items-center justify-between transition-all ${
                                    data.auto_classify 
                                        ? 'bg-brand/10 border-brand' 
                                        : 'bg-black/40 border-white/10 hover:border-white/30'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-5 h-5 border flex items-center justify-center transition-colors ${
                                        data.auto_classify ? 'border-brand bg-brand text-black' : 'border-zinc-600'
                                    }`}>
                                        {data.auto_classify && <Check size={14} />}
                                    </div>
                                    <div>
                                        <div className={`text-sm font-bold uppercase tracking-wider ${data.auto_classify ? 'text-brand' : 'text-white'}`}>
                                            Request Auto-Classification
                                        </div>
                                        <div className="text-xs text-zinc-500 font-primary">
                                            Enable AI analysis for crop disease identification
                                        </div>
                                    </div>
                                </div>
                                <div className={`text-xs font-mono uppercase px-2 py-1 border ${
                                    data.auto_classify ? 'border-brand text-brand' : 'border-zinc-700 text-zinc-700'
                                }`}>
                                    {data.auto_classify ? 'ACTIVE' : 'OFFLINE'}
                                </div>
                            </div>
                        )}

                        <div className="flex justify-end gap-4">
                            <Link
                                // @ts-ignore
                                href={route('forum.index')}
                                className="px-6 py-3 text-sm font-primary uppercase tracking-wider text-zinc-400 hover:text-white transition-colors flex items-center"
                            >
                                Cancel
                            </Link>
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
