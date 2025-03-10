export default function TermsAndConditions() {
    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto px-4 py-12 ">
                
                <header className="mb-16">
                    <h1 className="text-3xl font-bold text-primary mb-2">Terms and Conditions</h1>
                    <div className="h-1 w-20 bg-primary rounded"></div>
                </header>

                <div className="prose prose-slate max-w-none">
                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-slate-900 flex items-baseline gap-2 mb-4">
                            <span className="text-primary">1.</span>
                            <span>Introduction</span>
                        </h2>
                        <p className="text-slate-700 leading-relaxed">
                            Welcome to Luminor, an online consultancy and freelance platform that connects retired professionals with
                            startups and businesses in need of experienced expertise. By accessing or using our platform, you agree to
                            comply with and be bound by the following terms and conditions.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-slate-900 flex items-baseline gap-2 mb-4">
                            <span className="text-primary">2.</span>
                            <span>Definitions</span>
                        </h2>
                        <ul className="list-disc pl-6 space-y-3 text-slate-700">
                            <li>&quot;Platform&quot; refers to Luminor&apos;s online consultancy and freelance services.</li>
                            <li>
                                &quot;Retired Professional&quot; refers to an individual offering consultancy services through the platform.
                            </li>
                            <li>&quot;Client&quot; refers to a business or individual seeking services through the platform.</li>
                            <li>&quot;User&quot; refers to both Retired Professionals and Clients utilizing the platform.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-slate-900 flex items-baseline gap-2 mb-4">
                            <span className="text-primary">3.</span>
                            <span>Use of the Platform</span>
                        </h2>
                        <ul className="list-disc pl-6 space-y-3 text-slate-700">
                            <li>Users must be 18 years or older.</li>
                            <li>Retired Professionals are responsible for setting their own rates and terms of engagement.</li>
                            <li>
                                Clients are responsible for ensuring compliance with any contractual obligations made with Retired
                                Professionals.
                            </li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-slate-900 flex items-baseline gap-2 mb-4">
                            <span className="text-primary">4.</span>
                            <span>Payments and Fees</span>
                        </h2>
                        <ul className="list-disc pl-6 space-y-3 text-slate-700">
                            <li>
                                Luminor does not dictate pricing but encourages fair market rates reflecting the professional&apos;s
                                experience.
                            </li>
                            <li>
                                Payments are made directly between Clients and Retired Professionals. Luminor is not responsible for any
                                disputes regarding payments.
                            </li>
                            <li>
                                Luminor will take a Service Fee of 20%, if the cost is very minimal the cost will be $10 per project for
                                the Client
                            </li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-slate-900 flex items-baseline gap-2 mb-4">
                            <span className="text-primary">5.</span>
                            <span>Limitation of Liability</span>
                        </h2>
                        <p className="text-slate-700 leading-relaxed">
                            Luminor acts as a facilitator and will do a thorough onboarding process for the Retired Professionals.
                            However, it is not responsible for the quality, accuracy, or reliability of the services provided.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-slate-900 flex items-baseline gap-2 mb-4">
                            <span className="text-primary">6.</span>
                            <span>Termination</span>
                        </h2>
                        <p className="text-slate-700 leading-relaxed">
                            Luminor reserves the right to suspend or terminate access to the platform for violations of these terms.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    )
}

