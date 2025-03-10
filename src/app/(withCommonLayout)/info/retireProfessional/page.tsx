import { BrainCircuit, Clock, DollarSign, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function page() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
            <div className="container mx-auto px-4 py-12 ">
                <header className="mb-16">
                    <h1 className="text-3xl font-bold text-primary mb-2">Information for Retired Professionals</h1>
                    <div className="h-1 w-20 bg-primary rounded"></div>
                </header>

                <section className="mb-16 bg-white rounded-xl shadow-sm p-8 transition-all hover:shadow-md">
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">Welcome to Luminor</h2>
                    <p className="text-slate-700 leading-relaxed">
                        At Luminor, we believe that experience should never go to waste. Our platform allows retired professionals like you to continue engaging with the industries you love, share your expertise, and support businesses in need of guidance—all while earning supplemental income on your terms. While financial compensation is a benefit we want to emphasize the importance of knowledge sharing from years of experience so would appreciate it if the cost could be the secondary focus.
                    </p>
                </section>

                <section className="mb-16 bg-white rounded-xl shadow-sm p-8 transition-all hover:shadow-md">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">Why Join Luminor?</h2>
                    <ul className="space-y-6">
                        <li className="flex items-start">
                            <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                                <BrainCircuit className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-800 mb-1">Stay Engaged:</h3>
                                <p className="text-slate-700">Continue contributing to your industry and keep your skills sharp.</p>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                                <Clock className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-800 mb-1">Flexible Work:</h3>
                                <p className="text-slate-700">Choose projects that interest you, work remotely, and set your own schedule.</p>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                                <DollarSign className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-800 mb-1">Supplemental Income:</h3>
                                <p className="text-slate-700">Earn for your expertise while enjoying retirement at your own pace.</p>
                            </div>
                        </li>
                    </ul>
                </section>

                <section className="mb-16 bg-white rounded-xl shadow-sm p-8 transition-all hover:shadow-md">
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">Setting Your Rates</h2>
                    <p className="text-slate-700 leading-relaxed">
                        We encourage our Retired Professionals to set their own rates based on their experience and the value they provide. While financial compensation is a benefit, we also emphasize the importance of knowledge-sharing and mentorship. Our platform fosters a culture where businesses can benefit from your experience at a reasonable cost, making consultancy accessible while allowing you to pay your expertise forward.
                    </p>
                </section>

                <section className="mb-16 bg-white rounded-xl shadow-sm p-8 transition-all hover:shadow-md">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">How to Get Started</h2>
                    <ol className="space-y-5">
                        <li className="flex items-center">
                            <div className="flex items-center justify-center bg-primary text-white rounded-full w-8 h-8 mr-4 font-bold">1</div>
                            <p className="text-slate-700">Sign up and create your profile.</p>
                        </li>
                        <li className="flex items-center">
                            <div className="flex items-center justify-center bg-primary text-white rounded-full w-8 h-8 mr-4 font-bold">2</div>
                            <p className="text-slate-700">Highlight your skills, experience, and availability.</p>
                        </li>
                        <li className="flex items-center">
                            <div className="flex items-center justify-center bg-primary text-white rounded-full w-8 h-8 mr-4 font-bold">3</div>
                            <p className="text-slate-700">Connect with businesses seeking your expertise.</p>
                        </li>
                        <li className="flex items-center">
                            <div className="flex items-center justify-center bg-primary text-white rounded-full w-8 h-8 mr-4 font-bold">4</div>
                            <p className="text-slate-700">Negotiate terms and start consulting on your own schedule.</p>
                        </li>
                    </ol>
                </section>

                <section className="bg-primary text-white rounded-xl shadow-md p-8 transition-all hover:shadow-lg">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold mb-2">Join Luminor today</h2>
                            <p className="mb-4 md:mb-0">
                                Join Luminor today and continue making a meaningful impact in your industry!
                            </p>
                        </div>
                        <Button className="bg-white text-primary hover:bg-slate-100 flex items-center gap-2 px-6 py-5 text-base">
                            Sign Up <ArrowRight className="h-4 w-4" />
                        </Button>
                    </div>
                </section>
            </div>
        </div>
    )
}
