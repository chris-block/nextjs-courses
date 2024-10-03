"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { LogOut, Settings, User, Clock, Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from "@/components/ui/sheet"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import PageWrapper from "@/components/wrapper/page-wrapper"

type CourseCategory = "On Demand" | "Multi-week"

interface Course {
  id: string
  title: string
  description: string
  imageUrl: string
  fullDescription: string
  instructor: {
    name: string
    avatar: string
  }
  duration: number
  category: CourseCategory
  startDate?: string
  endDate?: string
}

interface InProgressCourse extends Course {
  progress: number
  nextLesson: string
}

const inProgressCourses: InProgressCourse[] = [
  {
    id: "ip1",
    title: "Renewable Energy Technologies",
    description: "Explore the latest advancements in renewable energy sources and their implementation.",
    imageUrl: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    fullDescription: "This course covers various renewable energy technologies including solar, wind, hydroelectric, and geothermal power. You'll learn about their principles, applications, and the challenges in implementing these technologies on a large scale.",
    instructor: {
      name: "Dr. Alex Power",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    },
    duration: 6,
    category: "Multi-week",
    startDate: "01/15/2025",
    endDate: "02/26/2025",
    progress: 65,
    nextLesson: "Wind Energy Systems"
  },
  {
    id: "ip2",
    title: "Environmental Policy and Legislation",
    description: "Understand the legal frameworks governing environmental protection and conservation.",
    imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    fullDescription: "This course provides an overview of environmental laws and policies at local, national, and international levels. You'll examine case studies, discuss current environmental challenges, and learn about the process of creating and implementing environmental legislation.",
    instructor: {
      name: "Prof. Lisa Green",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    duration: 8,
    category: "Multi-week",
    startDate: "02/01/2025",
    endDate: "03/29/2025",
    progress: 30,
    nextLesson: "International Environmental Agreements"
  }
]

const availableCourses: Course[] = [
  {
    id: "1",
    title: "Climate Change Fundamentals",
    description: "Understand the basics of climate change, its causes, and global impacts.",
    imageUrl: "https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    fullDescription: "This comprehensive course provides a solid foundation in understanding climate change. You'll learn about greenhouse gases, global warming mechanisms, and the current and projected impacts on our planet. By the end of this course, you'll be equipped with the knowledge to engage in informed discussions about climate change and its solutions.",
    instructor: {
      name: "Dr. Emily Green",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80"
    },
    duration: 4,
    category: "Multi-week",
    startDate: "03/01/2025",
    endDate: "03/29/2025"
  },
  {
    id: "2",
    title: "Sustainable Living Practices",
    description: "Learn practical ways to reduce your carbon footprint and live more sustainably.",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1313&q=80",
    fullDescription: "This course focuses on actionable steps you can take to live a more environmentally friendly lifestyle. Topics include reducing energy consumption, sustainable food choices, minimizing waste, and eco-friendly transportation options. You'll come away with a personal plan for sustainable living that you can implement immediately.",
    instructor: {
      name: "Sarah Eco",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&h=761&q=80"
    },
    duration: 10,
    category: "On Demand"
  },
  {
    id: "3",
    title: "Biodiversity and Conservation",
    description: "Explore the importance of biodiversity and strategies for wildlife conservation.",
    imageUrl: "https://images.unsplash.com/photo-1584974292709-5c2f0619971b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    fullDescription: "Dive into the fascinating world of biodiversity and learn why it's crucial for our planet's health. This course covers ecosystems, endangered species, habitat preservation, and conservation strategies. You'll gain insights into current conservation efforts and learn how you can contribute to protecting Earth's incredible variety of life.",
    instructor: {
      name: "Prof. Mark Fauna",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    duration: 5,
    category: "Multi-week",
    startDate: "04/05/2025",
    endDate: "05/10/2025"
  },
]

function InProgressCourseCard({ course }: { course: InProgressCourse }) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="p-0">
        <Image
          src={course.imageUrl}
          alt={course.title}
          width={300}
          height={200}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <div className="mb-2">
          <CardTitle className="text-xl mb-1">{course.title}</CardTitle>
          <span className="text-xs font-semibold bg-primary/10 text-primary px-2 py-1 rounded-full">
            {course.category}
          </span>
        </div>
        <p className="text-muted-foreground line-clamp-2 mb-4">{course.description}</p>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <Clock className="mr-2 h-4 w-4" />
          <span>{course.duration} {course.category === "Multi-week" ? "weeks" : "hours"}</span>
        </div>
        {course.category === "Multi-week" && course.startDate && (
          <div className="flex items-center text-sm text-muted-foreground mb-4">
            <Calendar className="mr-2 h-4 w-4" />
            <span>Course begins: {course.startDate}</span>
          </div>
        )}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{course.progress}%</span>
          </div>
          <Progress value={course.progress} className="w-full" />
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="w-full">
          <Separator className="mb-4" />
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-muted-foreground">
              <span>Next: {course.nextLesson}</span>
            </div>
            <Button>Continue</Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default function CoursesPage() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [categoryFilter, setCategoryFilter] = useState<CourseCategory | "All">("All")

  const filteredCourses = availableCourses.filter(course =>
    categoryFilter === "All" || course.category === categoryFilter
  )

  return (
    <PageWrapper>
      <main className="flex-grow">
        <div className="container mx-auto py-12">
          <h2 className="text-2xl font-bold mb-6">In Progress Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {inProgressCourses.map((course) => (
              <InProgressCourseCard key={course.id} course={course} />
            ))}
          </div>

          <h2 className="text-2xl font-bold mb-6">Available Courses</h2>
          <div className="flex justify-center mb-8">
            <ToggleGroup type="single" value={categoryFilter} onValueChange={(value) => setCategoryFilter(value as CourseCategory | "All")}>
              <ToggleGroupItem value="All" aria-label="Show all courses">
                All
              </ToggleGroupItem>
              <ToggleGroupItem value="On Demand" aria-label="Show on demand courses">
                On Demand
              </ToggleGroupItem>
              <ToggleGroupItem value="Multi-week" aria-label="Show multi-week courses">
                Multi-week
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="flex flex-col">
                <CardHeader className="p-0">
                  <Image
                    src={course.imageUrl}
                    alt={course.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </CardHeader>
                <CardContent className="flex-grow p-4">
                  <div className="mb-2">
                    <CardTitle className="text-xl mb-1">{course.title}</CardTitle>
                    <span className="text-xs font-semibold bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {course.category}
                    </span>
                  </div>
                  <p className="text-muted-foreground line-clamp-2 mb-4">{course.description}</p>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>{course.duration} {course.category === "Multi-week" ? "weeks" : "hours"}</span>
                  </div>
                  {course.category === "Multi-week" && course.startDate && (
                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>Course begins: {course.startDate}</span>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <div className="w-full">
                    <Separator className="mb-4" />
                    <div className="flex justify-between items-center">
                      <Button variant="outline" className="w-auto" onClick={() => setSelectedCourse(course)}>
                        More Details
                      </Button>
                      <Button className="w-auto">Enroll Now</Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Sheet open={!!selectedCourse} onOpenChange={() => setSelectedCourse(null)}>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>{selectedCourse?.title}</SheetTitle>
            <SheetDescription>{selectedCourse?.description}</SheetDescription>
          </SheetHeader>
          <div className="py-4">
            <Image
              src={selectedCourse?.imageUrl || "/placeholder.svg"}
              alt={selectedCourse?.title || "Course image"}
              width={500}
              height={300}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">Course Details</h3>
            <p className="text-muted-foreground mb-4">{selectedCourse?.fullDescription}</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <h4 className="font-semibold">Instructor</h4>
                <div className="flex items-center mt-2">
                  <Avatar className="h-10 w-10 mr-2">
                    <AvatarImage src={selectedCourse?.instructor.avatar} alt={`${selectedCourse?.instructor.name} avatar`} />
                    <AvatarFallback>{selectedCourse?.instructor.name[0]}</AvatarFallback>
                  </Avatar>
                  <p className="text-muted-foreground">{selectedCourse?.instructor.name}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold">Duration</h4>
                <p className="text-muted-foreground">
                  {selectedCourse?.duration} {selectedCourse?.category === "Multi-week" ? "weeks" : "hours"}
                </p>
              </div>
              <div>
                <h4 className="font-semibold">Category</h4>
                <p className="text-muted-foreground">{selectedCourse?.category}</p>
              </div>
              {selectedCourse?.category === "Multi-week" && selectedCourse?.startDate && (
                <div className="col-span-2">
                  <h4 className="font-semibold">Course Start Date</h4>
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Course begins: {selectedCourse.startDate}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button className="w-full">Enroll Now</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </PageWrapper>
  )
}
