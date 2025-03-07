"use client";

import { login } from "@/utils/api";
import { isAuthenticated, setAuthToken, setUserRoles } from "@/utils/auth";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FiAlertCircle, FiLock, FiUser } from "react-icons/fi";

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isAuthenticated()) {
            router.push("/");
        }
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await login({ username, password });

            if (response.data.status === "success") {
                setAuthToken(response.data.data.token);
                setUserRoles(response.data.data.roles);
                toast.success("Login successful!");
                router.push("/");
            }
        } catch (err: any) {
            const errorMessage =
                err.response?.data?.message ||
                "Failed to login. Please check your credentials.";
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background/95 to-background/90 relative overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-md z-10"
            >
                <div className="bg-card/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-border/50 p-8 overflow-hidden relative">
                    <div className="relative">
                        <div className="flex justify-center mb-8">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 20,
                                    delay: 0.3,
                                }}
                                className="p-4 bg-primary/10 rounded-full shadow-inner"
                            >
                                <Image
                                    src="/logo_black.webp"
                                    alt="Sysmanix logo"
                                    width={40}
                                    height={40}
                                    className="w-10 h-10 drop-shadow-md"
                                />
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                        >
                            <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                                Welcome Back
                            </h1>
                            <p className="text-muted-foreground text-center mb-8">
                                Sign in to access your system monitoring
                                dashboard
                            </p>
                        </motion.div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-destructive/10 text-destructive p-4 rounded-xl mb-6 flex items-start space-x-3 border border-destructive/20"
                            >
                                <FiAlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                <p className="text-sm font-medium">{error}</p>
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="space-y-6">
                                <motion.div
                                    className="space-y-2"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <label
                                        htmlFor="username"
                                        className="text-sm font-medium block mb-1.5"
                                    >
                                        Username
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground">
                                            <FiUser className="w-5 h-5" />
                                        </div>
                                        <input
                                            id="username"
                                            type="text"
                                            value={username}
                                            onChange={(e) =>
                                                setUsername(e.target.value)
                                            }
                                            className="w-full pl-11 py-3 border border-input bg-background/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all duration-200"
                                            placeholder="Enter your username"
                                            required
                                        />
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="space-y-2"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    <label
                                        htmlFor="password"
                                        className="text-sm font-medium block mb-1.5"
                                    >
                                        Password
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground">
                                            <FiLock className="w-5 h-5" />
                                        </div>
                                        <input
                                            id="password"
                                            type="password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            className="w-full pl-11 py-3 border border-input bg-background/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all duration-200"
                                            placeholder="Enter your password"
                                            required
                                        />
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 }}
                                    className="pt-2"
                                >
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        disabled={isLoading}
                                        className={`w-full py-3.5 rounded-xl font-medium text-primary-foreground bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-md transition-all duration-300 ${
                                            isLoading
                                                ? "opacity-70 cursor-not-allowed"
                                                : ""
                                        }`}
                                    >
                                        {isLoading
                                            ? "Signing in..."
                                            : "Sign In"}
                                    </motion.button>
                                </motion.div>
                            </div>
                        </form>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9 }}
                            className="mt-8 text-center"
                        >
                            <p className="text-sm text-muted-foreground">
                                Sysmanix - System Monitoring Dashboard
                            </p>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
