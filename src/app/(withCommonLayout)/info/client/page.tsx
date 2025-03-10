import { ArrowRight, Users, DollarSign, Clock, Grid } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function page() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
            <div className="container mx-auto px-4 py-12 ">
                <header className="mb-16">
                    <h1 className="text-3xl font-bold text-primary mb-2">Information for Clients</h1>
                    <div className="h-1 w-20 bg-primary rounded"></div>
                </header>

                <section className="mb-16 bg-white rounded-xl shadow-sm p-8 transition-all hover:shadow-md">
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">Welcome to Luminor</h2>
                    <p className="text-slate-700 leading-relaxed">
                        Luminor is designed to bridge the gap between highly experienced retired professionals and businesses
                        seeking expert consultancy at a fraction of traditional costs. We believe that experience is invaluable, and
                        our platform enables businesses to leverage this wealth of knowledge in an efficient and cost-effective
                        manner.
                    </p>
                </section>

                <section className="mb-16 bg-white rounded-xl shadow-sm p-8 transition-all hover:shadow-md">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">Why Choose Luminor?</h2>
                    <ul className="space-y-6">
                        <li className="flex items-start">
                            <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                                <Users className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-800 mb-1">Access to Expertise:</h3>
                                <p className="text-slate-700">
                                    Gain insights from professionals who have years of industry experience.
                                </p>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                                <DollarSign className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-800 mb-1">Cost-Effective Solutions:</h3>
                                <p className="text-slate-700">
                                    Access consultancy services at lower costs compared to full-time employees or traditional consultants.
                                </p>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                                <Clock className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-800 mb-1">Flexible Engagement:</h3>
                                <p className="text-slate-700">
                                    Hire experts on a project basis, short-term or long-term, based on your specific needs.
                                </p>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                                <Grid className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-800 mb-1">Diverse Skill Sets:</h3>
                                <p className="text-slate-700">
                                    Our platform covers a wide range of industries, ensuring you find the right expertise for your
                                    business challenges.
                                </p>
                            </div>
                        </li>
                    </ul>
                </section>

                <section className="mb-16 bg-white rounded-xl shadow-sm p-8 transition-all hover:shadow-md">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">How It Works</h2>
                    <ol className="space-y-5">
                        <li className="flex items-center">
                            <div className="flex items-center justify-center bg-primary text-white rounded-full w-8 h-8 mr-4 font-bold">
                                1
                            </div>
                            <p className="text-slate-700">Browse our network of Retired Professionals.</p>
                        </li>
                        <li className="flex items-center">
                            <div className="flex items-center justify-center bg-primary text-white rounded-full w-8 h-8 mr-4 font-bold">
                                2
                            </div>
                            <p className="text-slate-700">Connect with a suitable consultant for your needs.</p>
                        </li>
                        <li className="flex items-center">
                            <div className="flex items-center justify-center bg-primary text-white rounded-full w-8 h-8 mr-4 font-bold">
                                3
                            </div>
                            <p className="text-slate-700">Negotiate terms and pricing directly with the consultant.</p>
                        </li>
                        <li className="flex items-center">
                            <div className="flex items-center justify-center bg-primary text-white rounded-full w-8 h-8 mr-4 font-bold">
                                4
                            </div>
                            <p className="text-slate-700">Receive expert guidance and solutions to enhance your business.</p>
                        </li>
                    </ol>
                </section>

                <section className="bg-primary text-white rounded-xl shadow-md p-8 transition-all hover:shadow-lg">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold mb-2">Get Started Today</h2>
                            <p className="mb-4 md:mb-0">
                                Join Luminor and take advantage of experienced professionals ready to provide valuable insights and
                                solutions tailored to your business needs.
                            </p>
                        </div>
                        <Button className="bg-white text-primary hover:bg-slate-100 flex items-center gap-2 px-6 py-5 text-base">
                            Join Now <ArrowRight className="h-4 w-4" />
                        </Button>
                    </div>
                </section>
            </div>
        </div>
    )
}

