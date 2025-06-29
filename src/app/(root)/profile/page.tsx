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
    <Dialog open={open} onOpenChange={closed}>
      <DialogContent className="sm:max-w-[500px] glass-card">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-gray-900 jakarta-font">
            Reset Password
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            Create a new secure password for your account
          </DialogDescription>
        </DialogHeader>

        <Formik
          initialValues={{
            password: "",
          }}
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
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="password"
                      className="flex items-center space-x-2"
                    >
                      <Shield className="w-4 h-4" />
                      <span>New Password</span>
                    </Label>
                    <div
                      className="flex transition-all duration-200 rounded-lg border border-gray-300 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500"
                      onClick={() => setShowPassValid(true)}
                    >
                      <Input
                        id="password"
                        name="password"
                        onChange={handleChange}
                        value={values.password}
                        type={showPass ? "text" : "password"}
                        placeholder="Enter your new password"
                        className="border-0 focus-visible:ring-0 rounded-r-none"
                      />
                      <button
                        type="button"
                        className="px-3 flex items-center justify-center text-gray-500 hover:text-gray-700"
                        onClick={() => setShowPass(!showPass)}
                      >
                        {showPass ? (
                          <EyeOffIcon className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    <ErrorMessage
                      className="text-red-500 text-sm"
                      component={"div"}
                      name={"password"}
                    />
                  </div>

                  <div
                    className={`space-y-3 overflow-hidden transition-all duration-300 ease-in-out ${
                      showPassValid
                        ? "max-h-64 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <h4 className="text-sm font-medium text-gray-700">
                      Password Requirements:
                    </h4>
                    <div className="grid gap-2">
                      {passwordRules.map((rule, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3 text-sm"
                        >
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center ${
                              rule.valid
                                ? "bg-green-100 text-green-600"
                                : "bg-red-100 text-red-600"
                            }`}
                          >
                            {rule.valid ? (
                              <CheckCircle className="w-3 h-3" />
                            ) : (
                              "✕"
                            )}
                          </div>
                          <span
                            className={
                              rule.valid ? "text-green-700" : "text-gray-600"
                            }
                          >
                            {rule.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <DialogFooter className="mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={closed}
                    className="mr-2"
                  >
                    Cancel
                  </Button>
                  <Button
                    className="gradient-secondary text-white flex items-center space-x-2"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                    <span>Update Password</span>
                  </Button>
                </DialogFooter>
              </Form>
            );
          }}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

interface Review {
  name: string;
  department: string;
  year: number;
  review: string;
  rating: number;
  avatar: string;
  roomName: string;
  stayDate: string;
}

export const ReviewCard: React.FC<Review> = ({
  name,
  department,
  year,
  review,
  rating,
  avatar,
  roomName,
  stayDate,
}) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="glass-card hover-lift border border-gray-200 h-full">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback className="text-blue-600 bg-blue-100 font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 flex-1">
            <h3 className="text-base font-semibold text-gray-900">{name}</h3>
            <p className="text-sm text-gray-600">
              {department} • Batch of {year}
            </p>
            <p className="text-xs text-gray-500 mt-1">{stayDate}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <Badge className="bg-blue-100 text-blue-700 text-xs">
            {roomName}
          </Badge>
        </div>

        <p className="text-gray-700 text-sm leading-relaxed">{review}</p>
      </CardContent>
    </Card>
  );
};

interface BookingCardProps {
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
  status: "upcoming" | "completed" | "ongoing";
  bookingId: string;
  guests: number;
}

const BookingCard: React.FC<BookingCardProps> = ({
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
  status,
  bookingId,
  guests,
}) => {
  const [mainImage, setMainImage] = useState(0);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "upcoming":
        return {
          badge: "bg-blue-100 text-blue-700 border-blue-200",
          text: "Upcoming",
          icon: <Calendar className="w-4 h-4" />,
        };
      case "completed":
        return {
          badge: "bg-green-100 text-green-700 border-green-200",
          text: "Completed",
          icon: <CheckCircle className="w-4 h-4" />,
        };
      case "ongoing":
        return {
          badge: "bg-yellow-100 text-yellow-700 border-yellow-200",
          text: "Ongoing",
          icon: <Clock className="w-4 h-4" />,
        };
      default:
        return {
          badge: "bg-gray-100 text-gray-700 border-gray-200",
          text: "Unknown",
          icon: <Clock className="w-4 h-4" />,
        };
    }
  };

  const statusConfig = getStatusConfig(status);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const calculateNights = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <Card className="hover-lift border border-gray-200 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Image Section */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="relative h-48 lg:h-56 rounded-xl overflow-hidden mb-3">
              <Image
                src={images[mainImage]}
                alt={title}
                fill
                className="object-cover"
              />

              {/* Status Badge Overlay */}
              <div className="absolute top-3 left-3">
                <Badge
                  className={`${statusConfig.badge} border font-medium px-3 py-1.5 shadow-sm`}
                >
                  {statusConfig.icon}
                  <span className="ml-1">{statusConfig.text}</span>
                </Badge>
              </div>
            </div>

            {/* Image Thumbnails */}
            <div className="flex gap-2">
              {images.slice(0, 4).map((img, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(index)}
                  className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                    mainImage === index
                      ? "border-blue-500"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Room view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 space-y-4">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div>
                <Link href={`/rooms/${id}`}>
                  <h3 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer mb-2">
                    {title}
                  </h3>
                </Link>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">
                    {location} • {distance}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  Booking ID:{" "}
                  <span className="font-medium text-gray-700">{bookingId}</span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  ₹{price.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500">
                  {calculateNights()} night{calculateNights() > 1 ? "s" : ""}
                </div>
              </div>
            </div>

            {/* Dates and Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="text-xs text-gray-500 mb-1">Check-in</div>
                <div className="font-semibold text-gray-900">
                  {formatDate(startDate)}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Check-out</div>
                <div className="font-semibold text-gray-900">
                  {formatDate(endDate)}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Guests</div>
                <div className="font-semibold text-gray-900">
                  {guests} guest{guests > 1 ? "s" : ""}
                </div>
              </div>
            </div>

            {/* Rating and Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
              <div className="flex items-center space-x-4">
                <div className="flex items-center bg-green-600 text-white px-3 py-1.5 rounded-full text-sm font-semibold">
                  <Star className="w-4 h-4 mr-1 fill-current" />
                  {rating}
                </div>
                <span className="text-sm text-gray-600">
                  ({reviews.toLocaleString()} reviews)
                </span>
              </div>

              <div className="flex space-x-3">
                <Link href={`/rooms/${id}`}>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </Link>
                {status === "completed" && (
                  <Button size="sm" className="gradient-secondary text-white">
                    <Edit3 className="w-4 h-4 mr-2" />
                    Write Review
                  </Button>
                )}
                {status === "upcoming" && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    Cancel Booking
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Page;
