import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { FileText, DollarSign, Clock, User, Briefcase, FileCheck, ExternalLink } from "lucide-react"

export default function page() {
    const orderData = {
        _id: "67c6d38810257ff11d055623",
        clientRequerment:
            "https://smtech-space.nyc3.digitaloceanspaces.com/merged-pdfs/1741083527486_merged_1741083527480.pdf",
        orderReciver: {
            name: {
                firstName: "Leilani",
                lastName: "Aguilar",
            },
            stripe: {
                customerId: "acct_1QyWXoPAA57BagY1",
                onboardingUrl: null,
                isOnboardingSucess: true,
            },
            _id: "67c588f6168e64451966591b",
            role: "retireProfessional",
            email: "refemu@dreamclarify.org",
            googleId: null,
            profileUrl: null,
            isDeleted: false,
            isActivated: true,
            createdAt: "2025-03-03T10:48:22.229Z",
            updatedAt: "2025-03-05T04:22:03.463Z",
            otp: null,
            otpExpiry: null,
        },
        deliveryDate: "1",
        totalPrice: "38.4",
        project: {
            flatFee: {
                revision: 1,
                delivery: 1,
                price: 32,
            },
            _id: "67c6d1fd10257ff11d0555e8",
            projectName: "dfvgdf",
            description: "dfdf",
            agreementType: "Flat_Fee",
            orderAgreementPDF:
                "https://smtech-space.nyc3.digitaloceanspaces.com/offers/1741083131489_offer_1741083131479.pdf",
            totalPrice: 38.4,
            totalReceive: 32,
            professionalEmail: "67c588f6168e64451966591b",
            clientEmail: "67c2c81806bf42685e5a72e6",
            totalDeliveryTime: 1,
            serviceFee: 6.4,
            isSeen: true,
            isAccepted: false,
            milestones: [],
            createdAt: "2025-03-04T10:12:13.230Z",
            updatedAt: "2025-03-04T10:18:47.534Z",
            count: 1,
        },
        paymentIntentId: "pi_3QysYmAk94MRg2rW0GV6DIFf",
        transaction: {
            _id: "67c6d38810257ff11d055621",
            orderId: "67c6d38810257ff11d055623",
            amount: 38.4,
            paymentStatus: "pending",
            charge: 6.4,
            createdAt: "2025-03-04T10:18:48.940Z",
            updatedAt: "2025-03-04T10:18:48.945Z",
        },
        createdAt: "2025-03-04T10:18:48.943Z",
        updatedAt: "2025-03-04T10:18:48.943Z",
    }

    const formatDate = (dateString:any) => {
        const date = new Date(dateString)
        return new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(date)
    }

    return (
        <div className="container mx-auto py-8 px-4 max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Order Details</h1>
                    <p className="text-muted-foreground">Order ID: {orderData._id}</p>
                </div>
                <Badge
                    variant={orderData.transaction.paymentStatus === "pending" ? "outline" : "default"}
                    className="mt-2 md:mt-0 text-sm"
                >
                    {orderData.transaction.paymentStatus.charAt(0).toUpperCase() + orderData.transaction.paymentStatus.slice(1)}
                </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Order Summary Card */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Briefcase className="h-5 w-5" />
                            Project Summary
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-medium">Project Name</h3>
                                <p>{orderData.project.projectName}</p>
                            </div>
                            <div>
                                <h3 className="font-medium">Description</h3>
                                <p>{orderData.project.description}</p>
                            </div>
                            <div>
                                <h3 className="font-medium">Agreement Type</h3>
                                <p>{orderData.project.agreementType.replace("_", " ")}</p>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:gap-8">
                                <div>
                                    <h3 className="font-medium">Revisions</h3>
                                    <p>{orderData.project.flatFee.revision}</p>
                                </div>
                                <div>
                                    <h3 className="font-medium">Delivery Time</h3>
                                    <p>{orderData.project.flatFee.delivery} day(s)</p>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-medium">Created At</h3>
                                <p>{formatDate(orderData.project.createdAt)}</p>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col items-start">
                        <Button variant="outline" className="flex items-center gap-2" asChild>
                            <a href={orderData.project.orderAgreementPDF} target="_blank" rel="noopener noreferrer">
                                <FileCheck className="h-4 w-4" />
                                View Agreement PDF
                                <ExternalLink className="h-3 w-3 ml-1" />
                            </a>
                        </Button>
                    </CardFooter>
                </Card>

                {/* Payment Information Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <DollarSign className="h-5 w-5" />
                            Payment Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span>Base Price:</span>
                                <span>${orderData.project.flatFee.price.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Service Fee:</span>
                                <span>${orderData.project.serviceFee.toFixed(2)}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-bold">
                                <span>Total Price:</span>
                                <span>${orderData.totalPrice}</span>
                            </div>
                            <div className="pt-2">
                                <h3 className="font-medium">Payment Status</h3>
                                <Badge variant={orderData.transaction.paymentStatus === "pending" ? "outline" : "default"}>
                                    {orderData.transaction.paymentStatus.charAt(0).toUpperCase() +
                                        orderData.transaction.paymentStatus.slice(1)}
                                </Badge>
                            </div>
                            <div>
                                <h3 className="font-medium">Payment ID</h3>
                                <p className="text-sm break-all">{orderData.paymentIntentId}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Professional Details Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5" />
                            Professional Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-medium">Name</h3>
                                <p>
                                    {orderData.orderReciver.name.firstName} {orderData.orderReciver.name.lastName}
                                </p>
                            </div>
                            <div>
                                <h3 className="font-medium">Email</h3>
                                <p className="break-all">{orderData.orderReciver.email}</p>
                            </div>
                            <div>
                                <h3 className="font-medium">Role</h3>
                                <p>
                                    {orderData.orderReciver.role.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Client Requirements Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            Client Requirements
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline" className="w-full flex items-center gap-2" asChild>
                            <a href={orderData.clientRequerment} target="_blank" rel="noopener noreferrer">
                                <FileText className="h-4 w-4" />
                                View Requirements PDF
                                <ExternalLink className="h-3 w-3 ml-1" />
                            </a>
                        </Button>
                    </CardContent>
                </Card>

                {/* Delivery Information Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Clock className="h-5 w-5" />
                            Delivery Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-medium">Delivery Time</h3>
                                <p>{orderData.deliveryDate} day(s)</p>
                            </div>
                            <div>
                                <h3 className="font-medium">Order Created</h3>
                                <p>{formatDate(orderData.createdAt)}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}