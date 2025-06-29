"use client";
import { useAuth } from "@/store/AuthContext";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ErrorMessage, Form, Formik } from "formik";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Eye,
  EyeOffIcon,
  Loader2,
  User,
  Hotel,
  Settings,
  LogOut,
  Star,
  Calendar,
  MapPin,
  Edit3,
  Mail,
  Phone,
  UserCheck,
  Award,
  Clock,
  CheckCircle,
  Shield,
} from "lucide-react";
import { useLogoutMutation, useUpdateProfileMutation } from "@/store/baseApi";
import { toast } from "sonner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const tabs = [
  {
    id: 1,
    name: "My Profile",
    icon: <User size={20} />,
    description: "Personal information and settings",
  },
  {
    id: 2,
    name: "My Bookings",
    icon: <Hotel size={20} />,
    description: "View and manage your reservations",
  },
];

const reviews = [
  {
    name: "Shayan Kundu",
    department: "Computer Science",
    year: 2022,
    review:
      "Staying at the Alumni House brought back so many memories! The comfort, hospitality, and location were just perfect.",
    rating: 5,
    avatar: "/images/reviewer-1.jpg",
    roomName: "Executive Suite",
    stayDate: "December 2023",
  },
  {
    name: "Aarav Mehta",
    department: "Mechanical Engineering",
    year: 2020,
    review:
      "It felt amazing to be back on campus. The Alumni House was cozy and had everything I needed for a comfortable stay.",
    rating: 4,
    avatar: "/images/reviewer-2.jpg",
    roomName: "Deluxe Room",
    stayDate: "November 2023",
  },
  {
    name: "Sneha Roy",
    department: "Biotechnology",
    year: 2019,
    review:
      "Loved the peaceful environment and how welcoming the staff were. Definitely a must-stay place for visiting alumni.",
    rating: 5,
    avatar: "/images/reviewer-3.jpg",
    roomName: "Premium Suite",
    stayDate: "October 2023",
  },
];

const dummyRooms = [
  {
    id: 1,
    title: "Executive Suite - Teesta",
    location: "Kanchenjunga Block A",
    distance: "Ground Floor",
    rating: 4.8,
    reviews: 245,
    price: 1200,
    startDate: "2025-06-20",
    endDate: "2025-06-23",
    status: "upcoming",
    bookingId: "BK001",
    guests: 2,
    images: [
      "/images/test-1.jpg",
      "/images/test-2.jpg",
      "/images/test-3.jpg",
      "/images/test-5.jpeg",
    ],
  },
  {
    id: 2,
    title: "Deluxe Room - Himalaya",
    location: "Kanchenjunga Block B",
    distance: "First Floor",
    rating: 4.5,
    reviews: 189,
    price: 950,
    startDate: "2024-12-10",
    endDate: "2024-12-13",
    status: "completed",
    bookingId: "BK002",
    guests: 1,
    images: [
      "/images/test-2.jpg",
      "/images/test-1.jpg",
      "/images/test-3.jpg",
      "/images/test-5.jpeg",
    ],
  },
  {
    id: 3,
    title: "Premium Suite - Everest",
    location: "Kanchenjunga Block A",
    distance: "Third Floor",
    rating: 4.9,
    reviews: 312,
    price: 1500,
    startDate: "2025-01-15",
    endDate: "2025-01-17",
    status: "ongoing",
    bookingId: "BK003",
    guests: 2,
    images: [
      "/images/test-4.webp",
      "/images/test-1.jpg",
      "/images/test-2.jpg",
      "/images/test-3.jpg",
    ],
  },
];

