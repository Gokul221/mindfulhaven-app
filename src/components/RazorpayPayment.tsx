"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { storage } from "@/lib/storage";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface RazorpayPaymentProps {
    bookingId: string;
    onSuccess?: () => void;
    onError?: (error: string) => void;
    className?: string; // Add className prop
}

export function RazorpayPayment({ bookingId, onSuccess, onError, className }: RazorpayPaymentProps) {
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const router = useRouter();

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        if (!user) {
            router.push("/login");
            return;
        }

        setLoading(true);
        try {
            const res = await loadRazorpayScript();

            if (!res) {
                onError?.("Razorpay SDK failed to load. Are you online?");
                setLoading(false);
                return;
            }

            const token = storage.get<string>("token");

            // 1. Create Order
            const orderRes = await fetch("/api/payments/razorpay/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ bookingId }),
            });

            if (!orderRes.ok) {
                const error = await orderRes.json();
                throw new Error(error.error || "Failed to create order");
            }

            const orderData = await orderRes.json();

            // 2. Open Razorpay
            const options = {
                key: orderData.keyId,
                amount: orderData.amount,
                currency: orderData.currency,
                name: "Mindful Haven",
                description: "Class Booking",
                order_id: orderData.orderId,
                handler: async function (response: any) {
                    try {
                        // 3. Verify Payment
                        const verifyRes = await fetch("/api/payments/razorpay/verify", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`,
                            },
                            body: JSON.stringify({
                                orderCreationId: orderData.orderId,
                                razorpayPaymentId: response.razorpay_payment_id,
                                razorpaySignature: response.razorpay_signature,
                                bookingId: bookingId,
                            }),
                        });

                        if (!verifyRes.ok) {
                            const error = await verifyRes.json();
                            throw new Error(error.error || "Payment verification failed");
                        }

                        onSuccess?.();

                    } catch (err: any) {
                        console.error("Verification Error:", err);
                        onError?.(err.message || "Payment verification failed");
                    }
                },
                prefill: {
                    name: user.name,
                    email: user.email,
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const paymentObject = new (window as any).Razorpay(options);
            paymentObject.open();
        } catch (error: any) {
            console.error("Payment Error:", error);
            onError?.(error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button onClick={handlePayment} disabled={loading} className={className}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Pay Now
        </Button>
    );
}
