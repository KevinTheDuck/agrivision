import React, { useRef } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import { Camera, Save, User as UserIcon, Mail, Tag } from 'lucide-react';
import { PageProps } from '../../types';

export default function Edit({ mustVerifyEmail, status }: { mustVerifyEmail: boolean, status?: string }) {
    const user = usePage<PageProps>().props.auth.user;
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing, errors, recentlySuccessful } = useForm<{
        name: string;
        email: string;
        flair: string;
        avatar: File | null;
        _method: string;
    }>({
        name: user.name || '',
        email: user.email || '',
        flair: user.flair || '',
        avatar: null,
        _method: 'POST', // Changed to POST to handle file upload correctly with Laravel
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('profile.update'));
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setData('avatar', e.target.files[0]);
        }
    };

    return (
        <>
            <Head title="Profile" />
            <div className="min-h-screen bg-background text-foreground flex flex-col font-primary selection:bg-selectionBg selection:text-selectionText">
                <Navbar />

                <main className="flex-grow pt-24 pb-12 px-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10" />

                    <div className="max-w-4xl mx-auto">
                        <div className="mb-8 border-b border-white/10 pb-4">
                            <h1 className="text-3xl font-headline font-bold text-white tracking-wider">
                                OPERATOR PROFILE
                            </h1>
                            <p className="text-brand/60 text-xs font-mono uppercase tracking-widest mt-2">
                                // Update Personnel Records
                            </p>
                        </div>

                        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Avatar Section */}
                            <div className="md:col-span-1">
                                <div className="border border-white/10 bg-black/50 backdrop-blur-sm p-6 flex flex-col items-center relative group">
                                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brand" />
                                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-brand" />
                                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-brand" />
                                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-brand" />

                                    <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-white/20 mb-4 relative bg-zinc-900">
                                        {data.avatar ? (
                                            <img 
                                                src={URL.createObjectURL(data.avatar)} 
                                                alt="Preview" 
                                                className="w-full h-full object-cover"
                                            />
                                        ) : user.avatar ? (
                                            <img 
                                                src={user.avatar} 
                                                alt={user.name} 
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-zinc-600">
                                                <UserIcon size={48} />
                                            </div>
                                        )}
                                        
                                        <div 
                                            className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            <Camera className="text-white" />
                                        </div>
                                    </div>

                                    <input 
                                        type="file" 
                                        ref={fileInputRef}
                                        className="hidden"
                                        onChange={handleAvatarChange}
                                        accept="image/*"
                                    />

                                    <button 
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="text-xs font-mono text-brand hover:text-white transition-colors uppercase tracking-wider"
                                    >
                                        [ Upload New Image ]
                                    </button>
                                    
                                    {errors.avatar && (
                                        <p className="text-red-500 text-xs mt-2 font-mono">{errors.avatar}</p>
                                    )}
                                </div>
                            </div>

                            {/* Form Fields */}
                            <div className="md:col-span-2 space-y-6">
                                <div className="border border-white/10 bg-black/50 backdrop-blur-sm p-8 relative">
                                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brand" />
                                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-brand" />
                                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-brand" />
                                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-brand" />

                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                                <UserIcon size={12} /> Username
                                            </label>
                                            <input
                                                type="text"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all font-mono text-sm"
                                                placeholder="Enter username..."
                                            />
                                            {errors.name && (
                                                <p className="text-red-500 text-xs mt-1 font-mono">{errors.name}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                                <Mail size={12} /> Email Address
                                            </label>
                                            <input
                                                type="email"
                                                value={data.email}
                                                disabled
                                                className="w-full bg-white/5 border border-white/10 text-zinc-500 px-4 py-3 focus:outline-none cursor-not-allowed font-mono text-sm"
                                                placeholder="Enter email address..."
                                            />
                                            {errors.email && (
                                                <p className="text-red-500 text-xs mt-1 font-mono">{errors.email}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                                <Tag size={12} /> User Flair
                                            </label>
                                            <input
                                                type="text"
                                                value={data.flair}
                                                onChange={(e) => setData('flair', e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all font-mono text-sm"
                                                placeholder="e.g. Senior Agronomist"
                                            />
                                            {errors.flair && (
                                                <p className="text-red-500 text-xs mt-1 font-mono">{errors.flair}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-8 flex items-center justify-between">
                                        <div className="text-xs font-mono text-zinc-500">
                                            {recentlySuccessful && (
                                                <span className="text-brand">
                                                    // CHANGES SAVED SUCCESSFULLY
                                                </span>
                                            )}
                                        </div>
                                        
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="bg-brand text-black hover:bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 disabled:opacity-50"
                                        >
                                            <Save size={16} />
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </main>

                <footer className="py-6 text-center border-t border-white/5 bg-black/50 backdrop-blur-sm relative z-10">
                    <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">
                        Agrivision Systems © {new Date().getFullYear()} // Secure Access Terminal
                    </p>
                </footer>
            </div>
        </>
    );
}