const Page = () => {
  const { data, refetch } = useAuth();
  const formRef = useRef<HTMLFormElement>(null);

  const [
    update,
    { isError: isUpdateError, error: updateError, isLoading: isUpdateLoading },
  ] = useUpdateProfileMutation();
  const [activeTab, setActiveTab] = useState(1);
  const [open, setOpen] = useState<boolean>(false);
  const [logout, { isError, error }] = useLogoutMutation();

  const handleLogout = async () => {
    const res = await logout();
    if (res.data?.success) {
      toast.success(res.data.message);
    }
  };

  const handleSubmit = async (values: any) => {
    console.log(values);

    const res = await update(values);
    if (res.data?.success) {
      toast.success(res.data.message);
      refetch();
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(
        (error as { data?: { message?: string } })?.data?.message ||
          "Failed to Logout",
      );
    }
  }, [error, isError]);

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true }),
  );

  const userStats = {
    totalBookings: dummyRooms.length,
    totalStays: 12,
    memberSince: "2018",
    favoriteRoom: "Executive Suite",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 pt-20">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8 fade-in">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 jakarta-font">
            My Account
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your profile, bookings, and account settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-soft border border-gray-200 sticky top-24">
              <CardContent className="p-6">
                {/* User Profile Summary */}
                <div className="text-center mb-6 pb-6 border-b border-gray-100">
                  <Avatar className="w-20 h-20 mx-auto mb-4">
                    <AvatarImage
                      src="/images/user-avatar.jpg"
                      alt={data?.data.name}
                    />
                    <AvatarFallback className="text-xl font-bold bg-blue-100 text-blue-600">
                      {data?.data.name
                        ?.split(" ")
                        .map((n: string) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {data?.data.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{data?.data.email}</p>
                  <Badge className="mt-2 bg-green-100 text-green-700 border-green-200">
                    <UserCheck className="w-3 h-3 mr-1" />
                    Verified Alumni
                  </Badge>
                </div>

                {/* Navigation Tabs */}
                <nav className="space-y-2 mb-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-all duration-200 ${
                        tab.id === activeTab
                          ? "bg-blue-100 text-blue-700 border border-blue-200"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {tab.icon}
                      <div>
                        <div className="font-medium">{tab.name}</div>
                        <div className="text-xs text-gray-500">
                          {tab.description}
                        </div>
                      </div>
                    </button>
                  ))}
                </nav>

                {/* Quick Stats */}
                <div className="space-y-3 mb-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 text-sm">
                    Quick Stats
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-gray-500">Total Bookings</div>
                      <div className="font-semibold text-gray-900">
                        {userStats.totalBookings}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500">Member Since</div>
                      <div className="font-semibold text-gray-900">
                        {userStats.memberSince}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    onClick={() => setOpen(true)}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Reset Password
                  </Button>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="shadow-soft border border-gray-200 min-h-[600px]">
              {/* Profile Tab */}
              <div className={`${activeTab === 1 ? "block" : "hidden"}`}>
                <CardHeader className="border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        Personal Information
                      </h2>
                      <p className="text-gray-600">
                        Update your account details and preferences
                      </p>
                    </div>
                    <Button
                      type="submit"
                      onClick={() => formRef.current?.requestSubmit()}
                      className="gradient-secondary text-white px-6"
                      disabled={isUpdateLoading}
                    >
                      {isUpdateLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  {/* Welcome Message */}
                  <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Welcome back, {data?.data.name}! 👋
                    </h3>
                    <p className="text-gray-600">
                      Thank you for being a valued member of our alumni
                      community. Your account has been active since{" "}
                      {userStats.memberSince}.
                    </p>
                  </div>

                  {/* Profile Form */}
                  <Formik
                    enableReinitialize={true}
                    initialValues={{
                      email: data?.data.email || "",
                      phone: data?.data.phone || "",
                      name: data?.data.name || "",
                    }}
                    validateOnChange={true}
                    onSubmit={(values: any) => {
                      handleSubmit(values);
                    }}
                  >
                    {({ handleChange, values }) => (
                      <Form ref={formRef}>
                        <div className="space-y-6">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label
                                htmlFor="name"
                                className="flex items-center space-x-2"
                              >
                                <User className="w-4 h-4" />
                                <span>Full Name</span>
                              </Label>
                              <Input
                                id="name"
                                name="name"
                                onChange={handleChange}
                                value={values.name}
                                type="text"
                                placeholder="Enter your full name"
                                className="focus:border-blue-500 focus:ring-blue-500"
                              />
                              <ErrorMessage
                                className="text-red-500 text-sm"
                                component={"div"}
                                name={"name"}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label
                                htmlFor="email"
                                className="flex items-center space-x-2"
                              >
                                <Mail className="w-4 h-4" />
                                <span>Email Address</span>
                              </Label>
                              <Input
                                id="email"
                                name="email"
                                onChange={handleChange}
                                value={values.email}
                                type="email"
                                placeholder="your.email@example.com"
                                className="focus:border-blue-500 focus:ring-blue-500"
                              />
                              <ErrorMessage
                                className="text-red-500 text-sm"
                                component={"div"}
                                name={"email"}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label
                                htmlFor="phone"
                                className="flex items-center space-x-2"
                              >
                                <Phone className="w-4 h-4" />
                                <span>Phone Number</span>
                              </Label>
                              <Input
                                id="phone"
                                name="phone"
                                onChange={handleChange}
                                value={values.phone}
                                type="tel"
                                placeholder="+91 XXXXX XXXXX"
                                className="focus:border-blue-500 focus:ring-blue-500"
                              />
                              <ErrorMessage
                                className="text-red-500 text-sm"
                                component={"div"}
                                name={"phone"}
                              />
                            </div>
                          </div>

                          {/* Account Information */}
                          <div className="pt-6 border-t border-gray-100">
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">
                              Account Information
                            </h4>
                            <div className="grid md:grid-cols-3 gap-4">
                              <div className="p-4 bg-gray-50 rounded-lg">
                                <div className="text-sm text-gray-500 mb-1">
                                  Member Since
                                </div>
                                <div className="font-semibold text-gray-900">
                                  {userStats.memberSince}
                                </div>
                              </div>
                              <div className="p-4 bg-gray-50 rounded-lg">
                                <div className="text-sm text-gray-500 mb-1">
                                  Total Bookings
                                </div>
                                <div className="font-semibold text-gray-900">
                                  {userStats.totalBookings}
                                </div>
                              </div>
                              <div className="p-4 bg-gray-50 rounded-lg">
                                <div className="text-sm text-gray-500 mb-1">
                                  Favorite Room
                                </div>
                                <div className="font-semibold text-gray-900">
                                  {userStats.favoriteRoom}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>

                  {/* Reviews Section */}
                  <div className="mt-8 pt-8 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-lg font-semibold text-gray-900">
                        My Reviews
                      </h4>
                      <Badge className="bg-blue-100 text-blue-700">
                        {reviews.length} Reviews
                      </Badge>
                    </div>

                    <Carousel
                      className="w-full"
                      opts={{
                        align: "start",
                        loop: true,
                      }}
                      plugins={[plugin.current]}
                      onMouseEnter={plugin.current.stop}
                      onMouseLeave={plugin.current.reset}
                    >
                      <CarouselContent className="-ml-1">
                        {reviews.map((review, index) => (
                          <CarouselItem
                            key={index}
                            className="pl-1 md:basis-1/2 lg:basis-1/2"
                          >
                            <div className="p-1">
                              <ReviewCard {...review} />
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="hidden md:flex" />
                      <CarouselNext className="hidden md:flex" />
                    </Carousel>
                  </div>
                </CardContent>
              </div>

              {/* Bookings Tab */}
              <div className={`${activeTab === 2 ? "block" : "hidden"}`}>
                <CardHeader className="border-b border-gray-100">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      My Bookings
                    </h2>
                    <p className="text-gray-600">
                      View and manage your room reservations
                    </p>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  {/* Booking Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-8 h-8 text-blue-600" />
                        <div>
                          <div className="text-sm text-blue-600">Upcoming</div>
                          <div className="text-xl font-bold text-blue-900">
                            {
                              dummyRooms.filter(
                                (room) => room.status === "upcoming",
                              ).length
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                        <div>
                          <div className="text-sm text-green-600">
                            Completed
                          </div>
                          <div className="text-xl font-bold text-green-900">
                            {
                              dummyRooms.filter(
                                (room) => room.status === "completed",
                              ).length
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                      <div className="flex items-center space-x-3">
                        <Clock className="w-8 h-8 text-yellow-600" />
                        <div>
                          <div className="text-sm text-yellow-600">Ongoing</div>
                          <div className="text-xl font-bold text-yellow-900">
                            {
                              dummyRooms.filter(
                                (room) => room.status === "ongoing",
                              ).length
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bookings List */}
                  <div className="space-y-6">
                    {dummyRooms.map((room, index) => (
                      <div
                        key={index}
                        className="slide-up"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <BookingCard {...room} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <ResetPassword open={open} closed={() => setOpen(false)} />
    </div>
  );
};

export const ResetPassword = ({
  open,
  closed,
}: {
  open: boolean;
  closed: () => void;
}) => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const [showPassValid, setShowPassValid] = useState<boolean>(false);
  const [updatePass, { isError, error, isLoading }] =
    useUpdateProfileMutation();

  const handleSubmit = async (values: any) => {
    const res = await updatePass(values);
    if (res.data?.success) {
      toast.success(res.data.message);
      closed();
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(
        (error as { data?: { message?: string } })?.data?.message ||
          "Failed to update password",
      );
    }
  }, [isError, error]);

  return (
    <div>
      <Dialog open={open} onOpenChange={closed}>
        <DialogContent className="sm:max-w-[425px] bg-slate-200/95">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              Reset Password
            </DialogTitle>
            <DialogDescription className="text-center text-black/80">
              Reset your password from here.
            </DialogDescription>
          </DialogHeader>

          <Formik
            initialValues={{
              password: "",
            }}
            // validationSchema={AuthSchema}
            validateOnChange={true}
            onSubmit={(values: any) => {
              const passwordChecks = [
                values.password.length >= 8,
                /[A-Z]/.test(values.password),
                /[a-z]/.test(values.password),
                /[0-9]/.test(values.password),
                /[!@#$%^&*]/.test(values.password),
              ];

              const allValid = passwordChecks.every((rule) => rule);
              if (!allValid) {
                toast.warning("Password does not meet all requirements.");
                return;
              }

              handleSubmit(values);
            }}
          >
            {({ handleChange, values }) => {
              const passwordRules = [
                {
                  label: "At least 8 characters",
                  valid: values.password.length >= 8,
                },
                {
                  label: "At least one uppercase letter",
                  valid: /[A-Z]/.test(values.password),
                },
                {
                  label: "At least one lowercase letter",
                  valid: /[a-z]/.test(values.password),
                },
                {
                  label: "At least one digit",
                  valid: /[0-9]/.test(values.password),
                },
                {
                  label: "At least one special character (!@#$%^&*)",
                  valid: /[!@#$%^&*]/.test(values.password),
                },
              ];

              return (
                <Form>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="password">Password</Label>
                      <div
                        className="flex transition-all duration-200 rounded-md"
                        onClick={() => setShowPassValid(true)}
                      >
                        <Input
                          id="password"
                          name="password"
                          onChange={handleChange}
                          value={values.password}
                          type={showPass ? "text" : "password"}
                          placeholder="*******"
                          className="rounded-r-none bg-[#eeececc3]"
                        />
                        <div className="bg-[#eeececc3] rounded-r-md pr-4 flex items-center justify-center cursor-pointer">
                          {showPass ? (
                            <Eye
                              size={18}
                              color="#555555e6"
                              onClick={() => setShowPass(false)}
                            />
                          ) : (
                            <EyeOffIcon
                              size={18}
                              color="#555555e6"
                              onClick={() => setShowPass(true)}
                            />
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="w-2/3">
                          <ErrorMessage
                            className="text-red-500 text-sm"
                            component={"div"}
                            name={"password"}
                          />
                        </div>
                      </div>

                      <div
                        className={`grid gap-1 text-sm mt-1 overflow-hidden transition-all duration-300 ease-in-out ${
                          showPassValid
                            ? "max-h-64 opacity-100 mb-4"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        {passwordRules.map((rule, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <span
                              className={
                                rule.valid ? "text-green-600" : "text-red-500"
                              }
                            >
                              {rule.valid ? "✅" : "❌"}
                            </span>
                            <span
                              className={
                                rule.valid ? "text-green-700" : "text-gray-700"
                              }
                            >
                              {rule.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <DialogFooter className="mt-3">
                    <Button
                      className="w-full flex items-center justify-center gap-2"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading && (
                        <Loader2 size={16} className="animate-spin" />
                      )}
                      Change Password
                    </Button>
                  </DialogFooter>
                </Form>
              );
            }}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface Review {
  name: string;
  department: string;
  year: number;
  review: string;
  rating: number;
}

export const ReviewCard: React.FC<Review> = ({
  name,
  department,
  year,
  review,
  rating,
}) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
      <div className="flex items-center mb-4">
        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
          {initials}
        </div>
        <div className="ml-4">
          <h3 className="text-[14px] font-semibold text-gray-700">{name}</h3>
          <p className="text-[12px] text-gray-500">
            {department} • Batch of {year}
          </p>
        </div>
      </div>

      <div className="flex items-center mb-3">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "text-yellow-400" : "text-gray-300"
            } fill-current`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.562-.955L10 0l2.95 5.955 6.562.955-4.756 4.635 1.122 6.545z" />
          </svg>
        ))}
      </div>

      <p className="text-gray-700 text-[14px] text-justify">{review}</p>
    </div>
  );
};

interface HotelCardProps {
  id: number;
  title: string;
  location: string;
  distance: string;
  rating: number;
  reviews: number;
  price: number;
  images: string[];
  startDate: string;
  endDate: string;
}

const HotelCard: React.FC<HotelCardProps> = ({
  id,
  title,
  location,
  distance,
  rating,
  reviews,
  price,
  images,
  startDate,
  endDate,
}) => {
  const [mainImage, setMainImage] = useState(images[0]);

  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  let statusBadge = (
    <Badge className="font-semibold  text-gray-700 text-sm rounded-full px-4 py-1 bg-blue-200 mt-2">
      Upcoming
    </Badge>
  );

  if (now > end) {
    statusBadge = (
      <Badge className="font-semibold  text-gray-700 text-sm rounded-full px-4 py-1 bg-green-300 mt-2">
        Completed
      </Badge>
    );
  } else if (now >= start && now <= end) {
    statusBadge = (
      <Badge className="font-semibold  text-gray-700 text-sm rounded-full px-4 py-1 bg-yellow-300 mt-2">
        Ongoing
      </Badge>
    );
  }

  return (
    <div className="flex flex-col relative md:flex-row  rounded-lg shadow-md border-2 hover:border-gray-400 duration-200 transition-all p-4 gap-4 bg-white w-full max-w-5xl">
      {/* Main Image */}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex gap-2 flex-col">
          <div className="relative h-50 md:h-40 rounded-md overflow-hidden">
            <Image
              src={mainImage}
              alt="Hotel"
              fill
              className="object-cover rounded-md"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {images.map((img, index) => (
              <div
                key={index}
                className={`relative md:w-16 md:h-12 w-12 h-12 cursor-pointer border-2 ${
                  mainImage === img ? "border-blue-500" : "border-transparent"
                } rounded-md`}
                onClick={() => setMainImage(img)}
              >
                <Image
                  src={img}
                  alt={`sub-${index}`}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border hidden md:block md:absolute md:h-full h-[10em] right-[12.5em] md:right-[16em] md:top-0 bottom-0 border-gray-200"></div>
      <div className="flex md:w-2/3 justify-between ">
        <div className="flex flex-col justify-between gap-2">
          <div>
            <Link href={`/rooms/${id}`}>
              <h2 className=" text-xl cursor-pointer font-semibold text-black">
                {title}
              </h2>
            </Link>
            <p className="md:text-sm text-xs text-gray-600 mt-2">
              <span className="text-[#484848] font-semibold">{location}</span> |{" "}
              {distance}
            </p>
            <Badge className="bg-gray-100 text-gray-700 text-xs mt-2">
              Couple Friendly
            </Badge>
          </div>

          <div className="md:text-sm text-xs text-[#484848] mt-2 flex flex-col gap-1">
            <p>🧺 Complimentary Meal Included</p>
            <p>🍳 Breakfast Included</p>
          </div>
        </div>

        {/* Rating & Price */}
        <div className="flex flex-col justify-between items-end text-right min-w-[140px]">
          <div className="space-y-1">
            <p className="text-[#484848] text-sm font-semibold">
              Very Good{" "}
              <span className="bg-[#484848] text-white text-xs px-2 py-1 rounded-md ml-1">
                {rating}
              </span>
            </p>
            <p className="text-xs text-gray-500">({reviews} Ratings)</p>
          </div>
          <div>
            <p className="text-lg font-medium text-black">
              Total: &#8377; {price}
            </p>
          </div>
          {statusBadge}
        </div>
      </div>
    </div>
  );
};

export default Page;
