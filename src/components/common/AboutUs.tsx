'use client'
import { Users, Target, Lightbulb, Workflow, MessageSquareIcon as MessageSquareQuestion, Building2, UserCheck, Shield, Mail } from "lucide-react"
import { motion, useInView, type Variants } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"


export default function AboutUs() {

    const whoWeAreRef = useRef(null)
    const whyWeExistRef = useRef(null)
    const howItWorksRef = useRef(null)

    const whoWeAreInView = useInView(whoWeAreRef, { once: true, amount: 0.3 })
    const whyWeExistInView = useInView(whyWeExistRef, { once: true, amount: 0.3 })
    const howItWorksInView = useInView(howItWorksRef, { once: true, amount: 0.3 })

    // Animation variants
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    }

    const itemVariants: Variants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
            },
        },
    }

    const iconVariants: Variants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 10,
            },
        },
    }

    const stepVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.2,
                type: "spring",
                stiffness: 100,
                damping: 15,
            },
        }),
    }

    const simpleFaqRef = useRef(null)
    const detailedFaqRef = useRef(null)

    const simpleFaqInView = useInView(simpleFaqRef, { once: true, amount: 0.2 })
    const detailedFaqInView = useInView(detailedFaqRef, { once: true, amount: 0.1 })

    const faqRef = useRef(null);
    const isFaqInView = useInView(faqRef, { once: true, amount: 0.2 });

    // const faqCardVariants = {
    //     hidden: { opacity: 0, y: 30 },
    //     visible: (i) => ({
    //         opacity: 1,
    //         y: 0,
    //         transition: {
    //             delay: i * 0.2,
    //             type: "spring",
    //             stiffness: 100,
    //             damping: 15,
    //         },
    //     }),
    // };
    const headerVariants: Variants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.1,
            },
        },
    }

    const faqCardVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 80,
                damping: 12,
                delay: i * 0.1,
            },
        }),
    }

    return (
        <div className="min-h-screen bg-white text-gray-800">
            {/* Hero Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="flex flex-col items-center text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#5633D1]  to-[#ff7aae] bg-clip-text text-transparent">
                        About Us
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#5633D1] via-[#ff7aae] to-[#73cbfc] rounded-full mb-8"></div>
                </div>

                {/* Who We Are Section */}
                <motion.div
                    ref={whoWeAreRef}
                    variants={containerVariants}
                    initial="hidden"
                    animate={whoWeAreInView ? "visible" : "hidden"}
                    className="grid md:grid-cols-2 gap-12 mb-20"
                >
                    <motion.div
                        variants={itemVariants}
                        className="bg-white rounded-2xl p-8 shadow-xl border border-[#ff7aae]/20 hover:border-[#ff7aae] transition-all"
                        whileHover={{
                            y: -5,
                            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                            transition: { duration: 0.3 },
                        }}
                    >
                        <motion.div
                            variants={iconVariants}
                            className="bg-[#ff7aae] w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                            whileHover={{ rotate: [0, -10, 10, -5, 0], transition: { duration: 0.5 } }}
                        >
                            <Users className="text-white" size={24} />
                        </motion.div>
                        <h2 className="text-3xl font-bold mb-4 text-[#5633D1]">Who We Are</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Luminor is an innovative online consultancy and freelance platform designed to bridge the gap between
                            experienced retired professionals and businesses in need of high-value expertise at a lower cost. We believe
                            that experience is invaluable, and our platform allows businesses to tap into the knowledge of seasoned
                            professionals while giving retirees the opportunity to continue using their skills in a flexible and
                            meaningful way.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="bg-white rounded-2xl p-8 shadow-xl border border-[#73cbfc]/20 hover:border-[#73cbfc] transition-all"
                        whileHover={{
                            y: -5,
                            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                            transition: { duration: 0.3 },
                        }}
                    >
                        <motion.div
                            variants={iconVariants}
                            className="bg-[#73cbfc] w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                            whileHover={{ rotate: [0, -10, 10, -5, 0], transition: { duration: 0.5 } }}
                        >
                            <Target className="text-white" size={24} />
                        </motion.div>
                        <h2 className="text-3xl font-bold mb-4 text-[#5633D1]">Our Mission</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Our mission is to provide a platform where retired professionals can continue to share their expertise while
                            benefiting businesses with high-quality, cost-effective consultancy services. By fostering collaboration, we
                            ensure that experience is never lost, but instead used to empower the next generation of businesses.
                        </p>
                    </motion.div>
                </motion.div>

                {/* Why We Exist Section */}
                <motion.div
                    ref={whyWeExistRef}
                    initial={{ opacity: 0, y: 50 }}
                    animate={whyWeExistInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    className="bg-gradient-to-r from-[#5633D1]/5 to-[#ff7aae]/5 rounded-2xl p-8 shadow-xl border border-[#5633D1]/10 mb-20"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={whyWeExistInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
                        className="bg-[#5633D1] w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                        whileHover={{ rotate: [0, -10, 10, -5, 0], transition: { duration: 0.5 } }}
                    >
                        <Lightbulb className="text-white" size={24} />
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        animate={whyWeExistInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="text-3xl font-bold mb-4 text-[#5633D1]"
                    >
                        Why We Exist
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={whyWeExistInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="text-gray-600 leading-relaxed mb-6"
                    >
                        Many retired professionals possess a wealth of knowledge and expertise, yet traditional employment structures
                        often limit their continued engagement. At the same time, startups and businesses frequently struggle to
                        access senior-level expertise due to budget constraints. Luminor solves this by creating an accessible
                        marketplace where businesses can connect with retired professionals who provide affordable, flexible, and
                        highly skilled consultancy services.
                    </motion.p>
                </motion.div>

                {/* How It Works Section */}
                <div className="mb-20" ref={howItWorksRef}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={howItWorksInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={howItWorksInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
                            className="bg-[#73cbfc] w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-6"
                            whileHover={{ rotate: [0, -10, 10, -5, 0], transition: { duration: 0.5 } }}
                        >
                            <Workflow className="text-white" size={24} />
                        </motion.div>
                        <h2 className="text-3xl font-bold mb-4 text-[#5633D1]">How It Works</h2>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={howItWorksInView ? "visible" : "hidden"}
                        className="grid md:grid-cols-3 gap-6"
                    >
                        <motion.div
                            custom={0}
                            variants={stepVariants}
                            className="bg-white rounded-2xl p-6 shadow-xl border border-[#ff7aae]/20 hover:border-[#ff7aae] transition-all"
                            whileHover={{
                                y: -5,
                                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                                transition: { duration: 0.3 },
                            }}
                        >
                            <div className="flex items-center mb-4">
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    className="bg-[#ff7aae] w-8 h-8 rounded-full flex items-center justify-center mr-3"
                                >
                                    <span className="font-bold text-white">1</span>
                                </motion.div>
                                <h3 className="text-xl font-bold text-[#5633D1]">For Businesses</h3>
                            </div>
                            <p className="text-gray-600">
                                Browse our network of experts, connect with the right professional, agree on terms, and get expert
                                guidance tailored to your needs.
                            </p>
                        </motion.div>

                        <motion.div
                            custom={1}
                            variants={stepVariants}
                            className="bg-white rounded-2xl p-6 shadow-xl border border-[#73cbfc]/20 hover:border-[#73cbfc] transition-all"
                            whileHover={{
                                y: -5,
                                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                                transition: { duration: 0.3 },
                            }}
                        >
                            <div className="flex items-center mb-4">
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    className="bg-[#73cbfc] w-8 h-8 rounded-full flex items-center justify-center mr-3"
                                >
                                    <span className="font-bold text-white">2</span>
                                </motion.div>
                                <h3 className="text-xl font-bold text-[#5633D1]">For Retired Professionals</h3>
                            </div>
                            <p className="text-gray-600">
                                Create a profile, list your expertise, set your own rates, and engage with businesses seeking your skills.
                            </p>
                        </motion.div>

                        <motion.div
                            custom={2}
                            variants={stepVariants}
                            className="bg-white rounded-2xl p-6 shadow-xl border border-[#5633D1]/20 hover:border-[#5633D1] transition-all"
                            whileHover={{
                                y: -5,
                                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                                transition: { duration: 0.3 },
                            }}
                        >
                            <div className="flex items-center mb-4">
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    className="bg-gradient-to-r from-[#5633D1] via-[#ff7aae] to-[#73cbfc] w-8 h-8 rounded-full flex items-center justify-center mr-3"
                                >
                                    <span className="font-bold text-white">3</span>
                                </motion.div>
                                <h3 className="text-xl font-bold text-[#5633D1]">Seamless Collaboration</h3>
                            </div>
                            <p className="text-gray-600">
                                Work directly with professionals or businesses without unnecessary intermediaries.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>

                {/* FAQ Section */}
                <motion.div
                    ref={simpleFaqRef}
                    initial="hidden"
                    animate={simpleFaqInView ? "visible" : "hidden"}
                    variants={containerVariants}
                    className="bg-gradient-to-r from-[#5633D1]/5 to-[#73cbfc]/5 rounded-2xl lg:px-8 lg:py-8 px-2 shadow-xl border border-[#5633D1]/10 mb-20"
                >
                    <motion.div variants={headerVariants} className="text-center mb-12">
                        <motion.div
                            className="bg-gradient-to-r from-[#5633D1] via-[#ff7aae] to-[#73cbfc] w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-6"
                            whileHover={{ rotate: [0, -5, 5, -3, 0], transition: { duration: 0.5 } }}
                        >
                            <MessageSquareQuestion className="text-white" size={24} />
                        </motion.div>
                        <motion.h2 className="text-3xl font-bold mb-4 text-[#5633D1]">Frequently Asked Questions (FAQ)</motion.h2>
                        <motion.div
                            className="w-24 h-1 bg-gradient-to-r from-[#5633D1] via-[#ff7aae] to-[#73cbfc] rounded-full mx-auto"
                            initial={{ width: 0 }}
                            animate={simpleFaqInView ? { width: 96 } : { width: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                        ></motion.div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-8">
                        <motion.h3 variants={itemVariants} className="text-2xl font-bold mb-4 text-[#5633D1]">
                            General Questions
                        </motion.h3>

                        <motion.div variants={containerVariants} className="space-y-6">
                            <motion.div
                                custom={0}
                                variants={faqCardVariants}
                                whileHover={{
                                    y: -5,
                                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                                }}
                                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-[#ff7aae]/10 hover:border-[#ff7aae]/30"
                            >
                                <h4 className="text-xl font-bold mb-3 flex items-center text-[#5633D1]">
                                    <motion.span
                                        whileHover={{ scale: 1.1 }}
                                        className="bg-[#ff7aae] w-6 h-6 rounded-full flex items-center justify-center mr-3 text-sm text-white"
                                    >
                                        1
                                    </motion.span>
                                    What is Luminor?
                                </h4>
                                <p className="text-gray-600 ml-9">
                                    Luminor is an online consultancy and freelance platform that connects retired professionals with
                                    businesses needing experienced expertise.
                                </p>
                            </motion.div>

                            <motion.div
                                custom={1}
                                variants={faqCardVariants}
                                whileHover={{
                                    y: -5,
                                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                                }}
                                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-[#73cbfc]/10 hover:border-[#73cbfc]/30"
                            >
                                <h4 className="text-xl font-bold mb-3 flex items-center text-[#5633D1]">
                                    <motion.span
                                        whileHover={{ scale: 1.1 }}
                                        className="bg-[#73cbfc] w-6 h-6 rounded-full flex items-center justify-center mr-3 text-sm text-white"
                                    >
                                        2
                                    </motion.span>
                                    How does Luminor work?
                                </h4>
                                <p className="text-gray-600 ml-9">
                                    Businesses post their consultancy needs, retired professionals offer their expertise, and both parties
                                    negotiate terms directly.
                                </p>
                            </motion.div>

                            <motion.div
                                custom={2}
                                variants={faqCardVariants}
                                whileHover={{
                                    y: -5,
                                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                                }}
                                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-[#ff7aae]/10 hover:border-[#ff7aae]/30"
                            >
                                <h4 className="text-xl font-bold mb-3 flex items-center text-[#5633D1]">
                                    <motion.span
                                        whileHover={{ scale: 1.1 }}
                                        className="bg-[#ff7aae] w-6 h-6 rounded-full flex items-center justify-center mr-3 text-sm text-white"
                                    >
                                        3
                                    </motion.span>
                                    Who can use Luminor?
                                </h4>
                                <p className="text-gray-600 ml-9">
                                    Both businesses looking for expert guidance and retired professionals wanting to share their skills can
                                    join the platform.
                                </p>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Detailed FAQ Section */}
                <div className="bg-white" ref={detailedFaqRef}>
                    <div className="py-10">
                        {/* Page Title */}


                        <motion.div
                            initial="hidden"
                            animate={detailedFaqInView ? "visible" : "hidden"}
                            variants={containerVariants}
                            className="grid md:grid-cols-2 gap-12"
                        >
                            {/* For Businesses Section */}
                            <motion.div variants={itemVariants} className="space-y-8">
                                <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
                                    <motion.div
                                        whileHover={{ rotate: [0, -5, 5, -3, 0], transition: { duration: 0.5 } }}
                                        className="bg-[#5633D1] w-12 h-12 rounded-xl flex items-center justify-center"
                                    >
                                        <Building2 className="text-white" size={24} />
                                    </motion.div>
                                    <h2 className="text-3xl font-bold text-[#5633D1]">For Businesses (Clients)</h2>
                                </motion.div>

                                <motion.div variants={containerVariants} className="space-y-6">
                                    {[
                                        {
                                            num: 4,
                                            question: "Why should I hire a retired professional?",
                                            answer:
                                                "Retired professionals bring decades of experience, deep industry knowledge, and a fresh perspective at a lower cost than traditional consultants.",
                                        },
                                        {
                                            num: 5,
                                            question: "How do I find the right consultant?",
                                            answer:
                                                "Use our search and filtering tools to find professionals based on expertise, experience, and availability.",
                                        },
                                        {
                                            num: 6,
                                            question: "How much does it cost?",
                                            answer:
                                                "Prices vary as consultants set their own rates, but Luminor encourages cost-effective solutions that balance value with affordability.",
                                        },
                                        {
                                            num: 7,
                                            question: "What industries do consultants specialize in?",
                                            answer:
                                                "Our network includes professionals across business consultancy, engineering, healthcare, legal, finance, education, and more.",
                                        },
                                        {
                                            num: 8,
                                            question: "How do payments work?",
                                            answer:
                                                "Upon accepting an order, card information will be requested. The payment will be held by Luminor until the offer is mark completed by both parties and then will be sent to the retired professional. 20% will be taken by Luminor.",
                                        },
                                    ].map((item, index) => (
                                        <motion.div
                                            key={item.num}
                                            custom={index}
                                            variants={faqCardVariants}
                                            whileHover={{
                                                y: -5,
                                                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                                                borderColor: "rgba(86, 51, 209, 0.5)",
                                            }}
                                            className="bg-white rounded-xl p-6 shadow-lg border border-[#5633D1]/10 hover:border-[#5633D1] transition-all"
                                        >
                                            <h3 className="text-xl font-bold mb-3 text-[#5633D1] flex items-center gap-3">
                                                <motion.span
                                                    whileHover={{ scale: 1.1 }}
                                                    className="bg-[#ff7aae] w-8 h-8 rounded-full flex items-center justify-center text-white"
                                                >
                                                    {item.num}
                                                </motion.span>
                                                {item.question}
                                            </h3>
                                            <p className="text-gray-600 ml-11">{item.answer}</p>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </motion.div>

                            {/* For Retired Professionals Section */}
                            <motion.div variants={itemVariants} className="space-y-8">
                                <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
                                    <motion.div
                                        whileHover={{ rotate: [0, -5, 5, -3, 0], transition: { duration: 0.5 } }}
                                        className="bg-[#73cbfc] w-12 h-12 rounded-xl flex items-center justify-center"
                                    >
                                        <UserCheck className="text-white" size={24} />
                                    </motion.div>
                                    <h2 className="text-3xl font-bold text-[#5633D1]">For Retired Professionals</h2>
                                </motion.div>

                                <motion.div variants={containerVariants} className="space-y-6">
                                    {[
                                        {
                                            num: 9,
                                            question: "Who can sign up as a consultant?",
                                            answer: "Any retired professional with valuable expertise in their field can join Luminor.",
                                        },
                                        {
                                            num: 10,
                                            question: "How do I set my rates?",
                                            answer:
                                                "You determine your own rates, but we encourage fair pricing that reflects your expertise while remaining accessible to businesses.",
                                        },
                                        {
                                            num: 11,
                                            question: "What are the benefits?",
                                            answer:
                                                "Continued professional engagement, supplemental income, flexible work, and the ability to mentor and share knowledge.",
                                        },
                                        {
                                            num: 12,
                                            question: "Can I work on my own schedule?",
                                            answer: "Yes! You choose your availability and the projects you take on.",
                                        },
                                        {
                                            num: 13,
                                            question: "How do I get paid?",
                                            answer:
                                                "Please create a Stripe account where you will input your bank details. Once the project is mark completed by both parties the money will be transferred.",
                                        },
                                    ].map((item, index) => (
                                        <motion.div
                                            key={item.num}
                                            custom={index}
                                            variants={faqCardVariants}
                                            whileHover={{
                                                y: -5,
                                                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                                                borderColor: "rgba(115, 203, 252, 0.5)",
                                            }}
                                            className="bg-white rounded-xl p-6 shadow-lg border border-[#73cbfc]/10 hover:border-[#73cbfc] transition-all"
                                        >
                                            <h3 className="text-xl font-bold mb-3 text-[#5633D1] flex items-center gap-3">
                                                <motion.span
                                                    whileHover={{ scale: 1.1 }}
                                                    className="bg-[#73cbfc] w-8 h-8 rounded-full flex items-center justify-center text-white"
                                                >
                                                    {item.num}
                                                </motion.span>
                                                {item.question}
                                            </h3>
                                            <p className="text-gray-600 ml-11">{item.answer}</p>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>


                <div className="bg-white">
                    <div className=" px-4 py-16">
                        {/* Page Title */}
                        <div className="text-center mb-16">
                            <motion.h1
                                initial={{ opacity: 0 }}
                                animate={detailedFaqInView ? { opacity: 1 } : { opacity: 0 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#5633D1] via-[#ff7aae] to-[#73cbfc] bg-clip-text text-transparent">
                                Platform & Security
                            </motion.h1>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={detailedFaqInView ? { width: 96 } : { width: 0 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                className="w-24 h-1 bg-gradient-to-r from-[#5633D1] via-[#ff7aae] to-[#73cbfc] rounded-full mx-auto"
                            ></motion.div>
                        </div>

                        {/* Main Content */}
                        <div className="mx-auto">
                            <div className="space-y-8">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="bg-[#5633D1] w-12 h-12 rounded-xl flex items-center justify-center">
                                        <Shield className="text-white" size={24} />
                                    </div>
                                    <h2 className="text-3xl font-bold text-[#5633D1]">Security & Support</h2>
                                </div>

                                <motion.div
                                    ref={faqRef}
                                    initial="hidden"
                                    animate={isFaqInView ? "visible" : "hidden"}
                                    className="space-y-6"
                                >
                                    {[
                                        { id: 14, question: "Is Luminor free to join?", answer: "Yes, signing up is free. There may be platform fees for additional features in the future.", color: "#ff7aae" },
                                        { id: 15, question: "Is my personal information safe?", answer: "Yes, we take security seriously and use best practices to protect user data.", color: "#73cbfc" },
                                        { id: 16, question: "What happens if there is a dispute?", answer: "We provide support and guidance, but all agreements are made directly between users.", color: "#ff7aae" },
                                        { id: 17, question: "How do I contact customer support?", answer: "You can reach us via email at luminorlimited@gmail.com", color: "#73cbfc" },
                                    ].map((item, index) => (
                                        <motion.div
                                            key={item.id}
                                            custom={index}
                                            variants={faqCardVariants}
                                            whileHover={{
                                                y: -5,
                                                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                                            }}
                                            className="bg-white rounded-xl p-6 shadow-lg border border-[#5633D1]/10 hover:border-[#5633D1] transition-all"
                                        >
                                            <h3 className="text-xl font-bold mb-3 text-[#5633D1] flex items-center gap-3">
                                                <span className="w-8 h-8 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: item.color }}>
                                                    {item.id}
                                                </span>
                                                {item.question}
                                            </h3>
                                            <p className="text-gray-600 ml-11">
                                                {item.id === 17 ? (
                                                    <span className="flex items-center gap-2">
                                                        <Mail className="text-[#5633D1] w-5 h-5" />
                                                        <a href="mailto:luminorlimited@gmail.com" className="text-[#5633D1] hover:text-[#ff7aae] transition-colors underline">
                                                            {item.answer}
                                                        </a>
                                                    </span>
                                                ) : (
                                                    item.answer
                                                )}
                                            </p>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>

                            {/* Call to Action */}
                            <div
                                // initial={{ opacity: 0, y: 30 }}
                                // animate={howItWorksInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                // transition={{ duration: 0.5 }}
                                className="mt-16 text-center">
                                <div className="bg-gradient-to-r from-[#5633D1]/5 to-[#73cbfc]/5 rounded-2xl p-8 shadow-xl border border-[#5633D1]/10">
                                    <p className="text-xl font-semibold text-[#5633D1] mb-8">
                                        Join Luminor today and become part of a network where experience meets opportunity!
                                    </p>
                                    <Link href={'/'} className="bg-bg_primary text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all">
                                        Get Started
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Accent */}
                </div>
            </div>

            {/* Footer Accent */}
        </div>
    )
}

