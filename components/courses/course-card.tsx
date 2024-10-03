import Image from 'next/image'

interface CourseProps {
  course: {
    title: string
    duration: string
    image: string
  }
}

export default function CourseCard({ course }: CourseProps) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <Image
        src={course.image}
        alt={course.title}
        width={400}
        height={200}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
        <p className="text-gray-600 mb-4">Duration: {course.duration}</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
          Get Started
        </button>
      </div>
    </div>
  )
}
